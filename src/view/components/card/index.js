import './style.scss';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';


function mdeMe(e)
{
    var editor = new EasyMDE({
        element: e.dom,
        minHeight: '10px',
        toolbar: false,
        status: false,
    });

    editor.togglePreview();
}

export default function() {

    let id = null;
    let front = null;
    let back = null;

    return {
        oninit(vnode) {
            id = vnode.attrs.id;
            front = vnode.attrs.front;
            back = vnode.attrs.back;
        },
        view() {
            return (
                <div className="d-flex flex-wrap justify-content-center">
                    <div className='p-2 card' id={ id }>
                        <textarea oncreate={ mdeMe }>{ front }</textarea>
                    </div>
                    <div className='p-2 card' id={ id }>
                        <textarea oncreate={ mdeMe }>{ back }</textarea>
                    </div>
                </div>
            );
        },
    };
}
