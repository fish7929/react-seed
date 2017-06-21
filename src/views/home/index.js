/**
 * @component Application.jsx
 * @description 提现与购物
 * @time 2017-06-12 19:15
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';
import ReactDOM from 'react-dom';

//require submodule
import Page from '../../components/page';
// import PullToRefresh from '../../components/ui/PullToRefresh';
import NoRecord from '../../components/noRecord';
import IsLoading from '../../components/isLoading';
import NoMore from '../../components/noMore';

import ApplicationItem from '../../components/ApplicationItem';
import Dialog from '../../components/ui/Dialog';
import { FIRST, SECOND, THREE } from '../../constants';

import "./index.scss";
const ItemCount = 20;
const DefaultTag = 'ALL';
class Home extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);
        this.state = this.getInitState();
    }
    /**
     * 初始化的状态
     */
    getInitState(state) {
        state = state || {};
        return Object.assign(state, {
            tab: DefaultTag,   //默认选中的标签
            currentPage: 1,  //当前第一页
            isFinish: false,       //是否加载结束， 没有更多
            noItem: false     //一条记录都没有
        });
    }
    /**
     * 返回按钮点击处理事件
     * @param {事件} e 
     */
    changeTagHandler(e) {
        // e.preventDefault();
        e.stopPropagation();
        //测试跳转到申请列表
        var target = e.target;
        var tag = target.getAttribute('data-tag');
        this.setState({
            tab: tag,
            isLoading: true
        });
        this.loadListByTag(true);
    }
    /**
     * 渲染头部
     */
    renderTitleSection() {
        let len = this.state.tags.length;
        return (
            <ul className="report-list-title report-scroll-hidden">
                {this.state.tags.map((tag, index) => {
                    var _code = tag.code;
                    var _class = this.state.tab == _code ? 'tag-selected' : '';
                    {/*var _count = '';  //tag.quantity  不显示的，强制设置成''*/ }
                    var _count = tag.amount;  //tag.quantity  tag.amount 不显示的，强制设置成''
                    return (<li className={_class} onTouchTap={(e) => this.changeTagHandler(e)}
                        data-tag={_code} key={index} data-count={_count}>{tag.titleName}</li>)
                })
                }
            </ul>
        )
    }

    /**
     * 渲染列表
     */
    renderListSection() {
        return (
            <ul className="report-list-content" ref="ulList" >
                {this.props.list.map((item, index) => <ApplicationItem item={item} key={index} />)}
                {this.renderIsLoadingSection()}
                {this.renderNoMoreSection()}
                {this.renderNoRecordSection()}
            </ul>
        )
    }
    /**
     * 渲染正在加载
     */
    renderIsLoadingSection() {
        return (
            this.props.isFetching ? <IsLoading /> : null
        )
    }
    /**
     * 渲染没有更多
     */
    renderNoMoreSection() {
        return (
            this.state.isFinish ? <NoMore /> : null
        )
    }
    /**
     * 渲染没有记录
     */
    renderNoRecordSection() {
        return (
            this.state.noItem ? <NoRecord /> : null
        )
    }
    /**
     * 渲染界面
     */
    render() {
        return (
            <Page id='application-list-page'>
                {this.renderTitleSection()}
                {/*<PullToRefresh loadUp={(resolve) => this.dropdownToRefresh(resolve)}
                    className="report-list-c mdx-scroller" ref='pullToRefresh'>*/}
                {this.renderListSection()}
                {/*</PullToRefresh>*/}
            </Page>
        );
    }
    /**
     * 获取标题内容
     */
    getTitle() {
        var title = '首页';
        return title;
    }
    /**
     * 组件渲染完成调用
     */
    componentDidMount() {
        //动态设置页面标题
        var title = this.getTitle();
        Base.setTitle(title);
        //获取网络初始化数据，
        this.getInitData();
        //上拉加载更多的操作
        this.pullToLoading();
    }
    /**
     * 获取网络初始化数据，
     */
    getInitData() {
        this.loadTitleData();
        this.loadListByTag();
    }
    /**
     * 下拉刷新的具体操作
     * @param {操作成功的回调} resolve 
     */
    dropdownToRefresh(resolve) {
        //还原初始状态
        this.setState(this.getInitState());
        //获取网络初始化数据，
        this.getInitData();
        //刷新成功取消样式
        setTimeout(function () {
            resolve();
        }, 500);
    }
    /**
     * 上拉加载实现方法
     */
    pullToLoading() {
        // 这里做延迟是由于，一部加载的时候
        setTimeout(() => {
            var ulList = ReactDOM.findDOMNode(this.refs.ulList);
            // var ulList = ReactDOM.findDOMNode(this.refs.pullToRefresh);
            var self = this;
            if (ulList) {
                ulList.onscroll = function (e) {
                    e.stopPropagation();
                    // e.preventDefault();
                    if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 1)) {  //滑动到底部的时候加载
                        if (!self.props.isFinish) {   //没结束就继续加载
                            if (self.props.isFetching) return;  //在加载中的情况就不执行
                            self.setState({ currentPage: self.state.currentPage + 1 });
                            self.loadListByTag();
                        } else {

                        }
                    }
                }
            }
        }, 120);
    }
    /**
     * 组件渲染完成调用
     */
    componentWillUnmount() {
        //删除滑动加载
        var ulList = ReactDOM.findDOMNode(this.refs.ulList);
        // var ulList = ReactDOM.findDOMNode(this.refs.pullToRefresh);
        if (ulList) ulList.onscroll = null;
    }
    /**
     * 重置默认值
     */
    resetDefaultState() {
        this.setState({
            currentPage: 1,
        });
    }
    /**
     * 点击TAP重新加载数据
     */
    loadListByTag(isReFash = false) {
        isReFash && this.resetDefaultState();
        let {itemCount} = this.props;
        setTimeout(() => {   //预防上次设置的 state没执行，做个延迟
            let skip = (this.state.currentPage - 1) * itemCount;
            let param = {
                fUserId: this.fuserId,
                type: this.state.tab,
                startIndex: skip,
                pageSize: itemCount,
                queryDay: this.type
            };
            this.props.fetchData(1, param);
        }, 0);

    }
    /**
     * 设置标题数据
     * @param {标题TAG数据集合} data 
     */
    setTagsData(data) {
        if (data.length > 0) {
            this.setState({ tags: data, tab: data[0].code });
        }
    }
    /**
     * 加载头部TAG数据
     */
    loadTitleData() {
        //需要加载头部的API
        this.props.fetchData(0);
    }
    /**
     * 网络请求数据
     * @param {请求数据的链接地址} url 
     * @param {请求成功回调函数} cbOk 
     * @param {请求失败回调} cbErr 
     */
    loadData(url, cbOk, cbErr = null) {
        WebAPIUtils.getRESTfulData({
            url: url,
            success: (res) => {
                if (res.status == 0) {  //成功的情况
                    if (res && res.data && res.data.length > 0) {
                        cbOk(res.data);
                    } else {
                        cbOk([]);
                    }
                } else {
                    cbOk([]);
                }
            },
            error: (error) => {
                console.log(error);
                cbErr && cbErr(error);
            }
        });
    }
    /**
     * 对话框取消事件
     */
    cancelDialogHandler() {
        this.setState({ isShowDialog: false });
    }

}


let mapStateToProps = state => {
    return ({
        isFetching: state.homeData.isFetching,
        list: state.homeData.list,
        tags: state.homeData.tags
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData,  refreshData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
