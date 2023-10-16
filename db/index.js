"use strict";

import {Pool, Client} from 'pg';
import { DB } from '../conf';

const pool = new Pool({
  user: DB.PGUSER,
  host: DB.HOST,
  database: DB.DATABASE,
  password: DB.PASSWORD,
  port: PGPORT
});