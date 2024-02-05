import { PolicyEntity } from "./policy.entity";

export interface IPolicyRepository {
  save(policy: PolicyEntity): Promise<void>;
}
