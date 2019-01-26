function onEndTransition( el, callback ) {
    var i,
        transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
        };

    var transitionEnd = '';
    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            transitionEnd = transitions[i];
            break;
        }
    }

    if (transitionEnd === '') {
        callback();
        return;
    }

    var transitionEndWrap = function(e) {
        callback(); 
        e.target.removeEventListener(e.type, transitionEndWrap);
    };
    el.addEventListener(transitionEnd, transitionEndWrap);
}

export { onEndTransition };
