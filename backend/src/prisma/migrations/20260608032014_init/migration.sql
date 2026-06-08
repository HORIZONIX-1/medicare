/*
  Warnings:

  - You are about to drop the column `actor_id` on the `auditlog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `auditlog` DROP FOREIGN KEY `AuditLog_actor_id_fkey`;

-- DropIndex
DROP INDEX `AuditLog_actor_id_fkey` ON `auditlog`;

-- DropIndex
DROP INDEX `AuditLog_created_at_idx` ON `auditlog`;

-- AlterTable
ALTER TABLE `auditlog` DROP COLUMN `actor_id`,
    ADD COLUMN `actor_user_id` INTEGER NULL,
    MODIFY `entity_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `organization_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `organization_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Organization` (
    `organization_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `logo_url` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`organization_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `AuditLog_actor_user_id_idx` ON `AuditLog`(`actor_user_id`);

-- CreateIndex
CREATE INDEX `AuditLog_entity_entity_id_idx` ON `AuditLog`(`entity`, `entity_id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `Organization`(`organization_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `Organization`(`organization_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_actor_user_id_fkey` FOREIGN KEY (`actor_user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
