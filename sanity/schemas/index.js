

// We import object and document schemas
import category from "./category";
import restaurant from "./restaurant";
import dish from "./dish";
import featured from "./featured";

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [restaurant, category, dish, featured]

