import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Calendar, Search } from "lucide-react";
import { mockArticles } from "../data/blogArticles";

const blogCategories = [
  "All",
  "AI & GenAI",
  "Data Science",
  "Cybersecurity",
  "Digital Marketing",
  "Software Eng",
  "Career & Growth"
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = mockArticles.find(a => a.featured);
  const gridArticles = filteredArticles.filter(a => !a.featured || activeCategory !== "All" || searchQuery !== "");

  return (
    <div className="bg-[#05050A] min-h-screen text-white font-sans selection:bg-blue-500/30">
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15)_0%,transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Atorax <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Insights</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Expert engineering perspectives, career advice, and deep dives into AI, Data, and Cybersecurity.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
            {blogCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all border ${
                  activeCategory === cat 
                    ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        
        {/* Featured Article */}
        {activeCategory === "All" && searchQuery === "" && featuredArticle && (
          <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="block mb-16 group cursor-pointer">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col md:flex-row min-h-[400px] hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-500">
              <div className="w-full md:w-1/2 relative overflow-hidden bg-[#0a0a12]">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                    FEATURED
                  </span>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-400 font-bold text-sm tracking-wider uppercase">{featuredArticle.category}</span>
                  <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                  <span className="flex items-center gap-1.5 text-gray-400 text-sm"><Calendar size={14} /> {featuredArticle.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-400 text-lg mb-8 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium"><Clock size={14} /> {featuredArticle.readTime}</span>
                  <span className="flex items-center gap-2 text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
                    Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {gridArticles.map((article, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={article.id}
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="h-48 w-full relative overflow-hidden bg-[#0a0a12]">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,10,1),transparent)] opacity-80"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-[#05050A] text-gray-300 border border-white/10 text-[10px] font-bold uppercase px-3 py-1 rounded-md tracking-wider">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 text-gray-500 text-xs font-medium">
                      <span className="flex items-center gap-1.5"><Calendar size={13} /> {article.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} /> {article.readTime}</span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
          {gridArticles.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-xl">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
