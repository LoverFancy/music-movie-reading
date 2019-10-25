/*
Navicat MySQL Data Transfer

Source Server         : 49.232.154.92
Source Server Version : 50727
Source Host           : 49.232.154.92:3306
Source Database       : land

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2019-10-14 15:36:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `create_time` int(11) DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '用户id',
  `book_id` int(11) DEFAULT NULL COMMENT '书籍id',
  `nums` int(11) DEFAULT NULL COMMENT '词条评论点赞数量',
  `content` varchar(255) NOT NULL COMMENT '评论内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (null, '1', '2', '1', '1', '1', '这个书不错');
INSERT INTO `comment` VALUES (null, '1', '3', '2', '1', '9', '而是的回忆！七龙珠');
INSERT INTO `comment` VALUES (null, '1', '4', '3', '1', '19', '回忆杀！');
INSERT INTO `comment` VALUES (null, '1', '5', '1', '2', '1', '我爱龙珠！！！！！！');
INSERT INTO `comment` VALUES (null, '1', '6', '1', '5', '1', '我爱龙珠！！！！！！');
