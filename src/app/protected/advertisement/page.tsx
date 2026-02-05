'use client'

const testAds = [
  {
    id: '1',
    title: 'React Nachhilfe',
    description: 'Ich biete Hilfe bei React & TypeScript',
    type: 'ANGEBOT',
  },
  {
    id: '2',
    title: 'Deutsch lernen',
    description: 'Suche Deutschlehrer',
    type: 'GESUCH',
  },
    {
    id: '3',
    title: 'Englisch lernen',
    description: 'Suche Englischlehrer',
    type: 'GESUCH',
  },
]



export default function AdvertisementPage() {
  const angebote = testAds.filter((ad) => ad.type === 'ANGEBOT')
  const gesuche = testAds.filter((ad) => ad.type === 'GESUCH')

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 space-y-10">
      <h1 className="text-2xl font-bold">Meine Anzeigen</h1>

      {/* ANGEBOTE */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Angebote</h2>

        {angebote.length === 0 ? (
          <p className="text-sm text-gray-500">Keine Angebote</p>
        ) : (
          <div className="space-y-4">
            {angebote.map((ad) => (
              <AnzeigeItem
                key={ad.id}
                title={ad.title}
                description={ad.description}
              />
            ))}
          </div>
        )}
      </section>

      {/* GESUCHE */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Gesuche</h2>

        {gesuche.length === 0 ? (
          <p className="text-sm text-gray-500">Keine Gesuche</p>
        ) : (
          <div className="space-y-4">
            {gesuche.map((ad) => (
              <AnzeigeItem
                key={ad.id}
                title={ad.title}
                description={ad.description}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}



function AnzeigeItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-start">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
          Edit
        </button>
        <button className="px-3 py-1 border rounded text-sm text-red-600 hover:bg-red-50">
          Delete
        </button>
      </div>
    </div>
  )
}
