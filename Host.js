/*
主机类，创建实例时需要确定mac地址和接入的网桥接口i
 */
var Host={
  createNew:function (mac) {
      var host={};
      var conn={
          /*
          连接的网桥唯一标识
          */
          id:'',
          /*
          连接的网桥接口
           */
          interface:0,
          /*
          status=0:未接上网桥;status=1:接上网桥
           */
          status:0
      };
      host.type='Host';
      /*
      主机的mac地址
       */
      host.mac=mac;
      /*
      模拟封装成帧,并发送到对应网段
       */
      host.sendFrame=function (content,remoteMac) {
          var frame={
              mac:host.mac,
              content:content,
              remoteMac:remoteMac
          };
          Net.write(conn.interface,frame,'Host');
          console.log('主机',host.mac,'(连接网段'+conn.interface+')发送帧',frame);
      };
      /*
      接收帧，若帧是发给自己的则收下
       */
      host.receiveFrame=function () {
          /*
          读取对应网段的数据帧
           */
          var frames=Net.read(conn.interface);
          /*
          读取失败
           */
          if(!frames) return;
          // console.log('frames',frames);
          for(var i=0;i<frames.length;i++){
              console.log('主机',host.mac,'收到帧:',frames[i]);
              if(frames[i].remoteMac!==host.mac){
                  console.log('主机',host.mac,'丢弃该帧');
                  continue;
              }
              console.log('主机',host.mac,'接收该帧');
          }
      };
      /*
      连接到网桥
       */
      host.linkBridge=function (id,interface,map) {
          if(map.type!=='Map') return;
          if(!map.getConnMap()[id].hasOwnProperty(interface)){
              console.log('错误！网桥(id',id,')不存在接口',interface);
              return;
          }
          conn.id=id;
          conn.interface=interface;
          /*
          添加连接信息
           */
          map.addLink(id,interface,host.mac);
          console.log('主机(mac:',host.mac,')连接到网桥(id:',id,')接口:',interface);
      };
      /*
      获取连接信息
       */
      host.getConn=function () {
        return conn;
      };
      return host;
  }
};