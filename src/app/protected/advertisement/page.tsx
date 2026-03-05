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

  const angebote = ads.filter((ad) => ad.type === 'offer')
  const gesuche = ads.filter((ad) => ad.type === 'request')


  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await fetch("/api/my-advertisements");
        const data = await res.json();

        const mapped = data.map((ad: any) => ({
          id: ad.advertisement_id,
          title: ad.title,
          description: ad.description,
          type: ad.typ,
        }));

        setAds(mapped);
      } catch (err) {
        console.error("Loading error:", err);
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
    <div className="max-w-7xl mx-auto m-0 p-4 space-y-10">
      <h1 className="text-xl text-center font-semibold text-gray-800 bg-white/15 backdrop-blur-md rounded-2xl p-2">My Board Postings</h1>

      {/* Angebote */}
      <section className="bg-white/15 backdrop-blur rounded-2xl shadow-md p-6">
        <h2 className="text-lg text-center font-semibold text-gray-800 mb-4 backdrop-blur-md rounded-2xl p-2">My OFFERS</h2>

        {angebote.length === 0 ? (
          <p className="text-md text-gray-600">No offers available</p>
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
      <section className="bg-white/15 backdrop-blur rounded-2xl shadow-md p-6">
        <h2 className="text-lg text-center font-semibold text-gray-800 mb-4 backdrop-blur-md rounded-2xl p-2">MY REQUESTS</h2>

        {gesuche.length === 0 ? (
          <p className="text-md text-gray-600">No requests available</p>
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
          onSave={async (updatedAd) => {
            try {
              const res = await fetch("/api/my-advertisements", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: updatedAd.id,
                  title: updatedAd.title,
                  description: updatedAd.description,
                }),
              });

              if (!res.ok) throw new Error("Update error");

              const saved = await res.json();

              setAds(prev =>
                prev.map(ad =>
                  ad.id === saved.advertisement_id
                    ? {
                      id: saved.advertisement_id,
                      title: saved.title,
                      description: saved.description,
                      type: saved.typ,
                    }
                    : ad
                )
              );

            } catch (err) {
              console.error("Update error:", err);
            } finally {
              setEditingAd(null);
            }
          }}
        />
      )}

      {/* delete popup */}
      {adToDelete && (
        <DeleteAdvertisementPopup
          title={adToDelete.title}
          onClose={() => setAdToDelete(null)}
          onConfirm={async () => {
            if (!adToDelete) return;

            try {
              const res = await fetch("/api/my-advertisements", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: adToDelete.id }),
              });

              if (!res.ok) throw new Error("Delete error");


              setAds(prev =>
                prev.filter(ad => ad.id !== adToDelete.id)
              );

            } catch (err) {
              console.error("Delete error:", err);
            } finally {
              setAdToDelete(null);
            }
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
    <div className="rounded-lg p-4 flex justify-between items-start shadow-sm">
      <div>
        <p className="font-semibold text-gray-800 mb-1">{ad.title}</p>
        <p className="text-md text-gray-800">{ad.description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="w-36 p-2 rounded-xl bg-brand-mint/10 backdrop-blur-md text-gray-700 font-semibold text-md shadow-lg border border-brand-mint/40 hover:bg-brand-mint/60 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(ad)}
          className="w-36 p-2 rounded-xl bg-brand-pink/10 backdrop-blur-md text-gray-700 font-semibold text-md shadow-lg border border-brand-pink/40 hover:bg-brand-pink/60 hover:border-brand-pink hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
