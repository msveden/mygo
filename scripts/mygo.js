
define(['rangy-core'], function(rangy) {

    console.log(rangy);
    var element;
    
    function onKey(e) {
        
        if (matchesCmd(e)) {
            e.preventDefault();
        }
        else if (isEnterKey(e)) {
            //e.preventDefault();    
        }     
        logCurrentElement();
    }

    function isEnterKey(e) {
        return e.which == 13;
    }

    function matchesCmd(e) {              
      return e.ctrlKey && 
        (
            e.which == 86 // v
        ); 
    }

    function onInput(event) {
        console.log('onInput');
    }

    function logCurrentElement() {
        var range = getFirstRange();
        console.log(range);
    }

    // From: http://stackoverflow.com/a/8491664
    function setCaretCharIndex(containerEl, index) {
        var charIndex = 0, stop = {};

        function traverseNodes(node) {
            if (node.nodeType == 3) {
                var nextCharIndex = charIndex + node.length;
                if (index >= charIndex && index <= nextCharIndex) {
                    rangy.getSelection().collapse(node, index - charIndex);
                    throw stop;
                }
                charIndex = nextCharIndex;
            }
            // Count an empty element as a single character. The list below may not be exhaustive.
            else if (node.nodeType == 1
                     && /^(input|br|img|col|area|link|meta|link|param|base)$/i.test(node.nodeName)) {
                charIndex += 1;
            } else {
                var child = node.firstChild;
                while (child) {
                    traverseNodes(child);
                    child = child.nextSibling;
                }
            }
        }

        try {
            traverseNodes(containerEl);
        } catch (ex) {
            if (ex != stop) {
                throw ex;
            }
        }
    }

    function getFirstRange() {
        var sel = rangy.getSelection();
        return sel.rangeCount ? sel.getRangeAt(0) : null;
    }

    // function insertNodeAtCaret(node) {
    //     var sel = rangy.getSelection();
    //     if (sel.rangeCount) {
    //         var range = sel.getRangeAt(0);
    //         range.collapse(false);
    //         range.insertNode(node);
    //         range.collapseAfter(node);
    //         sel.setSingleRange(range);
    //     }
    // }
    function insertNodeAtCaret(node) {
        var sel = rangy.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0);
            range.collapse(false);
            range.insertNode(node);
            range.collapseAfter(node);
            sel.setSingleRange(range);
            
            //range.selectNodeContents(node);
            range = getFirstRange();
            console.log(range);
            console.log(range.endContainer.nextSibling);
            setCaretCharIndex(node, 0);
            /*
            node.setAttribute('id', 'inserted');
            // node.innerHTML = 'b';
            var startNode = document.getElementById('inserted');
            range.setStartAfter(startNode);
            range.setEndAfter(startNode);
            sel.removeAllRanges();
            sel.addRange(range);
            //node.innerHTML = '';
            */
        }
    }

    function MyGo(editorElement) {
        element = editorElement;
        element.addEventListener('input', onInput);
        element.addEventListener('keydown', onKey);
        
        rangy.init();
        // console.log(rangy);        
        // range.setNodeContents(element);

        this.test = function() {
            console.log('MyGo.test()');
        };

        this.trigger = function(action) {
            console.log('trigger(' + action + ')');
            console.log(getFirstRange());
            if (action.indexOf('bold') > -1) {
                var node = document.createElement('strong');
                insertNodeAtCaret(node);
            }
        };
    }

    return MyGo;
});