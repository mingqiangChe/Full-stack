/*
 * @Author: your name
 * @Date: 2021-12-17 10:20:46
 * @LastEditTime: 2021-12-27 19:37:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /06、React/源码/react_staging/10_src_封装NavLink/components/MyNavLink/index.jsx
 */
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
	render() {
		// console.log(this.props);
		return ( 
			<NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
		)
	}
}
