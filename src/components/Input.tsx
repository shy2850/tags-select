import * as React from 'react'

export default class extends React.Component {
    state
    setState
    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({...nextProps})
    }
    init (input) {
        const {
            defaultValue = ''
        } = this.state
        if (input) {
            input.value = defaultValue
        }
    }
    render () {
        const init = this.init.bind(this)
        const { state } = this
        return <input {...state} ref={init}/>    
    }
}