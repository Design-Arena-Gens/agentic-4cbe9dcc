'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ImageUploaderProps {
  onImageUpload: (imageData: string) => void
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`glass-effect rounded-2xl p-8 cursor-pointer transition-all ${
        isDragging ? 'neon-glow' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="text-center">
        <motion.div
          animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
          className="mb-4"
        >
          <svg
            className="w-16 h-16 mx-auto text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </motion.div>

        <h3 className="text-xl font-bold mb-2 text-purple-300">Upload Image</h3>
        <p className="text-sm text-purple-200 mb-4">
          Drag & drop or click to browse
        </p>
        <p className="text-xs text-purple-400">
          Supports JPG, PNG, WebP • Max 10MB
        </p>
      </div>
    </motion.div>
  )
}
