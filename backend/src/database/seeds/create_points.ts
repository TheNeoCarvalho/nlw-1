import Knex from 'knex'
export async function seed(knex: Knex){
    await knex('points').insert([
        {
            name: 'Ponto Teste Um', 
            image: 'lampadas.svg', 
            email:'manoel@gmail.com',
            whatsapp: '88999689957',
            latitude: 2312312323,
            longitude: 23123123,
            city: 'Icó',
            uf: 'CE' 
        },
        {
            name: 'Ponto Teste Dois', 
            image: 'lampadas.svg', 
            email:'maria@gmail.com',
            whatsapp: '8899999999',
            latitude: 2312312323,
            longitude: 23123123,
            city: 'Pereiro',
            uf: 'CE' 
        },
    ])
}