import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";
import { IHttpRequest } from "./http-request.interface";
import { HttpResponse } from "./http-response.type";

export class ExpressAdapter {
  static controller(fn: (...args: any) => Promise<HttpResponse>) {
    return (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
      fn(ExpressAdapter.adaptRequest(req))
        .then((httpResponse: HttpResponse) => {
          const { httpCode, ...rest } = httpResponse;
          res.status(httpCode).json(rest);
        })
        .catch((error: Error) => {
          res.status(500).send(error.message);
        });
    };
  }
  static adaptRequest(req: ExpressRequest): IHttpRequest {
    return {
      getBody: () => req.body,
    };
  }
}
