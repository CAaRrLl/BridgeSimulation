/*
存放对应网段的接收的帧,可动态添加
 */
var Net={
    network:{
        /*
        网段1,(e:writeEnd:'Bridge:100'/'Host')目前写端是（网桥100）
        */
        1:{writeEnd:'',frames:[]}
    },
    /*
    添加网段
     */
    add:function (networkId){
        if(Net.network.hasOwnProperty(networkId)) return;
        Net.network[networkId]={};
        Net.network[networkId].frames=[];
        Net.network[networkId].writeEnd='';
    },
    /*
    对应网段写入帧
     */
    write:function (networkId,frame,type) {
        if(!Net.network.hasOwnProperty(networkId)) return;
        if(Net.network[networkId].writeEnd!==type
            &&Net.network[networkId].writeEnd!==''){
            console.log('网段',networkId,'写入端被占用');
            return;
        }
        if(Net.network[networkId].writeEnd===''){
            Net.network[networkId].writeEnd=type;
        }
        if(frame.mac===frame.remoteMac) return;
        Net.network[networkId].frames.push(frame);
    },
    /*
    从对应网段读取帧
     */
    read:function (networkId) {
        if(!Net.network.hasOwnProperty(networkId)) return;
        if(Net.network[networkId].writeEnd==='') return;
        return Net.network[networkId].frames;
    },
    /*
    清除整个网段缓存
     */
    flush:function () {
        for(var id in Net.network){
            Net.network[id].writeEnd='';
            Net.network[id].frames=[];
        }
    },
    /*
    打印网络中的数据流
     */
    show:function () {
        for(var key in Net.network){
            console.log('网络中数据流',Net.network[key]);

        }
    }
};