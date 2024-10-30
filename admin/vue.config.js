const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  outputDir: '../dist/admin',
  transpileDependencies: true,
  devServer: {
    port: 8080,
  },
})
