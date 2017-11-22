/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : tags-select

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2017-11-21 18:12:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `source`
-- ----------------------------
DROP TABLE IF EXISTS `source`;
CREATE TABLE `source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `value` varchar(32) DEFAULT NULL,
  `url` varchar(128) NOT NULL,
  `tags` varchar(32) DEFAULT NULL,
  `tag` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of source
-- ----------------------------
INSERT INTO `source` VALUES ('1', 'uuid', '737298387fab78c', 'http://abc.com/login?uuid=737298387fab78c', 'imsi,imei,udid', null);
INSERT INTO `source` VALUES ('2', 'mac', 'fe80::347e:3a91:35aa:25c1', 'http://def.com.cn/abab?mac=fe80::347e:3a91:35aa:25c1', 'mac,imsi,udid', null);
INSERT INTO `source` VALUES ('3', 'uuid', '13663565656', 'http://jjjj.cn/register?uuid=12663565656', 'uuid,udid,phone_num', null);
INSERT INTO `source` VALUES ('4', 'ip', '172.16.128.221', 'http://gitip.sm/?ip=172.16.128.221', 'ip,mac,ip_int', null);
INSERT INTO `source` VALUES ('5', 'uuid', '737298387fab78c', 'http://abc.com/login?uuid=737298387fab78c', 'imsi,imei,udid', null);
INSERT INTO `source` VALUES ('6', 'mac', 'fe80::347e:3a91:35aa:25c1', 'http://def.com.cn/abab?mac=fe80::347e:3a91:35aa:25c1', 'mac,imsi,udid', null);
INSERT INTO `source` VALUES ('7', 'uuid', '13663565656', 'http://jjjj.cn/register?uuid=12663565656', 'uuid,udid,phone_num', null);
INSERT INTO `source` VALUES ('8', 'ip', '172.16.128.221', 'http://gitip.sm/?ip=172.16.128.221', 'ip,mac,ip_int', null);
INSERT INTO `source` VALUES ('9', 'uuid', '737298387fab78c', 'http://abc.com/login?uuid=737298387fab78c', 'imsi,imei,udid', null);
INSERT INTO `source` VALUES ('10', 'mac', 'fe80::347e:3a91:35aa:25c1', 'http://def.com.cn/abab?mac=fe80::347e:3a91:35aa:25c1', 'mac,imsi,udid', null);
INSERT INTO `source` VALUES ('11', 'uuid', '13663565656', 'http://jjjj.cn/register?uuid=12663565656', 'uuid,udid,phone_num', null);
INSERT INTO `source` VALUES ('12', 'ip', '172.16.128.221', 'http://gitip.sm/?ip=172.16.128.221', 'ip,mac,ip_int', null);
INSERT INTO `source` VALUES ('13', 'uuid', '737298387fab78c', 'http://abc.com/login?uuid=737298387fab78c', 'imsi,imei,udid', null);
INSERT INTO `source` VALUES ('14', 'mac', 'fe80::347e:3a91:35aa:25c1', 'http://def.com.cn/abab?mac=fe80::347e:3a91:35aa:25c1', 'mac,imsi,udid', null);
INSERT INTO `source` VALUES ('15', 'uuid', '13663565656', 'http://jjjj.cn/register?uuid=12663565656', 'uuid,udid,phone_num', null);
INSERT INTO `source` VALUES ('16', 'ip', '172.16.128.221', 'http://gitip.sm/?ip=172.16.128.221', 'ip,mac,ip_int', null);
INSERT INTO `source` VALUES ('17', 'uuid', '737298387fab78c', 'http://abc.com/login?uuid=737298387fab78c', 'imsi,imei,udid', null);
INSERT INTO `source` VALUES ('18', 'mac', 'fe80::347e:3a91:35aa:25c1', 'http://def.com.cn/abab?mac=fe80::347e:3a91:35aa:25c1', 'mac,imsi,udid', null);
INSERT INTO `source` VALUES ('19', 'uuid', '13663565656', 'http://jjjj.cn/register?uuid=12663565656', 'uuid,udid,phone_num', null);
INSERT INTO `source` VALUES ('20', 'ip', '172.16.128.221', 'http://gitip.sm/?ip=172.16.128.221', 'ip,mac,ip_int', null);
INSERT INTO `source` VALUES ('21', 'uuid', '737298387fab78c', 'http://abc.com/login?uuid=737298387fab78c', 'imsi,imei,udid', null);
INSERT INTO `source` VALUES ('22', 'mac', 'fe80::347e:3a91:35aa:25c1', 'http://def.com.cn/abab?mac=fe80::347e:3a91:35aa:25c1', 'mac,imsi,udid', null);
INSERT INTO `source` VALUES ('23', 'uuid', '13663565656', 'http://jjjj.cn/register?uuid=12663565656', 'uuid,udid,phone_num', null);
INSERT INTO `source` VALUES ('24', 'ip', '172.16.128.221', 'http://gitip.sm/?ip=172.16.128.221', 'ip,mac,ip_int', null);
