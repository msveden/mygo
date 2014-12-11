
define([], function() {

    function registerActionListener(mygo, element, action) {
        element.addEventListener('mousedown', function(e) {
            e.preventDefault();
            mygo.trigger(action);
            // console.log(window.getSelection().getRangeAt(0).startContainer);
        });
    }


    function Toolbar(mygo, toolbarElement) {
        
        var elements = toolbarElement.querySelectorAll('button, a, div, span');
        for (var i = 0, len = elements.length; i < len; i++) {
            console.log(elements[i]);
            registerActionListener(mygo, elements[i], elements[i].className);
        }
    }

    return Toolbar;
});