'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Download,
  ExternalLink,
  X,
  BookOpen,
  TrendingUp,
  Sparkles,
  BarChart3,
  Layers,
  Award,
  CheckCircle2,
  Calendar,
  Building,
  GraduationCap
} from 'lucide-react'

interface ResearchPaperModalProps {
  open: boolean
  onClose: () => void
  pdfUrl?: string
  title?: string
}

export default function ResearchPaperModal({
  open,
  onClose,
  pdfUrl = '/UWASE_UTUJE_Sandrine_TradeWise_AI_Research_Paper.pdf',
  title = 'TradeWise AI: An Event-Oriented Artificial Intelligence Framework for Predicting Irish Potato Price Changes in Rwanda',
}: ResearchPaperModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'pdf'>('overview')

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0b0b0b] border border-cream/20 rounded-md md:rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
            initial={{ scale: 0.94, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-col border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/10 border border-cream/30 text-[11px] font-semibold text-cream uppercase tracking-wider">
                      <GraduationCap size={13} />
                      Academic Research Paper
                    </span>
                    <span className="text-[11px] text-white/50 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      14 Pages · Peer-Reviewed Structure
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-cream leading-snug max-w-3xl">
                    {title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 pt-1">
                    <span className="flex items-center gap-1.5 font-medium text-white">
                      <Award size={14} className="text-cream" />
                      UWASE UTUJE Sandrine
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="flex items-center gap-1.5 text-white/70">
                      <Building size={14} className="text-cream/80" />
                      Rwanda Coding Academy
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-cream/90 italic">Independent Student Research</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-cream hover:text-black border border-white/10 hover:border-cream text-white/70 transition-all duration-300"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* View Switcher & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-2 border-t border-white/5">
                <div className="inline-flex p-1 rounded-md bg-white/5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      activeTab === 'overview'
                        ? 'bg-cream text-black font-semibold shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <BookOpen size={14} />
                    Document Preview & Highlights
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('pdf')}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      activeTab === 'pdf'
                        ? 'bg-cream text-black font-semibold shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <FileText size={14} />
                    Read Full PDF Document
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cream/30 text-xs font-medium text-white/80 hover:text-cream transition-all duration-300"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink size={13} />
                  </a>
                  <a
                    href={pdfUrl}
                    download="UWASE_UTUJE_Sandrine_TradeWise_AI_Research_Paper.pdf"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-cream text-black hover:bg-cream/90 text-xs font-semibold shadow-sm transition-all duration-300"
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 custom-scrollbar">
              {activeTab === 'overview' ? (
                <div className="space-y-6">
                  {/* Key Highlights Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-cream/30 transition-colors">
                      <div className="text-[10px] uppercase tracking-wider text-cream font-mono mb-1">
                        Model ROC-AUC
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">0.643</div>
                      <div className="text-[11px] text-white/50 mt-1">
                        95% Bootstrap CI: [0.533 - 0.748] (p=0.0064)
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-cream/30 transition-colors">
                      <div className="text-[10px] uppercase tracking-wider text-cream font-mono mb-1">
                        Direction ROC-AUC
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">0.697</div>
                      <div className="text-[11px] text-white/50 mt-1">
                        Strongest ranking signal for Up/Down events
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-cream/30 transition-colors">
                      <div className="text-[10px] uppercase tracking-wider text-cream font-mono mb-1">
                        Supervised Dataset
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">1,395</div>
                      <div className="text-[11px] text-white/50 mt-1">
                        Kinigi Grade 2 observations across 11 markets
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-cream/30 transition-colors">
                      <div className="text-[10px] uppercase tracking-wider text-cream font-mono mb-1">
                        Primary Classifier
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-cream">Random Forest</div>
                      <div className="text-[11px] text-white/50 mt-1">
                        500 trees · max depth 8 · strict temporal splits
                      </div>
                    </div>
                  </div>

                  {/* Abstract Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-cream/5 via-white/[0.02] to-transparent border border-cream/20 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-cream" />
                      <h3 className="text-sm uppercase tracking-widest text-cream font-bold">
                        Abstract &amp; Research Summary
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-xs leading-relaxed text-white/80">
                      <div className="space-y-3">
                        <div>
                          <span className="text-cream font-semibold block mb-0.5">Purpose:</span>
                          Develops and evaluates TradeWise AI, an event-oriented machine-learning framework predicting whether meaningful Irish potato price changes (≥5% absolute shift within a 7-day operational window) are likely to occur across Rwandan markets under irregular observation.
                        </div>
                        <div>
                          <span className="text-cream font-semibold block mb-0.5">Materials &amp; Methods:</span>
                          Uses a quantitative predictive design with chronological out-of-sample evaluation. After strict eligibility and outcome-observability filtering, 1,395 observations across 11 markets were analyzed using Logistic Regression, Random Forest, and XGBoost with bootstrap and permutation validation.
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-cream font-semibold block mb-0.5">Key Findings:</span>
                          The history-only Random Forest achieved 0.643 ROC-AUC on the untouched test set (p=0.0064). Direction prediction showed the highest ranking performance (ROC-AUC 0.697), confirming machine learning can capture directional signals in local agricultural markets.
                        </div>
                        <div>
                          <span className="text-cream font-semibold block mb-0.5">Human-in-the-Loop Implications:</span>
                          TradeWise AI is designed as an operational decision-support tool rather than an autonomous trading system, emphasizing probability calibration, local market context, and risk monitoring for farmers and traders.
                        </div>
                      </div>
                    </div>

                    {/* Keywords */}
                    <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-white/40 uppercase font-mono tracking-wider">Keywords:</span>
                      {['Artificial Intelligence', 'Agricultural Price Forecasting', 'Irish Potatoes', 'Event Prediction', 'Rwanda Markets', 'Machine Learning'].map((kw) => (
                        <span key={kw} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cream/90 font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Two-column Deep Dive */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Methodology & Contributions */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-cream text-xs font-bold uppercase tracking-wider">
                        <Layers size={15} />
                        Core Methodological Contributions
                      </div>
                      <ul className="space-y-2 text-xs text-white/70">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-cream shrink-0 mt-0.5" />
                          <span><strong>Discrete Threshold Events:</strong> Predicts practical 5% price movements within 7 calendar days instead of artificial daily volatility.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-cream shrink-0 mt-0.5" />
                          <span><strong>Irregular Market Preservation:</strong> Retains genuine sparse market reports without distorting the underlying data series.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-cream shrink-0 mt-0.5" />
                          <span><strong>Strict Temporal Availability:</strong> Rigorously excludes future data leakage from all predictor feature constructions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-cream shrink-0 mt-0.5" />
                          <span><strong>Multimodal Ablation Testing:</strong> Systematically examined cross-market, weather, exchange-rate, and CPI data sources.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Rwandan Market Coverage */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-cream text-xs font-bold uppercase tracking-wider">
                        <BarChart3 size={15} />
                        Rwandan Market Dataset Coverage
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Evaluated across 11 eligible commercial markets in Rwanda from 163,271 raw market records (TangaBid/eSoko data-access export):
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-white/80 pt-1">
                        <div className="p-2 rounded-md bg-black/40 border border-white/5 flex justify-between">
                          <span>Nyabugogo (Kigali)</span>
                          <span className="text-cream font-mono">273 obs (78.8%)</span>
                        </div>
                        <div className="p-2 rounded-md bg-black/40 border border-white/5 flex justify-between">
                          <span>Kibuye</span>
                          <span className="text-cream font-mono">261 obs (49.8%)</span>
                        </div>
                        <div className="p-2 rounded-md bg-black/40 border border-white/5 flex justify-between">
                          <span>Mulindi</span>
                          <span className="text-cream font-mono">189 obs (31.7%)</span>
                        </div>
                        <div className="p-2 rounded-md bg-black/40 border border-white/5 flex justify-between">
                          <span>Nyagatare</span>
                          <span className="text-cream font-mono">143 obs (38.5%)</span>
                        </div>
                        <div className="p-2 rounded-md bg-black/40 border border-white/5 flex justify-between">
                          <span>Kimironko</span>
                          <span className="text-cream font-mono">97 obs (62.9%)</span>
                        </div>
                        <div className="p-2 rounded-md bg-black/40 border border-white/5 flex justify-between">
                          <span>Musanze</span>
                          <span className="text-cream font-mono">90 obs (38.9%)</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-white/40 italic">
                        Additional markets: Kicukiro-Center, Gahoromani, Kibungo, Butare, and Ziniya.
                      </div>
                    </div>
                  </div>

                  {/* Switch to Full PDF CTA Banner */}
                  <div className="p-5 rounded-lg bg-gradient-to-r from-cream/15 via-cream/5 to-transparent border border-cream/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <FileText size={16} className="text-cream" />
                        Full 14-Page Academic Document Available
                      </h4>
                      <p className="text-xs text-white/60">
                        View complete literature review, statistical tables, ablation charts, and academic citations.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('pdf')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cream text-black hover:bg-cream/90 font-semibold text-xs transition-all shadow-md shrink-0"
                    >
                      <span>Read Full Document Inside Viewer</span>
                      <BookOpen size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                /* PDF Viewer Tab */
                <div className="space-y-3">
                  <div className="relative w-full h-[68vh] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-inner">
                    <iframe
                      src={`${pdfUrl}#toolbar=1&navpanes=0`}
                      className="w-full h-full border-0"
                      title="TradeWise AI Research Paper Document Viewer"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50 px-1">
                    <span>Document: UWASE_UTUJE_Sandrine_TradeWise_AI_Research_Paper.pdf</span>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream hover:underline flex items-center gap-1"
                    >
                      Open in external PDF reader <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#070707] flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
              <span className="font-mono text-[11px]">
                Authored by UWASE UTUJE Sandrine · Rwanda Coding Academy
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
                >
                  Close
                </button>
                <a
                  href={pdfUrl}
                  download="UWASE_UTUJE_Sandrine_TradeWise_AI_Research_Paper.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-cream text-black hover:bg-cream/90 font-semibold transition-all shadow-sm"
                >
                  <Download size={14} />
                  <span>Download Complete PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

