import {Command, flags} from '@oclif/command'


import * as Builder from './build'

export default class Compile extends Command {
  static description = 'watch /src /data an reload'

  static examples = [
    `$ pi-gen serve`,
  ]

  static flags = {
    app: flags.string({required: true})
  }


  async run() {


    var bs = require("browser-sync").create();
    // Start the Browsersync server
    bs.init({
        server: "./build"
    });

    // and call any methods on it.
    bs.watch(['./data/*','./src_test/*']).on('change', () => {
        Builder.default.run().then( () => {
            // reload browser
            bs.reload();
        })
    });
  }
}
