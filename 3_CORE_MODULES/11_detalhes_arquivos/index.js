const fs = require("fs")

fs.stat('novoarquivo.txt', (err, Stats) =>{
    if(err){
        console.log(err)
    return
    }
    
    console.log(Stats.isFile())
    console.log(Stats.isDirectory())
    console.log(Stats.isSymbolicLink())
    console.log(Stats.ctime)
    console.log(Stats.size)
})