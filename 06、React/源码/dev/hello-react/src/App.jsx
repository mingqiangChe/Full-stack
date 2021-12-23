/*
 * @Author: your name
 * @Date: 2021-12-21 17:56:20
 * @LastEditTime: 2021-12-22 20:55:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /06、React/源码/dev/hello-react/src/app.jsx
 */
import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

export default class App extends Component {
	//状态在哪里，操作状态的方法就在哪里

	//初始化状态
	state = {
		todos: [
			{ id: '001', name: '吃饭', done: true },
			{ id: '002', name: '睡觉', done: true },
			{ id: '003', name: '打代码', done: false },
			{ id: '004', name: '逛街', done: false }
		]
	}

	//addTodo用于添加一个todo，接收的参数是todo对象
	addTodo = (todoObj) => {
		const { todos } = this.state;
		const newTodos = [...todos, todoObj]
		this.setState({ todos: newTodos })
	}

	updateTodo = (id, done) => {
		const { todos } = this.state
		const newTodos = todos.map((todoObj) => {
			if (todoObj === id) return { ...todoObj, done }
			else return todoObj
		})
	}
	deleteTodo = (id) => {
		const { todos } = this.state
		const newTodos = todos.filter((todoObj) => {
			return todoObj.id !== id
		})
	}

	render() {
		const { todos } = this.state
		return (
			<div className="todo-container">
				<div className="todo-wrap">
					<Header addTodo={this.addTodo} />
					<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
					{/* <Footer todos={this.todos}/> */}
				</div>
			</div>
		)
	}
}
