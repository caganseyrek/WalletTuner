export type TransactionType = "income" | "expense";

export interface CurrentBalanceParams {
  originalAmount: number;
  updatedAmount: number;
  originalType: TransactionType;
  updatedType: TransactionType;
  currentBalance: number;
  currentTotalIncome: number;
  currentTotalExpense: number;
}

export interface TransactionDetailsParams {
  type: TransactionType;
  amount: number;
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export interface UpdatedBalanceProps {
  newAccountBalance: number;
  newTotalIncome: number;
  newTotalExpense: number;
}

/**
 * Helper class for calculating balance updates when transactions are created, updated, or deleted.
 */
class BalanceHelper {
  /**
   * Handles balance updates when a new transaction is created.
   *
   * @param {TransactionDetailsParams} params - The parameters for the new transaction.
   * @returns {UpdatedBalanceProps} The updated balance, total income, and total expenses.
   */
  public static transactionCreated(params: TransactionDetailsParams): UpdatedBalanceProps {
    const newAccountBalance: number = params.balance + (params.type === "income" ? params.amount : -params.amount);
    const newTotalIncome: number = params.type === "income" ? params.totalIncome + params.amount : params.totalIncome;
    const newTotalExpense: number =
      params.type === "expense" ? params.totalExpense + params.amount : params.totalExpense;

    return {
      newAccountBalance,
      newTotalIncome,
      newTotalExpense,
    };
  }

  /**
   * Handles balance updates when an existing transaction is updated.
   *
   * @param {CurrentBalanceParams} params - The parameters for the updated transaction.
   * @returns {UpdatedBalanceProps} The updated balance, total income, and total expenses.
   */
  public static transactionUpdated(params: CurrentBalanceParams): UpdatedBalanceProps {
    let newAccountBalance = params.currentBalance;
    newAccountBalance -= params.updatedType === "income" ? params.originalAmount : -params.originalAmount;
    newAccountBalance += params.updatedType === "income" ? params.updatedAmount : -params.updatedAmount;

    let newTotalIncome = params.currentTotalIncome;
    let newTotalExpense = params.currentTotalExpense;
    const currentTransactionVal = params.originalAmount;

    if (params.originalType === params.updatedType) {
      if (params.updatedType === "income") {
        newTotalIncome += params.updatedAmount - currentTransactionVal;
      }
      if (params.updatedType === "expense") {
        newTotalExpense += params.updatedAmount - currentTransactionVal;
      }
    } else {
      if (params.originalType === "expense" && params.updatedType === "income") {
        newTotalExpense -= currentTransactionVal;
        newTotalIncome += params.updatedAmount;
      }
      if (params.originalType === "income" && params.updatedType === "expense") {
        newTotalIncome -= currentTransactionVal;
        newTotalExpense += params.updatedAmount;
      }
    }
    return {
      newAccountBalance: newAccountBalance,
      newTotalIncome: newTotalIncome,
      newTotalExpense: newTotalExpense,
    };
  }

  /**
   * Handles balance updates when an existing transaction is deleted.
   *
   * @param {TransactionDetailsParams} params - The parameters for the deleted transaction.
   * @returns {UpdatedBalanceProps} The updated balance, total income, and total expenses.
   */
  static transactionDeleted(params: TransactionDetailsParams): UpdatedBalanceProps {
    const newAccountBalance: number = params.balance - (params.type === "income" ? params.amount : -params.amount);
    const newTotalIncome: number = params.type === "income" ? params.totalIncome - params.amount : params.totalIncome;
    const newTotalExpense: number =
      params.type === "expense" ? params.totalExpense - params.amount : params.totalExpense;

    return {
      newAccountBalance: newAccountBalance,
      newTotalIncome: newTotalIncome,
      newTotalExpense: newTotalExpense,
    };
  }
}

export default BalanceHelper;
