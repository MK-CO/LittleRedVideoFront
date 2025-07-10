// API 配置
const API_CONFIG = {
  // 开发环境使用本地地址，生产环境使用服务器地址
  BASE_URL: typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:5001/'
    : 'http://172.245.62.112/lrv/'
};

// API 请求工具
export const api = {
  // 下载视频
  async downloadVideo(url: string) {
    const response = await fetch(`${API_CONFIG.BASE_URL}api/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    return response.json();
  },

  // 提交反馈
  async submitFeedback(data: { name?: string; email?: string; message: string }) {
    const response = await fetch(`${API_CONFIG.BASE_URL}api/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};

export default api;