const contentArea = document.getElementById('contentArea');
const clientSelect = document.getElementById('clientSelect');
const loader = document.getElementById('loader');

async function loadClientData(clientId) {
  contentArea.innerHTML = '';
  loader.style.display = 'block';

  try {
    const response = await fetch(`/data/${clientId}.json`);
    if (!response.ok) throw new Error('Dados não encontrados');
    
    const data = await response.json();
    renderData(data);
  } catch (error) {
    contentArea.innerHTML = `<p style="color: red;">Erro ao carregar inteligência: ${error.message}</p>`;
  } finally {
    loader.style.display = 'none';
  }
}

function renderData(data) {
  let html = '';

  // ========= PANEL: PERSONAS =========
  html += `
    <div class="panel">
      <h2 class="panel-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        Mapas Psicológicos (Personas)
      </h2>
      <p style="color:#aaa; font-size:0.9rem; margin-bottom: 2rem;">Segmento: ${data.segmento} | Construído pelo "Construtor de Personas"</p>
  `;

  data.personas.forEach(p => {
    html += `
      <div class="persona-card">
        <h3>${p.nome}</h3>
        <p><span class="badge">Dilema Central</span> <br> ${p.dilema_central}</p>
        <p><span class="badge">Drive de Consumo</span> <br> ${p.drive_consumo}</p>
        <p><span class="badge">Estética</span> <br> ${p.estetica}</p>
        <p><span class="badge">Objeções Ocultas</span> <br> <em>"${p.objecoes_ocultas}"</em></p>
      </div>
    `;
  });
  html += `</div>`;

  // ========= PANEL: JORNADA E GATILHOS =========
  html += `
    <div class="panel">
      <h2 class="panel-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
        Jornada da Armadilha (Gatilhos)
      </h2>
  `;
  
  const stages = Object.entries(data.jornada);
  stages.forEach(([stageName, info]) => {
    html += `
      <div class="journey-stage">
        <div class="stage-name">${stageName}</div>
        <div>
          <p style="margin-top:0;"><strong>Contexto:</strong> ${info.contexto}</p>
          <p style="color:var(--nexus-accent);"><strong>Gatilho Mental:</strong> ${info.gatilho}</p>
        </div>
      </div>
    `;
  });
  html += `</div>`;

  // ========= PANEL: NEXIALISTA =========
  const nex = data.acao_nexialista;
  html += `
    <div class="panel nexialist-action">
      <h2 class="panel-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        Protocolo Nexialista (Disrupção)
      </h2>
      
      <div class="persona-card" style="border-left-color: var(--nexus-red); background: rgba(0,0,0,0.5);">
        <h3 style="color: var(--nexus-red);">${nex.nome_acao}</h3>
        <p><strong>Foco:</strong> ${nex.foco}</p>
        <p><strong>Conceito Base:</strong> ${nex.conceito}</p>
        <p><strong>Itens Necessários:</strong></p>
        <ul style="color:#aaa;">
          ${nex.itens_necessarios.map(i => `<li>${i}</li>`).join('')}
        </ul>
        <p><strong>Orçamento Base Estimado:</strong> <span class="impact-value">${nex.orcamento_base}</span></p>
        <p><strong>Impacto de Marca:</strong> ${nex.impacto_esperado}</p>
        
        <div style="margin-top: 2rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1rem;">
          <h4 style="color: #fff; margin-bottom: 0.5rem;">Plano de Contingência / Ação Isolada</h4>
          <p style="font-size: 0.9rem; color: #888;">${nex.isolamento_acoes_complementares.justificativa}</p>
          <p><span class="badge" style="background: rgba(255,255,255,0.2);">Ação Isolada</span> <br> ${nex.isolamento_acoes_complementares.acao_isolada}</p>
          <p style="color: #4CAF50;"><strong>Vantagens:</strong> ${nex.isolamento_acoes_complementares.vantagens}</p>
          <p style="color: #f44336;"><strong>Desvantagens:</strong> ${nex.isolamento_acoes_complementares.desvantagens}</p>
        </div>
      </div>
    </div>
  `;

  contentArea.innerHTML = html;
}

// Event Listeners
clientSelect.addEventListener('change', (e) => {
  loadClientData(e.target.value);
});

// Load default
document.addEventListener('DOMContentLoaded', () => {
  loadClientData(clientSelect.value);
});
