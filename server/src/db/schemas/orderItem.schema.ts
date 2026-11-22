import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import OrderTable from "./order.schema";
import ProductTable from "./product.schema";

const OrderItemTable = pgTable("orderItems", {
  id: serial("id").primaryKey(),
  productId: integer("productId")
    .notNull()
    .references(() => ProductTable.id),
  orderId: integer("orderId")
    .notNull()
    .references(() => OrderTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export default OrderItemTable;
