"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">





      <style jsx>{`
        :global(html, body){
          margin:0;
          padding:0;
          background: linear-gradient(180deg, #7f00ff, #e91ef0, #6dd5fa);
          font-family: Arial, sans-serif;
        }

        .container{
          min-height:100vh;
          width:100%;
          max-width:1200px;
          margin:0 auto;
          color:white;
          display:flex;
          flex-direction:column;
          align-items:center;
        }

        /* HEADER */
        .header{
          width:100%;
          max-width:1200px;
          margin:0 auto;
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:20px;
        }

        .logo{
          display:flex;
          align-items:center;
          gap:15px;
          font-size:30px;
          font-weight:bold;
        }

        .logo img {
        filter: drop-shadow(0 0 12px rgba(221, 42, 221, 0.4));
        border-radius: 50%; /* macht das Bild rund/oval */
        background: transparent; /* sicherstellen, dass kein Hintergrund eingefärbt wird */
       }

        .auth-buttons{
          display:flex;
          gap:10px;
        }

        /* Buttons & CTA */
        .login, .register, .cta button {
          background: #b00db68c;
          border: none;
          padding: 16px 32px;
          border-radius: 16px;
          color: white;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          transition: 0.3s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .login:hover, .register:hover, .cta button:hover {
          background: #3cd9ee9d;
          transform: translateY(-6px);
        }

        /* HERO */
        .hero{
          text-align:center;
          max-width:800px;
          margin-bottom:80px;
        }

        .hero h1{
          font-size:48px;
          margin-bottom:20px;
        }

        .hero p{
          font-size:20px;
          color: #e2e8f0;
        }

        /* FEATURES */
        .features{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:25px;
          max-width:1000px;
          width:100%;
          margin-bottom:80px;
        }

        .card{
          background: #b00db68c;
          padding:25px;
          border-radius:16px;
          transition:0.3s;
          text-align:center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .card:hover{
          transform:translateY(-6px);
          background: #3cd9ee9d;
        }

        .card h3{
          margin-bottom:10px;
        }

        .card p{
          color: #e2e8f0;
        }

        /* CTA */
        .cta{
          text-align:center;
          margin-bottom:60px;
        }

        .cta h2{
          font-size:30px;
          margin-bottom:20px;
        }

        /* FOOTER */
        footer{
          opacity:0.6;
          margin-top:30px;
        }

      `}</style>

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <Image
            src="/skillexchange2.0.png"
            alt="SkillExchange Logo"
            width={240}
            height={40}
            style={{ objectFit: 'contain' }} // verhindert Verzerrung
          />
          SkillExchange
        </div>

        <div className="auth-buttons">
          <Link href="/auth/login">
            <button className="login">Login</button>
          </Link>

          <Link href="/auth/sign-up">
            <button className="register">Registrieren</button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Teile dein Wissen. Lerne neue Skills.</h1>
        <p>
          SkillExchange verbindet Menschen die voneinander lernen möchten.
          Finde neue Fähigkeiten, teile dein Wissen und werde Teil einer
          Community die gemeinsam wächst.
        </p>
      </section>

     {/* FEATURES */}
<section className="features">
  <div className="card">
    <h3>🤝 Skills tauschen</h3>
    <p>
      Finde Menschen, die dir neue Fähigkeiten beibringen, oder teile dein eigenes Wissen.
      Egal ob Programmieren, Sprachen oder Hobbys – lerne voneinander und wachse gemeinsam.
    </p>
  </div>

  <div className="card">
    <h3>📅 Termine planen</h3>
    <p>
      Buche ganz einfach 30-minütige Mentoring-Sessions über den integrierten Kalender.
      Wähle verfügbare Zeiten aus oder lege selbst fest, wann du verfügbar bist.
    </p>
  </div>

  <div className="card">
    <h3>🌍 Community</h3>
    <p>
      Werde Teil einer aktiven Community, die sich gegenseitig unterstützt.
      Tausche dich aus, knüpfe neue Kontakte und lerne gemeinsam mit anderen.
    </p>
  </div>

  <div className="card">
    <h3>🚀 Neues entdecken</h3>
    <p>
      Entdecke neue Skills und Themen, die dich interessieren.
      Erweitere deinen Horizont und probiere Dinge aus, die du schon immer lernen wolltest.
    </p>
  </div>
</section>
     
      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Starte jetzt mit SkillExchange</h2>
        <Link href="/auth/sign-up">
          <button className="register">Jetzt Kostenlos Registrieren</button>
        </Link>
      </section>

      <footer>
        <p>© 2026 SkillExchange</p>
      </footer>
    </main>
  )
}