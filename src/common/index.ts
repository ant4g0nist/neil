const Listr = require('listr');
const Table = require('cli-table');

import {BigNumber} from 'ethers';
import {ParseBlockResults} from './rpc';
import {bigNumtoEther, context_title, draw_line} from '../utils';
import {getBlocksDataCommon, getProvider, parseBlocks} from './rpc';

export type Sender = {
  contract: boolean;
  etherValue: number;
};

export type Recipients = {
  contract: boolean;
  etherValue: number;
};

export type Transfers = {
  senders: {
    [address: string]: Sender;
  };
  recipients: {
    [address: string]: Recipients;
  };
};

export const neilFetchAndAnalyze = async (
  startBlockNumber: number,
  endBlockNumber: number,
) => {
  const tasks = new Listr([], {exitOnError: true});

  //TASK00: get provider from infura
  tasks.add({
    title: 'Getting provider',
    task: async (ctx: any) => {
      ctx.provider = await getProvider();
    },
  });

  //TASK01: fetches the transactions from the blocks provided
  tasks.add({
    title: `Fetching blocks for analysis`,
    task: async (ctx: any) => {
      if (startBlockNumber) startBlockNumber = Number(startBlockNumber);
      if (endBlockNumber) endBlockNumber = Number(endBlockNumber);

      ctx.blockData = await getBlocksDataCommon(
        ctx.provider,
        startBlockNumber,
        endBlockNumber,
      );
    },
  });

  //TASK02: Analyses the transactions
  tasks.add({
    title: 'Analysing the blocks data',
    task: async (ctx: any) => {
      ctx.results = await parseBlocks(ctx.provider, ctx.blockData);
    },
  });

  //run the above three tasks
  let output = await tasks.run().catch((err: any) => {
    console.error(err);
  });

  //Merge and tabelize and display the results
  if (output && output.results !== undefined)
    await displayResults(output.results);
};

const updateSenderTable = (
  transfer: Transfers,
  sendersTable: any,
  senders: Sender[],
) => {
  for (let sender in transfer.senders) {
    let contract = transfer.senders[sender].contract;
    let sent = transfer.senders[sender].etherValue;
    if (sender in senders) {
      sendersTable[sender] =
        sendersTable[sender].etherValue + transfer.senders[sender].etherValue;
    } else {
      senders.push(transfer.senders[sender]);
      sendersTable.push([sender, contract, sent]);
    }
  }
};

const updateRecipientsTable = (
  transfer: Transfers,
  recipientsTable: any,
  recipients: Recipients[],
) => {
  for (let recipient in transfer.recipients) {
    let contract = transfer.recipients[recipient].contract;
    let received = transfer.recipients[recipient].etherValue;
    if (recipient in recipients) {
      recipientsTable[recipient] =
        recipientsTable[recipient].etherValue +
        transfer.recipients[recipient].etherValue;
    } else {
      recipients.push(transfer.recipients[recipient]);
      recipientsTable.push([recipient, contract, received]);
    }
  }
};

const displayResults = async (parseBlockResults: ParseBlockResults[]) => {
  // tabelize the results
  let totalEther = 0;
  let recipientsTable = new Table({
    head: ['address', 'contract', 'received'],
    colWidths: [0x32, 16, 32],
  });

  let sendersTable = new Table({
    head: ['address', 'contract', 'sent'],
    colWidths: [0x32, 16, 32],
  });

  let senders: Sender[] = [];
  let recipients: Recipients[] = [];

  parseBlockResults.map((parseBlockResult: ParseBlockResults) => {
    totalEther += parseBlockResult.totalEther;
    updateSenderTable(parseBlockResult.transfers, sendersTable, senders);
    updateRecipientsTable(
      parseBlockResult.transfers,
      recipientsTable,
      recipients,
    );
  });

  context_title('Senders: ');
  console.log(sendersTable.toString());
  draw_line();

  context_title('Recipients: ');
  console.log(recipientsTable.toString());
  draw_line();
  console.log(`Total amount of Ether transferred: ${totalEther}`);
  draw_line();
};
