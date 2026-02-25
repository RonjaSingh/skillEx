export default function Footer() {
  return (
    <footer className="w-full  bg-gray-50 text-sm text-black bg-gradient-to-r from-brand-magenta to-brand-teal">
      <div className="max-w-6xl mx-auto px-4 py-1 flex flex-col md:flex-row items-center justify-between gap-1">

        <div>
          © {new Date().getFullYear()} SkillExchange
        </div>

        <div className="flex gap-4">
          <button className="hover:text-black transition">Impressum</button>
          <button className="hover:text-black transition">Datenschutz</button>
          <button className="hover:text-black transition">Kontakt</button>
        </div>

      </div>
    </footer>
  );
}
