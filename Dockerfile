# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 复制项目文件到 Nginx 默认目录
COPY . /usr/share/nginx/html/

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 8009 端口
EXPOSE 8009

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"] 