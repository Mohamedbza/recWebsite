"use client"

import { useState } from "react"
import Image from "next/image"
import { X, CheckCircle, Globe, MapPin, Users, Building2, Target, Award, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface RecruitmentSolution {
  id: string
  title: string
  type: "Local" | "National" | "International"
  image: string
  description: string
  benefits: string[]
  expertise: string[]
  features: {
    icon: any
    title: string
    description: string
  }[]
  stats: {
    icon: any
    value: string
    label: string
  }[]
}

interface RecruitmentSolutionModalProps {
  solution: RecruitmentSolution | null
  isOpen: boolean
  onClose: () => void
}

export function RecruitmentSolutionModal({ solution, isOpen, onClose }: RecruitmentSolutionModalProps) {
  if (!solution) return null

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Local":
        return "bg-primary/90"
      case "National":
        return "bg-secondary/90"
      case "International":
        return "bg-gradient-to-r from-primary to-secondary"
      default:
        return "bg-primary/90"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Local":
        return <MapPin className="h-4 w-4" />
      case "National":
        return <Building2 className="h-4 w-4" />
      case "International":
        return <Globe className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-left">
            {solution.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="relative">
            <div className="w-full h-64 rounded-xl overflow-hidden">
              <Image
                src={solution.image}
                alt={solution.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <Badge className={`absolute top-4 left-4 ${getTypeColor(solution.type)} text-white`}>
              {getTypeIcon(solution.type)}
              <span className="ml-2">{solution.type}</span>
            </Badge>
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed text-base">
              {solution.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {solution.stats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {solution.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Avantages principaux</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {solution.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Notre expertise</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {solution.expertise.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Star className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </DialogContent>
    </Dialog>
  )
} 