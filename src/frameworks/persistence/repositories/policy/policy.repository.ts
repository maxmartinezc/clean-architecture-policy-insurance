import { IPolicyRepository } from "@/domain/policy/policy-repository.interface";
import { PolicyEntity } from "@/domain/policy/policy.entity";
import { IDatabase } from "../../db/database.interface";
import { PolicyMapper } from "../../mappers/policy.mapper";

export class PolicyRepository implements IPolicyRepository {
  constructor(private db: IDatabase) {}

  async save(policy: PolicyEntity): Promise<void> {
    const policyModel = PolicyMapper.toPersistence(policy);
    const columns = Object.keys(policyModel);
    const values = Object.values(policyModel);
    const placeHolder = Array(columns.length).fill("?");
    const sql = `INSERT INTO policy (${columns.join(
      ","
    )}) VALUES (${placeHolder.join(",")})`;
    await this.db.query(sql, values);
  }
}
