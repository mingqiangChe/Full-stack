/*
 *    Copyright (c) 2018-2025, govmade All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: govmade
 */
import request from '@/utils/request'
import qs from 'qs'

const scope = 'server'

export const loginByUsername = (username, password) => {
  return request({
    url: '/api/users/login',
    headers: {
       isToken: false,
    },
    method: 'post',
    data: {
        phone:username,
        password
    }
  })
}

export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return request({
    url: '/api/auth/oauth/token',
    headers: {
      'isToken': false,
    },
    method: 'post',
    params: {refresh_token, grant_type, scope}
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/admin/user/info',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/api/auth/token/logout',
    method: 'delete'
  })
}

export const updatePassword =(data) =>{
    return request({
        url: '/api/users/updateUserPassword',
        method: 'post',
        data
      })
}

export const register =(data) =>{
    return request({
        url: '/api/users/register',
        method: 'post',
        data
      })
}