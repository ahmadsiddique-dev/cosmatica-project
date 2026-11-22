import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import UserTable from "./user.schema";

const OrderTable = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: integer("userId")
        .notNull()
        .references(() => UserTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export default OrderTable;
