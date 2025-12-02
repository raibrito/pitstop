import Graficos from './graficos.js';

class Comparador {
    constructor(apiService) {
        this.apiService = apiService;
        this.graficos = new Graficos();
        this.veiculo1 = null;
        this.veiculo2 = null;
    }

    init() {
        this.configurarEventos();
    }

    configurarEventos() {
        document.getElementById('btnComparar').addEventListener('click', () => {
            this.compararVeiculos();
        });
    }

    async compararVeiculos() {
        const select1 = document.getElementById('veiculo1');
        const select2 = document.getElementById('veiculo2');
        
        const id1 = select1.value;
        const id2 = select2.value;
        
        if (!id1 || !id2) {
            alert('Por favor, selecione dois veículos para comparar.');
            return;
        }
        
        if (id1 === id2) {
            alert('Por favor, selecione veículos diferentes para comparação.');
            return;
        }
        
        // Buscar dados dos veículos (por enquanto do mock)
        this.veiculo1 = window.app.veiculos.find(v => v.id == id1);
        this.veiculo2 = window.app.veiculos.find(v => v.id == id2);
        
        if (this.veiculo1 && this.veiculo2) {
            this.exibirComparacao();
        }
    }

    exibirComparacao() {
        const container = document.getElementById('resultado-comparacao');
        container.classList.remove('d-none');
        container.classList.add('fade-in');
        
        // Atualizar nomes na tabela
        document.getElementById('nome-veiculo1').textContent = 
            `${this.veiculo1.marca} ${this.veiculo1.modelo}`;
        document.getElementById('nome-veiculo2').textContent = 
            `${this.veiculo2.marca} ${this.veiculo2.modelo}`;
        
        // Gerar gráfico radial
        this.graficos.criarGraficoRadial(this.veiculo1, this.veiculo2);
        
        // Popular tabela de comparação
        this.popularTabelaComparacao();
        
        // Scroll para resultado
        container.scrollIntoView({ behavior: 'smooth' });
    }

    popularTabelaComparacao() {
        const tbody = document.querySelector('#tabela-comparacao tbody');
        
        const especificacoes = [
            { label: 'Preço', key: 'preco', format: (v) => `R$ ${v.toLocaleString()}` },
            { label: 'Ano', key: 'ano' },
            { label: 'Combustível', key: 'combustivel' },
            { label: 'Câmbio', key: 'cambio' },
            { label: 'Potência', key: 'potencia' },
            { label: 'Consumo Cidade', key: 'consumo.cidade', format: (v) => `${v} km/l` },
            { label: 'Consumo Estrada', key: 'consumo.estrada', format: (v) => `${v} km/l` },
            { label: 'Aceleração 0-100', key: 'aceleracao', format: (v) => `${v}s` },
            { label: 'Velocidade Máxima', key: 'velocidadeMaxima', format: (v) => `${v} km/h` },
            { label: 'Segurança', key: 'seguranca', format: (v) => `${v}/5 ★` },
            { label: 'Conforto', key: 'conforto', format: (v) => `${v}/5 ★` }
        ];
        
        const html = especificacoes.map(esp => {
            const valor1 = this.obterValor(this.veiculo1, esp.key);
            const valor2 = this.obterValor(this.veiculo2, esp.key);
            
            const formatado1 = esp.format ? esp.format(valor1) : valor1;
            const formatado2 = esp.format ? esp.format(valor2) : valor2;
            
            // Determinar qual é melhor (para styling)
            let classe1 = '';
            let classe2 = '';
            
            if (typeof valor1 === 'number' && typeof valor2 === 'number') {
                if (['aceleracao'].includes(esp.key)) {
                    // Menor é melhor
                    classe1 = valor1 < valor2 ? 'text-success fw-bold' : '';
                    classe2 = valor2 < valor1 ? 'text-success fw-bold' : '';
                } else {
                    // Maior é melhor
                    classe1 = valor1 > valor2 ? 'text-success fw-bold' : '';
                    classe2 = valor2 > valor1 ? 'text-success fw-bold' : '';
                }
            }
            
            return `
                <tr>
                    <td class="fw-bold">${esp.label}</td>
                    <td class="${classe1}">${formatado1}</td>
                    <td class="${classe2}">${formatado2}</td>
                </tr>
            `;
        }).join('');
        
        tbody.innerHTML = html;
    }

    obterValor(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    adicionarParaComparacao(id) {
        const select1 = document.getElementById('veiculo1');
        const select2 = document.getElementById('veiculo2');
        
        // Encontrar primeiro select vazio
        if (!select1.value) {
            select1.value = id;
        } else if (!select2.value) {
            select2.value = id;
        } else {
            // Se ambos estão preenchidos, perguntar qual substituir
            if (confirm('Deseja substituir o primeiro veículo da comparação?')) {
                select1.value = id;
            } else {
                select2.value = id;
            }
        }
        
        // Scroll para seção de comparação
        document.getElementById('comparacao').scrollIntoView({ behavior: 'smooth' });
    }
}

export default Comparador;
