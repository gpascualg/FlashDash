import PageLayout from './components/page-layout';

// Secondary components
import Splash from './components/splash-loader/index';
import MaintenancePage from './components/maintenance-layout/index';

// Main pages
import IndexPage from './pages/landing-page';
import CardsPage from './pages/cards-page';


const $root = document.body.querySelector('#root');

let onceDBReady = new Promise((resolve) => {
    var request = indexedDB.open('flashdash', 1);
    
    request.onsuccess = () => {
        resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
        var db = event.target.result;
      
        // Decks table
        var decksStore = db.createObjectStore('decks', { keyPath: 'id' });
        decksStore.createIndex('name', 'name', { unique: false });
        decksStore.createIndex('image', 'image', { unique: false });
      
        // Cards table
        var cardsStore = db.createObjectStore('cards', { keyPath: 'id' });
        cardsStore.createIndex('deckId', 'deckId', { unique: false });
        cardsStore.createIndex('front', 'front', { unique: false });
        cardsStore.createIndex('back', 'back', { unique: false });
      
        cardsStore.transaction.oncomplete = (/* event */) => {
            // DECKS TEST DATA
            var customerObjectStore = db.transaction('decks', 'readwrite').objectStore('decks');
            for (var i in [0, 1, 2, 3, 4, 5]) {
                customerObjectStore.add({
                    id: i, 
                    name: 'NAME ' + i, 
                    image: 'https://e-fisiomedic.com/wp-content/uploads/2013/11/default-placeholder-300x300.png'
                });
            }

            // CARDS TEST DATA
            var customerObjectStore = db.transaction('cards', 'readwrite').objectStore('cards');
            for (var i in [0, 1, 2, 3, 4, 5]) {
                customerObjectStore.add({
                    id: i, 
                    deckId: 0,
                    front: '単語 ' + i, 
                    back: 'たんご ' + i,
                });
            }
        };
    };
});

function cursor(db, table, index_or_where, where) {
    var objectStore = db.transaction(table).objectStore(table);

    if (typeof index_or_where == 'undefined' || typeof where == 'undefined') {
        return objectStore.openCursor(index_or_where);
    }

    return objectStore.index(index_or_where).openCursor(where);
}

function fetch(db, table, index_or_where, where) {
    return new Promise((resolve) => {
        let data = [];

        cursor(db, table, index_or_where, where).onsuccess = (event) => {
            var cursor = event.target.result;
            if (cursor) {
                data.push(cursor.value);
                cursor.continue();
            }
            else {
                resolve(data);
            }
        };
    });
}

function lazyLoad(page, dataLoader) {
    return {
        onmatch(params) {
            // Show Loader until the promise has been resolved or rejected.
            m.render($root, m(PageLayout, m(Splash)));

            return onceDBReady.then((db) => new Promise((resolve/*, reject*/) => {
                dataLoader(resolve, db, params);
            }).catch((/* e */) => {
                // In case of server error we can show the maintenance page.
                return MaintenancePage;
            }));
        },
        render(vnode) {
            if (typeof vnode.tag === MaintenancePage) {
                //If onmatch returns a component or a promise that resolves to a component, comes here.
                return vnode;
            }
            else if (typeof vnode.tag === 'function') {
                return m(PageLayout, m(page, vnode.tag()));
            }

            return m(PageLayout, m(page));
        },
    }
}

const Routes = {
    '/splash': {
        render: function() {
            return m(PageLayout, m(Splash));
        },
    },
    '/index': lazyLoad(IndexPage, (resolve, db) => {
        fetch(db, 'decks').then((data) => {
            resolve(() => {
                return {
                    decks: data,
                };
            });
        });
    }),
    '/deck/:id': lazyLoad(CardsPage, (resolve, db, params) => {
        let id = parseInt(params.id);

        fetch(db, 'cards', 'deckId', IDBKeyRange.only(id)).then((data) => {
            resolve(() => {
                return {
                    cards: data,
                };
            });
        });
    }),
};

const DefaultRoute = '/index';

export { Routes, DefaultRoute };
