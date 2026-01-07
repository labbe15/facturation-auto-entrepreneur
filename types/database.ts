export type Client = {
  id: string
  user_id: string
  name: string
  email?: string
  phone?: string
  address?: string
  city?: string
  postal_code?: string
  country?: string
  siret?: string
  tva_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export type Article = {
  id: string
  user_id: string
  name: string
  description?: string
  unit_price: number
  tva_rate: number
  unit?: string
  created_at: string
  updated_at: string
}

export type Invoice = {
  id: string
  user_id: string
  client_id: string
  invoice_number: string
  issue_date: string
  due_date: string
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  total_ht: number
  total_tva: number
  total_ttc: number
  deposit_amount?: number
  notes?: string
  created_at: string
  updated_at: string
}

export type InvoiceItem = {
  id: string
  invoice_id: string
  description: string
  quantity: number
  unit_price: number
  tva_rate: number
  total_ht: number
  created_at: string
}

export type Quote = {
  id: string
  user_id: string
  client_id: string
  quote_number: string
  issue_date: string
  valid_until: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
  total_ht: number
  total_tva: number
  total_ttc: number
  notes?: string
  created_at: string
  updated_at: string
}

export type CompanySettings = {
  id: string
  user_id: string
  company_name?: string
  siret?: string
  tva_number?: string
  address?: string
  city?: string
  postal_code?: string
  country?: string
  email?: string
  phone?: string
  logo_url?: string
  primary_color?: string
  secondary_color?: string
  legal_mentions?: string
  invoice_prefix?: string
  quote_prefix?: string
  default_tva_rate?: number
  payment_terms_days?: number
  created_at: string
  updated_at: string
}
