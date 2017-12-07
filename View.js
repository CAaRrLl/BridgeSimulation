var View={
    createNew:function () {
     var view={};
     view.container;
     view.init=function () {
         var body=document.body;
         view.container=body;
     };
     return view;
    }
};