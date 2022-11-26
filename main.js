"use strict";
exports.__esModule = true;
var faker_1 = require("@faker-js/faker");
var fs = require("fs");
var lodash = require("lodash");
var readline = require("readline-sync");
function randNumber(first, second) {
    return lodash.random(first, second);
}
function genDate() {
    var date;
    do {
        date = "".concat(randNumber(1, 30), "/").concat(randNumber(1, 12), "/2022").split('/');
    } while (date[0] > '28' && date[1] === '2');
    for (var i = 0; i < date.length; i++) {
        if (date[i].length === 1) {
            date[i] = "0".concat(date[i]);
        }
    }
    return date.join('/');
}
function csvGen(counter) {
    var csvArr = [];
    var listaProdutos = [
        { codigo: randNumber(1, 3000), nome: "nome1", descricao: "descricao produto 1" },
        { codigo: randNumber(1, 3000), nome: "nome2", descricao: "descricao produto 2" },
    ];
    var listaUnidades = ["Paulista", "Jardins"];
    var aux = 1;
    while (aux < counter) {
        var codNf = randNumber(10000, 99999);
        var codLoja = randNumber(1, 15);
        var produto = listaProdutos[randNumber(0, listaUnidades.length - 1)];
        var unLoja = listaUnidades[randNumber(0, listaUnidades.length - 1)];
        var dataNf = genDate();
        var cliente = randNumber(1, 99999);
        for (var j = 0; j <= randNumber(1, 5); j++) {
            var data_1 = ({
                codigo: aux,
                codigoNotaFiscal: codNf,
                codigoLoja: codLoja,
                unidadeLoja: unLoja,
                codigoProduto: produto.codigo,
                nomeProduto: produto.nome,
                descricaoProduto: "\"".concat(produto.descricao, "\""),
                quantidade: randNumber(1, 5),
                valorUnitario: faker_1.faker.commerce.price(5, 50, 2, 'R$'),
                data: dataNf,
                codigoCliente: cliente
            });
            if (aux === 1) {
                var headers = Object.keys(data_1);
                csvArr.push(headers.join(','));
            }
            var values = Object.values(data_1).join(',');
            csvArr.push(values);
            aux++;
        }
    }
    return csvArr.join('\n');
}
console.log('Número de linhas?');
var counter = parseInt(readline.question());
var data = csvGen(counter);
fs.writeFileSync('./data.csv', data);
