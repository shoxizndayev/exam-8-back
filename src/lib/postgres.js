import pg from "pg";
import { pgConfig } from "../config.js";

const pool = new pg.Pool(pgConfig);

const fetch = async (SQL, ...params) => {
  const client = await pool.connect();
    const {
      rows: [row],
    } = await client.query(SQL, params.length ? params : null);
    return row;
};

const fetchAll = async (SQL, ...params) => {
  const client = await pool.connect();
  
  try {
    const { rows } = await client.query(SQL, params.length ? params : null);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export { fetch, fetchAll };
