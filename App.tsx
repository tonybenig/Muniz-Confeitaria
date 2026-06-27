import { useState, useEffect, useRef } from "react";

// ─── BUSINESS INFO ───────────────────────────────────────────────────────────
const BUSINESS_INFO = {
  name: "Muniz Confeitaria",
  whatsapp: "5573999234342",
  instagram: "@munizconfeitariaoficial",
  address: "Av. Dr. Bezerra de Menezes, 206, Santa Cruz Cabrália - BA, 45807-000",
  googleBusinessLink: "https://share.google/TefPdWAgt4RsdkLWS",
};

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Category = "Bolos Decorados" | "Docinhos Gourmet";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  tag?: string;
  popular?: boolean;
}

interface CakeBase {
  id: string;
  name: string;
  color: string;
  description: string;
  price: number;
}

interface CakeFilling {
  id: string;
  name: string;
  color: string;
  description: string;
  price: number;
}

interface CandyOption {
  id: string;
  name: string;
  color: string;
  emoji: string;
  price: number;
  description: string;
}

interface CandyBoxSize {
  id: string;
  quantity: number;
  price: number;
  name: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const MENU_ITEMS: MenuItem[] = [
  {
    id: "bolo-1", name: "Bolo Morango Silvestre",
    description: "Delicado bolo com cobertura aveludada, decorado com morangos frescos e selecionados no topo e na base. O clássico queridinho das encomendas.",
    price: 150, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    category: "Bolos Decorados", tag: "Campeão de Vendas", popular: true,
  },
  {
    id: "bolo-2", name: "Bolo Borboletas do Campo",
    description: "Bolo com acabamento ondulado rosa pastel decorado com borboletas lilás comestíveis de papel arroz e pérolas de açúcar.",
    price: 165, image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800&q=80",
    category: "Bolos Decorados", tag: "Destaque", popular: true,
  },
  {
    id: "bolo-3", name: "Bolo Temático Boteco",
    description: "Bolo branco decorado de forma impecável no tema Boteco da Heineken. Perfeito para festas descontraídas.",
    price: 170, image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",
    category: "Bolos Decorados",
  },
  {
    id: "bolo-4", name: "Bolo Escolar ABC",
    description: "Bolo temático perfeito para formaturas infantis e festas escolares. Decorado com lápis coloridos comestíveis.",
    price: 160, image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80",
    category: "Bolos Decorados", tag: "Infantil",
  },
  {
    id: "bolo-5", name: "Bolo Tropical Moana",
    description: "Bolo com degradê vibrante em tons de amarelo e laranja, decorado com palmeiras, ondas do mar e flores tropicais.",
    price: 180, image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=800&q=80",
    category: "Bolos Decorados",
  },
  {
    id: "bolo-7", name: "Bolo Naruto Ninja (Dois Andares)",
    description: "Bolo de dois andares com degradê rosa e amarelo e silhueta do Naruto. O favorito dos amantes de anime.",
    price: 260, image: "https://images.unsplash.com/photo-1519340333755-56e2f1d142ce?w=800&q=80",
    category: "Bolos Decorados", tag: "Premium", popular: true,
  },
  {
    id: "doce-trad-1", name: "Cento de Brigadeiro de Cacau 50%",
    description: "O clássico brigadeiro de panela cremoso feito com cacau nobre 50%, enrolado em granulado de chocolate belga (100 unidades).",
    price: 150, image: "https://images.unsplash.com/photo-1559620192-032c4bc4a447?w=800&q=80",
    category: "Docinhos Gourmet", tag: "Tradicional", popular: true,
  },
  {
    id: "doce-trad-2", name: "Cento de Brigadeiro de Ninho",
    description: "Brigadeiro gourmet suave de puro Leite Ninho, de consistência aveludada e derrete na boca (100 unidades).",
    price: 150, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    category: "Docinhos Gourmet", tag: "Tradicional",
  },
  {
    id: "doce-esp-1", name: "Cento de Brigadeiro de Paçoca",
    description: "Brigadeiro gourmet de amendoim selecionado com cobertura de paçoca esfarelada crocante (100 unidades).",
    price: 180, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    category: "Docinhos Gourmet", tag: "Especial", popular: true,
  },
  {
    id: "doce-esp-3", name: "Cento de Ninho com Nutella",
    description: "O queridinho: brigadeiro gourmet de leite Ninho recheado por dentro e finalizado com bico de Nutella pura (100 unidades).",
    price: 180, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    category: "Docinhos Gourmet", tag: "Campeão", popular: true,
  },
  {
    id: "doce-esp-7", name: "Cento de Brigadeiro de Churros",
    description: "Brigadeiro gourmet temperado com canela nobre, recheado e finalizado com doce de leite cremoso cozido na pressão (100 unidades).",
    price: 180, image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80",
    category: "Docinhos Gourmet", tag: "Especial", popular: true,
  },
  {
    id: "doce-esp-8", name: "Cento de Brigadeiro Surpresa de Uva",
    description: "Uva Thompson verde fresca, sem semente, envolta em uma camada fina e aveludada de brigadeiro branco (100 unidades).",
    price: 180, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    category: "Docinhos Gourmet", tag: "Especial", popular: true,
  },
];

const CAKE_BASES: CakeBase[] = [
  { id: "base-baunilha", name: "Massa Branca (Chiffon)", color: "#F9F6EE", price: 30, description: "Massa branca clássica super leve, úmida e fofinha de baunilha." },
  { id: "base-chocolate", name: "Massa de Chocolate", color: "#2B1B17", price: 35, description: "Massa chocolatuda fofinha com cacau selecionado 50%." },
];

const CAKE_FILLINGS: CakeFilling[] = [
  { id: "fill-brigadeiro", name: "Brigadeiro Tradicional", color: "#3D2314", price: 40, description: "Creme cremoso gourmet de chocolate ao leite nobre." },
  { id: "fill-ninho", name: "Brigadeiro de Ninho", color: "#FFFDD0", price: 40, description: "Creme clássico de leite Ninho aveludado e cremoso." },
  { id: "fill-pacoca", name: "Brigadeiro de Paçoca", color: "#D2B48C", price: 40, description: "Recheio cremoso com amendoim moído e toque de paçoca." },
  { id: "fill-prestigio", name: "Prestígio", color: "#E8E8E8", price: 40, description: "A tradicional combinação de coco ralado úmido e creme de chocolate." },
  { id: "fill-ninho-nutella", name: "Ninho com Nutella", color: "#EEDC82", price: 50, description: "Creme aveludado de Leite Ninho combinado com bicos de Nutella pura." },
  { id: "fill-ninho-morango", name: "Ninho com Morango", color: "#FFE4E1", price: 50, description: "Creme de Ninho aerado com geleia de morango artesanal caseira." },
  { id: "fill-ninho-maracuja", name: "Ninho com Maracujá", color: "#FFF8DC", price: 50, description: "Brigadeiro de Ninho com nossa compota fresca de maracujá." },
  { id: "fill-churros", name: "Churros com Doce de Leite", color: "#CD853F", price: 50, description: "Recheio de canela finalizado com doce de leite artesanal." },
];

const CANDY_OPTIONS: CandyOption[] = [
  { id: "candy-cacau", name: "Cacau 50%", color: "#3D2314", emoji: "🟤", price: 1.5, description: "O tradicional brigadeiro com cacau nobre." },
  { id: "candy-ninho", name: "Leite Ninho", color: "#FFFDD0", emoji: "⚪", price: 1.5, description: "Brigadeiro suave de puro leite Ninho." },
  { id: "candy-casadinho", name: "Casadinho", color: "#FAF0E6", emoji: "🌓", price: 1.5, description: "Meio a meio: brigadeiro preto e branco." },
  { id: "candy-prestigio", name: "Prestígio", color: "#D2B48C", emoji: "🥥", price: 1.5, description: "Brigadeiro de chocolate com coco ralado." },
  { id: "candy-pacoca", name: "Paçoca", color: "#DEB887", emoji: "🥜", price: 1.8, description: "Sabor marcante de paçoca de amendoim." },
  { id: "candy-cappuccino", name: "Cappuccino", color: "#8B4513", emoji: "☕", price: 1.8, description: "Brigadeiro gourmet com café e canela." },
  { id: "candy-ninho-nutella", name: "Ninho + Nutella", color: "#CD853F", emoji: "🎯", price: 1.8, description: "Brigadeiro de Ninho coroado com Nutella pura." },
  { id: "candy-napolitano", name: "Napolitano", color: "#FFB6C1", emoji: "🚦", price: 1.8, description: "Tricolor: brigadeiro, branco e morango." },
  { id: "candy-morango", name: "Morango", color: "#FF69B4", emoji: "🍓", price: 1.8, description: "Delicioso bicho de pé gourmet de morango." },
  { id: "candy-maracuja", name: "Maracujá", color: "#FFD700", emoji: "🟡", price: 1.8, description: "Cítrico e adocicado feito de maracujá puro." },
  { id: "candy-churros", name: "Churros", color: "#D2691E", emoji: "🌀", price: 1.8, description: "Toque de canela finalizado com doce de leite." },
  { id: "candy-uva", name: "Surpresa de Uva", color: "#98FB98", emoji: "🍇", price: 1.8, description: "Uva sem semente coberta de brigadeiro branco." },
];

const CANDY_BOX_SIZES: CandyBoxSize[] = [
  { id: "box-12", quantity: 12, price: 20, name: "Caixa Degustação (12 doces)" },
  { id: "box-24", quantity: 24, price: 38, name: "Caixa Presente (24 doces)" },
  { id: "box-50", quantity: 50, price: 78, name: "Caixa Festa Média (50 doces)" },
  { id: "box-100", quantity: 100, price: 150, name: "Banquete de Doces (100 doces)" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const wa = (text: string) =>
  `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ─── ICONS (inline SVG) ───────────────────────────────────────────────────────
const WhatsappIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ─── HEADER ──────────────────────────────────────────────────────────────────
function Header({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const nav = [
    { id: "home", label: "Início" },
    { id: "atelie", label: "Ateliê Digital" },
    { id: "menu", label: "Cardápio" },
    { id: "sobre", label: "Sobre" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EBE4D8]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center space-x-2 group"
        >
          <span className="text-xl font-serif font-bold text-[#1A120B]">Muniz</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29B38] pt-1">Confeitaria</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-xs font-semibold uppercase tracking-wider text-[#5C4D3C] hover:text-[#C29B38] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <a
            href={wa("Olá, Muniz Confeitaria! Vim pelo site e gostaria de fazer uma encomenda.")}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-full hover:bg-[#20ba56] transition-colors"
          >
            <WhatsappIcon className="w-3.5 h-3.5" />
            <span>Encomendar</span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block w-5 h-0.5 bg-[#1A120B] transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1A120B] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1A120B] transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#EBE4D8] px-4 py-4 space-y-3">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className="block w-full text-left text-sm font-semibold text-[#1A120B] py-2"
            >
              {item.label}
            </button>
          ))}
          <a
            href={wa("Olá, Muniz Confeitaria! Vim pelo site e gostaria de fazer uma encomenda.")}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-3 bg-[#25D366] text-white text-sm font-bold rounded-full"
          >
            <WhatsappIcon className="w-4 h-4" />
            <span>Encomendar pelo WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #C29B38 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Warm glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C29B38]/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#C29B38] mb-6 px-4 py-1.5 border border-[#C29B38]/30 rounded-full bg-[#C29B38]/5">
          ✦ Ateliê de Bolos & Doces Finos ✦
        </span>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1A120B] leading-[1.1] mb-6">
          Cada detalhe feito
          <br />
          <span className="italic text-[#C29B38]">com amor</span>
        </h1>

        <p className="text-base sm:text-lg text-[#5C4D3C] max-w-xl mx-auto leading-relaxed mb-10 font-light">
          Bolos decorados sob encomenda e docinhos gourmet para tornar os seus momentos especiais ainda mais doces e inesquecíveis.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate("atelie")}
            className="px-8 py-4 bg-[#1A120B] text-white text-sm font-bold rounded-full hover:bg-[#C29B38] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            ✨ Montar meu bolo no Ateliê Digital
          </button>
          <a
            href={wa("Olá! Vim pelo site e quero fazer uma encomenda de bolos ou doces. Podem me ajudar?")}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center space-x-2 px-8 py-4 border-2 border-[#25D366] text-[#1A120B] text-sm font-bold rounded-full hover:bg-[#25D366] hover:text-white transition-all duration-300"
          >
            <WhatsappIcon className="w-4 h-4 text-[#25D366] group-hover:text-white" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { icon: "🎂", label: "Bolos Decorados", sub: "Sob encomenda" },
            { icon: "🍫", label: "Docinhos Finos", sub: "12 sabores" },
            { icon: "💛", label: "Feito com amor", sub: "Desde sempre" },
          ].map((b) => (
            <div key={b.label} className="text-center">
              <div className="text-2xl mb-1">{b.icon}</div>
              <p className="text-[11px] font-bold text-[#1A120B]">{b.label}</p>
              <p className="text-[10px] text-[#9E8A78]">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
        <span className="text-[10px] font-mono text-[#9E8A78] uppercase tracking-widest">Role para ver</span>
        <svg className="w-4 h-4 text-[#C29B38]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ─── ATELIÊ DIGITAL ───────────────────────────────────────────────────────────
function AtelieDigital() {
  const [mode, setMode] = useState<"cake" | "box">("cake");

  // Cake builder state
  const [tiers, setTiers] = useState(1);
  const [selectedBase, setSelectedBase] = useState(CAKE_BASES[0]);
  const [selectedFilling, setSelectedFilling] = useState(CAKE_FILLINGS[0]);
  const [cakeStep, setCakeStep] = useState(0);

  // Candy box state
  const [selectedBoxSize, setSelectedBoxSize] = useState(CANDY_BOX_SIZES[0]);
  const [candyItems, setCandyItems] = useState<{ [id: string]: number }>({});

  const servings = tiers === 1 ? 15 : tiers === 2 ? 30 : 50;
  const cakePrice =
    (tiers === 1 ? 0 : tiers === 2 ? 80 : 160) + selectedBase.price + selectedFilling.price;

  const totalCandies = Object.values(candyItems).reduce((a, b) => a + b, 0);
  const boxCapacity = selectedBoxSize.quantity;

  const addCandy = (id: string) => {
    if (totalCandies >= boxCapacity) return;
    setCandyItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const removeCandy = (id: string) => {
    setCandyItems((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id]--;
      else delete updated[id];
      return updated;
    });
  };

  const buildCakeMessage = () => {
    return `Olá, Muniz Confeitaria! 🎂\n\nGostaria de encomendar um bolo personalizado:\n\n• Andares: ${tiers} andar(es) (~${servings} pessoas)\n• Massa: ${selectedBase.name}\n• Recheio: ${selectedFilling.name}\n\nEstimativa: ${fmt(cakePrice + 50)} (base + cobertura)\n\nPodem confirmar disponibilidade e prazo?`;
  };

  const buildBoxMessage = () => {
    const details = Object.entries(candyItems)
      .map(([id, qty]) => {
        const candy = CANDY_OPTIONS.find((c) => c.id === id);
        return `  • ${candy?.name}: ${qty} unidade(s)`;
      })
      .join("\n");
    return `Olá, Muniz Confeitaria! 🍫\n\nGostaria de encomendar uma caixa de doces:\n\n• Tamanho: ${selectedBoxSize.name}\n• Doces escolhidos:\n${details}\n\nTotal de doces: ${totalCandies}/${boxCapacity}\n\nPodem confirmar disponibilidade?`;
  };

  const cakeSteps = ["Andares", "Massa", "Recheio"];

  return (
    <section className="py-20 bg-white" id="atelie-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C29B38]">
            Criação Interativa
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A120B] mt-2">
            Ateliê Digital de Criação
          </h2>
          <p className="text-sm text-[#5C4D3C] mt-3 max-w-lg mx-auto">
            Monte o seu bolo personalizado ou caixinha de doces e envie diretamente pelo WhatsApp.
          </p>
        </div>

        {/* Mode Switch */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#FAF7F2] rounded-full p-1 border border-[#EBE4D8]">
            {[
              { id: "cake", label: "🎂 Montar Bolo" },
              { id: "box", label: "🍫 Caixa de Doces" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setMode(opt.id as "cake" | "box")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  mode === opt.id
                    ? "bg-[#1A120B] text-white shadow"
                    : "text-[#5C4D3C] hover:text-[#1A120B]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CAKE BUILDER ── */}
        {mode === "cake" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Visual preview */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#EBE4D8] flex flex-col items-center justify-center min-h-[380px]">
              <div className="relative flex flex-col items-center justify-end" style={{ height: 220 }}>
                {/* Cake tiers */}
                {Array.from({ length: tiers }).map((_, i) => {
                  const w = tiers === 1 ? 160 : tiers === 2 ? [180, 130][i] : [200, 155, 110][i];
                  const h = tiers === 1 ? 100 : tiers === 2 ? [80, 70][i] : [70, 60, 55][i];
                  return (
                    <div
                      key={i}
                      className="rounded-xl border-2 border-white shadow-md flex items-center justify-center transition-all duration-500"
                      style={{
                        width: w,
                        height: h,
                        backgroundColor: selectedBase.color === "#F9F6EE" ? "#F5E6C8" : "#3D2314",
                        borderColor: selectedFilling.color,
                        boxShadow: `0 4px 16px ${selectedFilling.color}44`,
                      }}
                    >
                      {i === 0 && (
                        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                          {selectedBase.name.split(" ")[0]}
                        </span>
                      )}
                    </div>
                  );
                })}
                {/* Topper */}
                <div className="absolute -top-6 text-2xl">🎂</div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs font-bold text-[#1A120B]">{tiers} andar(es) · {servings} pessoas</p>
                <p className="text-[10px] text-[#9E8A78] mt-1">{selectedBase.name} · {selectedFilling.name}</p>
                <p className="text-lg font-serif font-bold text-[#C29B38] mt-2">
                  a partir de {fmt(cakePrice + 50)}
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {/* Step nav */}
              <div className="flex space-x-2 mb-6">
                {cakeSteps.map((step, i) => (
                  <button
                    key={step}
                    onClick={() => setCakeStep(i)}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition-all ${
                      cakeStep === i
                        ? "bg-[#1A120B] text-white"
                        : "bg-[#FAF7F2] text-[#5C4D3C] border border-[#EBE4D8]"
                    }`}
                  >
                    {i + 1}. {step}
                  </button>
                ))}
              </div>

              {/* Step 0: Tiers */}
              {cakeStep === 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1A120B]">Quantos andares?</h3>
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      onClick={() => setTiers(n)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                        tiers === n
                          ? "border-[#C29B38] bg-[#C29B38]/5"
                          : "border-[#EBE4D8] bg-white hover:border-[#C29B38]/40"
                      }`}
                    >
                      <span className="text-sm font-bold text-[#1A120B]">
                        {n} andar{n > 1 ? "es" : ""}
                      </span>
                      <span className="text-[11px] text-[#9E8A78] ml-2">· ~{n === 1 ? 15 : n === 2 ? 30 : 50} pessoas</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setCakeStep(1)}
                    className="w-full py-3 mt-2 bg-[#1A120B] text-white text-xs font-bold rounded-full hover:bg-[#C29B38] transition-colors"
                  >
                    Próximo →
                  </button>
                </div>
              )}

              {/* Step 1: Base */}
              {cakeStep === 1 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1A120B]">Escolha a massa</h3>
                  {CAKE_BASES.map((base) => (
                    <button
                      key={base.id}
                      onClick={() => setSelectedBase(base)}
                      className={`w-full p-4 rounded-2xl border-2 text-left flex items-center space-x-4 transition-all ${
                        selectedBase.id === base.id
                          ? "border-[#C29B38] bg-[#C29B38]/5"
                          : "border-[#EBE4D8] bg-white hover:border-[#C29B38]/40"
                      }`}
                    >
                      <span
                        className="w-8 h-8 rounded-full border border-[#EBE4D8] shrink-0"
                        style={{ backgroundColor: base.color === "#F9F6EE" ? "#F5E6C8" : "#3D2314" }}
                      />
                      <div>
                        <p className="text-sm font-bold text-[#1A120B]">{base.name}</p>
                        <p className="text-[11px] text-[#9E8A78]">{base.description}</p>
                      </div>
                    </button>
                  ))}
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => setCakeStep(0)} className="flex-1 py-3 border border-[#EBE4D8] text-xs font-bold rounded-full text-[#5C4D3C]">
                      ← Voltar
                    </button>
                    <button onClick={() => setCakeStep(2)} className="flex-1 py-3 bg-[#1A120B] text-white text-xs font-bold rounded-full hover:bg-[#C29B38] transition-colors">
                      Próximo →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Filling */}
              {cakeStep === 2 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1A120B]">Escolha o recheio</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                    {CAKE_FILLINGS.map((fill) => (
                      <button
                        key={fill.id}
                        onClick={() => setSelectedFilling(fill)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          selectedFilling.id === fill.id
                            ? "border-[#C29B38] bg-[#C29B38]/5"
                            : "border-[#EBE4D8] bg-white hover:border-[#C29B38]/40"
                        }`}
                      >
                        <span
                          className="block w-5 h-5 rounded-full mb-2 border border-[#EBE4D8]"
                          style={{ backgroundColor: fill.color }}
                        />
                        <p className="text-[11px] font-bold text-[#1A120B] leading-tight">{fill.name}</p>
                        <p className="text-[10px] text-[#C29B38] mt-0.5">+ {fmt(fill.price)}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => setCakeStep(1)} className="flex-1 py-3 border border-[#EBE4D8] text-xs font-bold rounded-full text-[#5C4D3C]">
                      ← Voltar
                    </button>
                    <a
                      href={wa(buildCakeMessage())}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 py-3 bg-[#25D366] text-white text-xs font-bold rounded-full hover:bg-[#20ba56] transition-colors text-center flex items-center justify-center space-x-1.5"
                    >
                      <WhatsappIcon className="w-3.5 h-3.5" />
                      <span>Enviar pedido</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CANDY BOX ── */}
        {mode === "box" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Box preview */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#EBE4D8]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#1A120B]">Sua caixinha</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  totalCandies === boxCapacity ? "bg-emerald-100 text-emerald-700" : "bg-[#EBE4D8] text-[#5C4D3C]"
                }`}>
                  {totalCandies}/{boxCapacity} doces
                </span>
              </div>

              {/* Box size selector */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {CANDY_BOX_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => { setSelectedBoxSize(size); setCandyItems({}); }}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedBoxSize.id === size.id
                        ? "border-[#C29B38] bg-[#C29B38]/5"
                        : "border-[#EBE4D8] bg-white"
                    }`}
                  >
                    <p className="text-[11px] font-bold text-[#1A120B]">{size.name}</p>
                    <p className="text-[11px] text-[#C29B38] mt-0.5 font-bold">{fmt(size.price)}</p>
                  </button>
                ))}
              </div>

              {/* Selected candies */}
              {Object.keys(candyItems).length === 0 ? (
                <div className="text-center py-8 text-[#9E8A78] text-xs">
                  <div className="text-3xl mb-2">🍫</div>
                  Escolha os doces ao lado
                </div>
              ) : (
                <div className="space-y-2">
                  {Object.entries(candyItems).map(([id, qty]) => {
                    const candy = CANDY_OPTIONS.find((c) => c.id === id)!;
                    return (
                      <div key={id} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-[#EBE4D8]">
                        <div className="flex items-center space-x-2">
                          <span>{candy.emoji}</span>
                          <span className="text-[11px] font-semibold text-[#1A120B]">{candy.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => removeCandy(id)} className="w-5 h-5 rounded-full bg-[#EBE4D8] text-[#5C4D3C] text-xs font-bold flex items-center justify-center">−</button>
                          <span className="text-xs font-bold w-4 text-center">{qty}</span>
                          <button onClick={() => addCandy(id)} disabled={totalCandies >= boxCapacity} className="w-5 h-5 rounded-full bg-[#1A120B] text-white text-xs font-bold flex items-center justify-center disabled:opacity-40">+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {totalCandies > 0 && (
                <a
                  href={wa(buildBoxMessage())}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-4 w-full py-3 bg-[#25D366] text-white text-xs font-bold rounded-full hover:bg-[#20ba56] transition-colors flex items-center justify-center space-x-2"
                >
                  <WhatsappIcon className="w-3.5 h-3.5" />
                  <span>Pedir esta caixinha ({fmt(selectedBoxSize.price)})</span>
                </a>
              )}
            </div>

            {/* Candy grid */}
            <div>
              <h3 className="text-sm font-bold text-[#1A120B] mb-4">Escolha os sabores</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {CANDY_OPTIONS.map((candy) => {
                  const qty = candyItems[candy.id] || 0;
                  return (
                    <button
                      key={candy.id}
                      onClick={() => addCandy(candy.id)}
                      disabled={totalCandies >= boxCapacity && !qty}
                      className={`p-3 rounded-2xl border-2 text-center transition-all ${
                        qty > 0
                          ? "border-[#C29B38] bg-[#C29B38]/5"
                          : "border-[#EBE4D8] bg-white hover:border-[#C29B38]/40"
                      } disabled:opacity-40`}
                    >
                      <div className="text-2xl mb-1">{candy.emoji}</div>
                      <p className="text-[10px] font-bold text-[#1A120B] leading-tight">{candy.name}</p>
                      {qty > 0 && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#C29B38] text-white text-[9px] font-bold rounded-full">
                          {qty}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── MENU ────────────────────────────────────────────────────────────────────
function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("Bolos Decorados");

  const filtered = MENU_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <section className="py-20 bg-[#FAF7F2]" id="menu-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C29B38]">
            Cardápio Completo
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A120B] mt-2">
            Nossas Criações
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white rounded-full p-1 border border-[#EBE4D8] shadow-sm">
            {(["Bolos Decorados", "Docinhos Gourmet"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#1A120B] text-white shadow"
                    : "text-[#5C4D3C] hover:text-[#1A120B]"
                }`}
              >
                {cat === "Bolos Decorados" ? "🎂 " : "🍫 "}{cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EBE4D8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.tag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A120B]/90 text-[#C29B38] text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {item.tag}
                  </span>
                )}
                {item.popular && (
                  <span className="absolute top-3 right-3 text-base">⭐</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-[#1A120B] text-base mb-1">{item.name}</h3>
                <p className="text-[11px] text-[#5C4D3C] leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-serif font-bold text-[#C29B38]">{fmt(item.price)}</span>
                  <a
                    href={wa(`Olá! Tenho interesse no ${item.name} (${fmt(item.price)}). Podem me dar mais informações?`)}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-4 py-2 bg-[#25D366] text-white text-[11px] font-bold rounded-full hover:bg-[#20ba56] transition-colors"
                  >
                    <WhatsappIcon className="w-3 h-3" />
                    <span>Encomendar</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOBRE ───────────────────────────────────────────────────────────────────
function Sobre() {
  return (
    <section className="py-20 bg-white border-y border-[#EBE4D8]/60" id="sobre-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C29B38]">
              Nossa Confeitaria Fina
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A120B]">
              Tradição e Carinho em Cada Detalhe
            </h2>
            <p className="text-sm text-[#5C4D3C] leading-relaxed">
              A Muniz Confeitaria é reconhecida pela dedicação ao paladar e carinho em cada detalhe. Cada receita é elaborada com insumos altamente selecionados, desde frutas colhidas no ponto ótimo de doçura até chocolates nobres de padrão internacional.
            </p>
            <div className="space-y-4">
              {[
                { icon: "⭐", title: "Avaliação de Excelência", desc: "Aprovada pela comunidade com avaliações calorosas e nota máxima de aprovação." },
                { icon: "📍", title: "Localização", desc: `${BUSINESS_INFO.address}. Retirada segura ou entrega agendada.` },
                { icon: "📦", title: "Encomendas via WhatsApp", desc: "Agende com facilidade e segurança pelo nosso atendimento direto." },
              ].map((item) => (
                <div key={item.title} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5 text-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A120B] uppercase">{item.title}</h4>
                    <p className="text-[11px] text-[#5C4D3C] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={BUSINESS_INFO.googleBusinessLink}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#1A120B] hover:bg-[#C29B38] text-white text-xs font-bold rounded-full transition-colors shadow-md"
              >
                <span>🌟 Ver no Google Negócios</span>
              </a>
              <a
                href={wa("Olá! Visitei o site e gostaria de fazer uma encomenda.")}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold rounded-full transition-colors shadow-md"
              >
                <WhatsappIcon className="w-3.5 h-3.5" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="bg-[#FAF7F2] border border-[#EBE4D8] rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-4">
              <span className="text-[11px] font-mono uppercase text-[#9E8A78]">Atendimento Digital</span>
              <span className="text-[11px] font-mono text-emerald-600 font-bold">● Recebendo Encomendas</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎂", title: "Bolos Decorados", sub: "Sob encomenda prévia" },
                { icon: "🍫", title: "Docinhos Gourmet", sub: "12 sabores finos" },
                { icon: "📦", title: "Caixas Presente", sub: "12, 24, 50 ou 100 doces" },
                { icon: "🚚", title: "Entrega Agendada", sub: "Ou retirada no local" },
              ].map((item) => (
                <div key={item.title} className="p-4 bg-white rounded-2xl border border-[#EBE4D8]">
                  <p className="text-xl mb-1">{item.icon}</p>
                  <h4 className="text-xs font-bold text-[#1A120B] uppercase">{item.title}</h4>
                  <p className="text-[10px] text-[#9E8A78] mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <footer className="bg-[#1A120B] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-serif font-bold">Muniz</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29B38] pt-1">Confeitaria</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Ateliê de Bolos & Doces Finos em Santa Cruz Cabrália — BA. Cada criação é feita com amor, carinho e os melhores ingredientes.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C29B38] mb-4">Navegação</h4>
            <ul className="space-y-2">
              {[
                { id: "home", label: "Início" },
                { id: "atelie", label: "Ateliê Digital" },
                { id: "menu", label: "Cardápio" },
                { id: "sobre", label: "Sobre" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-xs text-white/60 hover:text-[#C29B38] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C29B38] mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={wa("Olá, Muniz Confeitaria! Gostaria de fazer uma encomenda.")}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs text-white/60 hover:text-[#25D366] transition-colors"
                >
                  <WhatsappIcon className="w-4 h-4" />
                  <span>(73) 99923-4342</span>
                </a>
              </li>
              <li className="text-xs text-white/60">📍 {BUSINESS_INFO.address}</li>
              <li>
                <a
                  href={`https://instagram.com/${BUSINESS_INFO.instagram.replace("@", "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-white/60 hover:text-[#C29B38] transition-colors"
                >
                  Instagram: {BUSINESS_INFO.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/40">© {new Date().getFullYear()} Muniz Confeitaria. Todos os direitos reservados.</p>
          <a
            href={BUSINESS_INFO.googleBusinessLink}
            target="_blank" rel="noopener noreferrer"
            className="text-[11px] text-white/40 hover:text-[#C29B38] transition-colors"
          >
            Ver no Google Negócios ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const handleNavigate = (section: string) => {
    const id = section === "home" ? "home-section" : `${section}-section`;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A120B] font-sans antialiased">
      {/* Top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#1A120B] via-[#C29B38] to-[#1A120B] fixed top-0 z-50" />

      <Header onNavigate={handleNavigate} />

      <div id="home-section" className="pt-1.5">
        <Hero onNavigate={handleNavigate} />
      </div>

      <AtelieDigital />

      <Menu />

      <Sobre />

      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp button */}
      <a
        href={wa("Olá, Muniz Confeitaria! Vi o site de vocês e gostaria de fazer uma encomenda.")}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 group duration-300"
        title="Falar no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <WhatsappIcon className="w-7 h-7 text-white relative z-10" />
        <span className="absolute bottom-16 left-0 bg-[#1A120B] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          WhatsApp Muniz 💬
        </span>
      </a>
    </div>
  );
}
