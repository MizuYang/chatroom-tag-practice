const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/chatroom-tag-practice/' //* 儲存庫名稱
    : '/'
})
