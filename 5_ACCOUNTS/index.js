// OBS o inquirer é uma biblioteca, já o prompt é uma função 

// Modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// Módulos internos
const fs = require('fs')
const { get } = require('https')
console.log('Iniciando o Accounts')

// Invocando a função operation 
operation()

// Criando as operações de movimentação de conta
function operation(){
  inquirer.prompt([{
    type:'lit',
    name: 'action',
    message: 'O que você deseja fazer?',
    choices: ['Criar Conta','Consultar Saldo','Depositar','Sacar','Sair'],
  },
])
.then((answer) =>{
    const action = answer['action']

    if(action==='Criar Conta'){
        createAccount()
    }else if(action ==='Depositar'){
        deposit()
    }else if (action ==="Consultar Saldo"){
        getAccountBalance()
    }else if(action ==='Sacar'){
        withdraw()
    }else if(action ==='Sair'){
     console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!')) 
     process.exit() // O process encerra o programa
    }
})
    .catch((err) => console.log(err)) 
}

// Função de criação da conta  
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}
function buildAccount(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para sua conta:'

        
    }
]).then((answer) => {
    const accountName =answer['accountName']
    console.info(accountName)
    if(!fs.existsSync('accounts')){
    fs.mkdirSync('accounts')
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'), 
            )
            buildAccount()
            return
        }
        }
            fs.writeFileSync(
                `accounts/${accountName}.json`, 
                '{"balance": 0}', 
                function(err){
                    console.log(err)
                },
        )


                console.log(chalk.green("Parabéns. Sua conta foi criada com sucesso!"))
                operation()
})
   .catch((err)=> console.log(err)) 
}

// Adicioanndo dinheiro na conta - depósito
function deposit(){
    inquirer.prompt([
    {
        name: 'accountName',
        message: 'Informe um nome para sua conta: '

    }
    ])
    .then((answer)=>{
    const accountName = answer['accountName']
    
    // Verificação da conta se ela existe usando a função checkAccount
    if(!checkAccount(accountName)){
      return deposit()
    }
    
    inquirer.prompt([
    {
        name: 'amount',
        message: 'Informe o valor de depósito:',
    },
    ]).then((answer)=>{
        const amount = answer['amount']
        // Add an amount
        addAmount(accountName, amount)
        operation()
    })
    .catch(err => console.log(err))

    })
    .catch((err) => console.log(err))
}


// Função de validação da conta 
function checkAccount(accountName){

    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('A conta informada nao existe, verifique novamente.'))
        return false
    }
    return true
}

// Função para receber o nome de uma conta e o valor de depósito
function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente em alguns instantes!'),
        )
        return deposit()
    }
   accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

   fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err){
        console.log(err)
    },
   )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta.`),
    )
   
}

// Função que acessa o arquivo em JSON para ler o nome da conta
function getAccount(accountName){
const accountJSON  = fs.readFileSync(`accounts/${accountName}.json`,{
    encoding: 'utf8',
    flag: 'r',
})  
return JSON.parse(accountJSON)
}

// Apresentando o saldo da conta 
function  getAccountBalance(){
    inquirer.prompt([
        {
        name:'accountName',
        message: 'Informe o nome da conta que deseja consultar o saldo:'
    }
    ]).then((answer) =>{
        const accountName = answer["accountName"]

        // Verificando se a conta indicada para consulta de saldo existe
        if(!checkAccount(accountName)){
            return getAccountBalance(accountName)
        }

        const accountData = getAccount()

        console.log(
           chalk.bgBlue.black(
          `Olá o saldo da sua conta é R$${accountData.balance}`  
        ),
        )
        operation()
    })
    .catch(err => console.log(err))
}
 
// Movimento de saque na conta do usuário
function withdraw(){
inquirer.prompt([
    {name: 'accountName',
    message:'Qual o nome da sua conta?'

    }
]).then((answer)=> {

const accountName = answer['accountName']

if(!checkAccount(accountName)){
    return withdraw()
}
    inquirer.prompt([
    {
        name: 'amount',
        message: 'Informe o valor de saque.'
    }
    ]).then((answer)=>{
        const amount = answer['amount']
        
        removeAmount(accountName, amount)
       

    }).catch(err =>console.log(err))
})
.catch(err => console.log(err))
}


function removeAmount(accountName, amount){
   const accountData = getAccount(accountName) 

   if(!amount){
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'),
    
    )
   return withdraw()
    }

    if (accountData.balance < amount)  {
    console.log(chalk.bgRed.black('Valor Indisponível'))
    return withdraw()
 }

 accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
 fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData), 
    function(err){
        console.log(err)
    },
 )
 console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta`)
 )
 operation()
}
