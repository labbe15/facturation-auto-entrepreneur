'use client'
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
