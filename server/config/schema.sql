CREATE DATABASE IF NOT EXISTS jet_code_db;
USE jet_code_db;

-- -----------------------------------------------------
-- Table: users (Based on login.html Sign Up form)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `alias` VARCHAR(50) NOT NULL UNIQUE,          -- "Alias" field (e.g., neo)
  `email` VARCHAR(150) NOT NULL UNIQUE,         -- "Access Key" field (e.g., dev@jetcode.sys)
  `password_hash` VARCHAR(255) NOT NULL,        -- "Passphrase" field
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table: stacks (For tech stacks like React, TypeScript, Rust, etc.)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stacks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table: user_stacks (Many-to-Many mapping for user stack selections)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_stacks` (
  `user_id` INT UNSIGNED NOT NULL,
  `stack_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `stack_id`),
  CONSTRAINT `fk_user_stacks_user` FOREIGN KEY (`user_id`) 
    REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_stacks_stack` FOREIGN KEY (`stack_id`) 
    REFERENCES `stacks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table: projects (Based on projects.html bento grid structures)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,                  -- E.g., "HyperScale Engine"
  `category` VARCHAR(50) NOT NULL,               -- E.g., "SYSTEM_ARCH", "WEB_INTERFACE"
  `year` YEAR NOT NULL,                          -- E.g., 2024
  `description` TEXT NOT NULL,                   -- Complete project write-up
  `image_url` VARCHAR(255) DEFAULT NULL,         -- Path to project screenshot or render
  `image_alt` TEXT DEFAULT NULL,                 -- Accessibility alternative description
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table: project_stacks (Many-to-Many mapping for project tech stacks)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_stacks` (
  `project_id` INT UNSIGNED NOT NULL,
  `stack_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`project_id`, `stack_id`),
  CONSTRAINT `fk_project_stacks_project` FOREIGN KEY (`project_id`) 
    REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_stacks_stack` FOREIGN KEY (`stack_id`) 
    REFERENCES `stacks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table: contact_messages (Based on contact.html payload)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(100) NOT NULL,             -- "User Name" input field
  `connection_address` VARCHAR(150) NOT NULL,    -- "Connection Address" input field (email)
  `transmission_payload` TEXT NOT NULL,          -- "Transmission Payload" textarea field (message)
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,       -- Inbox management status flag
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;