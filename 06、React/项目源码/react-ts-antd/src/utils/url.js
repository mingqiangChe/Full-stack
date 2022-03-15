const isProduction = process.env.NODE_ENV === 'production';

// const url = isProduction ? 'https://github.com/jackchen0120/' : 'http://localhost:8088/';
const url = isProduction ? 'http://106.55.168.13:9000/' : 'http://localhost:8088/';
// http://106.55.168.13:9000

const apiUrl = '/api';  


export {
  apiUrl,
  url
};
