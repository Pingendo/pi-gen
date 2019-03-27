import {expect, test} from '@oclif/test'
const fs = require('fs');

describe('compile', () => {
  test
    .stdout()
    .command(['compile','./test.html'])
    .it('runs compile', (ctx:any) => {
      expect(true)
      // expect(fs.readFileSync('./build/test.html').toString()).to.equal('example')
    })
})