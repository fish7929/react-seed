/**
 * @component PickerAddress.jsx
 * @description 地址选择通用组件。
 * @time 2017-03-27 15:40
 * @author fishYu
 **/

'use strict';

// require core module
import React from 'react';
import Popup from './popup';
import Picker from './picker';
//require submodule
//require style
import "./index.scss";

const __MIN_VALID_YEAR = 1970


function mapToArray(num, callback) {
    let arr = []
    for (let i = 0; i <  num; i++) {
        arr.push( callback(i) )
    }
    return arr
}

function getYearMon(year, min, max) {
    let ym = typeof year === 'object' && year.year ? {year: year.year, month: year.month} : {year}
    ym.min = min || 1
    ym.max = max || 12
    return ym
}

function getYearsByNum(n, minYear) {
    let maxYear = (new Date()).getFullYear()
    // n is number of years
    if (n && n > 0 && n < 1000) {
        minYear = minYear || (maxYear - n + 1)
    }
    // n is invalid value
    else {
        // n is max year
        if (n && n >= 1000)
            maxYear = n

        if (minYear) {
            n = maxYear - minYear + 1
        } else {
            n = 5
            minYear = maxYear - n + 1
        }
    }
    return mapToArray(n, i => {
        return getYearMon(minYear + i)
    })
}

function getYearArray(years) {
    if (Array.isArray(years))
        return years.map((y, i) => {
            return getYearMon(y)
        })
    if ((typeof years === 'object')) {
        let n = 0, min = 0
            , ymin = getYearMon(years.min), ymax = getYearMon(years.max)
        if ((typeof ymin.year === 'number') && ymin.year > __MIN_VALID_YEAR)
            min = ymin.year
        if ((typeof ymax.year === 'number') && ymax.year >= min)
            n = ymax.year
        let arr = getYearsByNum(n, min)
            , last = arr.length - 1
        if (last >= 0) {
            arr[0].min = ymin.month || arr[0].month
            arr[last].max = ymax.month || arr[last].month
        }
        return arr
    }
    else if (typeof years === 'number' && years > 0)
        return getYearsByNum(years)
    else
        return getYearsByNum(5)
}

function getDisplayYearMonth(arr) {
    let res = [];
    arr.forEach((data, index) => {
        for(let i  = data.min; i <= data.max; i++){
            let obj = {};
            obj.month = i;
            obj.year = data.year;
            res.push(obj);
        }
    });
    return res;
}
// range example  {min: {year: 2016, month: 2}, max: {year: 2018, month: 9}}   [2008, 2011, 2012, 2014, 2016]
const propTypes = {
    range: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
    onConfirm: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool.isRequired
}

class MonthRange extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);
        this.month = [];
        let yearArr = getYearArray(this.props.range);
        this.yearMonth = getDisplayYearMonth(yearArr);
        let _date = new Date();
        this.defaultValue = this.props.defaultValue || [
            {year: _date.getFullYear(), month: (_date.getMonth() - 1)},
        {year: _date.getFullYear(), month: _date.getMonth()}];
    }
    /**
     * 初始化值
     */
    initDefaultData () {
        //最高四级， 省-市-区-县
        this.data = {
            from: {
                list: this.yearMonth,
                defaultValue: this.defaultValue[0],
                displayValue (name) {
                    return name;
                }
            },
            to: {
                list: this.yearMonth,
                defaultValue: this.defaultValue[1],
                displayValue (name) {
                    return name;
                }
            }
        }
    }
    /**
     * 选择起始月份，执行函数
     * @param {object} from 乡的信息对象 
     */
    handleChangeFrom(from) {
        this.month[0] = from;
        this.props.onChange(this.address);
    }

    /**
     * 选择结束月份，执行函数
     * @param {object} to 街道的信息对象 
     */
    handleChangeTo(to) {
        this.month[1] = to;
        this.props.onChange(this.month);
    }

    handleClose () {
        //TODO 需要判断截止月份 大于起始月份
        this.props.onConfirm(this.month)
    }

    handleCancel () {
        this.props.onCancel()
    }

    render () {
        this.initDefaultData();
        return (<div className="ui-picker-address">
            <Popup
                onConfirm={this.handleClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                visible={this.props.visible}>
                <Picker
                    onChange={this.handleChangeFrom.bind(this)}
                    data={this.data.from} 
                />
                <Picker
                    onChange={this.handleChangeTo.bind(this)}
                    data={this.data.to} 
                /> 
            </Popup>
        </div>);
    }
}
/**
 * 验证props
 */
MonthRange.propTypes = propTypes;

export default MonthRange;
