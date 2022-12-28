import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
export async function bootstrap() {
  console.log('[react] react app bootstraped');
}
// @ts-ignore
export async function mount(props) {//props 挂载元素
  console.log(props);
  ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}
// @ts-ignore
export async function update(props) {//节点更新操作
  console.log('update props ',props);
}
// @ts-ignore
export async function unmount(props) {//取消挂载
  ReactDOM.unmountComponentAtNode(props.container ? props.container.querySelector('#root') : document.getElementById('root'))
}
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {//判断是否是乾坤框架 作单独渲染
  ReactDOM.render(<App/>,document.getElementById('root'))
}

reportWebVitals();
