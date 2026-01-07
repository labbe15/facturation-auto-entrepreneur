'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Plus, Edit, Trash, Download } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { formatCurrency, formatDate } from '@/utils/calculations'
import Link from 'next/link'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('invoices')
      .select('*, clients(name)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setInvoices(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) return
    
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)
    
    if (!error) {
      loadInvoices()
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-200 text-gray-800',
      sent: 'bg-blue-200 text-blue-800',
      paid: 'bg-green-200 text-green-800',
      overdue: 'bg-red-200 text-red-800'
    }
    const labels = {
      draft: 'Brouillon',
      sent: 'Envoyée',
      paid: 'Payée',
      overdue: 'En retard'
    }
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[status as keyof typeof colors] || colors.draft}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Factures</h1>
        <Link href="/factures/new">
          <Button>
            <Plus className="mr-2" size={20} />
            Nouvelle facture
          </Button>
        </Link>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Aucune facture pour le moment</p>
            <Link href="/factures/new">
              <Button className="mt-4">
                <Plus className="mr-2" size={20} />
                Créer votre première facture
              </Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Montant TTC</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                  <TableCell>{invoice.clients?.name || '-'}</TableCell>
                  <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                  <TableCell>{formatDate(invoice.due_date)}</TableCell>
                  <TableCell>{formatCurrency(invoice.total_ttc)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/factures/${invoice.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(invoice.id)}>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}
