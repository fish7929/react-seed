/**
 * @component input.js
 * @description 通用的输入框组件。
 * @time 2017-7-24 10:20
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
const FIRST = 1;
const SECOND = 2;
class BaseInput extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: ''
        };
    }
    /**
     * 确定按钮点击处理事件
     */
    changeHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let { field, onChange } = this.props;
        let val = e.target.value;
        this.setState({ errorMsg: '' });
        onChange && onChange(val, field);
    }
    /**
     * 选择点击事件
     */
    chooseHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let { field, rightFn } = this.props;
        this.setState({ errorMsg: '' });
        rightFn && rightFn(field);
    }
    /**
     * 检查输入
     * @param {object} e 事件
     * @param {string} value 值
     */
    checkHandler(e, value) {
        let val = '';
        if (e) {
            e.preventDefault();
            e.stopPropagation();
            val = e.target.value;
        } else {
            val = value;
        }
        let { required, pattern, errorType, label, field } = this.props;
        let msg = '';
        if ((field.toLocaleLowerCase()).indexOf('name') > -1) {  //姓名的判断
            pattern = pattern ? pattern : '^[A-Za-z0-9\\u4e00-\\u9fa5]+$';
        } else if ((field.toLocaleLowerCase()).indexOf('phone') > -1 ||
            (field.toLocaleLowerCase()).indexOf('mobile') > -1) {  //手机号的判断
            // pattern = pattern ? pattern : '^1[3|4|5|7|8][0-9]\\d{8}$';
            pattern = pattern ? pattern : '^1\\d{10}$';
        }
        let isOk = true;
        if (required && !val) {
            msg = label + '不能为空';
            isOk = false;
        } else if (val && pattern) {
            let reg = new RegExp(pattern);
            msg = reg.test(val) ? '' : ('您输入的' + label + '格式不正确，请重新输入');
            isOk = reg.test(val);
        }
        if (errorType === FIRST) {
            this.setState({
                errorMsg: msg
            });
        } else {
            msg && AppModal.toast(msg);  //todo 过度依赖与AppModal
        }
        return isOk;
    }
    /**
     * 渲染界面
     */
    render() {
        let { defaultVal, classname, label, placeholder, maxLength, rightText,
            errorType, field, disabled, rightFn } = this.props;
        return (
            <div className={'rt-input-wrapper ' + classname}>
                <div className='rt-common-input'>
                    {label ? <span>{label}</span> : null}
                    <input type='text' value={defaultVal} placeholder={placeholder} maxLength={maxLength} ref={field + '-input'}
                        onChange={(e) => this.changeHandler(e)} onBlur={(e) => this.checkHandler(e)} disabled={disabled} />
                    {rightFn ? <i onClick={(e) => this.chooseHandler(e)}>{rightText}</i> : null}
                </div>
                {(this.state.errorMsg && errorType === FIRST) ? <div className="rt-error-msg">{this.state.errorMsg}</div> : null}
            </div>
        );
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
    }
    /**
     * 组件销毁的时候
     */
    componentWillUnmount() {
        this.cancelFocus();
    }

    cancelFocus() {
        let { field } = this.props;
        let key = field + "-input";
        let _input = ReactDOM.findDOMNode(this.refs[key]);
        _input && _input.blur();
    }
}
/**
 * 验证props
 */
BaseInput.propTypes = {
    label: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,  //存储的 字段
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    classname: React.PropTypes.string,
    defaultVal: React.PropTypes.string,
    errorType: React.PropTypes.number,  //验证消息的类型， 1 , 下发出错提示， 2、toast提示
    pattern: React.PropTypes.any, //验证消息的正则
    required: React.PropTypes.bool,  //验证消息是否必须输入
    maxLength: React.PropTypes.number,
    disabled: React.PropTypes.bool,  //是否可输入
    rightFn: React.PropTypes.func,  //右边按钮
    rightText: React.PropTypes.string
};
/**
 * 默认props
 */
BaseInput.defaultProps = {
    errorType: FIRST,
    defaultVal: '',
    placeholder: '',
    field: '',
    required: true,
    disabled: false,
    rightText: '打开通讯录',
    classname: '',
    pattern: null,
    maxLength: 100
};
export default BaseInput;
