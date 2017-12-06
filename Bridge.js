/*
网桥类，实例化时需要确定接口数num和网桥的唯一标识id
 */
var Bridge={
    createNew: function (num,id) {
        var bridge={};
        /*
        转发表
         */
        var FwTable={
        };
        bridge.type='Bridge';
        /*
        网桥唯一标识
         */
        bridge.id=id;
        /*
        网桥接口列表
         */
        bridge.interface=[];
        /*
        初始化网桥接口
         */
        bridge.initInterface=function () {
            if(typeof num!=='number') return;
            for(var i=1;i<=num;i++){
                bridge.interface.push(i);
            }
        };
        return bridge;
    }
};