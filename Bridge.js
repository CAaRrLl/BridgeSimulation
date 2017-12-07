/*
网桥类，实例化时需要确定接口数num和网桥的唯一标识id
 */
var Bridge={
    createNew: function (num,id) {
        var bridge={};
        /*
        转发表
         */
        var FwTable={};
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
                /*
                创建接口i连接的网段
                 */
                Net.add(i);
            }
            console.log('网桥(id:',bridge.id,')接口',bridge.interface,'初始化成功');
        };
        /*
        接收从接口interface进来的帧frame
         */
        bridge.receiveFrame=function(interface){
            var frames=Net.read(interface);
            if(!frames) return;
            // console.log('frames',frames);
            for(var k=0;k<frames.length;k++){
                console.log('网桥(id:',bridge.id,')收到帧',frames[k]);
                /*
                转发表中是否有源地址的，若没有则写入转发表中
                 */
                if(!FwTable.hasOwnProperty(frames[k].mac)){
                    FwTable[frames[k].mac]=interface;
                    console.log('帧源地址不在网桥转发表中:',bridge.id,'转发表中将地址',frames[k].mac,'和接口',interface,'写入转发表');
                    bridge.showFTable();
                }
                /*
                转发表中是否有目标地址的，若没有则转发给其他端口,有则转发给该端口
                 */
                if(FwTable.hasOwnProperty(frames[k].remoteMac)){
                    if(FwTable[frames[k].remoteMac]===interface){
                        console.log('因为帧去往的接口与收到帧的接口相同，故网桥(id:',bridge.id,')对帧不进行转发');
                        continue;
                    }
                    bridge.sendFrame(frames[k],FwTable[frames[k].remoteMac]);
                    console.log('网桥(id:',bridge.id,')在转发表中找到去往目的地的接口，故转发帧到网段(接口)',FwTable[frames[k].remoteMac]);
                    continue;
                }
                console.log('在转发表中找不到去往目的地的接口');
                for(var i=0;i<bridge.interface.length;i++){
                    if(bridge.interface[i]!==interface) {
                        bridge.sendFrame(frames[k], bridge.interface[i]);
                        console.log('网桥(id:', bridge.id, ')转发帧到网段(接口)', bridge.interface[i]);
                    }
                }
            }
        };
        /*
        转发某帧,到某个接口所连接的网段
         */
        bridge.sendFrame=function (frame,interface) {
            Net.write(interface,frame,'Bridge'+bridge.id);
        };
        /*
        输出转发表
         */
        bridge.showFTable=function () {
            console.log('转发表',FwTable);
        };
        return bridge;
    }
};