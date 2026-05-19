-- DropForeignKey
ALTER TABLE `prescription` DROP FOREIGN KEY `Prescription_consultation_id_fkey`;

-- DropIndex
DROP INDEX `Prescription_consultation_id_fkey` ON `prescription`;

-- AlterTable
ALTER TABLE `consultation` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Symptom` (
    `symptom_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Symptom_name_key`(`name`),
    PRIMARY KEY (`symptom_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Examination` (
    `examination_id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultation_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`examination_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsultationSymptom` (
    `consultation_symptom_id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultation_id` INTEGER NOT NULL,
    `symptom_id` INTEGER NOT NULL,
    `severity` DOUBLE NULL,
    `duration_value` DOUBLE NULL,
    `duration_unit` VARCHAR(191) NULL,

    PRIMARY KEY (`consultation_symptom_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investigation` (
    `investigation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultation_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`investigation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientInstruction` (
    `instruction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultation_id` INTEGER NOT NULL,
    `instruction` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`instruction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diagnosis` (
    `diagnosis_id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultation_id` INTEGER NOT NULL,
    `diagnosis_name` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`diagnosis_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Examination` ADD CONSTRAINT `Examination_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultationSymptom` ADD CONSTRAINT `ConsultationSymptom_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultationSymptom` ADD CONSTRAINT `ConsultationSymptom_symptom_id_fkey` FOREIGN KEY (`symptom_id`) REFERENCES `Symptom`(`symptom_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investigation` ADD CONSTRAINT `Investigation_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientInstruction` ADD CONSTRAINT `PatientInstruction_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_consultation_id_fkey` FOREIGN KEY (`consultation_id`) REFERENCES `Consultation`(`consultation_id`) ON DELETE CASCADE ON UPDATE CASCADE;
