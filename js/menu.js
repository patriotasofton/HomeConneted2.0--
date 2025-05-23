const itensCatalogo = [
    { id: 1, name: 'Sensor de Gás' },
    { id: 2, name: 'Luzes' },
    { id: 3, name: 'Detector de Fumaça' },
    { id: 4, name: 'Sensor de Presença' },
    { id: 5, name: 'Ar-condicionado' },
    { id: 6, name: 'Ventilador' }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('resumo-comodos');

    // Busca todos os dados do localStorage relacionados aos cômodos
    const comodosSalvos = Object.keys(localStorage)
        .filter(key => key.startsWith("comodo-") && key.endsWith("-itens"))
        .map(key => {
            const id = key.split('-')[1];
            const nome = localStorage.getItem(`comodo-${id}-name`) || `Cômodo ${id}`;
            const itensIds = JSON.parse(localStorage.getItem(key)) || [];
            return {
                id,
                nome,
                itens: itensCatalogo.filter(item => itensIds.includes(item.id))
            };
        });

    if (comodosSalvos.length === 0) {
        container.innerHTML = "<p>Nenhum cômodo com itens selecionados.</p>";
        return;
    }

    comodosSalvos.forEach(comodo => {
        const card = document.createElement('div');
        card.className = 'comodo-card';
        card.innerHTML = `
            <h3>${comodo.nome}</h3>
            <ul class="itens-list">
                ${comodo.itens.map(item => `<li>${item.name}</li>`).join('')}
            </ul>
        `;
        container.appendChild(card);
    });
});
