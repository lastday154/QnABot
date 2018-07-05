var Page = require('../page')
module.exports={
    file:async function(test){
        try {
            var page=this.page
            await page.goToImport()
            await page.importFile(`${__dirname}/../../../documents/zombie.json`)
            await page.goToEdit()
            var ids=await page.listQA()
            test.equal(ids.value.length,3) 
            
            await page.deleteAll()
            
            var ids2=await page.listQA()
            test.equal(ids2.value.length,0) 
            test.done()
        }catch(e){ 
            test.ifError(e)
            test.done()
        }
    },
    url:async function(test){
        try {
            var page=this.page
            await page.goToImport()
            await page.importUrl("${__dirname}/../../../documents/blog-samples.json")
            await page.goToEdit()
            var ids=await page.listQA()
            test.equal(ids.value.length,8) 
            
            await page.deleteAll()
            
            var ids2=await page.listQA()
            test.equal(ids2.value.length,0) 
            test.done()
        }catch(e){ 
            test.ifError(e)
            test.done()
        }
    },
    examples:async function(test){
        try {
            var page=this.page
            await page.goToImport()
            await page.importExample("zombie")
            await page.goToEdit()
            var ids=await page.listQA()
            test.equal(ids.value.length,3) 
            
            await page.deleteAll()
            
            var ids2=await page.listQA()
            test.equal(ids2.value.length,0) 
            test.done()
        }catch(e){ 
            test.ifError(e)
            test.done()
        }
        test.done()
    }
}
        
