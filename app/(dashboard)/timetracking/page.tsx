'use client'
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
