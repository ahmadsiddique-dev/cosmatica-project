import { asc, cosineDistance } from "drizzle-orm";
import { db } from "./db.ts";
import ProductTable from "../schemas/product.schema.ts";

export async function QueryProducts(embeddings: number[]) {
    const results = await db
        .select({
            id: ProductTable.id,
            title: ProductTable.title,
            description: ProductTable.description,
            distance: cosineDistance(ProductTable.embedding, embeddings),
        })
        .from(ProductTable)
        .orderBy(asc(cosineDistance(ProductTable.embedding, embeddings)))
        .limit(5);

    return results;
}
