# Sử dụng một hình ảnh Node.js cụ thể là LTS
FROM node:18-alpine
# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Chạy npm install để cài đặt các dependencies
RUN npm install

# Sao chép tất cả các tệp và thư mục khác vào thư mục làm việc
COPY . .

# Chạy npm run build để build ứng dụng Next.js
RUN npm run build

# Mở cổng 3000, nơi mà ứng dụng của Next.js thường chạy
EXPOSE 3000

# Chạy ứng dụng khi container được khởi chạy
CMD ["npm", "start"]
