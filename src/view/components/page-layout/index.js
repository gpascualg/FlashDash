import './styles.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * A component that wraps another component with some common
 * page layout markup and styles.
 */
export default function() {
    var isMenuOpen = false;
    var isTransitionInCourse = false;

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
    
    function handleMenu()
    {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen)
        {
            isTransitionInCourse = true;
        }
            
        let page = document.getElementsByClassName('page')[0];
        if (isMenuOpen) {
            page.style.transform = 'translate3d(0, 30vh, ' + parseInt(-100) + 'px)';
        }
        else {
            page.style.transform = 'translate3d(0, 0, 0)';
        }

        onEndTransition(page, function() {
            isTransitionInCourse = isMenuOpen;
        });
    }
    
    function openPage(e)
    {
        handleMenu();

        let targetPage = e.target.getAttribute('href');
        if (targetPage != m.route.get())
        {
            m.route.set(targetPage);
        }

        e.preventDefault();
    }

    function closeMenu(e)
    {
        if (!isMenuOpen)
        {
            e.redraw = false;
            return;
        }

        handleMenu();
    }

    return {
        view: (vnode) => [
            <nav className={ classNames({'pages-nav': true, 'pages-nav--open': isMenuOpen}) } key='nav'>
                <div className="pages-nav__item"><a className="link link--page" href="/index" onclick={ (e) => openPage(e) }>Home</a></div>
                <div className="pages-nav__item"><a className="link link--page" href="/new" onclick={ (e) => openPage(e) }>New deck</a></div>
                <div className="pages-nav__item"><a className="link link--page" href="/settings" onclick={ (e) => openPage(e) }>Settings</a></div>
            </nav>,

            <div className={ classNames({'pages-stack': true, 'pages-stack--open': isTransitionInCourse}) } key='pages-stack'>
                <div
                    className={ classNames({'page': true, 'page--selectable': isMenuOpen}) }
                    onclick={ (e) => closeMenu(e) }
                    id="page-home" 
                    style='translate3d(0, 0, 0)'>

                    <div className='container'>
                        { vnode.children }
                    </div>
                </div>
            </div>,
            
            <button className={ classNames({'menu-button': true, 'menu-button--open': isMenuOpen }) } key='menu' onclick={ () => handleMenu() }>
                <span>Menu</span>
            </button>,
        ],
    };
}
