/*
Navicat MySQL Data Transfer

Source Server         : 49.232.154.92
Source Server Version : 50727
Source Host           : 49.232.154.92:3306
Source Database       : land

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2019-10-14 15:36:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `create_time` int(11) DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(100) NOT NULL COMMENT '地址',
  `from_type` smallint(6) DEFAULT NULL COMMENT '1 来自本地，2 来自公网',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (null, '1', '1', '/music.1.png', '1');
INSERT INTO `image` VALUES (null, '1', '2', 'http://bl.yushu.im/images/sentence.2.png', '2');
INSERT INTO `image` VALUES (null, '1', '3', '/music.2.png', '1');
INSERT INTO `image` VALUES (null, '1', '4', '/movie.1.png', '1');
INSERT INTO `image` VALUES (null, '1', '5', '/music.3.png', '1');
INSERT INTO `image` VALUES (null, '1', '6', '/sentence.2.png', '1');
INSERT INTO `image` VALUES (null, '1', '7', '/music.4.png', '1');
INSERT INTO `image` VALUES (null, '1', '8', '/movie.2.png', '1');
