/*
  Warnings:

  - You are about to drop the column `textVariantId` on the `Paragraph` table. All the data in the column will be lost.
  - You are about to drop the `TextVariant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `textLanguageVariantId` to the `Paragraph` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Paragraph" DROP CONSTRAINT "Paragraph_textVariantId_fkey";

-- DropForeignKey
ALTER TABLE "TextVariant" DROP CONSTRAINT "TextVariant_textDocumentId_fkey";

-- AlterTable
ALTER TABLE "Paragraph" DROP COLUMN "textVariantId",
ADD COLUMN     "textLanguageVariantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TextVariant";

-- CreateTable
CREATE TABLE "TextLanguageVariant" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "textDocumentId" TEXT NOT NULL,

    CONSTRAINT "TextLanguageVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TextLanguageVariant_textDocumentId_languageCode_key" ON "TextLanguageVariant"("textDocumentId", "languageCode");

-- AddForeignKey
ALTER TABLE "TextLanguageVariant" ADD CONSTRAINT "TextLanguageVariant_textDocumentId_fkey" FOREIGN KEY ("textDocumentId") REFERENCES "TextDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_textLanguageVariantId_fkey" FOREIGN KEY ("textLanguageVariantId") REFERENCES "TextLanguageVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
