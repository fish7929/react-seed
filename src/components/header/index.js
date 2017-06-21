/**
 * @component Header.js
 * @description 通用的UI header组件
 * @time 2017-03-30 12:50
 * @author fishYu
 **/
import React, { PropTypes } from 'react';

class Header extends React.Component {

    render() {
        let { title, isShowBack, onBackClick } = this.props

        return (
            <header className="app-header">
                <div>
                    <span>{title}</span>
                    {isShowBack ? <button onTouchTap={(e) => { onBackClick ? onBackClick(e) : navigate.goBack() }}></button> : null}
                </div>
            </header>
        )
    }
}

Header.PropTypes = {
    title: PropTypes.string.isRequired,
    isShowBack: PropTypes.bool.isRequired,
    onBackClick: PropTypes.func
}

export default Header