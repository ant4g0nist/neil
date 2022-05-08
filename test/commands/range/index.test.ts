import {expect, test} from '@oclif/test';

describe('range', async () => {
  test
    .stdout()
    .command(['range', '14735709', '14735711'])
    .it('should run range command', ctx => {
      expect(ctx.stdout).to.contain('Getting provider');
      expect(ctx.stdout).to.contain('Analysing the blocks data');
      expect(ctx.stdout).to.contain('Senders: ');
      expect(ctx.stdout).to.contain('Recipients: ');
      expect(ctx.stdout).to.contain('Total amount of Ether transferred: ');
    });

  test
    .stderr()
    .command(['range'])
    .exit(2)
    .it('should fail to run the command if required args are not passed');
});
