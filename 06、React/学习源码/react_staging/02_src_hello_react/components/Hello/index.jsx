/*
 * @Author: your name
 * @Date: 2021-12-17 10:20:46
 * @LastEditTime: 2021-12-27 19:38:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /06、React/源码/react_staging/02_src_hello_react/components/Hello/index.jsx
 */
import React,{Component} from 'react'
import hello from './index.module.css'

export default class Hello extends Component{
	render(){
		return <h2  className={hello.title}>Hello,React!</h2>
	}
}
