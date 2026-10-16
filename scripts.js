var tarefas = [
    {
        id: 1,
        texto: "Estudar HTML",
        concluida: false
    }
];

var listaDeTarefas = document.getElementById("lista-tarefas");
var inputTarefa = document.getElementById("input-tarefa");

function salvarTarefasLocalStorage() {
    var tarefasString = JSON.stringify(tarefas);
    
    localStorage.setItem("tarefas", tarefasString)
}

function adicionarTarefa() {
    var texto = inputTarefa.value.trim();

    if(texto === "") {
        alert("DIGITE ALGO NO CAMPO PARA ADICIONAR!!!")
        return;
    }

    if(texto.length <= 3) {
        alert("O TEXTO PRECISA TER MAIS DE 3 CARACTERES!!!");
        return;
    }

    var novaTarefa = {
        id: tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1,
        texto: texto,
        concluida: false 
    }

    tarefas.push(novaTarefa);

    salvarTarefasLocalStorage();

    desenharTarefas();

    inputTarefa.value = "";
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    desenharTarefas();
    salvarTarefasLocalStorage();
}

function alternarTarefa(id) {
    var index;
    for (var i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === id) {
            index = i;
        }
    }

    if (index !== undefined) {
        tarefas[index].concluida = !tarefas[index].concluida;
        desenharTarefas();
    }
    salvarTarefasLocalStorage();
}

function desenharTarefas() {
    listaDeTarefas.innerHTML = "";

    for (var i = 0; i < tarefas.length; i++) {
        var icone = tarefas[i].concluida === true ? "radio_button_checked" : "radio_button_unchecked";
        var classes = tarefas[i].concluida ? "tarefa tarefa-concluida" : "tarefa"
        listaDeTarefas.innerHTML += `
            <li class="${classes}">
                <button class="botao-check" onclick="alternarTarefa(${tarefas[i].id})">
                    <span class="material-symbols-outlined">
                        ${icone}
                    </span>
                </button>
                
                <span class="tarefa-texto">
                    ${tarefas[i].texto}
                </span>

                <button class="botao-excluir" onclick="excluirTarefa(${tarefas[i].id})">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </li>
        `;
    }
}

desenharTarefas();