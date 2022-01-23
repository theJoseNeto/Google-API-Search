const {Router} = require('express');

const Search = require('../puppeteer/Google/index.google');
const google = new Search();

const searchRoute = Router()

searchRoute.get("/", (req, res)=>{
    res.send('Para pesquisar alguma coisa digite "/seach/oQueVoceDesejaPesquisar". ');
});

searchRoute.get('/search/:message', async (req, res)=> {
    const searchForThis = String(req.params.message);

    await google.launchBrowser();
    await google.newPage('https://google.com');
    
    await google.search(searchForThis);
    const bestResults = await google.getBestLink()
    res.json({result: bestResults});
    await google.browser.close();
});

module.exports = searchRoute;