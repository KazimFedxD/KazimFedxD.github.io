"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LEGACY_DOMAIN, SITE_URL, FEATURES } from "@/config/constants"

const STORAGE_KEY = "rm_legacy_banner_dismissed"

export function LegacyDomainBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (!FEATURES.enableLegacyDomainWarning) return

    // Check if we're on the legacy domain
    const isLegacyDomain = typeof window !== "undefined" && 
      window.location.hostname === LEGACY_DOMAIN

    // Check if user has dismissed the banner
    const isDismissed = typeof localStorage !== "undefined" && 
      localStorage.getItem(STORAGE_KEY) === "true"

    if (isLegacyDomain && !isDismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true")
    }
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="fixed inset-x-0 top-0 z-50 bg-yellow-500/95 text-yellow-950 backdrop-blur-sm"
          role="alert"
          aria-live="polite"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium">
                <span className="font-semibold">This domain is deprecated.</span>{" "}
                <span className="hidden sm:inline">
                  The new official domain is{" "}
                </span>
                <a
                  href={SITE_URL}
                  className="underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-yellow-950 focus:ring-offset-2 focus:ring-offset-yellow-500 rounded"
                >
                  {SITE_URL.replace("https://", "")}
                </a>
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="shrink-0 rounded-md p-1.5 transition-colors hover:bg-yellow-600/50 focus:outline-none focus:ring-2 focus:ring-yellow-950 focus:ring-offset-2 focus:ring-offset-yellow-500"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
