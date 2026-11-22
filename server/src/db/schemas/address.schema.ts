import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import UserTable from "./user.schema";

const AddressTable = pgTable("addresses", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
});
