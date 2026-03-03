// // components/CertificateModal.tsx
// import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';

// interface CertificateModalProps {
//   cert: { name: string; issuer: string; link: string };
//   onClose: () => void;
// }

// export default function CertificateModal({ cert, onClose }: CertificateModalProps) {
//   const isEmbeddable =
//   cert.link.endsWith(".pdf") ||
//   cert.link.endsWith(".jpg") ||
//   cert.link.endsWith(".jpeg") ||
//   cert.link.includes("drive.google.com");
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-6"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.95 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.95 }}
//           className="bg-slate-900/95 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-slate-400 hover:text-white"
//           >
//             <X className="w-6 h-6" />
//           </button>

//           <h3 className="text-2xl font-display font-bold text-white mb-4">
//             {cert.name}
//           </h3>
//           <p className="text-amber-400 mb-6">{cert.issuer}</p>

//           {/* The certificate itself – most platforms give a PDF or image */}
//           {/* <div className="bg-white rounded-lg overflow-hidden">
//             <iframe
//               src={cert.link}
//               className="w-full h-[70vh]"
//               title={cert.name}
//             />
//           </div> */}
// <div className="bg-white rounded-lg overflow-hidden">
//   {isEmbeddable ? (
//     <iframe
//       src={cert.link}
//       className="w-full h-[70vh]"
//       title={cert.name}
//     />
//   ) : (
//     <div className="p-10 text-center text-slate-700">
//       <p className="mb-4 font-medium">
//         Preview not available for this platform.
//       </p>
//       <a
//         href={cert.link}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
//       >
//         View Certificate on {cert.issuer}
//       </a>
//     </div>
//   )}
// </div>
//           <div className="mt-6 text-center">
//             <a
//               href={cert.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300"
//             >
//               Open in new tab
//             </a>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }





import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

interface Certificate {
  name: string;
  issuer: string;
  link: string;
  type: "pdf" | "image" | "external";
}

interface CertificateModalProps {
  cert: Certificate;
  onClose: () => void;
}

export default function CertificateModal({
  cert,
  onClose,
}: CertificateModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/75 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 40, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className={`
            relative 
            w-full max-w-5xl 
            bg-gradient-to-b from-slate-900/95 to-slate-950/95
            backdrop-blur-2xl 
            border border-white/8 
            rounded-2xl sm:rounded-3xl 
            shadow-2xl shadow-black/60
            overflow-hidden
            max-h-[96vh] sm:max-h-[92vh]
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          {/* Close Button – larger hit area, nicer hover */}
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4 z-20
              p-2.5 rounded-full
              text-slate-400 hover:text-white
              bg-slate-800/40 hover:bg-slate-700/60
              backdrop-blur-sm border border-slate-700/50
              transition-all duration-200
              hover:scale-110 active:scale-95
            "
            aria-label="Close certificate preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="px-6 pt-8 pb-5 sm:px-10 sm:pt-10 border-b border-white/6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {cert.name}
            </h3>
            <p className="mt-2 text-lg text-amber-400/90 font-medium">
              {cert.issuer}
            </p>
          </div>

          {/* Main content area */}
          <div className="p-6 sm:p-10">
            <div
              className="
                bg-white/5 
                backdrop-blur-xl 
                border border-white/10 
                rounded-xl sm:rounded-2xl 
                overflow-hidden 
                shadow-inner shadow-black/30
                relative
              "
            >
              {/* ────────────── PDF / IMAGE ────────────── */}
              {(cert.type === "pdf" || cert.type === "image") && (
                <>
                  {/* Loading overlay – cleaner & more premium */}
                  {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-10 backdrop-blur-sm">
                      <div className="relative">
                        <Loader2 className="w-14 h-14 text-amber-500 animate-spin" />
                        <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" />
                      </div>
                      <p className="mt-5 text-slate-300 font-medium tracking-wide">
                        Loading certificate...
                      </p>
                    </div>
                  )}

                  <iframe
                    src={cert.link}
                    className={`
                      w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[3/2] lg:aspect-video
                      transition-opacity duration-700 ease-out
                      ${isLoading ? "opacity-0" : "opacity-100"}
                    `}
                    title={cert.name}
                    onLoad={() => setIsLoading(false)}
                    allowFullScreen
                  />
                </>
              )}

              {/* ────────────── EXTERNAL FALLBACK ────────────── */}
              {cert.type === "external" && (
                <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] px-6 py-12 text-center">
                  <div className="relative mb-8">
                    <Award className="w-20 h-20 sm:w-24 sm:h-24 text-amber-500/80" />
                    <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" />
                  </div>

                  <h4 className="text-2xl font-semibold text-white mb-4">
                    Preview not available
                  </h4>
                  <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                    This certificate is hosted externally on{" "}
                    <span className="text-amber-400 font-medium">{cert.issuer}</span>.
                  </p>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-3
                      px-8 py-4 
                      bg-gradient-to-r from-amber-600 to-amber-500
                      hover:from-amber-500 hover:to-amber-400
                      text-white font-semibold
                      rounded-xl shadow-lg shadow-amber-900/30
                      transition-all duration-300
                      hover:shadow-xl hover:shadow-amber-900/40
                      hover:scale-[1.03] active:scale-95
                    "
                  >
                    <ExternalLink className="w-5 h-5" />
                    View on {cert.issuer}
                  </a>
                </div>
              )}
            </div>

            {/* Footer link – more elegant */}
            <div className="mt-8 text-center">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2.5
                  text-amber-400/90 hover:text-amber-300
                  font-medium tracking-wide
                  transition-colors duration-200
                  hover:underline underline-offset-4
                "
              >
                <ExternalLink className="w-4 h-4" />
                Open in new tab
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}