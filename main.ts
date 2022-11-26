import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as lodash from 'lodash';
import * as readline from 'readline-sync';
import axios from 'axios'

function randNumber(first:number, second:number) {
    return lodash.random(first, second);
}

function genDate(start: number, end:number) {
    let date:String[];
    let ano = randNumber(start, end);
    do {
        date = `${randNumber(1, 30)}/${randNumber(1, 12)}/${ano}`.split('/')
    } while(date[0] > '28' && date[1] === '2');

    for(let i=0; i<date.length; i++) {
        if(date[i].length === 1) {
            date[i] = `0${date[i]}`
        }
    }

    return date.join('/');
}

interface Produto {
    nome: string;
    valor: number; 
    custoProducao: number;
}

enum TipoPessoa {
    "Fisica",
    "Juridica"
}

interface Venda {
    id: number;
    numeroNotaFiscal: String;
    quantidadeProduto: number;
    valorFrete: number;
    totalCompra: number;
    data: String;
    produto: String;
    valorUnitario: number;
    custoProducao: number;
    dataNascimento: String;
    cidade: String;
    estado: String;
    pais: String;
    tipoPessoa: TipoPessoa
}

interface Localidade {
    cidade: String;
    estado: String;
    pais: String;
}

function csvGen(counter:number) {
    let csvArr:Object[] = [];

    const listaProdutos: Array<Produto> = [
        {nome: "ÓCULOS", valor: 130, custoProducao: 50},
        {nome: "PLANO DE FEATURES", valor: 129, custoProducao: 30},
        {nome: "PLANO DE GARANTIA", valor: 129, custoProducao: 19},
        {nome: "SOFTWARE MAPPING", valor: 129, custoProducao: 90},
        {nome: "API", valor: 129, custoProducao: 49},
    ];
    const listaUnidades: Array<string> = ["Paulista", "Jardins"];

    const listaTipoPessoa: Array<TipoPessoa> = [TipoPessoa.Fisica, TipoPessoa.Juridica];

    let aux:number = 1;
    while(aux < counter) {
        const codNf:number = randNumber(10000, 99999);
        const produto: Produto = listaProdutos[randNumber(0, listaUnidades.length - 1)]
        const cliente:number = randNumber(1, 99999);

        let quantidadeProduto = randNumber(1, 10);
        let valorFrete = parseFloat(faker.commerce.price(5, 50, 2));

        const data:Venda = ({
            id: aux,
            numeroNotaFiscal: (aux + 1000000000).toString(),
            quantidadeProduto: quantidadeProduto,
            valorFrete: valorFrete,
            totalCompra: (quantidadeProduto * produto.valor) + valorFrete,
            data: genDate(2015, 2022),
            produto: produto.nome,
            valorUnitario: produto.valor,
            custoProducao: produto.custoProducao,
            dataNascimento: genDate(1960, 2003),
            cidade: "Cidade",
            estado: "Estado",
            pais: "Pais",
            tipoPessoa: listaTipoPessoa[randNumber(0, 1)]          
        });

        if(aux === 1) {
            const headers:String[] = Object.keys(data);
            csvArr.push(headers.join(','));
        }
        const values:String = Object.values(data).join(',');
        csvArr.push(values)

        aux++;
    }

    return csvArr.join('\n');
}

console.log('Número de linhas?');
const counter:number = parseInt(readline.question());
const data = csvGen(counter);
fs.writeFileSync('./data.csv', data);
