'use client'
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
