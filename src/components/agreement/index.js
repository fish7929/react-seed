/**
 * @component ApplyAgreement.jsx
 * @description 协议。
 * @time 2017-03-27 15:40
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';

//require submodule
import "./index.scss";
const ICON = require('../../../assets/images/close.png');
const FIREST = 1;  //协议1
const SECOND = 2;  //协议2
class Agreement extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            isShow: this.props.isShow,
            type: this.props.type,     //
            classname : 'slideInFromBottom'  //动画名称  默认进入 slideInFromBottom  , 退出动画: slideOutToBottom
        }
    }
    /**
     * 返回按钮点击处理事件
     * @param {事件} e 
     */
    backHandler(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            classname: 'slideOutToBottom'
        });
        //先让动画结束在，执行回调， 动画时间为500毫秒
        setTimeout(() => this.props.cancelFn && this.props.cancelFn(), 500);
    }
    /**
     * 获取申请授权协议内容
     */
    getApplayAgreement() {
        return (
            `
            <p><b>欢迎阅读用户注册协议（“本协议”）。本协议的协议双方为：</b></p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            `
        );
    }
    /**
     * 获取借款协议内容
     */
    getBorrowAgreement() {
        return (
            `
            <p><b>欢迎阅读用户注册协议（“本协议”）。本协议的协议双方为：</b></p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            <p>一方：testttttttttttttttttttttttttttttttttttttttttttttttttttttttt。</p>
            `
        );
    }
    /**
     * 渲染界面
     */
    render() {
        return (
            this.state.isShow ? 
            <div className={'agreement-container ' + this.state.classname}>
                <div className="agreement-close" onTouchTap={(e) => this.backHandler(e)}></div>
                {/*<Header title={this.state.title} onBackClick={(e) => this.backHandler(e)} />*/}
                <div className='agreement-content' dangerouslySetInnerHTML={{__html : (this.state.type == FIREST ? this.getApplayAgreement():this.getBorrowAgreement())}} ></div>
            </div> : null
        );
    }
    /**
     * 更新属性
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            type :  nextProps.type,    //协议内容类型
            isShow : nextProps.isShow, //是否显示
            title : nextProps.title,    //标题内容
            classname : 'slideInFromBottom'
        });
    }
}
/**
 * 验证props
 */
Agreement.propTypes = {
    type: React.PropTypes.number,
    isShow: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    cancelFn: React.PropTypes.func,
    classname: React.PropTypes.string
};
/**
 * 默认props
 */
Agreement.defaultProps = {
    type: FIREST,
    title: '',
    isShow: false,
    classname: 'slideInFromBottom'
};

export default Agreement;
