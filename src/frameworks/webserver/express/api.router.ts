import { CreatePolicyController } from "@/adapters/controllers/policy/create-policy.controller";
import { ExpressAdapter } from "@/adapters/http/express.adapter";
import { IHttpRequest } from "@/adapters/http/http-request.interface";
import { SqliteDb } from "@/frameworks/persistence/db/sqlite/sqlite.db";
import { PolicyRepository } from "@/frameworks/persistence/repositories/policy/policy.repository";
import { Router } from "express";

const router = Router();
const sqliteDb = SqliteDb.getInstance();
const policyRepository = new PolicyRepository(sqliteDb);
const createPolicyController = new CreatePolicyController(policyRepository);

export const apiRouter = () => {
  router
    .route("/policy")
    .post(
      ExpressAdapter.controller((httpRequest: IHttpRequest) =>
        createPolicyController.execute(httpRequest)
      )
    );
  return router;
};
