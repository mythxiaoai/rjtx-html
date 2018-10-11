const uuid = require("uuid/v4");
const express= require("express");
const body= require("body-parser");
const mysql = require("mysql");
const multer= require("multer");

console.log(uuid().replace(/-/gi,""));

//1.监听的端口
let server =express()
server.listen(8080)
//连接数据库
let createPool = mysql.createPool({
  post:"localhost",
  port:3306,
  user:"root",
  password:"a62800492",
  database:"rjtx_html"
})
//注册中间件
server.use(body.urlencoded({extended: false}));
let multerObj=multer({dest: './../demo/'});
server.use(multerObj.any());

//列表
server.use("/list",(req,res)=>{
  createPool.query(`SELECT * FROM doc`,(err,data)=>{
   /* let result = {
      rows:data,
      total:data.length
    }*/
   //data = JSON.parse(JSON.stringify(data));
    if(err){
      console.log(err)
      return false;
    }
    for(let i=0,len=data.length;i<len;i++){
       createPool.query(`SELECT * FROM res where doc_id = ?`,[data[i].id],(err,resdata)=>{
         if(err){
            console.log(err)
            return false;
          }
         let urls = [];
         resdata.map(item=>{
           urls.push(item.url)
         });
         data[i].res=urls.join(",");
         res.send(data);
       })
    }
  });
})

//静态文件
server.use(express.static("./../../"));