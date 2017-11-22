import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SourceList from './containers/SourceList'

const toPage = (pageNo = 1, pageSize = 20) => fetch(`/source?pageNo=${pageNo}&pageSize=${pageSize}`).then(res => res.json())
const changeTag = (id, tag)=> fetch(`/source?id=${id}&tag=${tag}`, {method: 'PUT'})

ReactDOM.render(<div className="container"><SourceList toPage={toPage} changeTag={changeTag}/></div>, document.body)
