// Shared destination coordinates — single source of truth
// Used by plan page + companion app + generate-itinerary API.

export const DESTINATION_COORDS: Record<string, { lat: number; lng: number; label: string }> = {
  'kuala-lumpur': { lat: 3.1390, lng: 101.6869, label: 'Kuala Lumpur' },
  'penang': { lat: 5.4141, lng: 100.3288, label: 'Penang' },
  'langkawi': { lat: 6.3500, lng: 99.8000, label: 'Langkawi' },
  'malacca': { lat: 2.1896, lng: 102.2501, label: 'Malacca' },
  'cameron-highlands': { lat: 4.4710, lng: 101.3814, label: 'Cameron Highlands' },
  'kota-kinabalu': { lat: 5.9788, lng: 116.0753, label: 'Kota Kinabalu' },
  'sandakan': { lat: 5.8456, lng: 118.1184, label: 'Sandakan' },
  'kuching': { lat: 1.5497, lng: 110.3592, label: 'Kuching' },
  'mulu': { lat: 4.0497, lng: 114.8187, label: 'Mulu' },
  'tioman-island': { lat: 2.8333, lng: 104.1667, label: 'Tioman Island' },
  'perhentian-islands': { lat: 5.9090, lng: 102.7406, label: 'Perhentian Islands' },
  'taman-negara': { lat: 4.4333, lng: 102.2500, label: 'Taman Negara' },
  'ipoh': { lat: 4.5975, lng: 101.0901, label: 'Ipoh' },
  'george-town': { lat: 5.4145, lng: 100.3292, label: 'George Town' },
  'johor-bahru': { lat: 1.4927, lng: 103.7414, label: 'Johor Bahru' },
};

// Map center for Malaysia
export const MAP_CENTER = { lat: 4.2, lng: 109.5 };
