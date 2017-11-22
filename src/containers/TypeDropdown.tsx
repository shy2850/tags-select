import * as React from 'react'
import Dropdown from '../components/Dropdown'
import Tags from './TypeTags'
import { tags, map } from '../type'

export default ({
    onSelect = e => {},
    activeItem
}) => Dropdown({
    content: <Tags tags={tags} onSelect={onSelect} activeItem={activeItem} style={{
        paddingLeft: 10,
        width: 360
    }}/>,
    children: 'Other'
})