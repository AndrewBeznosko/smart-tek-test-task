const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg-icons'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg-icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/abstracts/_variables.scss";
          @import "@/assets/scss/abstracts/_mixins.scss";
        `,
      },
    },
  },
};
