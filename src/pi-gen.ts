
import * as path from 'path'
var piTemplate = require('pi-template');
import * as fs from 'fs'
const walkSync = require('walk-sync');


interface IDictionary<TValue> {
    [id: string]: TValue;
}

class Model {
    pages:Map<string, Page> = new Map()
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
                this.model.pages.set(p, page)
            }
        })

        return this
    }

    public build() {
        this.model.pages.forEach((page,key) => {
            var out = piTemplate(page.contents, {data:this.model.data})
            var buildPath = path.join(this.prefix ,'build', key)
            if (!fs.existsSync(path.dirname(buildPath)))
                fs.mkdirSync(path.dirname(buildPath))
            fs.writeFileSync(buildPath, out)
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