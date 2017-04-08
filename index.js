const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded 
const parser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening at port 3000');
});

class News {
    constructor(id, image, title, description) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.description = description;
    }
}

const n1 = new News(167664819, '01.jpg', 'The Dream Factory (dir cut)', `The Fender Custom Shop has been called nirvana for guitar lovers. This year marks the 30th anniversary of the legendary shop that's built guitars for the likes of Eric Clapton, Johnny Cash, Merle Haggard, The Stones, Jimmy Page, Bob Dylan and more.
From its inception as a "wild experiment" to current world famous status, this short documentary traces the story using never before seen archival imagery and conversations with the eight original master builders.
Special thanks to Fender and all the master builders, past and present, for inviting us into this amazing shop.`);

const n2 = new News(180075890, '02.jpg', 'Nike - Kyle Maynard - Unlimited Will', 'Profile on the mindset of extraordinary athlete, Kyle Maynard, and his determination to surmount any challenge in his path. It’s part of Nike’s “Unlimited” campaign launched during the Rio Olympics.');

const n3 = new News(178735292, '03.jpg', 'Nike - Sister Madonna Buder - Unlimited Youth', 'Profile on the mindset of extraordinary athlete, Kyle Maynard, and his determination to surmount any challenge in his path. It’s part of Nike’s “Unlimited” campaign launched during the Rio Olympics.');

const news = [n1, n2, n3];

app.get('/', (req, res) => res.render('home', news));

app.get('/admin', (req, res) => res.render('admin', news));

app.post('/add', parser, (req, res) => {
    const { title, description, image, video } = req.body;
    news.push(new News(video, image, title, description));
    res.redirect('/admin');
});

app.get('/delete/:index', (req, res) => {
    const index = req.params.id;
    news.splice(index, 1);

    res.redirect('/admin');
});

app.get('/edit/:index', (req, res) => {
    const { index } = req.params;
    const tin = news[index];
    tin.index = index;
    res.render('update', tin);
});

app.post('/edit', (req, res) => {
    const { index, title, description, image, id } = req.body;

    news[index] = new News(id, image, title, description);
    res.redirect('/admin');
});
