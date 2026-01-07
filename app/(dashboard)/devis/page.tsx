'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Plus, Edit, Trash } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { formatCurrency, formatDate } from '@/utils/calculations'

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadQuotes()
  }, [])

  const loadQuotes = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('quotes')
      .select(\`*, clients(name)\`)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setQuotes(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce devis ?')) return
    await supabase.from('quotes').delete().eq('id', id)
    loadQuotes()
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-200 text-gray-800',
      sent: 'bg-blue-200 text-blue-800',
      accepted: 'bg-green-200 text-green-800',
      rejected: 'bg-red-200 text-red-800',
      expired: 'bg-orange-200 text-orange-800'
    }
    return <span className={\`px-2 py-1 rounded text-xs font-semibold \${colors[status as keyof typeof colors]}\`}>{status}</span>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Devis</h1>
        <Button><Plus className="mr-2" size={20} />Nouveau devis</Button>
      </div>

      <Card>
        {loading ? <div className="text-center py-12">Chargement...</div> :
        quotes.length === 0 ? <div className="text-center py-12 text-gray-500">Aucun devis</div> :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Validité</TableHead>
                <TableHead>Montant TTC</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map(quote => (
                <TableRow key={quote.id}>
                  <TableCell>{quote.quote_number}</TableCell>
                  <TableCell>{quote.clients?.name}</TableCell>
                  <TableCell>{formatDate(quote.issue_date)}</TableCell>
                  <TableCell>{formatDate(quote.valid_until)}</TableCell>
                  <TableCell>{formatCurrency(quote.total_ttc)}</TableCell>
                  <TableCell>{getStatusBadge(quote.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Edit size={16} /></Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(quote.id)}><Trash size={16} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </Card>
    </div>
  )
}
