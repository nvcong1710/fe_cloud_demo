# Stage 1: Build the React app
FROM node:18-alpine as build
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

# Stage 2: Serve the built app using Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist /app/dist

# Mở cổng 3000, nơi mà ứng dụng của Next.js thường chạy
EXPOSE 3000

# Command to serve the application
CMD ["npx", "vite", "preview", "--port", "3000", "--host", "0.0.0.0", "--config", "/app/dist/vite.config.js"]
