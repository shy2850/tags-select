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
        return <table className="table is-bordered is-fullwidth">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>value</th>
                    <th>url</th>
                    <th>tags</th>
                    <th>more tags</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({id, name, value, url, tags, tag}) => <tr key={`${id}`}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{value}</td>
                    <td>{url}</td>
                    <td><Tags tags={tags.match(/\w+/g)} activeItem={tag} onSelect={t => changeTag(id, t === tag ? '' : t)}/></td>
                    <td><TypeDropdown activeItem={tag} onSelect={t => changeTag(id, t === tag ? '' : t)}/></td>
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