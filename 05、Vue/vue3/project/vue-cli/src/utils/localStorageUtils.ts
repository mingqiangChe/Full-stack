// 保存数据到浏览器的缓存中
export function saveArray(key: string, value: []) {
    localStorage.setItem(key, JSON.stringify(value))
}
// 读取数据
export function readArray(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]')
}
