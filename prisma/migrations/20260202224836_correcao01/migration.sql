/*
  Warnings:

  - You are about to drop the column `available` on the `Car` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "licensePlate" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Car" ("licensePlate") SELECT "licensePlate" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
