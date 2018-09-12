/**
润建通信组件封装脚本，具体调用方法和演示Demo文档资料后期整理
时间：2018年7月30日
版本：1.0
作者：小艾
依赖：当前js目录所有插件
rj对象大纲:
{
	basePath：全局路径，ajax方法有引用
	init：初始化运行的函数
	resetPlug：重置插件
	sweetAlert：弹框插件封装
	table：表格组件封装
	ajax：ajax封装
	toggleAnimate：业务点击切换动画抽取
	modal：弹框组件
	ztree：树组件
	toggleAnimateRow：新增和删除行的抽取
	form:表单的获取和回显的封装
	load:加载子界面
}
简易说明文档:
--------------------resetPlug--------------------
//重置界面插件~页面加载运行插件，load单页会用到重新渲染表单插件
--------------------sweetAlert--------------------
包装插件:sweetAlert
参数:
content   提示标题内容
describe  标题下面的描述性文字    可以没有描述   传null或者""都可以
type   类型   分别有四种    四个图标项   success	error	warning	info
fn   回调函数
 调用:
 rj.alert(...)||xalert
 rj.error(...)||xerror
 rj.confirm(...)||xconfirm
--------------------table--------------------
table:{
	init(){},
	tableFmt(){},
	fmt:{
		VHcenter(){}
	},
	mergeCells:()
}
包装插件:bootstrapTable
目的是为了让bootstrapTable插件的参数统一 
调用方式  rj.table.init({id:"",toolbar...});
其他工具方法 
--mergeCells //合并指定列单元格
rj.table.mergeCells(tableId,field,data)
合并指定列名的相同值的单元格
底层调用的是$(tableId).bootstrapTable('mergeCells',fn)方法
参数说明:
tableId:表格的id
field:表字段
data:全量表格数据
--fmt 对象   包含格式化表格的一些方法
	--VHcenter水平垂直居中
调用方法：
rj.table.fmt.VHcenter
事例
表格的列配置：
 {
	field: 'company',
	title: '公司',
	sortable:true,
	order:"desc",
	formatter:rj.table.fmt.VHcenter
}
--------------------bootstrapTableFmt--------------------
包装插件:bootstrapTable
目的是为了统一格式化单元格的渲染
--------------------ajax--------------------
时间2018年7月30日 12:42:08
版本：1.0
作者：小艾
插件名称：自定义ajax
调用:
	rj.ajax({
		id:"#cont",  //可选
		msg:"none"  //根据业务是否需要返回消息弹框
	    type:"post",//默认get
	    url:"test1.do",
	    data:{userName:"1"},
	    success:fuction(data){
	    	//请求成功的代码..
	    }
	    error   //可选  建议不写
	})
	参数说明：
		id:该id是调用loading层的选择器  不需要loading可以不写
		msg：请求成功后是否弹出消息框，， 默认是有返回的     如果是查询或者其他不需要请求反馈的业务 则可设置成 none
		dataType:别写，特别强调   没写，，传参也没用  哈哈   默认是json
		success：返回data必须包含  msg status!
			{	msg:"操作成功自定义",
				status:(0:正常||1：出错),
				describe：选填,//就是sweetAlert下面描述的文字
			}
			特别提示：
			成功后会自动关闭loading和弹出sweetAlert成功操作，，自己可以看源码
		error:正常执行   建议省略，，依次返回页面在sweetAlert提示正常展示  不信  你测试个404呗
依赖：
	sweetalert.css
	loading.css
	jqery.js
	loading.js
	sweetAlert.js
特点：
	1.融合插件  loading.js和sweetAlert.js  在ajax请求过程中和请求介绍后都有可以设置很好的返回信息,
	2.支持promise  调用ajax1().then(ajax2).then(ajax3)   控制ajax请求的顺序!详情请看js  es6 Promise承诺
	3.支持时间坑，，但是考虑到业务场景不一样  注释掉了。
--------------------toggleAnimate--------------------
query封装业务动画开关抽取函数
triggerDom=".js_icon"; --触发的dom元素
targetDom=[".js_leftResearch","js_rightContent"];--要改变的目标的dom元素  可以是多个
目标元素的方法  有几个目标元素就应该有几组[function(){//第一次点击触发的函数},function(){//第二次点击触发的函数}]//影响的是pos.targetDom[0]
targetToggleFunction=[[function(){},function(){}],[function(){},function(){}]];
triggerToggleClass=["fa-angle-left","fa-angle-right"];--触发函数的class切换
targetToggleClass=[["shake-horizontal-slow shake-constant shake-constant--hover",""],["",""]];--目标元素的class切换
targetToggleAttr=[{"left":["-20%","0"]},{"width":["100%","80%"]}];--目标元素的属性切换
事例:
rj.toggleAnimate({
				triggerDom:".js_icon",
				targetDom:[".js_leftResearch",".js_rightContent"],
				triggerToggleClass:["fa-angle-left","fa-angle-right"],
				targetToggleAttr:[{"left":["-20%","0"]},{"width":["100%","80%"]}],
				targetToggleClass:[["shake-horizontal-slow shake-constant shake-constant--hover",""],["",""]],
			});
--------------------modal--------------------
包装插件:boostrap弹窗组件封装modal
时间：2018-07-26
版本：1.0
作者：小艾
依赖：bootstrap的model模态组件。
描述：底层用jqueryload加载子页面
用法:推荐用第一种
1.rj.modal(title,url,loadback,sureback,cancelback)
rj.modal("新增用户", 
	"./form.html",
	function() {
		//加载完成的回调	
	},
	function() {
		//确定按钮的回调	
	},
	function() {
		//取消按钮的回调
	},
);

2.rj.modal(options);
rj.modal({
	backdrop: true,//点击其他地方关闭
    keyboard: true,//键盘esc关闭
    show: true,//立即显示
    size:"",//modal-sm|modal-lg//尺寸大小调整
    title:"标题",//标题
    url:null,//加载内容的请求地址
    surebtn:true,//显示确认按钮
    surebtnText:"确定",//显示确认按钮
    cancelbtn:true,//显示取消按钮
    cancelbtnText:"取消",//显示确认按钮
    content:false,//弹层的内容  可以是html
    loadback:null,//加载完成或运行的回调
    sureback:null,//点击确定的回调   函数的参数为确定按钮的dom
    cancelback:null,//取消运行的回调	函数的参数为取消按钮的dom
});
--------------------ztree--------------------
包装插件:ztree
调用:rj.tree(type,id,data,seeting);
参数:
type：不同场景的使用类型
	ztree  树型菜单
	dragZtree	树型菜单带拖拽效果
	ztreeRadio	表单控件树形单选
	ztreeCheckbox	表单控件树形多选
id:ztree的选择器
data:默认为简单json格式
seeting：ztree的设置
事例:
ztree|dragZtree:<ul class="xztree" id="ztree1"></ul>
rj.ztree("ztree","#ztree1",zNodes,{callback:{
	onClick:function(event, treeId, treeNode){
		alert(treeNode.name);
	}
}});
ztreeRadio|ztreeCheckbox
回显时  data-value和value属性都生效
<input class="form-control" id="ztree2" name="ztree2" type="text" data-value="61,62,63,64" value="61,62,63,64"/>
rj.ztree("ztreeCheckbox","#ztree2",zNodes)

--------------------toggleRow--------------------
做新增和删除行的jquery业务抽取
|-class:rj_toggleRow:外层容器	|-data-name:组件的name属性会创建一个input隐藏域名称为该值	|-data-value:回显的值
	|-class:rj_toggleRow_item：循环条目
		|-class:rj_toggleRow_input:输入框控件
		|-class:rj_toggleRow_add:事件触发-新增行
		|-class:rj_toggleRow_del:事件触发-删除行
使用事例:
<div class="form-group">
    <label class="col-sm-2 control-label">关联账号</label>
    <div class="col-sm-10 rj_toggleRow" data-name="accounts" data-value='[{"code":"123","pass":456}]'>
    	<div class="row m-b-xs rj_toggleRow_item">
    		<div class="col-sm-5">
	       		<input type="text" class="form-control rj_toggleRow_input" placeholder="账号" name="code">
	         </div>
	         <div class="col-sm-5">
	      		<input type="text" class="form-control rj_toggleRow_input" placeholder="密码" name="pass">
	         </div>
	         <div class="col-sm-2 p-none">
	         	<div class="btn-group btn-group-xs m-t-xs">
	         		<button type="button" class="btn btn-default rj_toggleRow_add" title="增加"><i class="iconfont icon-add"></i></button>
	         		<button type="button" class="btn btn-default rj_toggleRow_del" title="删除"><i class="iconfont icon-guanbi3"></i></button>
	         	</div>
	         </div>
    	</div>
    </div>
</div>
--------------------form--------------------
该属性是封装表单的获取和回显
调用:
rj.form.get(formDom);
rj.form.set(formDom,data);
get方法将form里的表单元素序列化成{"username":"小艾","hobby":"2,3"}格式  
注:表单输入控件  name和value其中有一项没值都不会序列化
set方法讲这些值通过name的属性与data的key一一匹配赋值回显，包括ztree和toggleRow组件都生效
事例:
var data = 
 {
    "input1": "a",
    "input2": "b",
    "input3": "1",
    "input4": "html,js",
    "input5": "学习使我进步",
    "input6": "c",
    "input7": "43",
    "input8": "41,42,43,44",
    "input9": "d",
    "input10": "e",
    "input11": "[{\"inputKey1\":\"f\",\"inputKey2\":\"g\"}]",
    "input12": "[{\"inputKey1\":\"h\",\"inputKey2\":\"i\"},{\"inputKey1\":\"\",\"inputKey2\":\"j\"}]"
}
rj.form.set($("#addOrUpdate")[0],data);
rj.form.get($("#addOrUpdate")[0]);
--------------------title--------------------
--------------------title--------------------
*/
;((win)=>{
	let rjtx={
		basePath:window.location.origin+"/",
		init(){
			this.sweetAlert();
			//表格插件初始化 只用初始化一次
			this.table.tableFmt();
			this.resetPlug();
		},
		resetPlug(){
			/*iCheck   需要选框有ickeck的class*/
			if($.fn.iCheck){
				$('input.icheck').iCheck({
					checkboxClass: 'icheckbox_square-green',
					radioClass: 'iradio_square-green',
				});
			}
			/*tip tittle*/
			if($.fn.tooltip){
				 $('body').tooltip({
				  selector: '.js_tooltip',
				  //placement:"auto",
				});
			}
			//file框
			if($.fn.prettyFile){
				$('input[type="file"]:not(:hidden)').prettyFile();
			}
			//新增删除行抽取
			if($(".rj_toggleRow").length>0){
				this.toggleRow.init();
			}
		},
		sweetAlert(){
			if(!window.swal){return false};
			if(window.top !== window.self){
				swal=window.top.swal;
			}
			function getDefault(){
				return {
					cancelButtonText:"取消",
					confirmButtonText:"确认",
					html:true
				};
			}
			this.alert=function(title,text,type,fn){
				var json =getDefault();
					json.title=title;
					json.text=text;
					json.type=type || "info",
				swal(json,function(){
				  if(fn!=null)fn();
				});
			}
			win.xalert=this.alert;
			this.error=function(title,text,type,fn){
				var json =getDefault();
				json.title=title;
				json.text=text;
				json.type=type || "error";
				swal(json,function(){
					if(fn!=null)fn();
				});
			}
			win.xerror=this.error;
			this.confirm=function(title,text,type,fn){
				var json =getDefault();
				json.title=title;
				json.text=text;
				json.showCancelButton=true;
				json.type=type || "warning";
				json.closeOnConfirm=false;
		  		json.showLoaderOnConfirm=true;
				swal(json,function(){
				  setTimeout(function(){
						if(fn!=null)fn();
					},200);
				});
			}
			win.xconfirm=this.confirm
		},
		table:{
			init(opts){
				return $(opts.id).bootstrapTable($.extend({},$.fn.bootstrapTable.defaults,{
			        //url请求后台的URL（*）
			        //sortName排序的字段
			        //undefinedText当字段为空的时候用 - 替换
			        //queryParams 传递参数（*）limit, offset, search, sort, order
			        //搜索框中的文字 formatSearch:function(){return:"用户名、姓名、电话"}
			        //showColumns是否显示所有的列  默认false
			        //height：$(window).height()-200行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			        //uniqueId每一行的唯一标识，一般为主键列
		            contentType : "application/x-www-form-urlencoded",
		            method:'post',						//请求方式（*）
		            toolbar:'#toolbar',                //工具按钮用哪个容器
		            striped:false,                      //是否显示行间隔色
		            cache:false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		            pagination:true,                   //是否显示分页（*）
		            sortable:true,                     //是否启用排序
	    			sortOrder:"desc",					//排序方式
		            sidePagination:"server",           //分页方式：client客户端分页，server服务端分页（*）
		            pageNumber:1,                       //初始化加载第一页，默认第一页
		            pageSize:10,                       //每页的记录行数（*）
		            pageList:[10, 15, 30, 60,100],        //可供选择的每页的行数（*）
		            search:false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		           	searchOnEnterKey:true,				//按回车键才触发搜索
		            showRefresh:false,                  //是否显示刷新按钮
		            clickToSelect: true,                //是否启用点击选中行
		            detailView:false, 					//是否显示父子表
				}, opts));
			},
			tableFmt(){
				if($.fn.bootstrapTable){
				    $.fn.bootstrapTable.locales['zh-CN'] = {
				      	formatLoadingMessage: function () {
				          	return '<i class="fa fa-spinner fa-spin fz30 mColor"></i>';
				        },
				        formatRecordsPerPage: function (pageNumber) {
				            return '每页 ' + pageNumber + ' 条';
				        },
				        formatShowingRows: function (pageFrom, pageTo, totalRows) {
				        	//'显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
				        	//显示 1 到 10 项，共 57 项
				            return '显示'+ pageFrom +'到'+ pageTo + '项，共'+totalRows+'项';
				        },
				        formatNoMatches: function () {
				            return '没有找到匹配的记录';
				        }
				    };
				    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
				    //集体控制表格返回
				   	$.fn.bootstrapTable.columnDefaults.formatter=function(value,row,index){
				   		//checkbox
				   		if(typeof row[0] =="boolean"){
				   			return null;
				   		}
						if(value==undefined||value=="undefined"||value==null||value.length==0){
							return null;
						}
						var divDom = $("<div style='white-space: nowrap;display:inline-block;overflow: hidden;word-break: break-all;word-wrap: break-word;text-overflow: ellipsis;font-size: 1.2rem;' title='"+value+"'>"+value+"</div>")
						var width =divDom.appendTo(document.body).width();
						if(width>=250){
							divDom.css("max-width","250px").addClass("js_tooltip");
						}
						var html=divDom[0].outerHTML;
						divDom.remove();
						return html;
					}
				}
			},
			fmt:{
				VHcenter(value,row,index){
					return `<div style="position: absolute;width: 100%;left: 0;top: 50%;text-align: center;transform: translateY(-50%);font-weight: 600;">
						${value}
					</div>`;
				}
			},
			mergeCells(tableId,field,data){
				let rowspanArr = [];
				let startIndexArr = [];
				let rowspan = 1;
				for(let i=0,len=data.length;i<len;i++){
					if(data[i-1]&&(data[i-1][field]==data[i][field])){
						continue;
					}
					startIndexArr.push(i);
				}
				for(let i=0,len=startIndexArr.length;i<len;i++){
					if(startIndexArr[i+1]!==undefined){
						rowspanArr.push(startIndexArr[i+1]-startIndexArr[i]);
					}else{
						rowspanArr.push(data.length-startIndexArr[i]);
					}
				}
				for(let i in startIndexArr){
					$(tableId).bootstrapTable('mergeCells', {index: startIndexArr[i], field:field, colspan: 1, rowspan:rowspanArr[i]});
				}
			},
		},
		ajax(options){
			let $this = this;
				//Promise兼容
				if(window.Promise){
					return new Promise(function(resolve,reject){
						ajax(resolve,reject);
			   		});
				}else{
					ajax();
				}
				function ajax(resolve,reject){
					//参数处理
				    options = options || {};
				    options.url =options.url;
					//loading
					var xloading;
					if(options.id!=undefined&&options.id!=null&&options.id!=""&&options.id!=0){
						if(window.Xloading){
							xloading = new Xloading(options.id)
						}
					}
					//beforeSend
					if(options.beforeSend)beforeSend();
					//type
				    options.type = (options.type || "POST").toUpperCase();
				    var params = formatParams(options.data);
				
				    //创建 - 非IE6 - 第一步
				    if (window.XMLHttpRequest) {
				        var xhr = new XMLHttpRequest();
				    } else { //IE6及其以下版本浏览器
				        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
				    }
					//连接 和 发送 - 第二步
				    if (options.type == "GET") {
				        xhr.open("GET", options.url + "?" + params, true);
				        xhr.send(null);
				    } else if (options.type == "POST") {
				        xhr.open("POST", options.url, true);
				        //设置表单提交时的内容类型
				        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				        xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
				        xhr.send(params);
				    }
				    //接收 - 第三步
				    xhr.onreadystatechange = function () {
				        if (xhr.readyState == 4) {
				            var status = xhr.status;
				            if (status >= 200 && status < 300) {
				            	if(window.Promise)resolve();
				            	//关loading
				            	if(xloading)xloading.destroy();
				            	//检测是否是登陆超时 直接跳转
				            	if(xhr.responseText.indexOf("71754E4154114EF882C92FCFDC7DE0E1")!=-1){
				            		xalert("登陆超时~","登陆超时,请重新登陆","warning",function(){
				            			 window.top.location.href="login.html"
				            		})
				            	}
				            	//返回结果格式化成json
				            	var data = JSON.parse(xhr.responseText)
				            	//回调
				                options.success && options.success(data);
				                //弹窗
				                if(data.status==0&&options.msg!="none"){
				                	xalert(data.msg ||"哎呀，后台没给{msg:消息}参数",data.describe||null,"success");
				                }
				                if(data.status==1&&options.msg!="none"){
				                	xerror(data.msg ||"哎呀，后台没给{msg:消息}参数",data.describe||null,"error");
				            	}
			                } else {
			                	if(window.Promise)reject();
			                	if(xloading)xloading.destroy();
			                	//这里是为了跳转登陆超时  返回无权限页面403
			                	if(xhr.responseText.indexOf("3292b1da35a94a3b8b4c4964f8e48c05")!=-1){
			            			// window.location.href="index.jsp";
			            			document.write(xhr.responseText);
				            	}else{
				            		options.error && options.error(xhr);
				            		xalert("出错啦~",xhr.responseText,"error");
				            	}
				            }
				        }
				    }
				    //格式化参数
				    function formatParams(data) {
				        var arr = [];
				        for (var name in data) {
				            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
				        }
				        arr.push(("v=" + Math.random()).replace(".",""));
				        return arr.join("&");
				    }
				}
		},
		toggleAnimate(pos){
			$(pos.triggerDom).click(function(){
				var $this = this;
				if(!this.mark){
					$.each(pos.targetDom, function(index,value) {
						//样式
						if(pos.targetToggleClass&&pos.targetToggleClass[index]){
							$(value).addClass(pos.targetToggleClass[index][0]).removeClass(pos.targetToggleClass[index][1]);
						}
						//属性
						if(pos.targetToggleAttr&&pos.targetToggleAttr[index]){
							var Obj ={};
							$.each(pos.targetToggleAttr[index], function(key,val){
								Obj[key]=pos.targetToggleAttr[index][key][0];
							});
							$(value).animate(Obj,"400","swing",function(){
								$this.mark=true;
							});
						}
					});
					//方法
					if(pos.targetToggleFunction)pos.targetToggleFunction[0]();
					//这个自带选择器 只适合本项目公用方法抽取
					$(this).removeClass(pos.triggerToggleClass[1]).addClass(pos.triggerToggleClass[0])
					
				}else{
					$.each(pos.targetDom, function(index,value) {
						//样式
						if(pos.targetToggleClass&&pos.targetToggleClass[index]){
							$(value).addClass(pos.targetToggleClass[index][1]).removeClass(pos.targetToggleClass[index][0]);
						}
						//属性
						if(pos.targetToggleAttr&&pos.targetToggleAttr[index]){
							var Obj ={};
							$.each(pos.targetToggleAttr[index], function(key,val){
								Obj[key]=pos.targetToggleAttr[index][key][1];
							});
							$(value).animate(Obj,"400","swing",function(){
								$this.mark=false;
							});
						}
					});
					//方法
					if(pos.targetToggleFunction)pos.targetToggleFunction[1]();
					//这个自带选择器 只适合本项目公用方法抽取
					$(this).removeClass(pos.triggerToggleClass[0]).addClass(pos.triggerToggleClass[1])
				}
			});
		},
		modal(params) {
			let $this = this;//用到this中的load全局处理
			let opts, defaults, htmlBox;
			if(arguments.length == 1 && typeof params == "object") {
				opts = params;
			} else if(arguments.length == 1 && typeof params == "string") {
				$('#xa-modal').modal(opts);
			} else if(arguments.length > 1) {
				opts = {
					title: arguments[0],
					url: arguments[1],
					loadback: arguments[2],
					sureback: arguments[3],
					cancelback: arguments[4]
				}
			}
			defaults = {
				backdrop: false, //点击其他地方关闭
				keyboard: false, //键盘esc关闭
				show: true, //立即显示
				size: "", //modal-sm|modal-lg//尺寸大小调整
				title: "标题", //标题
				url: null, //加载内容的请求地址
				surebtn: true, //显示确认按钮
				surebtnText: "确定", //显示确认按钮
				cancelbtn: true, //显示取消按钮
				cancelbtnText: "取消", //显示确认按钮
				content: false, //弹层的内容  可以是html
				loadback: null, //加载完成或运行的回调
				sureback: null, //点击确定的回调
				cancelback: null, //取消运行的回调
			};
			opts = $.extend({}, defaults, opts);
			htmlBox = getTemplate(opts);
			bindEvents(opts, htmlBox)
			//获取模板
			function getTemplate(opts) {
				let bgColor = "",
					btnHtml = "";
				if(!opts.backdrop) {
					//加个背景阴影
					bgColor = "style='background:rgba(0,0,0,0.5);'";
				}
				if(opts.surebtn && opts.cancelbtn) {
					btnHtml = `
								<button type="button" class="btn btn-default btn-sm m-r-sm" data-dismiss="modal">${opts.cancelbtnText}</button>
								<button type="button" class="btn btn-danger btn-sm js_sure">${opts.surebtnText}</button>
							`;
				}
				if(opts.surebtn && !opts.cancelbtn) {
					btnHtml = `
								<button type="button" class="btn btn-danger btn-sm js_sure">${opts.surebtnText}</button>
							`;
				}
				if(!opts.surebtn && opts.cancelbtn) {
					btnHtml = `
								<button type="button" class="btn btn-default btn-sm m-r-sm" data-dismiss="modal">${opts.cancelbtnText}</button>
							`;
				}
				return `
						<div class="modal fade" id="xa-modal" ${bgColor}>
							<div class="modal-dialog ${opts.size}">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
										<h4 class="modal-title" style='font-size: 14px;border-left: 4px solid #09c;padding-left: 12px;'>${opts.title}</h4>
									</div>
									<div class="modal-body">
										
									</div>
									<div class="modal-footer" style="text-align:center;">
										${btnHtml}
									</div>
								</div>
							</div>
						</div>`;
			}
			//绑定事件
			function bindEvents(opts, htmlBox) {
				$("body").append(htmlBox);
				if(opts.url) {
					$this.load("#xa-modal .modal-body",opts.url, function() {
						if(opts.loadback) opts.loadback();
					});
					/*$("#xa-modal .modal-body").load(opts.url, function() {
						if(opts.loadback) opts.loadback();
					});*/
					$("#xa-modal .modal-footer").remove();
				}
				if(opts.content) {
					$("#xa-modal .modal-body").append(opts.content);
				}
				$("#xa-modal").modal(opts);
				//确定
				$('#xa-modal').on("click", ".js_sure", function() {
					if(opts.sureback) opts.sureback(this);
				})
				//取消
				$('#xa-modal').on('hidden.bs.modal', function(e) {
					if(opts.cancelback) opts.cancelback(this);
					//解除绑定  释放内存
					$('#xa-modal').unbind("click,hidden.bs.modal")
					$("#xa-modal").remove();
				})
			}
		},
		ztree(type,id,data,seeting){
			let opts={
					seeting:null,//设置
					$dom:null,//主dom
		        	id:null,//ztree的id
				};
			let ztree={
				_default:{
					seachInput:true
				},
				init(){
					let $this = this;
					if($this.config[type]){
						opts.seeting = $.extend(true,{},$this._default,$this.config[type],seeting);
						if(type=="ztree"||type=="dragZtree"){
							return $this.ztree();
						}else if(type=="ztreeRadio"||type=="ztreeCheckbox"){
							return $this.ztreeChoose();
						}
					}else{
						console.error("rj.ztree组件没有这个类型哦~")
					}
				},
				ztree(){
					$.fn.zTree.init($(id),opts.seeting,data);
					if(opts.seeting.seachInput){
						this.addSeach();
					}
				 	return $.fn.zTree.getZTreeObj($(id)[0].id);
				},
				addSeach(){
					//不重复添加
					if($(id).prev()&&$(id).prev().hasClass("rj_ztree_seach"))return false
					//搜索框
					$(id).before(`<input type="text" placeholder="请输入搜索关键字~" name="rj_ztree_seach" class="form-control rj_ztree_seach">`)
				 	/*
				 	 	@param zTreeId ztree对象的id,不需要#
						@param searchField 输入框选择器
						@param isHighLight 是否高亮,默认高亮,传入false禁用
						@param isExpand 是否展开,默认合拢,传入true展开
				 	*/
				 	fuzzySearch($(id)[0].id,$(id).prev(),null,true); //初始化模糊搜索方法
				},
				ztreeChoose(){
					 /*原本
					  <div class="col-sm-10">
			        	<input class="form-control" id="ztree2" name="ztree" type="text"/>
			        </div>
			        	格式化后
			        <div class="js_comm_ztree_checkBox">
			        	<input type="hidden" class="form-control input1" name="ztrees" />
			           	<input class="form-control input2" readonly="readonly" name="ztree2" type="text"/>
						<div class="ztree-down">
							<ul id="ztree2" class="ztree"></ul>
						</div>
		        	</div>*/
		        	let $this = this;
		        	//1.创建符合ztree的dom形式
		        	this.setFmtHtml();
		        	//2.绑定下拉显示树型结构
		        	this.bindToggleEvent();
		        	//3.初始化下拉值
		        	$.fn.zTree.init(opts.$dom.next().find(".ztree"),opts.seeting,data);
		        	//是否需要初始化过滤器
		        	if(opts.seeting.seachInput){
						this.addSeach();
					}
		        	//4.是否需要回显
		        	if(opts.$dom.val()||opts.$dom.data("value")){
		        		$this.backShow(opts.$dom.val()||opts.$dom.data("value"));
		        	}
		        	return $.fn.zTree.getZTreeObj(opts.id);
				},
				bindToggleEvent(){
					let $this  = this;
					opts.$dom.click(function(){
						opts.$dom.next().css({left:$(this).position().left, top:$(this).outerHeight()-1,width:$(this).outerWidth()}).slideDown("fast");
						$("body").on("click",hideTree);
					});
					function hideTree(event) {
						if (!(($(event.target).closest(".ztree-down").length>0)||event.target==opts.$dom[0])) {
							opts.$dom.next().hide();
							if($(".rj_ztree_seach").length>0){
								$(".rj_ztree_seach").val("")
							}
							$("body").unbind("click", hideTree);
						}
					}
				},
				setFmtHtml(){
					$(id).prop("readonly",true);
		        	let name = $(id).attr("name");
		        	$(id).removeAttr("name");
		        	$(id).before(`<input type="hidden" class="form-control input1" name="${name}" />`);
		        	$(id).after(`<div class="ztree-down"><ul class="ztree"></ul></div>`);
		        	//opts赋值
		        	opts.$dom=$(id);
		        	opts.id = opts.$dom[0].id;
		        	opts.$dom.removeAttr("id");
		        	opts.$dom.next().find(".ztree").attr("id",opts.id);
				},
				config:{
					ztree:{
						view: {
			            	showIcon:false,
			            },
			            data: {
			                simpleData: {
			                    enable: true
			                }
			            }
					},
					dragZtree:{
			            view: {
			            	showIcon:false,
			            },
			            data: {
			                simpleData: {
			                    enable: true
			                }
			            },
			            edit: {
			                enable: true,
			                drag:{
			                	isCopy:false,
			                	autoOpenTime:200,
			                },
			                showRemoveBtn:false,
			                showRenameBtn:false,
			            },
			            callback:{
			            	onDrop:function(event, treeId, treeNodes, targetNode, moveType, isCopy){
			            		//treeNodes所选中的拖拽的节点  可以是多个  按住ctrl可以多选。
			            		//targetNode目标节点
			            		//moveType"inner"：成为子节点，"prev"：成为同级前一个节点，"next"：成为同级后一个节点
			            		//isCopy是否是复制，，这个不关注 我已经设置为不可复制
			            	},
			            	onClick:function(event, treeId, treeNode){
			            		if(event.ctrlKey==true)return false;//当按住ctrlkey的时候不触发下面的事件  自己写的时候记得加上 事件冲突
			            	}
			            }
					},
					ztreeRadio:{
						view: {
							dblClickExpand: false,
							showLine: false,
							showIcon:false
						},
						data: {
							simpleData: {
								enable: true
							}
						},
						check:{
							enable:true,
							chkStyle: "radio",
							radioType: "all",
						},
						callback: {
							onClick:function(e, treeId, treeNode){
								if(treeNode.isParent){
									$("#"+treeNode.tId+"_switch").trigger("click");
								}else{
									$("#"+treeNode.tId+"_check").trigger("click");
								}
							},
							onCheck: function(e, treeId, treeNode){
								if(treeNode.checked){
									$("#"+treeNode.tId).closest(".ztree").closest("div").fadeOut("fast").prev().val(treeNode.name).prev().val(treeNode.id)
								}else{
									$("#"+treeNode.tId).closest(".ztree").closest("div").fadeOut("fast").prev().val("").prev().val("")
								}
							}
						}
					},
					ztreeCheckbox:{
						view: {
							dblClickExpand: false,
							showLine: false,
							showIcon:false
						},
						data: {
							simpleData: {
								enable: true
							}
						},
						check:{
							enable:true,
							chkStyle: "checkbox",
							chkboxType: { "Y": "ps", "N": "ps" }
						},
						callback: {
							onClick:function(e, treeId, treeNode){
								if(treeNode.isParent){
									$("#"+treeNode.tId+"_switch").trigger("click");
								}else{
									$("#"+treeNode.tId+"_check").trigger("click");
								}
							},
							onCheck: function(e, treeId, treeNode){
								var treeObj = $.fn.zTree.getZTreeObj(opts.id);
								var nodes = treeObj.getCheckedNodes(true);
								var len = nodes.length;//选中的数组长度
								var sublen = 0;//选中子项的查明后第
								var html ="";//页面显示的值
								var ids ="";//数据库传入的值
								$.each(nodes, function(index,node){
										sublen++;
										if(index!=len-1){
											html+=node.name+",";
											ids+=node.id+",";
										}else{
											html+=node.name;
											ids+=node.id;
										}
								});
								$("#"+treeNode.tId).closest(".ztree").closest("div").prev().val(sublen>0?("("+sublen+"个)"+html):"").prev().val(ids);
							}
						}
					}
				},
				backShow(ids){
					var treeObj = $.fn.zTree.getZTreeObj(opts.id);
					if(type=="ztreeCheckbox"){
						var nodes = treeObj.transformToArray(treeObj.getNodes()).filter(node=>{
							return !node.isParent;
						})
						for (var i=0, l=nodes.length; i < l; i++) {
							let arr = ids.split(",");
							for (let id of arr) {
								if(nodes[i].id==id){
									let node = treeObj.transformTozTreeNodes(nodes[i])[0];
									let pnode=node.getParentNode();
									while(pnode){
										if(!treeObj.open){
											treeObj.expandNode(pnode, true, false);
										}
										pnode=pnode.getParentNode();
									}
									$("#"+nodes[i].tId+"_check").trigger("click");
									break;
								}
							}
						}
					}else if(type == "ztreeRadio"){
						var nodes = treeObj.transformToArray(treeObj.getNodes());
						for (var i=0, l=nodes.length; i < l; i++) {
							if(nodes[i].id==ids){
								let node = treeObj.transformTozTreeNodes(nodes[i])[0];
								let pnode=node.getParentNode();
								while(pnode){
									if(!treeObj.open){
										treeObj.expandNode(pnode, true, false);
									}
									pnode=pnode.getParentNode();
								}
								$("#"+nodes[i].tId+"_check").trigger("click");
								//treeObj.checkNode(node, true, true,true);
								break;
							}
						}
					}
				},
			}
			return ztree.init();
		},
		toggleRow:{
			//初始化 做新增表单时 默认值是空  后期有默认值在拓展
			init(){
				/*
				.rj_toggleRow     data-name data-value
				rj_toggleRow_item
					rj_toggleRow_input
					rj_toggleRow_add
					rj_toggleRow_del
				*/
				let $this = this;
				$.each($(".rj_toggleRow"), function(index,rowDom) {
					let opts ={};
					//复制 赋值defaultKey  itemHtml
					opts = $this._cloneDom(rowDom,opts);
					//创建隐藏域
					$this._createInput(rowDom,opts);
					//判断是否有初始值
					$this._isStartValue(rowDom,opts);
					//控制删除建
					$this._controlDel(rowDom);
					//value赋值
					$this._synValue(rowDom,opts);
					//表单绑定事件
					$this._bindChange(rowDom,opts);
					//新增
					$(rowDom).on("click",".rj_toggleRow_add",function(){
						$(rowDom).append(opts.itemHtml);
						$this._controlDel(rowDom);
						$this._synValue(rowDom,opts);
					});
					//删除
					$(rowDom).on("click",".rj_toggleRow_del",function(){
						$(this).closest(".rj_toggleRow_item").remove();
						$this._controlDel(rowDom);
						$this._synValue(rowDom,opts);
					});
				});
			},
			_cloneDom(rowDom,opts){
				opts.defaultKey=[];
				opts.itemHtml="";
				let cloneDom =$(rowDom).find(".rj_toggleRow_item").eq(0);
				$(cloneDom).find(".rj_toggleRow_input").each(function(index,inputDom){
					opts.defaultKey.push(inputDom.name);
					$(inputDom).removeAttr("name");
				});
				opts.itemHtml = $(cloneDom).prop("outerHTML");
				return opts;
			},
			_createInput(rowDom,opts){
				let name =$(rowDom).data("name")||"defaultKey";
				$(rowDom).before(`<input type="hidden" name="${name}"/>`);
			},
			_synValue(rowDom,opts){
				opts.valueJSON=[];
				$.each($(rowDom).children(),function(itemIndex,itemDom) {
					//item
					let obj = {};
					$(itemDom).find(".rj_toggleRow_input").each(function(inputIndex,inputDom){
						obj[opts.defaultKey[inputIndex]]=$(inputDom).val();
					});
					//是否值全部为空  true表示有值  false表示没值
					function isHasValue(obj){
						for(let key in obj){
							if(obj[key]){
								return true;
							}else{
								if(obj[key]===0||obj[key]==="0"){
									return true;
								}
							}
						}
						return false;
					}
					if(isHasValue(obj)){
						opts.valueJSON.push(obj);
					}
				});
				$(rowDom).data("value",opts.valueJSON);
				if(opts.valueJSON.length>0){
					$(rowDom).prev().val(JSON.stringify(opts.valueJSON));
				}else{
					$(rowDom).prev().val("");
				}
				return opts;
			},
			_bindChange(rowDom,opts){
				let $this = this;
				$(rowDom).on("change",".rj_toggleRow_input",function(){
					$this._synValue(rowDom,opts);
				});
			},
			_isStartValue(rowDom,opts){
				if($(rowDom).data("value")){
					let data = $(rowDom).data("value");
					if(typeof data =="string"){
						try{
							data = JSON.parse(data)
						}catch(e){
							console.error("rj.toggleRow组件 data-value的格式错误~")
							return false;
						}
					}
					$(rowDom).children().remove();
					for(let i in data){
						let $itemHtml = $(opts.itemHtml);
						$itemHtml.find(".rj_toggleRow_input").each(function(inputIndex,inputDom){
							if(data[i][opts.defaultKey[inputIndex]]!=undefined){
								$(inputDom).val(data[i][opts.defaultKey[inputIndex]]);
							}else{
								console.error(`rj.toggleRow组件 ${opts.defaultKey[inputIndex]}:在数据源的key与name为该值的表单控件没有对应项`)
							}
						});
						$(rowDom).append($itemHtml)
					}
				}
			},
			_controlDel(rowDom){
				//样式
				if($(rowDom).children().length==1){
					$(rowDom).find(".rj_toggleRow_del").addClass("hide");
				}else{
					$(rowDom).children().eq(0).find(".rj_toggleRow_del").removeClass("hide");
				}
			}
		},
		form:{
			get(formDom){
				var formElements = formDom.elements;
				var json = {};
				for(let i=0,len=formElements.length;i<len;i++){
					var type = formElements[i].type.toLowerCase();
					if(type!="button" && type!="submit" && type!="reset"){
						if(type=="checkbox" && formElements[i].checked){
							var value = json[formElements[i].name]||formElements[i].value;
							if(formElements[i].name in json){
								value +=","+formElements[i].value;	
							}
							json[formElements[i].name] = value;
						}else if(type=="radio" && formElements[i].checked){
							json[formElements[i].name] = formElements[i].value;
						}
						if(type!="radio" && type!="checkbox" && formElements[i].name && formElements[i].value){
							json[formElements[i].name] = formElements[i].value;
						}
					}
				}
				return json;
			},
			set(formDom,data){
				(function(formDom,data){
					var formElements = formDom.elements;
					for(let i=0,len=formElements.length;i<len;i++){
						for(let key in data){
							if(formElements[i].name==key){
								var type = formElements[i].type.toLowerCase();
								if(type!="button" && type!="submit" && type!="reset"){
									if(type=="checkbox"){
										let checkValues = data[key].split(",");
										for(let val of checkValues){
											if(formElements[i].value == val){
												formElements[i].checked=true;
											}
										}
									}else if(type=="radio"){
										if(formElements[i].value == data[key]){
											formElements[i].checked=true;
										}
									}
									if(type!="radio" && type!="checkbox"){
										formElements[i].value=data[key];
									}
								}
							}
						}
					}
				})(formDom,data);
				//含有data-name属性的组件默认加上 data-value
				(function(formDom,data){
					$(formDom).find("[data-name]").each(function(index,val){
						for(let key in data){
							if($(val).data("name")==key){
								$(val).data("value",data[key]);
							}
						}
						
					});
				})(formDom,data);
			}
		},
		load(selector,url,callback){
			let $this = this;
			$(selector).load(url,function(reponseText,status,res){
				if(res.readyState==4){
					if (res.status >= 200 && res.status < 300) {
						if(res.responseText.indexOf("71754E4154114EF882C92FCFDC7DE0E1")!=-1){
            			 	window.top.location.href="login.html"
		            	}
						callback&&callback();
					}else{
	                	//这里是为了跳转登陆超时  返回无权限页面403
	                	if(res.responseText.indexOf("3292b1da35a94a3b8b4c4964f8e48c05")!=-1){
	            			document.write(res.responseText);
		            	}else{
		            		xalert("出错啦~",res.responseText,"error");
		            	}
					}
				}
			});
		}
	};
	rjtx.init();
	win.rj=rjtx;
})(window);
