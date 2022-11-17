/*
  Warnings:

  - You are about to drop the `Pool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pool";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pools" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ownerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pools_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    CONSTRAINT "participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participants_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "pools" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamCountryCode" TEXT NOT NULL,
    "secondTeamCountryCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "guesses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstTeamPoints" INTEGER NOT NULL,
    "secondTeamPoints" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "guesses_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "guesses_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pools_code_key" ON "pools"("code");

-- CreateIndex
CREATE UNIQUE INDEX "participants_userId_poolId_key" ON "participants"("userId", "poolId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
