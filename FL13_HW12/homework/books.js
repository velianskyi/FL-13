let data = [
    {
        id: 0,
        name: `JavaScript and Jquery: The Missing Manual`,
        author: `David Sawyer McFarland`,
        url: `https://images-na.ssl-images-amazon.com/images/I/51OZ5LGSO9L._SX379_BO1,204,203,200_.jpg`,
        plot: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
ut labore et dolore magna aliqua. Non diam phasellus vestibulum lorem sed risus.`
    },
    {
        id: 1,
        name: `You Don't Know JS Yet: Scope & Closures`,
        author: `Kyle Simpson`,
        url: `https://d2sofvawe08yqg.cloudfront.net/ydkjsy-scope-closures/hero2x?1583299851`,
        plot: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
ut labore et dolore magna aliqua. Non diam phasellus vestibulum lorem sed risus.`
    },
    {
        id: 2,
        name: `React: Up & Running: Building Web Applications`,
        author: `Stoyan Stefanov`,
        url: `https://i2.wp.com/www.programmer-books.com/wp-content/uploads/2018/06/cover.jpg?resize=780%2C1024&ssl=1`,
        plot: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
ut labore et dolore magna aliqua. Non diam phasellus vestibulum lorem sed risus.`
    }
];

if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify(data))
}