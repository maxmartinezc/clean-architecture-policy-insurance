import { Database } from "sqlite3";
import { IDatabase } from "../database.interface";
import { POLICY_TABLE_SQL } from "./policy.table";
import { DatabaseResult } from "../database-result.type";

export class SqliteDb implements IDatabase {
  private static instance: SqliteDb;
  private db: Database;

  private constructor() {
    this.db = new Database("db.sqlite");
  }

  static getInstance() {
    if (!SqliteDb.instance) {
      this.instance = new SqliteDb();
      this.instance.db.exec(POLICY_TABLE_SQL);
    }
    return this.instance;
  }

  async connect(): Promise<void> {
    console.log("Checking SqliteDb integrity");
    this.db.exec("PRAGMA integrity_check");
    console.log("SqliteDb connected");
  }

  async disconnect(): Promise<void> {
    this.db.close();
    console.log("SqliteDb disconnected");
  }

  async query(sql: string, params?: []): Promise<DatabaseResult> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve({ data: rows });
        }
      });
    });
  }
}
