import { describe, expect, it } from "@jest/globals";

import BalanceHelper from "@/utils/balanceHelper";

import { BalanceHelperTypes } from "@/types/utils";

describe("BalanceHelper Utility", () => {
  describe("updateBalances Method", () => {
    it("should correctly update balances when transaction types are 'income'", () => {
      const testData: BalanceHelperTypes.UpdateBalanceParams = {
        originalTransactionType: "inc",
        updatedTransactionType: "inc",
        originalTransactionValue: 500,
        updatedTransactionValue: 800,
        currentBalance: 2000,
        currentTotalIncome: 2000,
        currentTotalExpense: 1000,
      };

      const result = BalanceHelper.updateBalances(testData);

      expect(result).toEqual({
        newAccountBalance: 2300,
        newTotalIncome: 2300,
        newTotalExpense: 1000,
      } as BalanceHelperTypes.UpdatedBalances);
    });

    it("should correctly update balances when transaction types are 'expense'", () => {
      const testData: BalanceHelperTypes.UpdateBalanceParams = {
        originalTransactionType: "exp",
        updatedTransactionType: "exp",
        originalTransactionValue: 400,
        updatedTransactionValue: 600,
        currentBalance: 1000,
        currentTotalIncome: 5000,
        currentTotalExpense: 2000,
      };

      const result = BalanceHelper.updateBalances(testData);

      expect(result).toEqual({
        newAccountBalance: 800,
        newTotalIncome: 5000,
        newTotalExpense: 2200,
      } as BalanceHelperTypes.UpdatedBalances);
    });

    it("should correctly update balances when transaction type is changed from 'income' to 'expense'", () => {
      const testData: BalanceHelperTypes.UpdateBalanceParams = {
        originalTransactionType: "inc",
        updatedTransactionType: "exp",
        originalTransactionValue: 700,
        updatedTransactionValue: 400,
        currentBalance: 1500,
        currentTotalIncome: 3000,
        currentTotalExpense: 2000,
      };

      const result = BalanceHelper.updateBalances(testData);

      expect(result).toEqual({
        newAccountBalance: 1800,
        newTotalIncome: 2300,
        newTotalExpense: 2400,
      } as BalanceHelperTypes.UpdatedBalances);
    });

    it("should correctly update balances when transaction type is changed from 'expense' to 'income'", () => {
      const testData: BalanceHelperTypes.UpdateBalanceParams = {
        originalTransactionType: "exp",
        updatedTransactionType: "inc",
        originalTransactionValue: 500,
        updatedTransactionValue: 600,
        currentBalance: 2000,
        currentTotalIncome: 3000,
        currentTotalExpense: 1500,
      };

      const result = BalanceHelper.updateBalances(testData);

      expect(result).toEqual({
        newAccountBalance: 2100,
        newTotalIncome: 3600,
        newTotalExpense: 1000,
      } as BalanceHelperTypes.UpdatedBalances);
    });
  });

  describe("subtractDeletedTransactionValue Method", () => {
    it("should correctly subtract an income transaction", () => {
      const testData: BalanceHelperTypes.SubtractDeletedTransactionValueParams = {
        transactionType: "inc",
        transactionValue: 500,
        balance: 3000,
        totalIncome: 4000,
        totalExpense: 2000,
      };

      const result = BalanceHelper.subtractDeletedTransactionValue(testData);

      expect(result).toEqual({
        newAccountBalance: 2500,
        newTotalIncome: 3500,
        newTotalExpense: 2000,
      } as BalanceHelperTypes.UpdatedBalances);
    });

    it("should correctly subtract an expense transaction", () => {
      const testData: BalanceHelperTypes.SubtractDeletedTransactionValueParams = {
        transactionType: "exp",
        transactionValue: 300,
        balance: 2000,
        totalIncome: 5000,
        totalExpense: 2500,
      };

      const result = BalanceHelper.subtractDeletedTransactionValue(testData);

      expect(result).toEqual({
        newAccountBalance: 2300,
        newTotalIncome: 5000,
        newTotalExpense: 2200,
      } as BalanceHelperTypes.UpdatedBalances);
    });
  });

  describe("addNewTransactionValue Method", () => {
    it("should correctly add an income transaction", () => {
      const testData: BalanceHelperTypes.AddNewTransactionValueParams = {
        transactionType: "exp",
        transactionValue: 600,
        balance: 1500,
        totalIncome: 5000,
        totalExpense: 2500,
      };

      const result = BalanceHelper.addNewTransactionValue(testData);

      expect(result).toEqual({
        newAccountBalance: 900,
        newTotalIncome: 5000,
        newTotalExpense: 3100,
      });
    });
  });
});
