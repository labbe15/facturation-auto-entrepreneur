import { NextRequest, NextResponse } from 'next/server'
import { fetchCompanyBySIRET } from '@/utils/siret'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const siret = searchParams.get('siret')

  if (!siret) {
    return NextResponse.json({ error: 'SIRET manquant' }, { status: 400 })
  }

  try {
    const data = await fetchCompanyBySIRET(siret)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'SIRET non trouvé' }, { status: 404 })
  }
}
