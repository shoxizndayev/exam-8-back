import { fetch, fetchAll } from "../../lib/postgres.js";
import query from "./query.js";

const GET = async ({ adminId = 0 }) => {

  return await fetchAll(query.GET, adminId);
};

const POST = async ({ username, password, avatar = null }) => {

  return await fetch(query.POST, username, password, avatar);
};

const LOGIN = async ({ username, password }) => {

  return await fetch(query.LOGIN, username, password);
};

export default { GET, POST, LOGIN };
