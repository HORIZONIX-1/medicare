-- AddForeignKey
ALTER TABLE `Consultation` ADD CONSTRAINT `Consultation_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
