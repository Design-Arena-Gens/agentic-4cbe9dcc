'use client'

import { motion } from 'framer-motion'

interface EffectsPanelProps {
  onEffectApply: (effect: string, strength: number) => void
  isProcessing: boolean
  effectStrength: number
  setEffectStrength: (value: number) => void
}

const effects = [
  {
    id: 'enhance',
    name: 'Ultra Enhance',
    icon: '✨',
    description: 'Amplify details and clarity'
  },
  {
    id: 'futuristic',
    name: 'Futuristic',
    icon: '🚀',
    description: 'Sci-fi transformation'
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    icon: '🎬',
    description: 'Hollywood-grade color'
  },
  {
    id: 'identity',
    name: 'Identity Plus',
    icon: '👤',
    description: 'Enhance facial features'
  },
  {
    id: 'dreamscape',
    name: 'Dreamscape',
    icon: '🌙',
    description: 'Surreal artistic blend'
  },
  {
    id: 'hyperreal',
    name: 'Hyper-Real',
    icon: '💎',
    description: 'Maximum realism'
  }
]

export default function EffectsPanel({
  onEffectApply,
  isProcessing,
  effectStrength,
  setEffectStrength
}: EffectsPanelProps) {
  return (
    <div className="glass-effect rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-purple-300">AI Effects</h3>

      {/* Strength Slider */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3 text-purple-200">
          Effect Strength: {effectStrength}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={effectStrength}
          onChange={(e) => setEffectStrength(Number(e.target.value))}
          className="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      {/* Effects Grid */}
      <div className="space-y-3">
        {effects.map((effect, index) => (
          <motion.button
            key={effect.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onEffectApply(effect.id, effectStrength)}
            disabled={isProcessing}
            className="w-full glass-effect rounded-xl p-4 text-left hover:bg-purple-800/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{effect.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-purple-200">{effect.name}</div>
                <div className="text-xs text-purple-400">{effect.description}</div>
              </div>
              {isProcessing && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-purple-400"
                >
                  ⚙️
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center"
        >
          <div className="inline-block px-4 py-2 bg-purple-600/30 rounded-full">
            <span className="text-purple-200 text-sm">Processing...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
