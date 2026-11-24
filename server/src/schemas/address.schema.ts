import {
    boolean,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import UserTable from "./user.schema";

const AddressTable = pgTable("addresses", {
    id: serial("id").primaryKey(),
    userId: integer("userId")
        .notNull()
        .references(() => UserTable.id, { onDelete: "cascade" }),
    city: varchar({ length: 50 }).notNull(),
    country: varchar({ length: 50 }).notNull(),
    postCode: integer("postCode").notNull(),
    state: varchar({ length: 50 }).notNull(),
    address1: text("address1").notNull(),
    isDefault: boolean("isDefault").default(true),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt")
        .notNull()
        .$onUpdate(() => new Date()),
});

export default AddressTable;
