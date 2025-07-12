"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X, Send } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  // Close the modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t('contact.success'))
    setIsOpen(false)
  }

  // If modal is open, prevent body scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <>
      {/* Floating chat button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Contact"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white">
          1
        </span>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center">
          {/* Modal content */}
          <div className="relative bg-background rounded-2xl shadow-xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
            {/* Close button - absolutely positioned to avoid any issues */}
            <div 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[110] w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer transition-colors"
            >
              <X className="h-5 w-5" />
            </div>
            
            {/* Modal body with proper padding to accommodate the close button */}
            <div className="p-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 pr-8">
                {t('contact.title')}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {t('contact.description')}
              </p>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name field */}
                <div>
                  <input
                    type="text"
                    placeholder={t('contact.form.name_placeholder')}
                    className="w-full rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 shadow-inner transition-all duration-300 focus:border-primary/30 focus:bg-white/10 focus:shadow-primary/5 focus:outline-none"
                    required
                  />
                </div>
                
                {/* Email field */}
                <div>
                  <input
                    type="email"
                    placeholder={t('contact.form.email_placeholder')}
                    className="w-full rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 shadow-inner transition-all duration-300 focus:border-primary/30 focus:bg-white/10 focus:shadow-primary/5 focus:outline-none"
                    required
                  />
                </div>
                
                {/* Message field */}
                <div>
                  <textarea
                    placeholder={t('contact.form.message_placeholder')}
                    className="w-full h-24 resize-none rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 shadow-inner transition-all duration-300 focus:border-primary/30 focus:bg-white/10 focus:shadow-primary/5 focus:outline-none"
                    required
                  ></textarea>
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {t('contact.form.submit')}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
            
            {/* Visual effects */}
            <div className="absolute -z-10 -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
            <div className="absolute -z-10 -bottom-20 -left-20 w-40 h-40 bg-secondary/5 rounded-full blur-xl"></div>
          </div>
        </div>
      )}
    </>
  )
}