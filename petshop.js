
const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json','utf-8');

bancoDados = JSON.parse(bancoDados);

const petshop ={

    atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(bancoDados);
        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8')
    },
    
    listarPet: () => {
  
        bancoDados.pets.forEach( pet => {
    
        let {tutor,contato,nome,tipo,idade,raca,peso,...servicos} = pet
    
        console.log(`\n|Tutor: ${tutor} - Contato: ${contato}|\n - Nome do animal: ${nome}\n - Peso: ${peso} kg\n - Tipo: ${tipo}\n - Idade: ${idade}\n - Raça: ${raca}\n - Serviços: `,servicos)
        
        });
        //Utilizando if itenário
        //for (const pet of bancoDados.pets) {
        //    !pet.vacinado ? console.log(`${pet.nome} não foi vacinado.`) : console.log(`${pet.nome} foi vacinado!`) 
        //}
    },

    buscarPet: (nomePet)=>{
   
        let acharPet = bancoDados.pets.find((pet) => {
            return pet.nome == nomePet
        })
        return acharPet ? console.log(acharPet) : console.log('Pet inexistente')
    },

    filtrarTipoPet: (tipoPet) =>{
        let tipopet = bancoDados.pets.filter((pet) =>{ 
          return pet.tipo == tipoPet
        })
        console.log(tipopet)
    },

    vacinarPet: () => {
   
        bancoDados.pets.forEach(pet => {
            !pet.vacinado == false ? pet.vacinado==true && console.log(`${pet.nome} acabou de ser vacinado`) : console.log(`${pet.nome} já foi vacinado`) 
            
        });
        atualizarBanco();
    },
    
    campanhaVacina: () => {
        console.log("Campanha de vacina 2021");
        console.log("vacinando...");
    
        let petVacinadosCampanha = 0;
    
        bancoDados.pets = bancoDados.pets.map((pet) => {
            if (!pet.vacinado) {
                vacinarPet(pet);
                petVacinadosCampanha++;
            }
    
            return pet;
            atualizarBanco();
        });
    
        
        console.log(`${petVacinadosCampanha} pets foram vaciados nessa campanha!`);
    },

    adicionarPets: (...novosPets) => {
        novosPets.forEach((novoPet) => {
            bancoDados.pets.push(novoPet);
        })
    
        atualizarBanco();
        novosPets.forEach((pet) => {
            console.log(`${pet.nome} foi adicionado com sucesso!`);
        })
    },

    darBanhoPet: pet => {
        pet.servicos.push({
            'nome':'banho',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está de banho tomado!`);
    },
    
    tosarPet: pet => {
        pet.servicos.push({
            'nome':'tosar',
            'data': moment().format('DD-MM-YYYY')
        }) 
        atualizarBanco();
        console.log(`${pet.nome} está com o cabelinho na regua!`)
    },       
    
    apararUnhasPet: pet => {
        pet.servicos.push({
            'nome':'aparar unhas',
            'data': moment().format('DD-MM-YYYY')
        }) 
        atualizarBanco();
        console.log(`${pet.nome} está com as unhas cortadas!`)
    },       
    
    clientePremium: pet => {
    
        let Nservicos = pet.servicos.length;
        
        Nservicos>=5 ? console.log('Você é cliente premium'): console.log(`Faltam ${5-Nservicos} para ser cliente premium! `)
    
    },
    
    atenderClientes: (tipodeservico, pet) => {
    
        console.log(`${pet.tutor} bem vindo!`)
            switch (tipodeservico) {
                case 'banho':
                    darBanhoPet(pet);
                    break;
                case 'tosar':
                    tosarPet(pet);
                     break;
                case 'aparar unhas':
                    apararUnhasPet(pet);
                    break;
                default:
                    console.log('Serviço não disponivel -- Por favor consultar tabela de serviços!');
                    break;
            }
        console.log(`${pet.tutor} obrigado pela preferencia!`)   
    },
    
    contatoTutor: (pet) => {
        let {nome, tutor, contato} = pet;
        
        return `Tutor: ${tutor}
        Contato: ${contato}
        Pet: ${nome}`;
    },
    
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });
        
        console.log(`Pets do tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`)
        })
    }      
}

module.exports = petshop;