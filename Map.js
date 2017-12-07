/*
负责对新的网桥和主机进行注册，重名不允许注册
 */
var Map={
    createNew:function () {
       var map={};
       map.type='Map';
       map.hostMap={};
       map.bridgeMap={};
       var connMap={};
       map.registerHost=function (host) {
           if(host.type!=='Host') return;
           for(var mac in map.hostMap){
               if(mac===host.mac){
                   console.log('注册失败！该mac地址:',mac,'已存在');
                   return;
               }
           }
           map.hostMap[host.mac]=host;
           console.log('mac地址:',host.mac,'注册成功');
       };
       map.registerBridge=function (bridge) {
         if(bridge.type!=='Bridge') return;
         for(var id in map.bridgeMap){
             if(id==bridge.id){
                 console.log('注册失败！该网桥id',id,'已经存在');
                 return;
             }
         }
         map.bridgeMap[bridge.id]=bridge;
         console.log('网桥id:',bridge.id,'注册成功');
         connMap[bridge.id]={};
         for(var i=1;i<=bridge.interface.length;i++){
             connMap[bridge.id][i]=[];
         }
       };
       /*
       添加连接信息
        */
       map.addLink=function (id,interface,mac) {
           if(!map.bridgeMap.hasOwnProperty(id)){
               console.log('错误！网桥(id:',id,')未注册');
               return;
           }
           if(!map.hostMap.hasOwnProperty(mac)){
               console.log('错误！主机(mac:',mac,')未注册');
               return;
           }
           if(!connMap[id].hasOwnProperty(interface)){
               console.log('错误！网桥(id',id,')不存在接口',interface);
               return;
           }
           connMap[id][interface].push(mac);
       };
       /*
       获取连接表
        */
       map.getConnMap=function () {
           return connMap;
       };
       return map;
    }
};