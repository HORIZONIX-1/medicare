-- DropForeignKey
ALTER TABLE `prescription` DROP FOREIGN KEY `Prescription_consultation_id_fkey`;

-- DropIndex
DROP INDEX `Prescription_consultation_id_fkey` ON `prescription`;

-- AlterTable
ALTER TABLE `prescription` ADD COLUMN `total_amount` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `PrescriptionItem` (
    `prescription_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescription_id` INTEGER NOT NULL,
    `drug_id` INTEGER NULL,
    `drug_name` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NULL,
    `instruction_1` VARCHAR(191) NULL,
    `instruction_2` VARCHAR(191) NULL,
    `instruction_3` VARCHAR(191) NULL,
    `frequency` VARCHAR(191) NULL,
    `duration` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `is_outside_drug` BOOLEAN NOT NULL DEFAULT false,
    `is_patient_denied` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`prescription_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drug` (
    `drug_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `unit_type` VARCHAR(191) NOT NULL,
    `dosage_type` VARCHAR(191) NULL,
    `selling_price` DOUBLE NOT NULL,
    `reorder_level` INTEGER NOT NULL DEFAULT 10,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Drug_name_key`(`name`),
    PRIMARY KEY (`drug_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockBatch` (
    `stock_batch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `drug_id` INTEGER NOT NULL,
    `batch_number` VARCHAR(191) NULL,
    `expiry_date` DATETIME(3) NULL,
    `quantity` INTEGER NOT NULL,
    `buying_price` DOUBLE NOT NULL,
    `selling_price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`stock_batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionItem` ADD CONSTRAINT `PrescriptionItem_prescription_id_fkey` FOREIGN KEY (`prescription_id`) REFERENCES `Prescription`(`prescription_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionItem` ADD CONSTRAINT `PrescriptionItem_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `Drug`(`drug_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockBatch` ADD CONSTRAINT `StockBatch_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `Drug`(`drug_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
