import './style.scss';

export default function() {

    let id = null;
    let name = null;
    let image = null;

    function goto(e) {
        m.route.set('/deck/' + e.target.parentElement.id);
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