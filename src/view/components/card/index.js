import './style.scss';
import 'easymde/dist/easymde.min.css';
import EasyMDE from 'easymde';
import classNames from 'classnames';
import { onEndTransition } from '../helper';


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
    let displayingBoth = false;
    let id = null;
    let front = null;
    let back = null;
    let showingFront = true;

    function reveal(e, vnode)
    {
        if (displayingBoth)
        {
            e.redraw = false;
            return;
        }

        let container = vnode.dom.children[0];
        container.className = classNames({
            'flip-container': true,
            'flip': showingFront
        });

        showingFront = !showingFront;
    }


    return {
        oninit(vnode) {
            id = vnode.attrs.id;
            front = vnode.attrs.front;
            back = vnode.attrs.back;
            displayingBoth = vnode.attrs.display == 'both';
        },
        view(vnode) {
            // Dynamic prop
            displayingBoth = vnode.attrs.display == 'both';

            const flexrow = 'd-flex flex-wrap justify-content-center';

            return (
                <div className={ flexrow } id={ id }>
                    <div class={ classNames({'flip-container': !displayingBoth, 'both': displayingBoth,}) }>
                        <div class={ 'flipper ' + flexrow }>
                            <div className={classNames({
                                'p-2': true,
                                'card': true,
                                'front': true,
                            })} onclick={ (e) => reveal(e, vnode) }>
                                <textarea oncreate={ mdeMe }>{ front }</textarea>
                            </div>
                            <div className={classNames({
                                'p-2': true,
                                'card': true,
                                'back': true,
                            })} onclick={ (e) => reveal(e, vnode) }>
                                <textarea oncreate={ mdeMe }>{ back }</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
    };
}
