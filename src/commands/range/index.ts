const chalk = require('chalk');
import {Command, Flags} from '@oclif/core';
import {neilFetchAndAnalyze} from '../../common';

export default class RangeCommand extends Command {
  static description = chalk.green('Range of the blocks you want to query!');

  static examples = [`$ neil range 10 12`];

  static args = [
    {
      name: 'from',
      description: 'The starting block (inclusive) to run the query!',
    },
    {name: 'to', description: 'The end block (inclusive) to run the query!'},
  ];

  async run(): Promise<void> {
    const {args} = await this.parse(RangeCommand);

    let fromBlockNumber = args.from;
    let toBlockNumber = args.to;

    if (fromBlockNumber !== undefined && toBlockNumber !== undefined) {
      await neilFetchAndAnalyze(fromBlockNumber, toBlockNumber);
    } else {
      this.error(
        chalk.red(
          'please specify the number of blocks to query from the latest block',
        ),
      );
    }
  }
}
