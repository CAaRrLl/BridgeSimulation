var map=Map.createNew();
var bridgeA=Bridge.createNew(2,100);//网桥接口为两个
var hostA=Host.createNew('11-11-11-11-11-00');
var hostB=Host.createNew('11-11-11-11-11-01');
var hostC=Host.createNew('11-11-11-11-11-02');
var hostD=Host.createNew('11-11-11-11-11-03');
var view=View.createNew();
view.init();
bridgeA.initInterface();
map.registerHost(hostA);
map.registerHost(hostB);
map.registerHost(hostC);
map.registerHost(hostD);
map.registerBridge(bridgeA);
console.log('hostmap',map.hostMap);
console.log('bridgemap',map.bridgeMap);