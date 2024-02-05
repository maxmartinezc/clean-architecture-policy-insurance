import { Server as ExpressServer } from "@/frameworks/webserver/express/server";
import { SqliteDb } from "../persistence/db/sqlite/sqlite.db";
import { IServer } from "./server.interface";

export class App {
  constructor(private server: IServer) {}
  async bootstrap(): Promise<void> {
    // check the db dependencies
    await SqliteDb.getInstance().connect();
    // framework bootstrapping
    await this.server.bootstrap();
  }

  async run(): Promise<void> {
    await this.server.listen();
    console.log(`Server started at port: ${this.server.port}`);
  }
}

async function start() {
  const port = 9001;
  const app = new App(new ExpressServer(port));
  await app.bootstrap();
  await app.run();
}

start();
