import { ref } from "vue";
// 引入axios
import axios from 'axios'
// 发送ajax请求
export default function <T>(url: string) {
    // 加载状态
    const loading = ref(true)
    // 请求成功数据
    const data = ref<T | null>(null)
    // 错误信息
    const errorMsg = ref(null) //坑⭐⭐
    // 发送请求
    axios.get(url).then(responese => {
        // 改变加载状态
        loading.value = false
        data.value = responese.data
    }).catch(error => {
        // 改变加载状态
        loading.value = false
        errorMsg.value = error.message || "未知错误"
    })
    return {
        loading, data, errorMsg
    }
}
