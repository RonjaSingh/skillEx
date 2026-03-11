"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="main-container">
      <header className="header">
        <Image src="/skillexchange2.0.png" alt="Logo" width={110} height={110} />
        <h1>SkillExchange</h1>
      </header>

      <section className="hero">
        <h2>Lerne Skills. Teile Wissen. Finde Menschen.</h2>
        <p>
          SkillExchange verbindet Menschen, die voneinander lernen möchten.
          Biete deine Fähigkeiten an oder finde jemanden, der dir etwas Neues beibringt.
        </p>
      </section>

      <section className="features">
        <div className="card">
          <h3>🤝 Skills tauschen</h3>
          <p>Finde Lernpartner und tausche deine Fähigkeiten aus.</p>
        </div>

        <div className="card">
          <h3>📅 Termin Kalender</h3>
          <p>Plane Sessions. Frei = grün, Gebucht = rot.</p>
        </div>

        <div className="card">
          <h3>🌍 Community</h3>
          <p>Entdecke neue Menschen, tausche Wissen und wachse gemeinsam.</p>
        </div>

        <div className="card">
          <h3>🚀 Wachstum</h3>
          <p>Entwickle neue Fähigkeiten und erweitere dein Wissen.</p>
        </div>
      </section>

      <section className="video-section">
        <h2>So funktioniert SkillExchange</h2>
        <video className="video" controls>
          <source src="/demo.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="cta">
        <button>Jetzt anmelden</button>
      </section>

      <footer>
        <p>© 2025 SkillExchange</p>
      </footer>

      <style jsx>{`
        .main-container {
          font-family: Arial, sans-serif;
          background: linear-gradient(180deg,#0f172a,#020617);
          color: white;
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-bottom: 50px;
        }

        .header h1 {
          font-size: 42px;
          letter-spacing: 1px;
        }

        .hero {
          margin-bottom: 60px;
        }

        .hero h2 {
          font-size: 32px;
          margin-bottom: 20px;
        }

        .hero p {
          font-size: 18px;
          color: #cbd5f5;
          max-width: 600px;
          margin: auto;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          margin-bottom: 60px;
          width: 100%;
          max-width: 900px;
        }

        .card {
          background: #1e293b;
          padding: 25px;
          border-radius: 14px;
          transition: 0.3s;
          text-align: center;
        }

        .card:hover {
          transform: translateY(-6px);
          background: #334155;
        }

        .card h3 {
          margin-bottom: 10px;
        }

        .card p {
          color: #cbd5f5;
        }

        .video-section {
          margin-bottom: 60px;
        }

        .video {
          width: 100%;
          max-width: 750px;
          border-radius: 12px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }

        .cta {
          margin-top: 40px;
        }

        .cta button {
          background: #2563eb;
          border: none;
          padding: 14px 30px;
          border-radius: 10px;
          font-size: 16px;
          cursor: pointer;
          color: white;
          transition: 0.2s;
        }

        .cta button:hover {
          background: #1d4ed8;
          transform: scale(1.05);
        }

        footer {
          margin-top: 40px;
          opacity: 0.6;
        }
      `}</style>
    </main>
  );
}