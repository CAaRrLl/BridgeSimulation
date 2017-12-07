var map=Map.createNew();
var bridgeA=Bridge.createNew(2,100);//网桥接口为两个
var hostA=Host.createNew('A');
var hostB=Host.createNew('B');
var hostC=Host.createNew('C');
var hostD=Host.createNew('D');
var view=View.createNew();
bridgeA.initInterface();
map.registerBridge(bridgeA);
map.registerHost(hostA);
map.registerHost(hostB);
map.registerHost(hostC);
map.registerHost(hostD);
hostA.linkBridge(bridgeA.id,1,map);
hostB.linkBridge(bridgeA.id,1,map);
hostC.linkBridge(bridgeA.id,2,map);
hostD.linkBridge(bridgeA.id,2,map);
console.log('主机表',map.hostMap);
console.log('网桥表',map.bridgeMap);
console.log('连接表',map.getConnMap());
for(var i in map.hostMap){
    hostA.sendFrame('主机(mac:'+hostA.mac+')发的消息',i);
    hostB.sendFrame('主机(mac:'+hostB.mac+')发的消息',i);
}
bridgeA.receiveFrame(1);
for(i in map.hostMap){
    map.hostMap[i].receiveFrame();
}
Net.flush();
for(i in map.hostMap){
    hostC.sendFrame('主机(mac:'+hostC.mac+')发的消息',i);
    hostD.sendFrame('主机(mac:'+hostD.mac+')发的消息',i)
}
bridgeA.receiveFrame(2);
for(i in map.hostMap){
    map.hostMap[i].receiveFrame();
}
Net.flush();
for(var i in map.hostMap){
    hostC.sendFrame('主机(mac:'+hostC.mac+')发的消息',i);
}
bridgeA.receiveFrame(2);
for(i in map.hostMap){
    map.hostMap[i].receiveFrame();
}
setTimeout(function () {
    view.init();
    view.container.style.backgroundColor='black';
});