class Quiz {
  constructor() {
    this.perguntas = []
    this.respostas = {}
    this.perguntaAtual = 0
    this.carregarPerguntas()
  }

  init() {
    this.exibirPergunta(0)
  }

  carregarPerguntas() {
    this.perguntas = [
      {
        id: 1,
        pergunta: "Qual tipo de carro você prefere?",
        tipo: "unica",
        opcoes: [
          { valor: "sedan", texto: "Sedan", icon: "bi bi-car-front" },
          { valor: "suv", texto: "SUV", icon: "bi bi-truck" },
          { valor: "hatchback", texto: "Hatchback", icon: "bi bi-car-front-fill" },
          { valor: "esportivo", texto: "Esportivo", icon: "bi bi-lightning-charge" },
        ],
      },
      {
        id: 2,
        pergunta: "Qual será o principal uso do carro?",
        tipo: "unica",
        opcoes: [
          { valor: "urbano", texto: "Trajetos urbanos", icon: "bi bi-building" },
          { valor: "viagens", texto: "Viagens longas", icon: "bi bi-geo-alt" },
          { valor: "familia", texto: "Transporte familiar", icon: "bi bi-people" },
          { valor: "offroad", texto: "Uso off-road", icon: "bi bi-tree" },
        ],
      },
      {
        id: 3,
        pergunta: "O que é mais importante para você?",
        tipo: "multipla",
        opcoes: [
          { valor: "economia", texto: "Economia de combustível", icon: "bi bi-fuel-pump" },
          { valor: "potencia", texto: "Potência e desempenho", icon: "bi bi-speedometer2" },
          { valor: "tecnologia", texto: "Tecnologia e conectividade", icon: "bi bi-phone" },
          { valor: "seguranca", texto: "Segurança avançada", icon: "bi bi-shield-check" },
          { valor: "conforto", texto: "Conforto interno", icon: "bi bi-emoji-smile" },
          { valor: "design", texto: "Estilo e design", icon: "bi bi-palette" },
        ],
      },
      {
        id: 4,
        pergunta: "Qual tipo de combustível prefere?",
        tipo: "unica",
        opcoes: [
          { valor: "flex", texto: "Flex", icon: "bi bi-droplet" },
          { valor: "gasolina", texto: "Gasolina", icon: "bi bi-fuel-pump" },
          { valor: "etanol", texto: "Etanol", icon: "bi bi-flower1" },
        ],
      },
      {
        id: 5,
        pergunta: "Qual faixa de preço?",
        tipo: "unica",
        opcoes: [
          { valor: "50000", texto: "Até R$ 50.000", icon: "bi bi-currency-dollar" },
          { valor: "100000", texto: "R$ 50.001 – R$ 100.000", icon: "bi bi-currency-dollar" },
          { valor: "200000", texto: "R$ 100.001 – R$ 200.000", icon: "bi bi-currency-dollar" },
          { valor: "acima200", texto: "Acima de R$ 200.000", icon: "bi bi-currency-dollar" },
        ],
      },
      {
        id: 6,
        pergunta: "Que tipo de câmbio você prefere?",
        tipo: "unica",
        opcoes: [
          { valor: "manual", texto: "Manual", icon: "bi bi-gear" },
          { valor: "automatico", texto: "Automático", icon: "bi bi-play-circle" },
          { valor: "automatizado", texto: "Automatizado", icon: "bi bi-cpu" },
          { valor: "indiferente", texto: "Indiferente", icon: "bi bi-check-circle" },
        ],
      },
    ]
  }

  exibirPergunta(index) {
    this.perguntaAtual = index
    const pergunta = this.perguntas[index]
    const container = document.getElementById("quiz-container")

    const progresso = (((index + 1) / this.perguntas.length) * 100).toFixed(0)

    const html = `
            <div class="quiz-pergunta fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="mb-0 fw-bold">${pergunta.pergunta}</h4>
                    <span class="badge bg-dark px-3 py-2">${index + 1} de ${this.perguntas.length}</span>
                </div>
                
                <div class="progress mb-5" style="height: 8px;">
                    <div class="progress-bar" role="progressbar" style="width: ${progresso}%" aria-valuenow="${progresso}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                
                <div class="row g-4">
                    ${pergunta.opcoes
                      .map(
                        (opcao, i) => `
                        <div class="col-md-${pergunta.opcoes.length <= 4 ? "6" : "4"}">
                            <div class="quiz-option ${this.respostas[pergunta.id]?.includes(opcao.valor) ? "selected" : ""}"
                                 onclick="app.quiz.selecionarOpcao('${pergunta.id}', '${opcao.valor}', '${pergunta.tipo}')">
                                <div class="text-center">
                                    <i class="${opcao.icon} text-azul-pitstop mb-3 d-block"></i>
                                    <div class="fw-semibold">${opcao.texto}</div>
                                </div>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                
                ${pergunta.tipo === "multipla" ? '<p class="text-muted text-center mt-3 small"><i class="bi bi-info-circle me-1"></i>Você pode selecionar múltiplas opções</p>' : ""}
                
                <div class="d-flex justify-content-between mt-5">
                    <button class="btn btn-outline-secondary btn-lg ${index === 0 ? "invisible" : ""}" 
                            onclick="app.quiz.voltarPergunta()">
                        <i class="bi bi-arrow-left me-2"></i>Voltar
                    </button>
                    
                    <button class="btn btn-vermelho-pitstop btn-lg" 
                            onclick="app.quiz.proximaPergunta()"
                            ${!this.respostas[pergunta.id] || this.respostas[pergunta.id].length === 0 ? "disabled" : ""}>
                        ${index === this.perguntas.length - 1 ? '<i class="bi bi-check-circle me-2"></i>Ver Resultados' : 'Próxima<i class="bi bi-arrow-right ms-2"></i>'}
                    </button>
                </div>
            </div>
        `

    container.innerHTML = html
  }

  selecionarOpcao(perguntaId, valor, tipo) {
    if (tipo === "unica") {
      this.respostas[perguntaId] = [valor]
    } else {
      if (!this.respostas[perguntaId]) {
        this.respostas[perguntaId] = []
      }

      const index = this.respostas[perguntaId].indexOf(valor)
      if (index > -1) {
        this.respostas[perguntaId].splice(index, 1)
      } else {
        this.respostas[perguntaId].push(valor)
      }
    }

    // Atualizar visualização
    this.exibirPergunta(this.perguntaAtual)
  }

  voltarPergunta() {
    if (this.perguntaAtual > 0) {
      this.exibirPergunta(this.perguntaAtual - 1)
    }
  }

  proximaPergunta() {
    if (this.perguntaAtual < this.perguntas.length - 1) {
      this.exibirPergunta(this.perguntaAtual + 1)
    } else {
      this.finalizarQuiz()
    }
  }

  finalizarQuiz() {
    const recomendacoes = this.gerarRecomendacoes()
    this.exibirResultados(recomendacoes)
  }

  gerarRecomendacoes() {
    let veiculosFiltrados = [...window.app.veiculos]

    const tipoPreferido = this.respostas[1]?.[0]
    if (tipoPreferido) {
      const mapeamentoTipo = {
        sedan: "Sedan",
        suv: "SUV",
        hatchback: "Hatch",
        esportivo: "Esportivo",
      }
    }

    const faixaPreco = this.respostas[5]?.[0]
    if (faixaPreco) {
      switch (faixaPreco) {
        case "50000":
          veiculosFiltrados = veiculosFiltrados.filter((v) => v.preco <= 50000)
          break
        case "100000":
          veiculosFiltrados = veiculosFiltrados.filter((v) => v.preco <= 100000)
          break
        case "200000":
          veiculosFiltrados = veiculosFiltrados.filter((v) => v.preco <= 200000)
          break
      }
    }

    const preferencias = this.respostas[3] || []

    veiculosFiltrados.sort((a, b) => {
      let scoreA = 0
      let scoreB = 0

      if (preferencias.includes("economia")) {
        scoreA += a.consumo.cidade
        scoreB += b.consumo.cidade
      }

      if (preferencias.includes("potencia")) {
        scoreA += Number.parseInt(a.potencia)
        scoreB += Number.parseInt(b.potencia)
      }

      if (preferencias.includes("seguranca")) {
        scoreA += a.seguranca * 10
        scoreB += b.seguranca * 10
      }

      if (preferencias.includes("conforto")) {
        scoreA += a.conforto * 10
        scoreB += b.conforto * 10
      }

      return scoreB - scoreA
    })

    return veiculosFiltrados.slice(0, 3)
  }

  exibirResultados(recomendacoes) {
    const container = document.getElementById("quiz-container")

    const html = `
            <div class="quiz-resultado fade-in">
                <div class="text-center mb-5">
                    <div class="mb-4">
                        <i class="bi bi-check-circle-fill display-1 text-verde-acento"></i>
                    </div>
                    <h3 class="fw-bold mb-3">Suas Recomendações Personalizadas</h3>
                    <p class="text-muted">Baseado nas suas preferências, encontramos os veículos perfeitos para você:</p>
                </div>
                
                <div class="row g-4 mb-5">
                    ${recomendacoes
                      .map(
                        (veiculo, index) => `
                        <div class="col-md-4">
                            <div class="card h-100 border-${index === 0 ? "success" : "secondary"} shadow-sm">
                                ${index === 0 ? '<div class="card-header melhor-opcao-header text-white text-center fw-bold"><i class="bi bi-trophy me-2"></i>Melhor Opção</div>' : ""}
                                <div class="card-img-top d-flex align-items-center justify-content-center bg-light" style="height: 200px; overflow: hidden;">
                                    ${
                                      veiculo.imagem
                                        ? `<img src="${veiculo.imagem}" alt="${veiculo.marca} ${veiculo.modelo}" class="img-fluid h-100 w-100" style="object-fit: cover;">`
                                        : `<i class="bi bi-car-front display-1 text-azul-pitstop"></i>`
                                    }
                                </div>
                                <div class="card-body text-center">
                                    <h5 class="card-title fw-bold">${veiculo.marca} ${veiculo.modelo}</h5>
                                    <p class="card-text text-muted mb-3">
                                        <small>${veiculo.ano} • ${veiculo.combustivel} • ${veiculo.cambio}</small>
                                    </p>
                                    <div class="veiculo-info mb-3">
                                        <div class="row small text-center g-2">
                                            <div class="col-6">
                                                <div class="border rounded p-2">
                                                    <i class="bi bi-speedometer2 d-block text-vermelho-pitstop mb-1"></i>
                                                    <span class="fw-semibold">${veiculo.potencia}</span>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="border rounded p-2">
                                                    <i class="bi bi-fuel-pump d-block text-vermelho-pitstop mb-1"></i>
                                                    <span class="fw-semibold">${veiculo.consumo.cidade} km/l</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="h4 text-vermelho-pitstop mb-3">R$ ${veiculo.preco.toLocaleString("pt-BR")}</div>
                                    <a href="ficha-tecnica.html?id=${veiculo.id}" class="btn btn-vermelho-pitstop w-100 mb-2">
                                        <i class="bi bi-card-text me-2"></i>Ver Detalhes Completos
                                    </a>
                                    <button class="btn btn-outline-azul-pitstop w-100" 
                                            onclick="app.comparador.adicionarParaComparacao(${veiculo.id})">
                                        <i class="bi bi-plus-circle me-2"></i>Adicionar à Comparação
                                    </button>
                                </div>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                
                <div class="text-center p-4 bg-light rounded-4">
                    <h5 class="fw-bold mb-3">Quer uma consultoria especializada?</h5>
                    <p class="text-muted mb-4">Nossa equipe pode ajudá-lo a tomar a melhor decisão</p>
                    <div class="d-flex gap-3 justify-content-center flex-wrap">
                        <button class="btn btn-vermelho-pitstop btn-lg">
                            <i class="bi bi-chat-dots me-2"></i>Agendar Consultoria
                        </button>
                        <button class="btn btn-outline-secondary btn-lg" onclick="app.quiz.reiniciarQuiz()">
                            <i class="bi bi-arrow-repeat me-2"></i>Refazer Quiz
                        </button>
                    </div>
                </div>
            </div>
        `

    container.innerHTML = html
  }

  reiniciarQuiz() {
    this.respostas = {}
    this.perguntaAtual = 0
    this.exibirPergunta(0)
  }
}

export default Quiz
