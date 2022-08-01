import { fetch, fetchAll } from "../../lib/postgres.js";
import query from "./query.js";

const GET = async () => {
    let organizers = await fetchAll(query.GET);

    return organizers;
};

export default { GET };
