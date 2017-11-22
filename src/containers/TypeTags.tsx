import * as React from 'react'
import Tags from '../components/Tags'
import { map } from '../type'

export default ({
    tags = [],
    onSelect,
    activeItem,
    ...props
}) => {
    if (activeItem && tags.indexOf(activeItem) === -1) {
        tags.push(activeItem)
    }
    return <Tags tags={tags.map(item => ({
        name: map(item),
        value: item
    }))} onSelect={onSelect} activeItem={activeItem} {...props}/>
}
