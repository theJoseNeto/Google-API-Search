import puppeteer from 'puppeteer'

(async ()=>{
    
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://google.com/')

    await page.waitForSelector("input[name='q']")

    await page.evaluate(()=>{
        const input = document.querySelector("input[name='q']");
        input.value = "typeerror javascript"
})

await page.evaluate(()=>{
    const searchButton = document.querySelector('input[value="Pesquisa Google"]')
    searchButton.click()
    
})

    await page.evaluate(()=>{
        const results = document.querySelectorAll("yuRUbf")
        console.log(results)
    })

    await page.waitForTimeout(10000)
    
    await page.evaluate(()=>{
        let lista = []
        const links = document.querySelectorAll('div.yuRUbf a')
        
        for(let i of links){
            lista.push(i.href)
        }
        return lista
    }).then( res =>{
        console.log(res);
    })

})()