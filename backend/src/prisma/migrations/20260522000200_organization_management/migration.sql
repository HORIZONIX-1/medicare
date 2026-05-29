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
