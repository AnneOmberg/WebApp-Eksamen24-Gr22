-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "allowSameDay" BOOLEAN NOT NULL DEFAULT true,
    "allowedWeekdays" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "hasLimitedSeats" BOOLEAN NOT NULL DEFAULT false,
    "seatLimit" INTEGER,
    "hasFixedPrice" BOOLEAN NOT NULL DEFAULT false,
    "price" REAL,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "hasWaitlist" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Template" ("allowSameDay", "allowedWeekdays", "description", "hasFixedPrice", "hasLimitedSeats", "hasWaitlist", "id", "isFree", "isPrivate", "price", "seatLimit", "title") SELECT "allowSameDay", "allowedWeekdays", "description", "hasFixedPrice", "hasLimitedSeats", "hasWaitlist", "id", "isFree", "isPrivate", "price", "seatLimit", "title" FROM "Template";
DROP TABLE "Template";
ALTER TABLE "new_Template" RENAME TO "Template";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
