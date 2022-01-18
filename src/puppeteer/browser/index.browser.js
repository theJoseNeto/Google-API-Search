const ppt = require('puppeteer');

class Browser {
    constructor(){
        this.browser = null;
        this.page = null;
    }

    async launchBrowser(){
        this.browser = await ppt.launch({headless: false, ignoreDefaultArgs: ['--disable-extensions'] })
    }

    async newPage(url){
        this.page = await this.browser.newPage()
        await this.page.goto(url)
    }
}

module.exports = Browser;
