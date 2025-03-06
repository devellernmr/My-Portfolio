// App.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './styles/styles.css';
import './styles/header.css';
import './styles/loading.css';
import './styles/main.css';
import './styles/animations.css';

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Função para ajustar o tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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
        // Alteração suave do ângulo para curvas
        this.angle += (Math.random() - 0.5) * 0.05;
        // Ajusta a velocidade conforme o ângulo
        this.vx += Math.cos(this.angle) * 0.05;
        this.vy += Math.sin(this.angle) * 0.05;
        this.x += this.vx;
        this.y += this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }
    }

    const animate = () => {
      // Efeito de rastro: desenha um retângulo semitransparente
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Adiciona novas linhas se necessário
      if (lines.length < 100) {
        lines.push(new Line());
      }

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
    };

    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} id="canvas" />;
};

const Loader = ({ onFinish }) => {
  // O loader desaparece após 1750ms
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1750);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="frame">
      <div className="grid">
        <div>
          <span className="loader-6"></span>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="fade-in">
      <nav>
        <div className="logo">
          <h1>
            <a href="#">Logo</a>
          </h1>
        </div>
        <ul>
          <li className="navbar-links">
            <a href="#home" className="active">
              home
            </a>
          </li>
          <li className="navbar-links">
            <a href="#project">projects</a>
          </li>
          <li className="navbar-links">
            <a href="#about">about</a>
          </li>
          <li className="navbar-links">
            <a href="#contact">contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="main-container-hero">
        <h1 className="hero-text">
          <span>D</span>
          <span>e</span>
          <span>s</span>
          <span>e</span>
          <span>n</span>
          <span>v</span>
          <span>o</span>
          <span>l</span>
          <span>v</span>
          <span>e</span>
          <span>d</span>
          <span>o</span>
          <span>r</span>
          <br />
          <span>F</span>
          <span>r</span>
          <span>o</span>
          <span>n</span>
          <span>t</span> - <span>E</span>
          <span>n</span>
          <span>d</span>
          <br />
        </h1>
        <h2 className="hero-text2">Leo Eller</h2>
        <p className="hero-p">
          Olá! Sou um programador Front-End, Utilizo as ferraments <br />
          Html, CSS, JavaScript, React e também python.
        </p>
      </div>
    </section>
  );
};

const Main = () => {
  return (
    <main className="fade-in">
      <Hero />
      {/* Outras seções podem ser adicionadas aqui */}
    </main>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  // Função callback para finalizar o loader
  const handleLoaderFinish = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="container show">
      {/* Canvas de fundo */}
      <CanvasBackground />
      {/* Exibe o loader enquanto o estado "loading" for verdadeiro */}
      {loading && <Loader onFinish={handleLoaderFinish} />}
      <Header />
      <Main />
    </div>
  );
};

export default App;
