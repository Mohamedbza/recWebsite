"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "@/components/ui/job-card"
import { SiteHeader } from "@/components/site-header"

export default function DesignSystemPage() {
  // Mock function for JobCard component
  const handleApply = () => {
    console.log("Postuler clicked")
  }

  return (
    <>
      <SiteHeader />
      <div className="container py-12">
        <h1 className="section-title mb-12">Système de Design Recruitment Plus</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Couleurs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-md"></div>
              <p className="font-medium">Primary</p>
              <p className="text-sm text-muted-foreground">--primary: 210 100% 40%</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-secondary rounded-md"></div>
              <p className="font-medium">Secondary</p>
              <p className="text-sm text-muted-foreground">--secondary: 220 13% 91%</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-accent rounded-md"></div>
              <p className="font-medium">Accent</p>
              <p className="text-sm text-muted-foreground">--accent: 25 100% 50%</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-muted rounded-md"></div>
              <p className="font-medium">Muted</p>
              <p className="text-sm text-muted-foreground">--muted: 220 14% 96%</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Typographie</h2>
          <div className="space-y-6">
            <div>
              <h1>Titre H1</h1>
              <p className="text-sm text-muted-foreground">text-4xl md:text-5xl font-bold tracking-tight</p>
            </div>
            <div>
              <h2>Titre H2</h2>
              <p className="text-sm text-muted-foreground">text-3xl md:text-4xl font-bold tracking-tight</p>
            </div>
            <div>
              <h3>Titre H3</h3>
              <p className="text-sm text-muted-foreground">text-2xl md:text-3xl font-bold tracking-tight</p>
            </div>
            <div>
              <h4 className="text-xl font-bold">Titre H4</h4>
              <p className="text-sm text-muted-foreground">text-xl font-bold</p>
            </div>
            <div>
              <p className="text-lg">Texte large</p>
              <p className="text-sm text-muted-foreground">text-lg</p>
            </div>
            <div>
              <p>Texte normal</p>
              <p className="text-sm text-muted-foreground">text-base</p>
            </div>
            <div>
              <p className="text-sm">Petit texte</p>
              <p className="text-sm text-muted-foreground">text-sm</p>
            </div>
            <div>
              <p className="gradient-text text-2xl font-bold">Texte avec dégradé</p>
              <p className="text-sm text-muted-foreground">gradient-text</p>
            </div>
            <div>
              <p className="section-title text-2xl">Titre de section</p>
              <p className="text-sm text-muted-foreground">section-title</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Boutons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Bouton primaire</Button>
            <Button variant="secondary">Bouton secondaire</Button>
            <Button variant="outline">Bouton outline</Button>
            <Button variant="ghost">Bouton ghost</Button>
            <Button variant="link">Bouton lien</Button>
            <Button variant="destructive">Bouton destructif</Button>
            <Button className="btn-primary-gradient">Bouton dégradé</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="lg">Grand</Button>
            <Button>Défaut</Button>
            <Button size="sm">Petit</Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Cartes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Carte standard</CardTitle>
                <CardDescription>Description de la carte</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenu de la carte avec des informations importantes.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Carte avec hover</CardTitle>
                <CardDescription>Effet de survol</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cette carte a un effet de survol. Passez votre souris dessus.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <div>
              <h3 className="text-lg font-bold mb-4">Carte d'emploi</h3>
              <JobCard
                title="Développeur Full Stack"
                company="TechCorp Inc."
                location="Montréal, QC"
                type="Temps plein"
                salary="75 000 $ - 95 000 $ par année"
                tags={["React", "Node.js"]}
                postedDate="Il y a 2 jours"
                onApply={handleApply}
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Badge par défaut</Badge>
            <Badge variant="secondary">Badge secondaire</Badge>
            <Badge variant="outline">Badge outline</Badge>
            <Badge variant="destructive">Badge destructif</Badge>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Formulaires</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Champ de texte</label>
                <Input placeholder="Entrez votre texte" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" placeholder="exemple@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mot de passe</label>
                <Input type="password" placeholder="Votre mot de passe" />
              </div>
              <Button className="w-full">Soumettre</Button>
            </div>

            <div>
              <Tabs defaultValue="candidat">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="candidat">Candidat</TabsTrigger>
                  <TabsTrigger value="employeur">Employeur</TabsTrigger>
                </TabsList>
                <TabsContent value="candidat" className="p-4 border rounded-md mt-2">
                  <h4 className="font-medium mb-2">Formulaire candidat</h4>
                  <div className="space-y-2">
                    <Input placeholder="Nom complet" />
                    <Input placeholder="Email" />
                    <Button size="sm">S'inscrire</Button>
                  </div>
                </TabsContent>
                <TabsContent value="employeur" className="p-4 border rounded-md mt-2">
                  <h4 className="font-medium mb-2">Formulaire employeur</h4>
                  <div className="space-y-2">
                    <Input placeholder="Nom de l'entreprise" />
                    <Input placeholder="Email professionnel" />
                    <Button size="sm">S'inscrire</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
