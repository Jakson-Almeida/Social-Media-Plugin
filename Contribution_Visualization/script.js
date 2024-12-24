const sensitivityInput = document.getElementById("sensitivity");
const grid = document.getElementById("grid");

// Dados simulados (normalmente seria carregado de um arquivo JSON)
const contributions = {
  "2024-12-01": 5,
  "2024-12-02": 10,
  "2024-12-03": 15,
  "2024-12-04": 0,
  "2024-12-05": 25,
  "2024-12-06": 20,
  "2024-12-07": 30
};

// Função para gerar o grid
function generateGrid(contributions, sensitivity = 20) {
  grid.innerHTML = ""; // Limpa o grid anterior
  const daysInWeek = 7;

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i - 1));
    const dateString = date.toISOString().split("T")[0];
    const value = contributions[dateString] || 0;

    const intensity = Math.min(255, Math.floor((value / sensitivity) * 255));
    const color = `rgb(${200 - intensity}, ${220 - intensity}, 255)`;

    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = color;
    cell.dataset.value = value;
    cell.title = `${dateString}: ${value} contribuições`;
    grid.appendChild(cell);
  }
}

// Atualiza o grid ao alterar a sensibilidade
sensitivityInput.addEventListener("input", (event) => {
  const sensitivity = parseInt(event.target.value, 10);
  generateGrid(contributions, sensitivity);
});

// Gera o grid inicial
generateGrid(contributions);
