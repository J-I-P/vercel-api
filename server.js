const express = require('express');
const fs = require('fs');
const path = require('path');

const server = express();
server.use(express.json()); // 允許解析 JSON 請求

// 動態載入 /api 目錄下的 API 檔案
const apiPath = path.join(__dirname, 'api');
fs.readdirSync(apiPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = `/api/${file.replace('.js', '')}`;
        const apiHandler = require(path.join(apiPath, file));
        server.use(route, apiHandler);
    }
});

// 啟動伺服器
server.listen(process.env.PORT || 3000, () => {
    console.log('API Server is running');
});

module.exports = server;
