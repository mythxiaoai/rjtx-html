const uuid = require("uuid/v4");
const express= require("express");
const body= require("body-parser");
const mysql = require("mysql");
const multer= require("multer");
const moment = require('moment');
const fs = require("fs");
//数据文档添加接口
const docList = require("./docList.js");
const demo = require("./demo.js");
//1.监听的端口
let server =express()
server.listen(8089)
//连接数据库
let createPool = mysql.createPool({
  host:"192.168.110.240",
  port:3306,
  user:"root",
  password:"123",
  database:"rjtx_html"
})

//注册中间件
server.use(body.urlencoded({extended: false}));

let storage = multer.diskStorage({
  destination:"./../web/demo/",
  filename: function (req, file, cb) {
    let index = file.originalname.lastIndexOf(".")
    let huozui  = file.originalname.slice(index);
    cb(null, uuid().replace(/-/gi,"")+huozui)
  }
})

let multerObj = multer({ storage: storage })
/*let multerObj=multer({dest: './../web/demo/'});*/

server.use(multerObj.any());

//注册接口
docList(server,createPool);
demo(server,createPool);

//静态文件
server.use(express.static("./../../"));

//业务
