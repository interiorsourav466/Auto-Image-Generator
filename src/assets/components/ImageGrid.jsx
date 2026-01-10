import { useEffect, useState, useCallback } from "react";

const ImageGrid = ({ category }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Logic for keywords: null shows random, otherwise shows category
  const getKeyword = () => {
    if (!category) return "random";
    return category === "trending" ? "nature" : "city";
  };

  const generateImages = useCallback(
    (count = 8) => {
      return Array.from({ length: count }, () => ({
        id: crypto.randomUUID(),
        url: `https://picsum.photos/seed/${Math.random()}/400/300?${getKeyword()}`,
        likes: Math.floor(Math.random() * 500),
        author: ["A. Chen", "M. Rossi", "J. Doe", "K. Smith"][
          Math.floor(Math.random() * 4)
        ],
      }));
    },
    [category]
  );

  useEffect(() => {
    setImages(generateImages(12));
  }, [category, generateImages]);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setImages((prev) => [...prev, ...generateImages(8)]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 600
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 shadow-sm border border-transparent hover:border-blue-500/50 transition-all duration-300"
          >
            <img
              src={img.url}
              alt="Gallery Item"
              className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <div className="flex justify-between items-center text-white text-[10px] font-bold tracking-wide uppercase">
                <span>{img.author}</span>
                <span className="bg-blue-600 px-2 py-0.5 rounded-full">
                  ❤️ {img.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-12">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
