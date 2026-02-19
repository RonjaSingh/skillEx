'use client'

import { useState } from 'react'
import { useEffect } from "react";

import EditAdvertisementPopup, { Ad } from '@/components/editadvertisement-popup'
import DeleteAdvertisementPopup from '@/components/deleteadvertisement-popup'

export default function AdvertisementPage() {

  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)

  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [adToDelete, setAdToDelete] = useState<Ad | null>(null)

  const angebote = ads.filter((ad) => ad.type === 'ANGEBOT')
  const gesuche = ads.filter((ad) => ad.type === 'GESUCH')



  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await fetch("/api/my-advertisements");
        const data = await res.json();

        const mapped = data.map((ad: any) => ({
       id: ad.advertisment_id,
          title: ad.title,
          description: ad.description,
          type: ad.typ === "offer" ? "ANGEBOT" : "GESUCH",
        }));

        setAds(mapped);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAds();
  }, []);



  if (loading) {
    return <p className="text-center mt-10">Lade Anzeigen...</p>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 space-y-10">
      <h1 className="text-2xl font-bold">Meine Anzeigen</h1>

      {/* Angebote */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Angebote</h2>

        {angebote.length === 0 ? (
          <p className="text-sm text-gray-500">Keine Angebote</p>
        ) : (
          <div className="space-y-4">
            {angebote.map((ad) => (
              <Anzeige
                key={ad.id}
                ad={ad}
                onEdit={() => setEditingAd(ad)}
                onDelete={(ad) => setAdToDelete(ad)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Gesuche */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Gesuche</h2>

        {gesuche.length === 0 ? (
          <p className="text-sm text-gray-500">Keine Gesuche</p>
        ) : (
          <div className="space-y-4">
            {gesuche.map((ad) => (
              <Anzeige
                key={ad.id}
                ad={ad}
                onEdit={() => setEditingAd(ad)}
                onDelete={(ad) => setAdToDelete(ad)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Edit popup */}
      {editingAd && (
        <EditAdvertisementPopup
          ad={editingAd}
          onClose={() => setEditingAd(null)}
          onSave={(updatedAd) => {
            setAds((prev) =>
              prev.map((ad) =>
                ad.id === updatedAd.id ? updatedAd : ad
              )
            )
            setEditingAd(null)
          }}
        />
      )}

      {/* delete popup */}
      {adToDelete && (
        <DeleteAdvertisementPopup
          title={adToDelete.title}
          onClose={() => setAdToDelete(null)}
          onConfirm={() => {
            setAds((prev) =>
              prev.filter((ad) => ad.id !== adToDelete.id)
            )
            setAdToDelete(null)
          }}
        />
      )}
    </div>
  )
}

/* Anzeige */

function Anzeige({
  ad,
  onEdit,
  onDelete,
}: {
  ad: Ad
  onEdit: () => void
  onDelete: (ad: Ad) => void
}) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-start">
      <div>
        <p className="font-semibold">{ad.title}</p>
        <p className="text-sm text-gray-600">{ad.description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(ad)}
          className="px-3 py-1 border rounded text-sm text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
