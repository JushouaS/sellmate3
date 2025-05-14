import { useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { 
  FileText, 
  Users, 
  CheckCircle,
  Clock,
  Handshake,
  ArrowRight,
  Moon,
  Sun,
  ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoggedOutDialog, setShowLoggedOutDialog] = useState(false);

  // Water footprint state for handshake card
  const [footprints, setFootprints] = useState<{ id: number; x: number; y: number }[]>([]);
  const footprintId = useRef(0);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  const [darkMode, setDarkMode] = useState(false);

  const steps = [
    {
      icon: <FileText className="text-blue-600 h-12 w-12 mx-auto mb-6" />, 
      title: 'Post Your Request', 
      desc: 'Describe what you need help buying and set budget requirements.'
    },
    {
      icon: <Users className="text-blue-600 h-12 w-12 mx-auto mb-6" />, 
      title: 'Choose a Middleman', 
      desc: 'Browse profiles, ratings and select the ideal middleman.'
    },
    {
      icon: <CheckCircle className="text-blue-600 h-12 w-12 mx-auto mb-6" />, 
      title: 'Complete Transaction', 
      desc: 'Receive your item, release payment when satisfied.'
    }
  ];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const handlePrev = () => setSelectedIdx((selectedIdx - 1 + steps.length) % steps.length);
  const handleNext = () => setSelectedIdx((selectedIdx + 1) % steps.length);

  useEffect(() => {
    if (location.state && location.state.showLoggedOut) {
      setShowLoggedOutDialog(true);
      toast({
        title: "✔ Logged out successfully",
      });
      // Remove the state so it doesn't show again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const id = footprintId.current++;
    setFootprints((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setFootprints((prev) => prev.filter((fp) => fp.id !== id));
    }, 1200);
    // Reset idle timer
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => {
      setFootprints([]);
    }, 1500);
  }, []);

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleLearnMore = () => {
    window.scrollTo({
      top: document.getElementById("how-it-works")?.offsetTop || 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`flex flex-col min-h-screen relative ${darkMode ? 'bg-[#181e29]' : ''}`}>
      <NavBar />
      
      {/* Hero Section with animated background */}
      <section className={`${darkMode ? 'bg-gradient-to-r from-[#232b3a] via-[#181e29] to-[#232b3a]' : 'bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50'} py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgxMDAsMTUwLDI1NSwwLjAzKSI+PC9yZWN0PjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center z-10 relative">
          <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8 animate-fade-in">
            <motion.div
              className="relative px-6 py-2 rounded-full inline-flex items-center gap-2 mb-4 font-bold text-base tracking-wide shadow-xl border-2 border-blue-800 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 text-white overflow-hidden"
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              <span className="inline-block text-yellow-300 drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
              </span>
              <span className="z-10 relative">The Premier Middleman Service</span>
              <motion.div
                className="absolute left-0 top-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0.2, x: '-100%' }}
                animate={{ opacity: [0.2, 0.5, 0.2], x: ['-100%', '100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', filter: 'blur(2px)' }}
              />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-300 dark:to-blue-500">
              Secure Transactions with Trusted Middlemen
            </h1>
            <p className="mb-8 max-w-lg text-lg font-semibold text-blue-600 dark:text-blue-200">
              Connect with verified experts to facilitate your transactions. Our platform ensures your payments are protected while you receive your purchased items safely.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative inline-block">
                <motion.div
                  className="absolute inset-0 rounded-full z-0"
                  style={{ filter: 'blur(16px)' }}
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{
                    opacity: [0.7, 0.4, 0.7],
                    scale: [1, 1.18, 1],
                    boxShadow: [
                      '0 0 0 0 #3b82f6',
                      '0 0 32px 16px #60a5fa',
                      '0 0 0 0 #3b82f6'
                    ]
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                />
                <motion.button
                  className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={handleGetStarted}
                  initial={{ boxShadow: '0 0 0 0 #3b82f6' }}
                  animate={{ boxShadow: [
                    '0 0 0 0 #3b82f6',
                    '0 0 12px 2px #3b82f6',
                    '0 0 24px 6px #60a5fa',
                    '0 0 12px 2px #3b82f6',
                    '0 0 0 0 #3b82f6'
                  ] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                  type="button"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-float">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 opacity-30 blur-xl"></div>
            <div
              className="relative p-10 rounded-2xl shadow-xl overflow-hidden border border-blue-100 flex items-center justify-center"
              style={{
                background: 'radial-gradient(ellipse 120% 80% at 60% 40%, #f8fafc 70%, #e0f2fe 100%)',
              }}
              onMouseMove={handleCardMouseMove}
            >
              {/* Subtle caustic SVG overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
                <filter id="caustics" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.015 0.03" numOctaves="2" seed="2"/>
                  <feDisplacementMap in2="SourceGraphic" scale="18" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <rect width="400" height="300" fill="#fff" filter="url(#caustics)" />
              </svg>
              {/* Water footprints */}
              {footprints.map((fp) => (
                <motion.div
                  key={fp.id}
                  initial={{ opacity: 0.45, scale: 0.7 }}
                  animate={{ opacity: 0, scale: 2.8 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: fp.x,
                    top: fp.y,
                    width: 70,
                    height: 70,
                    marginLeft: -35,
                    marginTop: -35,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(59,130,246,0.13) 60%, rgba(59,130,246,0.01) 100%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                    filter: 'blur(1.5px)',
                  }}
                />
              ))}
              {/* Animated Aura */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full z-0"
                style={{ filter: 'blur(32px)' }}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{
                  opacity: [0.5, 0.2, 0.5],
                  scale: [1, 1.12, 1],
                  boxShadow: [
                    '0 0 0 0 #3b82f6',
                    '0 0 64px 32px #60a5fa',
                    '0 0 0 0 #3b82f6'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              />
              {/* Animated Handshake */}
              <motion.div
                className="relative z-10"
                animate={{ rotate: [0, -10, 10, -8, 8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              >
                <Handshake className="w-full h-64 text-blue-500" strokeWidth={2} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section with Carousel */}
      <section id="how-it-works" className={`py-16 ${darkMode ? 'bg-[#232b3a]' : 'bg-white'} relative overflow-hidden flex flex-col items-center`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxNSkiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9InJnYmEoMCw5MCwyNTUsMC4wNSkiPjwvY2lyY2xlPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="rounded-full bg-blue-100 p-2 inline-block shadow-lg">
                <div className="rounded-full bg-blue-200 p-2">
                  <div className="rounded-full bg-blue-300 p-2">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-300 dark:to-blue-500">How It Works</h2>
            <p className="text-center max-w-2xl mx-auto mb-12 text-lg font-semibold text-blue-600 dark:text-blue-200">
              Our platform connects buyers with verified middlemen for secure transactions.
            </p>
          </div>
          {/* Custom 3-card How It Works Carousel */}
          <div className="w-full max-w-2xl relative flex items-center justify-center">
            <div className="flex items-center justify-center w-full relative">
              <button onClick={e => { e.preventDefault(); handlePrev(); }} className="absolute left-0 z-20 bg-white border border-blue-100 rounded-full p-2 shadow hover:bg-blue-50 transition-colors">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex items-center justify-center w-full gap-10">
                {/* Left blurred card with partial content */}
                <div
                  key={((selectedIdx - 1 + steps.length) % steps.length)}
                  className="w-72 h-96 bg-blue-100 rounded-2xl border-4 border-blue-50 flex flex-col items-center justify-center select-none blur-sm opacity-70"
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    {steps[(selectedIdx - 1 + steps.length) % steps.length].icon}
                    <h3 className="font-semibold text-2xl mb-4 text-center text-blue-800">{steps[(selectedIdx - 1 + steps.length) % steps.length].title}</h3>
                    <p className="text-gray-600 text-center text-lg px-4">{steps[(selectedIdx - 1 + steps.length) % steps.length].desc}</p>
                  </div>
                </div>
                {/* Center card with content */}
                <div
                  key={selectedIdx}
                  className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center border-4 border-blue-100 z-10"
                  style={{ pointerEvents: 'auto' }}
                >
                  <div>
                    {steps[selectedIdx].icon}
                  </div>
                  <h3 className="font-semibold text-2xl mb-4 text-center text-blue-800">{steps[selectedIdx].title}</h3>
                  <p className="text-gray-600 text-center text-lg px-4">{steps[selectedIdx].desc}</p>
                </div>
                {/* Right blurred card with partial content */}
                <div
                  key={((selectedIdx + 1) % steps.length)}
                  className="w-72 h-96 bg-blue-100 rounded-2xl border-4 border-blue-50 flex flex-col items-center justify-center select-none blur-sm opacity-70"
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    {steps[(selectedIdx + 1) % steps.length].icon}
                    <h3 className="font-semibold text-2xl mb-4 text-center text-blue-800">{steps[(selectedIdx + 1) % steps.length].title}</h3>
                    <p className="text-gray-600 text-center text-lg px-4">{steps[(selectedIdx + 1) % steps.length].desc}</p>
                  </div>
                </div>
              </div>
              <button onClick={e => { e.preventDefault(); handleNext(); }} className="absolute right-0 z-20 bg-white border border-blue-100 rounded-full p-2 shadow hover:bg-blue-50 transition-colors">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-16 ${darkMode ? 'bg-gradient-to-r from-[#232b3a] to-[#181e29]' : 'bg-gradient-to-r from-blue-50 to-blue-100'} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxNSkiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9InJnYmEoMCw5MCwyNTUsMC4wNSkiPjwvY2lyY2xlPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
        <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-300 dark:to-blue-500">
                  Why Choose <span className="text-blue-600 dark:text-blue-400">SellMate</span>
            </h2>
                <p className="text-center max-w-2xl mx-auto mb-12 text-lg font-semibold text-blue-600 dark:text-blue-200">
                  We've built a platform focused on security, trust, and hassle-free transactions.
                </p>
              </div>
            </motion.div>
            {/* New Feature Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Trusted Request */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, type: 'spring', bounce: 0.3 }} viewport={{ once: true }} className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg flex flex-col items-center justify-between min-h-[260px] relative">
                <motion.div animate={{ boxShadow: [
                  '0 0 0 0 #3b82f6',
                  '0 0 24px 8px #3b82f6',
                  '0 0 0 0 #3b82f6'
                ] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-blue-100 rounded-full p-4 mb-4 flex items-center justify-center">
                  <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </motion.div>
                <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-400">Trusted Request</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">Describe what you're looking for, our verified team ensures trustworthy listings.</p>
                <div className="w-full mt-auto">
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }} className="h-1 bg-blue-500 rounded-full origin-left" />
                  <div className="text-right text-xs text-blue-500 mt-1">100% Verified</div>
            </div>
              </motion.div>
              {/* Expertise Tags */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, type: 'spring', bounce: 0.3 }} viewport={{ once: true }} className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg flex flex-col items-center justify-between min-h-[260px] relative">
                <motion.div animate={{ boxShadow: [
                  '0 0 0 0 #3b82f6',
                  '0 0 24px 8px #3b82f6',
                  '0 0 0 0 #3b82f6'
                ] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-blue-100 rounded-full p-4 mb-4 flex items-center justify-center">
                  <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-500"><path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" /><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M7 10h.01" /><path d="M17 10h.01" /></svg>
                </motion.div>
                <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-400">Expertise Tags</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">Search for exact expertise by category tags and select your ideal middleman.</p>
                <div className="flex flex-wrap gap-2 justify-center mt-auto">
                  {['Electronics', 'Luxury', 'Cars', 'Fashion', 'Gaming'].map((tag, i) => (
                    <motion.div key={tag} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.15, duration: 0.5, type: 'spring' }} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                      {tag}
                    </motion.div>
                  ))}
              </div>
              </motion.div>
              {/* Secure Messaging */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, type: 'spring', bounce: 0.3 }} viewport={{ once: true }} className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg flex flex-col items-center justify-between min-h-[260px] relative">
                <motion.div animate={{ boxShadow: [
                  '0 0 0 0 #3b82f6',
                  '0 0 24px 8px #3b82f6',
                  '0 0 0 0 #3b82f6'
                ] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-blue-100 rounded-full p-4 mb-4 flex items-center justify-center">
                  <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-500"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                </motion.div>
                <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-400">Secure Messaging</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">Private chat system keeps your transaction details safe and well-documented.</p>
              </motion.div>
              {/* Real-time Updates */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75, type: 'spring', bounce: 0.3 }} viewport={{ once: true }} className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg flex flex-col items-center justify-between min-h-[260px] relative">
                <motion.div animate={{ boxShadow: [
                  '0 0 0 0 #3b82f6',
                  '0 0 24px 8px #3b82f6',
                  '0 0 0 0 #3b82f6'
                ] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-blue-100 rounded-full p-4 mb-4 flex items-center justify-center relative">
                  <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-500"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  <motion.div initial={{ scale: 0, opacity: 0, y: -10 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5, type: 'spring' }} className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-400 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold">
                    Order confirmed!
                  </motion.div>
                </motion.div>
                <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-400">Real-time Updates</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">Track your order's progress with notifications and status updates in real-time.</p>
              </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${darkMode ? 'bg-gradient-to-r from-[#232b3a] to-[#181e29] text-gray-100' : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white'} py-16 relative overflow-hidden`}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className={`mb-8 max-w-lg mx-auto ${darkMode ? 'text-blue-200' : 'text-blue-100'}`}>Create an account now and experience secure transactions with verified middlemen.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-[#232b3a] text-gray-400 border-t border-gray-700' : 'bg-white'} py-12 border-t`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-blue-200' : 'text-blue-800'} text-blue-600 dark:text-blue-400`}>Sellmate</h3>
              <p className={`text-sm mb-4 font-semibold text-blue-600 dark:text-blue-200`}>The secure platform connecting buyers with trusted middlemen for safe transactions.</p>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-blue-200' : 'text-blue-800'} text-blue-600 dark:text-blue-400`}>Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-blue-600 dark:text-blue-200 hover:underline text-sm transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="text-blue-600 dark:text-blue-200 hover:underline text-sm transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-blue-600 dark:text-blue-200 hover:underline text-sm transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-blue-200' : 'text-blue-800'} text-blue-600 dark:text-blue-400`}>Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-blue-600 dark:text-blue-200 hover:underline text-sm transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-blue-600 dark:text-blue-200 hover:underline text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link to="/security" className="text-blue-600 dark:text-blue-200 hover:underline text-sm transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-gray-500 dark:text-gray-400`}>© 2025 <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-blue-600 dark:text-blue-400`}>SellMate</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Dialog open={showLoggedOutDialog} onOpenChange={setShowLoggedOutDialog}>
        <DialogContent className="sm:max-w-md text-center" hideCloseButton>
          <div className="flex flex-col items-center gap-4 py-2">
            <ThumbsUp className="h-12 w-12 text-black mx-auto" />
            <div className="font-bold text-lg mt-2">You've successfully<br />Logged out.</div>
          </div>
          <DialogFooter className="flex flex-col gap-2 mt-4">
            <Button variant="destructive" className="w-full" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
