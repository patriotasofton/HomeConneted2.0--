document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('comodos-container');
    const modal = document.getElementById('comodo-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    // Dados fixos dos cômodos (1 sala, 2 banheiros, 1 cozinha, 2 quartos, 1 garagem)
    const comodosFixos = [
        { nome: "Sala", tipo: "sala", numero: 1 },
        { nome: "Banheiro", tipo: "banheiro", numero: 1 },
        { nome: "Banheiro", tipo: "banheiro", numero: 2 },
        { nome: "Cozinha", tipo: "cozinha", numero: 1 },
        { nome: "Quarto", tipo: "quarto", numero: 1 },
        { nome: "Quarto", tipo: "quarto", numero: 2 },
        { nome: "Garagem", tipo: "garagem", numero: 1 }
    ];

    // Itens disponíveis para seleção
    const itensDisponiveis = {
        sala: ["Luz Principal", "Ar Condicionado", "TV", "Cortinas"],
        banheiro: ["Luz", "Ventilador", "Chuveiro Inteligente"],
        cozinha: ["Luz", "Exaustor", "Geladeira Inteligente"],
        quarto: ["Luz", "Ventilador de Teto", "Abajur"],
        garagem: ["Luz", "Portão Automático"]
    };

    // Criar lista de cômodos
    comodosFixos.forEach((comodo, index) => {
        const comodoItem = document.createElement('div');
        comodoItem.className = 'comodo-item';
        comodoItem.dataset.comodoIndex = index;
        
        comodoItem.innerHTML = `
            <h3>${comodo.nome} ${comodo.numero > 1 ? `(${comodo.numero})` : ''}</h3>
            <p>Clique para selecionar os itens deste cômodo</p>
        `;
        
        comodoItem.addEventListener('click', () => {
            openConfigModal(comodo, index);
        });
        
        container.appendChild(comodoItem);
    });

    // Abrir modal de configuração
    function openConfigModal(comodo, comodoIndex) {
        modalTitle.textContent = `Selecionar itens para ${comodo.nome} ${comodo.numero > 1 ? comodo.numero : ''}`;
        modalBody.innerHTML = '';
        
        const itensDoComodo = itensDisponiveis[comodo.tipo] || [];
        
        if (itensDoComodo.length === 0) {
            modalBody.innerHTML = '<p>Nenhum item disponível para este cômodo.</p>';
        } else {
            itensDoComodo.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-option';
                
                itemDiv.innerHTML = `
                    <label>
                        <input type="checkbox" name="comodo-item" value="${item}" 
                               data-comodo-index="${comodoIndex}">
                        ${item}
                    </label>
                `;
                
                modalBody.appendChild(itemDiv);
            });
        }
        
        modal.style.display = 'flex';
    }

    // Fechar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Confirmar configurações (botão principal) - Redireciona para menu-comodo.html
    document.getElementById('confirmarConfiguracoes').addEventListener('click', () => {
        // Simular salvamento das seleções (opcional)
        const configuracaoComodos = comodosFixos.map(comodo => {
            return {
                ...comodo,
                itensSelecionados: itensDisponiveis[comodo.tipo] || []
            };
        });
        
        // Armazena no localStorage (opcional)
        localStorage.setItem('configComodos', JSON.stringify(configuracaoComodos));
        
        // Redireciona para a tela de menu
        window.location.href = 'menu-comodo.html';
    });

    // Confirmar seleção no modal
    document.querySelector('.btn-confirm')?.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});