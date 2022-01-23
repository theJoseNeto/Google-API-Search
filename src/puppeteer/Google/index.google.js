const Browser = require('../browser/index.browser');

class Search extends Browser {
   
    async search(text){

        await this.writeTextOnInput(text);
        await this.clickInSearchButton();

    }

    async writeTextOnInput(text){
        const input = await this.page.$("input[name='q']");
        await input.type(text);
    }

    async clickInSearchButton() {
        const searchButton = 
        await this.page.$eval('input[value="Pesquisa Google"]', button=>{
            button.click();
        });

        await this.page.waitForTimeout(10000);
    }
    
    async getBestLink() {
        const allResults = await this.page.$$eval('div.yuRUbf a', bestLinks => {
            let results = [];
            bestLinks.map( link => results.push(link.href));
            return results;
        });

        return allResults;
}
}

module.exports = Search
