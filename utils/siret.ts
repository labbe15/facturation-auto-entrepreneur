export async function fetchCompanyBySIRET(siret: string) {
  // Valider le format SIRET (14 chiffres)
  if (!/^\d{14}$/.test(siret)) {
    throw new Error('Format SIRET invalide (14 chiffres requis)')
  }

  try {
    // Essayer l'API officielle data.gouv.fr
    const response = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${siret}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        const company = data.results[0]
        const siren = siret.substring(0, 9)
        const tvaKey = (12 + 3 * (parseInt(siren) % 97)) % 97
        const tvaNumber = `FR${tvaKey.toString().padStart(2, '0')}${siren}`
        
        return {
          name: company.nom_complet || company.nom_raison_sociale || '',
          address: company.siege?.adresse || '',
          city: company.siege?.libelle_commune || '',
          postal_code: company.siege?.code_postal || '',
          tva_number: tvaNumber
        }
      }
    }

    // Si l'API principale échoue, générer des données basiques
    const siren = siret.substring(0, 9)
    const tvaKey = (12 + 3 * (parseInt(siren) % 97)) % 97
    const tvaNumber = `FR${tvaKey.toString().padStart(2, '0')}${siren}`
    
    return {
      name: `Entreprise ${siret}`,
      address: '',
      city: '',
      postal_code: '',
      tva_number: tvaNumber
    }
  } catch (error) {
    // En cas d'erreur, retourner au moins le numéro de TVA calculé
    const siren = siret.substring(0, 9)
    const tvaKey = (12 + 3 * (parseInt(siren) % 97)) % 97
    const tvaNumber = `FR${tvaKey.toString().padStart(2, '0')}${siren}`
    
    return {
      name: `Entreprise ${siret}`,
      address: '',
      city: '',
      postal_code: '',
      tva_number: tvaNumber
    }
  }
}
