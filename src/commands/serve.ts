import {Command} from '@oclif/command'


import * as Builder from './build'

export default class Compile extends Command {
  static description = 'watch /src /data an reload'

  static examples = [
    `$ pi-gen serve`,
  ]

  async run() {


    var bs = require("browser-sync").create();

    // Build src and Start the Browsersync server
    Builder.default.run().then( () => {
        bs.init({
            server: {
              baseDir: "./build",
              serveStaticOptions: {
                extensions: ['html']
              }
            }
        });
    });

    // watch data & src folder
    bs.watch(['./data/**/*','./src/**/*']).on('change', () => {
        Builder.default.run().then( () => {
            // reload browser
            bs.reload();
        })
    });
  }
}
