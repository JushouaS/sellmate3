import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

const BlogPage = () => {
  const initialArticles = [
    {
      title: [
        '🏆 How to Succeed as a ',
        <span key="sm1"><span className="text-black font-bold">Sell</span><span className="text-pink-500 font-bold">Mate</span></span>,
        ' Middleman'
      ],
      preview: "Discover the heart and hustle behind our top-performing middlemen. Their journeys are filled with trust, growth, and real impact.",
      author: "Byron Duallo",
      date: "2025-04-15",
      // readTime removed
    },
    {
      title: [
        '🤝 Building Trust in Online Transactions'
      ],
      preview: "See how real people are forging connections and building trust through SellMate's secure platform. Every transaction is a story.",
      author: "Kearby Obedencio",
      date: "2025-04-10",
      // readTime removed
    },
    {
      title: [
        '🌍 From Local Seller to Global Entrepreneur'
      ],
      preview: "Jane's journey from a small shop to a global business is proof that dreams grow with the right support. Get inspired!",
      author: "Kreimheld Kane Gabule",
      date: "2025-04-05",
      // readTime removed
    }
  ];

  // Full story content for each article
  const fullStories = [
    "Byron's journey as a SellMate Middleman is a testament to the power of trust and dedication. From his first transaction, Byron focused on building real relationships, ensuring every client felt safe and valued. His story is filled with moments of challenge, growth, and the joy of helping others succeed.",
    "Kearby has always believed that trust is the foundation of every great transaction. Through SellMate, he's helped countless buyers and sellers connect, communicate, and complete deals with confidence. His story is about the small gestures that build big trust, and the friendships made along the way.",
    "Kreimheld Kane Gabule started as a local seller with a dream. With SellMate's support, she grew her business beyond borders, learning from every deal and every customer. Her story is one of courage, learning, and the belief that anyone can become a global entrepreneur with the right help."
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [openArticle, setOpenArticle] = useState<number|null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitTitle, setSubmitTitle] = useState("");
  const [submitBody, setSubmitBody] = useState("");
  const [submitError, setSubmitError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <BackButton />
      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-3 animate-fade-in">
          <h1 className="text-4xl font-bold text-pink-600"><span className="text-black">Sell</span><span className="text-pink-500">Mate</span> Blog</h1>
          <p className="text-lg text-pink-700 font-medium max-w-2xl mx-auto">Real stories. Real trust. Real growth.</p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">Stories, insights, and updates from the <span className="text-black">Sell</span><span className="text-pink-500">Mate</span> community</p>
        </div>

        {/* Featured Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              className="relative"
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpenArticle(index)}
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                className="border-0 bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 hover:from-pink-100 hover:to-blue-100 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden rounded-xl"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 #f472b6aa' }}
                initial={false}
                animate={openArticle === index ? { rotateY: 180 } : { rotateY: 0 }}
                transition={{ duration: 0.7, type: 'spring' }}
                style={{ perspective: 1200, minHeight: 220 }}
              >
                {/* Front of card */}
                <div className={`absolute inset-0 w-full h-full p-4 ${openArticle === index ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300 flex flex-col`} style={{ backfaceVisibility: 'hidden' }}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      {/* Author avatar */}
                      <div className="w-9 h-9 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold text-lg shadow group-hover:scale-110 transition-transform">
                        {article.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <CardTitle className="text-xl font-bold text-blue-900 group-hover:text-pink-600 flex flex-wrap items-center gap-1">
                        {article.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0 flex-1">
                    <p className="text-gray-700 text-base font-medium">{article.preview}</p>
                    <div className="flex justify-start text-xs text-gray-500 items-center mt-auto">
                      <span className="font-semibold text-pink-600">{article.author}</span>
                    </div>
                  </CardContent>
                </div>
                {/* Back of card (empty, for flip effect) */}
                <div className={`absolute inset-0 w-full h-full bg-white rounded-xl ${openArticle === index ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 flex items-center justify-center`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Open letter modal */}
        <AnimatePresence>
          {openArticle !== null && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenArticle(null)}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative flex flex-col items-center"
                initial={{ scale: 0.8, y: 80, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 80, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.6 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold text-2xl mb-4">
                  {articles[openArticle].author.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-2xl font-bold text-pink-600 mb-2 flex flex-wrap items-center gap-1 justify-center">{articles[openArticle].title}</h2>
                <p className="text-gray-500 text-sm mb-4">By {articles[openArticle].author}</p>
                <div className="text-gray-700 text-lg leading-relaxed text-center mb-6">{fullStories[openArticle]}</div>
                <button
                  onClick={() => setOpenArticle(null)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contribute Section */}
        <Card className="border-0 bg-white/70 backdrop-blur-sm animate-fade-in lg:col-span-1 md:col-span-2 max-w-xs mx-auto p-2">
          <CardHeader className="pb-1">
            <CardTitle className="text-base text-pink-600 font-bold flex items-center gap-2">
              <span className="text-xl">✍️</span> Share Your Story
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <p className="text-gray-500 text-xs">
              Have an inspiring story or valuable insights to share with the <span className="text-black">Sell</span><span className="text-pink-500">Mate</span> community? We'd love to hear from you!
            </p>
            <Button 
              onClick={() => setShowSubmitModal(true)}
              className="hover:bg-pink-600 bg-pink-500 text-white text-xs px-3 py-1 rounded-full"
            >
              Submit Your Story
            </Button>
          </CardContent>
        </Card>

        {/* Submit Story Modal */}
        <AnimatePresence>
          {showSubmitModal && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubmitModal(false)}
            >
              <motion.form
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative flex flex-col items-center"
                initial={{ scale: 0.8, y: 80, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 80, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.6 }}
                onClick={e => e.stopPropagation()}
                onSubmit={e => {
                  e.preventDefault();
                  if (!submitTitle.trim() || !submitBody.trim()) {
                    setSubmitError("Please provide both a title and your story.");
                    return;
                  }
                  setArticles([
                    {
                      title: [<span key="user">📝 {submitTitle}</span>],
                      preview: submitBody.length > 120 ? submitBody.slice(0, 120) + "..." : submitBody,
                      author: "You",
                      date: new Date().toISOString().slice(0, 10),
                      // readTime: undefined
                    },
                    ...articles
                  ]);
                  setShowSubmitModal(false);
                  setSubmitTitle("");
                  setSubmitBody("");
                  setSubmitError("");
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-pink-600 mb-2 flex flex-wrap items-center gap-1 justify-center">Write Your Letter</h2>
                <label className="w-full text-left text-sm font-semibold text-pink-700 mb-1">Title</label>
                <input
                  className="w-full mb-4 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                  value={submitTitle}
                  onChange={e => setSubmitTitle(e.target.value)}
                  maxLength={60}
                  placeholder="A headline for your story..."
                  required
                />
                <label className="w-full text-left text-sm font-semibold text-pink-700 mb-1">Your Story</label>
                <textarea
                  className="w-full mb-4 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base min-h-[120px] resize-y"
                  value={submitBody}
                  onChange={e => setSubmitBody(e.target.value)}
                  maxLength={1200}
                  placeholder="Share your journey, your challenges, your wins..."
                  required
                />
                {submitError && <div className="text-red-500 text-sm mb-2">{submitError}</div>}
                <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full mt-2">Send</Button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogPage;
