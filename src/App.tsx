'use client';

import { Award, Briefcase, GraduationCap, Code, FileText, BookOpen, Sparkles, Mail, Github, Linkedin, X, } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import SkillBadges from './components/SkillBadges';
import Timeline from './components/Timeline';
import ContactForm from './components/ContactForm';
import CertificateModal from './components/CertificateModal';
import ActivitiesCarousel from './components/ActivitiesCarousel';

// PREMIUM FONTS — 100% WORKING
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource/geist-sans/100.css';
import '@fontsource/geist-sans/200.css';
import '@fontsource/geist-sans/300.css';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/800.css';
import '@fontsource/geist-sans/900.css';

function App() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCert, setSelectedCert] = useState<{
    name: string;
    issuer: string;
    link: string;
  } | null>(null);

  const projects = [
    { title: "HistoAI", description: "Historical Data Extraction from PDFs", longDescription: "Advanced LLM-based system for extracting structured information from complex historical documents with OCR and NLP.", technologies: ["Python", "LLMs", "NLP", "PDF Processing", "LangChain"], link: "https://github.com/Coding-with-Gaurav/HistoAI", github: "https://github.com/Coding-with-Gaurav/HistoAI" },
    { title: "Ayur Scan", description: "Tongue Analysis & Diagnosis App", longDescription: "Mobile app using AI vision for Ayurvedic tongue diagnosis with personalized health insights.", technologies: ["Flutter", "TensorFlow", "Computer Vision", "Firebase", "React"], link: "https://github.com/Coding-with-Gaurav/AyurScan", github: "https://github.com/Coding-with-Gaurav/AyurScan" },
    { title: "Sanskrit OCR", description: "OCR for Ancient Manuscripts", longDescription: "Deep learning OCR system for digitizing ancient Sanskrit texts with high accuracy.", technologies: ["Python", "OpenCV", "Deep Learning", "Tesseract", "PyTorch"], link: "https://github.com/Coding-with-Gaurav/SanskritOCR", github: "https://github.com/Coding-with-Gaurav/SanskritOCR" },
    { title: "RAG Chatbot", description: "Retrieval-Augmented Generation System", longDescription: "Intelligent chatbot with RAG, vector DBs, and context-aware responses.", technologies: ["LangChain", "GPT", "Vector DB", "Flask", "React"], link: "https://github.com/Coding-with-Gaurav/RAG-Chatbot", github: "https://github.com/Coding-with-Gaurav/RAG-Chatbot" },
    { title: "Knowledge Graph Generator", description: "Semantic Knowledge Graph Construction", longDescription: "Automated KG generation from unstructured text using LLMs and Neo4j.", technologies: ["Python", "LLMs", "Neo4j", "NLP", "Graph DB"], link: "https://github.com/Coding-with-Gaurav/KG-Generator", github: "https://github.com/Coding-with-Gaurav/KG-Generator" },
    { title: "Medical AI Research", description: "Healthcare AI Applications", longDescription: "Research in AI for diagnosis, patient analysis, and predictive healthcare modeling.", technologies: ["TensorFlow", "PyTorch", "Healthcare Data", "ML", "Research"], link: "#", github: "#" }
  ];

  const skills = {
    "Programming Languages": ["Python", "C", "JavaScript", "Java", "Dart", "SQL"],
    "Web & Mobile Development": ["React", "Flask", "Typescript", "CSS", "tailwind", "Flutter"],
    "ML & NLP": ["TensorFlow", "PyTorch", "Keras", "scikit-learn", "LangChain", "spaCy", "NLTK", "LLM"],
    "Data Visualization": ["Matplotlib", "Seaborn", "Plotly", "Tableau"],
    "Cloud & Tools": ["Google Cloud", "Firebase", "Git", "Jupyter", "Docker", "APIs"],
    "Databases": ["MySQL", "MongoDB", "Neo4j", "Vector DB",]
  };

  const experiences = [
    { title: "Junior Research Fellow", organization: "Center for Artificial Intelligence & Research (IAI)", duration: "Jun 2025 - Present", current: true, responsibilities: ["Lead development of HistoAI for structured data extraction from historical documents using LLMs", "Architect and implement RAG-integrated chatbot systems", "Design knowledge graph generation pipelines", "Conduct cutting-edge AI research in healthcare and culture"] },
    { title: "Research Intern", organization: "Center for Artificial Intelligence & Research (IAI)", duration: "2023 - 2025", current: false, responsibilities: ["Conducted mobile-based tongue diagnosis research using computer vision", "Developed NLP applications for healthcare", "Published accepted research paper", "Contributed to multiple AI initiatives"] },
    { title: "Software Development Volunteer", organization: "IT Cell Shantikunj", duration: "2022 - 2023", current: false, responsibilities: ["Supported open-source initiatives", "Contributed to web/mobile projects", "Collaborated in distributed teams"] }
  ];

  const certifications = [
    {
      name: "Introduction to Data Science",
      issuer: "Coursera",
      link: "https://drive.google.com/file/d/15DS95ahxgUn0rRu5n-qNlkgcltUz4caL/preview",
      type: "pdf"
    },
    {
      name: "Crash Course on Git, GitHub, and Markdown",
      issuer: "Udemy",
      link: "https://www.udemy.com/certificate/UC-44767e90-4f57-41e8-b188-08f61f081478/",
      type: "external"
    },
    {
      name: "Introduction to Generative AI",
      issuer: "Google Cloud Skills Boost",
      link: "https://www.cloudskillsboost.google/public_profiles/78692f20-7bd0-43fa-bde2-fc39539cb3c6/badges/8136058?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      type: "external"
    },
    {
      name: "Big Data Certification",
      issuer: "Udemy",
      link: "https://www.udemy.com/certificate/UC-8ccc765f-6dbf-4bf9-bedc-d2f066eaa4de/",
      type: "external"
    },
    {
      name: "Data Analytics with Tableau",
      issuer: "Jobaaj Learnings",
      link: "https://www.jobaajlearnings.com/certificate?file=certificate-96811-37-0.jpeg",
      type: "image"
    },
  ];
  const extraActivities = [
    {
      title: "AI for Social Good Hackathon",
      role: "Lead Organizer & Winner",
      description:
        "Organized a 48-hour hackathon focused on AI solutions for healthcare and education. Led a team of 12 developers to build HistoAI prototype. Won 1st prize and presented to 200+ attendees. The event featured workshops on LLMs, computer vision, and ethical AI.",
      images: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca8841cb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522202176988-66273c2b2d23?w=800&h=600&fit=crop",
      ],
      link: "https://devpost.com/software/histoai",
    },
    {
      title: "National Sanskrit AI Conference",
      role: "Speaker & Participant",
      description:
        "Presented research on Sanskrit OCR and NLP at Dev Sanskriti Vishwavidyalaya. Conducted live demo of digitizing ancient manuscripts using deep learning. Networked with linguists, AI researchers, and cultural preservation experts.",
      images: [
        "https://images.unsplash.com/photo-1505373877841-8d25f8d46678?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      ],
    },
    {
      title: "Google Cloud Gen AI Workshop",
      role: "Participant & Project Lead",
      description:
        "Attended 3-day intensive workshop on Generative AI. Built a RAG-based Sanskrit chatbot as final project. Received Google Cloud certification and mentorship from Google engineers.",
      images: [
        "https://images.unsplash.com/photo-1516321310766-93d6d79a1c83?w=800&h=600&fit=crop",
      ],
    },
  ];
  const education = [
    { degree: "Master of Computer Applications (MCA)", institution: "Dev Sanskriti Vishwavidyalaya, Uttarakhand", duration: "2023 - 2025", focus: "Specialization: Data Science, AI & NLP" },
    { degree: "Bachelor of Science in Information Technology", institution: "Patliputra University, Patna", duration: "2019 - 2022", focus: "Foundation in computer science and software development" }
  ];

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'education', 'projects', 'publications', 'experience', 'skills', 'certifications', 'activities', 'contact'];
      const scrollPos = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: '#1e293b', color: '#e2e8f0' } }} />

      <div className="min-h-screen bg-slate-950 text-slate-300 font-body antialiased scroll-smooth">
        <Navigation activeSection={activeSection} />

        <Hero />

        <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
          {/* Education */}
          <motion.section id="education" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-10">
              <GraduationCap className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Education
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, i) => (
                <motion.div key={i} whileHover={{ y: -4 }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-amber-400/40 transition-all">
                  <h3 className="text-xl font-display font-bold text-white">{edu.degree}</h3>
                  <p className="text-amber-400 font-medium mt-1">{edu.institution}</p>
                  <p className="text-slate-400 text-sm mt-1">{edu.duration}</p>
                  <p className="text-slate-300 text-sm mt-3">{edu.focus}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          {/* Experience */}
          <motion.section id="experience" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-10">
              <Briefcase className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Work Experience
              </h2>
            </div>
            <Timeline items={experiences} />
          </motion.section>
          {/* Projects */}
          <motion.section id="projects" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-10">
              <Code className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </div>
            <ProjectsGrid projects={projects} onSelect={setSelectedProject} />
          </motion.section>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-6" onClick={() => setSelectedProject(null)}>
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                  className="bg-slate-900/95 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-8 max-w-3xl w-full"
                  onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                  <h3 className="text-3xl font-display font-bold text-white">{selectedProject.title}</h3>
                  <p className="text-slate-300 mt-4 text-lg">{selectedProject.longDescription}</p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-4 py-2 bg-amber-400/10 text-amber-300 rounded-full text-xs font-medium border border-amber-400/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6 mt-8">
                    {selectedProject.link !== "#" && (
                      <a href={selectedProject.link} target="_blank" className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
                        <Github className="w-5 h-5" /> Live Demo
                      </a>
                    )}
                    {selectedProject.github !== "#" && (
                      <a href={selectedProject.github} target="_blank" className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
                        <Github className="w-5 h-5" /> Source Code
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Publications */}
          <motion.section id="publications" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-10">
              <BookOpen className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Publications
              </h2>
            </div>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative bg-gradient-to-br from-slate-800/60 via-slate-900/70 to-black/40 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 overflow-hidden hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500"
            >
              {/* Subtle glowing accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 opacity-70" />

              <div className="relative z-10">
                {/* Standout Title with Gradient + Glow */}
                <h3 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-100 bg-clip-text text-transparent leading-tight">
                  AI Tongue Diagnosis:{' '}
                  <span className="text-xl md:text-2xl text-amber-300/90">
                    Expert System with LLMs for Abdominal Disease Detection Through Mobile Application
                  </span>
                </h3>

                {/* Presented At Badge */}
                <div className="flex items-center gap-2 mt-4 text-amber-300 text-sm font-medium">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  Presented at <span className="text-amber-200 font-bold">MBCC 2025</span>, IIT Mandi
                </div>

                {/* Description */}
                <p className="text-slate-300 mt-5 leading-relaxed text-base">
                  Research paper accepted for publication exploring the fusion of computer vision, large language models, and traditional Ayurvedic tongue diagnosis through a mobile application.
                </p>

                {/* Status Tags */}
                <div className="flex flex-wrap gap-4 mt-7">
                  {/* Accepted Badge */}
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/50 rounded-full text-amber-200 text-sm font-semibold backdrop-blur-sm">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    Accepted for Publication
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/40 rounded-full text-purple-300 text-sm font-medium italic">
                    <span className="animate-pulse">Public Link Coming Soon</span>
                  </div>
                </div>
              </div>

              {/* Optional subtle corner glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            </motion.div>
          </motion.section>



          {/* Skills */}
          <motion.section id="skills" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-10">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Skills & Technologies
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <SkillBadges key={category} category={category} skills={items} />
              ))}
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section
            id="certifications"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-10">
              <Award className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Certifications
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-amber-400/40 transition-all flex items-start gap-3 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}   // <-- open modal
                >
                  <Award className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">{cert.name}</p>
                    <p className="text-slate-400 text-sm">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Modal – placed just after the section (or anywhere inside <main>) */}
          <AnimatePresence>
            {selectedCert && (
              <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
            )}
          </AnimatePresence>

          <motion.section
            id="activities"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Extra Activities
              </h2>
            </div>
            <ActivitiesCarousel />
          </motion.section>

          {/* Contact */}
          <motion.section id="contact" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-10">
              <Mail className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Let's Connect
              </h2>
            </div>
            <ContactForm onSuccess={() => toast.success("Message sent! I'll reply soon.")} />
          </motion.section>
        </main>

        {/* <footer className="bg-slate-900 border-t border-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-400 text-sm font-medium">
              © 2025 Gaurav Kumar. Crafting AI for healthcare and culture.
            </p>

            <div className="flex justify-center gap-8 mt-6">
              <a
                href="https://github.com/Coding-with-Gaurav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-amber-400 transition-all duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>

              <a
                href="https://x.com/GauravK30437835"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-amber-400 transition-all duration-300 transform hover:scale-110"
                aria-label="X (Twitter)"
              >
                <X className="w-6 h-6" />
              </a>

              <a
                href="https://medium.com/@codewithgaurav.dsvv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-amber-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Medium"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.79-6.79A6.8 6.8 0 0113.54 12zm2.63 0a4.58 4.58 0 01-4.58-4.58 4.58 4.58 0 014.58 4.58zm2.8 0a1.8 1.8 0 01-1.8-1.8 1.8 1.8 0 011.8 1.8z" />
                </svg>
              </a>

              <a
                href="https://dev.to/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-amber-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Dev.to"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04.46c.1.29.38.52.72.52.87 0 1.54-.65 1.54-1.44 0-.8-.61-1.44-1.54-1.44l.24-.31zm.01 2.7c-.29.08-.58.13-.87.13-.3 0-.6-.05-.89-.13-.09-.03-.17-.06-.25-.09v-3.1c.1-.06.24-.13.4-.19.3-.12.65-.19 1.02-.19.8 0 1.43.62 1.43 1.4 0 .77-.63 1.4-1.43 1.4zM22 6.92v10.16c0 .76-.43 1.46-1.12 1.8l-7.58 4.4c-.36.2-.77.31-1.19.31-.42 0-.83-.11-1.19-.31L3.34 19.08A2.25 2.25 0 012.22 17.08V6.92c0-.76.43-1.46 1.12-1.8l7.58-4.4c.36-.2.77-.31 1.19-.31.42 0 .83.11 1.19.31l7.58 4.4c.69.34 1.12 1.04 1.12 1.8zM8.78 15.6v-7.2h-.01l-1.98.3v.74l1.1-.17v5.6l-1.1-.17v.74l1.98.3zm4.23-5.6c-.5 0-.9.4-.9.9v4.8c0 .5.4.9.9.9h.9v-6.6h-.9zm4.8 5.6c.18.16.46.23.84.23h.58l-.02-2.44-.04-.46c-.1-.29-.38-.52-.72-.52-.87 0-1.54.65-1.54 1.44 0 .8.61 1.44 1.54 1.44l-.24.31z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/gaurav-kumar-68453b247"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-amber-400 transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </footer> */}
<footer className="bg-slate-950 border-t border-slate-800/50 py-6">
  <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
    {/* Left / Center on mobile */}
    <p className="text-slate-500 font-medium">
      © {new Date().getFullYear() > 2025 ? `2025–${new Date().getFullYear()}` : 2025} Gaurav Kumar
    </p>

    {/* Social icons - compact row */}
    
    <div className="flex items-center gap-6">
      <a
        href="https://linkedin.com/in/gaurav-kumar-68453b247"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="https://github.com/Coding-with-Gaurav"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
        aria-label="GitHub"
      >
        <Github className="w-5 h-5" />
      </a>

      <a
        href="https://x.com/GauravK30437835"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
        aria-label="X"
      >
        <X className="w-5 h-5" />
      </a>

      <a
        href="https://medium.com/@codewithgaurav.dsvv"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
        aria-label="Medium"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.79-6.79A6.8 6.8 0 0113.54 12zm2.63 0a4.58 4.58 0 01-4.58-4.58 4.58 4.58 0 014.58 4.58zm2.8 0a1.8 1.8 0 01-1.8-1.8 1.8 1.8 0 011.8 1.8z" />
        </svg>
      </a>

      {/* Remove or update dev.to if not active */}
      {/* <a href="https://dev.to/yourusername" ... > ... </a> */}

      
    </div>
  </div>
</footer>
        
      </div>
    </>
  );
}

export default App;