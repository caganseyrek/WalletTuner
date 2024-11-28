import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import mongoose from "mongoose";

import AccountRepository from "@/repositories/accountRepository";

import accountModel from "@/models/accountModel";

import AccountTypes from "@/types/account";

jest.mock("@/models/accountModel");
jest.mock("@/utils/logger");

const accountRepository = new AccountRepository();

describe("AccountRepository Unit Tests", () => {
  const mockAccount: AccountTypes.Global.AccountDetails = {
    _id: new mongoose.Types.ObjectId(),
    belongsToUser: "currentUser",
    accountName: "Mock Account",
    createdAt: new Date().toISOString(),
    balance: 100,
    totalIncome: 500,
    totalExpense: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAccountByName Method", () => {
    it("should return accounts matching the account name", async () => {
      // (accountModel.find as jest.Mock).mockReturnValueOnce({
      //   exec: jest.fn().mockResolvedValueOnce([mockAccount]),
      // });

      const accounts = await accountRepository.findAccountByName({
        currentUser: "currentUser",
        accountName: "Mock Account",
      });

      expect(accounts).toEqual([mockAccount]);
      expect(accountModel.find).toHaveBeenCalledWith({
        belongsToUser: "currentUser",
        accountName: "Mock Account",
      });
    });
  });
});
