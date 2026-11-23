import {
    boolean,
    numeric,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

/*
Still need many changes in this table
because this is not sufficient data for a product
*/
const ProductTable = pgTable("products", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    slug: text("slug").notNull(),
    type: varchar({ length: 100 }).notNull(),
    brand: varchar({ length: 100 }).notNull(),
    currency: varchar({ length: 100 }).notNull(),
    available: boolean("available").default(true),
    collection: varchar({ length: 100 }).default("skin-care"),
    price: numeric("price", { precision: 10, scale: 2 }),
    images: text("image").array(),
    featureImage: text("featureImage"),
    tags: varchar({ length: 200 }).array(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export default ProductTable;
