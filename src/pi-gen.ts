
import * as path from 'path'
var piTemplate = require('pi-template');
import * as fs from 'fs'
const walkSync = require('walk-sync');
const sass = require('node-sass');
const shell = require('shelljs');
const cheerio = require('cheerio')


interface IDictionary<TValue> {
    [id: string]: TValue;
}

class Model {
    sources:Map<string, Page> = new Map()
    data:any = {}
}

class Page {
    contents:Buffer = Buffer.alloc(0) 
}

export default class PiGen {
    prefix:string = process.cwd()
    model:Model = new Model()

    public pages(paths?:Array<string>):PiGen {
        
        if (!paths) 
            paths = [this.prefix]

        paths.forEach((p) => {

            if ( fs.lstatSync(path.join(this.prefix , p)).isFile() ){
                var c = fs.readFileSync(path.join(this.prefix , p))
                var page = new Page()
                page.contents = c
                this.model.sources.set(p, page)
            }
        })

        return this
    }

    public build() {

        this.model.sources.forEach((page,key) => {

            var buildPath = path.join(this.prefix ,'build', key.replace("src/",""))
            if (!fs.existsSync(path.dirname(buildPath)))
                shell.mkdir('-p', path.dirname(buildPath));

            if(path.extname(key) == ".scss" ) {
                if(path.basename(key)[0] != "_") {
                    console.log("Compiling SASS ", key)
                    var result = sass.renderSync({
                        // data: page.contents.toString('utf8')
                        file: key
                    });
                    fs.writeFileSync( buildPath.replace(".scss",".css"), result.css.toString('utf8'));
                }
            }
            else if(path.extname(key) == ".html" ) {
                // console.log(page.contents)
                console.log("Compiling HTML ", key)
                var out = piTemplate(page.contents, {data:this.model.data})
                // var array = out.split("<!DOCTYPE");
                var array = out.split("<html");
                array.shift();

                if(array.length == 1){
                    const $ = cheerio.load(out)
                    if( $('html').attr("ht-slug") ){
                        var buildPath = path.join(this.prefix ,'build', $('html').attr("ht-slug"));
                        $('html').removeAttr("ht-slug");
                        fs.writeFileSync( buildPath ,'<!DOCTYPE html>'+$.html() )
                    }   
                    else
                        fs.writeFileSync(buildPath,out )
                }
                else {
                    for (let index = 0; index < array.length; index++) {


                        if(array[index] != ""){
                            const $ = cheerio.load("<html"+array[index])

                            if( $('html').attr("ht-slug") ){
                                var buildPath = path.join(this.prefix ,'build', $('html').attr("ht-slug"));
                                $('html').removeAttr("ht-slug");
                                fs.writeFileSync( buildPath ,'<!DOCTYPE html>'+$.html() )
                            }
                            else
                                fs.writeFileSync(buildPath.replace(".html","-"+index+".html"), +'<!DOCTYPE html>'+$.html())
                        }
                    }
                }
            }
            else {
                console.log("Copying ", key)
                fs.writeFileSync(buildPath, page.contents); 
            }
                
        })
        return this
    }

    public data() {

        if (!fs.existsSync("./data/")) 
            return this

        const paths = walkSync("./data/")

        paths.forEach((k:string, v:string) => {
        
            if( path.extname(k) == ".json"){
                var c = fs.readFileSync(path.join(this.prefix , 'data', k)).toString()

                if( k.indexOf(path.sep) != -1 ){
                    
                    var key = String( path.dirname(k).split(path.sep).pop() )

                    if(!this.model.data[ key ])
                        this.model.data[ key ] = Array()

                    this.model.data[ key ].push( JSON.parse(c) )
                }
                else{
                    var key = k.replace(".json","")
                    this.model.data[ key ] = JSON.parse(c)
                }
            }
        })
        return this
    }
}