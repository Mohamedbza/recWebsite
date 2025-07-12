"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, Filter, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BlogLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 mt-2"></div>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 relative overflow-hidden">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-30"></div>
          
          <div className="container relative z-10">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer mx-auto">
              <CalendarIcon className="inline-block h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-24 inline-block" />
            </div>
            
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8" />

            {/* Search Bar */}
            <div className="max-w-xl mx-auto bg-background/80 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 container">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-64 md:h-full" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <Skeleton className="h-8 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content Section */}
        <section className="py-8 container">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  <Skeleton className="h-6 w-24" />
                </h3>
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-primary" />
                  <Skeleton className="h-6 w-28" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline"><Skeleton className="h-4 w-12" /></Badge>
                  <Badge variant="outline"><Skeleton className="h-4 w-14" /></Badge>
                  <Badge variant="outline"><Skeleton className="h-4 w-10" /></Badge>
                  <Badge variant="outline"><Skeleton className="h-4 w-16" /></Badge>
                  <Badge variant="outline"><Skeleton className="h-4 w-12" /></Badge>
                  <Badge variant="outline"><Skeleton className="h-4 w-14" /></Badge>
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-full mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <div>
                            <Skeleton className="h-3 w-20 mb-1" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}