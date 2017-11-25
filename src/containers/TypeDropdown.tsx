import * as React from 'react'
import Dropdown from '../components/Dropdown'
import Tags from '../components/Tags'
import { list, tags, map } from '../type'

export default ({
    onSelect = e => {},
    activeItem
}) => Dropdown({
    content: list.map(({name, children}, i) => <dl key={`${i}`} className="columns" style={{width: 480, paddingLeft: 10}}>
        <dt className="column is-2 is-small tags">
            <label className="tag is-white">{name}</label>
        </dt>
        <dd className="column">
            <Tags tags={children} onSelect={onSelect} activeItem={activeItem} style={{
                paddingLeft: 10
            }}/>
        </dd>
    </dl>),
    children: 'Other'
})

