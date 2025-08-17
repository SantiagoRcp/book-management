-- AlterTable
ALTER TABLE `loans` ADD COLUMN `status` ENUM('Borrowed', 'Returned') NOT NULL DEFAULT 'Borrowed';
