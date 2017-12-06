var View={
    createNew:function () {
     var view={};
     view.container;
     view.init=function () {
       setTimeout(function () {
           var body=document.body;
           view.container=body;
       },0);
     };
     return view;
    }
};