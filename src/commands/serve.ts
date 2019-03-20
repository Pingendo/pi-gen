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
   
    // Build src and Start the Browsersync server
    Builder.default.run().then( () => {
        bs.init({
            server: "./build"
        });
    });

    // watch data & src folder
    bs.watch(['./data/*','./src_test/*']).on('change', () => {
        Builder.default.run().then( () => {
            // reload browser
            bs.reload();
        })
    });
  }
}
