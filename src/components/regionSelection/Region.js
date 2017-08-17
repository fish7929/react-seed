/**
 * @component index.js
 * @description 通用的
 * @time 2017-06-27 16:20
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';
//require submodule
//reruire resource 
const Empty = { name: '', code: '' };
class Region extends React.Component {
    /**
     *构造函数   
     */
    constructor(props) {
        super(props);
    }
    /**
     * 选择完成的时候
     * @param {object} e 事件对象 
     * @param {object} obj  选择的对象
     */
    onSelectedHandler(e, obj) {
        e.preventDefault();
        e.stopPropagation();
        let { onSelected, tab } = this.props;
        onSelected(obj, tab);
    }
    /**
     * 渲染界面
     */
    render() {
        let { display, metaData, tab, style } = this.props;
        let _default = display.length <= tab ? Empty : display[tab];
        return (
            <ul className='region-item-section region-scroll-hidden' id={"region-item-section-" + tab} style={style}>
                {metaData.map((item, index) => {
                    let _class = item.code == _default.code ? 'region-item-selected' : '';
                    let _obj = { code: item.code, name: item.name };
                    return (
                        <li key={index} className="region-item" onClick={(e) => this.onSelectedHandler(e, _obj)} >
                            <span className={_class}>{item.name}</span>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
/**
 * 验证props
 */
Region.propTypes = {
    display: React.PropTypes.array.isRequired,
    tab: React.PropTypes.number.isRequired,
    metaData: React.PropTypes.array.isRequired,
    onSelected: React.PropTypes.func.isRequired,
    style: React.PropTypes.object.isRequired
};
export default Region;
