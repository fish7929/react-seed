/**
 * create by zhao at 2017/5/25
 */
import { hashHistory } from 'react-router'
import MD5 from 'MD5'

import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as RouterConst from '../../../static/const/routerConst'

const receiveData = data => ({
    type: ActionType.UPDATE_USER_LOGIN,
    data: data
})

/**
 * 用户登录 
 @userName 用户名
 @password 密码
*/
export const userLogin = (userName, password) => dispatch => {
    let url = "/pvmtsys/user/api/login"
    let opt = {
        username: userName,
        password: password
    }

    dispatch(utils.sendMsg(url, opt, "GET")).then(data => {
        dispatch({
            type: ActionType.INIT_USER_LOGIN,
            data: data
        })
    })
}