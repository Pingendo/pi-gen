import {Command, flags} from '@oclif/command'

import { readFileSync } from 'fs'
import PiGen from '../pi-gen';
import * as fs from 'fs'
const walkSync = require('walk-sync');

export default class Compile extends Command {
  static description = 'compile an src dir'

  static examples = [
    `$ pi-gen build`,
  ]

  // static flags = {
  //   help: flags.help({char: 'h'}),
  //   // flag with a value (-n, --name=VALUE)
  //   name: flags.string({char: 'n', description: 'name to print'}),
  //   // flag with no value (-f, --force)
  //   force: flags.boolean({char: 'f'}),
  // }

  async run() {

    var default_path = "./src_test/";

    var g = new PiGen()
    var paths = Array();
    var arr = walkSync(default_path);
    arr.forEach( (el : any) => {
      if(el[0] != ".") paths.push(default_path +  el )
    });
    g.pages(paths);
    g.data()
    g.build()

    // let data = readFileSync(args.file)
    // var t = piTemplate(data, {foo:'Hello'}); //Hello
    // console.log(t)
  }
}
