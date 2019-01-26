import Card from '../components/card/index';
import classNames from 'classnames';


export default function() {
    var cards = [];
    var displayMode = 'one';

    return {
        oninit(vnode) {
            cards = vnode.attrs.cards;
        },
        view() {
            return [
                <div key='btns'>
                    <span>Display mode: </span>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class={ classNames({'btn': true, 'btn-secondary': true, 'active': displayMode == 'one',}) }>
                            <input type="radio" name="display-mode" id="one" autocomplete="off" onclick={ (e) => displayMode = 'one' } /> One side
                        </label>
                        <label class={ classNames({'btn': true, 'btn-secondary': true, 'active': displayMode == 'both',}) }>
                            <input type="radio" name="display-mode" id="both" autocomplete="off" onclick={ (e) => displayMode = 'both' } /> Both sides
                        </label>
                    </div>
                </div>,
                <div key='cards' className="d-flex flex-column flex-wrap justify-content-center">
                    { cards.map((card) => <Card key={ card.id } id={ card.id } front={ card.front } back={ card.back } display={ displayMode } />) }
                </div>
            ];
        },
    };
}