'use client'
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
