# Pedido de Casamento — Vídeo Roteirizado

Experiência cinematográfica em tela cheia para o pedido de casamento com balões.

## Como usar

1. Abra o terminal na pasta do projeto
2. Inicie um servidor local:
   ```
   npx serve .
   ```
3. Acesse `http://localhost:3000` no navegador
4. Clique em **Iniciar** e use tela cheia (F11)

**Teste rápido:** acesse `http://localhost:3000?demo` — balões de 5s em vez de 30s.

## Personalizar

Tudo fica em **`config.js`**. Edite apenas esse arquivo para ajustar frases, tempos e imagens.

### Música
Coloque seu arquivo MP3 em `assets/music/` e atualize:
```js
musica: "assets/music/sua-musica.mp3",
volumeMusica: 0.4,
```

### Imagens
Substitua os arquivos em `assets/images/` pelas suas fotos (JPG ou PNG).  
Mantenha os mesmos nomes ou altere os caminhos no `config.js`.

### Frases e roteiro
Cada item do array `roteiro` é uma cena:

| Tipo        | O que faz                                      |
|-------------|------------------------------------------------|
| `narrativa` | Mostra frase + imagem por X segundos           |
| `balao`     | "Estoure o balão N" com timer de 30 segundos   |
| `final`     | Imagem final + música (encerra o vídeo)        |

Exemplo — alterar uma frase:
```js
{
  tipo: "narrativa",
  frase: "Sua frase personalizada aqui...",
  imagem: "assets/images/01.jpg",
  duracao: 10000,  // milissegundos (10 segundos)
},
```

Exemplo — tempo dos balões:
```js
tempoBalao: 30000,  // 30 segundos (padrão)
```

### Balão 5 (aliança)
A cena especial já está configurada com `especial: true` e a subfrase  
*"Dentro dele está a aliança..."*. Edite em `config.js` na cena do balão 5.

## Estrutura do roteiro atual

1. 3 frases narrativas românticas
2. **Balão 1** (30s)
3. Frase narrativa
4. **Balão 2** (30s)
5. Frase narrativa
6. **Balão 3** (30s)
7. Frase narrativa
8. **Balão 4** (30s)
9. Frase narrativa
10. **Balão 5** — aliança (30s)
11. "Você aceita casar comigo?"
12. **Final** — imagem + música

## Dicas para o dia

- Teste com `?demo` antes do evento
- Use um notebook conectado à TV ou projetor
- Coloque a aliança no balão 5 antes de iniciar
- Tenha alguém para estourar os balões no tempo certo (ou faça você mesmo)
