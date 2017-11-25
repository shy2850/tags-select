import * as React from 'react'
import Input from './Input'

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
    const goPage = () => {
        toPage(pageNo)
    }
    const onChange = e => {
        pageNo = e.target.value | 0
    }
    const onKeyDown = e => {
        switch (e.keyCode) {
            case 13:
                goPage()
                break
        }
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
                        <Input
                            className="button"
                            type="number" min="1" max={maxPage}
                            defaultValue={pageNo}
                            style={{width: 100}}
                            onKeyDown={onKeyDown}
                            onChange={onChange}/>
                    </p>
                </div>       
            </li>
        </ul>
    </nav>
}