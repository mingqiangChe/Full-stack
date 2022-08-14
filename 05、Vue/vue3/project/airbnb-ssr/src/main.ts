import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

const app = createApp(App)
app.use(router)
// 挂载实例
app.use(ElementPlus)
app.mount("#app")
