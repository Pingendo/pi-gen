import {Command, flags} from '@oclif/command'
var piTemplate = require('../../pi-template')
import { readFileSync } from 'fs'



export default class Compile extends Command {
  static description = 'compile an html template'

  static examples = [
    `$ pi-gen compile ./src/index.html`,
  ]

  // static flags = {
  //   help: flags.help({char: 'h'}),
  //   // flag with a value (-n, --name=VALUE)
  //   name: flags.string({char: 'n', description: 'name to print'}),
  //   // flag with no value (-f, --force)
  //   force: flags.boolean({char: 'f'}),
  // }

  static args = [
    {
      name: 'file', 
      required: true,
      description: 'input file'
    }
  ]

  async run() {
    const {args} = this.parse(Compile)
    let data = readFileSync(args.file)
    var t = piTemplate(data, {foo:'Hello'}); //Hello
    console.log(t)
  }
}
