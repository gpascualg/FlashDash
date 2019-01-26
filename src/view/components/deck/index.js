import './style.scss';
import { onEndTransition, route } from '../helper';


export default function() {

    let id = null;
    let name = null;
    let image = null;

    function getpage(e) {
        route('/deck/' + e.target.parentElement.id);
    } 

    return {
        oninit: function(vnode) {
            id = vnode.attrs.id;
            name = vnode.attrs.name;
            image = vnode.attrs.image;
        },
        view: function() {
            return (
                <div className='p-2 deck' id={ id } onclick={ (e) => getpage(e) }>
                    <span>{ name }</span>
                    <img src={ image }></img>
                </div>
            );
        },
    };
}