import React, { useState } from 'react';
import { 
  Layers, Lightbulb, Palette, Box, Wand2, Upload, X, Check, RefreshCw, 
  LayoutTemplate, Image as ImageIcon, Maximize2, 
  Database, Grid, Tent, Type, PenTool, Stamp, Sparkles, Sliders, ArrowRight, Copy
} from 'lucide-react';

// --- 1. TIPOS ---
type CardType = 'structure' | 'light' | 'style' | 'elements';
type AppMode = 'kv' | 'cenografia' | 'illustracao' | 'selos' | 'database';

interface ReferenceCard {
  id: string;
  type: CardType;
  name: string;
  color: string;
  icon: React.ElementType;
}

interface ReferenceImage {
  id: string;
  title: string;
  client: string;
  thumbnail: string;
  cards: ReferenceCard[];
}

interface GeneratedResult {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'none';
  imagePlaceholder: string; 
  mixDescription: string;
}

// --- 2. HELPERS VISUAIS ---
function getGradient(mode: AppMode) {
  switch(mode) {
    case 'cenografia': return 'bg-gradient-to-r from-cyan-600 to-blue-600';
    case 'illustracao': return 'bg-gradient-to-r from-yellow-600 to-orange-600';
    case 'selos': return 'bg-gradient-to-r from-purple-600 to-pink-600';
    default: return 'bg-gradient-to-r from-indigo-600 to-purple-600';
  }
}

function getColorClass(mode: AppMode) {
  switch(mode) {
    case 'cenografia': return 'text-cyan-500';
    case 'illustracao': return 'text-orange-500';
    case 'selos': return 'text-purple-500';
    default: return 'text-indigo-500';
  }
}

function BadgeMode({ mode }: { mode: AppMode }) {
  let label = 'Modo Gráfico';
  let color = 'bg-indigo-900 text-indigo-200';
  if (mode === 'cenografia') { label = 'Modo Arquitetura'; color = 'bg-cyan-900 text-cyan-200'; }
  if (mode === 'illustracao') { label = 'Modo Arte Digital'; color = 'bg-orange-900 text-orange-200'; }
  if (mode === 'selos') { label = 'Modo Branding'; color = 'bg-purple-900 text-purple-200'; }
  return <span className={`text-[9px] px-1.5 py-0.5 rounded ${color}`}>{label}</span>;
}

function ModeBadge({ mode }: { mode: AppMode }) {
   let label = '2D GRAPHICS';
   let color = 'bg-indigo-600';
   if (mode === 'cenografia') { label = '3D ARCHITECTURE'; color = 'bg-cyan-600'; }
   if (mode === 'illustracao') { label = 'DIGITAL ART'; color = 'bg-orange-600'; }
   if (mode === 'selos') { label = 'BRANDING 3D'; color = 'bg-purple-600'; }
   return <span className={`text-[10px] px-2 py-0.5 rounded-full ${color}`}>{label}</span>;
}

// --- 3. COMPONENTES ---

function Header({ currentMode, setCurrentMode }: { currentMode: AppMode, setCurrentMode: (m: AppMode) => void }) {
  const tabs = [
    { id: 'kv', label: 'KV Studio', icon: Wand2 },
    { id: 'cenografia', label: 'Cenografia', icon: Tent },
    { id: 'illustracao', label: 'Ilustração', icon: PenTool },
    { id: 'selos', label: 'Selos/Naming', icon: Stamp },
    { id: 'database', label: 'Banco de Dados', icon: Database },
  ] as const;

  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0f111a] z-10 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-tr ${getGradient(currentMode)}`}>
           <Wand2 size={18} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wide">AI ART DIRECTOR</h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-500">Creative House v3.0</p>
        </div>
      </div>
      <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800 gap-1">
        {tabs.map(tab => (
            <button key={tab.id} onClick={() => setCurrentMode(tab.id as AppMode)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 
                ${currentMode === tab.id ? 'bg-gray-700 text-white shadow-lg ring-1 ring-gray-600' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                ${currentMode === tab.id && tab.id === 'kv' ? '!bg-indigo-600 !ring-indigo-500' : ''}
                ${currentMode === tab.id && tab.id === 'cenografia' ? '!bg-cyan-600 !ring-cyan-500' : ''}
                ${currentMode === tab.id && tab.id === 'illustracao' ? '!bg-orange-600 !ring-orange-500' : ''}
                ${currentMode === tab.id && tab.id === 'selos' ? '!bg-purple-600 !ring-purple-500' : ''}
              `}>
              <tab.icon size={12}/> {tab.label}
            </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 overflow-hidden flex items-center justify-center text-xs text-white">CD</div>
      </div>
    </header>
  );
}

function DatabaseSection({ title, subtitle, icon: Icon, count, color, bgColor, hoverBorder }: any) {
  return (
    <div className="bg-[#131620] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${bgColor} ${color}`}><Icon size={24}/></div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
        <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 border border-gray-700">{count}</span>
      </div>
      <div className={`border-2 border-dashed border-gray-700 bg-gray-800/20 rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800/40 ${hoverBorder} transition-all mb-4`}>
        <Upload size={24} className="text-gray-600 mb-2 group-hover:text-white transition-colors"/>
        <span className="text-sm font-medium text-gray-400">Upload de Assets</span>
      </div>
    </div>
  );
}

// --- 4. APLICAÇÃO PRINCIPAL ---

export default function CreativeDirectorDashboard() {
  const [currentMode, setCurrentMode] = useState<AppMode>('illustracao');
  
  const [illuState, setIlluState] = useState({
    styleImage: null as string | null,
    poseImage: null as string | null,
    prompt: '',
    isGenerating: false,
    generatedImage: null as string | null,
    generatedPrompt: ''
  });

  const [slots, setSlots] = useState<{
    structure: ReferenceCard | null;
    light: ReferenceCard | null;
    style: ReferenceCard | null;
    elements: ReferenceCard | null;
  }>({
    structure: null,
    light: null,
    style: null,
    elements: null
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAssets, setShowAssets] = useState(false); 
  const [results, setResults] = useState<GeneratedResult[]>([]);

  // DADOS MOCKADOS
  const referencesKV: ReferenceImage[] = [
    {
      id: 'ref-01',
      title: 'Campanha Prime 2024',
      client: 'Bradesco',
      thumbnail: 'bg-gradient-to-br from-red-600 to-red-900',
      cards: [
        { id: 'c1', type: 'structure', name: 'Layout Institucional Centro', color: 'bg-blue-600', icon: LayoutTemplate },
        { id: 'c2', type: 'light', name: 'Gradiente Vermelho Prime', color: 'bg-red-500', icon: Lightbulb },
      ]
    }
  ];

  const referencesCeno: ReferenceImage[] = [
    {
      id: 'cen-01',
      title: 'Stand Tech Lolla 23',
      client: 'Samsung',
      thumbnail: 'bg-gradient-to-t from-blue-900 to-cyan-400',
      cards: [
        { id: 'cx1', type: 'structure', name: 'Planta Aberta 360º', color: 'bg-blue-600', icon: LayoutTemplate },
        { id: 'cx2', type: 'elements', name: 'Painéis LED Curvos', color: 'bg-yellow-600', icon: Box },
      ]
    }
  ];

  const referencesSelos: ReferenceImage[] = [
    {
      id: 'sel-01',
      title: 'Logo 3D Metallic',
      client: 'Festival',
      thumbnail: 'bg-gradient-to-br from-gray-200 to-gray-400',
      cards: [
        { id: 'cs1', type: 'structure', name: 'Tipografia Bold 3D', color: 'bg-purple-600', icon: Type },
        { id: 'cs2', type: 'light', name: 'Textura Metálica Ouro', color: 'bg-yellow-500', icon: Lightbulb },
      ]
    }
  ];

  // AÇÕES
  const handleCardClick = (card: ReferenceCard) => {
    setSlots(prev => ({ ...prev, [card.type]: card }));
  };

  const clearSlot = (type: CardType) => {
    setSlots(prev => ({ ...prev, [type]: null }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAssets(true);
    }, 1500);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      let prefix = 'Concept';
      let placeholder = 'bg-gray-800';
      switch(currentMode) {
        case 'kv': prefix = 'KV Concept'; placeholder = 'bg-gradient-to-br from-red-700 via-purple-800 to-indigo-900'; break;
        case 'cenografia': prefix = 'Stand 3D Render'; placeholder = 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black'; break;
        case 'selos': prefix = 'Badge 3D'; placeholder = 'bg-gradient-to-br from-slate-300 to-slate-500'; break;
      }
      const newResults: GeneratedResult[] = [
        { id: Date.now().toString() + '1', status: 'none', imagePlaceholder: placeholder, mixDescription: `${prefix}: Fusion Alpha` }
      ];
      setResults(newResults);
    }, 2500);
  };

  const handleGenerateIllustration = async () => {
    if (!illuState.prompt) {
      alert("Por favor, digite um prompt primeiro!");
      return;
    }
    setIlluState(prev => ({ ...prev, isGenerating: true }));
    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: "5f24084160c9089501c133530692550287411d2346765d7745778a8f6153028d",
          input: { 
            prompt: "Rubber hose style, vintage 1930s cartoon, " + illuState.prompt,
            aspect_ratio: "1:1",
            output_format: "png"
          },
        }),
      });
      let prediction = await response.json();
      if (response.status !== 201) throw new Error(prediction.detail);
      
      setIlluState(prev => ({ 
        ...prev, isGenerating: false,
        generatedImage: prediction.output ? prediction.output[0] : null,
        generatedPrompt: 'Imagem gerada via Replicate AI (Flux Model)'
      }));
    } catch (error) {
      console.error(error);
      setIlluState(prev => ({ ...prev, isGenerating: false }));
      alert("Erro: Configure REPLICATE_API_TOKEN na Vercel.");
    }
  }

  const handleFeedback = (id: string, status: 'approved' | 'rejected') => {
    setResults(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // CONFIGURAÇÃO DOS SLOTS
  const getSlotConfig = (mode: AppMode) => {
    if (mode === 'cenografia') {
      return {
        structure: { label: 'PLANTA / ESPAÇO', desc: 'Plantas baixas ou layouts arquitetônicos.' },
        light: { label: 'ILUMINAÇÃO CÊNICA', desc: 'Luz de palco, neon e ambiência.' },
        style: { label: 'ESTILO ARQUITETÔNICO', desc: 'Industrial, Futurista, Eco-friendly.' },
        elements: { label: 'MOBILIÁRIO & ATIVOS', desc: 'Sofás, Balcões, Telões, Elementos.' }
      };
    }
    if (mode === 'selos') {
      return {
        structure: { label: 'TIPOGRAFIA', desc: 'Fonte, kerning e disposição do texto.' },
        light: { label: 'TEXTURA & ACABAMENTO', desc: 'Metálico, Plástico, Vidro, Papel.' },
        style: { label: 'FORMA / CONTAINER', desc: 'Formato do badge, bordas e silhueta.' },
        elements: { label: 'ÍCONES & SÍMBOLOS', desc: 'Elementos gráficos de apoio.' }
      };
    }
    return {
      structure: { label: 'ESTRUTURA (LAYOUT)', desc: 'Layout e Composição 2D.' },
      light: { label: 'ILUMINAÇÃO (MOOD)', desc: 'Cores, Luz e Atmosfera emocional.' },
      style: { label: 'ESTILO (TÉCNICA)', desc: 'Técnica Artística (3D, Foto, Colagem).' },
      elements: { label: 'ELEMENTOS (PROPS)', desc: 'Objetos, Logos, Personagens.' }
    };
  };

  const slotConfig = getSlotConfig(currentMode);

  const getCurrentReferences = () => {
    switch(currentMode) {
      case 'cenografia': return referencesCeno;
      case 'selos': return referencesSelos;
      default: return referencesKV;
    }
  };

  const SlotRender = ({ type, icon: Icon, value }: { type: CardType, icon: any, value: ReferenceCard | null }) => (
    <div className={`relative group border-2 border-dashed rounded-xl p-4 transition-all duration-300 flex flex-col justify-between h-48 ${value ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'}`}>
      {!value && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-2 p-2">
          <Icon size={28} className="text-gray-600 mb-1" />
          <span className="text-gray-400 font-bold text-sm">{(slotConfig as any)[type].label}</span>
          <p className="text-[10px] text-gray-500 leading-tight">{(slotConfig as any)[type].desc}</p>
        </div>
      )}
      {value && (
        <>
          <div className="flex flex-col items-center justify-center h-full gap-2 z-10">
            <div className={`p-3 rounded-full ${value.color} text-white shadow-lg`}>
              <value.icon size={24} />
            </div>
            <span className="font-bold text-white text-center text-sm px-2">{value.name}</span>
            <span className="text-[10px] text-indigo-300 uppercase tracking-wider">{(slotConfig as any)[type].label}</span>
          </div>
          <button onClick={() => clearSlot(type)} className="absolute top-2 right-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-20"><X size={16} /></button>
        </>
      )}
    </div>
  );

  // RENDERIZAÇÃO
  if (currentMode === 'database') {
    return (
      <div className="flex flex-col h-screen bg-[#0f111a] text-gray-300 font-sans overflow-hidden">
        <Header currentMode={currentMode} setCurrentMode={setCurrentMode} />
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Database className="text-indigo-500" /> Central de Conhecimento Visual
            </h2>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <DatabaseSection title="Banco de KVs" subtitle="Campanhas" icon={Grid} count="1,240 Assets" color="text-red-500" bgColor="bg-red-500/10" hoverBorder="hover:border-red-500/50" />
              <DatabaseSection title="Banco de Cenografia" subtitle="Stands" icon={Tent} count="85 Projetos" color="text-cyan-500" bgColor="bg-cyan-500/10" hoverBorder="hover:border-cyan-500/50" />
              <DatabaseSection title="Banco de Ilustração" subtitle="Artes" icon={PenTool} count="430 Artes" color="text-yellow-500" bgColor="bg-yellow-500/10" hoverBorder="hover:border-yellow-500/50" />
              <DatabaseSection title="Banco de Selos/Naming" subtitle="Logos" icon={Stamp} count="210 Selos" color="text-purple-500" bgColor="bg-purple-500/10" hoverBorder="hover:border-purple-500/50" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentMode === 'illustracao') {
    return (
      <div className="flex flex-col h-screen bg-[#0f111a] text-gray-300 font-sans overflow-hidden">
        <Header currentMode={currentMode} setCurrentMode={setCurrentMode} />
        <div className="bg-orange-900/10 border-b border-orange-500/20 px-6 py-2 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-orange-400" />
              <span className="text-xs font-bold text-orange-200 uppercase tracking-wider">Agente Ativo: Rubber Hose Surrealista</span>
           </div>
           <div className="flex items-center gap-4 text-[10px] text-gray-500">
              <span className="flex items-center gap-1 hover:text-white cursor-pointer"><Sliders size={10}/> Ajustar Fidelidade</span>
              <span className="flex items-center gap-1 hover:text-white cursor-pointer"><Maximize2 size={10}/> Proporção: 1:1</span>
           </div>
        </div>
        <main className="flex-1 p-6 overflow-hidden">
          <div className="h-full grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
            <div className="col-span-3 flex flex-col gap-2 h-full">
               <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2"><Palette size={14}/> 1. Referência de Estilo</h3>
               <div className="flex-1 border-2 border-dashed border-gray-700 bg-gray-800/20 rounded-2xl flex flex-col items-center justify-center p-6 text-center hover:border-indigo-500/50 cursor-pointer">
                 <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4"><Upload size={20} className="text-gray-500"/></div>
                 <p className="text-sm font-medium text-gray-300">Arraste a imagem de ESTILO</p>
               </div>
            </div>
            <div className="col-span-4 flex flex-col gap-2 h-full">
               <h3 className="text-xs font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2"><Maximize2 size={14}/> 2. Estrutura & Pose</h3>
               <div className="h-1/2 border-2 border-dashed border-gray-700 bg-gray-800/20 rounded-2xl flex flex-col items-center justify-center p-6 text-center hover:border-pink-500/50 cursor-pointer">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-3"><ImageIcon size={18} className="text-gray-500"/></div>
                  <p className="text-xs font-medium text-gray-300">Referência de Pose (Opcional)</p>
               </div>
               <div className="h-1/2 relative">
                 <textarea className="w-full h-full bg-[#131620] border border-gray-700 rounded-2xl p-4 text-sm text-white resize-none" placeholder="Descreva o que você quer..." value={illuState.prompt} onChange={(e) => setIlluState({...illuState, prompt: e.target.value})}></textarea>
               </div>
            </div>
            <div className="col-span-5 flex flex-col gap-2 h-full">
               <h3 className="text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2"><Sparkles size={14}/> 3. Resultado Final</h3>
               <div className="flex-1 bg-black rounded-2xl border border-gray-800 relative overflow-hidden flex items-center justify-center">
                  {illuState.isGenerating ? <RefreshCw className="animate-spin text-green-500" size={32} /> : illuState.generatedImage ? (illuState.generatedImage.startsWith('http') ? <img src={illuState.generatedImage} className="w-full h-full object-contain" alt="Gen" /> : <div className={`w-full h-full ${illuState.generatedImage}`}></div>) : <div className="text-center opacity-30"><ArrowRight size={24} className="text-white mx-auto"/><p className="text-sm text-gray-400">Resultado aqui</p></div>}
               </div>
               <div className="bg-[#131620] rounded-xl border border-gray-800 p-3 h-32 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Prompt de Engenharia (Gerado pela IA)</span>
                     <button className="text-gray-500 hover:text-white flex items-center gap-1 text-[10px]"><Copy size={10}/> Copiar</button>
                  </div>
                  <div className="flex-1 bg-black/30 rounded p-2 overflow-y-auto">
                     <p className="text-[11px] font-mono text-green-400/80 leading-relaxed">
                        {illuState.isGenerating ? 'Aguardando geração...' : illuState.generatedPrompt || 'Aguardando input...'}
                     </p>
                  </div>
               </div>
               <button onClick={handleGenerateIllustration} disabled={illuState.isGenerating} className="h-14 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white transition-all">
                 {illuState.isGenerating ? 'Processando...' : <> RECRIAR NO ESTILO <Wand2 size={16}/> </>}
               </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // MODO PADRÃO
  return (
    <div className="flex flex-col h-screen bg-[#0f111a] text-gray-300 font-sans overflow-hidden">
      <Header currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <main className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        <section className="col-span-3 border-r border-gray-800 bg-[#131620] flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><Upload size={14} /> Upload</h3>
                  <BadgeMode mode={currentMode} />
                </div>
                <div className="border-2 border-dashed border-gray-700 hover:border-indigo-500 bg-gray-800/30 rounded-xl p-6 text-center transition-all cursor-pointer group">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3"><ImageIcon size={20} className="text-gray-500" /></div>
                  <p className="text-sm font-medium text-gray-300">Arraste referências</p>
                </div>
                <button onClick={handleAnalyze} className="w-full bg-indigo-600 text-white py-3 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2">{isAnalyzing ? <RefreshCw className="animate-spin" size={14}/> : <Wand2 size={14}/>} Analisar</button>
              </div>
              {showAssets && <div className="pt-4 border-t border-gray-800"><h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Assets</h3><div className="space-y-3">{getCurrentReferences().map((ref) => (<div key={ref.id} className="group"><div className="flex gap-2 mb-2"><div className={`w-8 h-8 rounded ${ref.thumbnail}`}></div><div><span className="text-[10px] font-bold text-gray-300">{ref.client}</span></div></div><div className="grid grid-cols-2 gap-1.5 pl-2 border-l-2 border-gray-800">{ref.cards.map((card) => (<button key={card.id} onClick={() => handleCardClick(card)} className="text-left bg-gray-800/50 p-1.5 rounded flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full ${card.color}`}></div><span className="text-[9px] text-gray-400">{card.name}</span></button>))}</div></div>))}</div></div>}
          </div>
        </section>
        <section className="col-span-5 flex flex-col relative bg-[#131620]">
          <div className="relative z-10 flex-1 p-6 flex flex-col">
            <div className="text-center mb-6 mt-4"><h2 className="text-xl font-bold text-white mb-1 flex items-center justify-center gap-2">Laboratório <ModeBadge mode={currentMode} /></h2></div>
            <div className="grid grid-cols-2 gap-4 mb-8 flex-1 content-center">
              <SlotRender type="structure" icon={LayoutTemplate} value={slots.structure} />
              <SlotRender type="light" icon={Lightbulb} value={slots.light} />
              <SlotRender type="style" icon={Palette} value={slots.style} />
              <SlotRender type="elements" icon={Box} value={slots.elements} />
            </div>
            <div className="flex flex-col items-center mb-8"><button onClick={handleGenerate} disabled={isGenerating} className={`w-full max-w-xs group ${getGradient(currentMode)} text-white h-12 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 text-sm`}>{isGenerating ? <RefreshCw className="animate-spin" size={16} /> : <Wand2 size={16} />} Gerar</button></div>
          </div>
        </section>
        <section className="col-span-4 border-l border-gray-800 bg-[#0f111a] flex flex-col">
          <div className="p-4 border-b border-gray-800 bg-[#131620]"><h3 className="font-bold text-gray-300 text-xs uppercase tracking-wider flex items-center gap-2"><Layers size={14}/> Galeria</h3></div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">{results.map((res) => (<div key={res.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800"><div className={`h-40 w-full ${res.imagePlaceholder} relative`}></div><div className="p-3"><p className="text-[10px] text-gray-400 mb-3">{res.mixDescription}</p><div className="grid grid-cols-2 gap-2"><button onClick={() => handleFeedback(res.id, 'approved')} className="bg-gray-800 text-gray-400 py-1.5 rounded text-[10px] font-bold"><Check size={12}/></button><button onClick={() => handleFeedback(res.id, 'rejected')} className="bg-gray-800 text-gray-400 py-1.5 rounded text-[10px] font-bold"><X size={12}/></button></div></div></div>))}</div>
        </section>
      </main>
    </div>
  );
}