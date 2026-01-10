import { useEffect, useState } from "react";
import ImageGrid from "./assets/components/ImageGrid";
import { FcRefresh } from "react-icons/fc";

function App() {
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false
  );
  const [category, setCategory] = useState(null); // Default to null (General)
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggle Logic: If clicking the same category, deselect it
  const toggleCategory = (tab) => {
    setCategory(category === tab ? null : tab);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1
            className="text-xl font-black tracking-tighter text-blue-600 cursor-pointer"
            onClick={() => {
              setCategory(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            PHO.TO
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              {["trending", "explore"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => toggleCategory(tab)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-tight transition-all duration-300 ${
                    category === tab
                      ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm opacity-100"
                      : "opacity-40 hover:opacity-70 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={() => setDark(!dark)}
              className="w-10 h-10 flex items-center justify-center"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* TOP-MIDDLE REFRESH BUTTON */}
      <div className="sticky top-20 z-40 flex justify-center -mb-12 pointer-events-none">
        <button
          onClick={handleRefresh}
          className="pointer-events-auto flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all group"
        >
          <FcRefresh className="text-xl brightness-200 group-active:rotate-180 transition-transform duration-500" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Refresh
          </span>
        </button>
      </div>

      <header className="text-center pt-20 pb-8 px-4">
        {/* DYNAMIC MESSAGE LOGIC */}
        {category ? (
          <>
            <h2 className="text-4xl font-black tracking-tight capitalize">
              {category} <span className="text-blue-600">Feed</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Showing filtered results for {category} enthusiasts.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-black tracking-tight">
              General <span className="text-blue-600">Gallery</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Discover everything from across our creative community.
            </p>
          </>
        )}
      </header>

      <ImageGrid key={`${category}-${refreshKey}`} category={category} />
    </div>
  );
}

export default App;
