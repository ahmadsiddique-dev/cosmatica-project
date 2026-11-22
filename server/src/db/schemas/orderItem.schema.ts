import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import OrderTable from "./order.schema";
import ProductTable from "./product.schema";
import AddressTable from "./address.schema";

const OrderItemTable = pgTable("orderItems", {
    id: serial("id").primaryKey(),
    productId: integer("productId")
        .notNull()
        .references(() => ProductTable.id, { onDelete: "cascade" }),
    orderId: integer("orderId")
        .notNull()
        .references(() => OrderTable.id, { onDelete: "cascade" }),
    addressId: integer("addressId")
        .notNull()
        .references(() => AddressTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export default OrderItemTable;
