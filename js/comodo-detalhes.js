async function verificarComodosDaResidencia(idResidencia) {
    try {
        const response = await fetch(`http://localhost:8080/procurarComodo/${idResidencia}`);
        
        if (!response.ok) {
            throw new Error("Erro ao verificar os cômodos da residência.");
        }

        const possuiComodo = await response.json(); // true ou false
        return possuiComodo;
    } catch (error) {
        console.error("Erro ao consultar cômodos:", error);
        return false;
    }
}
function renderItens(selectedItens) {
    const grid = document.getElementById('itens-grid');
    grid.innerHTML = itens.map(item => `
        <div class="item-card" data-item-id="${item.id}">
            <img src="${item.image}" class="item-image" alt="${item.name}">
            <h4>${item.name}</h4>
            <label>
                <input type="checkbox" class="item-checkbox" value="${item.id}" ${selectedItens.includes(item.id) ? 'checked' : ''}>
                Selecionar
            </label>
        </div>
    `).join('');
}
function salvarItensSelecionados() {
    const comodoId = new URLSearchParams(window.location.search).get('id');
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const selecionados = Array.from(checkboxes)
                              .filter(cb => cb.checked)
                              .map(cb => parseInt(cb.value));

    // Salva no localStorage
    localStorage.setItem(`comodo-${comodoId}-itens`, JSON.stringify(selecionados));

    // Redireciona para a tela de menu
    window.location.href = `menu.html`;
}

const itens = [
    { 
        id: 1,
        name: 'Sensor de Gás', 
        image: 'assets/gas-sensor.png',
        alerts: [
            'Detecção de gás acima do nível seguro',
            'Falha na comunicação com o sensor'
        ]
    },
    { 
        id: 2,
        name: 'Luzes', 
        image: 'assets/lights.png',
        alerts: [
            'Luzes ligadas há mais de 3 horas',
            'Consumo de energia acima da média'
        ]
    },
    // Adicione todos os outros itens com seus respectivos alertas
];

document.addEventListener('DOMContentLoaded', () => {
    const comodoId = new URLSearchParams(window.location.search).get('id');
    loadComodo(comodoId);
    initItens();
});

function loadComodo(id) {
    // Simulação de busca na API
    const comodo = {
        id: id,
        name: localStorage.getItem(`comodo-${id}-name`) || 'Sala Principal',
        itens: JSON.parse(localStorage.getItem(`comodo-${id}-itens`)) || []
    };
    
    document.getElementById('comodo-name').textContent = comodo.name;
    renderItens(comodo.itens);
}

function renderItens(selectedItens) {
    const grid = document.getElementById('itens-grid');
    grid.innerHTML = itens.map(item => `
        <div class="item-card" data-item-id="${item.id}">
            <img src="${item.image}" class="item-image" alt="${item.name}">
            <h4>${item.name}</h4>
            <label class="switch">
                <input type="checkbox" ${selectedItens.includes(item.id) ? 'checked' : ''}>
                <span class="slider"></span>
            </label>
            <button class="btn btn-alerta" onclick="showAlertaConfig(${item.id})">
                <i class="fas fa-bell"></i> Alertas
            </button>
        </div>
    `).join('');
}

function initItens() {
    document.querySelectorAll('.switch input').forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const itemId = this.closest('.item-card').dataset.itemId;
            toggleItem(itemId, this.checked);
        });
    });
}

function toggleItem(itemId, state) {
    // Simulação de chamada API
    console.log(`Item ${itemId} ${state ? 'ligado' : 'desligado'}`);
    // Aqui você faria uma chamada real para a API
}

function showAlertaConfig(itemId) {
    const item = itens.find(i => i.id === itemId);
    const modal = document.getElementById('modal-alerta');
    const title = document.getElementById('alerta-title');
    const content = document.getElementById('alerta-content');
    
    title.textContent = `Configurar Alertas - ${item.name}`;
    content.innerHTML = `
        <p>Selecione os alertas desejados:</p>
        ${item.alerts.map((alert, index) => `
            <div class="alerta-option">
                <input type="checkbox" id="alert-${index}">
                <label for="alert-${index}">${alert}</label>
            </div>
        `).join('')}
    `;
    
    modal.style.display = 'block';
}

// Fechar modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('modal-alerta').style.display = 'none';
});

window.onclick = function(event) {
    const modal = document.getElementById('modal-alerta');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}