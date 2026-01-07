# Application de Facturation pour Auto-Entrepreneurs

Application complète de facturation développée avec Next.js 15, React 19, Tailwind CSS 4 et Supabase.

## Fonctionnalités

✅ Dashboard avec statistiques en temps réel
✅ Module CRM avec intégration API SIRET
✅ Gestion des factures avec export PDF
✅ Gestion des devis avec conversion en factures
✅ Catalogue d'articles réutilisables
✅ Timetracking avec chronomètre
✅ Trésorerie et livre des recettes
✅ Calculateur URSSAF (BIC/BNC + ACRE)
✅ Système de relances automatiques
✅ Paramètres complets

## Installation

1. Cloner le projet
```bash
git clone <votre-repo>
cd facturation-auto-entrepreneur
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer Supabase

- Créer un projet sur [supabase.com](https://supabase.com)
- Exécuter le fichier `supabase/schema.sql` dans l'éditeur SQL de Supabase
- Copier les clés API dans `.env.local`

4. Configurer les variables d'environnement

Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role
```

5. Lancer l'application en développement
```bash
npm run dev
```

## Déploiement sur Vercel

1. Pusher le code sur GitHub
2. Importer le projet dans Vercel
3. Configurer les variables d'environnement
4. Déployer

## Structure du projet

```
├── app/                  # Pages et routes Next.js
│   ├── (auth)/          # Pages d'authentification
│   ├── (dashboard)/     # Pages du dashboard
│   └── api/             # API routes
├── components/          # Composants réutilisables
├── lib/                 # Configuration (Supabase, etc.)
├── utils/               # Fonctions utilitaires
├── types/               # Types TypeScript
└── supabase/            # Schéma SQL
```

## Technologies

- **Next.js 15** - Framework React
- **React 19** - Bibliothèque UI
- **Tailwind CSS 4** - Styling
- **Supabase** - Base de données PostgreSQL + Auth
- **TypeScript** - Typage statique
- **jsPDF** - Génération de PDF

## Licence

Propriétaire - Tous droits réservés
