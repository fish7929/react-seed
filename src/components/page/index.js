/**
 * @component index.js
 * @description 通用的UI page组件
 * @time 2017-06-21 13:50
 * @author fishYu
 **/

import React from 'react';
import './index.scss';
const Page = React.createClass({
    render(){
        return (
            <div className={'ui-view-transitioning lt-ui-page'} id={this.props.id}>
                {this.props.children}
            </div>
        );
    }
});

export default Page;