import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionInterface {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const filteredIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const income =
      filteredIncome.length === 0
        ? 0
        : filteredIncome
            .map(transaction => transaction.value)
            .reduce((prev, curr) => prev + curr);

    const filteredOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcome =
      filteredOutcome.length === 0
        ? 0
        : filteredOutcome
            .map(transaction => transaction.value)
            .reduce((prev, curr) => prev + curr);

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: TransactionInterface): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
