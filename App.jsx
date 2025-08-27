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

  if (currentScreen === "home") {
    return (
      <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
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

        <footer className={`text-center text-xs ${theme.textSecondary} mt-12 mb-6 px-4`}>
          Creado por Christian Núñez Vega, Asesor Pedagógico, Programa PACE-UDA, 2025
        </footer>

        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-2">
          <div className="flex justify-around">
            <button
              onClick={() => setCurrentScreen("home")}
              className="p-3 text-cyan-600 dark:text-cyan-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0