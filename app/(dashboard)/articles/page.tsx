'use client'
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
