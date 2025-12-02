class Graficos {
    constructor() {
        this.graficoRadial = null;
    }

    criarGraficoRadial(veiculo1, veiculo2) {
        const ctx = document.getElementById('graficoRadial').getContext('2d');
        
        // Destruir gráfico anterior se existir
        if (this.graficoRadial) {
            this.graficoRadial.destroy();
        }

        // Normalizar dados para escala 0-100
        const dadosNormalizados = this.normalizarDados(veiculo1, veiculo2);
        
        this.graficoRadial = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Preço', 'Desempenho', 'Economia', 'Segurança', 'Conforto', 'Manutenção'],
                datasets: [
                    {
                        label: `${veiculo1.marca} ${veiculo1.modelo}`,
                        data: dadosNormalizados.veiculo1,
                        backgroundColor: 'rgba(191, 21, 32, 0.2)',
                        borderColor: 'rgba(191, 21, 32, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(191, 21, 32, 1)'
                    },
                    {
                        label: `${veiculo2.marca} ${veiculo2.modelo}`,
                        data: dadosNormalizados.veiculo2,
                        backgroundColor: 'rgba(41, 48, 117, 0.2)',
                        borderColor: 'rgba(41, 48, 117, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(41, 48, 117, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    normalizarDados(veiculo1, veiculo2) {
        // Para preço: menor preço = melhor (maior porcentagem)
        const preco1 = Math.max(0, 100 - (veiculo1.preco / 200000 * 100));
        const preco2 = Math.max(0, 100 - (veiculo2.preco / 200000 * 100));
        
        // Para desempenho: baseado na potência e aceleração
        const desempenho1 = (veiculo1.potencia.replace('cv', '') / 200 * 50) + 
                           ((20 - veiculo1.aceleracao) / 20 * 50);
        const desempenho2 = (veiculo2.potencia.replace('cv', '') / 200 * 50) + 
                           ((20 - veiculo2.aceleracao) / 20 * 50);
        
        // Para economia: baseado no consumo
        const economia1 = (veiculo1.consumo.cidade / 20 * 100);
        const economia2 = (veiculo2.consumo.cidade / 20 * 100);
        
        // Para segurança e conforto: usar as notas diretamente
        const seguranca1 = veiculo1.seguranca * 20;
        const seguranca2 = veiculo2.seguranca * 20;
        
        const conforto1 = veiculo1.conforto * 20;
        const conforto2 = veiculo2.conforto * 20;
        
        // Para manutenção: custo estimado (menor = melhor)
        const manutencao1 = Math.max(0, 100 - (veiculo1.preco * 0.05 / 1000 * 10));
        const manutencao2 = Math.max(0, 100 - (veiculo2.preco * 0.05 / 1000 * 10));
        
        return {
            veiculo1: [
                Math.round(preco1),
                Math.round(desempenho1),
                Math.round(economia1),
                Math.round(seguranca1),
                Math.round(conforto1),
                Math.round(manutencao1)
            ],
            veiculo2: [
                Math.round(preco2),
                Math.round(desempenho2),
                Math.round(economia2),
                Math.round(seguranca2),
                Math.round(conforto2),
                Math.round(manutencao2)
            ]
        };
    }
}

export default Graficos;
