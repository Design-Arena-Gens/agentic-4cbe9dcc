'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ResultDisplayProps {
  originalImage: string
  processedImage: string
  effect: string
}

export default function ResultDisplay({
  originalImage,
  processedImage,
  effect
}: ResultDisplayProps) {
  const [showComparison, setShowComparison] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = processedImage
    link.download = `ai-enhanced-${effect}-${Date.now()}.png`
    link.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-purple-300">Result</h3>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors"
          >
            {showComparison ? '👁️ Hide Compare' : '👁️ Compare'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <span>⬇️</span>
            Download
          </motion.button>
        </div>
      </div>

      {showComparison ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-purple-400 mb-2 text-center">Original</p>
            <img
              src={originalImage}
              alt="Original"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-sm text-purple-400 mb-2 text-center">Enhanced</p>
            <img
              src={processedImage}
              alt="Processed"
              className="w-full rounded-lg shadow-lg neon-glow"
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={processedImage}
            alt="Processed result"
            className="w-full rounded-lg shadow-2xl neon-glow"
          />
          <div className="absolute top-4 right-4 bg-purple-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
            ✨ {effect.toUpperCase()}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-purple-900/30 rounded-lg">
          <div className="text-2xl font-bold text-purple-300">4K</div>
          <div className="text-xs text-purple-400">Resolution</div>
        </div>
        <div className="text-center p-3 bg-purple-900/30 rounded-lg">
          <div className="text-2xl font-bold text-purple-300">AI</div>
          <div className="text-xs text-purple-400">Enhanced</div>
        </div>
        <div className="text-center p-3 bg-purple-900/30 rounded-lg">
          <div className="text-2xl font-bold text-purple-300">Pro</div>
          <div className="text-xs text-purple-400">Quality</div>
        </div>
      </div>
    </motion.div>
  )
}
