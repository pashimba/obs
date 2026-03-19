import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  Link2,
  Settings,
  Plus,
  MoreVertical,
  MonitorPlay,
  Video,
  Layers,
  Sparkles,
  Gamepad2,
  Mic2
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen w-full flex bg-slate-950 text-white font-sans selection:bg-indigo-500/30 overflow-hidden">

      {/* SIDEBAR MODERNO COMPACTO */}
      <aside className="w-20 md:w-24 border-r border-slate-800/60 bg-[#0c0f17] flex flex-col items-center py-6 flex-shrink-0 z-20">

        {/* Logo */}
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-10 shadow-lg shadow-indigo-600/20 cursor-pointer">
          <Video className="w-6 h-6 text-white" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-6 flex-1 w-full">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
          <SidebarItem icon={<FolderKanban />} label="Proyectos" />
          <SidebarItem icon={<LayoutTemplate />} label="Plantillas" />
          <SidebarItem icon={<Link2 />} label="Conexiones" />
        </nav>

        {/* Footer / Settings */}
        <div className="mt-auto flex flex-col items-center space-y-6 w-full">
          <SidebarItem icon={<Settings />} label="Ajustes" />
          <div className="w-10 h-10 rounded-full border-2 border-slate-700 p-0.5 cursor-pointer hover:border-indigo-500 transition-colors">
            <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-sm font-bold text-purple-400">
              U
            </div>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden relative scroll-smooth">

        {/* Ambient Glow / Opcional para dar fondo muy sutil */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

        <div className="max-w-[1600px] mx-auto w-full p-6 md:p-10 relative z-10">

          {/* HERO PANEL */}
          <section className="bg-gradient-to-br from-[#131720] to-[#0d1017] border border-slate-800/80 rounded-2xl p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between mb-12 shadow-xl shadow-black/20">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                Bienvenido de vuelta a tu Estudio, <span className="text-indigo-400">Creador</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base font-medium max-w-2xl">
                Tu centro de control centralizado para gestionar escenas, organizar streams profesionales y descubrir nuevas plantillas de transmisión.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8 xl:mt-0 w-full xl:w-auto">
              <button className="w-full sm:w-auto px-6 py-3 bg-transparent border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 rounded-xl font-semibold transition-colors flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Explorar Plantillas
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/25 active:scale-95">
                <Plus className="w-5 h-5 mr-2" />
                Nuevo Proyecto
              </button>
            </div>
          </section>

          {/* SECCIÓN "TUS TRANSMISIONES" */}
          <section className="mb-14">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Tus Transmisiones</h2>
              <button className="text-sm font-semibold text-gray-400 hover:text-indigo-400 transition-colors">
                Ver todos
              </button>
            </div>

            {/* Grid Proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <ProjectCard
                title="Torneo FPS Finals"
                date="Actualizado hace 2 horas"
                status="ready"
              />
              <ProjectCard
                title="Podcast #42 - Frontend"
                date="Actualizado hace 3 días"
                status="draft"
              />
              <ProjectCard
                title="Lanzamiento Producto Live"
                date="Actualizado hace 1 semana"
                status="draft"
              />
            </div>
          </section>

          {/* SECCIÓN "KITS DE ESCENAS" */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Layers className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Kits de Escenas</h2>
            </div>

            {/* Horizontal List / Slim Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KitCard icon={<Gamepad2 className="w-5 h-5 text-purple-400" />} title="Kit Gaming Neon" subtitle="Overlay Completo" />
              <KitCard icon={<Mic2 className="w-5 h-5 text-indigo-400" />} title="Kit Entrevista Minimalista" subtitle="2 Personas + Chat" />
              <KitCard icon={<MonitorPlay className="w-5 h-5 text-teal-400" />} title="Presentación Tech" subtitle="Webcam + Slides" />
              <KitCard icon={<LayoutTemplate className="w-5 h-5 text-orange-400" />} title="Just Chatting Cozy" subtitle="Escena principal cálida" />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// ------ COMPONENTES SECUNDARIOS ------ //

function SidebarItem({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer w-full px-2">
      <div className={`p-3 rounded-xl transition-all duration-300 transform group-hover:scale-110 mb-1.5
        ${active ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
        {React.cloneElement(icon, { className: 'w-6 h-6 stroke-[1.5]' })}
      </div>
      <span className={`text-[10px] font-semibold tracking-wide ${active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ title, date, status }) {
  const isReady = status === 'ready';

  return (
    <div className="bg-[#131720] border border-slate-800 hover:border-slate-600 rounded-2xl overflow-hidden group transition-all duration-300 shadow-md flex flex-col cursor-pointer">

      {/* Área del Lienzo (Monitor) */}
      <div className="relative w-full aspect-video bg-[#0c0f17] border-b border-slate-800/80 p-3 flex flex-col items-center justify-center overflow-hidden">

        {/* Subtle grid/texture background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        {/* Glow central al hacer hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent transition-opacity duration-500"></div>

        <MonitorPlay className="w-10 h-10 text-slate-800 group-hover:text-indigo-500/60 transition-colors z-10" strokeWidth={1.5} />

        {/* Badge Flotante */}
        {isReady ? (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-widest rounded-lg backdrop-blur-md flex items-center shadow-lg">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            Listo para Live
          </div>
        ) : (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-800/80 border border-slate-700/50 text-slate-300 text-[10px] uppercase font-bold tracking-widest rounded-lg backdrop-blur-md shadow-sm">
            Borrador
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="p-4 flex items-start justify-between bg-[#131720]">
        <div className="pr-4">
          <h3 className="text-white font-semibold text-sm md:text-base mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">{title}</h3>
          <p className="text-gray-500 text-xs font-medium">{date}</p>
        </div>
        <button className="p-1.5 text-gray-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}

function KitCard({ icon, title, subtitle }) {
  return (
    <div className="bg-[#131720] border border-slate-800 hover:border-indigo-500/40 p-4 rounded-xl flex flex-row items-center cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-indigo-500/5">
      <div className="w-12 h-12 bg-[#0c0f17] border border-slate-800/80 rounded-lg mr-4 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all">
        {icon}
      </div>
      <div className="overflow-hidden">
        <h4 className="text-sm font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">{title}</h4>
        <p className="text-[11px] font-medium text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}
