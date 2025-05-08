# Fato ou Boato

Fato ou Boato é um jogo simples de perguntas e respostas do tipo Verdadeiro ou Falso, desenvolvido com HTML, CSS e JavaScript, com o objetivo de praticar o uso de APIs na linguagem — e também para se divertir com os amigos!

Jogue agora: [fato-ou-boato.vercel.app](https://fato-ou-boato.vercel.app)

## Como Funciona

1. A cada vez que o jogo é iniciado, ele faz uma requisição para a API [OpenTDB](https://opentdb.com/api_config.php), que retorna 20 perguntas do tipo Verdadeiro ou Falso, com categorias aleatórias.

2. As perguntas são originalmente em inglês, então o jogo utiliza a API [MyMemory Translation](https://mymemory.translated.net/) para traduzi-las automaticamente para o português brasileiro.

3. O jogador deve responder "Fato" (Verdadeiro) ou "Boato" (Falso) para cada uma.

Atenção: Como a tradução é feita por uma API gratuita, ela pode conter erros ou inconsistências.

## Como Executar

### 1. Clone o repositório:
```bash
git clone https://github.com/rafaelwnk/Fato-ou-Boato.git
cd Fato-ou-Boato
```

### 2. Abra o arquivo index.html em qualquer navegador.
```bash
Nenhuma instalação é necessária, tudo roda no navegador.
```

## Observações

As perguntas são geradas de forma aleatória, então cada partida será diferente.

A qualidade da tradução depende da resposta da API e pode conter erros.

## Contribuições

Se você tiver alguma sugestão de melhoria, ideia nova ou perceber algo que pode ser ajustado, será muito bem-vinda. O objetivo aqui é aprender e evoluir, então toda contribuição faz diferença.