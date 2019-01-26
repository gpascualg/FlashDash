import Deck from '../components/deck/index';

export default function() {
    var decks = [];

    return {
        oninit(vnode) {
            decks = vnode.attrs.decks;
        },
        view() {
            return (
                <div className="d-flex flex-wrap justify-content-center">
                    { decks.map((deck) => <Deck key={ deck.id } id={ deck.id } name={ deck.name } image={ deck.image } />) }
                </div>
            );
        },
    };
}