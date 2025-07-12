"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, Clock, Tag, Search, Filter } from "lucide-react"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { useLanguage } from "@/contexts/LanguageContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import newArticles from "./new-articles"

// Define a type for blog categories
type Category = {
  id: string
  name: string
  slug: string
  count: number
}

// Define a type for blog posts
type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  readTime: number
  category: string
  author: {
    name: string
    image: string
  }
  image: string
  tags: string[]
  featured?: boolean
}

export default function BlogPage() {
  const { t, locale } = useLanguage()
  const dateLocale = locale === 'fr' ? fr : enUS
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample blog categories
  const categories: Category[] = [
    { id: "1", name: locale === 'fr' ? "Recrutement" : "Recruitment", slug: "recruitment", count: 8 },
    { id: "2", name: locale === 'fr' ? "Carrière" : "Career", slug: "career", count: 12 },
    { id: "3", name: locale === 'fr' ? "Immigration" : "Immigration", slug: "immigration", count: 6 },
    { id: "4", name: locale === 'fr' ? "Emploi" : "Employment", slug: "employment", count: 10 },
    { id: "5", name: locale === 'fr' ? "Tendances RH" : "HR Trends", slug: "hr-trends", count: 7 },
  ]

  // Create a function to convert detailed articles to blog post listings
  const createBlogPostFromArticle = (article: any, isEnglish: boolean): BlogPost => {
    // If we're in French but don't have a French version, show the English one
    const articleData = isEnglish ? article : article;
    
    return {
      id: articleData.id,
      title: articleData.title,
      slug: articleData.slug,
      excerpt: articleData.content.intro.substring(0, 150) + "...",
      date: articleData.date,
      readTime: articleData.readTime,
      category: articleData.category,
      author: {
        name: articleData.author.name,
        image: articleData.author.image || "/placeholder-user.jpg"
      },
      image: articleData.image,
      tags: articleData.tags,
      featured: articleData.id === "1" // Make the first article featured
    };
  };
  
  // Sample blog posts - enhanced with the new articles data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: locale === 'fr' ? "Les tendances du marché du travail canadien en 2025" : "Canadian Job Market Trends in 2025",
      slug: "canadian-job-market-trends-2025",
      excerpt: locale === 'fr' 
        ? "Découvrez les principales tendances qui façonnent le marché du travail canadien en 2025 et comment vous pouvez vous positionner pour réussir." 
        : "Discover the key trends shaping the Canadian job market in 2025 and how you can position yourself for success.",
      date: "2025-05-28",
      readTime: 8,
      category: "hr-trends",
      author: {
        name: "Marie Tremblay",
        image: "/placeholder-user.jpg"
      },
      image: "/images/business-meeting-office-recuiteers.jpg",
      tags: ["Market Trends", "Future of Work", "Career Development"],
      featured: true
    },
    {
      id: "2",
      title: locale === 'fr' ? "Guide complet du Programme des travailleurs qualifiés" : "Complete Guide to the Skilled Worker Program",
      slug: "skilled-worker-program-guide",
      excerpt: locale === 'fr'
        ? "Tout ce que vous devez savoir sur le Programme des travailleurs qualifiés du Canada, de l'admissibilité aux avantages et au processus de demande."
        : "Everything you need to know about Canada's Skilled Worker Program, from eligibility to benefits and the application process.",
      date: "2025-05-22",
      readTime: 12,
      category: "immigration",
      author: {
        name: "Sophie Martin",
        image: "/placeholder-user.jpg"
      },
      image: "/images/team-working.png",
      tags: ["Immigration", "Skilled Workers", "Work Permits"]
    },
    // Convert new articles to blog post format
    ...Object.values(newArticles.en).map(article => createBlogPostFromArticle(article, locale === 'en'))
  ]

  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory ? post.category === activeCategory : true
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
    return matchesCategory && matchesSearch
  })

  // Find featured post
  const featuredPost = blogPosts.find(post => post.featured)

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'PPP', { locale: dateLocale })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30 floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-30 floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>
          
          <div className="container relative z-10">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer mx-auto">
              <CalendarIcon className="inline-block h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Blog & Ressources' : 'Blog & Resources'}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Actualités et perspectives sur le recrutement canadien' : 'Canadian Recruitment News & Insights'}
              </span>
            </h1>
            
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {locale === 'fr' 
                ? 'Découvrez les dernières tendances, conseils et informations sur le recrutement, l\'immigration et le marché du travail canadien.'
                : 'Discover the latest trends, tips, and insights on recruitment, immigration, and the Canadian job market.'}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto bg-background/80 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder={locale === 'fr' ? "Rechercher des articles..." : "Search articles..."} 
                  className="pl-10 bg-background/50 backdrop-blur-sm border-white/20 focus:border-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 container">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {locale === 'fr' ? 'Article à la une' : 'Featured Article'}
            </h2>
            <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="mb-2">
                      {categories.find(c => c.slug === featuredPost.category)?.name}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(featuredPost.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime} {locale === 'fr' ? 'min de lecture' : 'min read'}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image 
                          src={featuredPost.author.image || "/placeholder-user.jpg"}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">{featuredPost.author.name}</span>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button variant="outline" className="text-primary border-primary/30 hover:bg-primary/5">
                        {locale === 'fr' ? 'Lire plus' : 'Read more'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Content Section */}
        <section className="py-8 container">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  {locale === 'fr' ? 'Catégories' : 'Categories'}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center transition-colors ${
                      activeCategory === null ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                    }`}
                  >
                    <span>{locale === 'fr' ? 'Tous les articles' : 'All posts'}</span>
                    <Badge variant="secondary">{blogPosts.length}</Badge>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center transition-colors ${
                        activeCategory === category.slug ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                      }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-primary" />
                  {locale === 'fr' ? 'Tags populaires' : 'Popular Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 10).map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary/10 border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {activeCategory 
                    ? `${locale === 'fr' ? 'Articles dans' : 'Posts in'} ${categories.find(c => c.slug === activeCategory)?.name}`
                    : locale === 'fr' ? 'Articles récents' : 'Recent Posts'}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredPosts.length} {locale === 'fr' ? 'articles' : 'posts'}
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/20 group">
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="secondary" className="mb-2">
                            {categories.find(c => c.slug === post.category)?.name}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image 
                                src={post.author.image || "/placeholder-user.jpg"}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-medium">{post.author.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(post.date)} • {post.readTime} {locale === 'fr' ? 'min' : 'min read'}
                              </div>
                            </div>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 -mr-2">
                              {locale === 'fr' ? 'Lire plus' : 'Read more'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-8 text-center">
                  <p className="text-lg text-muted-foreground">
                    {locale === 'fr' 
                      ? 'Aucun article trouvé. Essayez de modifier vos filtres de recherche.'
                      : 'No posts found. Try adjusting your search filters.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}