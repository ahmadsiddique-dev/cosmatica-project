import { db } from "../index.ts";
import fs from "fs";
import { parse } from "csv-parse";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import data from "./data.json" with { type: "json" };
import ProductTable from "../schemas/product.schema.ts";

let records: any = [];
let i = 0;

const rows = data.map((product: any) => ({
    externalId: product.externalId,
    title: product.title,
    description: product.description,
    slug: product.slug,
    type: product.type,
    brand: product.brand,
    currency: product.currency,
    available: product.available === "yes",
    collection: product.collection,
    price: product.price,
    images: product.images,
    featureImage: product.featureImage,
    tags: product.tags,
}));

async function InsertData() {
    try {
        await db.insert(ProductTable).values(rows);

        console.log("Done 👍");
    } catch (error: any) {
        console.error("❌ Insert failed");
        console.error("Message:", error.message);
        console.error("Cause:", error.cause);
        console.error("Full error:", error);
    }
}

InsertData();

// const data = fs.readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data.csv`)

// function pipesToArray(str: string): string[] {
//     return str.split(" | ");
// }

// fs.createReadStream(`${dirname(fileURLToPath(import.meta.url))}/data.csv`)
//     .pipe(
//         parse({
//             columns: true,
//             skip_empty_lines: true,
//         })
//     )
//     .on("data", (row) => {
//         let data = {
//             externalId: row["﻿product_id"],
//             title: row.title,
//             description: row.description,
//             slug: row.handle,
//             type: row.collection,
//             brand: row.vendor,
//             currency: row.currency,
//             available: row.available,
//             collection: row.collection,
//             price: row.price,
//             images: pipesToArray(row.all_image_urls),
//             featureImage: row.image_url,
//             tags: pipesToArray(row.tags),
//         };
//         if (
//             !row["﻿product_id"] ||
//             !row.title ||
//             !row.description ||
//             !row.handle ||
//             !row.collection ||
//             !row.vendor ||
//             !row.currency ||
//             !row.available ||
//             !row.collection ||
//             !row.price ||
//             !pipesToArray(row.all_image_urls) ||
//             !row.image_url ||
//             !pipesToArray(row.tags)
//         ) {
//             console.log(row["﻿product_id"]);
//         } else {
//             i++;
//             records.push(data);
//         }
//     })
//     .on("end", () => {
//         fs.writeFileSync("./data.json", JSON.stringify(records));
//         console.log("The Count is: ", i);
//     });

// So products found with this code are 719
