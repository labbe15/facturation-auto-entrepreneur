'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/utils/calculations'
import { TrendingUp, FileText, FileCheck, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const stats = {
    monthlyRevenue: 15420,
    unpaidInvoices: 3,
    pendingQuotes: 5,
    overdueInvoices: 1
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>CA Mensuel</CardTitle>
              <TrendingUp className="text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(stats.monthlyRevenue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Factures impayées</CardTitle>
              <FileText className="text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.unpaidInvoices}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Devis en attente</CardTitle>
              <FileCheck className="text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pendingQuotes}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Factures en retard</CardTitle>
              <AlertCircle className="text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.overdueInvoices}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
