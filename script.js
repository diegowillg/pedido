(() => {
  "use strict";

  // ── Elementos ──
  const el = {
    telaInicio: document.getElementById("tela-inicio"),
    btnIniciar: document.getElementById("btn-iniciar"),
    player: document.getElementById("player"),
    camadaA: document.getElementById("camada-a"),
    camadaB: document.getElementById("camada-b"),
    textoContainer: document.getElementById("texto-container"),
    textoFrase: document.getElementById("texto-frase"),
    textoSubfrase: document.getElementById("texto-subfrase"),
    balaoContainer: document.getElementById("balao-container"),
    balaoCirculo: document.getElementById("balao-circulo"),
    balaoNumero: document.getElementById("balao-numero"),
    balaoFrase: document.getElementById("balao-frase"),
    balaoSubfrase: document.getElementById("balao-subfrase"),
    balaoTimerBarra: document.getElementById("balao-timer-barra"),
    balaoContagem: document.getElementById("balao-contagem"),
    finalContainer: document.getElementById("final-container"),
    progressoBarra: document.getElementById("progresso-geral-barra"),
    audio: document.getElementById("audio-musica"),
  };

  let camadaAtiva = el.camadaA;
  let camadaInativa = el.camadaB;
  let cenaAtual = 0;
  let timerBalao = null;
  let musicaFinalIniciada = false;
  let totalCenas = CONFIG.roteiro.length;

  // Modo demo: acesse com ?demo para tempos reduzidos (teste rápido)
  const modoDemo = new URLSearchParams(window.location.search).has("demo");
  if (modoDemo) {
    CONFIG.tempoBalao = 5000;
    CONFIG.tempoNarrativa = 3000;
    CONFIG.roteiro.forEach((c) => {
      if (c.tipo === "narrativa" && c.duracao) c.duracao = 3000;
    });
  }

  // ── Utilitários ──
  function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function resolverUrl(caminho) {
    if (!caminho) return caminho;
    return caminho.split("/").map((part) => encodeURIComponent(part)).join("/");
  }

  function aplicarImagem(camada, url, posicao) {
    const blur = camada.querySelector(".camada-blur");
    const foto = camada.querySelector(".camada-foto");
    blur.style.backgroundImage = `url('${url}')`;
    foto.src = url;
    foto.style.objectPosition = posicao || "center center";
    foto.style.animation = "none";
    void foto.offsetWidth;
    foto.style.animation = "";
  }

  function trocarImagem(url, posicao) {
    const urlCodificada = resolverUrl(url);
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        aplicarImagem(camadaInativa, urlCodificada, posicao);
        camadaInativa.classList.add("ativa");
        camadaAtiva.classList.remove("ativa");
        [camadaAtiva, camadaInativa] = [camadaInativa, camadaAtiva];
        setTimeout(resolve, 2000);
      };
      img.onerror = () => {
        const blur = camadaInativa.querySelector(".camada-blur");
        const foto = camadaInativa.querySelector(".camada-foto");
        blur.style.backgroundImage = "";
        foto.removeAttribute("src");
        camadaInativa.style.background = gerarGradiente(cenaAtual);
        camadaInativa.classList.add("ativa");
        camadaAtiva.classList.remove("ativa");
        [camadaAtiva, camadaInativa] = [camadaInativa, camadaAtiva];
        setTimeout(resolve, 2000);
      };
      img.src = urlCodificada;
    });
  }

  function gerarGradiente(indice) {
    const gradientes = [
      "linear-gradient(135deg, #1a0a2e 0%, #3d1a5c 50%, #0a0a0f 100%)",
      "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      "linear-gradient(135deg, #200122 0%, #6f0000 100%)",
      "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
      "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      "linear-gradient(135deg, #1a0533 0%, #4a1040 100%)",
      "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #16213e 100%)",
    ];
    return gradientes[indice % gradientes.length];
  }

  function atualizarProgresso() {
    const pct = ((cenaAtual + 1) / totalCenas) * 100;
    el.progressoBarra.style.width = `${pct}%`;
  }

  function ocultarTodos() {
    el.textoContainer.classList.remove("visivel");
    el.textoContainer.classList.add("oculto");
    el.balaoContainer.classList.remove("visivel");
    el.balaoContainer.classList.add("oculto");
    el.finalContainer.classList.remove("visivel");
    el.finalContainer.classList.add("oculto");
  }

  // ── Cenas ──
  const overlay = document.querySelector(".overlay");

  function definirOverlay(modo) {
    overlay.classList.remove("escuro", "claro");
    if (modo === "escuro") overlay.classList.add("escuro");
    if (modo === "claro") overlay.classList.add("claro");
  }

  async function cenaNarrativa(cena) {
    ocultarTodos();
    definirOverlay("normal");
    await trocarImagem(cena.imagem, cena.posicao);

    el.textoFrase.textContent = cena.frase;
    el.textoSubfrase.textContent = cena.subfrase || "";
    el.textoContainer.classList.remove("oculto");
    await esperar(100);
    el.textoContainer.classList.add("visivel");

    await esperar(cena.duracao || CONFIG.tempoNarrativa);

    el.textoContainer.classList.remove("visivel");
    await esperar(1200);
  }

  async function cenaBalao(cena) {
    ocultarTodos();
    definirOverlay("normal");

    el.camadaA.classList.remove("ativa");
    el.camadaB.classList.remove("ativa");
    el.player.classList.add("modo-balao");

    el.balaoNumero.textContent = cena.numero;
    el.balaoFrase.textContent = cena.frase;
    el.balaoSubfrase.textContent = cena.subfrase || "";
    el.balaoCirculo.classList.toggle("especial", !!cena.especial);
    el.balaoTimerBarra.style.transform = "scaleX(1)";

    el.balaoContainer.classList.remove("oculto");
    await esperar(100);
    el.balaoContainer.classList.add("visivel");

    const duracao = CONFIG.tempoBalao;
    const inicio = Date.now();

    await new Promise((resolve) => {
      function tick() {
        const elapsed = Date.now() - inicio;
        const restante = Math.max(0, duracao - elapsed);
        const pct = restante / duracao;

        el.balaoTimerBarra.style.transform = `scaleX(${pct})`;
        el.balaoContagem.textContent = `${Math.ceil(restante / 1000)}s`;

        if (restante <= 0) {
          resolve();
        } else {
          timerBalao = requestAnimationFrame(tick);
        }
      }
      tick();
    });

    el.balaoContainer.classList.remove("visivel");
    el.player.classList.remove("modo-balao");
    await esperar(600);
  }

  function iniciarMusicaFinal() {
    if (musicaFinalIniciada || !CONFIG.musicaFinal) return;
    musicaFinalIniciada = true;

    el.audio.loop = true;
    el.audio.src = resolverUrl(CONFIG.musicaFinal);
    el.audio.volume = CONFIG.volumeMusicaFinal ?? CONFIG.volumeMusica;
    el.audio.play().catch(() => {});
  }

  function configurarMusica() {
    el.audio.addEventListener("ended", () => {
      if (!musicaFinalIniciada) iniciarMusicaFinal();
    });

    if (CONFIG.musica) {
      el.audio.loop = false;
      el.audio.src = resolverUrl(CONFIG.musica);
      el.audio.volume = CONFIG.volumeMusica;
      el.audio.play().catch(() => {});
    }
  }
  async function cenaFinal(cena) {
    ocultarTodos();
    definirOverlay("claro");

    overlay.style.opacity = "0";
    el.progressoBarra.parentElement.style.opacity = "0";

    await trocarImagem(cena.imagem || CONFIG.imagemFinal, cena.posicao);

    el.finalContainer.classList.remove("oculto");
    await esperar(500);
    el.finalContainer.classList.add("visivel");
  }

  // ── Motor principal ──
  async function executarRoteiro() {
    for (cenaAtual = 0; cenaAtual < totalCenas; cenaAtual++) {
      const cena = CONFIG.roteiro[cenaAtual];
      atualizarProgresso();

      switch (cena.tipo) {
        case "narrativa":
          await cenaNarrativa(cena);
          break;
        case "balao":
          await cenaBalao(cena);
          break;
        case "final":
          await cenaFinal(cena);
          return;
      }
    }
  }

  // ── Iniciar ──
  async function iniciar() {
    el.telaInicio.classList.add("saindo");
    await esperar(1200);
    el.telaInicio.classList.add("oculto");
    el.player.classList.remove("oculto");

    configurarMusica();

    try {
      await document.documentElement.requestFullscreen();
    } catch (_) {}

    await executarRoteiro();
  }

  el.btnIniciar.addEventListener("click", iniciar);

  // Restaura cursor no botão
  el.btnIniciar.style.cursor = "pointer";
  document.querySelector(".inicio-dica").style.cursor = "default";
})();
