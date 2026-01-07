'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/utils/calculations'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

export default function TreasuryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trésorerie</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Encaissements</CardTitle>
              <TrendingUp className="text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dépenses</CardTitle>
              <TrendingDown className="text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Solde</CardTitle>
              <DollarSign className="text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(0)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
