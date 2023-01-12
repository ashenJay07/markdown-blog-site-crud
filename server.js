const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://localhost/blog')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error(err));

// Setting up View Engine
app.set('view engine', 'ejs'); // Convert 'ejs' code to 'html'

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Create main route
app.get('/', async (req, res) => {
  //   res.send('Hello World'); // send() used to send 'Words' as a response

  const articles = await Article.find().sort({ createdAt: 'desc' });

  res.render('articles/index', { articles: articles }); // render() used to render html page as a resoponse
  // object එකක් use කරලා 'index.ejs' file එකට data pass කරන්න පුලුවන්
});

// routes exported by articles.js are depend on '/articles' path
app.use('/articles', articleRouter);

app.listen(5000);
