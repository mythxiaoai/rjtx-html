const uuid = require("uuid/v4");
const express= require("express");
const body= require("body-parser");
const mysql = require("mysql");
const multer= require("multer");
const moment = require('moment');

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

let result = {
  msg:"",
  status:0,
}
let errorResult = {
  msg:"操作失败",
  status:1,
}


//注册中间件
server.use(body.urlencoded({extended: false}));

/*let storage = multer.diskStorage({
  destination:"./../web/demo/",
  filename: function (req, file, cb) {
    console.log("file",file);
    cb(null, file.originalname)
  }
})*/

/*let multerObj = multer({ storage: storage })*/
let multerObj=multer({dest: './../demo/'});
server.use(multerObj.any());

//列表
server.use("/list",(req,res)=>{
  createPool.query(`SELECT * FROM doc`,(err,data)=>{
    if(err){
      console.log(err)
      return false;
    }
    createPool.query(`SELECT * FROM res`,(err,resdata)=>{
      if(err){
        console.log(err)
        return false;
      }
      for(let i=0,len=data.length;i<len;i++){
         let urls = [];
        for(let j=0,len=resdata.length;j<len;j++){
          if(resdata[j].doc_id ==data[i].id){
            urls.push(resdata[j].url);
          }
        }
      }
      res.send(data);
    })
  });
})

//addOrUpdate
server.use("/addOrUpdate",(req,res)=>{
  let param = req.body;
  let files = req.files;
  console.log(files);
  let docE = {
    id:"",
    key:"",
    title:"",
    discription:"",
    args:"",
    ct:"",
    ut:""
  }
  resEArr =[];
  if(!param.id){//做新增
    //数据装载docE
    for(let key in docE){
      if(key =="id"){
        docE.id = uuid().replace(/-/gi,"");
      }else{
        docE[key] = param[key]
      }
    }
    //数据装载resE
    for(let file of files){
      resEArr.push({
        id:uuid().replace(/-/gi,""),
        doc_id:docE.id,
        title:file.originalname,
        file_name:file.filename,
        file_type:file.mimetype,
        size:file.size,
        url:`./demo/${file.filename}`,
        ct:moment().format('YYYY-MM-DD HH:mm:ss'),
        ut:moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    docE.ct = moment().format('YYYY-MM-DD HH:mm:ss');
    docE.ut = moment().format('YYYY-MM-DD HH:mm:ss');
    createPool.query(`INSERT INTO doc SET ?`,docE,(err,data)=>{
      if(err){
        console.log(err)
        return false;
      }
      for(let i=0,len=resEArr.length;i<len;i++){
         createPool.query(`INSERT INTO res SET ?`,resEArr[i],(err,data)=>{
           if(i ==len-1){
              result.msg="添加成功";
              res.send(result);
           }
         })
      }
      
    });
    
  }else{//修改
    
  }
  
})

//addOrUpdate
server.get("/checkKey",(req,res)=>{
  createPool.query(`SELECT * FROM doc as d where d.key= ?`,[req.query.key],(err,data)=>{
    if(err){
      console.log(err)
      return false;
    }
    if(data.length>0){
      res.send(false);
    }else{
      res.send(true);
    }
  });
  
})

//静态文件
server.use(express.static("./../../"));