'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Users, FileText, FileCheck, 
  Package, Clock, TrendingUp, Calculator, 
  Bell, Settings, LogOut 
} from 'lucide-react'
import { createClient } from '@/lib/supabase-client'

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/clients', icon: Users, label: 'Clients' },
  { href: '/factures', icon: FileText, label: 'Factures' },
  { href: '/devis', icon: FileCheck, label: 'Devis' },
  { href: '/articles', icon: Package, label: 'Articles' },
  { href: '/timetracking', icon: Clock, label: 'Timetracking' },
  { href: '/tresorerie', icon: TrendingUp, label: 'Trésorerie' },
  { href: '/urssaf', icon: Calculator, label: 'URSSAF' },
  { href: '/relances', icon: Bell, label: 'Relances' },
  { href: '/parametres', icon: Settings, label: 'Paramètres' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }
  
  return (
    <div className="w-64 bg-indigo-900 text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Facturation Pro</h1>
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="pt-4 border-t border-indigo-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-800 w-full transition-colors"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  )
}
