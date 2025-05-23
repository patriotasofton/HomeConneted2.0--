document.addEventListener('DOMContentLoaded', () => {
    const comodoCount = {};
    const selectedComodos = document.getElementById('selected-comodos');
    const addButton = document.getElementById('add-comodo');
    const saveButton = document.getElementById('save-comodos');

    // Função para atualizar contadores
    function updateCounters() {
        const counts = {};
        document.querySelectorAll('.comodo-tag').forEach(tag => {
            const type = tag.dataset.originalType;
            counts[type] = (counts[type] || 0) + 1;
        });
        return counts;
    }

    // Função para atualizar nomes dos cômodos
    function updateComodoNames() {
        const counts = {};
        document.querySelectorAll('.comodo-tag').forEach(tag => {
            const type = tag.dataset.originalType;
            counts[type] = (counts[type] || 0) + 1;
            const currentCount = Array.from(document.querySelectorAll('.comodo-tag'))
                .filter(t => t.dataset.originalType === type)
                .indexOf(tag) + 1;
            tag.querySelector('span').textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} (${currentCount})`;
        });
    }

    // Adicionar cômodo
    addButton.addEventListener('click', () => {
        const type = document.getElementById('comodo-type').value;
        const counts = updateCounters();
        const count = (counts[type] || 0) + 1;

        const comodoTag = document.createElement('div');
        comodoTag.className = 'comodo-tag';
        comodoTag.dataset.originalType = type;
        comodoTag.innerHTML = `
            <span>${type.charAt(0).toUpperCase() + type.slice(1)} (${count})</span>
            <button type="button" class="remove-comodo">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Remover cômodo
        comodoTag.querySelector('.remove-comodo').addEventListener('click', () => {
            comodoTag.remove();
            updateComodoNames();
        });

        selectedComodos.appendChild(comodoTag);
        updateComodoNames();
    });

    // Salvar cômodos
saveButton.addEventListener('click', async () => {
   // Cria array com os cômodos adicionados
    const comodos = Array.from(document.querySelectorAll('.comodo-tag')).map(tag => {
        const nomeCompleto = tag.querySelector('span').textContent.trim();
        const match = nomeCompleto.match(/^(.+?)\s*(?:\((\d+)\))?$/);
        
        return {
            nome_do_comodo: match[1], // Nome principal do cômodo
            numero_comodo: match[2] ? parseInt(match[2]) : 1, // Número (se houver)
            residencia: {
                id_residencia: 1 // Valor fake padrão
            }
        };
    });

    // Verifica se há cômodos cadastrados
    if (comodos.length === 0) {
        alert('Adicione pelo menos um cômodo antes de salvar');
        return;
    }

    // Simula o salvamento (substitui o código de API)
    console.log('Simulando salvamento dos cômodos:', comodos);
    
    // Mostra feedback visual
    const feedback = document.createElement('div');
    feedback.style.position = 'fixed';
    feedback.style.top = '20px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.backgroundColor = '#4CAF50';
    feedback.style.color = 'white';
    feedback.style.padding = '15px 30px';
    feedback.style.borderRadius = '5px';
    feedback.style.zIndex = '1000';
    feedback.textContent = 'Cômodos salvos com sucesso!';
    
    document.body.appendChild(feedback);

    // Opcional: salva no localStorage para simular persistência
    localStorage.setItem('comodosFake', JSON.stringify(comodos));

    // Remove o feedback após 3 segundos e redireciona
    setTimeout(() => {
        feedback.remove();
        window.location.href = 'area-cliente.html';
    }, 3000);
});

    // Logout
    document.getElementById('logout-btn').addEventListener('click', async () => {
        window.location.href = 'index.html';
    });
});