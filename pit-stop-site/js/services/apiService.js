class ApiService {
    constructor() {
        this.baseURL = 'https://parallelum.com.br/fipe/api/v2/cars';
        this.cache = new Map();
    }

    async getMarcas() {
        const cacheKey = 'marcas';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.baseURL}/brands`);
            const marcas = await response.json();
            this.cache.set(cacheKey, marcas);
            return marcas;
        } catch (error) {
            console.error('Erro ao buscar marcas:', error);
            return [];
        }
    }

    async getModelos(marcaId) {
        const cacheKey = `modelos-${marcaId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.baseURL}/brands/${marcaId}/models`);
            const modelos = await response.json();
            this.cache.set(cacheKey, modelos);
            return modelos;
        } catch (error) {
            console.error('Erro ao buscar modelos:', error);
            return [];
        }
    }

    async getVeiculoCompleto(marcaId, modeloId, anoId) {
        const cacheKey = `veiculo-${marcaId}-${modeloId}-${anoId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(
                `${this.baseURL}/brands/${marcaId}/models/${modeloId}/years/${anoId}`
            );
            const veiculo = await response.json();
            this.cache.set(cacheKey, veiculo);
            return veiculo;
        } catch (error) {
            console.error('Erro ao buscar veículo:', error);
            return null;
        }
    }

    // Método para buscar preços médios (mock por enquanto)
    async getPrecoMedio(marca, modelo, ano) {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Retornar preço mock baseado nos dados do PDF
        const precosBase = {
            'Honda Civic': 120000,
            'Toyota Corolla': 110000,
            'Chevrolet Onix': 65000,
            'Fiat Strada': 80000,
            'Volkswagen Polo': 70000
        };
        
        const chave = `${marca} ${modelo}`;
        return precosBase[chave] || Math.floor(Math.random() * 50000) + 50000;
    }
}

export default ApiService;
