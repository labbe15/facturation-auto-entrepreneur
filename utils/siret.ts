export async function fetchCompanyBySIRET(siret: string) {
  try {
    const response = await fetch(
      `https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/${siret}`
    )
    
    if (!response.ok) {
      throw new Error('SIRET non trouvé')
    }
    
    const data = await response.json()
    const etablissement = data.etablissement
    
    const siren = siret.substring(0, 9)
    const tvaKey = (12 + 3 * (parseInt(siren) % 97)) % 97
    const tvaNumber = `FR${tvaKey.toString().padStart(2, '0')}${siren}`
    
    return {
      name: etablissement.unite_legale?.denomination || 
            etablissement.unite_legale?.nom_raison_sociale || '',
      address: `${etablissement.adresse.numero_voie || ''} ${etablissement.adresse.type_voie || ''} ${etablissement.adresse.libelle_voie || ''}`.trim(),
      city: etablissement.adresse.libelle_commune || '',
      postal_code: etablissement.adresse.code_postal || '',
      tva_number: tvaNumber
    }
  } catch (error) {
    throw new Error('Impossible de récupérer les informations SIRET')
  }
}
