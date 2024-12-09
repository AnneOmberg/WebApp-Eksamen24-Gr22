/*
  Warnings:

  - Added the required column `price` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "location" TEXT,
    "category" TEXT,
    "venueId" INTEGER NOT NULL,
    "seats" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "templateId" INTEGER,
    "createdById" INTEGER NOT NULL,
    CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdById", "date", "description", "id", "location", "templateId", "title", "venueId") SELECT "createdById", "date", "description", "id", "location", "templateId", "title", "venueId" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
