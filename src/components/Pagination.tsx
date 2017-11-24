import * as React from 'react'

const emptyFn = (page) => {}
export default ({
    theme = 'primary',
    toPage = emptyFn,
    pageNo = 1,
    pageSize = 10,
    total = 0
}) => {
    // 不需要分页
    if (total <= pageSize) {
        return <div/>
    }

    const maxPage = Math.ceil(total / pageSize)
    const goPage = e => {
        toPage(e.target.previousElementSibling.children[0].value | 0)
    }

    return <nav className="pagination" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
            <li>
                <span className="pagination-link button" disabled={pageNo === 1} onClick={e => toPage(--pageNo)}>上一页</span>
            </li>
            <li>
                <span className={`pagination-link button is-${theme}`}>{pageNo}</span>
            </li>
            <li>
                <span className="pagination-link button" disabled={pageNo === maxPage} onClick={e => toPage(++pageNo)}>下一页</span>
            </li>
            <li style={{marginLeft: 20}}>
                <div className="field has-addons">
                    <p className="control">
                        <span className={`button is-${theme}`} onClick={goPage}>Go</span>
                    </p>
                    <p className="control">
                        <input className="button" type="text" defaultValue={pageNo} style={{width: 48}}/>
                    </p>
                </div>       
            </li>
        </ul>
    </nav>
}