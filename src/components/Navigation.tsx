// 'use client';

// import { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';

// // Simple lightweight cn alternative (no dependency)
// const cn = (...inputs: (string | undefined | null | false)[]) => {
//   return inputs.filter(Boolean).join(' ');
// };

// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const links = [
//     { label: 'Projects', href: '#projects' },
//     { label: 'Experience', href: '#experience' },
//     { label: 'Skills', href: '#skills' },
//     { label: 'Publications', href: '#publications' },
//     { label: 'Contact', href: '#contact' },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : 'unset';
//   }, [isOpen]);

//   const handleLinkClick = () => {
//     setIsOpen(false);
//   };

//   return (
//     <nav
//       className={cn(
//         'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
//         scrolled
//           ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-amber-500/5 border-b border-amber-400/20'
//           : 'bg-slate-900/80 backdrop-blur-md border-b border-transparent'
//       )}
//       aria-label="Main navigation"
//     >
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 lg:h-20">
//           {/* Logo */}
//           <a
//             href="#"
//             className="flex items-center space-x-2 group"
//             onClick={handleLinkClick}
//           >
//             <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:to-amber-500 transition-all duration-300">
//               Mr Code Yogi
//             </span>
//           </a>

//           {/* Desktop Links */}
//           <div className="hidden lg:flex items-center space-x-10">
//             {links.map((link) => (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 onClick={handleLinkClick}
//                 className="relative text-slate-300 hover:text-amber-400 font-medium text-sm tracking-wide transition-all duration-300 after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 {link.label}
//               </a>
//             ))}
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label={isOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={isOpen}
//             className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-amber-400/10 transition-all"
//           >
//             {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Overlay */}
//       <div
//         className={cn(
//           'fixed inset-0 bg-slate-900/95 backdrop-blur-2xl transition-opacity duration-500 lg:hidden',
//           isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//         )}
//       />

//       {/* Mobile Menu */}
//       <div
//         className={cn(
//           'fixed top-0 right-0 h-full w-full max-w-xs bg-slate-900/98 backdrop-blur-2xl border-l border-amber-400/20 shadow-2xl transform transition-transform duration-500 ease-out lg:hidden',
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         )}
//       >
//         <div className="flex flex-col h-full pt-24 px-8 pb-10">
//           <div className="space-y-6">
//             {links.map((link, index) => (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 onClick={handleLinkClick}
//                 className="block text-2xl font-semibold text-slate-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2 opacity-0 translate-y-4 animate-in"
//                 style={{
//                   animation: 'slideIn 0.6s ease-out forwards',
//                   animationDelay: `${index * 100}ms`,
//                 }}
//               >
//                 {link.label}
//               </a>
//             ))}
//           </div>

//           <div className="mt-auto pt-10 border-t border-amber-400/20">
//             <p className="text-sm text-slate-500 font-medium">Full-Stack Developer</p>
//             <p className="text-xs text-slate-600 mt-1">Crafting digital experiences</p>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;




'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { label } from 'framer-motion/client';

const cn = (...inputs: (string | undefined | null | false)[]) => {
  return inputs.filter(Boolean).join(' ');
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Updated nav links — now includes "Activities"
  const navLinks = [
    {label: 'Education', href: '#education'},
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Publications', href: '#publications' },
    { label: 'Skills', href: '#skills' },
    { label: 'Activities', href: '#activities' },   // ← NEW: Extra Activities
    { label: 'Contact', href: '#contact' },
  ];

  // Glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Fixed Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-amber-500/10 border-b border-amber-500/20'
            : 'bg-transparent',
          'supports-[backdrop-filter]:bg-slate-950/80'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a
              href="/"
              onClick={closeMenu}
              className="group relative flex items-center"
            >
              <span className="text-2xl lg:text-3xl font-black tracking-tighter bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Mr Code Yogi
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full transition-all duration-500 group-hover:w-full"></span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="group relative text-slate-300 hover:text-amber-400 font-semibold text-base tracking-wide transition-all duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-3 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-300"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-slate-950/95 backdrop-blur-3xl transition-opacity duration-500 lg:hidden z-40',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeMenu}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-l border-amber-500/30 shadow-2xl transform transition-transform duration-500 ease-out z-50 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full px-10 pt-32 pb-12">
          <div className="space-y-10">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="block text-4xl lg:text-5xl font-black text-slate-100 hover:text-amber-400 transition-all duration-500 hover:translate-x-4"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: isOpen
                    ? `slideInUp 0.7s ease-out forwards ${index * 80}ms`
                    : 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="mt-auto space-y-8 border-t border-amber-500/20 pt-10">
            <div>
              <p className="text-2xl font-bold text-amber-400">Gaurav Kumar</p>
              <p className="text-slate-400 mt-2">AI Researcher • Full-Stack Engineer</p>
              <p className="text-sm text-slate-500 mt-3">Building AI for Healthcare & Sanskrit Preservation</p>
            </div>

            <div className="flex gap-8">
              {[
                { Icon: Github, href: "https://github.com/Coding-with-Gaurav" },
                { Icon: Linkedin, href: "https://linkedin.com/in/gaurav-kumar-68453b247" },
                { Icon: X, href: "https://x.com/GauravK30437835" },
              ].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125">
                  <Icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}