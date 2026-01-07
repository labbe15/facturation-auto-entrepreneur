# Guide de déploiement

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
