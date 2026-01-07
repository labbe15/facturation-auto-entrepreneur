-- Activer les extensions nécessaires
create extension if not exists "uuid-ossp";

-- Table des utilisateurs (gérée par Supabase Auth)
-- auth.users est déjà créée par Supabase

-- Table des profils utilisateurs
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table des paramètres d'entreprise
create table public.company_settings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  company_name text,
  siret text,
  tva_number text,
  address text,
  city text,
  postal_code text,
  country text default 'France',
  email text,
  phone text,
  logo_url text,
  primary_color text default '#4F46E5',
  secondary_color text default '#10B981',
  legal_mentions text,
  invoice_prefix text default 'FA',
  quote_prefix text default 'DE',
  default_tva_rate decimal(5,2) default 20.00,
  payment_terms_days integer default 30,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Table des clients
create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  email text,
  phone text,
  address text,
  city text,
  postal_code text,
  country text default 'France',
  siret text,
  tva_number text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table des articles
create table public.articles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  description text,
  unit_price decimal(10,2) not null,
  tva_rate decimal(5,2) default 20.00,
  unit text default 'unité',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table des factures
create table public.invoices (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  client_id uuid references public.clients on delete restrict not null,
  invoice_number text not null,
  issue_date date not null,
  due_date date not null,
  status text not null check (status in ('draft', 'sent', 'paid', 'overdue')),
  total_ht decimal(10,2) not null default 0,
  total_tva decimal(10,2) not null default 0,
  total_ttc decimal(10,2) not null default 0,
  deposit_amount decimal(10,2) default 0,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, invoice_number)
);

-- Table des lignes de facture
create table public.invoice_items (
  id uuid default uuid_generate_v4() primary key,
  invoice_id uuid references public.invoices on delete cascade not null,
  description text not null,
  quantity decimal(10,2) not null,
  unit_price decimal(10,2) not null,
  tva_rate decimal(5,2) not null,
  total_ht decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table des devis
create table public.quotes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  client_id uuid references public.clients on delete restrict not null,
  quote_number text not null,
  issue_date date not null,
  valid_until date not null,
  status text not null check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  total_ht decimal(10,2) not null default 0,
  total_tva decimal(10,2) not null default 0,
  total_ttc decimal(10,2) not null default 0,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, quote_number)
);

-- Table des lignes de devis
create table public.quote_items (
  id uuid default uuid_generate_v4() primary key,
  quote_id uuid references public.quotes on delete cascade not null,
  description text not null,
  quantity decimal(10,2) not null,
  unit_price decimal(10,2) not null,
  tva_rate decimal(5,2) not null,
  total_ht decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table du timetracking
create table public.time_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  client_id uuid references public.clients on delete set null,
  description text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  duration_seconds integer,
  hourly_rate decimal(10,2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table de la trésorerie
create table public.treasury_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  amount decimal(10,2) not null,
  date date not null,
  description text,
  invoice_id uuid references public.invoices on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table des relances
create table public.reminders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  invoice_id uuid references public.invoices on delete cascade not null,
  reminder_type text not null check (reminder_type in ('reminder_1', 'reminder_2', 'reminder_3', 'final_notice')),
  sent_at timestamp with time zone not null,
  email_subject text,
  email_body text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Configuration SMTP
create table public.smtp_settings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  host text not null,
  port integer not null,
  secure boolean default true,
  username text not null,
  password_encrypted text not null,
  from_email text not null,
  from_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Indexes pour améliorer les performances
create index idx_clients_user_id on public.clients(user_id);
create index idx_articles_user_id on public.articles(user_id);
create index idx_invoices_user_id on public.invoices(user_id);
create index idx_invoices_client_id on public.invoices(client_id);
create index idx_invoices_status on public.invoices(status);
create index idx_invoice_items_invoice_id on public.invoice_items(invoice_id);
create index idx_quotes_user_id on public.quotes(user_id);
create index idx_quotes_client_id on public.quotes(client_id);
create index idx_quote_items_quote_id on public.quote_items(quote_id);
create index idx_time_entries_user_id on public.time_entries(user_id);
create index idx_treasury_entries_user_id on public.treasury_entries(user_id);
create index idx_reminders_user_id on public.reminders(user_id);
create index idx_reminders_invoice_id on public.reminders(invoice_id);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.company_settings enable row level security;
alter table public.clients enable row level security;
alter table public.articles enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.time_entries enable row level security;
alter table public.treasury_entries enable row level security;
alter table public.reminders enable row level security;
alter table public.smtp_settings enable row level security;

-- Policies RLS
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own company settings" on public.company_settings for select using (auth.uid() = user_id);
create policy "Users can insert own company settings" on public.company_settings for insert with check (auth.uid() = user_id);
create policy "Users can update own company settings" on public.company_settings for update using (auth.uid() = user_id);

create policy "Users can view own clients" on public.clients for select using (auth.uid() = user_id);
create policy "Users can insert own clients" on public.clients for insert with check (auth.uid() = user_id);
create policy "Users can update own clients" on public.clients for update using (auth.uid() = user_id);
create policy "Users can delete own clients" on public.clients for delete using (auth.uid() = user_id);

create policy "Users can view own articles" on public.articles for select using (auth.uid() = user_id);
create policy "Users can insert own articles" on public.articles for insert with check (auth.uid() = user_id);
create policy "Users can update own articles" on public.articles for update using (auth.uid() = user_id);
create policy "Users can delete own articles" on public.articles for delete using (auth.uid() = user_id);

create policy "Users can view own invoices" on public.invoices for select using (auth.uid() = user_id);
create policy "Users can insert own invoices" on public.invoices for insert with check (auth.uid() = user_id);
create policy "Users can update own invoices" on public.invoices for update using (auth.uid() = user_id);
create policy "Users can delete own invoices" on public.invoices for delete using (auth.uid() = user_id);

create policy "Users can view invoice items" on public.invoice_items for select using (
  exists (select 1 from public.invoices where invoices.id = invoice_items.invoice_id and invoices.user_id = auth.uid())
);
create policy "Users can insert invoice items" on public.invoice_items for insert with check (
  exists (select 1 from public.invoices where invoices.id = invoice_items.invoice_id and invoices.user_id = auth.uid())
);
create policy "Users can update invoice items" on public.invoice_items for update using (
  exists (select 1 from public.invoices where invoices.id = invoice_items.invoice_id and invoices.user_id = auth.uid())
);
create policy "Users can delete invoice items" on public.invoice_items for delete using (
  exists (select 1 from public.invoices where invoices.id = invoice_items.invoice_id and invoices.user_id = auth.uid())
);

create policy "Users can view own quotes" on public.quotes for select using (auth.uid() = user_id);
create policy "Users can insert own quotes" on public.quotes for insert with check (auth.uid() = user_id);
create policy "Users can update own quotes" on public.quotes for update using (auth.uid() = user_id);
create policy "Users can delete own quotes" on public.quotes for delete using (auth.uid() = user_id);

create policy "Users can view quote items" on public.quote_items for select using (
  exists (select 1 from public.quotes where quotes.id = quote_items.quote_id and quotes.user_id = auth.uid())
);
create policy "Users can insert quote items" on public.quote_items for insert with check (
  exists (select 1 from public.quotes where quotes.id = quote_items.quote_id and quotes.user_id = auth.uid())
);
create policy "Users can update quote items" on public.quote_items for update using (
  exists (select 1 from public.quotes where quotes.id = quote_items.quote_id and quotes.user_id = auth.uid())
);
create policy "Users can delete quote items" on public.quote_items for delete using (
  exists (select 1 from public.quotes where quotes.id = quote_items.quote_id and quotes.user_id = auth.uid())
);

create policy "Users can view own time entries" on public.time_entries for select using (auth.uid() = user_id);
create policy "Users can insert own time entries" on public.time_entries for insert with check (auth.uid() = user_id);
create policy "Users can update own time entries" on public.time_entries for update using (auth.uid() = user_id);
create policy "Users can delete own time entries" on public.time_entries for delete using (auth.uid() = user_id);

create policy "Users can view own treasury entries" on public.treasury_entries for select using (auth.uid() = user_id);
create policy "Users can insert own treasury entries" on public.treasury_entries for insert with check (auth.uid() = user_id);
create policy "Users can update own treasury entries" on public.treasury_entries for update using (auth.uid() = user_id);
create policy "Users can delete own treasury entries" on public.treasury_entries for delete using (auth.uid() = user_id);

create policy "Users can view own reminders" on public.reminders for select using (auth.uid() = user_id);
create policy "Users can insert own reminders" on public.reminders for insert with check (auth.uid() = user_id);

create policy "Users can view own smtp settings" on public.smtp_settings for select using (auth.uid() = user_id);
create policy "Users can insert own smtp settings" on public.smtp_settings for insert with check (auth.uid() = user_id);
create policy "Users can update own smtp settings" on public.smtp_settings for update using (auth.uid() = user_id);

-- Fonctions et triggers pour updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.profiles for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.company_settings for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.clients for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.articles for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.invoices for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.quotes for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.time_entries for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.treasury_entries for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.smtp_settings for each row execute function public.handle_updated_at();
