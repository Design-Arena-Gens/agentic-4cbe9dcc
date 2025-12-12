'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageCanvasProps {
  imageData: string
  effect: string
  strength: number
  isProcessing: boolean
  onProcessed: (imageData: string) => void
}

export default function ImageCanvas({
  imageData,
  effect,
  strength,
  isProcessing,
  onProcessed
}: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentEffect, setCurrentEffect] = useState('')

  useEffect(() => {
    if (!effect || !canvasRef.current || isProcessing) return
    if (effect === currentEffect) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      // Set canvas dimensions
      const maxWidth = 800
      const maxHeight = 600
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }

      canvas.width = width
      canvas.height = height

      // Draw original image
      ctx.drawImage(img, 0, 0, width, height)

      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      // Apply effect based on type
      const intensity = strength / 100

      switch (effect) {
        case 'enhance':
          // Enhance contrast and sharpness
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * (1 + 0.3 * intensity))     // R
            data[i + 1] = Math.min(255, data[i + 1] * (1 + 0.3 * intensity)) // G
            data[i + 2] = Math.min(255, data[i + 2] * (1 + 0.3 * intensity)) // B
          }
          break

        case 'futuristic':
          // Cyan-magenta futuristic look
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i] = avg + (data[i] - avg) * 1.5 * intensity + 30 * intensity
            data[i + 1] = avg + (data[i + 1] - avg) * 1.2 * intensity + 50 * intensity
            data[i + 2] = avg + (data[i + 2] - avg) * 1.8 * intensity + 80 * intensity
          }
          break

        case 'cinematic':
          // Warm cinematic color grading
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * (1 + 0.2 * intensity))
            data[i + 1] = Math.min(255, data[i + 1] * (1 + 0.1 * intensity))
            data[i + 2] = Math.max(0, data[i + 2] * (1 - 0.1 * intensity))
          }
          break

        case 'identity':
          // Subtle skin tone enhancement
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            if (r > 95 && g > 40 && b > 20 && r > g && r > b) {
              data[i] = Math.min(255, r * (1 + 0.15 * intensity))
              data[i + 1] = Math.min(255, g * (1 + 0.1 * intensity))
              data[i + 2] = Math.min(255, b * (1 + 0.05 * intensity))
            }
          }
          break

        case 'dreamscape':
          // Soft, dreamy effect with color shifts
          for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
            const factor = 0.3 * intensity
            data[i] = data[i] * (1 - factor) + brightness * factor + 20 * intensity
            data[i + 1] = data[i + 1] * (1 - factor) + brightness * factor + 30 * intensity
            data[i + 2] = data[i + 2] * (1 - factor) + brightness * factor + 50 * intensity
          }
          break

        case 'hyperreal':
          // Maximum detail and vibrance
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i] = Math.min(255, avg + (data[i] - avg) * (1 + intensity))
            data[i + 1] = Math.min(255, avg + (data[i + 1] - avg) * (1 + intensity))
            data[i + 2] = Math.min(255, avg + (data[i + 2] - avg) * (1 + intensity))
          }
          break
      }

      // Put processed image back
      ctx.putImageData(imageData, 0, 0)

      // Export processed image
      const processedDataUrl = canvas.toDataURL('image/png')
      onProcessed(processedDataUrl)
      setCurrentEffect(effect)
    }

    img.src = imageData
  }, [effect, imageData, strength, isProcessing, currentEffect, onProcessed])

  return (
    <div className="glass-effect rounded-2xl p-6 relative">
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="text-6xl mb-4"
              >
                ✨
              </motion.div>
              <p className="text-2xl font-bold text-purple-300">Processing...</p>
              <p className="text-purple-400 mt-2">Applying AI enhancement</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  )
}
