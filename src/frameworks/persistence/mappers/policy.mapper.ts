import { PolicyEntity } from "@/domain/policy/policy.entity";
import { PolicyModel } from "../db/sqlite/policy.model";

export class PolicyMapper {
  static toDomain(data: PolicyModel): PolicyEntity {
    const { start_date, price: _, ...rest } = data;
    return new PolicyEntity({
      ...rest,
      startDate: start_date,
    });
  }

  static toPersistence(policy: PolicyEntity): PolicyModel {
    const { startDate: start_date, ...rest } = policy.unmarshalled();
    return {
      ...rest,
      start_date,
    };
  }
}
