/*
  Warnings:

  - You are about to drop the column `allowedDays` on the `Template` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "allowSameDay" BOOLEAN NOT NULL DEFAULT true,
    "allowedWeekdays" TEXT NOT NULL DEFAULT '0,1,2,3,4,5,6,7',
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "hasLimitedSeats" BOOLEAN NOT NULL DEFAULT false,
    "seatLimit" INTEGER,
    "hasFixedPrice" BOOLEAN NOT NULL DEFAULT false,
    "price" REAL,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "hasWaitlist" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Template" ("allowSameDay", "description", "hasFixedPrice", "hasLimitedSeats", "hasWaitlist", "id", "isFree", "isPrivate", "price", "seatLimit", "title") SELECT "allowSameDay", "description", "hasFixedPrice", "hasLimitedSeats", "hasWaitlist", "id", "isFree", "isPrivate", "price", "seatLimit", "title" FROM "Template";
DROP TABLE "Template";
ALTER TABLE "new_Template" RENAME TO "Template";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
