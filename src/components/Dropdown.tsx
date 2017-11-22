import * as React from 'react'

export default ({
    content,
    children
}) => <div className="dropdown is-hoverable is-right">
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