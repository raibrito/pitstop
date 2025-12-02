import ApiService from './services/apiService.js';
import Comparador from './components/comparador.js';
import Quiz from './components/quiz.js';
import { mockVeiculos, carrosMaisVendidos } from '../data/mockData.js';

class PitStopApp {
    constructor() {
        this.apiService = new ApiService();
        this.comparador = new Comparador(this.apiService);
        this.quiz = new Quiz();
        this.veiculos = [];
        this.init();
    }

    async init() {
        // Carregar dados iniciais
        await this.carregarDadosIniciais();

        // Inicializar componentes
        this.comparador.init();
        this.quiz.init();

        // Configurar eventos
        this.configurarEventos();

        console.log('PIT STOP App inicializado');
    }

    async carregarDadosIniciais() {
        try {
            // Usar dados mock por enquanto
            this.veiculos = mockVeiculos;

            // Popular carros mais vendidos
            this.popularCarrosMaisVendidos();

            // Popular selects
            this.popularSelects();

            // Popular lista de veículos
            this.popularListaVeiculos();

        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    popularCarrosMaisVendidos() {
        const container = document.getElementById('carros-mais-vendidos');

        const html = carrosMaisVendidos.map(carro => {
            const veiculo = this.veiculos.find(v =>
                `${v.marca} ${v.modelo}` === carro.nome
            );

            return `
            <div class="col-md-2 col-6">
                <div class="card veiculo-card text-center h-100">
                    <div class="card-img-top d-flex align-items-center justify-content-center" 
                         style="height: 100px; overflow: hidden;">
                        ${veiculo && veiculo.imagem ?
                    `<img src="${veiculo.imagem}" alt="${carro.nome}" 
                                  class="img-fluid h-100 w-100" style="object-fit: cover;">` :
                    `<i class="bi bi-car-front display-6 text-azul-pitstop"></i>`
                }
                    </div>
                    <div class="card-body p-3">
                        <h6 class="card-title" style="font-size: 0.9rem;">${carro.nome}</h6>
                        <span class="badge badge-vendidos rounded-pill" style="font-size: 0.7rem;">
                            ${carro.vendas.toLocaleString()} vendas
                        </span>
                    </div>
                </div>
            </div>
        `;
        }).join('');

        container.innerHTML = html;
    }

    popularSelects() {
        const select1 = document.getElementById('veiculo1');
        const select2 = document.getElementById('veiculo2');
        const filtroMarca = document.getElementById('filtro-marca');

        // Obter marcas únicas
        const marcas = [...new Set(this.veiculos.map(v => v.marca))];

        // Popular selects de veículos
        this.veiculos.forEach(veiculo => {
            const option1 = new Option(`${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`, veiculo.id);
            const option2 = new Option(`${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`, veiculo.id);
            select1.add(option1);
            select2.add(option2);
        });

        // Popular filtro de marcas
        marcas.forEach(marca => {
            const option = new Option(marca, marca);
            filtroMarca.add(option);
        });

        // Popular filtro de anos
        const anos = [...new Set(this.veiculos.map(v => v.ano))].sort((a, b) => b - a);
        const filtroAno = document.getElementById('filtro-ano');
        anos.forEach(ano => {
            const option = new Option(ano, ano);
            filtroAno.add(option);
        });
    }

    popularListaVeiculos(veiculosFiltrados = null) {
        const container = document.getElementById('lista-veiculos');
        const veiculos = veiculosFiltrados || this.veiculos;

        const html = veiculos.map(veiculo => `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="card veiculo-card h-100">
                <div class="card-img-top d-flex align-items-center justify-content-center bg-light" 
                     style="height: 180px; overflow: hidden;">
                    ${veiculo.imagem ?
                `<img src="${veiculo.imagem}" alt="${veiculo.marca} ${veiculo.modelo}" 
                              class="img-fluid h-100 w-100" style="object-fit: cover;">` :
                `<i class="bi bi-car-front display-1 text-azul-pitstop"></i>`
            }
                </div>
                <div class="card-body">
                    <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
                    
                    <p class="card-text text-muted">
                        <small>${veiculo.ano} • ${veiculo.combustivel} • ${veiculo.cambio}</small>
                    </p>

                    <div class="veiculo-info mb-3">
                        <div class="row small text-center g-2">
                            <div class="col-4">
                                <div class="border rounded p-1">
                                    <i class="bi bi-speedometer2 d-block text-vermelho-pitstop"></i>
                                    <span>${veiculo.potencia}</span>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="border rounded p-1">
                                    <i class="bi bi-fuel-pump d-block text-vermelho-pitstop"></i>
                                    <span>${veiculo.consumo.cidade} km/l</span>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="border rounded p-1">
                                    <i class="bi bi-shield-check d-block text-vermelho-pitstop"></i>
                                    <span>${veiculo.seguranca}/5</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- BOTÃO FICHA TÉCNICA (SUBSTITUI O PREÇO) -->
                    <a class="btn btn-primary btn-sm w-100 my-2"
   href="ficha-tecnica.html?id=${veiculo.id}">
   <i class="bi bi-card-text me-1"></i> Ficha Técnica
</a>


                    <!-- BOTÃO COMPARAR -->
                    <button class="btn btn-outline-azul-pitstop btn-sm w-100" 
                        onclick="app.comparador.adicionarParaComparacao(${veiculo.id})">
                        <i class="bi bi-plus-circle me-1"></i>Comparar
                    </button>

                    


                </div>
            </div>
        </div>
    `).join('');

        container.innerHTML = html;
    }


    configurarEventos() {
        // Filtros
        document.getElementById('btn-filtrar').addEventListener('click', () => {
            this.aplicarFiltros();
        });

        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    aplicarFiltros() {
        const marca = document.getElementById('filtro-marca').value;
        const ano = document.getElementById('filtro-ano').value;
        const combustivel = document.getElementById('filtro-combustivel').value;
        const precoMax = document.getElementById('filtro-preco').value;

        let veiculosFiltrados = this.veiculos;

        if (marca) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.marca === marca);
        }

        if (ano) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.ano == ano);
        }

        if (combustivel) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.combustivel === combustivel);
        }

        if (precoMax) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.preco <= precoMax);
        }

        this.popularListaVeiculos(veiculosFiltrados);
    }
}

// Inicializar app quando DOM estiver pronto
const app = new PitStopApp();
window.app = app; // Para acesso global
