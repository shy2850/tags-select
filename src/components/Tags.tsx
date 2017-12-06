import * as React from 'react'

export default ({
    tags = [],
    onSelect = v => v,
    activeItem,
    ...props
}) => <div className="tags" {...props}>
    {tags.map(({name, value}, i) => <a
        key={`${i}`}
        onClick={e => onSelect(value)}
        className={`tag${activeItem === value ? ' is-primary' : ''}`}
        title={value}>{name}</a>)}
</div>