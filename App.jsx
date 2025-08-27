import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [expandedCard, setExpandedCard] = useState(null);
  const [progress, setProgress] = useState({
    m1: 0,
    m2: 0,
    m3: 0,
    m4: 0,
    m5: 0,
  });
  const [badges, setBadges] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [installPrompt, setInstallPrompt] = useState(null);

  const totalProgress = Object.values(progress).reduce((a, b) => a + b, 0) / 5;

  const addBadge = (badge) => {
    if (!badges.includes(badge)) {
      setBadges((prev) => [...prev, badge]);
      setTimeout(() => {
        alert(`🏆 ¡Nuevo logro desbloqueado: "${badge}"!`);
      }, 300);
    }
  };

  const updateProgress = (module, value) => {
    setProgress((prev) => {
      const newProgress = { ...prev, [module]: value };
      const total = Object.values(newProgress).reduce((a, b) => a + b, 0) / 5;
      if (total >= 20 && !badges.includes("Primeros pasos")) addBadge("Primeros pasos");
      if (total >= 50 && !badges.includes("Pensador crítico")) addBadge("Pensador crítico");
      if (total >= 80 && !badges.includes("Ciudadano digital")) addBadge("Ciudadano digital");
      return newProgress;
    });
  };

  // Detectar si se puede instalar
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const theme = darkMode
    ? {
        bg: "bg-gray-900",
        card: "bg-gray-800/40 backdrop-blur-lg border border-gray-700",
        text: "text-white",
        textSecondary: "text-gray-300",
        accent1: "from-cyan-500/20 to-teal-500/20",
        accent2: "bg-cyan-500",
        accent3: "bg-emerald-400",
        input: "bg-gray-700 text-white border-gray-600",
      }
    : {
        bg: "bg-gray-50",
        card: "bg-white/80 backdrop-blur-lg border border-gray-200",
        text: "text-gray-800",
        textSecondary: "text-gray-600",
        accent1: "from-sky-100 to-teal-50",
        accent2: "bg-sky-500",
        accent3: "bg-emerald-400",
        input: "bg-white text-gray-800 border-gray-300",
      };

  // Pantalla HOME actualizada
  if (currentScreen === "home") {
    return (
      <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
        {/* Header */}
        <header className={`${theme.card} m-4 mt-6 rounded-2xl p-4 flex justify-between items-center`}>
          <h1 className={`text-xl font-bold ${theme.text}`}>Pensar Crítico</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setFontSize(fontSize === 16 ? 18 : 16)}
              className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10M7 7h10M7 7v10h10V7" />
              </svg>
            </button>
            {installPrompt && (
              <button
                onClick={async () => {
                  const promptEvent = installPrompt;
                  promptEvent.prompt();
                  const outcome = await promptEvent.userChoice;
                  if (outcome === 'accepted') {
                    setInstallPrompt(null);
                  }
                }}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                title="Instalar app"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 3H7" />
                </svg>
              </button>
            )}
          </div>
        </header>

        {/* Hero */}
        <div className={`mx-4 mb-6 p-6 rounded-3xl bg-gradient-to-br ${theme.accent1} ${theme.text} shadow-lg`}>
          <h2 className="text-2xl font-bold mb-3">Reflexiona sobre el culto a la ignorancia</h2>
          <p className="opacity-90 mb-4">
            Una aplicación educativa interactiva para analizar críticamente cómo las plataformas digitales moldean nuestro pensamiento, 
            la información y nuestra identidad en la era del algoritmo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4">
            <div className={`${theme.card} p-3 rounded-xl`}>
              <strong>📚 Nivel:</strong> Cuarto Medio
            </div>
            <div className={`${theme.card} p-3 rounded-xl`}>
              <strong>✍️ Asignatura:</strong> Lengua y Literatura
            </div>
            <div className={`${theme.card} p-3 rounded-xl`}>
              <strong>🧠 Habilidades:</strong> Pensamiento crítico, Alfabetización mediática, Responsabilidad social
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mx-4 mb-6">
          <div className={`text-sm ${theme.textSecondary} mb-2`}>Progreso general</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-cyan-500 to-teal-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
          <div className="text-right mt-1">
            <span className={`text-sm ${theme.textSecondary}`}>{Math.round(totalProgress)}%</span>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { id: "m1", label: "Culto a la ignorancia", icon: "🧠" },
            { id: "m2", label: "Redes y verdad", icon: "🌐" },
            { id: "m3", label: "Influencers", icon: "🎭" },
            { id: "m4", label: "Escribe tu ensayo", icon: "📝" },
            { id: "m5", label: "Ciudadano digital", icon: "🌱" },
            { id: "profile", label: "Tu perfil", icon: "👤" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`${theme.card} p-4 rounded-2xl flex flex-col items-center gap-2 transform hover:scale-105 transition-all duration-200`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className={`text-xs font-medium text-center ${theme.text}`}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className={`text-center text-xs ${theme.textSecondary} mt-12 mb-6 px-4`}>
          Creado por Christian Núñez Vega, Asesor Pedagógico, Programa PACE-UDA, 2025
        </footer>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-2">
          <div className="flex justify-around">
            <button
              onClick={() => setCurrentScreen("home")}
              className="p-3 text-cyan-600 dark:text-cyan-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentScreen("profile")}
              className="p-3 text-gray-500 dark:text-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Módulos con Cards Expandibles
  const ModuleScreen = ({ id, title, icon, intro, content, activity, nextId }) => {
    const [swipeAnswer, setSwipeAnswer] = useState("");
    const [dragItems, setDragItems] = useState(activity.dragItems);

    const handleDrag = (from, to) => {
      const newItems = [...dragItems];
      const moved = newItems.splice(from, 1)[0];
      newItems.splice(to, 0, moved);
      setDragItems(newItems);
    };

    return (
      <div className={`min-h-screen ${theme.bg} transition-colors duration-300 p-4`} style={{ fontSize: `${fontSize}px` }}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className={`${theme.card} m-4 rounded-2xl p-4 flex justify-between items-center`}>
            <button
              onClick={() => setCurrentScreen("home")}
              className={`px-4 py-2 rounded-xl ${theme.textSecondary} hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors`}
            >
              ← Inicio
            </button>
            <h1 className={`text-xl font-bold ${theme.text}`}>{title}</h1>
            <div className={`w-10 h-10 rounded-full ${theme.accent2} flex items-center justify-center text-white`}>
              {icon}
            </div>
          </div>

          {/* Expandible Cards */}
          <div className="space-y-4 px-4">
            {/* Card 1: Introducción */}
            <div
              className={`${theme.card} rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl`}
              onClick={() => setExpandedCard(expandedCard === "intro" ? null : "intro")}
            >
              <div className="p-5 flex justify-between items-center">
                <h3 className={`font-semibold ${theme.text}`}>📚 Introducción</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${theme.textSecondary} transition-transform duration-300 ${
                    expandedCard === "intro" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedCard === "intro" && (
                <div className={`p-5 pt-0 ${theme.textSecondary} border-t ${theme.bg} space-y-2`}>
                  <p>{intro}</p>
                </div>
              )}
            </div>

            {/* Card 2: Contenido */}
            <div
              className={`${theme.card} rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl`}
              onClick={() => setExpandedCard(expandedCard === "content" ? null : "content")}
            >
              <div className="p-5 flex justify-between items-center">
                <h3 className={`font-semibold ${theme.text}`}>📖 Contenido</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${theme.textSecondary} transition-transform duration-300 ${
                    expandedCard === "content" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedCard === "content" && (
                <div className={`p-5 pt-0 ${theme.textSecondary} border-t ${theme.bg}`}>
                  {content.split("\n").map((p, i) => (
                    <p key={i} className="mb-3 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Card 3: Actividad Interactiva */}
            <div
              className={`${theme.card} rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl`}
              onClick={() => setExpandedCard(expandedCard === "activity" ? null : "activity")}
            >
              <div className="p-5 flex justify-between items-center">
                <h3 className={`font-semibold ${theme.text}`}>🎮 Actividad</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${theme.textSecondary} transition-transform duration-300 ${
                    expandedCard === "activity" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedCard === "activity" && (
                <div className={`p-5 pt-0 ${theme.bg}`}>
                  <p className={`mb-4 ${theme.textSecondary}`}>{activity.question}</p>

                  {/* Swipe Activity */}
                  {activity.type === "swipe" && (
                    <div className="space-y-3">
                      {activity.options.map((opt, i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            swipeAnswer === opt.text
                              ? opt.correct
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-red-500 bg-red-50 dark:bg-red-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSwipeAnswer(opt.text);
                              if (opt.correct) {
                                alert("✅ ¡Correcto! Esta idea está respaldada por Asimov.");
                                updateProgress(id, 100);
                              } else {
                                alert("⚠️ Revisa el texto. Esta es una opinión sin fundamento.");
                              }
                            }}
                            className={`w-full text-left ${theme.text}`}
                          >
                            {opt.text}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Drag & Drop Activity */}
                  {activity.type === "drag" && (
                    <div className="space-y-2">
                      {dragItems.map((item, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-xl ${theme.input} flex items-center justify-between cursor-grab active:cursor-grabbing`}
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData("text/plain", i)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const from = parseInt(e.dataTransfer.getData("text/plain"));
                            const to = i;
                            if (from !== to) handleDrag(from, to);
                          }}
                        >
                          <span>{item}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-3-3a2 2 0 112.828-2.828L10 7.172l2.586-2.586zm-3 6a2 2 0 11-2.828-2.828l3-3a2 2 0 112.828 2.828l-3 3a2 2 0 010 2.828z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const correctOrder = [
                            "La ciencia no es una opinión, es una metodología.",
                            "El 'like' es el amén. Compartir es la comunión.",
                            "Nos creemos libres, pero estamos protocolizados.",
                            "La identidad se convierte en mercancía.",
                          ];
                          if (JSON.stringify(dragItems) === JSON.stringify(correctOrder)) {
                            alert("✅ ¡Perfecto! Ordenaste correctamente las ideas clave.");
                            updateProgress(id, 100);
                          } else {
                            alert("💡 Intenta reordenar para mostrar la relación entre Asimov y Han.");
                          }
                        }}
                        className="w-full mt-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl"
                      >
                        Verificar orden
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Next Button */}
          {nextId && (
            <div className="p-6">
              <button
                onClick={() => setCurrentScreen(nextId)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Siguiente módulo →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Módulos (sin cambios)
  if (currentScreen === "m1") {
    return (
      <ModuleScreen
        id="m1"
        title="🧠 ¿Qué es el culto a la ignorancia?"
        icon="🧠"
        intro="Asimov advierte sobre el peligro de celebrar la ignorancia como 'libertad'."
        content={`Isaac Asimov escribió: "La idea de que todo el mundo tiene derecho a una opinión es absurda. Todo el mundo tiene derecho a tener acceso a información, pero no a una opinión sin fundamento." 

Hoy, en redes sociales, cualquiera puede decir cualquier cosa y ser escuchado. Pero ¿eso es democracia del conocimiento o culto a la ignorancia?

La ciencia no es una opinión. Es un método. Y cuando se trata con desprecio, se pone en riesgo el progreso humano.`}
        activity={{
          type: "swipe",
          question: "¿Cuál de estas afirmaciones está basada en evidencia científica?",
          options: [
            { text: "‘La Tierra es plana porque lo vi en un video.’", correct: false },
            { text: "‘Las vacunas salvan millones de vidas cada año.’", correct: true },
            { text: "‘Prefiero creer en mi intuición que en los científicos.’", correct: false },
            { text: "‘La ciencia es solo una opinión más.’", correct: false },
          ],
        }}
        nextId="m2"
      />
    );
  }

  if (currentScreen === "m2") {
    return (
      <ModuleScreen
        id="m2"
        title="🌐 Redes y consumo de verdad"
        icon="🌐"
        intro="Byung-Chul Han compara a los influencers con figuras religiosas."
        content={`Han dice: "El like es el amén. Compartir es la comunión. El consumo es la redención."

Los influencers venden no solo productos, sino identidades. Nos hacen creer que comprando lo que ellos usan, seremos más felices, más libres, más auténticos.

Pero esta libertad es falsa. Estamos siendo protocolizados: seguir, dar like, comprar, repetir. Es una liturgia digital.

Y en esta ceremonia, la ignorancia se celebra como si fuera sabiduría.`}
        activity={{
          type: "swipe",
          question: "¿Cuál de estas frases refleja mejor la 'eucaristía digital'?",
          options: [
            { text: "‘Compré el producto porque el influencer lo usa.’", correct: true },
            { text: "‘Investigué los ingredientes antes de comprar.’", correct: false },
            { text: "‘No sigo influencers, solo amigos.’", correct: false },
            { text: "‘Me gusta ver videos, pero no compro.’", correct: false },
          ],
        }}
        nextId="m3"
      />
    );
  }

  if (currentScreen === "m3") {
    return (
      <ModuleScreen
        id="m3"
        title="🎭 Influencers: Nuevos profetas"
        icon="🎭"
        intro="Los influencers prometen autorrealización a través del consumo."
        content={`Han advierte: "Nos consumimos hasta la muerte, mientras nos realizamos hasta la muerte."

La identidad ya no se construye desde dentro, sino desde afuera: a través de lo que compramos, lo que mostramos, lo que compartimos.

El consumismo se vuelve espiritual. Comprar no es solo necesidad: es ritual, es fe, es pertenencia.

Y en este sistema, la crítica es vista como traición. Pensar es desobedecer.`}
        activity={{
          type: "drag",
          question: "Ordena las ideas clave de Asimov y Han.",
          dragItems: [
            "La identidad se convierte en mercancía.",
            "La ciencia no es una opinión, es una metodología.",
            "Nos creemos libres, pero estamos protocolizados.",
            "El 'like' es el amén. Compartir es la comunión.",
          ],
        }}
        nextId="m4"
      />
    );
  }

  if (currentScreen === "m4") {
    return (
      <ModuleScreen
        id="m4"
        title="📝 Escribe tu ensayo"
        icon="📝"
        intro="Ahora es tu turno de reflexionar críticamente."
        content={`Usa lo aprendido para escribir tu ensayo. Recuerda:

- Introducción: presenta el problema del culto a la ignorancia.
- Desarrollo: compara Asimov y Han. Usa citas.
- Conclusión: reflexiona sobre tu rol como ciudadano digital.

Ejemplo de cita: "El consumo y la identidad se aúnan. La propia identidad deviene en una mercancía." (Han, 2022)`}
        activity={{
          type: "swipe",
          question: "¿Cuál es el propósito de tu ensayo?",
          options: [
            { text: "Demostrar que la ignorancia es peligrosa.", correct: true },
            { text: "Promover a mis influencers favoritos.", correct: false },
            { text: "Copiar lo que dice internet.", correct: false },
            { text: "Hacer memes sobre la ciencia.", correct: false },
          ],
        }}
        nextId="m5"
      />
    );
  }

  if (currentScreen === "m5") {
    return (
      <ModuleScreen
        id="m5"
        title="🌱 Mi rol como ciudadano digital"
        icon="🌱"
        intro="No eres solo un consumidor. Eres un pensador crítico."
        content={`Puedes elegir:

- Verificar antes de compartir.
- Cuestionar lo que ves.
- Buscar fuentes confiables.
- Usar tu voz para promover el conocimiento.

La verdadera libertad no es hacer lo que todos hacen. Es pensar por ti mismo.

Y en una era de algoritmos, esa es la forma más radical de resistencia.`}
        activity={{
          type: "swipe",
          question: "¿Qué acción tomarás para ser un ciudadano digital responsable?",
          options: [
            { text: "Verificaré antes de compartir noticias.", correct: true },
            { text: "Seguiré a más influencers.", correct: false },
            { text: "Usaré memes para debatir ciencia.", correct: false },
            { text: "No usaré redes sociales nunca más.", correct: false },
          ],
        }}
        nextId="profile"
      />
    );
  }

  if (currentScreen === "profile") {
    return (
      <div className={`min-h-screen ${theme.bg} transition-colors duration-300 p-6`}>
        <button
          onClick={() => setCurrentScreen("home")}
          className={`mb-4 px-4 py-2 rounded-xl ${theme.textSecondary} hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors`}
        >
          ← Inicio
        </button>
        <div className={`${theme.card} rounded-2xl p-6 max-w-md mx-auto text-center`}>
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <h2 className={`text-2xl font-bold ${theme.text}`}>Tu perfil</h2>
          <p className={`mt-2 ${theme.textSecondary}`}>Nivel: Pensador Crítico</p>
          <div className="mt-6">
            <div className={`text-sm ${theme.textSecondary} mb-2`}>Progreso general</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
            <div className="mt-6">
              <h3 className={`text-sm font-medium ${theme.text} mb-3`}>Logros</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {badges.length === 0 ? (
                  <span className={`text-sm ${theme.textSecondary}`}>Aún no tienes logros</span>
                ) : (
                  badges.map((b, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium"
                    >
                      🏆 {b}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Cargando...</div>;
};

export default App;