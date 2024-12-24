const sensitivityInput = document.getElementById("sensitivity");
const grid = document.getElementById("grid");

// Função para carregar dados do JSON
async function fetchContributions() {
  try {
    const response = await fetch("data.json");
    const contributions = await response.json();
    return contributions;
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    return {
        "2024-12-01": 5,
        "2024-12-02": 10,
        "2024-12-03": 15,
        "2024-12-05": 25,
        "2024-12-06": 20,
        "2024-12-07": 30
    };
  }
}

// Função para gerar o grid
function generateGrid(contributions, sensitivity = 20) {
  grid.innerHTML = ""; // Limpa o grid anterior

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 365); // Últimos 365 dias

  for (let day = 0; day < 7; day++) {
    for (let week = 0; week < 53; week++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + week * 7 + day);

      const dateString = currentDate.toISOString().split("T")[0];
      const value = contributions[dateString] || 0;

      const intensity = Math.min(255, Math.floor((value / sensitivity) * 255));
      const color = `rgb(${200 - intensity}, ${220 - intensity}, 255)`;

      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundColor = color;
      cell.dataset.value = value;
      cell.dataset.tooltip = `${value} contribuições em ${dateString}`;
      grid.appendChild(cell);
    }
  }
}

// Atualiza o grid ao alterar a sensibilidade
sensitivityInput.addEventListener("input", (event) => {
  const sensitivity = parseInt(event.target.value, 10);
  fetchContributions().then((contributions) =>
    generateGrid(contributions, sensitivity)
  );
});

// Inicializa o grid com dados do JSON
fetchContributions().then((contributions) => generateGrid(contributions));
