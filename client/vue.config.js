const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  pages: {
    frontend: {
      entry: 'src/storefront/main.ts',
      title: 'storefront',
    },
    admin: {
      entry: 'src/admin/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Admin Panel',
    },
  },
  outputDir: path.resolve(__dirname, 'dist'),
  filenameHashing: false,
  css: {
    extract: {
      filename: 'css/[name]/style.min.css',
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'js/[name]/script.min.js',
    }
  },
  transpileDependencies: false,
  devServer: {
    port: 8080,
  },
})
