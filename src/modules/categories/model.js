import { fetch, fetchAll } from "../../lib/postgres.js";
import query from "./query.js";

const GET = async () => {
    let categories = await fetchAll(query.GET);
    categories = categories.map((category) => {
      if (category.sub_categories[0] == null && category.sub_categories.length == 1) {
        category.sub_categories = [];
      }

      category.sub_categories.map((sub_category) => {
        delete sub_category.category_id;
        return sub_category;
      });

      return category;
    });

    return categories;
  
};

const POST = async ({ categoryName }) => {
    let checkName = await fetch(query.CHECK, categoryName);

    if (checkName) {
      return await fetch(query.POSTDELETED, checkName.category_id);
    }

    let categories = await fetch(query.POST, categoryName);

    return categories;
 
};

const PUT = async ({ categoryId, categoryName }) => {
  
    let categories = await fetch(query.PUT, categoryId, categoryName);

    return categories;
  
};

const DELETE = async ({ categoryId }) => {
  
    let categories = await fetch(query.DELETE, categoryId);

    return categories;
  
};

export default { GET, POST, PUT, DELETE };
