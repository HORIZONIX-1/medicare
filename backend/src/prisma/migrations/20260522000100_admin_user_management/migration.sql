-- AlterTable
ALTER TABLE `User`
  ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `AuditLog` (
  `audit_log_id` INTEGER NOT NULL AUTO_INCREMENT,
  `actor_user_id` INTEGER NULL,
  `action` VARCHAR(191) NOT NULL,
  `entity` VARCHAR(191) NOT NULL,
  `entity_id` VARCHAR(191) NULL,
  `metadata` JSON NULL,
  `ip_address` VARCHAR(191) NULL,
  `user_agent` VARCHAR(191) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  INDEX `AuditLog_actor_user_id_idx`(`actor_user_id`),
  INDEX `AuditLog_entity_entity_id_idx`(`entity`, `entity_id`),
  PRIMARY KEY (`audit_log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuditLog`
  ADD CONSTRAINT `AuditLog_actor_user_id_fkey`
  FOREIGN KEY (`actor_user_id`) REFERENCES `User`(`user_id`)
  ON DELETE SET NULL ON UPDATE CASCADE;
