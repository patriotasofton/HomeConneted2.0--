document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("menu-comodos");
  const residenciaId = localStorage.getItem("residenciaId");

  if (!residenciaId) {
    container.innerHTML = "<p>Residência não encontrada. Faça o login novamente.</p>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/comodosComItens/${residenciaId}`);
    const comodos = await response.json();

    if (comodos.length === 0) {
      container.innerHTML = "<p>Nenhum cômodo com itens automatizados encontrado.</p>";
      return;
    }

    comodos.forEach((comodo) => {
      const card = document.createElement("div");
      card.className = "comodo-card";
      card.innerHTML = `<h3>${comodo.nome_do_comodo} (${comodo.numero_comodo})</h3>`;
      card.onclick = () => abrirPopup(comodo);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar os cômodos:", error);
    container.innerHTML = "<p>Erro ao carregar dados. Tente novamente.</p>";
  }
});

function abrirPopup(comodo) {
  document.getElementById("popup-titulo").textContent = `Itens de ${comodo.nome_do_comodo}`;
  const itensContainer = document.getElementById("popup-itens");

  itensContainer.innerHTML = comodo.itens.map(item => `
    <div>
      <span>${item}</span>
      <button onclick="ligarItem('${item}', ${comodo.id_comodo})">Ligar</button>
      <button onclick="desligarItem('${item}', ${comodo.id_comodo})">Desligar</button>
    </div>
  `).join("");

  document.getElementById("popup").classList.remove("hidden");
}

function fecharPopup() {
  document.getElementById("popup").classList.add("hidden");
}

function ligarItem(item, comodoId) {
  console.log(`Ligando ${item} no cômodo ${comodoId}`);
  // Aqui você pode usar fetch para acionar backend ou Arduino
}

function desligarItem(item, comodoId) {
  console.log(`Desligando ${item} no cômodo ${comodoId}`);
  // Aqui você pode usar fetch para acionar backend ou Arduino
}
