import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SourceList from './containers/SourceList'

const {
	location,
	history
} = window

const PAGE_NUM = (function () {
	let match = location.pathname.match(/^\/(\d+)/)
	return match ? match[1] : 1
})()

const toPage = (pageNo = PAGE_NUM, pageSize = 20) => fetch(`/source?pageNo=${pageNo}&pageSize=${pageSize}`).then(res => {
	history.pushState({}, `第${pageNo}页`, `/${pageNo}`)
	return res.json()
})
const changeTag = (id, tag)=> fetch(`/source?id=${id}&tag=${tag}`, {method: 'PUT'})

ReactDOM.render(
	<SourceList toPage={toPage} changeTag={changeTag} pageNo={PAGE_NUM}/>
, document.body)
