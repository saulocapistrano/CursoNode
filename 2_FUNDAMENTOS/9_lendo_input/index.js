const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("Qual sua linguagem preferida", (language) =>{
    
   if(language == "Java"){
    console.log(`${language} é a melhor, você vai ficar rico`)
   }else{
    console.log(`A minha linguagem preferida é: ${language}`)
   }

    readline.close()
})