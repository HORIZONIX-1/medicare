/*
  Warnings:

  - A unique constraint covering the columns `[prescription_id]` on the table `PrescriptionItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Invoice` (
    `invoice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultation_id` INTEGER NOT NULL,
    `prescription_id` INTEGER NOT NULL,
    `total_drug_cost` DOUBLE NOT NULL,
    `doctor_fee` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `total_amount` DOUBLE NOT NULL,
    `is_patient_denied` BOOLEAN NOT NULL DEFAULT false,
    `is_finalized` BOOLEAN NOT NULL DEFAULT false,
    `finalized_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Invoice_consultation_id_key`(`consultation_id`),
    UNIQUE INDEX `Invoice_prescription_id_key`(`prescription_id`),
    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `PrescriptionItem_prescription_id_key` ON `PrescriptionItem`(`prescription_id`);

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_prescription_id_fkey` FOREIGN KEY (`prescription_id`) REFERENCES `Prescription`(`prescription_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
