/**
 * created by zhao
 * 2017/3/14
 */

import React from 'react';
import PageCSSTransition from '../components/animate/PageCSSTransition';

const App = React.createClass({
    componentWillEnter(callback){
        console.log("onEnter");
    },

    componentWillMount(){
    },

    componentWillUpdate(){
    },
    
    render(){
        return (
            <PageCSSTransition transitionName="cover">
                { React.cloneElement(this.props.children, { key: this.props.location.pathname }) }
            </PageCSSTransition>
        );
    }
})

export default App