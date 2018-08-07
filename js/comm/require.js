let resourcePath={
    comm:["config.js"],
    test:["./test/test1.js","./test/test2.js","./test/test3.js"],
}
async function xa_import(str){
    if(!resourcePath[str]){
        console.error("加载资源出错~请检查资源配置是否加载出错...")
    }else{
        if(Array.isArray(resourcePath[str])){
            for (let item of resourcePath[str]){
                await import(item);
            }
        }else{
            await import(resourcePath[str]);
        }
    }
}
export default {
    xa_import
}

/*jQuery*/
import "./jquery.js";
/*bootstrap*/
import "./bootstrap/bootstrap.js";
/*checkbox/radio修饰*/
import "./icheck/icheck.js";
/*loading加载*/
import "./loading/loading.js";
/*弹出框*/
import "./xmodal/xmodal.js";
/*sweetAlert提示框*/
import "./sweetalert/sweetalert-dev.js";
/*tip 错误操作提示框*/
import "./tip.js";
/*工具js*/
import "./util.js";

/*全局配置js*/
import basePath from "./config.js";
console.log(basePath)