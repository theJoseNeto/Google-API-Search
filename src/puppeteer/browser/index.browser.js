const ppt = require('puppeteer');

class Browser {
    constructor(){
        this.browser = null;
        this.page = null;
    }

    async launchBrowser(){
        
        this.browser = await ppt.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']})
    }

    async newPage(url){
        this.page = await this.browser.newPage()
        await this.page.goto(url)
    }
}

module.exports = Browser;
