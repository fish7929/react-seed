/**
 * @component PageTransition.js
 * @description 页的转场动画
 * @time 2017-03-30 14:50
 * @author fishYu
 **/
import React from 'react';

import PageCSSTransitionChild from './PageCSSTransitionChild';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';

const PageCSSTransition = React.createClass({
    
    propTypes: {
        transitionName: React.PropTypes.string.isRequired
    },

    _wrapChild(child){
        return (
            <PageCSSTransitionChild
                transitionName={this.props.transitionName}
                transitionEnterTimeout={this.props.transitionEnterTimeout}
                transitionLeaveTimeout={this.props.transitionLeaveTimeout}>
                {child}
            </PageCSSTransitionChild>
        );
    },

    render(){
        return (
            <ReactTransitionGroup {...this.props} childFactory={this._wrapChild} />
        );
    }
});

export default PageCSSTransition