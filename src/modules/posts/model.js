import { fetch, fetchAll } from "../../lib/postgres.js";
import query from "./query.js";

const GET = async ({ postId = 0 }, { search = "" }) => {
    const posts = await fetchAll(query.GET, postId, search);

    return posts;

};

const POSTIMAGE = async ({ postId }, { mainImage: [main], image }) => {
    const images = [];

    images[0] = await fetch(query.ADDIMAGE, postId, main.filename);

    if (image) {
      images[1] = await fetch(query.ADDIMAGE, postId, image[0].filename);
    }

    return images;
};

export default { GET, POSTIMAGE };
