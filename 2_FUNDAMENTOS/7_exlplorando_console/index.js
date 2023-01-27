// mais de um valor 
const x = 10
const y = "Saulo"
const z = [1,2]

console.log(x,y,z)

// contagem de impressões
console.count(`O valor de x é: ${x}, contagem: `)
console.count(`O valor de x é: ${x}, contagem: `)
console.count(`O valor de x é: ${x}, contagem: `)
console.count(`O valor de x é: ${x}, contagem: `)
console.count(`O valor de x é: ${x}, contagem: `)

// variável entre string
console.log("O nome é %s, ele é programador", y, " ganha $R15.000,00 por mês")
// limpar o console 
setTimeout(()=>{
    console.clear()
}, 2000)