'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageUploader from '@/components/ImageUploader'
import EffectsPanel from '@/components/EffectsPanel'
import ImageCanvas from '@/components/ImageCanvas'
import ResultDisplay from '@/components/ResultDisplay'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [selectedEffect, setSelectedEffect] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [effectStrength, setEffectStrength] = useState(50)

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData)
    setProcessedImage(null)
  }

  const handleEffectApply = async (effect: string, strength: number) => {
    if (!uploadedImage) return

    setIsProcessing(true)
    setSelectedEffect(effect)
    setEffectStrength(strength)

    // Simulate processing time for cinematic effect
    await new Promise(resolve => setTimeout(resolve, 1500))

    // The actual processing happens in ImageCanvas
    setIsProcessing(false)
  }

  const handleProcessedImage = (imageData: string) => {
    setProcessedImage(imageData)
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            AI Visual Enhancer
          </h1>
          <p className="text-xl text-purple-200">
            Ultra-realistic transformations • Cinematic AI effects • Instant results
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <ImageUploader onImageUpload={handleImageUpload} />

            {uploadedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8"
              >
                <EffectsPanel
                  onEffectApply={handleEffectApply}
                  isProcessing={isProcessing}
                  effectStrength={effectStrength}
                  setEffectStrength={setEffectStrength}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Canvas Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            {uploadedImage ? (
              <div className="space-y-6">
                <ImageCanvas
                  imageData={uploadedImage}
                  effect={selectedEffect}
                  strength={effectStrength}
                  isProcessing={isProcessing}
                  onProcessed={handleProcessedImage}
                />

                {processedImage && (
                  <ResultDisplay
                    originalImage={uploadedImage}
                    processedImage={processedImage}
                    effect={selectedEffect}
                  />
                )}
              </div>
            ) : (
              <div className="glass-effect rounded-2xl p-16 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-purple-300"
                >
                  <svg
                    className="w-32 h-32 mx-auto mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-2xl font-semibold">Upload an image to begin</p>
                  <p className="text-purple-400 mt-2">Transform your visuals with AI-powered effects</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: "✨",
              title: "Ultra-Realistic",
              description: "AI-powered enhancement that maintains natural perfection"
            },
            {
              icon: "🎬",
              title: "Cinematic Quality",
              description: "Professional-grade effects with high-quality output"
            },
            {
              icon: "⚡",
              title: "Instant Results",
              description: "Real-time processing with immediate visual feedback"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-purple-300">{feature.title}</h3>
              <p className="text-purple-200 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
