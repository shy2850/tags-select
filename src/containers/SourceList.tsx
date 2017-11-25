import * as React from 'react'
import Tags from '../containers/TypeTags'
import Pager from '../components/Pagination'
import TypeDropdown from './TypeDropdown'

export default class extends React.Component {
    state
    setState
    props
    constructor(props) {
        super(props)
        this.state = {
            pageSize: 10,
            pageNo: 1,
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
                                <td>{value}</td>
                            </tr>
                            <tr>
                                <td colspan="2"><Tags tags={tags.match(/\w+/g)} activeItem={tag} onSelect={t => changeTag(id, t === tag ? '' : t)}/></td>
                            </tr>
                        </table>
                    </td>
                    <td><TypeDropdown activeItem={tag} onSelect={t => changeTag(id, t === tag ? '' : t)}/></td>
                    <td>{url}</td>
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
    componentDidMount () {
        const t = this
        t.toPage(t.state.pageNo)
        document.addEventListener('keydown', e => {
            const {
                pageNo,
                pageSize,
                data,
                activeIndex
            } = t.state
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
                    const { id = 0, tags = '' } = data[activeIndex] || {}
                    let tag = tags.split(/\W+/)[e.keyCode - 49]
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
            t.renderPager()
        ]
    }
}