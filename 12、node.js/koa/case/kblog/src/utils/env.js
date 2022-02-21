let baseUrl = '';
const env = process.env || 'development'
console.log(env);
if (env.NODE_ENV == 'development') {
    baseUrl = ``; // 开发环境地址
} else if (env.NODE_ENV == 'production') {
    baseUrl = `http://localhost:3001`; //生产环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = `http://localhost:3001`; //测试环境地址
}
export {
    baseUrl,
    env
}