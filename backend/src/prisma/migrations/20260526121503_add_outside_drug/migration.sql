-- CreateTable
CREATE TABLE `OutsideDrug` (
    `outside_drug_id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultation_id` INTEGER NULL,
    `prescription_id` INTEGER NULL,
    `drug_name` VARCHAR(191) NOT NULL,
    `instructions` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`outside_drug_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OutsideDrug` ADD CONSTRAINT `OutsideDrug_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutsideDrug` ADD CONSTRAINT `OutsideDrug_prescription_id_fkey` FOREIGN KEY (`prescription_id`) REFERENCES `Prescription`(`prescription_id`) ON DELETE SET NULL ON UPDATE CASCADE;
