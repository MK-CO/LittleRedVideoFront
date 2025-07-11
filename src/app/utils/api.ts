// API 配置
const API_CONFIG = {
  // 使用相对路径，通过Next.js代理转发到后端服务器，避免CORS问题
  BASE_URL: '/'
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