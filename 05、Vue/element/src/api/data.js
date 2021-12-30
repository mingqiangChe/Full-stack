import axios from './axios'

export const getMenu = () => {
  return axios.request({
    url: 'menu',
    method: 'get'
  })
}

export const getHome = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}