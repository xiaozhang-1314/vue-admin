export function stripscript(str) { 
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]") 
    var rs = "";    
    for (var i = 0; i < str.length; i++) { 
      rs = rs + str.substr(i, 1).replace(pattern, ''); 
     } 
    return rs;
    }

    export function validataEmail(value){
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/
        return reg.test(value) ? true : false
        // if(!reg.test(value)){
        //     return false
        // }else{
        //     return true
        // }
    }

    export function validatacode(value){
        let age = /^[0-9a-z]{6}$/
        return age.test(value) ? true : false
    }

    export function validatapass(value){
        let pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        return pass.test(value) ? true : false
    }