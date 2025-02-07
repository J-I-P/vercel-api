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
        const apiModule = require(path.join(apiPath, file));

        // ✅ 支援 CommonJS (`module.exports`)
        // ✅ 支援 ES6 (`export default`)
        const apiHandler = apiModule.default || apiModule;

        if (typeof apiHandler === 'function') {
            server.use(route, apiHandler);
            console.log(`✅ API ${route} 已載入`);
        } else {
            console.error(`❌ 無法載入 API: ${file}，請確保它是函數`);
        }
    }
});

// 啟動伺服器
server.listen(process.env.PORT || 3000, () => {
    console.log('API Server is running');
});

module.exports = server;
