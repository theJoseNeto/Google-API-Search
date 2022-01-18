const Browser = require('../browser/index.browser')

class Search extends Browser {
    // async handleMessage(message){
    //    if(typeof message == String){
    //        return
    //    }

    // }

    async search(text) {

        this.page.on('load', async () => {

            await this.page.evaluate((value) => {

                    const input = document.querySelector("input[name='q']");
                    input.value = value;
                    const searchButton = document.querySelector('input[value="Pesquisa Google"]');
                    searchButton.click()

                }, text)

                .catch(e => console.log('Erro ao fazer pesquisa'));
        });

        await this.page.waitForTimeout(10000);

    }

    async getBestLink() {

        let result;

        let pageLoaed = await this.page.on('load', loaded => loaded ? true : false);

        if (pageLoaed) {
            result = await this.page.evaluate(() => {
                const links = [];
                const searchResult = document.querySelectorAll('div.yuRUbf a')
                for (let i of searchResult) links.push(i.href);
                return links;
            });

        } else {

            result = "Erro ao tentar pesquisar"
        }

        return result;

    }

}

module.exports = Search