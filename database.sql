CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int UNIQUE,
  "user_id" int UNIQUE,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" text,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT 'now()',
  "update_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int UNIQUE
);

ALTER TABLE "categories" ADD FOREIGN KEY ("id") REFERENCES "products" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("id") REFERENCES "files" ("id");
