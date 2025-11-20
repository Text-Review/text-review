-- CreateTable
CREATE TABLE "TextDocument" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TextDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextVariant" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "textDocumentId" TEXT NOT NULL,

    CONSTRAINT "TextVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paragraph" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "textVariantId" TEXT NOT NULL,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TextAuthors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TextAuthors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "TextVariant_textDocumentId_languageCode_key" ON "TextVariant"("textDocumentId", "languageCode");

-- CreateIndex
CREATE INDEX "_TextAuthors_B_index" ON "_TextAuthors"("B");

-- AddForeignKey
ALTER TABLE "TextVariant" ADD CONSTRAINT "TextVariant_textDocumentId_fkey" FOREIGN KEY ("textDocumentId") REFERENCES "TextDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_textVariantId_fkey" FOREIGN KEY ("textVariantId") REFERENCES "TextVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TextAuthors" ADD CONSTRAINT "_TextAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TextAuthors" ADD CONSTRAINT "_TextAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "TextDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
