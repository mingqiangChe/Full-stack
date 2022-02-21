import {getStore, setStore} from '@/utils/store'
import {isURL, validatenull} from '@/utils/validate'
import {deepClone, encryption, pickDeep} from '@/utils/utils'
import {loginByUsername, getUserInfo, logout, refreshToken} from '@/api/login'
const user = {
    state: {
        userInfo: getStore(
            {name: 'userInfo'}
        ) || {},
        access_token: getStore(
            {name: 'access_token'}
        ) || '',
        refresh_token: getStore(
            {name: 'refresh_token'}
        ) || ''
    },
    actions: {
        // 单点登录
        LoginBySSO({
            commit
        }, data) {
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_USER_INFO', data.user_info)
        },
        // 根据用户名登录
        LoginByUsername({
            commit
        }, userInfo) { // const user = encryption({data: userInfo, key: 'pigxpigxpigxpigx', param: ['password']})
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo.phone, userInfo.password).then(response => {
                    const data = response.data.data
                    commit('SET_ACCESS_TOKEN', data.access_token)
                    commit('SET_REFRESH_TOKEN', data.refresh_token)
                    commit('SET_USER_INFO', data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 刷新token
        RefreshToken(
            {commit, state}
        ) {
            return new Promise((resolve, reject) => {
                refreshToken(state.refresh_token).then(response => {
                    const data = response.data.data
                    commit('SET_ACCESS_TOKEN', data.access_token)
                    commit('SET_REFRESH_TOKEN', data.refresh_token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 查询用户信息
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data.data || {}
                    data.sysUser.roleCode = data.roleCode
                    commit('SET_USER_INFO', data.sysUser)
                    resolve(data)
                }).catch(() => {
                    reject()
                })
            })
        },
        // 登出
        LogOut({commit}) {
            return new Promise((resolve, reject) => {
                // logout().then(() => { // resetRouter();

                // }).catch(error => {
                //     reject(error)
                // })
                commit('SET_USER_INFO', {})
                commit('SET_ACCESS_TOKEN', '')
                commit('SET_REFRESH_TOKEN', '')
                resolve()
            })
        },
        FedLogOut({commit}) {
            return new Promise(resolve => { // resetRouter();
                commit('SET_USER_INFO', {})
                commit('SET_ACCESS_TOKEN', '')
                commit('SET_REFRESH_TOKEN', '')
                resolve()
            })
        }
    },
    mutations: {
        SET_ACCESS_TOKEN: (state, access_token) => {
            state.access_token = access_token
            setStore({name: 'access_token', content: state.access_token, type: 'session'})
        },
        SET_REFRESH_TOKEN: (state, rfToken) => {
            state.refresh_token = rfToken
            setStore({name: 'refresh_token', content: state.refresh_token, type: 'session'})
        },
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo
            setStore({name: 'userInfo', content: userInfo, type: 'session'})
        }
    }

}
export default user
