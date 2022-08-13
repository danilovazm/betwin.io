import { inject, injectable } from "tsyringe";

import ITransactionRepository from "../../data/repositoryInterfaces/ITransactionRepository";
import User from "../entities/User";

@injectable()
class TransactionCollection {
  private transactionRepository;

  constructor(
    @inject("TransactionRepository")
    transactionRepository: ITransactionRepository
  ) {
    this.transactionRepository = transactionRepository;
  }

  public async insert(type: string, method: string, value: number, user: User) {
    await this.transactionRepository.insert(type, method, value, user);
  }
}

export default TransactionCollection;
