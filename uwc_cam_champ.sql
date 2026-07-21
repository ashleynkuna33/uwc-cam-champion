CREATE DATABASE IF NOT EXISTS uwc_cam_champion;
USE uwc_cam_champion;

CREATE TABLE `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `surname` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `is_email_verified` TINYINT(1) DEFAULT 0,
    `recovery_email` VARCHAR(100) DEFAULT NULL,
    `password` VARCHAR(255) NOT NULL,
    `recovery_phone_number` VARCHAR(20) DEFAULT NULL,
    `is_active` TINYINT(1) DEFAULT 1,
    `last_login` DATETIME DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `modules_info` (
    `code` VARCHAR(12) PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `credits` INT NOT NULL DEFAULT 20,
    `description` TEXT DEFAULT NULL,
    `exam_date` DATE DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_modules` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `module_code` VARCHAR(12) NOT NULL,
    `score` DECIMAL(5, 2) DEFAULT 0.00,
    `progress` DECIMAL(5, 2) DEFAULT 0.00,
    `status` VARCHAR(30) DEFAULT 'In Progress',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`module_code`) REFERENCES `modules_info`(`code`) ON DELETE CASCADE,
    UNIQUE KEY `unique_user_module` (`user_id`, `module_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tasks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `module_code` VARCHAR(12) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `due_date` DATE DEFAULT NULL,
    `status` VARCHAR(30) DEFAULT 'Pending',
    `description` TEXT DEFAULT NULL,
    `weight` DECIMAL(5, 2) NOT NULL,
    `category_weight` DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (`user_id`, `module_code`) REFERENCES `user_modules`(`user_id`, `module_code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `deadlines` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `date` DATE NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `due_info` VARCHAR(50) DEFAULT NULL,
    `priority` VARCHAR(20) DEFAULT 'Medium',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cam_summaries` (
    `user_id` INT PRIMARY KEY,
    `actual_cam` DECIMAL(5, 2) DEFAULT 0.00,
    `target_cam` DECIMAL(5, 2) DEFAULT 50.00,
    `projected_cam` DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;