/*
  Warnings:

  - You are about to alter the column `price` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `seats` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Made the column `category` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "category" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("category", "createdById", "date", "description", "id", "location", "price", "seats", "slug", "status", "title") SELECT "category", "createdById", "date", "description", "id", "location", "price", "seats", "slug", "status", "title" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
