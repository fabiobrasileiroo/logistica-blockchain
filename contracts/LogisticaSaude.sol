// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LogisticaSaude {
    struct Produto {
        string nome;
        uint quantidade;
        string localizacao;
        uint timestamp;
    }

    mapping(uint => Produto) public produtos;
    uint public contador = 0;

    event ProdutoRegistrado(
        uint id,
        string nome,
        uint quantidade,
        string localizacao,
        uint timestamp
    );

    function cadastrarProduto(string memory _nome, uint _quantidade, string memory _localizacao) public {
        produtos[contador] = Produto(_nome, _quantidade, _localizacao, block.timestamp);
        emit ProdutoRegistrado(contador, _nome, _quantidade, _localizacao, block.timestamp);
        contador++;
    }

    function visualizarProduto(uint _id) public view returns (string memory, uint, string memory, uint) {
        Produto memory p = produtos[_id];
        return (p.nome, p.quantidade, p.localizacao, p.timestamp);
    }
}
