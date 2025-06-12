// API 配置
const API_CONFIG = {
    // 开发环境使用本地地址，生产环境使用服务器地址
    BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://127.0.0.1:5001'
        : 'http://172.245.62.112/lrv/'
};

// 导出配置
export default API_CONFIG; 