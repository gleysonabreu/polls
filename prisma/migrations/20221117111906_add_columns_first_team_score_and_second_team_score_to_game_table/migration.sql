-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamCountryCode" TEXT NOT NULL,
    "secondTeamCountryCode" TEXT NOT NULL,
    "firstTeamScore" INTEGER NOT NULL DEFAULT -1,
    "secondTeamScore" INTEGER NOT NULL DEFAULT -1
);
INSERT INTO "new_games" ("date", "firstTeamCountryCode", "id", "secondTeamCountryCode") SELECT "date", "firstTeamCountryCode", "id", "secondTeamCountryCode" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
