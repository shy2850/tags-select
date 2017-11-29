import * as React from 'react'

export default class extends React.Component {
    props
    state
    setState
    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
    }
    componentWillReceiveProps (nextProps) {
        const {active, ...props} = nextProps
        this.setState({...props})
    }
    show () {
        this.setState({
            active: true
        })
    }
    hide () {
        this.setState({
            active: false
        })
    }
    render () {
        const t = this
        const { state, props } = t
        const {
            title = '提示',
            children
        } = props
        const {
            active
        } = state
        return <div className={`modal ${active ? 'is-active' : ''}`}>
            {/* <div className="modal-background"></div> */}
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={e => t.hide()}></button>
                </header>
                <section className="modal-card-body">
                    <div className="content"> 
                    {children}
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-primary" onClick={e => t.hide()}>确定</button>
                </footer>
            </div>
        </div>   
    }
}