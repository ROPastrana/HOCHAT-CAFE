// ========== HOCHAT CAFÉ MENU ==========
// This is the only place menu items and prices are stored.
// Every menu page, the item page, and the cart read from this list.
//
// To change a price, edit "price".
// To add an item, copy a line and give it a new, unique "id".
// "description" is optional. If you add one, it appears on the item page.

const IMG = 'HOTCHAT CAFE/WEB IMAGES/';

const MENU = [
    {
        id: 'meals',
        code: 'MEALS',
        title: 'Meals',
        page: 'MealsMenuPage.html',
        image: IMG + 'cat-meals.webp',
        items: [
            { id: 'chicken-bulgogi', name: 'Chicken Bulgogi', price: 105, image: IMG + 'chicken-bulgogi.webp' },
            { id: 'korean-bowl', name: 'Korean Bowl', price: 125, image: IMG + 'korean-bowl.webp' },
            { id: 'chicken-bulgogi-overload', name: 'Chicken Bulgogi Overload', price: 155, image: IMG + 'chicken-bulgogi-overload.webp' },
            { id: 'katsu-ala-king', name: 'Katsu Ala King', price: 199, image: IMG + 'katsu-ala-king.webp' },
            { id: 'katsu-curry', name: 'Katsu Curry', price: 225, image: IMG + 'katsu-curry.webp' }
        ]
    },
    {
        id: 'silog',
        code: 'SILOG',
        title: 'Silog Specials',
        page: 'SilogMenuPage.html',
        image: IMG + 'cat-silog.webp',
        items: [
            { id: 'tocilog', name: 'Tocilog', price: 65, image: IMG + 'tocilog.webp' },
            { id: 'korean-strips-silog', name: 'Korean Strips Silog', price: 85, image: IMG + 'korean-strips-silog.webp' },
            { id: 'sisig-silog', name: 'Sisig Silog', price: 85, image: IMG + 'sisig-silog.webp' },
            { id: 'tapsilog', name: 'Tapsilog', price: 85, image: IMG + 'tapsilog.webp' },
            { id: 'mixsilog', name: 'Mixsilog', price: 99, image: IMG + 'mixsilog.webp' }
        ]
    },
    {
        id: 'snacks',
        code: 'SNACKS',
        title: 'Snacks',
        page: 'SnacksMenuPage.html',
        image: IMG + 'cat-snacks.webp',
        items: [
            { id: 'fries', name: 'Fries', price: 65, image: IMG + 'fries.webp' },
            { id: 'hochat-de-nachos', name: 'Hochat de Nachos', price: 99, image: IMG + 'hochat-de-nachos.webp' },
            { id: 'sisig-cones', name: 'Sisig Cones', price: 105, image: IMG + 'sisig-cones.webp', description: 'Our signature Sisig Cones are a crispy, savory street-food masterpiece, finished with a light, zesty foam.' },
            { id: 'katsu-burger', name: 'Katsu Burger', price: 199, image: IMG + 'katsu-burger.webp' },
            { id: 'katsu-burger-overload', name: 'Katsu Burger Overload', price: 225, image: IMG + 'katsu-burger-overload.webp' }
        ]
    },
    {
        id: 'bilao',
        code: 'BILAO MEALS',
        title: 'Bilao Specials',
        page: 'BilaoMealsMenuPage.html',
        image: IMG + 'cat-bilao.webp',
        items: [
            { id: 'pancit-sisig-guisado', name: 'Pancit Sisig/Guisado', price: 675, image: IMG + 'pancit.webp' },
            { id: 'dads-platter', name: "Dad's Platter", price: 875, image: IMG + 'dads-platter.webp' },
            { id: 'k-platter', name: 'K-Platter', price: 875, image: IMG + 'k-platter.webp' },
            { id: 'hochat-carbonara', name: 'Hochat Carbonara', price: 875, image: IMG + 'hochat-carbonara.webp' },
            { id: 'wings-platter', name: 'Wings Platter', price: 875, image: IMG + 'wings-platter.webp' }
        ]
    },
    {
        id: 'drinks',
        code: 'DRINKS',
        title: 'Drinks',
        page: 'DrinksMenuPage.html',
        image: IMG + 'cat-drinks.webp',
        items: [
            { id: 'thirst-quenchers', name: 'Thirst Quenchers', price: 45, image: IMG + 'thirst-quenchers.webp' },
            { id: 'caramel-macchiato', name: 'Caramel Macchiato', price: 69, image: IMG + 'caramel-macchiato.webp' }
        ]
    },
    {
        id: 'desserts',
        code: 'DESSERTS',
        title: 'Desserts',
        page: 'DessertsMenuPage.html',
        image: IMG + 'cat-desserts.webp',
        items: [
            { id: 'strawberry-cream-o-halo-halo', name: 'Strawberry Cream-o Halo-Halo', price: 59, image: IMG + 'strawberry-halo-halo.webp' },
            { id: 'banoffee', name: 'Banoffee', price: 129, image: IMG + 'banoffee.webp', description: 'Our signature dessert is pure caramel indulgence, offering a smooth and deeply satisfying sweet escape.' },
            { id: 'tiramisu', name: 'Tiramisu', price: 129, image: IMG + 'tiramisu.webp' },
            { id: 'graham-de-leche', name: 'Graham De Leche', price: 149, image: IMG + 'graham-de-leche.webp' },
            { id: 'graham-biscoff', name: 'Graham Biscoff', price: 149, image: IMG + 'graham-biscoff.webp' }
        ]
    }
];
