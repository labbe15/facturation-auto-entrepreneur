export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Facturation Pro</h1>
        <p className="text-xl mb-8">Application de facturation pour auto-entrepreneurs</p>
        <div className="space-x-4">
          <a href="/login" className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100">
            Connexion
          </a>
          <a href="/signup" className="px-6 py-3 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800">
            Inscription
          </a>
        </div>
      </div>
    </div>
  )
}
