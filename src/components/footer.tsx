export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-brand-magenta to-brand-teal text-gray-800  shadow-[0_-8px_30px_rgba(0,0,0,0.25)]
      border-t border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4
                      flex flex-col md:flex-row
                      items-center justify-between gap-4">

        {/* Left */}
        <div className="text-sm">
          © {new Date().getFullYear()} SkillExchange
        </div>

        {/* Right */}
        <div className="flex gap-6 text-sm font-medium">
          <button className="relative group transition">
            Impressum
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-100 group-hover:w-full"></span>
          </button>

          <button className="relative group transition">
            Datenschutz
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full"></span>
          </button>

          <button className="relative group transition">
            Kontakt
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full"></span>
          </button>
        </div>

      </div>
    </footer>
  )
}