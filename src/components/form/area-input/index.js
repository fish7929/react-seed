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
import BaseInput from 'UIComponents/form/input/index.js';
import './index.scss';
class AreaInput extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);
    }
    /**
     * 选择点击事件
     */
    showLocationHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let { showLocation } = this.props;
        showLocation && showLocation();
    }
    /**
     * 获取省市区显示位置
     */
    getLocationHint() {
        let {isSelectLocation, location} = this.props;
        let hint = "省&emsp;&emsp;&emsp;市&emsp;&emsp;&emsp;区";
        if (isSelectLocation) {
            let names = location.map((item) => item.name);
            hint = names.join('');
        }
        return hint;
    }
    /**
     * 渲染界面
     */
    render() {
        let { defaultVal, label, placeholder, maxLength, field, isSelectLocation, onChange} = this.props;
        let locationHint = this.getLocationHint();
        let locationHintClass = isSelectLocation ? '' : 'common-location-hint';
        let ref = 'collection-location-input';
        return (
            <div>
                <div className={'common-select-location ' + locationHintClass} data-hint='所在地区'
                    onClick={(e) => this.showLocationHandler(e)} dangerouslySetInnerHTML={{ __html: locationHint }}></div>
                <BaseInput label={label} placeholder={placeholder} field={field} ref={ref} key={ref} maxLength={maxLength}
                    onChange={onChange} defaultVal={defaultVal} classname='collection-input-border'/>
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
    checkHandler(e, val){
        let key = 'collection-location-input';
        let doc = this.refs[key];
        return doc.checkHandler(null, val);
    }
    cancelFocus() {
        let key = 'collection-location-input';
        let doc = this.refs[key];
        doc && doc.cancelFocus();
    }
}
/**
 * 验证props
 */
AreaInput.propTypes = {
    label: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,  //存储的 字段
    onChange: React.PropTypes.func.isRequired,
    isSelectLocation: React.PropTypes.bool.isRequired,
    location: React.PropTypes.array.isRequired,
    showLocation: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    defaultVal: React.PropTypes.string,
    maxLength: React.PropTypes.number,
};
/**
 * 默认props
 */
AreaInput.defaultProps = {
};
export default AreaInput;
