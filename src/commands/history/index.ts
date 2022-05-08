const chalk = require('chalk');

import {neilFetchAndAnalyze} from '../../common';
import {Command} from '@oclif/core';
import {error} from '../../utils';

export default class HistoryCommand extends Command {
  static description = chalk.green(
    'How far back from the latest block you want to query?',
  );

  static examples = [chalk.green(`$ neil history 10`)];

  static args = [
    {
      name: 'number',
      description: chalk.yellow(
        'The number of blocks to query from the latest block',
      ),
    },
  ];

  async run(): Promise<void> {
    const {args} = await this.parse(HistoryCommand);

    let numberOfBlocks = args.number;
    if (numberOfBlocks) {
      await neilFetchAndAnalyze(numberOfBlocks, 0);
    } else {
      this.error(
        chalk.red(
          'please specify the number of blocks to query from the latest block',
        ),
      );
    }
  }
}
