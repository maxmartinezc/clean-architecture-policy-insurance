import { IPolicyRepository } from "@/domain/policy/policy-repository.interface";
import { PolicyEntity, Unmarshalled } from "@/domain/policy/policy.entity";

export class CreatePolicyUseCase {
  constructor(private policyRepository: IPolicyRepository) {}

  async execute(data: any): Promise<Unmarshalled> {
    try {
      const policy = await this.createPolicy(data);
      return policy;
    } catch (error) {
      throw error;
    }
  }

  private async createPolicy(data: any): Promise<Unmarshalled> {
    const policyEntity = new PolicyEntity(data);
    await this.policyRepository.save(policyEntity);
    return policyEntity.unmarshalled();
  }
}
