'use client'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCode, FiPlay, FiCopy, FiCheck, FiHome, FiCpu, FiGlobe, FiTruck, FiServer, FiLayers } from 'react-icons/fi'
import Link from 'next/link'

const codeExamples = {
  laravel: {
    title: 'Laravel Domain Service',
    icon: <FiServer />,
    code: `namespace App\\Domain\\Logistics\\Services;

/**
 * Senior-level Domain Service for MENA Trade Bridge.
 * Implements Atomic Transactions and Event-Driven Architecture.
 */
class TradeBridgeManager {
    public function __construct(
        protected InventoryRepo $inventory,
        protected WebhookClient $salla
    ) {}

    public function finalizeTrade(Order $order): void {
        DB::transaction(function () use ($order) {
            // Lock records to prevent race conditions in high-concurrency retail
            $this->inventory->lockForUpdate($order->items);
            
            $order->transitionTo(Status::READY_FOR_EXPORT);
            
            // Dispatch high-priority manifest generation
            GenerateCustomsManifest::dispatch($order)->onQueue('high-priority');
            
            event(new TradeBridgeFinalized($order));
        });
    }
}`,
    output: 'DB_TX: Committed | Queue: Manifest_Job_992 | Status: 200'
  },
  nextjs: {
    title: 'Next.js Server Actions',
    icon: <FiLayers />,
    code: `'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'

/**
 * Secure Server Action for Real-time Logistics Dashboard.
 * Implements optimistic updates and strict session validation.
 */
export async function updateShipmentStatus(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.roles.includes('ARCHITECT')) {
    throw new Error('Unauthorized_Access_Log: 403');
  }

  const status = formData.get('status');
  
  try {
    const updated = await db.shipment.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    });

    revalidatePath('/dashboard/logistics');
    return { success: true, data: updated };
  } catch (err) {
    return { success: false, error: 'Database_Sync_Failure' };
  }
}`,
    output: 'Revalidation: Success | Path: /logistics | Auth: Verified'
  },
  architecture: {
    title: 'Bilingual Token Engine',
    icon: <FiGlobe />,
    code: `/**
 * Abstract Design Token Manager (Bilingual).
 * Specifically optimized for Salla-inspired RTL/LTR UI systems.
 */
export const DesignSystemProvider = ({ brand, locale, children }: Props) => {
  const tokens = useMemo(() => ({
    primary: brand === 'Salla' ? '#00bfa5' : '#10b981',
    direction: locale === 'ar' ? 'rtl' : 'ltr',
    font: locale === 'ar' ? 'Tajawal' : 'Inter',
  }), [brand, locale]);

  useEffect(() => {
    document.documentElement.dir = tokens.direction;
    document.documentElement.lang = locale;
  }, [tokens, locale]);

  return (
    <div style={{ 
      '--brand-color': tokens.primary,
      fontFamily: tokens.font 
    } as React.CSSProperties}>
      {children}
    </div>
  );
};`,
    output: 'Active Tenant: NAL | Layout: RTL | Typography: Tajawal'
  }
}

export default function CodePlayground() {
  const [selectedExample, setSelectedExample] = useState<keyof typeof codeExamples>('laravel')
  const [copied, setCopied] = useState(false)
  const [typedCode, setTypedCode] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const currentExample = codeExamples[selectedExample]

  useEffect(() => {
    setTypedCode('')
    setIsTyping(true)
    let index = 0
    const code = currentExample.code

    const interval = setInterval(() => {
      if (index < code.length) {
        setTypedCode(code.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 10)

    return () => clearInterval(interval)
  }, [selectedExample, currentExample.code])

  const handleCopy = () => {
    navigator.clipboard.writeText(currentExample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#06080a] text-slate-100 font-sans selection:bg-emerald-500/30">
      <nav className="fixed top-0 w-full bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group transition-all">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
              <FiHome />
            </div>
            <span className="font-medium text-sm text-slate-400 group-hover:text-white">Exit Playground</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-sm font-mono tracking-tighter uppercase text-slate-500">System_Architect_Mode: active</h1>
          </div>
        </div>
      </nav>

      <div className="pt-32 px-6 pb-20 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
          <h2 className="text-6xl font-black tracking-tight mb-4 text-white">
            Technical <span className="text-emerald-400">Deep-Dive</span>
          </h2>
          <p className="text-slate-500 text-xl max-w-2xl border-l-2 border-emerald-500/20 pl-6 italic">
            "Engineering is about solving for today while architecting for tomorrow." 
            <span className="block not-italic text-sm text-slate-600 mt-2">— Exploring scalable systems for Saudi and Egyptian trade.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {Object.entries(codeExamples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key as keyof typeof codeExamples)}
              className={`group relative p-6 rounded-3xl border transition-all text-left overflow-hidden ${
                selectedExample === key
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <div className={`text-2xl mb-4 ${selectedExample === key ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                {example.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{example.title}</h3>
              <p className="text-xs font-mono text-slate-500">{example.output}</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div layout className="lg:col-span-8 bg-[#0d1117] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
            <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">{selectedExample}.core</div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-all text-xs font-bold"
              >
                {copied ? <FiCheck /> : <FiCopy />}
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
            <div className="p-8 font-mono text-[13px] leading-relaxed min-h-[440px]">
              <pre className="text-slate-300 whitespace-pre-wrap">
                <code>{typedCode}</code>
                {isTyping && <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse align-middle" />}
              </pre>
            </div>
          </motion.div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-emerald-500/5 rounded-3xl border border-emerald-500/20 p-8">
              <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FiPlay /> Execution Result
              </h3>
              <div className="bg-black/40 rounded-2xl p-6 font-mono border border-emerald-500/10">
                <span className="text-emerald-500/50 block text-[10px] mb-2">$ system --simulate</span>
                <p className="text-emerald-400 text-sm leading-relaxed">{currentExample.output}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl border border-white/5 p-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Architectural Strengths</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm font-bold">01</div>
                  <p className="text-sm text-slate-400 leading-relaxed"><strong className="text-white block">Full-Stack Cohesion</strong> Bridging Laravel's backend robustness with Next.js's frontend speed.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm font-bold">02</div>
                  <p className="text-sm text-slate-400 leading-relaxed"><strong className="text-white block">Enterprise RTL</strong> Native support for Arabic/English systems using CSS variables.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}