"use client"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function ColorsPage() {
  return (
    <>
      <SiteHeader />
      <div className="container py-12">
        <h1 className="section-title mb-12">Palette de Couleurs Recruitment Plus</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Thème Clair</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-md"></div>
              <p className="font-medium">Primary</p>
              <p className="text-sm text-muted-foreground">#0F766E</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-secondary rounded-md"></div>
              <p className="font-medium">Secondary</p>
              <p className="text-sm text-muted-foreground">#031F28</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-background rounded-md border"></div>
              <p className="font-medium">Background</p>
              <p className="text-sm text-muted-foreground">#F9FAFB</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-muted rounded-md"></div>
              <p className="font-medium">Muted</p>
              <p className="text-sm text-muted-foreground">#E6F1F4</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-card rounded-md border"></div>
              <p className="font-medium">Card</p>
              <p className="text-sm text-muted-foreground">#FFFFFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 border rounded-md"></div>
              <p className="font-medium">Border</p>
              <p className="text-sm text-muted-foreground">#E5E7EB</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-accent rounded-md"></div>
              <p className="font-medium">Accent</p>
              <p className="text-sm text-muted-foreground">#E6F1F4</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 flex items-center justify-center bg-background rounded-md">
                <span className="text-foreground font-bold">Text</span>
              </div>
              <p className="font-medium">Text</p>
              <p className="text-sm text-muted-foreground">#1F2937</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Thème Sombre</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 dark">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-md"></div>
              <p className="font-medium">Primary</p>
              <p className="text-sm text-muted-foreground">#031F28</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-secondary rounded-md"></div>
              <p className="font-medium">Secondary</p>
              <p className="text-sm text-muted-foreground">#1D4E5F</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-background rounded-md border"></div>
              <p className="font-medium">Background</p>
              <p className="text-sm text-muted-foreground">#02141B</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-muted rounded-md"></div>
              <p className="font-medium">Muted</p>
              <p className="text-sm text-muted-foreground">#05212B</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-card rounded-md border"></div>
              <p className="font-medium">Card</p>
              <p className="text-sm text-muted-foreground">#0A2C38</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 border rounded-md"></div>
              <p className="font-medium">Border</p>
              <p className="text-sm text-muted-foreground">#093142</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-accent rounded-md"></div>
              <p className="font-medium">Accent</p>
              <p className="text-sm text-muted-foreground">#1D4E5F</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 flex items-center justify-center bg-background rounded-md">
                <span className="text-foreground font-bold">Text</span>
              </div>
              <p className="font-medium">Text</p>
              <p className="text-sm text-muted-foreground">#E6F1F4</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Exemples de Composants</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Thème Clair</h3>
              <div className="p-6 bg-card rounded-lg border space-y-4">
                <h4 className="font-bold">Boutons</h4>
                <div className="flex flex-wrap gap-2">
                  <Button>Primaire</Button>
                  <Button variant="secondary">Secondaire</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <h4 className="font-bold">Texte</h4>
                <p className="text-foreground">Texte principal</p>
                <p className="text-muted-foreground">Texte secondaire</p>
                <p className="text-primary">Texte primaire</p>
                <p className="text-secondary">Texte secondaire</p>
              </div>
            </div>
            <div className="space-y-4 dark">
              <h3 className="text-xl font-bold">Thème Sombre</h3>
              <div className="p-6 bg-card rounded-lg border space-y-4">
                <h4 className="font-bold">Boutons</h4>
                <div className="flex flex-wrap gap-2">
                  <Button>Primaire</Button>
                  <Button variant="secondary">Secondaire</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <h4 className="font-bold">Texte</h4>
                <p className="text-foreground">Texte principal</p>
                <p className="text-muted-foreground">Texte secondaire</p>
                <p className="text-primary">Texte primaire</p>
                <p className="text-secondary">Texte secondaire</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
