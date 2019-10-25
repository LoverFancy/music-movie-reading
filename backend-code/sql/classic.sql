/*
Navicat MySQL Data Transfer

Source Server         : 49.232.154.92
Source Server Version : 50727
Source Host           : 49.232.154.92:3306
Source Database       : land

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2019-10-14 15:35:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for classic
-- ----------------------------
DROP TABLE IF EXISTS `classic`;
CREATE TABLE `classic` (
  `create_time` int(11) DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '期刊在数据中序号，供点赞使用',
  `content` text COMMENT '期刊内容',
  `img_id` int(11) DEFAULT NULL,
  `index` smallint(6) DEFAULT NULL COMMENT '期号',
  `title` varchar(100) DEFAULT NULL COMMENT '期刊题目',
  `author` varchar(100) DEFAULT NULL COMMENT '作者',
  `type` smallint(6) DEFAULT NULL COMMENT '期刊类型,这里的类型分为:100 电影 200 音乐 300 句子',
  `url` varchar(100) DEFAULT NULL COMMENT '当type为300时，此字段为音乐url',
  PRIMARY KEY (`id`),
  KEY `img_id` (`img_id`),
  CONSTRAINT `classic_ibfk_1` FOREIGN KEY (`img_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of classic
-- ----------------------------
INSERT INTO `classic` VALUES ('1534178593', '1', '1', '岁月长，衣裳薄', '1', '1', '再见二丁目', '杨千嬅', '200', 'http://music.163.com/song/media/outer/url?id=557581284.mp3');
INSERT INTO `classic` VALUES ('1534178993', '1', '2', '这个夏天又是一个毕业季', '2', '2', null, null, '300', null);
INSERT INTO `classic` VALUES ('1534178193', '1', '3', '你陪我不如蝉夏 越过城市喧嚣', '3', '3', '纸短情长', '花弼', '200', 'http://music.163.com/song/media/outer/url?id=557581284.mp3');
INSERT INTO `classic` VALUES ('1534178333', '1', '4', '在变换的生命里，岁月原来是最大的小偷', '4', '4', '岁月神偷', '罗启锐', '100', null);
INSERT INTO `classic` VALUES ('1534178383', '1', '5', '许多人来来去去，相聚又别离', '5', '5', '一个人的北京', '好妹妹', '200', 'http://music.163.com/song/media/outer/url?id=557581284.mp3');
INSERT INTO `classic` VALUES ('1534178583', '1', '6', '心上无垢，林间有风', '6', '6', null, null, '300', null);
INSERT INTO `classic` VALUES ('1534178983', '1', '7', '谁念过 千字文章 秋收冬已藏', '7', '7', '参商', '不才', '200', 'http://music.163.com/song/media/outer/url?id=557581284.mp3');
INSERT INTO `classic` VALUES ('1534178999', '1', '8', '人生不能像做菜，把所有的材料准备好才下锅', '8', '8', '饮食男女', '李安', '100', null);
