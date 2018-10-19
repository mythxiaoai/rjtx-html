/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : rjtx_html

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2018-10-19 17:56:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for doc
-- ----------------------------
DROP TABLE IF EXISTS `doc`;
CREATE TABLE `doc` (
  `id` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL DEFAULT '' COMMENT '文档入库  key',
  `title` varchar(255) DEFAULT '' COMMENT '标题',
  `discription` text COMMENT '描述',
  `args` text COMMENT '参数',
  `ct` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ut` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for res
-- ----------------------------
DROP TABLE IF EXISTS `res`;
CREATE TABLE `res` (
  `id` varchar(255) NOT NULL,
  `doc_id` varchar(255) NOT NULL DEFAULT '' COMMENT '文档id',
  `title` varchar(255) DEFAULT '' COMMENT '标题',
  `file_name` varchar(255) DEFAULT '' COMMENT '文件名',
  `file_type` varchar(255) DEFAULT '' COMMENT '文件类型',
  `size` varchar(255) DEFAULT '' COMMENT '大小',
  `url` varchar(255) DEFAULT '' COMMENT 'url路径',
  `ct` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ut` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
