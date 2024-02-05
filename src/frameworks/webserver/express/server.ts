import express from "express";
import { apiRouter } from "./api.router";
import { IServer } from "../server.interface";

export class Server implements IServer {
  port: number;
  private framework: express.Application;
  constructor(port: number) {
    this.port = port;
    this.framework = express();
  }

  async bootstrap(): Promise<void> {
    //Builtin Express Middleware
    this.framework.use(express.json());

    // Routers
    this.framework.use(apiRouter());
  }

  async listen(): Promise<void> {
    this.framework.listen(this.port);
  }
}
