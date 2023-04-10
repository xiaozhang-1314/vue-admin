var tool = {
    getUrlParams:function(val){
      var res = {domain:"",params:[]};
      var result = val.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));
      
      res.domain = val.substring(0,val.indexOf('?'));
      if(result == null){
          res.params = [];
      }
      if(result){
        for(var i = 0; i < result.length; i++){
          result[i] = result[i].substring(1);
        }
        res.params = result;
      }
      return res;
    },
    setNewParamsByName:function(url,name,value){
      var info = this.getUrlParams(url);
      var params = info.params;
      if(params.length==0){
        params=[name+"="+value];
      }else{
        var exist = false;
        for (var index = 0; index < params.length; index++) {
          var key = params[index].split('=')[0];
          if(name == key){
            params[index] = key + "=" +value;
            exist = true;
            break;
          }
        }
        if(exist == false){
          params.push(name+"="+value);
        }
      }
      
      var res = "?"+params.join('&');
      return res;
    },
    pushHistory:function(newParamsStr){
      window.history.pushState(null,null,newParamsStr);
    },
    sendAjax:function(){
      var params = tool.getUrlParams(window.location.href).params;
      $.ajax({
        url:"/search?productOnly=true&"+params.join('&'),
        success:function(d){
            if(d){
                $("#searchContentContainer").html(d);
            }else{
                $("#searchContentContainer").html("亲~没有找到相关商品，请重新输入搜索条件");
            }
        },
        error:function(error){
            $("#searchContentContainer").html("<div style='text-align: center;padding: 40px 0px 40px 25px;background-color: #f2f2f2;color: #333333;font-size: 16px;line-height: normal;'>服务器异常，程序员小哥哥正在紧急处理，请稍后再试！</div>");
        }
      })
    },
    view:{
      clearActiveCls:function(){
        $("div.headNav li").each(function(index,item){
            if(index < 4){
              $(this).removeClass("active");
            }
          })
      },
      checkFilterExist:function(){
        var params = tool.getUrlParams(window.location.href).params;
        var res = {exist:false,val:""};
        for (let index = 0; index < params.length; index++) {
          if(params[index].split('=')[0] == "filter"){
            res.exist = true;
            res.val = params[index].split('=')[1];
            break;
          }
        }
        return res;
      },
      bindEvent:function(){
        //推荐，新品，评论数 key = sorter
        $("body").on("click","div.headNav li[tag=sorter]",function(){
          if($(this).hasClass("active")){
            return;
          }
          tool.view.clearActiveCls();
          $(this).addClass("active");

          var newParams = tool.setNewParamsByName(window.location.href,"sorter",$(this).attr("value"));
          tool.pushHistory(newParams);

          tool.sendAjax();
        })

        //价格   key = sorter  3：降序(default)，4：升序
        $("body").on("click","div.headNav li[tag=sorter1]",function(){
          tool.view.clearActiveCls();
          if(!$(this).hasClass("active")){
            $(this).addClass("active");
          }
          if($(this).attr("value") == "3"){
            $(this).attr("value","4");
          }else{
            $(this).attr("value","3");
          }
          
          var newParams = tool.setNewParamsByName(window.location.href,"sorter",$(this).attr("value"));
          tool.pushHistory(newParams);
        })
      
        //条件输入
        $("body").on("click","#enterButton",function(){
          var price = "";
          var bp = $("#startPrice").val();
          var ep = $("#endPrice").val();
          if(bp == "" && ep == ""){
            price = "";
          }else{
            price = bp + "-" + ep;
          }
          var newParams = tool.setNewParamsByName(window.location.href,"price",price);
          tool.pushHistory(newParams);

          newParams = tool.setNewParamsByName(window.location.href,"innerKey",$("#innerKey").val());
          tool.pushHistory(newParams);

          tool.sendAjax();
        })

        //急速到家，私人订制，分期付款，以旧换新
        $("body").on("click","div.headNav span[tag=sorter2]",function(){
          var key = $(this).attr("value");
          var value = false;
          if($(this).hasClass("checked")){
            $(this).removeClass("checked");
            value = "";
          }else{
            $(this).addClass("checked");
            value = "true";
          }

          var newParams = tool.setNewParamsByName(window.location.href,key,value);
          tool.pushHistory(newParams);

          tool.sendAjax();
        })

        //库存，内购
        $("body").on("click","div.headNav input[type=checkbox][tag=sorter3]",function(){
          var key = $(this).attr("value");
          
          var newParams = tool.setNewParamsByName(window.location.href,key,$(this).get(0).checked?"true":"");
          tool.pushHistory(newParams);

          tool.sendAjax();
        })
        
        //filter save button
        $("body").on("click","input[type=button][tag=filterButton]",function(){
          var ulParent = $(this).parents("ul.duoxuanUl");
          var key = ulParent.attr("value");
          var res = [];
          ulParent.find("li.multipleSelected").each(function(){
            res.push($(this).attr("value"));
          })
          var value = key + ":" + res.join(',');
          
          var resFilter = tool.view.checkFilterExist();
          if(resFilter.exist){
            value = resFilter.val + "@" + value;
          }
          
          var newParams = tool.setNewParamsByName(window.location.href,"filter",value);
          tool.pushHistory(newParams);

          window.location.href = window.location.href;
        })
        //filter cancel button
        $("body").on("click","input[type=button][tag=filterCancel]",function(){
          $(this).parents("ul.duoxuanUl").hide();
        })

        //多选按钮，控制ul隐藏，显示
        $("body").on("click","div.duoxuan",function(){
          var nextUL = $(this).next("ul.duoxuanUl");
          if(nextUL.css("display") == "none"){
            $("ul.duoxuanUl").each(function(){
              $(this).hide();
            })
            nextUL.show();
          }else{
            nextUL.hide();
          }
        })
        //多选ul里面的li
        $("body").on("click","li[tag=filterli]",function(){
          if($(this).hasClass("multipleSelected")){
            $(this).attr("class","multipleSelect");
          }else{
            $(this).attr("class","multipleSelected");
          }
        })
        //crumbs 的隐藏显示
        $("body").on("click","input[type=text][tag=crumbs]",function(){
          var nextUL = $(this).nextAll("ul.selectUl");
          if(nextUL.css("display") == "block"){
            nextUL.hide();
          }else{
            $("input[type=text][tag=crumbs]").each(function(){
              $(this).nextAll("ul.selectUl").hide();
            })
            nextUL.show();
          }
        })
      }
    }
  }

  $(function(){
    tool.view.bindEvent();
  })