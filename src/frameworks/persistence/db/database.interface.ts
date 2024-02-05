import { DatabaseResult } from "./database-result.type";

export interface IDatabase {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  query: (sql: string, ...args: any) => Promise<DatabaseResult>;
}
