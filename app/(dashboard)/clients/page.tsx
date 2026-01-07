'use client'
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
