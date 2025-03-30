//Classe Funcionario

class Funcionario {
    constructor(nome, idade, cargo, salario ) {
        
        this.name = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario; 
    }

    //Metodos de acesso: SET e GET

    //METODOS GET:

    getNome(){
        return this.nome;
    }

    getIdade(){
        return this.idade;
    }

    getCargo(){
        return this.cargo;
    }

    getSalario(){
        return this.salario;
    }

    //METODOS GET:

    setNome(nome){
        this.nome = nome;
    }

    setIdade(idade){
        this.idade = idade;
    }

    setCargo(cargo){
        this.cargo = cargo;
    }

    setSalario(salario){
        this.salario = salario;
    }

    //METODO TO STRING:
    toString(){
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: R$ ${this.salario}`
    }

}

// Array para armazenar os funcionários
let funcionarios = [];
let indiceEdicao = null; // Guarda o índice do funcionário que está sendo editado

// Captura o formulário
document.getElementById("cadastro-formulario").addEventListener("submit", (event) => {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let cargo = document.getElementById("cargo").value;
    let salario = document.getElementById("salario").value;

    indiceEdicao === null
        ? funcionarios.push(new Funcionario(nome, idade, cargo, salario))
        : (funcionarios[indiceEdicao].setNome(nome),
           funcionarios[indiceEdicao].setIdade(idade),
           funcionarios[indiceEdicao].setCargo(cargo),
           funcionarios[indiceEdicao].setSalario(salario),
           indiceEdicao = null);

    // Limpa os campos do formulário

    atualizarTabela();
    document.getElementById("cadastro-formulario").reset();
});




// Função para atualizar a tabela
const atualizarTabela = () => {
    let tabela = document.getElementById("tabela-funcionarios");
    tabela.innerHTML = "";

    funcionarios.forEach((funcionario, index) => {
        let linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${funcionario.getNome()}</td>
            <td>${funcionario.getIdade()}</td>
            <td>${funcionario.getCargo()}</td>
            <td>R$ ${funcionario.getSalario()}</td>
            <td>
                <button id="editar-${index}">Editar</button>
                <button id="excluir-${index}">Excluir</button>
            </td>
        `;
        tabela.appendChild(linha);

        // Adiciona eventos de clique com funções anônimas
        document.getElementById(`editar-${index}`).addEventListener("click", () => editarFuncionario(index));
        document.getElementById(`excluir-${index}`).addEventListener("click", () => excluirFuncionario(index));
    });
};


// Função para editar um funcionário
const editarFuncionario = (index) => {
    let { nome, idade, cargo, salario } = funcionarios[index];
    document.getElementById("nome").value = nome;
    document.getElementById("idade").value = idade;
    document.getElementById("cargo").value = cargo;
    document.getElementById("salario").value = salario;

    // Guarda o índice do funcionário que está sendo editado

    indiceEdicao = index;
};


// Função para excluir um funcionário
const excluirFuncionario = (index) => (funcionarios.splice(index, 1), atualizarTabela());

// Busca de Funcionários com Arrow Function

const buscarFuncionarioPorNome = (nome) => funcionarios.find((f) => f.getNome() === nome);


//parte 5 usei o gpt

// 1️⃣ Listar todos os funcionários com salário maior que R$ 5000
const funcionariosAltoSalario = () => 
    funcionarios.filter(f => f.getSalario() > 5000).map(f => f.getNome()).join(", ") || "Nenhum";

// 2️⃣ Calcular a média salarial dos funcionários
const calcularMediaSalarial = () => 
    funcionarios.length > 0 
        ? (funcionarios.reduce((soma, f) => soma + parseFloat(f.getSalario()), 0) / funcionarios.length).toFixed(2) 
        : "0.00";

// 3️⃣ Listar apenas os cargos únicos (sem repetição)
const listarCargosUnicos = () => [...new Set(funcionarios.map(f => f.getCargo()))].join(", ") || "Nenhum";

// 4️⃣ Criar uma lista de nomes em maiúsculo
const nomesMaiusculo = () => funcionarios.map(f => f.getNome().toUpperCase()).join(", ") || "Nenhum";

// Atualiza os relatórios no HTML
const gerarRelatorios = () => {
    document.getElementById("salario-alto").textContent = funcionariosAltoSalario();
    document.getElementById("media-salarial").textContent = calcularMediaSalarial();
    document.getElementById("cargos-unicos").textContent = listarCargosUnicos();
    document.getElementById("nomes-maiusculo").textContent = nomesMaiusculo();
};

// Atualiza os relatórios sempre que cadastrar um funcionário
document.getElementById("cadastro-formulario").addEventListener("submit", () => gerarRelatorios());
