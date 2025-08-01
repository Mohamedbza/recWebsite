"use client"

import { useState } from "react"
import Image from "next/image"
import { CalendarIcon, Clock, Tag, X, Share2, Bookmark, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: {
    intro: string
    sections: Array<{
      title: string
      content: string
      image?: string
    }>
    conclusion: string
  }
  date: string
  readTime: number
  category: string
  author: {
    name: string
    image: string
    bio?: string
  }
  image: string
  tags: string[]
  featured?: boolean
  views?: number
}

interface BlogDetailModalProps {
  open: boolean
  onClose: () => void
  post: BlogPost | null
  relatedPosts?: BlogPost[]
  onPostChange?: (post: BlogPost) => void
}

export default function BlogDetailModal({ 
  open, 
  onClose, 
  post, 
  relatedPosts = [],
  onPostChange 
}: BlogDetailModalProps) {
  const { locale } = useLanguage()
  const dateLocale = locale === 'fr' ? fr : enUS
  const [currentSection, setCurrentSection] = useState(0)

  if (!post) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'PPP', { locale: dateLocale })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const nextSection = () => {
    if (currentSection < post.content.sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-0 pb-4">
          <DialogTitle className="sr-only">{post.title}</DialogTitle>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="w-fit">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image 
                      src={post.author.image}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-foreground">{post.author.name}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime} {locale === 'fr' ? 'min de lecture' : 'min read'}
                </div>
                {post.views && (
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views} {locale === 'fr' ? 'vues' : 'views'}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            {/* Introduction */}
            <div className="text-lg leading-relaxed mb-8 text-muted-foreground">
              {post.content.intro}
            </div>

            {/* Sections Navigation */}
            {post.content.sections.length > 1 && (
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {locale === 'fr' ? 'Section' : 'Section'} {currentSection + 1} {locale === 'fr' ? 'de' : 'of'} {post.content.sections.length}
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={prevSection}
                    disabled={currentSection === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={nextSection}
                    disabled={currentSection === post.content.sections.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Current Section */}
            {post.content.sections[currentSection] && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {post.content.sections[currentSection].title}
                </h2>
                
                {post.content.sections[currentSection].image && (
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={post.content.sections[currentSection].image!}
                      alt={post.content.sections[currentSection].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="leading-relaxed whitespace-pre-line">
                  {post.content.sections[currentSection].content}
                </div>
              </div>
            )}

            {/* Conclusion (only show on last section or if single section) */}
            {currentSection === post.content.sections.length - 1 && (
              <>
                <Separator className="my-8" />
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">
                    {locale === 'fr' ? 'Conclusion' : 'Conclusion'}
                  </h3>
                  <div className="leading-relaxed text-muted-foreground">
                    {post.content.conclusion}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Author Bio */}
          {post.author.bio && (
            <>
              <Separator className="my-8" />
              <div className="flex gap-4 p-6 bg-muted/30 rounded-lg">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image 
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{post.author.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <>
              <Separator className="my-8" />
              <div>
                <h3 className="text-xl font-bold mb-4">
                  {locale === 'fr' ? 'Articles similaires' : 'Related Articles'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedPosts.slice(0, 4).map((relatedPost) => (
                    <div 
                      key={relatedPost.id}
                      className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => onPostChange?.(relatedPost)}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {relatedPost.readTime} {locale === 'fr' ? 'min' : 'min read'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}