export function calculateTotals(items: Array<{
  quantity: number
  unit_price: number
  tva_rate: number
}>) {
  let totalHT = 0
  let totalTVA = 0

  items.forEach(item => {
    const ht = item.quantity * item.unit_price
    const tva = (ht * item.tva_rate) / 100
    totalHT += ht
    totalTVA += tva
  })

  const totalTTC = totalHT + totalTVA

  return {
    totalHT: Number(totalHT.toFixed(2)),
    totalTVA: Number(totalTVA.toFixed(2)),
    totalTTC: Number(totalTTC.toFixed(2))
  }
}

export function calculateURSSAF(revenue: number, regime: 'BIC' | 'BNC', hasACRE: boolean) {
  const rate = hasACRE ? 0.11 : 0.22
  return Number((revenue * rate).toFixed(2))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('fr-FR')
}
