
import * as path from 'path'
var piTemplate = require('pi-template');
import * as fs from 'fs'
const walkSync = require('walk-sync');
const sass = require('node-sass');
const shell = require('shelljs');


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
                var c = fs.readFileSync(path.join(this.prefix , p),)
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
                if(key[0] != "_"){
                    var result = sass.renderSync({
                        data: page.contents.toString('utf8')
                    });
                    fs.writeFileSync( buildPath.replace(".scss",".css"), result.css.toString('utf8'));
                }
            }
            else if(path.extname(key) == ".html" ) {
                var out = piTemplate(page.contents, {data:this.model.data})
                fs.writeFileSync(buildPath, out)
            }
            else
                fs.writeFileSync( buildPath, page.contents);
        })
        return this
    }

    public data() {
        const paths = walkSync("./data/", { globs: ['*.json'] })
        console.log("data -> ", paths)

        paths.forEach((k:string, v:string) => {
            console.log(k, v)
            var c = fs.readFileSync(path.join(this.prefix , 'data', k)).toString()
            var key = k.replace(".json","")
            this.model.data[key] = JSON.parse(c)
        })
        
        return this
    }
    
}