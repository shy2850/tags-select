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
            data: []
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
        const { data } = t.state
        const changeTag = t.changeTag.bind(t)
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
                {data.map(({id, name, value, url, tags, tag}) => <tr key={`${id}`}>
                    <td>{id}</td>
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
        pageNo = pageNo || t.state.pageNo
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
    componentDidMount () {
        this.toPage(this.state.pageNo)
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