import * as React from 'react'
import Tags from '../components/Tags'
import { map } from '../type'

export default ({
    tags = [],
    onSelect,
    activeItem,
    ...props
}) => {
    return <Tags tags={tags.map(item => ({
        name: map[item],
        value: item
    }))} onSelect={onSelect} activeItem={activeItem} {...props}/>
}
