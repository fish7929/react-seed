/**
 * @component Dialog.jsx
 * @description 通用对话框呈现的界面。
 * @time 2017-03-13 18:20
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';

//require submodule
import { FIRST, SECOND } from '../../constants';

class Dialog extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,    //消息框类型
            isShow: this.props.isShow, //是否显示
            countDown: this.props.countDown, //倒计时值
            title: this.props.title,    //提示框标题
            message: this.props.message,   //显示的内容
            isHideBtn: this.props.isHideBtn,  //是否隐藏按钮
            imgPath: this.props.imgPath,    //图片路径
            position: this.props.position,  //消息框显示的位置
            showTime: this.props.showTime  //显示的时间
        };

        this.timeout = null;
    }
    /**
     * 确定按钮点击处理事件
     */
    sureHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            isShow: false
        });
        this.timeout && clearInterval(this.timeout);
        this.timeout && clearTimeout(this.timeout);
        this.props.sureFn && this.props.sureFn();
    }
    /**
     * 取消点击处理事件
     */
    cancelHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.hide();
    }

    hide() {
        this.setState({ isShow: false });
        this.props.cancelFn && this.props.cancelFn();
        this.timeout && clearInterval(this.timeout);
        this.timeout && clearTimeout(this.timeout);
    }
    /**
     * 倒计时处理
     */
    countDownHandler() {
        //修改界面ui
        this.timeout = setInterval(() => {
            var oldCount = this.state.countDown;
            if (oldCount == 1) {
                clearInterval(this.timeout);
                this.setState({
                    countDown: 0,
                    isShow: false
                });
                //跳转到超时页面
                this.props.sureFn && this.props.sureFn();
                return;
            }
            var newCount = oldCount - 1;
            this.setState({ countDown: newCount });
        }, 1000);
    }

    /**
     * 渲染全屏按钮
     */
    renderScreenDialog() {
        var _buttonDom = this.state.isHideBtn ? (<div className='screen-dialog-button btn-active' onTouchTap={(e) => this.sureHandler(e)}>知道了</div>) :
            (<div className='screen-dialog-button'>
                <span className='btn-active' onTouchTap={(e) => this.cancelHandler(e)}>取消</span>
                <span className='btn-active' onTouchTap={(e) => this.sureHandler(e)}>确定</span>
            </div>);
        var _titleDom = this.state.title ? (<div className='screen-dialog-title'>{this.state.title}</div>) : null;
        return (
            <div className='screen-dialog-content xy-center'>
                {_titleDom}
                <div className='screen-dialog-message' dangerouslySetInnerHTML={{ __html: this.state.message }}></div>
                {_buttonDom}
            </div>
        );
    }
    /**
     * 渲染toast提示框
     */
    renderToastDialog() {
        var _imageDom = this.state.imgPath ? (<div className='toast-dialog-image' style={{ backgroundImage: "url(" + this.state.imgPath + ")" }}></div>) : null;
        var _toastMsg = this.state.countDown ? this.state.countDown + "秒" : this.state.message;
        return (
            <div className='toast-dialog-content'>
                {_imageDom}
                <div className='toast-dialog-message' dangerouslySetInnerHTML={{ __html: _toastMsg }}></div>
                <div className="toast-dialog-mask"></div>
            </div>
        );
    }
    /**
     * 渲染界面
     */
    render() {
        var _className = 'screen-dialog-container';
        if (this.state.type === SECOND) {
            switch (this.state.position) {
                case "top":
                    _className = 'toast-dialog-container-top x-center';
                    break;
                case "center":
                    _className = 'toast-dialog-container-center xy-center';
                    break;
                case "bottom":
                    _className = 'toast-dialog-container-bottom x-center';
                    break;
            }
        }
        return this.state.isShow ? (
            this.state.type === FIRST ?
            <div className={_className}>
                { this.renderScreenDialog() }
            </div> :
            <div className="toast-dialog-mask">
                <div className={_className}>
                    {this.renderToastDialog()}
                </div> 
            </div> 
        ) : null;
    }
    /**
     * toast显示框自动关闭处理函数
     */
    toastAutoClose() {
        if (this.state.type == SECOND) {
            if (!this.state.countDown) {  //没有倒计时按照默认2秒
                this.timeout = setTimeout(() => {
                    this.hide();
                }, this.state.showTime * 1000);
            } else {  //有倒计时的按照倒计时时间
                this.countDownHandler();
            }
        }
    }
    /**
     * 组件销毁的时候
     */
    componentDidMount() {
    }
    /**
     * 更新属性
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            type: nextProps.type,    //消息框类型
            isShow: nextProps.isShow, //是否显示
            countDown: nextProps.countDown, //倒计时值
            showTime: nextProps.showTime, //显示时间
            title: nextProps.title,    //提示框标题
            message: nextProps.message,   //显示的内容
            isHideBtn: nextProps.isHideBtn,  //是否隐藏按钮
            imgPath: nextProps.imgPath,    //图片路径
            position: nextProps.position  //消息框显示的位置
        });
    }
    /**
     * 清除定时器
     */
    clearTimer() {
        if (this.timeout) {
            clearInterval(this.timeout);
            clearTimeout(this.timeout);
        }
    }
    /**
     * 组件销毁的时候
     */
    componentWillUnmount() {
        this.clearTimer();
    }
}
/**
 * 验证props
 */
Dialog.propTypes = {
    type: React.PropTypes.number,
    isShow: React.PropTypes.bool.isRequired,
    countDown: React.PropTypes.number,
    title: React.PropTypes.string,
    position: React.PropTypes.string,
    imgPath: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    isHideBtn: React.PropTypes.bool,
    showTime: React.PropTypes.number,
    sureFn: React.PropTypes.func,
    cancelFn: React.PropTypes.func
};
/**
 * 默认props
 */
Dialog.defaultProps = {
    type: SECOND,
    title: '',
    message: '',
    imgPath: '',
    position: 'top',
    isShow: false,
    isHideBtn: false,
    countDown: 0,
    showTime: 2
};
export default Dialog;
