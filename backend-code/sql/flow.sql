/*
 Navicat Premium Data Transfer

 Source Server         : localhost3306
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : oldisland

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 12/10/2019 23:30:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for flow
-- ----------------------------
DROP TABLE IF EXISTS `flow`;
CREATE TABLE `flow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `index` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of flow
-- ----------------------------
BEGIN;
INSERT INTO `flow` VALUES (1, 1, 3, 200, '2019-10-12 16:52:31', '2019-10-12 16:52:59', NULL);
INSERT INTO `flow` VALUES (2, 2, 2, 300, '2019-10-12 16:53:37', '2019-10-12 16:53:40', NULL);
INSERT INTO `flow` VALUES (3, 3, 2, 200, '2019-10-12 16:54:26', '2019-10-12 16:54:29', NULL);
INSERT INTO `flow` VALUES (4, 4, 2, 100, '2019-10-12 16:54:55', '2019-10-12 16:54:58', NULL);
INSERT INTO `flow` VALUES (5, 6, 1, 300, '2019-10-12 16:55:38', '2019-10-12 16:55:41', NULL);
INSERT INTO `flow` VALUES (6, 6, 1, 200, '2019-10-12 16:56:02', '2019-10-12 16:56:04', NULL);
INSERT INTO `flow` VALUES (7, 8, 1, 100, '2019-10-12 16:56:27', '2019-10-12 16:56:30', NULL);
INSERT INTO `flow` VALUES (8, 5, 2, 400, '2019-10-12 16:56:45', '2019-10-12 16:56:48', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
