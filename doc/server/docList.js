const uuid = require("uuid/v4");
const express= require("express");
const body= require("body-parser");
const mysql = require("mysql");
const multer= require("multer");
const moment = require('moment');
const fs = require("fs");

let result = {
  msg:"",
  status:0,
}
let errorResult = {
  msg:"操作失败",
  status:1,
}

module.exports = function(server,createPool){
//列表
server.use("/list",(req,res)=>{
  let param = req.body,
  sql = "SELECT * FROM doc as d where 1=1 "
  if(param){
    if(param.id){
      sql +=`and id ='${param.id}'`
    }
    if(param.key){
      sql +=`and d.key ='${param.key}'`
    }
  }
  //order
  sql += ' ORDER BY ct DESC'
  
  createPool.query(sql,(err,data)=>{
    if(err){
      console.log(err)
      return false;
    }
    createPool.query(`SELECT * FROM res r ORDER BY r.order`,(err,resdata)=>{
      if(err){
        console.log(err)
        return false;
      }
      for(let i=0,len=data.length;i<len;i++){
        data[i].res = [];
        for(let j=0,len=resdata.length;j<len;j++){
          if(resdata[j].doc_id ==data[i].id){
            data[i].res.push(resdata[j]);
          }
        }
      }
      res.send(data);
    })
  });
})

//文件排序/fileorder
server.use("/fileorder",(req,res)=>{
    //装载数据
    let param = req.body;
    let ids = param.ids.split(",");
    for (let i =0,len = ids.length;i<len;i++){
      let order = {order:i};
      createPool.query(`UPDATE res SET ? where id= '${ids[i]}'`,order,(err,data)=>{
        if(err){
          console.log(err)
          return false;
        }
      })
    }
  result.msg="排序成功";
  res.send(result);
})

//addOrUpdate
server.use("/addOrUpdate",(req,res)=>{
  let param = req.body;
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
    docE.ct = moment().format('YYYY-MM-DD HH:mm:ss');
    docE.ut = moment().format('YYYY-MM-DD HH:mm:ss');
    createPool.query(`INSERT INTO doc SET ?`,docE,(err,data)=>{
      if(err){
        console.log(err)
        return false;
      }
      result.id = docE.id;
      result.msg="添加成功";
      res.send(result);
    });
  }else{//修改
    //数据装载docE
    docE = {
      key:"",
      title:"",
      discription:"",
      args:"",
    }
    for(let key in docE){
        docE[key] = param[key]
    }
    docE.ut = moment().format('YYYY-MM-DD HH:mm:ss');
    createPool.query(`UPDATE doc SET ? where id= '${param.id}'`,docE,(err,data)=>{
      if(err){
        console.log(err)
        return false;
      }
      result.id = docE.id;
      result.msg="修改成功";
      res.send(result);
    });
  }
  
})
//upload
server.use("/upload",(req,res)=>{
    //装载数据
    let param = req.body;
    let file = req.files[0];
  let resE = {
    id:uuid().replace(/-/gi,""),
    doc_id:param.id,
    title:file.originalname,
    file_name:file.filename,
    file_type:file.mimetype,
    size:file.size,
    url:`./../demo/${file.filename}`,
    ct:moment().format('YYYY-MM-DD HH:mm:ss'),
    ut:moment().format('YYYY-MM-DD HH:mm:ss'),
  }
  createPool.query(`INSERT INTO res SET ?`,resE,(err,data)=>{
    if(err){
      console.log(err)
      return false;
    }
    result.msg="上传成功";
    res.send(result);
  });
})
//checkKey
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

//fileDel  删除文件
server.use("/fileDel",(req,res)=>{
  //查出来删掉..
  createPool.query(`SELECT * FROM res  WHERE id= ?`,[req.body.key],(err,data)=>{
    if(err){
      console.log(err)
      return false;
    }
    fs.unlink(`./../web/demo/${data[0].file_name}`,function(error){
      if(error){
        console.log(error)
        return false;
      }
       console.log(`删除文件${data[0].title}成功`);
    })
    
    createPool.query(`DELETE FROM res  WHERE id= ?`,[req.body.key],(err,data)=>{
      if(err){
        console.log(err)
        return false;
      }
      console.log(data)
      result.msg="删除成功";
      res.send(result);
    });
  });
  
})

//del  删除
server.use("/del",(req,res)=>{
  //查出来删掉..
  createPool.query(`SELECT * FROM res  WHERE doc_id= ?`,[req.body.id],(err,data)=>{
    if(err){
      console.log(err)
      return false;
    }
    for(let res of data){
      fs.unlink(`./../web/demo/${res.file_name}`,function(error){
        if(error){
          console.log(error)
          return false;
        }
         console.log(`删除文件${res.title}成功`);
      })
    }
    //在去删数据
    createPool.query(`DELETE FROM doc  WHERE id= ?`,[req.body.id],(err,data)=>{
      if(err){
        console.log(err)
        return false;
      }
      createPool.query(`DELETE FROM res  WHERE doc_id= ?`,[req.body.id],(err,data)=>{
        if(err){
          console.log(err)
          return false;
        }
        result.msg="删除成功";
        res.send(result);
      });
    });
    //删数据结束
  });
})

}
