/**
 * @component VerifyDialog.jsx
 * @description 手机绑定呈现的界面。
 * @time 2017-03-13 18:20
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';

//require submodule
import VerifyInput from './VerifyInput';
//reruire resource

class VerifyDialog extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);
        this.state = {
            phone :  this.props.phone,    //消息框类型
            isShow : this.props.isShow, //是否显示
            isShowToast: false,
            countDown : 60, //倒计时值
            verifyCode: ''
        };
    }
    /**
     * 确定按钮点击处理事件
     */
    sureHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.hide();
        this.props.sureFn && this.props.sureFn();
    }
    /**
     * 取消点击处理事件
     */
    cancelHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.hide();
        this.props.cancelFn && this.props.cancelFn();
    }

    hide() {
        this.refs.verifyInput && this.refs.verifyInput.cancelFocus();
        this.setState({isShow: false});
        
    }
    /**
     * 检查验证码是否输入正确
     * @param {事件} e 
     */
    checkCode(e){
        var target = e .target;
        var value = target.value;
        value = value.replace(/[^\d]/g,"");
        target.value = value;
    }
    /**
     * 改变验证码
     * @param {事件} e 
     */
    changeVerifyCode(e){
        e.stopPropagation();
        this.checkCode(e);
        var target = e .target;
        var value = target.value;
        this.setState({verifyCode : value});
    }
    /**
     * 渲染全屏按钮
     */
    renderVerifyDialog() {
        var phoneStr = this.state.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        return (
            <div className='screen-dialog-content xy-center'>
                <div className='screen-dialog-title'>提现验证码</div>
                <div className='screen-dialog-message'>
                    <div className='verify-phone-wrapper' data-hint='手机号'>{phoneStr}</div>
                    <VerifyInput value={this.state.verifyCode} ref='verifyInput' hint='验证码' 
                change={(e) => this.changeVerifyCode(e)} class='verify-dialog-code' placeHolder='请输入检验码'/>
                </div>
                <div className='screen-dialog-button'>
                    <span className='btn-active' onTouchTap={(e) => this.cancelHandler(e)}>取消</span>
                    <span className='btn-active' onTouchTap={(e) => this.sureHandler(e)}>确定</span>
                </div>
            </div>
        );
    }
    /**
     * 渲染界面
     */
    render() {
        var _className = 'screen-dialog-container verify-dialog-container';
        return this.state.isShow ? (
            <div className={_className}>
                {this.renderVerifyDialog()}
            </div>
        ) : null;
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
            phone :  nextProps.phone,    //消息框类型
            isShow : nextProps.isShow //是否显示
        });
    }
    /**
     * 组件销毁的时候
     */
    componentWillUnmount() {
        this.hide();
    }
}
/**
 * 验证props
 */
VerifyDialog.propTypes = {
    isShow: React.PropTypes.bool.isRequired,
    phone: React.PropTypes.string.isRequired,
    sureFn: React.PropTypes.func,
    cancelFn: React.PropTypes.func
};
/**
 * 默认props
 */
VerifyDialog.defaultProps = {
    phone: '18312341234',
    isShow: false
};
export default VerifyDialog;
