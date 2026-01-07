'use client'
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
