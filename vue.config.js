module.exports = {
	devServer: {
        //open: process.platform === 'darwin',
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        open:true,
        proxy: 'http://localhost:3000', // string | Object
        before: app => { }
    },

	
	//publicPath: process.env.NODE_ENV === 'production' ? '/sakai-vue' : '/'
  }

  