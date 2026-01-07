#!/usr/bin/env python3
import os

# Dictionnaire de tous les fichiers à créer
files_to_create = {
    "app/(dashboard)/dashboard/page.tsx": """'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/utils/calculations'
import { TrendingUp, FileText, FileCheck, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const stats = {
    monthlyRevenue: 15420,
    unpaidInvoices: 3,
    pendingQuotes: 5,
    overdueInvoices: 1
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>CA Mensuel</CardTitle>
              <TrendingUp className="text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(stats.monthlyRevenue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Factures impayées</CardTitle>
              <FileText className="text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.unpaidInvoices}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Devis en attente</CardTitle>
              <FileCheck className="text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pendingQuotes}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Factures en retard</CardTitle>
              <AlertCircle className="text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.overdueInvoices}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
""",

    "app/(dashboard)/clients/page.tsx": """'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Plus, Search } from 'lucide-react'

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const clients: any[] = []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button>
          <Plus className="mr-2" size={20} />
          Nouveau client
        </Button>
      </div>

      <Card className="p-4">
        <Input
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      <Card>
        <div className="text-center py-12 text-gray-500">
          <p>Aucun client pour le moment</p>
          <Button className="mt-4">
            <Plus className="mr-2" size={20} />
            Créer votre premier client
          </Button>
        </div>
      </Card>
    </div>
  )
}
""",

    "app/(dashboard)/factures/page.tsx": """'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Factures</h1>
        <Button>
          <Plus className="mr-2" size={20} />
          Nouvelle facture
        </Button>
      </div>

      <Card>
        <div className="text-center py-12 text-gray-500">
          <p>Aucune facture pour le moment</p>
        </div>
      </Card>
    </div>
  )
}
""",

    "app/(dashboard)/devis/page.tsx": """'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function QuotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Devis</h1>
        <Button>
          <Plus className="mr-2" size={20} />
          Nouveau devis
        </Button>
      </div>

      <Card>
        <div className="text-center py-12 text-gray-500">
          <p>Aucun devis pour le moment</p>
        </div>
      </Card>
    </div>
  )
}
""",

    "app/(dashboard)/articles/page.tsx": """'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Catalogue d'articles</h1>
        <Button>
          <Plus className="mr-2" size={20} />
          Nouvel article
        </Button>
      </div>

      <Card>
        <div className="text-center py-12 text-gray-500">
          <p>Aucun article pour le moment</p>
        </div>
      </Card>
    </div>
  )
}
""",

    "app/(dashboard)/timetracking/page.tsx": """'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play } from 'lucide-react'

export default function TimeTrackingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Timetracking</h1>

      <Card className="p-6">
        <div className="text-center">
          <p className="text-4xl font-bold mb-4">00:00:00</p>
          <Button>
            <Play className="mr-2" size={20} />
            Démarrer
          </Button>
        </div>
      </Card>

      <Card>
        <div className="text-center py-12 text-gray-500">
          <p>Aucune session enregistrée</p>
        </div>
      </Card>
    </div>
  )
}
""",

    "app/(dashboard)/tresorerie/page.tsx": """'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/utils/calculations'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

export default function TreasuryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trésorerie</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Encaissements</CardTitle>
              <TrendingUp className="text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dépenses</CardTitle>
              <TrendingDown className="text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Solde</CardTitle>
              <DollarSign className="text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(0)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
""",

    "app/(dashboard)/urssaf/page.tsx": """'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { formatCurrency } from '@/utils/calculations'

export default function URSSAFPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calculateur URSSAF</h1>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            label="Régime fiscal"
            options={[
              { value: 'BIC', label: 'BIC (Bénéfices Industriels et Commerciaux)' },
              { value: 'BNC', label: 'BNC (Bénéfices Non Commerciaux)' }
            ]}
          />
          <Select
            label="ACRE"
            options={[
              { value: 'yes', label: 'Oui (taux réduit)' },
              { value: 'no', label: 'Non (taux normal)' }
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cotisations estimées</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatCurrency(0)}</p>
          <p className="text-sm text-gray-500 mt-2">Basé sur votre CA actuel</p>
        </CardContent>
      </Card>
    </div>
  )
}
""",

    "app/(dashboard)/relances/page.tsx": """'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Bell } from 'lucide-react'

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Relances automatiques</h1>

      <Card>
        <CardHeader>
          <CardTitle>Configuration des relances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bell size={20} />
                <span className="font-medium">Relance 1 - Rappel amical</span>
              </div>
              <p className="text-sm text-gray-500">Envoyée 7 jours après l'échéance</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bell size={20} />
                <span className="font-medium">Relance 2 - Rappel ferme</span>
              </div>
              <p className="text-sm text-gray-500">Envoyée 14 jours après l'échéance</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bell size={20} />
                <span className="font-medium">Relance 3 - Dernier rappel</span>
              </div>
              <p className="text-sm text-gray-500">Envoyée 21 jours après l'échéance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
""",

    "app/(dashboard)/parametres/page.tsx": """'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Paramètres</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations entreprise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Nom de l'entreprise" placeholder="Mon Entreprise SARL" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="SIRET" placeholder="12345678901234" />
            <Input label="Numéro TVA" placeholder="FR12345678901" />
          </div>
          <Input label="Adresse" placeholder="123 Rue de la République" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Code postal" placeholder="75001" />
            <Input label="Ville" placeholder="Paris" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Email" type="email" placeholder="contact@entreprise.fr" />
            <Input label="Téléphone" placeholder="01 23 45 67 89" />
          </div>
          <Button>Enregistrer les modifications</Button>
        </CardContent>
      </Card>
    </div>
  )
}
""",

    "app/(auth)/login/page.tsx": """'use client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        <form className="space-y-4">
          <Input label="Email" type="email" placeholder="votre@email.com" />
          <Input label="Mot de passe" type="password" placeholder="••••••••" />
          <Button className="w-full">Se connecter</Button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </Card>
    </div>
  )
}
""",

    "app/(auth)/signup/page.tsx": """'use client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>
        <form className="space-y-4">
          <Input label="Nom complet" placeholder="Jean Dupont" />
          <Input label="Email" type="email" placeholder="votre@email.com" />
          <Input label="Mot de passe" type="password" placeholder="••••••••" />
          <Input label="Confirmer le mot de passe" type="password" placeholder="••••••••" />
          <Button className="w-full">S'inscrire</Button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </Card>
    </div>
  )
}
""",

    "app/api/siret/route.ts": """import { NextRequest, NextResponse } from 'next/server'
import { fetchCompanyBySIRET } from '@/utils/siret'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const siret = searchParams.get('siret')

  if (!siret) {
    return NextResponse.json({ error: 'SIRET manquant' }, { status: 400 })
  }

  try {
    const data = await fetchCompanyBySIRET(siret)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'SIRET non trouvé' }, { status: 404 })
  }
}
""",

    "DEPLOYMENT.md": """# Guide de déploiement

## Prérequis

1. Un compte Supabase (gratuit sur supabase.com)
2. Un compte Vercel (gratuit sur vercel.com)
3. Un compte GitHub

## Étape 1 : Configuration Supabase

1. Créer un nouveau projet sur [supabase.com](https://supabase.com)
2. Aller dans l'éditeur SQL
3. Copier-coller le contenu du fichier `supabase/schema.sql`
4. Exécuter le script
5. Noter les clés API dans Settings > API

## Étape 2 : Déploiement sur Vercel

1. Pusher le code sur GitHub
2. Aller sur [vercel.com](https://vercel.com)
3. Cliquer sur "New Project"
4. Importer votre repository GitHub
5. Configurer les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Cliquer sur "Deploy"

## Étape 3 : Configuration post-déploiement

1. Aller dans les paramètres de votre application
2. Configurer les informations de votre entreprise
3. Ajouter vos premiers clients
4. Créer votre première facture

## Support

Pour toute question, consultez la documentation :
- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Vercel](https://vercel.com/docs)
"""
}

# Créer tous les fichiers
count = 0
for filepath, content in files_to_create.items():
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {filepath}")
        count += 1
    except Exception as e:
        print(f"❌ {filepath}: {e}")

print(f"\n✅ {count}/{len(files_to_create)} files created successfully")
