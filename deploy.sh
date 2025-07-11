#!/bin/bash

# 一键部署脚本 - 构建并部署到服务器
set -e

# 服务器配置
SERVER_IP="172.245.62.112"
SERVER_USER="root"
SERVER_PASSWORD="pbf05SV7l90XurFQ9S"
APP_NAME="littlered-video"
CONTAINER_NAME="littlered-video-app"
PORT="8009"

echo "=== 开始一键部署流程 ==="
echo "目标服务器: $SERVER_IP:$PORT"
echo ""

# 第一步：构建项目
echo "步骤 1/3: 构建项目..."
echo "清理之前的构建文件..."
rm -rf .next
rm -f littlered-video.tar.gz

echo "安装依赖..."
npm ci

echo "构建Next.js项目..."
npm run build

echo "创建部署包..."
tar -czf littlered-video.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=.next/cache \
  --exclude=old \
  --exclude='._*' \
  --exclude='.DS_Store' \
  .

echo "✓ 构建完成！部署包大小:"
ls -lh littlered-video.tar.gz
echo ""

# 第二步：上传部署包到服务器
echo "步骤 2/3: 上传部署包到服务器..."
sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no littlered-video.tar.gz $SERVER_USER@$SERVER_IP:/tmp/
echo "✓ 上传完成！"
echo ""

# 第三步：在服务器上执行部署命令
echo "步骤 3/3: 在服务器上执行部署..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << EOF
set -e

# 创建应用目录
mkdir -p /opt/$APP_NAME
cd /opt/$APP_NAME

# 停止并删除旧容器
echo "停止旧容器..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# 删除旧镜像
docker rmi $APP_NAME:latest 2>/dev/null || true

# 解压新的部署包
echo "解压部署包..."
rm -rf *
tar -xzf /tmp/littlered-video.tar.gz

# 构建Docker镜像
echo "构建Docker镜像..."
docker build -t $APP_NAME:latest .

# 启动新容器
echo "启动新容器..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p $PORT:$PORT \
  $APP_NAME:latest

# 检查容器状态
echo "检查容器状态..."
sleep 5
docker ps | grep $CONTAINER_NAME

echo "✓ 部署完成！应用运行在端口 $PORT"
EOF

echo ""
echo "=== 部署成功！==="
echo "访问地址: http://$SERVER_IP:$PORT"
echo "容器名称: $CONTAINER_NAME"
echo "镜像名称: $APP_NAME:latest"
echo ""
echo "常用命令:"
echo "  查看容器状态: ssh $SERVER_USER@$SERVER_IP 'docker ps | grep $CONTAINER_NAME'"
echo "  查看容器日志: ssh $SERVER_USER@$SERVER_IP 'docker logs $CONTAINER_NAME'"
echo "  重启容器: ssh $SERVER_USER@$SERVER_IP 'docker restart $CONTAINER_NAME'"
echo ""