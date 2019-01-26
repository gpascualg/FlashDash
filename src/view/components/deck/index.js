import './style.scss';
import { onEndTransition } from '../helper';
import classNames from 'classnames';


export default function() {

    let id = null;
    let name = null;
    let image = null;

    function goto(e) {
        // Make it spin
        let el = e.target.parentElement;
        // el.style.transform = 'rotateY(180deg)';

        // Make it fade
        let container = document.getElementsByClassName('container')[0];
        container.className = classNames('container', 'exit');

        setTimeout(() => {
            container.className = classNames('container', 'fancy');
            m.route.set('/deck/' + el.id);
        }, 100);
    }    

    return {
        oninit: function(vnode) {
            id = vnode.attrs.id;
            name = vnode.attrs.name;
            image = vnode.attrs.image;
        },
        view: function() {
            return (
                <div className='p-2 deck' id={ id } onclick={ (e) => goto(e) }>
                    <span>{ name }</span>
                    <img src={ image }></img>
                </div>
            );
        },
    };
}