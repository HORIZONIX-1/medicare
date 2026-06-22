/*
  Warnings:

  - You are about to drop the column `chief_complaint` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `prescription` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `auditlog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consultationsymptom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `diagnosis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `drug` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `examination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `investigation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outsidedrug` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patientinstruction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prescriptionitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stockbatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `symptom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `auditlog` DROP FOREIGN KEY `AuditLog_actor_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `consultation` DROP FOREIGN KEY `Consultation_doctor_id_fkey`;

-- DropForeignKey
ALTER TABLE `consultationsymptom` DROP FOREIGN KEY `ConsultationSymptom_consultation_id_fkey`;

-- DropForeignKey
ALTER TABLE `consultationsymptom` DROP FOREIGN KEY `ConsultationSymptom_symptom_id_fkey`;

-- DropForeignKey
ALTER TABLE `diagnosis` DROP FOREIGN KEY `Diagnosis_consultation_id_fkey`;

-- DropForeignKey
ALTER TABLE `examination` DROP FOREIGN KEY `Examination_consultation_id_fkey`;

-- DropForeignKey
ALTER TABLE `investigation` DROP FOREIGN KEY `Investigation_consultation_id_fkey`;

-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_consultation_id_fkey`;

-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_prescription_id_fkey`;

-- DropForeignKey
ALTER TABLE `outsidedrug` DROP FOREIGN KEY `OutsideDrug_consultation_id_fkey`;

-- DropForeignKey
ALTER TABLE `outsidedrug` DROP FOREIGN KEY `OutsideDrug_prescription_id_fkey`;

-- DropForeignKey
ALTER TABLE `patientinstruction` DROP FOREIGN KEY `PatientInstruction_consultation_id_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptionitem` DROP FOREIGN KEY `PrescriptionItem_drug_id_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptionitem` DROP FOREIGN KEY `PrescriptionItem_prescription_id_fkey`;

-- DropForeignKey
ALTER TABLE `stockbatch` DROP FOREIGN KEY `StockBatch_drug_id_fkey`;

-- DropIndex
DROP INDEX `Consultation_doctor_id_fkey` ON `consultation`;

-- AlterTable
ALTER TABLE `consultation` DROP COLUMN `chief_complaint`,
    DROP COLUMN `created_at`;

-- AlterTable
ALTER TABLE `prescription` DROP COLUMN `total_amount`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `deleted_at`,
    DROP COLUMN `is_active`,
    DROP COLUMN `updated_at`;

-- DropTable
DROP TABLE `auditlog`;

-- DropTable
DROP TABLE `consultationsymptom`;

-- DropTable
DROP TABLE `diagnosis`;

-- DropTable
DROP TABLE `drug`;

-- DropTable
DROP TABLE `examination`;

-- DropTable
DROP TABLE `investigation`;

-- DropTable
DROP TABLE `invoice`;

-- DropTable
DROP TABLE `organization`;

-- DropTable
DROP TABLE `outsidedrug`;

-- DropTable
DROP TABLE `patientinstruction`;

-- DropTable
DROP TABLE `prescriptionitem`;

-- DropTable
DROP TABLE `stockbatch`;

-- DropTable
DROP TABLE `symptom`;

-- CreateTable
CREATE TABLE `Visit` (
    `visit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `doctor_id` INTEGER NOT NULL,
    `visit_date` DATETIME(3) NOT NULL,
    `preferred_time` VARCHAR(191) NOT NULL,
    `reason_notes` VARCHAR(191) NULL,
    `status` ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') NOT NULL DEFAULT 'SCHEDULED',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`visit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
