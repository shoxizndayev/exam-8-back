import { fetch, fetchAll } from "../../lib/postgres.js";
import query from "./query.js";

const LOGIN = async ({ username, password }) => {
    return await fetch(query.LOGIN, username, password);
};

const REGISTER = async ({ username, password }) => {
    return await fetch(query.REGISTER, username, password);
};

export default { LOGIN,REGISTER };
