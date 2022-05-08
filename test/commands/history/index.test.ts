import {expect, test} from '@oclif/test';

describe('history', async () => {
  test
    .stdout()
    .command(['history', '1'])
    .it('should run history command', ctx => {
      expect(ctx.stdout).to.contain('Getting provider');
      expect(ctx.stdout).to.contain('Analysing the blocks data');
      expect(ctx.stdout).to.contain('Senders: ');
      expect(ctx.stdout).to.contain('Recipients: ');
      expect(ctx.stdout).to.contain('Total amount of Ether transferred: ');
    });

  test
    .stderr()
    .command(['history'])
    .exit(2)
    .it('should fail to run the command if required args are not passed');
});
