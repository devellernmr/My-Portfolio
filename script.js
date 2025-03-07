setTimeout(function () {
  const loader = document.querySelector(".loader-6");
  const frame = document.querySelector(".frame");
  const content = document.querySelector(".container");

  content.style.display = "block";

  if (loader) {
    loader.classList.add("fade-out"); // Add the fade-out class
    // Wait for the transition to complete before removing it
    loader.addEventListener("transitionend", function () {
      loader.style.display = "none"; // Remove from the document flow
      frame.style.width = "0px";
    });
  }

  const header = document.querySelector("header");
  if (header) {
    header.classList.add("fade-in");
  }

  const main = document.querySelector("main");
  if (main) {
    main.classList.add("fade-in");
  }

  content.classList.add("show");
}, 1750);

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-links");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.remove("active"); // Remove o ativo anterior
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active"); // Adiciona o ativo ao link correspondente
            }
          });
        }
      });
    },
    { threshold: 0.6 } // Define que 60% da seção precisa estar visível para ativar
  );
  sections.forEach((section) => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", function () {
  // Código de loader, animações de conteúdo, etc.

  // Código para a animação do canvas (apenas UMA vez)
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Ajusta o tamanho do canvas para a janela
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let lines = [];

  class Line {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.angle = Math.random() * Math.PI * 2;
      this.life = 0;
    }
    update() {
      this.life++;
      // Altera o ângulo suavemente para criar curvas
      this.angle += (Math.random() - 1) * 0.05;
      // Ajusta a velocidade com base no ângulo
      this.vx += Math.cos(this.angle) * 0.05;
      this.vy += Math.sin(this.angle) * 0.05;
      this.x += this.vx;
      this.y += this.vy;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgb(161, 98, 255, 0.7)";
      ctx.fill();
    }
  }

  function animate() {
    // Efeito de rastro: desenha um retângulo semitransparente
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Adiciona novas linhas se necessário
    if (lines.length < 30) {
      lines.push(new Line());
    }

    // Atualiza e desenha cada linha
    lines.forEach((line, index) => {
      line.update();
      line.draw();

      // Reseta a linha se sair da tela ou exceder o tempo de vida
      if (
        line.x < 0 ||
        line.x > canvas.width ||
        line.y < 0 ||
        line.y > canvas.height ||
        line.life > 500
      ) {
        lines[index] = new Line();
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
});

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("logoNav");
  const originalText = "Ll";
  const newText = "LeoEller";
  let typingTimeout;

  textElement.addEventListener("mouseenter", () => {
    let index = 0;
    textElement.textContent = ""; // Limpa o texto atual

    function type() {
      if (index < newText.length) {
        textElement.textContent += newText[index];
        index++;
        typingTimeout = setTimeout(type, 80); // Ajusta a velocidade
      }
    }
    type();
  });

  textElement.addEventListener("mouseleave", () => {
    clearTimeout(typingTimeout); // Para a animação se sair rápido
    textElement.textContent = originalText; // Retorna ao original
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("myAudio");
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const volumeControl = document.getElementById("volume");

  // Iniciar o áudio automaticamente
  function playAudio() {
    audio.play().catch((error) => {
      console.log(
        "Autoplay bloqueado pelo navegador. O usuário precisa interagir."
      );
    });
  }

  // Play e Pause
  playButton.addEventListener("click", () => {
    audio.play();
  });

  pauseButton.addEventListener("click", () => {
    audio.pause();
  });

  // Controle de volume
  volumeControl.addEventListener("input", (event) => {
    audio.volume = event.target.value;
  });

  // Tentar tocar o áudio ao carregar a página
  playAudio();
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.querySelector(".nav-list");
  
    menuToggle.addEventListener("click", function () {
      navList.classList.toggle("active");
    });
  });
  