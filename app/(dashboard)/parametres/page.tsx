'use client'
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
