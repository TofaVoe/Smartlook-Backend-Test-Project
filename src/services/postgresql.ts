import {Pool} from "pg";
import {config} from "../types/IConfig";

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port
})

export default pool;
