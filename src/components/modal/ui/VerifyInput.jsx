/**
 * @component Header.jsx
 * @description 通用的头部组件。
 * @time 2017-03-13 10:00
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';
import ReactDOM from 'react-dom';


//require submodule
import Dialog from './Dialog';
const SuccessLogo = require('../../../assets/images/success.png');
class VerifyInput extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);

        this.state={
            countDown : 60,
            isShowToast: false
        };
        this.timer = null;
    }
    /**
     * 获取验证码点击处理事件
     * @param {事件} e 
     */
    getCodeHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        //显示toast对话框
        this.showToastDialog();
        //TODO 需要调用获取验证码的接口
        
        //修改界面ui
        this.timer = setInterval(() => {
            var oldCount = this.state.countDown;
            if(oldCount == 1) {
                clearInterval(this.timer);
                this.setState({countDown : 60});
                return;
            }
            var newCount = oldCount - 1;
            this.setState({countDown : newCount});
        }, 1000);
    }
    /**
     * 输入框改变处理事件
     * @param {事件} e 
     */
    changeCodeHandler(e) {
        this.props.change&&this.props.change(e);
    }
    /**
     * 渲染界面
     */
    render() {
        var hintStr = this.state.countDown == 60 ? '获取验证码' : this.state.countDown + '秒后重试';
        var _hitDom = this.state.countDown == 60 ? (<span className="verify-code right btn-active" onTouchTap={(e) => this.getCodeHandler(e)}>{hintStr}</span>) : 
            (<span className="verify-code right">{hintStr}</span>);
        var _className = 'common-input ' + this.props.class;
        return (
            <div className={_className}>
                {this.buildDialog({
                    isShow: this.state.isShowToast,
                    message: '验证码已发生至您手机',
                    type: 2,
                    position: "center",
                    cancelFn: () => {
                        this.dialogCancelHandler();
                    }
                })}
                <span>{this.props.hint}</span>
                <input type='tel' value={this.props.value} placeholder={this.props.placeHolder} 
                ref="verifyCode" onChange={(e) => this.changeCodeHandler(e)} maxLength='6' />
                {_hitDom}
            </div>
        );
    }
    /**
     * 显示对话框
     */
    showToastDialog() {
        this.setState({isShowToast: true});
        //自动调用关闭
        this.refs.toastDialog.toastAutoClose();
    }
    /**
     * 对话框取消回调
     */
    dialogCancelHandler() {
        //隐藏对话框
        this.setState({isShowToast: false});
    }
    /**
     * 创建对话框
     * @param {传递到属性对象} options 
     */
    buildDialog(options) {
        return <Dialog ref="toastDialog" {...options} />
    }
    /**
     * 取消焦点
     */
    cancelFocus(){
        var verifyCode = ReactDOM.findDOMNode(this.refs.verifyCode);
        verifyCode&&verifyCode.blur();
        this.timer && clearInterval(this.timer);
    }
    /**
     * 组件销毁的时候
     */
    componentWillUnmount() {
        this.cancelFocus();
    }
}


/**
 * 验证props
 */
VerifyInput.propTypes = {
    hint: React.PropTypes.string,
    class: React.PropTypes.string,
    change: React.PropTypes.func.isRequired,
    placeHolder: React.PropTypes.string
};
/**
 * 默认props
 */
VerifyInput.defaultProps = {
    hint: "验证码",
    placeHolder: '请输入验证码',
    class: ''
};

export default VerifyInput;
