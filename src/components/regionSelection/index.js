/**
 * @component index.js
 * @description 通用的
 * @time 2017-06-27 16:20
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';
import ReactDOM from 'react-dom';

//require submodule
import SwipeWrapper from './SwipeWrapper.js';
import Region from './Region.js';
//reruire resource 
import "./index.scss";
const Empty = { name: '', code: '' };
//备注 树形结构 {code: '', name:'' , city:[code: '', name:'', dist:[code: '', name:'']]}
const ZERO = 0;
const FIRST = 1;
const SECOND = 2;
const THREE = 3;
const ClientWidth = document.body.clientWidth;   //移动端界面的宽度
class RegionSelection extends React.Component {
    /**
     *构造函数   
     */
    constructor(props) {
        super(props);
        let _default = this.props.defaultVal;
        //当前显示哪一页
        let _current = (_default.length - 1) < 0 ? 0 : (_default.length - 1);
        this.state = {
            isShow: false,
            region: _default,
            provinceList: this.props.metaData,  //省   
            cityList: [],   //市
            districtList: [], //区
            current: _current
        };
        this.currentProv = null;  //当前选中的省
        //之前状态
        // this.cityKey = 'cities';      
        // this.distKey = 'districts';

        this.cityKey = 'city';   
        this.distKey = 'dist';
    }
    /**
     * 确定按钮点击处理事件
     */
    sureHandler(region) {
        this.setState({ isShow: false });
        this.props.sureFn && this.props.sureFn(region);
    }
    /**
     * 取消点击处理事件
     */
    cancelHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isShow: false });
        this.props.cancelFn && this.props.cancelFn();
    }
    /**
     * 渲染地区选择的标题部分
     */
    renderTitleSection() {
        let { region, provinceList, cityList, districtList } = this.state;
        let _default = region;
        if (_default.length == 0 && provinceList.length > 0) {
            _default.push(Empty);
        } else if (_default.length < 2 && cityList.length > 0) {
            _default.push(Empty);
        } else if (_default.length < 3 && districtList.length > 0) {
            _default.push(Empty);
        }
        return (
            <div className='region-selection-title'>
                <div className='title-hint has-bottom-border'>所在地区<span onClick={(e) => this.cancelHandler(e)}></span></div>
                <div className='region-selected-wrapper region-scroll-hidden'>
                    {_default.map((item, index) => {
                        let _class = this.state.current == index ? 'region-tab-slected' : '';
                        let noneClass = item.name ? ' ' : ' no-region';
                        return (<span key={index} className={_class + noneClass} onClick={() => this.swiperHandler(index)}>
                            {item.name ? item.name : '请选择'}
                        </span>);
                    })}
                </div>
            </div>
        );
    }
    /**
     * 左滑事件
     */
    onSwipeLeftHandler() {
        let oldIndex = this.state.current || ZERO;
        let max = this.state.region.length - 1;
        let _current = oldIndex < max ? oldIndex + FIRST : max;
        this.swiperHandler(_current);
    }
    /**
     * 右滑事件
     */
    onSwipeRightHandler() {
        let oldIndex = this.state.current || ZERO;
        let _current = oldIndex > ZERO ? oldIndex - FIRST : ZERO;
        this.swiperHandler(_current);
    }
    /**
     * 滑动tab
     * @param {number} index 当前下标
     */
    swiperHandler(index) {
        this.setState({
            current: index
        });
        setTimeout(() => {
            let mySwipeWrapper = ReactDOM.findDOMNode(this.refs.mySwipeWrapper);
            if (mySwipeWrapper) {
                mySwipeWrapper.style.transform = "translate(-" + (index * ClientWidth) + "px, 0) translateZ(0)";
                mySwipeWrapper.style.WebkitTransform = "translate(-" + (index * ClientWidth) + "px, 0) translateZ(0)";
            }
        }, 0);
    }
    /**
     * 
     * @param {object} obj 当前选中对象
     * @param {number} type  选择的类型 0 省，1 市，2 区 以此类推
     */
    changeRegionHandler(obj, type) {
        let oldRegion = this.state.region;
        let oldCityList = this.state.cityList;
        let oldDistrictList = this.state.districtList;
        let newRegion = [];
        switch (type) {
            case ZERO:  //选择省 
                this.currentProv = obj;
                oldCityList = this.getCurrentList(this.props.metaData, obj, this.cityKey, oldCityList);
                newRegion.push(obj);
                oldDistrictList = [];
                break;
            case FIRST:  //选择市
                oldDistrictList = this.getCurrentList(oldCityList, obj, this.distKey, oldDistrictList);
                newRegion.push(this.currentProv);  //身份
                newRegion.push(obj);
                break;
            case SECOND: //选择区
                //结束选择
                oldRegion[type] = obj;
                this.sureHandler(oldRegion);
                return;
        }
        let _current = type + 1;
        this.setState({
            region: newRegion,
            cityList: oldCityList,
            districtList: oldDistrictList
        });
        //切换标签
        this.swiperHandler(_current);
    }
    /**
     * 获取当前数组
     * @param {array} arr 筛选数组
     * @param {object} obj 匹配对象 
     * @param {string} key 键
     * @param {array} list 默认数组
     */
    getCurrentList(arr, obj, key, list) {
        let current = arr.find((item, index) => item.code == obj.code);
        let res = current ? current[key] : list;
        return res;
    }
    /**
     * 渲染内容部分
     */
    renderContentSection() {
        let { provinceList, cityList, districtList, region } = this.state;
        let len = 1;
        if (provinceList.length > 0 && cityList.length == 0) {
            len = 1;
        } else if (cityList.length > 0 && districtList.length == 0) {
            len = 2;
        } else if (districtList.length > 0) {
            len = 3;
        }
        let _style = { width: (len * ClientWidth)  + "px" };
        let _itemStyle = { width: ClientWidth + "px" };
        return (
            <SwipeWrapper className="region-selection-content" style={_style} ref="mySwipeWrapper"
                onSwipeLeft={() => this.onSwipeLeftHandler()}
                onSwipeRight={() => this.onSwipeRightHandler()}>
                {provinceList.length > 0 ? <Region display={region} tab={ZERO} style={_itemStyle}
                    metaData={provinceList} onSelected={(obj, type) => this.changeRegionHandler(obj, type)} /> : null}
                {cityList.length > 0 ? <Region display={region} tab={FIRST} style={_itemStyle}
                    metaData={cityList} onSelected={(obj, type) => this.changeRegionHandler(obj, type)} /> : null}
                {districtList.length > 0 ? <Region display={region} tab={SECOND} style={_itemStyle}
                    metaData={districtList} onSelected={(obj, type) => this.changeRegionHandler(obj, type)} /> : null}
            </SwipeWrapper>
        );
    }
    /**
     * 渲染界面
     */
    render() {
        return this.state.isShow ? (
            <div className="region-selection-container">
                <div className="region-selection-mask" onClick={(e) => this.cancelHandler(e)}></div>
                <div className="region-selection-wrapper">
                    {this.renderTitleSection()}
                    {this.renderContentSection()}
                </div>
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
        //设置回显的时候
        let _default = nextProps.defaultVal;
        let _current = (_default.length - 1) <= 0 ? 0 : (_default.length - 1);
        let oldCityList = [];
        let oldDistrictList = [];
        
        if ((_default.length - 1) >= 1)  { //有值的情况
            oldCityList = this.getCurrentList(nextProps.metaData, _default[0], this.cityKey, oldCityList);
            oldDistrictList = this.getCurrentList(oldCityList, _default[1], this.distKey, oldDistrictList);
        }
        this.setState({
            isShow: nextProps.isShow,
            region: _default,
            provinceList: nextProps.metaData,
            cityList: oldCityList,
            districtList: oldDistrictList
        });
        this.swiperHandler(_current);
    }
    /**
     * 组件销毁的时候
     */
    componentWillUnmount() {
    }
}
/**
 * 验证props
 */
RegionSelection.propTypes = {
    isShow: React.PropTypes.bool.isRequired,
    defaultVal: React.PropTypes.array.isRequired,
    metaData: React.PropTypes.array.isRequired,
    sureFn: React.PropTypes.func,
    cancelFn: React.PropTypes.func
};
/**
 * 默认props
 */
RegionSelection.defaultProps = {
    isShow: false
};
export default RegionSelection;
