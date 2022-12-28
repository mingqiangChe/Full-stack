import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// qiankun start
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([//注册应用函数
  {
    name: 'qiankun-app1', // 必须保持一致
    entry: '//localhost:3012',
    container: '#app1-contain',//显示的页面挂载到那个元素上
    activeRule: '/app1',//访问路径
  },
  {
    name: 'qiankun-app2',
    entry: '/localhost:3013',
    container: '#app2-contain',
    activeRule: '/app1',
  },
]);

start();
//qiankun end
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
