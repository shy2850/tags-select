import * as React from 'react'
import Tags from '../containers/TypeTags'
import Pager from '../components/Pagination'
import Modal from '../components/Modal'
import TypeDropdown from './TypeDropdown'
import Parse from '../parser/index'

const webkitSpeechRecognition = false && window['webkitSpeechRecognition']
const INFO = <pre>{`您的浏览器支持语音识别操作: 
【下一条】: 切换下一条 
【上一条】: 切换上一条
【上一页】: 回到前页
【下一页】: 去下一页
【第*页】: 跳转到第N页
【1】【2】【3】: 选择标签`}</pre>
export default class extends React.Component {
    state
    setState
    props
    constructor(props) {
        super(props)
        this.state = {
            pageSize: 10,
            pageNo: props.pageNo | 1,
            total: 20,
            data: [],
            activeIndex: 0
        }
    }
    renderPager () {
        const {
            pageSize,
            pageNo,
            total
        } = this.state
        return <Pager {...{
            toPage: this.toPage.bind(this),
            pageSize,
            pageNo,
            total
        }}/>
    }
    renderTable () {
        const t = this
        const { data, activeIndex } = t.state
        const changeTag = t.changeTag.bind(t)
        const changeActive = t.changeActive.bind(this)
        return <table className="table is-fullwidth is-bordered is-middle">
            <colgroup style={{width: '5%'}}></colgroup>
            <colgroup style={{width: '12%'}}></colgroup>
            <colgroup style={{width: '18%'}}></colgroup>
            <colgroup style={{width: '10%'}}></colgroup>
            <colgroup style={{width: '55%'}}></colgroup>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>value</th>
                    <th>more tags</th>
                    <th>url</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({id, name, value, url, tags, tag}, index) => <tr key={`${id}`}
                    onClick={e => changeActive(index)}
                    className={activeIndex === index ? 'is-active' : ''}>
                    <td>{!tag ? id : <span className="tag is-small is-primary"><i className="fa fa-check"/></span>}</td>
                    <td colspan="2" className="is-no-padding">
                        <table className="table is-fullwidth is-no-border">
                            <colgroup style={{width: '40%'}}></colgroup>
                            <colgroup style={{width: '60%'}}></colgroup>
                            <tr>
                                <td>{name}</td>
                                <td>{Parse(value)}</td>
                            </tr>
                            <tr>
                                <td colspan="2"><Tags tags={tags.match(/\w+/g)} activeItem={tag} onSelect={t => changeTag(id, t === tag ? '' : t)}/></td>
                            </tr>
                        </table>
                    </td>
                    <td><TypeDropdown activeItem={tag} onSelect={t => changeTag(id, t === tag ? '' : t)}/></td>
                    <td title={url}><div style={{overflow: 'auto'}}>{url}</div></td>
                </tr>)}
            </tbody>
        </table>
    }
    toPage (pageNo) {
        const t = this
        const { pageSize } = t.state
        const { toPage } = t.props
        
        if (pageNo && pageNo !== t.state.pageNo) {
            t.setState({
                activeIndex: 0
            })
        } else {
            pageNo = t.state.pageNo
        }
        toPage(pageNo, pageSize).then(res => t.setState({
            pageNo,
            ...res
        }))
    }
    changeTag (id, tag) {
        const t = this
        const { changeTag } = t.props
        const { toPage } = t.state
        changeTag(id, tag).then(res => {
            t.toPage(toPage)
        })
    }
    changeActive (index) {
        this.setState({
            activeIndex: index
        })
    }
    initSpeechRecognition () {
        const t = this
        let recognition = new window['webkitSpeechRecognition']()
        // recognition.continuous = true
        // recognition.interimResults = true
        recognition.lang = 'cmn-Hans-CN'
        recognition.onresult = e => {
            const {
                pageNo,
                pageSize,
                data,
                activeIndex
            } = t.state
            const word = e.results[e.results.length - 1][0].transcript
            console.log(word)
            switch (word) {
            case '1':
            case '一':
            case '2':
            case '二':
            case '3':
            case '三':
                let index = '0一二三'.indexOf(word)
                index = index < 1 ? (word | 0) : index
                const { id = 0, tags = '' } = data[activeIndex] || {}
                let tag = tags.split(/\W+/)[index - 1]
                if (id) {
                    t.changeTag(id, tag)
                    t.setState({
                        activeIndex: Math.min(activeIndex + 1, pageSize - 1)
                    })
                }
                break
            case '上一条':
                t.setState({
                    activeIndex: Math.max(0, activeIndex - 1)
                })
                break
            case '下一条':
                t.setState({
                    activeIndex: Math.min(activeIndex + 1, pageSize - 1)
                })
                break
            case '上一页':
                t.toPage(pageNo - 1)
                break
            case '下一页':
                t.toPage(pageNo + 1)
                break
            default:
                let p
                if (p = word.match(/[去第到](\d+)页/)) {
                    t.toPage(p[1])
                }
            }
        }
        recognition.onend = e => {  
            t.initSpeechRecognition()
        }
        recognition.start()
    }
    componentDidMount () {
        const t = this
        t.toPage(t.state.pageNo)
        if (webkitSpeechRecognition) {
            t.initSpeechRecognition()
        }
        document.addEventListener('keydown', e => {
            const { tagName } = e.srcElement
            if (tagName && tagName.toUpperCase() === 'INPUT') {
                e.stopPropagation()
                return
            }
            const {
                pageNo,
                pageSize,
                data,
                activeIndex
            } = t.state

            let keyCodeBase = 97
            switch (e.keyCode) {
                case 37:
                    t.toPage(pageNo - 1)
                    break
                case 39:
                    t.toPage(pageNo + 1)
                    break
                case 38:
                    t.setState({
                        activeIndex: Math.max(0, activeIndex - 1)
                    })
                    break
                case 40:
                    t.setState({
                        activeIndex: Math.min(activeIndex + 1, pageSize - 1)
                    })
                    break
                case 49:
                case 50:
                case 51:
                    keyCodeBase = 49
                case 97:
                case 98:
                case 99:
                    const { id = 0, tags = '' } = data[activeIndex] || {}
                    let tag = tags.split(/\W+/)[e.keyCode - keyCodeBase]
                    if (id) {
                        t.changeTag(id, tag)
                        t.setState({
                            activeIndex: Math.min(activeIndex + 1, pageSize - 1)
                        })
                    }
                    return
            }
        })
    }
    render () {
        const t = this
        return [
            <div style={{margin: '30px 0'}}>
                {t.renderPager()}
            </div>,
            t.renderTable(),
            t.renderPager(),
            !!webkitSpeechRecognition && <Modal active={true}>{INFO}</Modal>
        ]
    }
}