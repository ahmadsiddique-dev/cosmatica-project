import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/*
Still need many changes in this table
because this is not sufficient data for a product
*/
const ProductTable = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }),
    images: text("image").array(),
    featureImage: text("featureImage"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export default ProductTable;
