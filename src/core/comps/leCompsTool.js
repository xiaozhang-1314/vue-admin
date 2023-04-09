/**
 * Created by wupeng5 on 2018/2/1.
 */

let FORMEventPublisher = function(){

    this.eventCallbackDictionary = {};

    this.on = function(eventName,callback){
        this.eventCallbackDictionary[eventName] = callback;
    }

    this.broadcast = function(eventName,data){
        for(let i in this.eventCallbackDictionary){
            if(i == eventName && this.eventCallbackDictionary[eventName]){
                this.eventCallbackDictionary[eventName](data);
                //this.eventCallbackDictionary[eventName] = null;
            }
        }
    }
}

let LeCompTool = {
    object:{
        equalsObject(source,target){
            let p;
            for (p in source) {
                if (typeof (target[p]) == 'undefined') {
                    return false;
                }
            }
    
            for (p in source) {
                if (source[p]) {
                    switch (typeof (source[p])) {
                        case 'object':
                            if (!this.equalsObject(source[p], target[p])) {
                                return false;
                            }
                            break;
                        case 'function':
                            if (typeof (target[p]) == 'undefined' ||
                                (p != 'equals' && source[p].toString() != target[p].toString()))
                                return false;
                            break;
                        default:
                            if (source[p] != target[p]) {
                                return false;
                            }
                    }
                } else {
                    if (target[p])
                        return false;
                }
            }
    
            for (p in target) {
                if (typeof (source[p]) == 'undefined') {
                    return false;
                }
            }
    
            return true;
        },
        cloneObj(source){
            if(source){
                return JSON.parse(JSON.stringify(source));
            }
            return null;
        },
        addPrimaryAndCk(data,ck){
            data.map(item=>{
                if(ck!=undefined){
                    if(!ck){
                        item.ck = false;
                    }else{
                        item.ck = true;
                    }
                }else{
                    item.ck = false;
                }
                item.cls = "";
                item.__tmpId = _idSeed.newId();
            });
            return data;
        },
        getCheckedItems(arr,field){
            let res = {items:[],vals:[]};
            arr.map(item=>{
                if(item.ck){
                    res.items.push(item);
                    if(field){
                        res.vals.push(item[field]);
                    }
                }
            })
            return res;
        },
        getInfoInArrayByField(field,vals,array){
            let res = [];
            vals.map(item=>{
                array.map(k=>{
                    if(k[vals] == item){
                        res.push(k);
                    }
                })
            })
            return res;
        }
    },
    arrayServer:{
        _private:{
            getIndexByString: function (array, str) {
                let _index = -1;
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == str) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            getIndexByObject: function (array, obj) {
                let _index = -1;
                for (let i = 0; i < array.length; i++) {
                    if (LeCompTool.object.equalsObject(array[i], obj)) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            removeSingleStr: function (array, str) {
                let _index = this.getIndexByString(array, str);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            removeSingleObject: function (array, item) {
                let _index = this.getIndexByObject(array, item);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            sortByDate:function(array, field, desc){
                let _arr = LeCompTool.object.cloneObj(array);
                _arr.map(function(item){
                    item._tmpDateField = new Date(item[field]).getTime();
                })
                _arr.sort(function (a, b) {
                    if(desc){
                        return a._tmpDateField - b._tmpDateField;
                    }else{
                        return b._tmpDateField - a._tmpDateField;
                    }
                })
                return _arr;
            },
            sortByNumAndChar:function(array, field, desc){
                let _arr = LeCompTool.object.cloneObj(array);
                _arr.sort(function (a, b) {
                    if(desc){
                        return a[field] - b[field];
                    }else{
                        return b[field] - a[field];
                    }
                })
                return _arr;
            }
        },
        removeItems:function(array, items){
            if(array instanceof Array == false){
                LeCompTool.throwError("params[array] must be Array in removeItems method");
                return;
            }
            items.map(function (item) {
                if (typeof item == "object") {
                    LeCompTool.arrayServer._private.removeSingleObject(array, item);
                }
                if (typeof item == "string") {
                    LeCompTool.arrayServer._private.removeSingleStr(array, item);
                }
            })
            return array;
        },
        sortByField:function(array,field,desc){
            if(array instanceof Array == false){
                LeCompTool.throwError("params[array] must be Array in sortByField method");
                return;
            }
            if(array.length == 0){
                return array;
            }
            let res = null;
            let tmp = array[0][field];

            //check Date
            if (new Date(tmp) != "Invalid Date") {
                res = _private.sortByDate(array, field, desc);
            } else {
                res = _private.sortByNumAndChar(array, field, desc);
            }
            return res;
        }
    },
    _idSeed:{
        id:90000,
        newId:()=>{
            return LeCompTool._idSeed.id++;
        }
    },
    _form_event_publisher:new FORMEventPublisher()
}

export default LeCompTool;