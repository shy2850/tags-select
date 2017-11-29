import * as React from 'react'

const onFocus = e => {
    e.currentTarget.classList.add('is-active')
}
const onBlur = e => {
    e.currentTarget.classList.remove('is-active')
}
export default ({
    content,
    children
}) => <div className="dropdown is-hoverable is-right" onFocus={onFocus} onBlur={onBlur}>
    <div className="dropdown-trigger">
        <button className="button is-small">
            <span>{children}</span>
            <span className="icon is-small">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
            </span>
        </button>
    </div>
    <div className="dropdown-menu">
        <div className="dropdown-content">
            {content}
        </div>
    </div>
</div>