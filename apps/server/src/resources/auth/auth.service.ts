import { BadRequestError, NotFoundError, UnauthorizedError } from "@/app/errors/errors";

import Converter from "@/utils/converter";

import PasswordHelper from "@/helpers/passwordHelper";
import TokenHelper from "@/helpers/tokenHelper";

import AccountRepository from "../account/account.repository";
import { Account } from "../account/account.types";
import MilestoneRepository from "../milestone/milestone.repository";
import { Milestone } from "../milestone/milestone.types";
import OverviewRepository from "../overview/overview.repository";
import { Overview } from "../overview/overview.types";
import SubscriptionRepository from "../subscription/subscription.repository";
import { Subscription } from "../subscription/subscription.types";
import TransactionRepository from "../transaction/transaction.repository";
import { Transaction } from "../transaction/transaction.types";
import { Auth } from "./auth.types";
import TokenRepository from "./token/token.repository";
import { Token } from "./token/token.types";
import UserRepository from "./user/user.repository";
import { User } from "./user/user.types";

class AuthService {
  private tokenRepository: TokenRepository;
  private userRepository: UserRepository;
  private accountRepository: AccountRepository;
  private milestoneRepository: MilestoneRepository;
  private overviewRepository: OverviewRepository;
  private subscriptionRepository: SubscriptionRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.tokenRepository = new TokenRepository();
    this.userRepository = new UserRepository();
    this.accountRepository = new AccountRepository();
    this.milestoneRepository = new MilestoneRepository();
    this.overviewRepository = new OverviewRepository();
    this.subscriptionRepository = new SubscriptionRepository();
    this.transactionRepository = new TransactionRepository();
  }

  private async clearExistingTokens(params: Token.FindByUserIdProps): Promise<void> {
    const tokens: Token.RefreshTokenProps[] = await this.tokenRepository.findByUserId({ user_id: params.user_id });
    tokens.forEach(async (token) => {
      return await this.tokenRepository.deleteRefreshToken({ user_id: token.user_id });
    });
  }

  public async register(params: Auth.Service.RegisterProps): Promise<void> {
    const doesUserExists: User.UserProps = await this.userRepository.findByEmail({ email: params.email });
    if (doesUserExists) {
      throw new BadRequestError();
    }
    const hashedPassword: string = await PasswordHelper.hash(params.password);
    await this.userRepository.createUser({
      full_name: params.full_name,
      email: params.email,
      password: hashedPassword,
      created_at: new Date().toISOString(),
    });
  }

  public async login(params: Auth.Service.LoginProps): Promise<Auth.TokensObject> {
    const doesUserExists: User.UserProps = await this.userRepository.findByEmail({ email: params.email });
    if (!doesUserExists) {
      throw new UnauthorizedError();
    }
    const isPasswordValid: boolean = await PasswordHelper.compare(params.password, doesUserExists.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }
    await this.clearExistingTokens({ user_id: doesUserExists._id });
    const access: string = TokenHelper.generate({ type: "access", payload: String(doesUserExists._id) });
    const refresh: string = TokenHelper.generate({ type: "refresh", payload: String(doesUserExists._id) });
    await this.tokenRepository.saveRefreshToken({ user_id: doesUserExists._id, token: refresh });
    return {
      accessToken: access,
      refreshToken: refresh,
    } as Auth.TokensObject;
  }

  public async logout(params: Auth.Service.LogoutProps): Promise<void> {
    await this.clearExistingTokens({ user_id: params._id });
  }

  public async newAccessToken(params: Auth.Service.NewAccessTokenProps): Promise<string> {
    const userIdFromToken: string = TokenHelper.getUserId({ type: "refresh", payload: params.refreshToken });
    const doesUserExists: User.UserProps | null = await this.userRepository.findById({
      _id: Converter.toObjectId(userIdFromToken),
    });
    if (!doesUserExists) {
      throw new UnauthorizedError();
    }
    const isTokenExists: Token.RefreshTokenProps | null = await this.tokenRepository.findByToken({
      token: params.refreshToken,
    });
    if (!isTokenExists) {
      throw new UnauthorizedError();
    }
    await this.clearExistingTokens({ user_id: params._id });
    const access: string = TokenHelper.generate({ type: "access", payload: String(doesUserExists._id) });
    return access;
  }

  public async getUserDetails(params: Auth.Service.GetUserDetailsProps): Promise<User.UserDetailsObject> {
    const user: User.UserProps | null = await this.userRepository.findById({ _id: params._id });
    if (!user) {
      throw new NotFoundError();
    }
    return { full_name: user.full_name, email: user.email };
  }

  public async updateUser(params: Auth.Service.UpdateUserProps) {
    await this.userRepository.updateUser({ full_name: params.full_name, _id: params._id });
  }

  public async deleteUser(params: Auth.Service.DeleteUserProps) {
    const accounts: Account.AccountProps[] = await this.accountRepository.findByUserId({
      user_id: params._id,
    });
    if (accounts.length > 0) {
      accounts.forEach(async (account) => {
        await this.accountRepository.deleteAccount({ _id: account._id, user_id: params._id });
      });
    }
    const milestones: Milestone.MilestoneProps[] = await this.milestoneRepository.findByUserId({
      user_id: params._id,
    });
    if (milestones.length > 0) {
      milestones.forEach(async (milestone) => {
        await this.milestoneRepository.deleteMilestone({ _id: milestone._id, user_id: params._id });
      });
    }
    const overview: Overview.OverviewProps | null = await this.overviewRepository.findByUserId({
      user_id: params._id,
    });
    if (overview) {
      await this.overviewRepository.deleteOverview({ user_id: params._id });
    }
    const subscriptions: Subscription.SubscriptionProps[] = await this.subscriptionRepository.findByUserId({
      user_id: params._id,
    });
    if (subscriptions.length > 0) {
      subscriptions.forEach(async (subscription) => {
        this.subscriptionRepository.deleteSubscription({ _id: subscription._id, user_id: params._id });
      });
    }
    const transactions: Transaction.TransactionProps[] = await this.transactionRepository.findByUserId({
      user_id: params._id,
    });
    if (transactions.length > 0) {
      transactions.forEach(async (transaction) => {
        this.transactionRepository.deleteTransaction({ _id: transaction._id, user_id: params._id });
      });
    }
    this.clearExistingTokens({ user_id: params._id });
    await this.userRepository.deleteUser({ _id: params._id });
  }
}

export default AuthService;
