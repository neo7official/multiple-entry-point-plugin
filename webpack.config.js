const path = require("path");
const src_path = path.resolve('src/');
const dist_path = path.resolve('dist/');


const multipleEntryPoints = require("./multiple_entry_point_plugin/multipleEntryPoints");

const webpackDevServer = require("webpack-dev-server");


module.exports = {
	mode:"development",
	output:{
		filename:"js/[name].js",
		path:dist_path,
		publicPath:"/",
	},
	plugins:[
		new multipleEntryPoints()
	],
	devServer:{
		port:3000,
		overlay: true,
		historyApiFallback: true,
		open:true,
		hot:false,
		watchOptions: {
	      poll: true
	    }
	}
}