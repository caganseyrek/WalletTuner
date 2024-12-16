import { BalanceHelperTypes } from "@/types/utils";

class BalanceHelper {
  static updateBalances({
    originalTransactionType,
    updatedTransactionType,
    originalTransactionValue,
    updatedTransactionValue,
    currentBalance,
    currentTotalIncome,
    currentTotalExpense,
  }: BalanceHelperTypes.UpdateBalanceParams): BalanceHelperTypes.UpdatedBalances {
    let newAccountBalance = currentBalance;
    newAccountBalance -= updatedTransactionType === "inc" ? originalTransactionValue : -originalTransactionValue;
    newAccountBalance += updatedTransactionType === "inc" ? updatedTransactionValue : -updatedTransactionValue;

    let newTotalIncome = currentTotalIncome;
    let newTotalExpense = currentTotalExpense;
    const currentTransactionVal = originalTransactionValue;

    if (originalTransactionType === updatedTransactionType) {
      if (updatedTransactionType === "inc") {
        newTotalIncome += updatedTransactionValue - currentTransactionVal;
      }
      if (updatedTransactionType === "exp") {
        newTotalExpense += updatedTransactionValue - currentTransactionVal;
      }
    } else {
      if (originalTransactionType === "exp" && updatedTransactionType === "inc") {
        newTotalExpense -= currentTransactionVal;
        newTotalIncome += updatedTransactionValue;
      }
      if (originalTransactionType === "inc" && updatedTransactionType === "exp") {
        newTotalIncome -= currentTransactionVal;
        newTotalExpense += updatedTransactionValue;
      }
    }
    return {
      newAccountBalance: newAccountBalance,
      newTotalIncome: newTotalIncome,
      newTotalExpense: newTotalExpense,
    };
  }

  static subtractDeletedTransactionValue({
    transactionType,
    transactionValue,
    balance,
    totalIncome,
    totalExpense,
  }: BalanceHelperTypes.SubtractDeletedTransactionValueParams): BalanceHelperTypes.UpdatedBalances {
    const newAccountBalance: number = balance - (transactionType === "inc" ? transactionValue : -transactionValue);
    const newTotalIncome: number = transactionType === "inc" ? totalIncome - transactionValue : totalIncome;
    const newTotalExpense: number = transactionType === "exp" ? totalExpense - transactionValue : totalExpense;

    return {
      newAccountBalance: newAccountBalance,
      newTotalIncome: newTotalIncome,
      newTotalExpense: newTotalExpense,
    };
  }

  static addNewTransactionValue({
    transactionType,
    transactionValue,
    balance,
    totalIncome,
    totalExpense,
  }: BalanceHelperTypes.AddNewTransactionValueParams): BalanceHelperTypes.UpdatedBalances {
    const newAccountBalance: number = balance + (transactionType === "inc" ? transactionValue : -transactionValue);
    const newTotalIncome: number = transactionType === "inc" ? totalIncome + transactionValue : totalIncome;
    const newTotalExpense: number = transactionType === "exp" ? totalExpense + transactionValue : totalExpense;

    return {
      newAccountBalance,
      newTotalIncome,
      newTotalExpense,
    };
  }
}

export default BalanceHelper;
