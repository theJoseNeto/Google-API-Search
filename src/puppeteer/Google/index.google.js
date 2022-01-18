const res = require('express/lib/response');
const APIError = require('../../errors/Error');
const Browser = require('../browser/index.browser');

class Search extends Browser {
    // async handleMessage(message){
    //    if(typeof message == String){
    //        return
    //    }

    // }
    async search(text){
        await this.writeTextOnInput(text);
        await this.clickInSearchButton();
    }

    async writeTextOnInput(text){
        await this.page.evaluate((value) => {
            const input = document.querySelector("input[name='q']");
            input.value = value;
            
        }, text).catch(e => {
            this.browser.close()   
            throw new APIError("WriteInputError", e);
        })
        
    }

    async clickInSearchButton() {

        await this.page.evaluate(() => {
            const searchButton = document.querySelector('input[value="Pesquisa Google"]');
            searchButton.click()
        })

        .catch(e => {
            this.browser.close();
            throw new APIError('Erro ao tentar pesquisar', e);
            });

        await this.page.waitForTimeout(10000);

    }

    async getBestLink() {

        let result;

        await this.page.evaluate(() => {
                const links = [];

                const searchResult = document.querySelectorAll('div.yuRUbf a')
                for (let i of searchResult) links.push(
                    i.href);
                return links;
            })

            .then(links => result = links)

            .catch(e => {
                result = new APIError("linkNotFoundError", e);
                this.browser.close();
            });

        return result;

    }

}

module.exports = Search