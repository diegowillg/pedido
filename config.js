/**
 * ═══════════════════════════════════════════════════════════════
 *  CONFIGURAÇÃO DO PEDIDO DE CASAMENTO
 *  Edite este arquivo para personalizar frases, imagens e tempos
 * ═══════════════════════════════════════════════════════════════
 */

const CONFIG = {
  // Música durante o vídeo
  musica: "assets/music/Easy ♡ (Tradução_Legendado) música internacional românticamp3.mp3",

  // Música da tela final (quando o vídeo termina)
  musicaFinal: "assets/music/RAYA -  ONLY YOU  -TRADUÇÃO ‐.mp3",

  imagemFinal: "assets/images/foto3_4k_full.png",
  volumeMusica: 0.45,
  volumeMusicaFinal: 0.45,

  tempoBalao: 30000,
  tempoNarrativa: 10000,

  roteiro: [
    {
      tipo: "narrativa",
      frase: "Desde o primeiro dia em que te vi, soube que minha vida tinha mudado para sempre...",
      imagem: "assets/images/imagem_6_v2.png",
    },
    {
      tipo: "narrativa",
      frase: "Cada risada, cada viagem, cada instante contigo virou minha história favorita.",
      imagem: "assets/images/Sem título.png",
    },
    {
      tipo: "narrativa",
      frase: "Você me fez acreditar no amor de um jeito que eu nunca imaginei possível.",
      imagem: "assets/images/imagem_padronizada.png",
    },
    {
      tipo: "balao",
      numero: 1,
      frase: "Estoure o balão 1",
    },
    {
      tipo: "narrativa",
      frase: "Lembro de cada olhar, cada abraço, de tudo que me aqueceu a alma.",
      imagem: "assets/images/imagem_4_padrao.png",
    },
    {
      tipo: "balao",
      numero: 2,
      frase: "Estoure o balão 2",
    },
    {
      tipo: "narrativa",
      frase: "Com você aprendi que o amor verdadeiro é silencioso, constante e profundo.",
      imagem: "assets/images/imagem_6_natural.png",
    },
    {
      tipo: "balao",
      numero: 3,
      frase: "Estoure o balão 3",
    },
    {
      tipo: "narrativa",
      frase: "Quero envelhecer ao seu lado e viver cada amanhecer com você.",
      imagem: "assets/images/imagem_3_padrao.png",
    },
    {
      tipo: "balao",
      numero: 4,
      frase: "Estoure o balão 4",
    },
    {
      tipo: "narrativa",
      frase: "Hoje, diante de tudo que vivemos juntos, tenho uma pergunta para fazer...",
      imagem: "assets/images/foto2_4k_full.png",
    },
    {
      tipo: "balao",
      numero: 5,
      frase: "Estoure o balão 5",
      especial: true,
    },
    {
      tipo: "final",
      imagem: "assets/images/foto3_4k_full.png",
    },
  ],
};
