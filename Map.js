/*
负责对新的网桥和主机进行注册，重名不允许注册
 */
var Map={
    createNew:function () {
       var map={};
       map.hostMap={};
       map.bridgeMap={};
       map.registerHost=function (host) {
           if(host.type!=='Host') return;
           for(var mac in map.hostMap){
               if(mac===host.mac){
                   console.log('注册失败！该mac地址:',mac,'已存在');
                   return;
               }
           }
           map.hostMap[host.mac]=host;
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
       };
       return map;
    }
};