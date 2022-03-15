/*
 * @Author: your name
 * @Date: 2021-12-22 12:56:35
 * @LastEditTime: 2021-12-22 21:15:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /06、React/源码/dev/hello-react/src/components/Item/index.jsx
 */
import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
	state = { mouse: false }

	handleDelete = (id) => {
		if (window.confirm('确认码')) {
			this.props.deleteTodo(id)
		}
	}
	handleMouse = (flag) => {
		return () => {
			this.setState({ mouse: flag })
		}
	}
	handleCheck=(id)=>{
return (event)=>{
	this.props.updateTodo(id,event.target.checked)
}
	}

	render() {
		const { id, name, done } = this.props
		const { mouse } = this.state
		return (
			<li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
				<label>
					<input ></input>
					<span></span>
				</label>
			</li>
		)
	}
}
