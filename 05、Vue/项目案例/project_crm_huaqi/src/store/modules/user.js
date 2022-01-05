import { login, getImgVerify, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        imagesCode: '',
        userInfo: null
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_IMAGESCODE: (state, imagesCode) => {
        state.imagesCode = imagesCode
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_USERINFO: (state, data) => {
        state.userInfo = data
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password, imagesCode } = userInfo;
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password.trim(), imagesCode: imagesCode.trim() }).then(response => {
                const { data } = response;
                console.log(data)
                commit('SET_USERINFO', data.userData)
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    getImgVerify({ commit }) {
        return new Promise((resolve, reject) => {
            getImgVerify().then(response => {
                const { data } = response;
                console.log(data)
                commit('SET_IMAGESCODE', data.imgUrl)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo({ id: state.userInfo.id, user_code: state.userInfo.user_code }).then(response => {
                const { data } = response
                console.log('返回用户信息：', data)
                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                const { user_name, user_avator } = data;
                commit('SET_NAME', user_name)
                commit('SET_AVATAR', user_avator)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            removeToken() // must remove  token  first
            resetRouter()
            commit('RESET_STATE')
            resolve()
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            window.localStorage.removeItem('store')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}