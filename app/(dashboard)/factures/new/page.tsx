'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Plus, Trash } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { calculateTotals } from '@/utils/calculations'

interface InvoiceLine {
  description: string
  quantity: number
  unit_price: number
  tva_rate: number
}

export default function NewInvoicePage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [clients, setClients] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [formData, setFormData] = useState({
    client_id: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    notes: ''
  })
  const [lines, setLines] = useState<InvoiceLine[]>([
    { description: '', quantity: 1, unit_price: 0, tva_rate: 20 }
  ])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: clientsData } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', user.id)
      .order('name')

    const { data: articlesData } = await supabase
      .from('articles')
      .select('*')
      .eq('user_id', user.id)
      .order('name')

    if (clientsData) setClients(clientsData)
    if (articlesData) setArticles(articlesData)
  }

  const addLine = () => {
    setLines([...lines, { description: '', quantity: 1, unit_price: 0, tva_rate: 20 }])
  }

  const removeLine = (index: number) => {
    if (lines.length > 1) {
      setLines(lines.filter((_, i) => i !== index))
    }
  }

  const updateLine = (index: number, field: keyof InvoiceLine, value: any) => {
    const newLines = [...lines]
    newLines[index] = { ...newLines[index], [field]: value }
    setLines(newLines)
  }

  const selectArticle = (index: number, articleId: string) => {
    const article = articles.find(a => a.id === parseInt(articleId))
    if (article) {
      updateLine(index, 'description', article.name)
      updateLine(index, 'unit_price', article.unit_price)
      updateLine(index, 'tva_rate', article.tva_rate)
    }
  }

  const totals = calculateTotals(lines)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.client_id) {
      alert('Veuillez sélectionner un client')
      return
    }

    if (lines.some(l => !l.description || l.quantity <= 0 || l.unit_price < 0)) {
      alert('Veuillez remplir toutes les lignes correctement')
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Générer le numéro de facture
    const { data: lastInvoice } = await supabase
      .from('invoices')
      .select('invoice_number')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    let invoiceNumber = `FA-${new Date().getFullYear()}-001`
    if (lastInvoice?.invoice_number) {
      const lastNum = parseInt(lastInvoice.invoice_number.split('-')[2])
      invoiceNumber = `FA-${new Date().getFullYear()}-${(lastNum + 1).toString().padStart(3, '0')}`
    }

    // Créer la facture
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert([{
        user_id: user.id,
        client_id: parseInt(formData.client_id),
        invoice_number: invoiceNumber,
        issue_date: formData.issue_date,
        due_date: formData.due_date,
        status: formData.status,
        total_ht: totals.totalHT,
        total_tva: totals.totalTVA,
        total_ttc: totals.totalTTC,
        notes: formData.notes
      }])
      .select()
      .single()

    if (invoiceError || !invoice) {
      alert('Erreur lors de la création de la facture')
      return
    }

    // Créer les lignes
    const linesData = lines.map(line => ({
      invoice_id: invoice.id,
      description: line.description,
      quantity: line.quantity,
      unit_price: line.unit_price,
      tva_rate: line.tva_rate,
      total_ht: line.quantity * line.unit_price,
      total_tva: (line.quantity * line.unit_price * line.tva_rate) / 100,
      total_ttc: line.quantity * line.unit_price * (1 + line.tva_rate / 100)
    }))

    const { error: linesError } = await supabase
      .from('invoice_lines')
      .insert(linesData)

    if (linesError) {
      alert('Erreur lors de la création des lignes')
      return
    }

    router.push('/factures')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nouvelle facture</h1>
        <Button variant="secondary" onClick={() => router.push('/factures')}>
          Annuler
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Client *"
              value={formData.client_id}
              onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
              required
            >
              <option value="">Sélectionner un client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </Select>

            <Select
              label="Statut"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="draft">Brouillon</option>
              <option value="sent">Envoyée</option>
              <option value="paid">Payée</option>
            </Select>

            <Input
              label="Date d'émission *"
              type="date"
              value={formData.issue_date}
              onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
              required
            />

            <Input
              label="Date d'échéance *"
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              required
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lignes de facturation</h2>
            <Button type="button" onClick={addLine} size="sm">
              <Plus className="mr-2" size={16} />
              Ajouter une ligne
            </Button>
          </div>

          <div className="space-y-4">
            {lines.map((line, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 grid grid-cols-4 gap-3">
                    <div className="col-span-4">
                      <Select
                        label="Article (optionnel)"
                        value=""
                        onChange={(e) => selectArticle(index, e.target.value)}
                      >
                        <option value="">Sélectionner un article</option>
                        {articles.map(article => (
                          <option key={article.id} value={article.id}>
                            {article.name} - {article.unit_price}€ HT
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Input
                        label="Description *"
                        value={line.description}
                        onChange={(e) => updateLine(index, 'description', e.target.value)}
                        placeholder="Description de la prestation"
                        required
                      />
                    </div>

                    <Input
                      label="Quantité *"
                      type="number"
                      step="0.01"
                      min="0"
                      value={line.quantity}
                      onChange={(e) => updateLine(index, 'quantity', parseFloat(e.target.value) || 0)}
                      required
                    />

                    <Input
                      label="Prix unitaire HT *"
                      type="number"
                      step="0.01"
                      min="0"
                      value={line.unit_price}
                      onChange={(e) => updateLine(index, 'unit_price', parseFloat(e.target.value) || 0)}
                      required
                    />

                    <Input
                      label="TVA (%)"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={line.tva_rate}
                      onChange={(e) => updateLine(index, 'tva_rate', parseFloat(e.target.value) || 0)}
                    />

                    <div className="flex items-end">
                      <div className="text-sm">
                        <div className="text-gray-600">Total HT</div>
                        <div className="font-semibold">
                          {(line.quantity * line.unit_price).toFixed(2)} €
                        </div>
                      </div>
                    </div>
                  </div>

                  {lines.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeLine(index)}
                      className="ml-2"
                    >
                      <Trash size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Total HT:</span>
                  <span className="font-semibold">{totals.totalHT.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Total TVA:</span>
                  <span className="font-semibold">{totals.totalTVA.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-lg border-t pt-2">
                  <span className="font-bold">Total TTC:</span>
                  <span className="font-bold text-indigo-600">{totals.totalTTC.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <textarea
            className="w-full border rounded-lg p-3 min-h-[100px]"
            placeholder="Notes additionnelles (conditions de paiement, etc.)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </Card>

        <div className="flex gap-3">
          <Button type="submit">Créer la facture</Button>
          <Button type="button" variant="secondary" onClick={() => router.push('/factures')}>
            Annuler
          </Button>
        </div>
      </form>
    </div>
  )
}
