const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#096dd9',
              '@font-size-base': '14px',
              '@font-family': 'Battambang, Open Sans, sans-serif',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
