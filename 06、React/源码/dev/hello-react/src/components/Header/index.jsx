/*
 * @Author: your name
 * @Date: 2021-12-22 12:56:35
 * @LastEditTime: 2021-12-22 15:41:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /06、React/源码/dev/hello-react/src/components/Header/index.jsx
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import './index.css'

export default class Header extends Component {

	//对接收的props进行：类型、必要性的限制
	static propTypes = {
		addTodo: PropTypes.func.isRequired
	}

	//键盘事件的回调
	handleKeyUp = (event) => {
		const { keyCode, target } = event
		if (keyCode !== 13) return
		if (target.value.trim() === '') {
			alert('不能为空')
			return
		}
		const newObj = { id: nanoid(), name: target.value, done: false }
		this.props.addTodo(newObj)
		target.value=''
	}

	render() {
		return (
			<div className="todo-header">
				<input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
			</div>
		)
	}
}
