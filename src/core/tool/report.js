export default {
    initLine:function(x,data){
        return  {
            xAxis: {
                type: 'category',
                data: x,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {},
            yAxis: {
                type: 'value'
            },
            series: data
            // [
            //     {
            //         name: 'name1',
            //         data: [1000, 932, 901, 934, 1290, 1330, 1320],
            //         type: 'line'
            //     },
            //     {
            //         name: 'name2',
            //         data: [3000, 932, 901, 934, 1290, 1330, 1320],
            //         type: 'line'
            //     }
            // ]
        };
    },
    initPie:function(title,x,data){
        return {
            title : {
                text: title?title:"",
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: x //['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    // name: '详情',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:data
                    // [{value:335, name:'直接访问'},
                    //     {value:310, name:'邮件营销'},
                    //     {value:234, name:'联盟广告'},
                    //     {value:135, name:'视频广告'},
                    //     {value:1548, name:'搜索引擎'}]
                    ,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    },
    initBar:function(x,y){
        return {
            xAxis: {
                type: 'category',
                data: x//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {},
            yAxis: {
                type: 'value'
            },
            series: [{
                data: y,//[120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        };
    }
}