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
      模拟封装成帧
       */
      host.makeFrame=function (content,remoteMac) {
          var frame={
              mac:host.mac,
              content:content,
              remoteMac:remoteMac
          };
          return frame;
      };
      /*
      连接到网桥
       */
      host.linkBridge=function (id,interface) {
          conn.id=id;
          conn.interface=interface;
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