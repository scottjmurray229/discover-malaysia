/**
 * Shared video map for destination cards.
 * Maps destination slugs to video file paths (preview preferred, hero as fallback).
 * Used by: src/pages/index.astro, src/pages/destinations/index.astro
 */
export const destinationVideoMap: Record<string, { preview: string; hero: string }> = {
  'kuala-lumpur': { preview: '', hero: '' },
  'penang': { preview: '', hero: '' },
  'langkawi': { preview: '', hero: '' },
  'malacca': { preview: '', hero: '' },
  'cameron-highlands': { preview: '', hero: '' },
  'kota-kinabalu': { preview: '', hero: '' },
  'sandakan': { preview: '', hero: '' },
  'kuching': { preview: '', hero: '' },
  'mulu': { preview: '', hero: '' },
  'tioman-island': { preview: '', hero: '' },
  'perhentian-islands': { preview: '', hero: '' },
  'taman-negara': { preview: '', hero: '' },
  'ipoh': { preview: '', hero: '' },
  'george-town': { preview: '', hero: '' },
  'johor-bahru': { preview: '', hero: '' },
} as const;
