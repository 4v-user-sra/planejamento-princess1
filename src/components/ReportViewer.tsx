import React, { useState } from "react"
import { presentationData } from "../data"
import { ArrowUpRight, ArrowRight, Target, Lightbulb, PlayCircle, Star, Calendar, CheckCircle2, ChevronRight, FileSpreadsheet, Network, FileText, Video, Rocket, ExternalLink, AlertTriangle, ShoppingCart, Ban, RefreshCw, BarChart2, TrendingUp, DollarSign } from "lucide-react"

const themeMap: Record<string, string> = {
  "01_capa": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "02_recapitulando_jornada": "bg-zinc-200 text-zinc-900 border-zinc-300",
  "03_sumario": "bg-white text-zinc-900 border-zinc-200",
  "04_divisor_secao_1": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "05_analise_social": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "06_analise_site": "bg-zinc-100 text-zinc-900 border-zinc-200",
  "07_analise_meta": "bg-white text-zinc-900 border-zinc-200",
  "08_diferenciais": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "09_divisor_secao_2": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "09b_benchmarking_leggera": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "10_benchmarking_1": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "11_benchmarking_2": "bg-white text-zinc-900 border-zinc-200",
  "11b_posicionamento_matriz": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "12_moodboard": "bg-zinc-200 text-zinc-900 border-zinc-300",
  "14_persona_1": "bg-zinc-900 text-zinc-300 border-zinc-800",
  "15_persona_2": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "17_objetivo_smart": "bg-black text-zinc-300 border-zinc-900",
  "13_estrategia": "bg-white text-zinc-900 border-zinc-200",
  "13_estrategia_campanhas": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "21_criativos": "bg-zinc-100 text-zinc-900 border-zinc-200",
  "18_drawflow_funil": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "19_cronograma": "bg-white text-zinc-900 border-zinc-200",
  "20_plano_midia": "bg-zinc-50 text-zinc-900 border-zinc-200"
}

// Helper to determine section background based on type
function getSectionTheme(id: string, type: string) {
  if (themeMap[id]) return themeMap[id]
  
  if (['competitor_benchmark', 'campaign_strategy_boxes'].includes(type)) return 'bg-zinc-100 text-zinc-900 border-zinc-200'
  if (['moodboard_identity', 'spreadsheet_placeholder'].includes(type)) return 'bg-white text-zinc-900 border-zinc-200'
  if (['process_timeline', 'funnel_flow_diagram', 'visual_drawflow'].includes(type)) return 'bg-black text-zinc-300 border-zinc-900'
  if (['smart_goal_okr'].includes(type)) return 'bg-zinc-900 text-zinc-300 border-zinc-800'
  return 'bg-zinc-950 text-zinc-300 border-zinc-900'
}

function SectionWrapper({ children, themeClass }: { children: React.ReactNode; themeClass: string; key?: React.Key }) {
  return (
    <section className={`w-full min-h-[60vh] flex flex-col justify-center px-8 md:px-24 py-24 ${themeClass} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        {children}
      </div>
    </section>
  )
}

function RenderBlock({ slide }: { slide: any }) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const type = slide.slide_type
  const d = slide.content_slots
  const themeClass = getSectionTheme(slide.id, type)
  const isLight = themeClass.includes('bg-white') || themeClass.includes('bg-zinc-50') || themeClass.includes('bg-zinc-100') || themeClass.includes('bg-zinc-200')

  let titleColor = isLight ? "text-zinc-900" : "text-white"
  let subtitleColor = isLight ? "text-zinc-600" : "text-zinc-400"
  let cardBg = isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900 border-zinc-800"

  if (type === 'cover') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <h3 className="text-xl md:text-2xl font-serif text-zinc-400 tracking-widest uppercase">{d.logo_agencia}</h3>
        <h1 className="text-5xl md:text-7xl font-bold text-white max-w-4xl leading-tight tracking-tight">
          {d.titulo_principal}
        </h1>
        <div className="h-px w-24 bg-red-600 my-8"></div>
        <h2 className="text-3xl md:text-4xl font-light text-zinc-300 font-serif italic">
          {d.subtitulo}
        </h2>
        <div className="pt-16 flex flex-col items-center gap-4 text-zinc-500">
          {d.data_apresentacao && <p className="text-lg tracking-wide uppercase">{d.data_apresentacao}</p>}
          {d.legenda_rodape && <p className="max-w-md">{d.legenda_rodape}</p>}
        </div>
      </div>
    )
  }

  if (type === 'process_timeline') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-16 text-center`}>{d.titulo}</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-4 bottom-0 w-px bg-zinc-300 md:hidden" />
          <div className="absolute top-4 left-0 right-0 h-px bg-zinc-300 hidden md:block" />
          
          {d.etapas_timeline?.map((etapa: string, i: number) => {
            const isCurrent = etapa === d.etapa_atual_destacada
            return (
              <div key={i} className="relative z-10 flex flex-col items-center gap-4 flex-1 px-2 my-4 md:my-0">
                <div className="h-8 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center relative z-10 ${isCurrent ? 'border-red-600 bg-white' : 'border-zinc-300 bg-white'}`}>
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-red-600" />}
                  </div>
                </div>
                <span className={`text-sm md:text-base font-medium text-center ${isCurrent ? 'text-red-600' : subtitleColor}`}>
                  {etapa}
                </span>
              </div>
            )
          })}
        </div>
        <div className="mt-20 text-center">
          {d.label_fase_rodape && (
            <p className={`inline-block px-6 py-2 rounded-full ${isLight ? 'bg-red-100 text-red-700 border-red-200' : 'bg-red-950/30 text-red-400 border-red-900/50'} mb-4`}>
              {d.label_fase_rodape}
            </p>
          )}
          {d.anotacoes_contextuais && (
            <p className={`${subtitleColor} max-w-xl mx-auto`}>{d.anotacoes_contextuais}</p>
          )}
        </div>
      </div>
    )
  }

  if (type === 'agenda_toc') {
    return (
      <div className="flex flex-col md:flex-row gap-12 items-start max-w-5xl mx-auto w-full">
        <div className="w-full md:w-1/3 pt-4">
           <h2 className={`text-4xl font-bold ${titleColor} sticky top-32`}>{d.titulo}</h2>
        </div>
        <div className={`w-full md:w-2/3 flex flex-col gap-3 border-l ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pl-8 md:pl-12`}>
          {d.itens_agenda?.map((item: string, i: number) => (
            <div key={i} className="flex gap-6 group items-center transition-colors">
              <span className="text-xl font-bold text-red-600 font-mono w-6 text-right opacity-80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`text-xl font-medium ${titleColor} opacity-80 group-hover:opacity-100 transition-opacity`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'section_divider') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <Target className={`w-16 h-16 text-red-600 mb-8 opacity-80`} />
        <h2 className={`text-5xl font-bold ${titleColor} max-w-3xl leading-tight`}>{d.titulo_secao}</h2>
      </div>
    )
  }

  if (type === 'diagnostic_analysis') {
    return (
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col h-full justify-center">
          <h2 className={`text-4xl font-bold ${titleColor} mb-8`}>{d.titulo_slide}</h2>
          <div className="w-16 h-1 bg-red-600 mb-8"></div>
          
          {/* Sessão de Imagem / Print */}
          {(d.imagem_url || d.image_placeholder) && (
            <div className="flex flex-col gap-4">
              <div className={`mt-4 w-full rounded-2xl border-2 ${d.imagem_url ? (isLight ? 'border-zinc-200 shadow-xl' : 'border-zinc-800 shadow-2xl') : (isLight ? 'border-dashed border-zinc-300 bg-zinc-50' : 'border-dashed border-zinc-800 bg-zinc-900/50')} overflow-hidden flex items-center justify-center relative`}>
                 {d.imagem_url ? (
                    <img 
                      src={d.imagem_url} 
                      alt="Print da Plataforma" 
                      className="w-full h-auto object-contain cursor-pointer transition-transform hover:scale-[1.02]" 
                      style={{ maxHeight: '650px' }} 
                      onClick={() => setExpandedImage(d.imagem_url)}
                    />
                 ) : (
                    <div className="flex flex-col items-center justify-center text-center p-12 opacity-50 min-h-[250px]">
                       <Target className="w-12 h-12 mb-4" />
                       <p className="font-bold text-lg">{d.image_placeholder}</p>
                       <p className="text-sm mt-2">Área reservada para inserir a imagem</p>
                    </div>
                 )}
              </div>
              {d.imagens_secundarias && (
                <div className="flex gap-4 w-full">
                  {d.imagens_secundarias.map((imgUrl: string, idx: number) => (
                    <div key={idx} className={`flex-1 rounded-xl border-2 ${isLight ? 'border-zinc-200 shadow-md' : 'border-zinc-800 shadow-xl'} overflow-hidden cursor-pointer transition-transform hover:scale-105`} onClick={() => setExpandedImage(imgUrl)}>
                      <img src={imgUrl} alt={`Destaque ${idx + 1}`} className="w-full h-full object-cover aspect-square" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {d.insights_estruturados ? d.insights_estruturados.map((insight: any, i: number) => {
            const isPositivo = insight.tipo === 'positivo';
            const Icon = isPositivo ? CheckCircle2 : Lightbulb;
            const iconColor = isPositivo ? 'text-emerald-500' : 'text-amber-500';
            const borderColor = isPositivo ? (isLight ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-900/50 bg-emerald-950/20') : (isLight ? 'border-amber-200 bg-amber-50' : 'border-amber-900/50 bg-amber-950/20');
            
            return (
              <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border ${borderColor}`}>
                <Icon className={`w-6 h-6 shrink-0 mt-1 ${iconColor}`} />
                <div>
                   {insight.titulo && <span className={`font-bold ${iconColor} block mb-1 uppercase text-sm`}>{insight.titulo}</span>}
                   <p className={`text-[17px] leading-relaxed ${titleColor}`}>{insight.texto}</p>
                </div>
              </div>
            )
          }) : d.insights_bullets?.map((bullet: string, i: number) => (
            <div key={i} className={`flex items-start gap-4 p-6 rounded-2xl border ${cardBg}`}>
              <ArrowUpRight className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <p className={`text-lg leading-relaxed ${titleColor}`}>{bullet}</p>
            </div>
          ))}
        </div>

        {/* Modal / Lightbox */}
        {expandedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 animate-in fade-in duration-300"
            onClick={() => setExpandedImage(null)}
          >
            <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
              <img 
                src={expandedImage} 
                alt="Fullscreen" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" 
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  if (type === 'three_pillar_framework') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`p-8 rounded-2xl border ${cardBg} flex flex-col items-center text-center group transition-colors`}>
              <div className={`w-16 h-16 rounded-2xl ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} flex items-center justify-center mb-6 shadow-inner`}>
                <span className="text-2xl font-bold text-red-600">{num}</span>
              </div>
              <h3 className={`text-2xl font-bold ${titleColor} mb-4`}>{d[`pilar_${num}_nome`]}</h3>
              <p className={`text-lg ${subtitleColor} leading-relaxed`}>{d[`pilar_${num}_texto`]}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'competitor_benchmark') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-12`}>{d.titulo}</h2>
        <div className="grid md:grid-cols-12 gap-8">
          <div className={`col-span-12 md:col-span-4 rounded-2xl border ${cardBg} p-8 flex flex-col justify-center items-center text-center`}>
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest mb-4">{d.subtitulo}</span>
            <h3 className={`text-4xl md:text-5xl font-bold ${titleColor} mb-4 leading-tight`}>{d.nome_concorrente}</h3>
          </div>
          <div className={`col-span-12 md:col-span-8 flex flex-col gap-4 rounded-2xl border ${cardBg} p-8`}>
            <h4 className={`text-xl font-bold ${titleColor} mb-4 flex items-center gap-2`}>
              <Lightbulb className="text-red-500" />
              Análise Estratégica
            </h4>
            {d.insights_bullets?.map((insight: string, i: number) => (
              <div key={i} className={`flex gap-4 items-start pb-4 border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} last:border-0 last:pb-0`}>
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <p className={`text-lg ${subtitleColor} leading-relaxed`}>{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'positioning_matrix') {
    return (
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        <div className="text-center">
          <h2 className={`text-4xl font-bold ${titleColor} mb-3`}>{d.titulo}</h2>
          <p className={`text-lg ${subtitleColor} max-w-3xl mx-auto`}>{d.subtitulo}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {d.quadrantes?.map((q: any, i: number) => (
            <div 
              key={i} 
              className={`p-7 rounded-2xl border ${q.is_destaque ? 'border-red-500/80 bg-red-950/20 shadow-2xl ring-2 ring-red-500/40' : cardBg} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${q.is_destaque ? 'bg-red-600 text-white' : (isLight ? 'bg-zinc-100 text-zinc-700' : 'bg-zinc-800 text-zinc-300')}`}>
                    {q.nome_quadrante}
                  </span>
                  {q.is_destaque && (
                    <span className="text-xs font-extrabold text-red-500 flex items-center gap-1.5 animate-pulse">
                      <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" /> Posicionamento Princess House
                    </span>
                  )}
                </div>
                <h3 className={`text-2xl font-bold ${titleColor} mb-2`}>{q.operadores}</h3>
                <p className={`text-sm ${isLight ? 'text-zinc-700' : 'text-zinc-300'} mb-4 leading-relaxed`}>{q.caracteristicas}</p>
              </div>
              <div className={`pt-4 border-t ${isLight ? 'border-zinc-200' : 'border-zinc-800'} text-xs ${subtitleColor}`}>
                <strong className="text-zinc-400">Perfil de Público & Dinâmica:</strong> {q.perfil}
              </div>
            </div>
          ))}
        </div>

        {d.recomendacoes_resumo && (
          <div className={`p-6 rounded-2xl border ${isLight ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-amber-950/30 border-amber-900/50 text-amber-200'} shadow-lg mt-2 flex items-start gap-4`}>
            <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base mb-1">Direcionamento Estratégico de Posicionamento</h4>
              <p className="text-sm leading-relaxed">{d.recomendacoes_resumo}</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (type === 'moodboard_identity') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-16 text-center`}>{d.titulo}</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-4`}>Tipografia Principal</h4>
              <p className={`text-6xl font-signature ${titleColor} mb-2 tracking-wide leading-tight`} style={{ fontFamily: "'Brittany Signature', cursive" }}>{d.tipografia_principal}</p>
              <p className={`text-3xl font-signature ${subtitleColor}`} style={{ fontFamily: "'Brittany Signature', cursive" }}>Brittany Signature</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-4`}>Tipografia Secundária</h4>
              <p className={`text-4xl font-sans font-bold ${titleColor} mb-2`}>{d.tipografia_secundaria}</p>
              <p className={`text-xl font-sans ${subtitleColor}`}>Google Sans / System UI</p>
            </div>
          </div>
          <div>
            <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-6`}>Paleta de Cores</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {d.paleta_cores?.map((cor: string, i: number) => (
                <div key={i} className="flex flex-col gap-2">
                  <div 
                    className={`w-full aspect-square rounded-2xl shadow-inner border ${isLight ? 'border-zinc-200' : 'border-zinc-800'}`}
                    style={{ backgroundColor: cor }}
                  />
                  <span className={`text-sm font-mono ${subtitleColor} text-center uppercase`}>{cor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'vertical_feature_list') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {d.features?.map((f: any, i: number) => (
            <div key={i} className={`p-8 rounded-2xl border ${cardBg} flex flex-col md:flex-row gap-8 items-start hover:border-red-500/50 transition-colors`}>
              <div className={`w-16 h-16 shrink-0 rounded-2xl ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} flex items-center justify-center shadow-inner`}>
                <span className="text-2xl font-bold text-red-600">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className={`text-2xl font-bold ${titleColor}`}>{f.titulo}</h3>
                <p className={`text-lg ${subtitleColor} leading-relaxed`}>{f.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (type === 'vertical_feature_list') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {d.features?.map((f: any, i: number) => (
            <div key={i} className={`p-8 rounded-2xl border ${cardBg} flex flex-col md:flex-row gap-8 items-start hover:border-red-500/50 transition-colors`}>
              <div className={`w-16 h-16 shrink-0 rounded-2xl ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} flex items-center justify-center shadow-inner`}>
                <span className="text-2xl font-bold text-red-600">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className={`text-2xl font-bold ${titleColor}`}>{f.titulo}</h3>
                <p className={`text-lg ${subtitleColor} leading-relaxed`}>{f.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'persona_profile') {
    return (
      <div className={`p-8 md:p-12 rounded-3xl border ${cardBg}`}>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isLight ? 'bg-red-100' : 'bg-red-950/30'} text-red-500 font-bold mb-6`}>
              <Target className="w-5 h-5" /> Persona {d.numero_persona}
            </div>
            <h2 className={`text-4xl font-bold ${titleColor} mb-8 leading-tight`}>{d.nome_persona}</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                 <span className="text-zinc-500 block text-xs uppercase mb-1">Dispositivo</span>
                 <span className={titleColor}>{d.dispositivo}</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                 <span className="text-zinc-500 block text-xs uppercase mb-1">Canais</span>
                 <span className={titleColor}>{d.canais}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Local</span>
                <span className={titleColor}>{d.local}</span>
              </div>
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Idade</span>
                <span className={titleColor}>{d.idade}</span>
              </div>
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Renda</span>
                <span className={titleColor}>{d.renda}</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 flex flex-col justify-center gap-8">
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <h4 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">Dores</h4>
              <ul className="space-y-3">
                {d.dores_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-lg ${subtitleColor} leading-relaxed`}><span className="text-red-600 mt-1.5">•</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <h4 className="text-lg font-bold text-emerald-500 mb-4 flex items-center gap-2">Desejos</h4>
              <ul className="space-y-3">
                {d.desejos_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-lg ${subtitleColor} leading-relaxed`}><span className="text-emerald-600 mt-1.5">•</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <h4 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">Objeções de Compra</h4>
              <ul className="space-y-3">
                {d.objecoes_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-lg ${subtitleColor} leading-relaxed`}><span className="text-amber-600 mt-1.5">•</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'smart_goal_okr') {
    return (
      <div className={`p-12 rounded-3xl border border-red-900/50 bg-gradient-to-br from-zinc-950 to-red-950/20`}>
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-red-600 text-white font-bold text-sm tracking-widest uppercase mb-6">{d.fase_projeto}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{d.titulo}</h2>
          <p className="text-xl md:text-2xl text-red-100 leading-relaxed font-serif italic">{d.objetivo_geral}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((num) => (
            <div key={num} className="bg-black/50 border border-red-900/30 p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-950 flex items-center justify-center text-red-500 font-bold font-mono">KR{num}</div>
              </div>
              <p className="text-lg text-zinc-300">{d[`kr${num}_texto`]}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'campaign_strategy_boxes') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {d.boxes?.map((box: any, i: number) => (
            <div key={i} className={`flex-1 ${cardBg} border rounded-2xl p-8 flex flex-col shadow-sm hover:-translate-y-1 transition-transform`}>
              <span className="text-5xl font-bold text-red-600 mb-4">{box.percentual}</span>
              <h3 className={`text-2xl font-bold ${titleColor} mb-4`}>{box.nome}</h3>
              <p className={`text-lg ${subtitleColor} leading-relaxed`}>{box.detalhes}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'creative_workflow') {
    const icons: any = { FileText, CheckCircle2, Video, Rocket };

    return (
      <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
        <h2 className={`text-4xl font-bold ${titleColor} mb-4 text-center`}>{d.titulo}</h2>
        <p className={`text-xl ${subtitleColor} mb-16 text-center`}>{d.subtitulo}</p>

        {/* Horizontal Workflow timeline */}
        <div className="flex flex-col md:flex-row items-center w-full justify-between relative mb-16 px-4">
           {/* Connecting Line */}
           <div className={`hidden md:block absolute top-8 left-12 right-12 h-1 -translate-y-1/2 rounded-full ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'} z-0`} />

           {d.passos?.map((passo: any, i: number) => {
             const Icon = icons[passo.icone] || FileText;
             return (
               <div key={i} className="flex flex-col items-center text-center gap-4 group relative z-10 mb-8 md:mb-0 w-32">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl transition-all duration-300 group-hover:-translate-y-2 
                    ${isLight ? 'bg-white border-zinc-200 shadow-zinc-200/50' : 'bg-zinc-950 border-zinc-800 shadow-black/50'}`}>
                    <Icon className="w-7 h-7 text-red-500" />
                  </div>
                  <h4 className={`font-bold ${titleColor} leading-tight`}>{passo.titulo}</h4>
               </div>
             )
           })}
        </div>

        {/* Link / Button */}
        {d.link_exemplo && (
          <div className={`w-full mt-8 p-8 rounded-3xl border ${cardBg} flex flex-col items-center text-center gap-6 shadow-xl`}>
             <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-red-500" />
             </div>
             <h3 className={`text-2xl font-bold ${titleColor}`}>Documento de Direcionamento Exemplo:</h3>
             <a href={d.link_exemplo} target="_blank" rel="noreferrer" 
                className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-900/20">
                Acessar Documento no Google Docs
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
             <p className={subtitleColor}>Veja o exemplo prático de um roteiro e direcionamento validado em campo.</p>
          </div>
        )}
      </div>
    )
  }


const MetaAdsAuditCharts = ({ isLight, d }: { isLight: boolean; d: any }) => {
  const [hoveredOffer, setHoveredOffer] = useState<number | null>(null);

  const linhas = d?.linhas_oferta || [
    { linha: "Festa dos Sonhos", conjuntos: 1, investido: "R$ 2.841,72", pct_verba: "15,9%", conversas: 550, custo_conversa: 5.17, cpm: "R$ 23,55", ctr: "1,29%", clique_para_conversa: "35,3%", status: "Parada" },
    { linha: "Day Spa", conjuntos: 2, investido: "R$ 740,44", pct_verba: "4,1%", conversas: 141, custo_conversa: 5.25, cpm: "R$ 24,32", ctr: "1,63%", clique_para_conversa: "28,4%", status: "Parada" },
    { linha: "Festa em Domicílio", conjuntos: 3, investido: "R$ 4.118,62", pct_verba: "23,1%", conversas: 639, custo_conversa: 6.45, cpm: "R$ 27,34", ctr: "1,50%", clique_para_conversa: "28,4%", status: "Parada" },
    { linha: "Sazonais e Promoções", conjuntos: 7, investido: "R$ 1.356,12", pct_verba: "7,6%", conversas: 196, custo_conversa: 6.92, cpm: "R$ 26,18", ctr: "1,11%", clique_para_conversa: "34,1%", status: "Parada" },
    { linha: "Festa Teens", conjuntos: 3, investido: "R$ 797,87", pct_verba: "4,5%", conversas: 89, custo_conversa: 8.96, cpm: "R$ 20,96", ctr: "0,75%", clique_para_conversa: "31,2%", status: "Parada" },
    { linha: "Espaço Prime", conjuntos: 5, investido: "R$ 3.336,70", pct_verba: "18,7%", conversas: 343, custo_conversa: 9.73, cpm: "R$ 27,50", ctr: "1,17%", clique_para_conversa: "24,1%", status: "Ativa (R$ 11,91)" },
    { linha: "Espaço VIP", conjuntos: 2, investido: "R$ 2.283,45", pct_verba: "12,8%", conversas: 233, custo_conversa: 9.80, cpm: "R$ 35,99", ctr: "1,15%", clique_para_conversa: "31,8%", status: "Ativa (R$ 8,77)" },
    { linha: "Espaço Studio", conjuntos: 4, investido: "R$ 2.374,74", pct_verba: "13,3%", conversas: 231, custo_conversa: 10.28, cpm: "R$ 30,84", ctr: "1,10%", clique_para_conversa: "27,4%", status: "Parada" }
  ];

  const idades = d?.idade_distribuicao || [
    { faixa: "18-24", msg: 0.4, clique: 2.5, conversas: 13, custo: "R$ 2,46" },
    { faixa: "25-34", msg: 32.1, clique: 18.7, conversas: 589, custo: "R$ 6,67" },
    { faixa: "35-44", msg: 46.7, clique: 18.5, conversas: 1171, custo: "R$ 7,74" },
    { faixa: "45-54", msg: 15.7, clique: 17.4, conversas: 539, custo: "R$ 7,64" },
    { faixa: "55-64", msg: 1.7, clique: 20.2, conversas: 61, custo: "R$ 7,60" },
    { faixa: "65+", msg: 0.9, clique: 22.8, conversas: 45, custo: "R$ 4,92" }
  ];

  const maxCusto = 12.0;
  const mediaConta = 7.37;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Bloco 1: Linhas de Oferta (Custo por Conversa) */}
      <div className={`w-full rounded-2xl border ${isLight ? 'bg-white border-zinc-200' : 'bg-zinc-900/90 border-zinc-800'} p-6 shadow-xl flex flex-col gap-5`}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600/10 text-red-600 border border-red-600/20">
                Indicador 1 de 3
              </span>
              <h3 className={`text-lg font-bold ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
                Custo por Conversa por Linha de Oferta vs. Média da Conta
              </h3>
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Acumulado Jan a Out/2026 • 2.422 conversas em mensagens (Investimento total: R$ 17.850)
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Abaixo da média (&lt; R$ 7,37)
            </span>
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Acima da média (&gt; R$ 7,37)
            </span>
            <span className="text-zinc-400 font-mono">Benchmark: R$ 7,37</span>
          </div>
        </div>

        <div className="space-y-3">
          {linhas.map((item: any, idx: number) => {
            const isBelowAvg = item.custo_conversa < mediaConta;
            const barWidth = `${(item.custo_conversa / maxCusto) * 100}%`;
            const isHovered = hoveredOffer === idx;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${isHovered ? (isLight ? 'bg-zinc-50 border-zinc-300 shadow-md' : 'bg-zinc-800/80 border-zinc-700 shadow-lg') : (isLight ? 'bg-white border-zinc-100' : 'bg-zinc-900/60 border-zinc-800/80')}`}
                onMouseEnter={() => setHoveredOffer(idx)}
                onMouseLeave={() => setHoveredOffer(null)}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
                      {item.linha}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status.includes('Ativa') ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-zinc-500"><strong>{item.conversas}</strong> conversas ({item.pct_verba} verba)</span>
                    <span className="text-zinc-500">CPM {item.cpm}</span>
                    <span className={`text-sm font-black font-mono ${isBelowAvg ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      R$ {item.custo_conversa.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Horizontal Bar with Benchmark Line */}
                <div className="relative w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isBelowAvg ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-rose-400 to-rose-600'}`}
                    style={{ width: barWidth }}
                  />
                  {/* Media line reference marker at 61.4% (7.37/12) */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-zinc-900 dark:bg-white z-10"
                    style={{ left: `${(mediaConta / maxCusto) * 100}%` }}
                    title="Média Geral: R$ 7,37"
                  />
                </div>

                {isHovered && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-[11px] text-zinc-500">
                    <span>Investimento total: <strong>{item.investido}</strong> em {item.conjuntos} conjunto(s)</span>
                    <span>CTR no link: <strong>{item.ctr}</strong></span>
                    <span>Taxa de clique p/ conversa: <strong>{item.clique_para_conversa}</strong></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
          isLight
            ? 'bg-amber-100/90 border-amber-300 text-amber-950 shadow-sm'
            : 'bg-amber-950/40 border-amber-500/50 text-amber-100'
        }`}>
          <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-amber-800' : 'text-amber-400'}`} />
          <div className={`text-xs leading-relaxed font-medium ${isLight ? 'text-amber-950' : 'text-amber-100'}`}>
            <strong className={`font-black ${isLight ? 'text-amber-950' : 'text-amber-200'}`}>Distorção Crítica de Campanhas Ativas:</strong> As duas linhas ativas na exportação estão custando muito acima da média (Festa Prime a R$ 11,91 e Espaço VIP a R$ 8,77), enquanto a <strong className={`font-black ${isLight ? 'text-amber-950' : 'text-amber-200'}`}>Festa dos Sonhos</strong> — a mais barata e de maior conversão (R$ 5,17/conversa e 35,3% de taxa de chat) — estava parada.
          </div>
        </div>
      </div>

      {/* Bloco 2: Demografia & Dispersão de Cliques */}
      <div className={`w-full rounded-2xl border ${isLight ? 'bg-white border-zinc-200' : 'bg-zinc-900/90 border-zinc-800'} p-6 shadow-xl flex flex-col gap-5`}>
        <div className="border-b pb-4 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-600/10 text-indigo-600 border border-indigo-600/20">
              Indicador 2 de 3
            </span>
            <h3 className={`text-lg font-bold ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
              Distribuição Demográfica: Idade, Gênero & Gargalo de Cliques no Link
            </h3>
          </div>
          <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Comparativo de impressões entre Campanhas de Mensagens e Campanhas de Cliques
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mensagem vs Clique por Idade */}
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
            <h4 className={`text-sm font-bold mb-3 flex items-center justify-between ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
              <span>Participação nas Impressões por Idade</span>
              <span className="text-[11px] font-normal text-zinc-500">Mensagens vs. Cliques</span>
            </h4>

            <div className="space-y-3">
              {idades.map((item: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold">{item.faixa} anos</span>
                    <span className="text-zinc-500">{item.conversas} conversas ({item.custo}/conversa)</span>
                  </div>
                  {/* Double bar: Red for Mensagens, Blue for Cliques */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] w-12 text-rose-600 font-semibold">Msg: {item.msg}%</span>
                      <div className="flex-1 h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-600 rounded-full" style={{ width: `${item.msg * 2}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] w-12 text-indigo-600 font-semibold">Cliq: {item.clique}%</span>
                      <div className="flex-1 h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.clique * 2}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gênero e Diagnóstico de Desvio */}
          <div className="flex flex-col justify-between gap-4">
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
              <h4 className={`text-sm font-bold mb-2 ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
                Divisão de Gênero em Mensagens
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
                  <div>
                    <span className="font-bold text-rose-700 dark:text-rose-400 block">Mulheres (97,3% da verba)</span>
                    <span className="text-zinc-500">2.369 conversas geradas</span>
                  </div>
                  <span className="text-base font-black text-rose-600">R$ 7,33 /conversa</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <div>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300 block">Homens (2,4% da verba)</span>
                    <span className="text-zinc-500">43 conversas geradas</span>
                  </div>
                  <span className="text-base font-black text-zinc-600">R$ 9,84 /conversa (+34%)</span>
                </div>
              </div>
            </div>

            {/* Finding Box on Click Leakage */}
            <div className={`p-4 rounded-xl border leading-relaxed text-xs transition-colors ${
              isLight
                ? 'bg-rose-100/90 border-rose-300 text-rose-950 shadow-sm font-medium'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-100 font-normal'
            }`}>
              <strong className={`font-black ${isLight ? 'text-rose-950' : 'text-rose-200'}`}>Vazamento em Cliques no Link:</strong>{' '}
              <span>
                23,3% da verba foi gasta em campanhas de clique a R$ 0,15, porém{' '}
                <strong className={`font-black ${isLight ? 'text-rose-950' : 'text-rose-200'}`}>42,9% das impressões foram entregues para pessoas com 55 anos ou mais</strong>{' '}
                (nas campanhas de mensagem, 55+ representou apenas 2,7%). Tráfego barato, mas fora do perfil comprador de festas infantis.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bloco 3: Tamanho da Oportunidade & Prioridades */}
      <div className={`w-full rounded-2xl border ${isLight ? 'bg-white border-zinc-200' : 'bg-zinc-900/90 border-zinc-800'} p-6 shadow-xl flex flex-col gap-5`}>
        <div className="border-b pb-4 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600/10 text-emerald-600 border border-emerald-600/20">
              Indicador 3 de 3
            </span>
            <h3 className={`text-lg font-bold ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
              Tamanho da Oportunidade & Plano de Ação Prioritário
            </h3>
          </div>
          <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Simulação de ganho recuperando o CPA de conjuntos saturados e estancando o vazamento de tráfego
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'} text-center`}>
            <span className="text-xs text-zinc-500 block uppercase">Conjuntos com Custo &gt; R$ 11</span>
            <span className="text-3xl font-black text-rose-600 mt-1 block">7 conjuntos</span>
            <span className="text-xs text-zinc-400">Somaram R$ 4.663 investidos</span>
          </div>
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'} text-center`}>
            <span className="text-xs text-zinc-500 block uppercase">Conversas Geradas neles</span>
            <span className="text-3xl font-black text-amber-500 mt-1 block">377 conversas</span>
            <span className="text-xs text-zinc-400">Custo médio elevado (&gt; R$ 12,30)</span>
          </div>
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-950/30 border-emerald-900/50'} text-center`}>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 block uppercase font-bold">Potencial a R$ 7,00/conversa</span>
            <span className="text-3xl font-black text-emerald-600 mt-1 block">+289 conversas</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">+11,9% de volume sobre a conta inteira</span>
          </div>
        </div>

        <div className={`p-5 rounded-xl border text-xs space-y-3 transition-colors ${
          isLight
            ? 'bg-zinc-100/90 border-zinc-300 text-zinc-900 shadow-sm'
            : 'bg-zinc-900/80 border-zinc-700 text-zinc-100'
        }`}>
          <div className={`font-black text-sm flex items-center gap-2 ${isLight ? 'text-zinc-950' : 'text-white'}`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>Direcionamentos Imediatos de Otimização (Plano de Ação Meta Ads):</span>
          </div>
          <ol className={`list-decimal pl-5 space-y-2 leading-relaxed ${isLight ? 'text-zinc-900 font-medium' : 'text-zinc-200'}`}>
            <li><strong className={`font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>Ligar conversa a venda:</strong> marcar a campanha de origem no CRM para decidir cortes por ROAS e ticket, e não apenas pelo custo da conversa.</li>
            <li><strong className={`font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>Revisar Prime e VIP ativas:</strong> Festa Prime só converte 18,6% dos cliques em chat (trocar promessa/criativo antes de escalar verba).</li>
            <li><strong className={`font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>Religar o que já provou resultado:</strong> reativar Festa dos Sonhos (R$ 5,17) e a versão de setembro de Domicílio (R$ 4,83).</li>
            <li><strong className={`font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>Consolidar por linha de oferta:</strong> acabar com as 33 campanhas pulverizadas; ter 1 campanha contínua por linha com 3 a 4 criativos por conjunto.</li>
            <li><strong className={`font-bold ${isLight ? 'text-zinc-950' : 'text-white'}`}>Restringir campanhas de tráfego/clique:</strong> limitar a mulheres de 25 a 54 anos para eliminar o desperdício com público 55+.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};


  if (type === 'visual_drawflow') {
    return (
      <div className="flex flex-col items-center py-8 w-full overflow-x-auto">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className={`text-4xl font-bold ${titleColor}`}>{d.titulo}</h2>
            <p className={`text-base mt-2 ${subtitleColor}`}>{d.subtitulo || "Arquitetura integrada para o orçamento de R$ 3.000 a R$ 4.000/mês com Umbler IA + Comercial"}</p>
          </div>
          <div className="px-5 py-2.5 rounded-xl bg-red-600/10 border border-red-500/30 text-red-600 font-bold text-sm flex items-center gap-2 self-start">
            <Target className="w-4 h-4" />
            Meta: 60 a 80 Festas / Mês
          </div>
        </div>
        
        <div className="min-w-[920px] w-full flex flex-col items-center relative">
          {/* Top Node */}
          {/* Top Node: Strategic Budget */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-2 border-zinc-700 text-white font-extrabold px-10 py-4 rounded-2xl flex items-center gap-4 shadow-2xl z-10">
            <DollarSign className="w-7 h-7 text-emerald-400 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Orçamento Estratégico Meta Ads</span>
              <span className="text-2xl text-emerald-400 font-black">{d.orcamento_total || "R$ 3.000 a R$ 4.000 / mês"}</span>
            </div>
            <div className="hidden sm:flex border-l border-zinc-700 pl-4 flex-col text-left text-[11px] text-zinc-400">
              <span className="text-zinc-300 font-bold">Consolidação em 3 Linhas</span>
              <span>Estrutura contínua sem fragmentação</span>
            </div>
          </div>

          {/* Vertical line from Top */}
          <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} />
          
          {/* Horizontal span line covering all 3 branches */}
          <div className={`w-[88%] h-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} />
          
          {/* 3 Dropdown lines */}
          <div className="flex w-[88%] justify-between">
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
          </div>

          {/* 3 Campaign Branch Nodes (Lines from PDF) */}
          <div className="flex w-full justify-between gap-5 px-2 mt-2 z-10">
            
            {/* Branch 1: Linhas Contínuas por Oferta (70%) */}
            <div className={`flex-[1.25] ${cardBg} p-5 rounded-2xl text-left shadow-xl border-2 border-emerald-500/60 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                70% da Verba
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Motor Contínuo de Mensagens</span>
                </div>
                <h4 className={`font-black text-lg mb-1 ${titleColor}`}>Campanhas por Linha de Oferta</h4>
                <p className="text-2xl font-black text-emerald-600 mb-3">R$ 2.100 a R$ 2.800 <span className="text-xs font-semibold text-zinc-500">/mês</span></p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-300'} space-y-2`}>
                  <p className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Reativação das Campeãs:</strong> Festa dos Sonhos (CPA R$ 5,17) e Domicílio (CPA R$ 4,83 / R$ 6,45).</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Novos Vídeos Prime & VIP:</strong> Testar 3-4 criativos por conjunto para baixar CPA de R$ 9,73 - R$ 11,91.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>1 Campanha Contínua por Linha:</strong> Elimina pausamentos que reiniciam o aprendizado do algoritmo.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Branch 2: Tráfego Restrito Mulheres 25-54 anos (20%) */}
            <div className={`flex-[1] ${cardBg} p-5 rounded-2xl text-left shadow-xl border-2 border-indigo-500/60 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-indigo-500 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                20% da Verba
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Anti-Vazamento Demográfico</span>
                </div>
                <h4 className={`font-black text-lg mb-1 ${titleColor}`}>Tráfego Restrito Mulheres 25-54a</h4>
                <p className="text-2xl font-black text-indigo-600 mb-3">R$ 600 a R$ 800 <span className="text-xs font-semibold text-zinc-500">/mês</span></p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-300'} space-y-2`}>
                  <p className="flex items-start gap-1.5">
                    <span className="text-indigo-500 font-bold">✓</span>
                    <span><strong>Fim do Desvio 55+:</strong> Trava no público que concentrou 42,9% de cliques sem gerar conversas (2,7%).</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-indigo-500 font-bold">✓</span>
                    <span><strong>Foco nas Decisoras:</strong> Mulheres de 25-44/54 anos representam 78,8% das conversas e CPA de R$ 7,33.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-indigo-500 font-bold">✓</span>
                    <span><strong>Destino de Conversão:</strong> Tráfego direto para Landing Page com triagem e WhatsApp imediato.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Branch 3: Remarketing Estruturado & Volume (10%) */}
            <div className={`flex-[0.95] ${cardBg} p-5 rounded-2xl text-left shadow-xl border-2 border-amber-500/60 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-amber-500 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                10% da Verba
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Volume Crítico & Retenção</span>
                </div>
                <h4 className={`font-black text-lg mb-1 ${titleColor}`}>Remarketing & Testes com Volume</h4>
                <p className="text-2xl font-black text-amber-600 mb-3">R$ 300 a R$ 400 <span className="text-xs font-semibold text-zinc-500">/mês</span></p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-300'} space-y-2`}>
                  <p className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span><strong>Frio vs. Remarketing:</strong> Separação clara de públicos com verba para ultrapassar 50 conversas/conjunto.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span><strong>Ativação da Base 4k:</strong> Reengajamento contínuo de clientes antigas e visitantes de perfil/site.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span><strong>Prova Social & Propostas VIP:</strong> Criativos com reações espontâneas de aniversariantes e mães.</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Convergence Paths (Lines from Branch 1, 2 & 3 to Triagem Central Node) */}
          <div className="flex w-full justify-between px-4 mt-0">
            <div className="flex-[3] flex flex-col items-center relative pt-6">
              <div className="flex w-[82%] justify-between absolute top-0">
                <div className={`h-8 w-px bg-emerald-500`} />
                <div className={`h-8 w-px bg-indigo-500`} />
                <div className={`h-8 w-px bg-amber-500`} />
              </div>
              <div className={`w-[82%] h-0.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-amber-500 mt-8`} />
              <div className={`h-8 w-px bg-red-600 relative`}>
                <ChevronRight className="absolute -bottom-2 -left-2.5 w-5 h-5 text-red-600 rotate-90" />
              </div>
              
              {/* Etapa 2: Triagem Umbler IA (< 2 min) + WhatsApp Central Node */}
              <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold p-6 rounded-2xl shadow-2xl shadow-red-900/30 flex flex-col md:flex-row items-center justify-between gap-6 mt-2 z-10 w-full max-w-3xl border border-red-400/40">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-white/10 rounded-xl shrink-0">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full font-bold">Etapa 2: Triagem Imediata</span>
                      <span className="text-xs text-red-200">Tempo de Resposta &lt; 2 min</span>
                    </div>
                    <span className="text-2xl font-black block">Triagem Umbler IA + WhatsApp Integrado</span>
                    <span className="text-sm font-normal text-red-100 block mt-1">
                      Qualificação automática 24/7 (Nome da aniversariante, idade, data estimada, convidadas e pacote de interesse).
                    </span>
                    <span className="text-xs text-amber-200 font-semibold block mt-1">
                      🏷️ Tag de Origem da Campanha anexada ao Lead para rastreamento no CRM
                    </span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-xl text-center md:text-right shrink-0">
                  <span className="text-xs uppercase block text-red-100 font-bold">Meta Mensal</span>
                  <span className="text-xl font-black">60 a 80 Festas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connector from Triagem to Comercial Consultivo */}
          <div className="w-full relative h-10 flex justify-center">
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
          </div>

          {/* Etapa 3: Apresentação Comercial Consultiva (Juliana & Simoni) */}
          <div className="flex w-full flex-col items-center relative z-10">
            <div className={`${cardBg} border-2 border-indigo-500/50 p-5 rounded-2xl flex items-center justify-between gap-6 shadow-xl max-w-3xl w-full`}>
              <div className="flex items-center gap-4 text-left">
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl shrink-0">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] uppercase tracking-wider bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded font-bold">Etapa 3: Comercial Consultivo</span>
                    <span className={`text-xs ${subtitleColor}`}>Sócias Juliana & Simoni</span>
                  </div>
                  <span className={`text-lg font-black block ${titleColor}`}>Tour em Vídeo ao Vivo & Apresentação de Pacotes</span>
                  <span className={`text-xs ${subtitleColor}`}>
                    Demonstração imersiva do espaço, passarela, limousine, robô dançarino e boneca Princess • Proposta rápida e flexibilidade (Pix com desconto ou link sem juros).
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col text-right shrink-0">
                <span className="text-xs font-bold text-indigo-500">Agilidade Máxima</span>
                <span className="text-[11px] text-zinc-400">Sem burocracia</span>
              </div>
            </div>
          </div>

          {/* Connector from Comercial to CRM & Retenção */}
          <div className="w-full relative h-10 flex justify-center">
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
          </div>

          {/* Etapa 4: Fechamento, Rastreamento CRM (Ação #1 do PDF) & Retenção */}
          <div className="flex w-full flex-col items-center relative z-10">
            <div className={`${isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'} border-2 px-8 py-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl max-w-3xl w-full text-left`}>
              <div className="flex items-center gap-4">
                <RefreshCw className="w-7 h-7 text-emerald-500 shrink-0 animate-spin-slow" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] uppercase tracking-wider bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">Etapa 4: Fundo de Funil & LTV</span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">🎯 Ação Mais Urgente da Auditoria</span>
                  </div>
                  <span className="text-lg font-black block">Fechamento, Rastreamento CRM & Retenção</span>
                  <span className="text-xs leading-relaxed block mt-1">
                    <strong>Cruzamento Conversas x Vendas:</strong> Ligar as 2.422+ conversas geradas aos contratos fechados para apurar o ROAS real e ticket médio por oferta (Prime, VIP, Sonhos, Domicílio).
                  </span>
                  <span className="text-xs leading-relaxed block mt-1 text-emerald-700 dark:text-emerald-300">
                    <strong>Pós-Venda D+1 (CAC Zero):</strong> Agradecimento e ativação imediata de mães convidadas da festa para novos aniversários.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  if (type === 'meta_ads_analysis') {
    return (
      <div className="flex flex-col h-full gap-8">
        <div>
          <h2 className={`text-4xl font-bold ${titleColor} mb-2`}>{d.titulo}</h2>
          <p className={`text-base ${subtitleColor}`}>{d.subtitulo_periodo || "Auditoria oficial do Gerenciador de Anúncios • Acumulado 01/01 a 31/10/2026"}</p>
        </div>
        
        {/* Top 4 KPI Cards from PDF */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`${cardBg} p-5 rounded-2xl shadow-md border-l-4 border-indigo-500 flex flex-col gap-1`}>
            <span className={`text-xs font-semibold ${subtitleColor}`}>Investimento Total</span>
            <span className="text-2xl md:text-3xl font-black text-indigo-600">{d.investimento_total || "R$ 23.337"}</span>
            <span className="text-[11px] text-zinc-400">Jan a Out/2026</span>
          </div>
          <div className={`${cardBg} p-5 rounded-2xl shadow-md border-l-4 border-emerald-500 flex flex-col gap-1`}>
            <span className={`text-xs font-semibold ${subtitleColor}`}>Conversas Iniciadas</span>
            <span className="text-2xl md:text-3xl font-black text-emerald-600">{d.conversas_total || "2.422"}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Campanhas de mensagem</span>
          </div>
          <div className={`${cardBg} p-5 rounded-2xl shadow-md border-l-4 border-amber-500 flex flex-col gap-1`}>
            <span className={`text-xs font-semibold ${subtitleColor}`}>Custo Médio / Conversa</span>
            <span className="text-2xl md:text-3xl font-black text-amber-500">{d.cpa_medio || "R$ 7,37"}</span>
            <span className="text-[11px] text-zinc-400">R$ 17.850 em mensagens</span>
          </div>
          <div className={`${cardBg} p-5 rounded-2xl shadow-md border-l-4 border-rose-500 flex flex-col gap-1`}>
            <span className={`text-xs font-semibold ${subtitleColor}`}>Alcance Único & Freq.</span>
            <span className="text-2xl md:text-3xl font-black text-rose-600">{d.alcance_total || "675.118"}</span>
            <span className="text-[11px] text-zinc-400">Freq. média: {d.frequencia || "2,93"} • CPM {d.cpm_medio || "R$ 11,78"}</span>
          </div>
        </div>

        {/* Audit Charts Component from PDF */}
        <MetaAdsAuditCharts isLight={isLight} d={d} />

        {/* 2 Bottom Columns: O que funcionou vs O que não funcionou */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* O que funcionou */}
          <div className={`${isLight ? 'bg-emerald-50' : 'bg-emerald-950/20'} p-8 rounded-2xl border border-emerald-200/50 flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500 rounded-xl text-white shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>O que os dados comprovam (Manter & Reativar)</h3>
                <p className={`text-sm ${isLight ? 'text-emerald-800' : subtitleColor}`}>Linhas eficientes e perfil ideal</p>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {d.funcionou?.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className={`text-sm leading-relaxed ${isLight ? 'text-zinc-900 font-medium' : 'text-zinc-200'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O que nao funcionou */}
          <div className={`${isLight ? 'bg-red-50 border-red-200' : 'bg-red-950/20 border-red-900/40'} p-8 rounded-2xl border flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500 rounded-xl text-white shadow-md shadow-red-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${isLight ? 'text-red-900' : 'text-red-300'}`}>Gargalos Encontrados na Conta (Corrigir no Setup)</h3>
                <p className={`text-sm ${isLight ? 'text-red-800' : subtitleColor}`}>Pulverização, desvios e falta de CRM</p>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {d.nao_funcionou?.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className={`text-sm leading-relaxed ${isLight ? 'text-zinc-900 font-medium' : 'text-zinc-200'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'media_projection') {
    return (
      <div className="flex flex-col h-full items-center justify-center py-8">
        <h2 className={`text-4xl font-bold ${titleColor} mb-2`}>{d.titulo}</h2>
        <p className={`text-xl ${subtitleColor} mb-12`}>Orçamento aprovado: <strong className="text-emerald-600">{d.orcamento}</strong></p>

        <div className="w-full max-w-5xl grid md:grid-cols-3 gap-8 mb-12">
          {d.cenarios.map((cenario: any, i: number) => {
            let color = 'text-zinc-500';
            let bg = isLight ? 'bg-zinc-100' : 'bg-zinc-800';
            let border = 'border-zinc-200 dark:border-zinc-700';
            
            if (i === 0) { color = 'text-amber-500'; bg = isLight ? 'bg-amber-50' : 'bg-amber-950/30'; border = 'border-amber-200 dark:border-amber-900/50'; }
            if (i === 1) { color = 'text-indigo-500'; bg = isLight ? 'bg-indigo-50' : 'bg-indigo-950/30'; border = 'border-indigo-200 dark:border-indigo-900/50'; }
            if (i === 2) { color = 'text-emerald-500'; bg = isLight ? 'bg-emerald-50' : 'bg-emerald-950/30'; border = 'border-emerald-200 dark:border-emerald-900/50'; }

            return (
              <div key={i} className={`${cardBg} rounded-3xl p-8 border-2 ${border} shadow-xl flex flex-col items-center text-center relative overflow-hidden`}>
                 <div className={`absolute top-0 inset-x-0 h-2 ${color.replace('text', 'bg')}`} />
                 <h4 className={`text-lg font-bold uppercase tracking-wider ${color} mb-6`}>{cenario.nome}</h4>
                 <div className="flex flex-col items-center gap-2 mb-6">
                   <span className="text-5xl font-black">{cenario.pedidos}</span>
                   <span className={`text-sm font-medium ${subtitleColor}`}>pedidos / mês</span>
                 </div>
                 <div className={`mt-auto ${bg} px-6 py-3 rounded-xl w-full`}>
                   <span className={`font-bold ${color}`}>CPA {cenario.cpa}</span>
                 </div>
              </div>
            )
          })}
        </div>

        <div className={`max-w-4xl w-full ${isLight ? 'bg-blue-50 border-blue-100' : 'bg-blue-950/20 border-blue-900/50'} border p-6 rounded-2xl flex items-start gap-4`}>
           <div className="p-3 bg-blue-500 text-white rounded-xl shrink-0">
             <Target className="w-6 h-6" />
           </div>
           <div>
             <h4 className="text-blue-700 dark:text-blue-400 font-bold text-lg mb-1">Alcance Estimado</h4>
             <p className={`${isLight ? 'text-blue-900/80' : 'text-blue-200/80'} leading-relaxed`}>
               {d.alcance_estimado}
             </p>
           </div>
        </div>
      </div>
    )
  }

  if (type === 'spreadsheet_placeholder') {
    return (
      <div>
         <div className="flex items-center gap-4 mb-12">
           <FileSpreadsheet className="w-10 h-10 text-red-600" />
           <h2 className={`text-4xl font-bold ${titleColor}`}>{d.titulo}</h2>
         </div>
         
         {d.imagem_url ? (
           <div className="w-full flex flex-col gap-6">
             <div className="w-full bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden flex flex-col p-4">
               <img src={d.imagem_url} alt={d.titulo} className="w-full h-auto object-contain rounded-lg" />
             </div>
             {d.link_planilha && (
               <div className="w-full flex justify-center mt-4">
                 <a href={d.link_planilha} target="_blank" rel="noreferrer" 
                    className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-900/20">
                    <FileSpreadsheet className="w-5 h-5" />
                    Acessar {d.tipo_planilha} Completa
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </a>
               </div>
             )}
           </div>
         ) : (
           <div className="w-full h-[500px] bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col relative">
             {/* Excel Header */}
             <div className="w-full h-8 bg-zinc-100 border-b border-zinc-200 flex">
                <div className="w-12 h-full border-r border-zinc-200 bg-zinc-100" />
                {['A', 'B', 'C', 'D', 'E', 'F'].map(col => (
                  <div key={col} className="flex-1 border-r border-zinc-200 flex items-center justify-center text-xs font-mono text-zinc-400 font-bold">{col}</div>
                ))}
             </div>
             {/* Excel Rows */}
             <div className="flex-1 flex flex-col">
               {[1,2,3,4,5,6,7,8,9,10].map(row => (
                 <div key={row} className="flex-1 flex border-b border-zinc-100 last:border-0">
                    <div className="w-12 h-full border-r border-zinc-200 bg-zinc-50 flex items-center justify-center text-xs font-mono text-zinc-400">{row}</div>
                    {['A', 'B', 'C', 'D', 'E', 'F'].map(col => (
                      <div key={col} className="flex-1 border-r border-zinc-100" />
                    ))}
                 </div>
               ))}
             </div>
             
             {/* Overlay overlay */}
             <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white border border-zinc-200 shadow-2xl rounded-2xl p-8 max-w-md text-center flex flex-col items-center">
                  <FileSpreadsheet className="w-16 h-16 text-zinc-300 mb-6" />
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">Planilha de {d.tipo_planilha}</h3>
                  <p className="text-zinc-500 text-base leading-relaxed">
                    Este espaço está reservado para a inserção da planilha interativa de <b>{d.tipo_planilha}</b>.
                  </p>
                </div>
             </div>
           </div>
         )}
      </div>
    )
  }

  // Fallback for missing types
  return (
    <div className={`p-8 border border-red-500 ${cardBg} text-red-500`}>
      <p>⚠️ Missing renderer for slide type: {type}</p>
    </div>
  )
}

export default function ReportViewer() {
  const { slides } = presentationData

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-red-500/30 font-sans">
      {slides.map((slide, index) => {
        const themeClass = getSectionTheme(slide.id, slide.slide_type)
        return (
          <SectionWrapper key={slide.id || index} themeClass={themeClass}>
            <RenderBlock slide={slide} />
          </SectionWrapper>
        )
      })}
    </div>
  )
}
