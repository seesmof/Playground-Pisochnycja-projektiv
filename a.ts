interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  description: string;
}

interface TransactionReturn {
  id: string;
  displayAmount: string;
  desc: string;
}

const transactions: Transaction[] = [
  { id: "t1", amount: 99.99, type: "income", description: "Freelance work" },
  { id: "t2", amount: 15.5, type: "expense", description: "Coffee" },
  { id: "t3", amount: 250.0, type: "income", description: "Sold old monitor" },
];

function processTransactions(
  list: Transaction[],
  filterType: "income" | "expense",
): TransactionReturn[] {
  return list
    .filter((item) => item.type === filterType)
    .map((item) => {
      return {
        id: item.id,
        displayAmount: `$${item.amount.toFixed(2)}`,
        desc: item.description.toUpperCase(),
      };
    });
}

const incomeItems = processTransactions(transactions, "income");
console.log(incomeItems);
