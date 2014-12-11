require([
    'mygo',
    'mygo-toolbar'
], function(MyGo, MyGoToolbar){
    console.log('main begins');
    var element = document.querySelector(".editor");
    var mygo = new MyGo(element);
    var toolbarElement = document.querySelector(".toolbar");
    var toolbar = new MyGoToolbar(mygo, toolbarElement);
    
    console.log('main ends');
});