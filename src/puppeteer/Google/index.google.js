const res = require('express/lib/response');
const APIError = require('../../errors/Error');
const Browser = require('../browser/index.browser');

class Search extends Browser {

    async search(text){
        console.log('Pesquisando.');   
        await this.writeTextOnInput(text);
        await this.clickInSearchButton();
    }

    async writeTextOnInput(text){
        console.log('Escrevendo no input');

        await this.page.evaluate((value) => {
            const input = document.querySelector("input[name='q']");
            input.value = value;
            
        }, text).catch(e => {
            this.browser.close()   
            throw new Error("Erro ao digitar no input");
        })
        
    }

    async clickInSearchButton() {
        console.log("clicou no botão de pesquisa")

        await this.page.evaluate(() => {
            const searchButton = document.querySelector('input[value="Pesquisa Google"]');
            searchButton.click()
        })

        .catch(e => {
            this.browser.close();            
            throw new Error('Erro ao tentar pesquisar');
            });

        await this.page.waitForTimeout(10000);

    }

    async getBestLink() {
        console.log("pegando os links");
        
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
                result = new Error("linkNotFoundError");
                this.browser.close();
            });

        return result;

    }

}

module.exports = Search