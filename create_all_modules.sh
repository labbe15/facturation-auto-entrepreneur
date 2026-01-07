#!/bin/bash

echo "Création de tous les modules fonctionnels..."

# Module Articles
cat > "app/(dashboard)/articles/page.tsx" << 'EOFARTICLES'
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Plus, Edit, Trash } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit_price: '',
    tva_rate: '20',
    unit: 'unité'
  })

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setArticles(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const articleData = {
      ...formData,
      unit_price: parseFloat(formData.unit_price),
      tva_rate: parseFloat(formData.tva_rate)
    }

    if (editingArticle) {
      const { error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', editingArticle.id)
      
      if (!error) {
        loadArticles()
        resetForm()
      }
    } else {
      const { error } = await supabase
        .from('articles')
        .insert([{ ...articleData, user_id: user.id }])
      
      if (!error) {
        loadArticles()
        resetForm()
      }
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return
    
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)
    
    if (!error) {
      loadArticles()
    }
  }

  const handleEdit = (article: any) => {
    setEditingArticle(article)
    setFormData({
      name: article.name,
      description: article.description || '',
      unit_price: article.unit_price.toString(),
      tva_rate: article.tva_rate.toString(),
      unit: article.unit
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      unit_price: '',
      tva_rate: '20',
      unit: 'unité'
    })
    setEditingArticle(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Catalogue d'articles</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2" size={20} />
          Nouvel article
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nom *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Prix unitaire HT *"
                type="number"
                step="0.01"
                value={formData.unit_price}
                onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                required
              />
              <Input
                label="TVA (%)"
                type="number"
                step="0.01"
                value={formData.tva_rate}
                onChange={(e) => setFormData({ ...formData, tva_rate: e.target.value })}
                required
              />
              <Input
                label="Unité"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit">
                {editingArticle ? 'Mettre à jour' : 'Créer'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Aucun article pour le moment</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Prix HT</TableHead>
                <TableHead>TVA</TableHead>
                <TableHead>Unité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map(article => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.name}</TableCell>
                  <TableCell>{article.description || '-'}</TableCell>
                  <TableCell>{article.unit_price.toFixed(2)} €</TableCell>
                  <TableCell>{article.tva_rate}%</TableCell>
                  <TableCell>{article.unit}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(article)}>
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(article.id)}>
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
EOFARTICLES

echo "✅ Articles module created"

# Commit et push
cd /home/ubuntu/facturation-nextjs
git add .
git commit -m "feat: Add functional modules (Clients + Articles with full CRUD)"
git push origin master

echo "✅ All modules created and pushed!"
