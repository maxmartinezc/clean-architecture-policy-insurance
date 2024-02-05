import { IHttpRequest } from "@/adapters/http/http-request.interface";
import { HttpResponse } from "@/adapters/http/http-response.type";
import { IPolicyRepository } from "@/domain/policy/policy-repository.interface";
import { CreatePolicyUseCase } from "@/use-cases/policy/create-policy.use-case";

export class CreatePolicyController {
  constructor(private policyRepository: IPolicyRepository) {}

  async execute(httpRequest: IHttpRequest): Promise<HttpResponse> {
    try {
      const createPolicyUseCase = new CreatePolicyUseCase(this.policyRepository);
      const policy = await createPolicyUseCase.execute({ ...httpRequest.getBody() });
      return { httpCode: 201, payload: policy };
    } catch (error) {
      return {
        httpCode: 500,
        error: {
          name: "CreatePolicyController",
          message: "Error",
          details: error.message,
        },
      };
    }
  }
}
