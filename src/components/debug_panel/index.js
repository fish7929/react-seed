import "./debug"
import React, { Component } from "react"
import classNames from 'classnames'

function addLog(type, msg){
    const li = document.createElement('li')
    li.className = `log log-${type}`
    li.innerHTML = `<pre>[${type}]: ${msg}</pre>`
    document.querySelector('#logs').appendChild(li);
}

export default class DebugPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }

        let that = this;
        const oldLog = console.log
        console.log = function(...args){
            let msg = args.map(arg => (typeof arg == 'object' ? JSON.stringify(arg, null, 2) : arg))
            addLog('info', msg.join(' '))
            return oldLog.apply(console, arguments)
        }

        const oldDebug = console.debug
        console.debug = function(...args){
            let msg = args.map(arg => (typeof arg == 'object' ? JSON.stringify(arg, null, 2) : arg))
            addLog('debug', msg.join(' '))
            return oldDebug.apply(console, arguments)
        }

        const oldWarn = console.warn
        console.warn = function(...args){
            let msg = args.map(arg => (typeof arg == 'object' ? JSON.stringify(arg, null, 2) : arg))
            addLog('warning', msg.join(' '))
            return oldWarn.apply(console, arguments)
        }

        const oldError = console.error
        console.error = function(...args){
            let msg = args.map(arg => (typeof arg == 'object' ? JSON.stringify(arg, null, 2) : arg))
            addLog('error', msg.join(' '))
            return oldError.apply(console, arguments)
        }

        const oldOnError = window.onerror
        window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errobj) {
            const msg = `file: ${scriptURI},
                line: ${lineNumber}, 
                column: ${columnNumber},
                msg: ${errorMessage}`
            console.error(msg)
            if(oldOnError) {
                return oldOnError.apply(window, arguments)
            }
        }
    }

    openPanel() {
        this.setState({
            ...this.state,
            visible: !this.state.visible
        })
    }

    closePanel(e) {
        this.setState({
            ...this.state,
            visible: false
        })
        e.preventDefault();
    }

    clearPanel(e) {
        e.stopPropagation();
        e.preventDefault();
        document.querySelector('#logs').innerHTML = ""
    }

    render() {
        var panelClass = classNames({
            'debug-panel': true,
            'debug-panel-show': this.state.visible,
            'debug-panel-hide': !this.state.visible
        });
        return (
                <div className={panelClass} onClick={this.openPanel.bind(this)}>
                <h3><a className="close" href="#close" onClick={this.closePanel.bind(this)}>关闭</a> Console <a className="clear" href="#clear" onClick={this.clearPanel.bind(this)}>清空</a></h3>
                <ul id="logs">
                </ul>
                </div>
               )
    }
}
