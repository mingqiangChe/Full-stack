/*
 * @Author: your name
 * @Date: 2021-12-22 12:56:35
 * @LastEditTime: 2021-12-22 21:22:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /06、React/源码/dev/hello-react/src/components/List/index.jsx
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'
export default class index extends Component {
	static propTypes = {
		todos: PropTypes.array.isRequired,
		updateTodo: PropTypes.func.isRequired,
		deleteTodo:PropTypes.func.isRequired

	}
	render() {
		// tonggu
		const { todos, updateTodo ,deleteTodo} = this.props;
		return (
			<ul className='todo-main'>
				{todos.map(todo => { return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}></Item> })}
			</ul>
		)
	}
}
