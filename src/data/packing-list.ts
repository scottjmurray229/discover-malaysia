// packing-list.ts — Malaysia-specific packing config
// Merges with packing-base.ts universal items at runtime

import type { PackingItem, PackingConfig, GearRecommendation } from './packing-base';

// ─────────────────────────────────────────────────────────────────────────────
// MALAYSIA DESTINATION ESSENTIALS (unique to this country)
// ─────────────────────────────────────────────────────────────────────────────
export const MALAYSIA_ESSENTIALS: PackingItem[] = [
  {
    id: 'my-sunscreen',
    name: 'Reef-Safe Mineral Sunscreen',
    category: 'destination',
    description: 'Marine parks at Perhentian Islands and Tioman enforce reef-safe rules. Zinc oxide only for snorkeling and diving — protect coral that took centuries to form.',
    essential: true,
    climate: ['tropical', 'coastal'],
    amazonSearchFallback: 'reef+safe+mineral+sunscreen+zinc+oxide',
    affiliatePrice: '$12–22',
    localAlternative: 'Available in KL malls but expensive and limited selection — bring from home',
  },
  {
    id: 'my-drybag',
    name: 'Waterproof Dry Bag (20L)',
    category: 'destination',
    description: 'Island hopping at Langkawi, Perhentians, and Tioman means everything goes in open speedboats. One wave and your camera and passport are done.',
    essential: true,
    climate: ['tropical', 'coastal'],
    amazonSearchFallback: 'dry+bag+20l+waterproof+island+hopping',
    affiliatePrice: '$18–35',
    localAlternative: 'Available at outdoor shops in KL but quality varies',
  },
  {
    id: 'my-mosquitorepellent',
    name: 'DEET Insect Repellent (30%+)',
    category: 'destination',
    description: 'Dengue and malaria risk in jungle areas (Taman Negara, Borneo). DEET 30%+ is the gold standard. Natural alternatives with citronella do not work in Malaysian humidity.',
    essential: true,
    climate: ['tropical', 'jungle'],
    amazonSearchFallback: 'deet+30+percent+insect+repellent+spray',
    affiliatePrice: '$8–15',
    localAlternative: 'Available at all pharmacies (Watson\'s, Guardian) throughout Malaysia',
  },
  {
    id: 'my-modestclothing',
    name: 'Modest Clothing for Mosques and Temples',
    category: 'destination',
    description: 'Malaysia is majority Muslim. Mosques require covered arms and legs, and many provide sarongs at the entrance — but it\'s respectful to dress appropriately from the start. Buddhist and Hindu temples have similar requirements.',
    essential: true,
    climate: ['tropical'],
    amazonSearchFallback: 'lightweight+linen+pants+travel',
    affiliatePrice: '$25–45',
    localAlternative: 'Sarongs and modest wraps widely available at markets for RM10-25',
  },
  {
    id: 'my-adapterg',
    name: 'Type G Power Adapter (British standard)',
    category: 'destination',
    description: 'Malaysia uses British-standard Type G plugs (three rectangular pins) at 240V/50Hz. American, European, and Australian plugs all need an adapter.',
    essential: true,
    climate: ['tropical'],
    amazonSearchFallback: 'type+g+power+adapter+uk+british+plug',
    affiliatePrice: '$10–18',
    localAlternative: 'Adapters available at KLIA and all major hotels for RM25-50',
  },
  {
    id: 'my-phrases',
    name: 'Bahasa Malaysia Phrase Card / App',
    category: 'destination',
    description: '"Terima kasih" (thank you), "Berapa harga?" (how much?), "Sedap" (delicious) — basic phrases earn enormous goodwill. English is widely spoken but a few words in Malay go a long way.',
    essential: false,
    localAlternative: 'Google Translate works well — download Malay offline pack',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GEAR WE RECOMMEND — Malaysia (4-6 curated items for GearRecommendations component)
// ─────────────────────────────────────────────────────────────────────────────
export const MALAYSIA_GEAR_RECOMMENDATIONS: GearRecommendation[] = [
  {
    id: 'gr-my-drybag',
    name: 'Dry Bag (20L)',
    reason: 'Island hopping at Langkawi and Perhentians means open speedboats in choppy water. A RM30 dry bag saves a RM3,000 camera. Non-negotiable.',
    amazonSearchFallback: 'dry+bag+20l+waterproof',
    affiliatePrice: '~$22',
  },
  {
    id: 'gr-my-repellent',
    name: 'DEET 30% Insect Repellent',
    reason: 'Dengue is real in Malaysia. Jungle trekking at Taman Negara or Borneo without DEET is a mistake. Apply at dawn and dusk especially.',
    amazonSearchFallback: 'deet+30+percent+insect+repellent',
    affiliatePrice: '~$9',
  },
  {
    id: 'gr-my-sunscreen',
    name: 'Reef-Safe Mineral Sunscreen',
    reason: 'The Perhentian Islands and Tioman enforce reef-safe rules at marine parks. Zinc oxide is required — chemical sunscreen will be confiscated.',
    amazonSearchFallback: 'reef+safe+mineral+sunscreen',
    affiliatePrice: '~$14',
  },
  {
    id: 'gr-my-towel',
    name: 'Quick-Dry Travel Towel',
    reason: 'Budget guesthouses and island bungalows often skip towels. A quick-dry microfiber towel is essential for beach days, jungle treks, and overnight island stays.',
    amazonSearchFallback: 'quick+dry+microfiber+travel+towel',
    affiliatePrice: '~$18',
  },
  {
    id: 'gr-my-adapterg',
    name: 'Type G Power Adapter',
    reason: 'Malaysia uses British three-pin plugs. Without an adapter, your devices are dead from check-in. Get one before you fly — KLIA charges a premium.',
    amazonSearchFallback: 'type+g+power+adapter+british+plug',
    affiliatePrice: '~$12',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MALAYSIA SITE CONFIG
// ─────────────────────────────────────────────────────────────────────────────
export const MALAYSIA_CONFIG: PackingConfig = {
  sitePrefix: 'dmy',
  destination: 'Malaysia',
  climate: ['tropical', 'coastal'],
  currency: 'MYR',
  plugType: 'Type G (British)',
  plugVoltage: '240V',
  affiliateTag: 'discoverphili-20',
  destinationEssentials: MALAYSIA_ESSENTIALS,
  gearRecommendations: MALAYSIA_GEAR_RECOMMENDATIONS,
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ ITEMS for packing-list.astro
// ─────────────────────────────────────────────────────────────────────────────
// Universal alias — copied to all sites, import SITE_CONFIG in PackingList.astro
export const SITE_CONFIG = MALAYSIA_CONFIG;

export const MALAYSIA_PACKING_FAQS = [
  {
    question: 'What should I pack for Malaysia?',
    answer: 'The essentials are a Type G power adapter (British standard, 240V), reef-safe sunscreen for the islands, DEET insect repellent for jungle areas and dengue prevention, a dry bag for island hopping speedboats, and modest clothing for mosque and temple visits. Our interactive checklist covers 60+ items across 7 categories, customized for Malaysia\'s tropical climate.',
  },
  {
    question: 'What power adapter do I need for Malaysia?',
    answer: 'Malaysia uses British-standard Type G plugs (three rectangular pins) at 240V/50Hz. American devices need both an adapter and a voltage converter unless they support 100-240V (check your device label — most modern phones, laptops, and cameras do). European and Australian devices also need a Type G adapter.',
  },
  {
    question: 'Do I need bug spray in Malaysia?',
    answer: 'Yes — especially for jungle trekking at Taman Negara, Borneo wildlife areas, or any rural region. Dengue fever is endemic in Malaysia with year-round transmission. Use DEET 30%+ on exposed skin, particularly at dawn and dusk. Malaria risk exists in remote Borneo areas (Sabah, Sarawak) — consult a travel doctor before those trips.',
  },
  {
    question: 'What should I wear in Malaysia?',
    answer: 'Lightweight, breathable clothing is the base. Carry at least one set of modest clothing (covered arms and legs) for mosque and temple visits — Malaysia is majority Muslim and has numerous beautiful mosques. For beach islands (Langkawi, Perhentians, Tioman), swimwear is fine on the beach but cover up in shops and restaurants.',
  },
  {
    question: 'How many outfits should I pack for Malaysia?',
    answer: 'For a 7-day trip: 4 lightweight shirts, 2-3 shorts, 1 pair of long pants (temples, mosques, nicer restaurants), 2 swimsuits. Laundry is cheap everywhere — RM5-8/kg for wash-and-fold, usually same day. For 14 days, pack the same and use laundry every 4-5 days.',
  },
  {
    question: 'Can I buy toiletries in Malaysia?',
    answer: 'Yes — Watson\'s and Guardian pharmacies are everywhere in Malaysia (even in smaller cities). Basic toiletries are cheap and plentiful. Bring your own reef-safe sunscreen (harder to find), any prescription medications, and DEET repellent in the strength you need. Everything else — buy locally and save luggage space.',
  },
];
