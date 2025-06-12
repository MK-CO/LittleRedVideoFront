# Little Red Video Front

## 项目说明
这是一个基于 Nginx 托管的前端项目。

## 技术栈
- Nginx
- Docker
- GitHub Actions

## 本地开发
1. 克隆项目
```bash
git clone [项目地址]
cd LittleRedVideoFront
```

2. 本地运行
方式一：使用 Python 启动服务器
```bash
# 启动 Python HTTP 服务器
python3 -m http.server 8000
```
访问地址：http://localhost:8000/pages/index.html

方式二：使用 Docker
```bash
# 构建 Docker 镜像
docker build -t little-red-video-front .

# 运行容器
docker run -p 8009:8009 little-red-video-front
```

3. 访问测试
- Python 服务器：http://localhost:8000/pages/index.html
- Docker 方式：
  - 主页：http://localhost:8009
  - 静态资源：http://localhost:8009/js/ 和 http://localhost:8009/assets/

## 自动部署
项目使用 GitHub Actions 实现自动部署，当代码推送到 main 分支时会自动触发部署流程。

### 部署流程
1. 自动构建 Docker 镜像
2. 推送镜像到 DockerHub
3. 自动部署到服务器

### 所需配置
在 GitHub 仓库的 Settings -> Secrets and variables -> Actions 中配置以下密钥：

1. DockerHub 相关：
   - `DOCKERHUB_USERNAME`: DockerHub 用户名
   - `DOCKERHUB_TOKEN`: DockerHub 访问令牌

2. 服务器相关：
   - `SERVER_HOST`: 服务器 IP 地址
   - `SERVER_USERNAME`: 服务器用户名
   - `SERVER_PASSWORD`: 服务器密码
   - `SERVER_PORT`: SSH 端口（默认 22）

### 触发部署
只需将代码推送到 main 分支即可触发自动部署：
```bash
git add .
git commit -m "your commit message"
git push origin main
```

## 项目结构

```
frontend/
├── src/                # 源代码目录
│   ├── assets/        # 静态资源（图片等）
│   ├── components/    # 可复用组件
│   ├── pages/        # 页面文件
│   └── styles/       # 样式文件
```

## 页面说明

- `home.html`: 主页，包含视频下载功能
- `about.html`: 关于页面
- `faq.html`: 常见问题解答
- `feedback.html`: 用户反馈
- `blog.html`: 博客页面

## 开发说明

1. 所有页面文件都位于 `src/pages` 目录下
2. 静态资源（图片等）存放在 `src/assets` 目录下
3. 可复用的组件放在 `src/components` 目录下
4. 样式文件统一放在 `src/styles` 目录下

## 使用说明

直接在浏览器中打开 `src/pages/home.html` 即可使用，或使用本地服务器托管前端文件。

## 注意事项
1. 确保服务器已安装 Docker
2. 确保服务器防火墙允许 8009 端口访问
3. 如需修改端口，请同时更新 Dockerfile 和 nginx.conf
