import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

const UserTable = pgTable("users", {
  id: serial("id").primaryKey(),
  userName: varchar({ length: 100 }).unique().notNull(),
  fullName: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 100 }).unique().notNull(),
  password: varchar({ length: 70 }).notNull(),
  refreshToken: text("refreshToken").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export default UserTable;
