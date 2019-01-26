import Card from '../components/card/index';

export default function() {
    var cards = [];

    return {
        oninit(vnode) {
            cards = vnode.attrs.cards;
        },
        view() {
            return (
                <div className="d-flex flex-column flex-wrap justify-content-center">
                    { cards.map((card) => <Card key={ card.id } id={ card.id } front={ card.front } back={ card.back } />) }
                </div>
            );
        },
    };
}