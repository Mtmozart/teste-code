-- CreateTable
CREATE TABLE `candidate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `about` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `contactInfoId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `candidate_email_key`(`email`),
    UNIQUE INDEX `candidate_contactInfoId_key`(`contactInfoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contactInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formation` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `curriculum` VARCHAR(191) NOT NULL,
    `candidateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `candidate` ADD CONSTRAINT `candidate_contactInfoId_fkey` FOREIGN KEY (`contactInfoId`) REFERENCES `contactInfo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `education` ADD CONSTRAINT `education_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `candidate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
