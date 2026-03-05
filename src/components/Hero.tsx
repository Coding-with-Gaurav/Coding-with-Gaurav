import { Mail, Download } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion"; // Add: npm install framer-motion

// Import images
import Img1 from "/src/assets/Gaurav Kumar.jpeg";
// import Img2 from "/src/assets/Gk.jpeg";
// import Img3 from "/src/assets/gks.jpeg";

const images = [Img1];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide with pause on hover
  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              {/* <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-amber-400 text-sm md:text-base font-semibold tracking-widest uppercase mb-3"
              >
                AI Researcher • Full-Stack Engineer
              </motion.p> */}

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                Gaurav
                <span className="block text-amber-400">Kumar</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl"
            >
              Junior Research Fellow at the{" "}
              <span className="text-amber-300 font-medium">
                Center for Artificial Intelligence & Research (IAI–CAIR)
              </span>
              , working on AI, ML, and NLP research for Indian Knowledge Systems (IKS). I
              build LLM-powered and data-driven solutions for healthcare, Ayurveda,
              cultural preservation, and historical knowledge modeling - creating
              practical, real-world AI applications that connect traditional wisdom with
              modern intelligent systems.
            </motion.p>


            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-amber-400 text-slate-900 px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-amber-300 transition-all duration-300 shadow-lg hover:shadow-amber-400/30"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Let’s Connect
              </a>

              <a
                href="https://drive.google.com/uc?export=download&id=1BN0zKGiuN2-FL7qnMwlRTdU30oCO5FKX"
                className="group inline-flex items-center gap-3 border-2 border-amber-400 text-amber-400 px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Download CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-6"
            >
              <a
                href="mailto:tech_gaurav@outlook.com"
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">tech_gaurav@outlook.com</span>
              </a>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-5 pt-4"
            >
              <a
                href="https://github.com/Coding-with-Gaurav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-7 h-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/gaurav-kumar-68453b247/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-7 h-7" />
              </a>
            </motion.div> */}
          </motion.div>

          {/* RIGHT: Image Carousel with Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full max-w-md">
              {/* Glass Card */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl ring-1 ring-white/20">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700/50">
                  {/* Carousel */}
                  <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden ring-4 ring-amber-400/50 shadow-xl">
                    <div
                      className="flex transition-transform duration-1000 ease-out h-full"
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                      {images.map((src, i) => (
                        <div key={i} className="w-full h-full flex-shrink-0">
                          <img
                            src={src}
                            alt={`Gaurav Kumar - ${i + 1}`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mt-8 text-center space-y-2">
                    <p className="text-xl md:text-2xl font-bold text-amber-400">
                      Junior Research Fellow
                    </p>
                    <p className="text-sm md:text-base text-slate-300 font-medium">
                      Institute of Artificial Intelligence (IAI)
                    </p>
                    <p className="text-xs md:text-sm text-slate-500">
                      Dev Sanskriti Vishwavidyalaya, Haridwar
                    </p>
                  </div>
                </div>
              </div>

              {/* Dots */}
              {/* <div className="flex justify-center gap-2 mt-8">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-300 rounded-full ${i === currentIndex
                        ? "bg-amber-400 w-10 h-2.5"
                        : "bg-slate-600 w-2.5 h-2.5 hover:bg-slate-500"
                      }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;