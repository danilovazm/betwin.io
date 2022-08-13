import { singleton } from "tsyringe";

import Account from "../../../business/entities/Account";
import User from "../../../business/entities/User";
import IAccountRepository from "../../repositoryInterfaces/IAccountRepository";

@singleton()
class AccountRepositoryInMemory implements IAccountRepository {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  public async insert(user: User) {
    // Talvez desnecessário
    if (
      this.accounts.find(currentAccount => currentAccount.getUser() === user)
    ) {
      throw new Error("User already exists");
    }
    const newAccount = new Account(user, 0);

    this.accounts.push(newAccount);

    return newAccount;
  }

  public async changeCash(user: User, value: number) {
    const index = this.accounts.findIndex(
      currentAccount => currentAccount.getUser() === user
    );

    if (index && this.accounts[index].getCash() - value < 0.0) {
      throw new Error("Not enough cash");
    }

    this.accounts[index].setCash(this.accounts[index].getCash() - value);
  }

  public async findByUserId(userId: string) {
    const foundAccount = this.accounts.find(
      currentAccount => currentAccount.getUser().getId() === userId
    );

    if (!foundAccount) {
      throw new Error("Account not found");
    }

    const account = new Account(foundAccount.getUser(), foundAccount.getCash());

    return account;
  }
}

export default AccountRepositoryInMemory;
