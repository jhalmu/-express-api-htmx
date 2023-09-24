import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static("public/"));

app.get("/", (req, res) =>
{
    res.render("home", {
        title: "Home from app.js",
    });
});

app.listen(3000);