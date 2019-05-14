const uuid = require("uuid/v4");
const express= require("express");
const body= require("body-parser");
const mysql = require("mysql");
const multer= require("multer");
const moment = require('moment');
const fs = require("fs");
const coordtransform = require("./lib/transformationLonLat");

/*
let temp =coordtransform.wgs84togcj02(arr[i].lng, arr[i].lat);
          temp = coordtransform.gcj02tobd09(temp[0],temp[1]);
*/

let result = {
  msg:"",
  status:0,
}
let errorResult = {
  msg:"操作失败",
  status:1,
}
module.exports = function(server,createPool){
  
server.use("/wgs84tobd09",(req,res)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
  //装载数据
  //let param = req.body;
  let data = req.query.data||req.body.data;
	data = JSON.parse(data);
	let result = [];
  for (let item of data) {
  	let temp = coordtransform.wgs84togcj02(item[0], item[1]);
  	temp = coordtransform.gcj02tobd09(temp[0], temp[1]);
		result.push(temp);
  }
  res.send(result);
})
server.use("/demo/upload",(req,res)=>{
  //装载数据
  let param = req.body;
  let files = req.files;
  //上传的东西一分钟删除
    setTimeout(()=>{
      for(let file of files){
        fs.unlink(`./../web/demo/${file.filename}`,function(error){
          if(error){
            console.log(error)
            return false;
          }
           console.log(`删除文件${file.originalname}成功`);
        })
      }
    },5000)
  result.msg="上传成功";
  res.send(result);
})


server.use("/demo/test1",(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  //装载数据
  let param = req.body;
  let files = req.files;
  result.data="我是test1";
  result.msg="test1操作成功";
  setTimeout(()=>{
    res.send(result);
  },param.time||2000);
})
server.use("/demo/test2",(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  //装载数据
  let param = req.body;
  let files = req.files;
  result.data="我是test2";
  result.msg="test2操作成功";
  setTimeout(()=>{
    res.send(result);
  },param.time||2000);
})
server.use("/demo/test3",(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  //装载数据
  let param = req.body;
  let files = req.files;
  result.data="我是test3";
  result.msg="test3操作成功";
  setTimeout(()=>{
    res.send(result);
  },param.time||2000);
})
server.use("/demo/resultEdit",(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  //装载数据
  let param = req.body;
  let files = req.files;
  setTimeout(()=>{
    res.send(param);
  },param.time||2000);
})


}
