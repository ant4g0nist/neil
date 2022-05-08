import {bigNumtoEther, error} from '../utils/index';
import {InfuraProvider} from '@ethersproject/providers';
import {BigNumber, ethers, Transaction} from 'ethers';
import {Transfers} from '.';

export type ParseBlockResults = {
  transfers: Transfers;
  totalEther: number;
};

export const getProvider = async (): Promise<InfuraProvider> => {
  const infura_api_key = process.env.INFURA_API_KEY;
  if (!infura_api_key) error('Please configura INFURA_API_KEY in .env file');

  const network = process.env.NETWORK ? process.env.NETWORK : 'homestead';

  return new ethers.providers.InfuraProvider(network, infura_api_key);
};

export const getLatestBlock = async (): Promise<ethers.providers.Block> => {
  let provider = await getProvider();
  const latest = await getCurrentBlock(provider).catch(err => {
    error('Failed getting current block');
  });
  return await getBlockByNumber(provider, latest);
};

export const getCurrentBlock = async (
  provider: InfuraProvider,
): Promise<number> => {
  if (provider == undefined) provider = await getProvider();

  return await provider.getBlockNumber();
};

export const getBlockByNumber = async (
  provider: InfuraProvider,
  blockNum: any,
): Promise<ethers.providers.Block> => {
  if (provider == undefined) provider = await getProvider();

  return await provider.getBlock(blockNum);
};

export const getBlockDataFromRange = async (
  provider: InfuraProvider,
  startBlockNumber: number,
  endBlockNumber: number,
): Promise<ethers.providers.Block[]> => {
  let blocks = [];
  console.log(startBlockNumber, endBlockNumber + 1);
  for (let i = startBlockNumber; i <= endBlockNumber; i++) {
    let blockData = await getBlockByNumber(provider, i);
    blocks.push(blockData);
  }

  return blocks;
};

export const getBlockDataRangeFromLatest = async (
  provider: InfuraProvider,
  blocksFromLatest: number,
): Promise<ethers.providers.Block[]> => {
  let blocks = [];
  let latestBlock = await getLatestBlock();

  for (let i = blocksFromLatest; i >= 0; i--) {
    let blockData = await getBlockByNumber(provider, latestBlock.number - i);
    blocks.push(blockData);
  }
  return blocks;
};

export const getBlocksDataCommon = async (
  provider: InfuraProvider,
  startBlockNumber: number,
  endBlockNumber: number,
): Promise<ethers.providers.Block[]> => {
  if (endBlockNumber === undefined || endBlockNumber === 0)
    return await getBlockDataRangeFromLatest(provider, startBlockNumber);

  return await getBlockDataFromRange(
    provider,
    startBlockNumber,
    endBlockNumber,
  );
};

const getTxDetails = async (
  provider: InfuraProvider,
  tx: string,
): Promise<Transaction> => {
  let transaction: Transaction = {
    from: '',
    to: '',
    nonce: 0,
    gasLimit: BigNumber.from('0x0'),
    data: '',
    value: BigNumber.from('0x0'),
    chainId: 0,
  };

  try {
    transaction = await provider.getTransaction(tx);
  } catch (err) {
    console.log(err);
    error;
  }

  return transaction;
};

const updateRecipients = async (
  address: string,
  transfers: Transfers,
  provider: InfuraProvider,
  value: number,
) => {
  if (address in transfers.recipients) {
    transfers.recipients[address].etherValue += value;
  } else {
    transfers.recipients[address] = {etherValue: value, contract: false};
  }

  transfers.recipients[address]['contract'] = await checkIfContract(
    provider,
    address,
  );
};

const updateSenders = async (
  address: string,
  transfers: Transfers,
  provider: InfuraProvider,
  value: number,
) => {
  if (address in transfers.recipients) {
    transfers.senders[address].etherValue += value;
  } else {
    transfers.senders[address] = {etherValue: value, contract: false};
  }

  transfers.senders[address]['contract'] = await checkIfContract(
    provider,
    address,
  );
};

const parseBlock = async (
  provider: InfuraProvider,
  transactions: [],
): Promise<ParseBlockResults> => {
  // let totalEther = BigNumber.from("0x0");
  let totalEther = 0;
  let transfers: Transfers = {
    senders: {},
    recipients: {},
  };
  await Promise.all(
    transactions.map(async (tx: any) => {
      let transaction: Transaction = await getTxDetails(provider, tx);
      if (transaction === null) return;

      let toAddr: any = transaction.to;
      let fromAddr: any = transaction.from;

      if (toAddr === null || fromAddr === null) return;

      let value = bigNumtoEther(transaction.value);
      await updateSenders(fromAddr, transfers, provider, value);
      await updateRecipients(toAddr, transfers, provider, value);

      totalEther += value;
    }),
  );

  let result = {
    transfers: transfers,
    totalEther: totalEther,
  };

  return result;
};

export const parseBlocks = async (
  provider: InfuraProvider,
  blocksData: [],
): Promise<ParseBlockResults[]> => {
  // parses the given blocks data and returns a custom Transfers array containing senders and recipient details
  let results = await Promise.all(
    blocksData.map(async (block: any) => {
      let transactions = block.transactions;
      return await parseBlock(provider, transactions);
    }),
  );
  return results;
};

const checkIfContract = async (provider: InfuraProvider, addr: string) => {
  // checks if a given address is a contract or not
  if (addr === null) {
    //probably contract creation
    return false;
  }

  let code = await provider.getCode(addr).catch(err => {
    console.log(err);
    error(`Failed to check if ${addr} is a contract`);
  });

  if (code === '0x') return false;

  return true;
};
