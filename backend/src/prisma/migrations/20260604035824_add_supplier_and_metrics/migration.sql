-- AlterTable
ALTER TABLE `drug` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `gst_percentage` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `manufacturer` VARCHAR(191) NULL,
    ADD COLUMN `min_order_quantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `stockbatch` ADD COLUMN `status` ENUM('ACTIVE', 'EXPIRED', 'DAMAGED', 'RECALLED') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `supplier_id` INTEGER NULL,
    ADD COLUMN `warehouse_location` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Supplier` (
    `supplier_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `contact_person` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`supplier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardMetric` (
    `metric_id` INTEGER NOT NULL AUTO_INCREMENT,
    `metric_key` VARCHAR(191) NOT NULL,
    `metric_value` VARCHAR(191) NOT NULL,
    `calculated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NULL,

    UNIQUE INDEX `DashboardMetric_metric_key_key`(`metric_key`),
    PRIMARY KEY (`metric_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `audit_log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(191) NOT NULL,
    `entity` VARCHAR(191) NOT NULL,
    `entity_id` INTEGER NULL,
    `metadata` JSON NULL,
    `ip_address` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `actor_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuditLog_created_at_idx`(`created_at`),
    PRIMARY KEY (`audit_log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Drug_is_active_created_at_idx` ON `Drug`(`is_active`, `created_at`);

-- CreateIndex
CREATE INDEX `StockBatch_drug_id_quantity_idx` ON `StockBatch`(`drug_id`, `quantity`);

-- CreateIndex
CREATE INDEX `StockBatch_expiry_date_idx` ON `StockBatch`(`expiry_date`);

-- CreateIndex
CREATE INDEX `StockBatch_created_at_idx` ON `StockBatch`(`created_at`);

-- AddForeignKey
ALTER TABLE `StockBatch` ADD CONSTRAINT `StockBatch_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `Supplier`(`supplier_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
