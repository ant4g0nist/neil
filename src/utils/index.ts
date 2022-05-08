import {BigNumber, ethers} from 'ethers';

const chalk = require('chalk');

const info_ = chalk.green;
const error_ = chalk.bold.red;
const warning_ = chalk.hex('#FFA500'); // Orange color
const line_color_ = chalk.yellow;
const msg_color_ = chalk.green;
const tty_columns_ = process.stdout.columns;
const horizontal_line_ = '-';

export const error = (msg: string) => {
  console.log(error_(msg));
  process.exit(-1);
};

export const info = (msg: string) => {
  console.log(info_(msg));
};

export const warning = (msg: string) => {
  console.log(warning_(msg));
};

export const draw_line = () => {
  let msg = line_color_(horizontal_line_.repeat(tty_columns_));
  console.log(msg);
};

export const context_title = (msg: string) => {
  const trail_len = msg.length;
  let title = ` ${msg_color_(msg)} `
    .padEnd(tty_columns_ - trail_len, horizontal_line_)
    .padStart(tty_columns_ + 10, horizontal_line_);
  console.log(title);
};

export const bigNumtoEther = (value: BigNumber) => {
  return Number(ethers.utils.formatEther(value));
};
