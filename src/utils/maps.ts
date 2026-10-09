import { places } from '../data/places'
import type { LatLng } from './geo'
const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
export const hasKey = !!KEY
let loader: Promise<void> | null = null
/** Loads the Google Maps JavaScript API once. */
export function loadMaps(): Promise<void> {
  if (!KEY) return Promise.reject(new Error('Missing VITE_GOOGLE_MAPS_API_KEY'))
  return (loader ??= new Promise((ok, fail) => {
    const s = document.createElement('script')
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}`
    s.onload = () => ok()
    s.onerror = fail
    document.head.appendChild(s)
  }))
}
/** Travel duration text (e.g. "12 mins") from the Directions API. */
export async function route(
  from: LatLng,
  to: LatLng,
  mode: 'WALKING' | 'DRIVING' | 'TRANSIT',
): Promise<string | null> {
  try {
    await loadMaps()
    return await new Promise<string | null>((ok) =>
      new google.maps.DirectionsService().route(
        { origin: from, destination: to, travelMode: google.maps.TravelMode[mode] },
        (r, status) =>
          ok(status === 'OK' && r ? (r.routes[0].legs[0].duration?.text ?? null) : null),
      ),
    )
  } catch {
    return null
  }
}
/** Draws the map with a marker for each place and for the user. */
export async function showMap(el: HTMLElement, pos: LatLng | null, onPick: (id: string) => void) {
  await loadMaps()
  const map = new google.maps.Map(el, {
    center: pos ?? { lat: 50.3167, lng: 11.9167 },
    zoom: 14,
    streetViewControl: false,
    mapTypeControl: false,
  })
  for (const p of places)
    new google.maps.Marker({
      map,
      position: { lat: p.lat, lng: p.lng },
      title: p.name,
    }).addListener('click', () => onPick(p.id))
  if (pos)
    new google.maps.Marker({
      map,
      position: pos,
      title: 'You',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#1d6fe0',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
      },
    })
}
