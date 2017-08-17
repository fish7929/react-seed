/**
 * @component SwipeWrapper.jsx
 * @description 通用的滑动组件
 * @time 2017-06-18 16:40
 * @author fishYu
 **/
import React, { PropTypes } from 'react'

class SwipeWrapper extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.isScrolling = 1; //isScrolling为1时，表示纵向滑动，0为横向滑动
        this.startPos = {};  //取第一个touch的坐标值
        this.endPos = {};
    }
    /**
     * 渲染完成
     */
    componentDidMount() {

    }
    /**
     * 滑动开始处理函数
     * @param {object} e 事件对象
     */
    onStartHandler(e) {
        let touch = e.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
        this.startPos = { x: touch.pageX, y: touch.pageY, time: +new Date };    //取第一个touch的坐标值
        this.isScrolling = 1;   //这个参数判断是垂直滚动还是水平滚动
    }
    /**
     * 滑动过程中处理函数
     * @param {object} e 事件对象
     */
    onMoveHandler(e) {
        //当屏幕有多个touch或者页面被缩放过，就不执行move操作
        if (e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
        let touch = e.targetTouches[0];
        this.endPos = { x: touch.pageX - this.startPos.x, y: touch.pageY - this.startPos.y };
        this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1 : 0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
        if (this.isScrolling === 0) {
            e.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
        }
    }
    /**
     * 滑动结束处理函数
     * @param {object} e 事件对象
     */
    onEndHandler(e) {
        let duration = (+new Date) - this.startPos.time;    //滑动的持续时间
        if (this.isScrolling === 0) {    //当为水平滚动时
            if (Number(duration) > 10) {
                //判断是左移还是右移，当偏移量大于10时执行
                if (this.endPos.x > 10) {
                    console.log('right');
                    this.props.onSwipeRight && this.props.onSwipeRight();
                } else if (this.endPos.x < -10) {
                    console.log('left');
                    this.props.onSwipeLeft && this.props.onSwipeLeft();
                }
            }
        }
    }
    /**
     * 渲染
     */
    render() {
        return (
            <div className={this.props.className}  style={this.props.style} onClick={(e) => this.props.onClick&&this.props.onClick(e)}
                onTouchStart={(e) => this.onStartHandler(e)} onTouchMove={(e) => this.onMoveHandler(e)}
                onTouchEnd={(e) => this.onEndHandler(e)}>
                {this.props.children}
            </div>
        )
    }

    /**
     * 移除组件的时候
     */
    componentWillUnmount() {

    }
}

SwipeWrapper.PropTypes = {
    className: PropTypes.string.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
    onSwipeLeft: PropTypes.func.isRequired,
    onSwipeRight: PropTypes.func.isRequired
}

export default SwipeWrapper;