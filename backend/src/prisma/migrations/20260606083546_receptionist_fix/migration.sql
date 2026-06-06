/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_prescription_id_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptionitem` DROP FOREIGN KEY `PrescriptionItem_prescription_id_fkey`;

-- DropIndex
DROP INDEX `PrescriptionItem_prescription_id_key` ON `prescriptionitem`;

-- AlterTable
ALTER TABLE `invoice` MODIFY `prescription_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `organization_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `deleted_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `organization_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `Organization`(`organization_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `Organization`(`organization_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `OutsideDrug` ADD CONSTRAINT `OutsideDrug_prescription_id_fkey` FOREIGN KEY (`prescription_id`) REFERENCES `Prescription`(`prescription_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_prescription_id_fkey` FOREIGN KEY (`prescription_id`) REFERENCES `Prescription`(`prescription_id`) ON DELETE SET NULL ON UPDATE CASCADE;
