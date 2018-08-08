const fs = require("fs");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const weblog = require('webpack-log');
const log = weblog({ name: 'MEP' });
const chalk = require("chalk");

 


class multipleEntryPoints{

	constructor(options){

		this.options = Object.assign({
			srcFolder:"./src",
			distFolder:"./dist",
			commonsChunk:true,
		}, options);


		this.build_html = this.build_html.bind(this);
		this.create_bundle = this.create_bundle.bind(this);
	}

	create_bundle(item, name, compiler){
		
		log.info(chalk.bgGreen.black(`Entry point mounted - ${item}`));
			compiler.options.entry[name] = item;
	}

	build_html(html_path, name, compiler){
		if(fs.existsSync(html_path)){
			new htmlWebpackPlugin(
				{
					filename:`${name}.html`,
					template:html_path,
					chunks:[`${name}`]
				}
			).apply(compiler);
		}else{
			new htmlWebpackPlugin({filename:`${name}.html`, chunks:[`${name}`]}).apply(compiler);
		}
	}
	normalize(name){
		return name.split(".")[0].replace("_", "-");
	}

	apply(compiler){

		compiler.options.entry = {};
		
		compiler.hooks.entryOption.tap("multipleEntryPoints", (compilation, entries) => {
			var item, name;
			log.info(chalk.bgYellow.black("**** MultipeEntryPoints Starts ****"));
			

					fs.readdirSync(path.resolve(this.options.srcFolder, "js/")).forEach(file =>{
						if(file.split(".").length > 1){ //ignoring folder names
							
							item = path.resolve(this.options.srcFolder, `js/${file}`);
							name = this.normalize(file);
							this.create_bundle(item, name, compiler);
							
							var html_path = path.resolve(this.options.srcFolder,`${name}.html`);
							this.build_html(html_path, name, compiler);					
						};
					});


			log.info(chalk.bgYellow.black("***** MultipeEntryPoints Ends *****"));
		});

	}
}

module.exports = multipleEntryPoints;
