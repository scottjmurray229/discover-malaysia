import type { TripData, TripDay, Activity, WeatherDay, Contact, GroupMember, Notification, ChangeLogEntry } from './companion-shared';

// API response types (from generate-itinerary.ts)
interface ApiDayItem {
  time: string;
  description: string;
  priceMyr?: number;
  priceUsd?: number;
  category: 'transport' | 'accommodation' | 'activity' | 'food' | 'ferry';
  affiliateType?: 'hotel' | 'tour' | 'transport' | null;
  affiliateSlotId?: string;
  locationName?: string;
  lat?: number;
  lng?: number;
}

interface ApiDay {
  dayNumber: number;
  title: string;
  destination: string;
  items: ApiDayItem[];
}

export interface ApiItinerary {
  title: string;
  subtitle: string;
  totalBudget: { php: number; usd: number };
  days: ApiDay[];
}

// Category → Activity type mapping
function mapCategory(category: ApiDayItem['category']): Activity['type'] {
  if (category === 'ferry') return 'transport';
  return category;
}

// Category → emoji icon
const CATEGORY_ICON_MAP: Record<string, string> = {
  transport: '🚐',
  ferry: '⛴️',
  accommodation: '🏨',
  activity: '🎯',
  food: '🍽️',
};

function getIcon(category: string, description: string): string {
  const lower = description.toLowerCase();
  // Try to match more specific icons from the description
  if (lower.includes('flight') || lower.includes('fly') || lower.includes('airport')) return '✈️';
  if (lower.includes('ferry') || category === 'ferry') return '⛴️';
  if (lower.includes('snorkel')) return '🤿';
  if (lower.includes('surf')) return '🏄';
  if (lower.includes('dive') || lower.includes('diving')) return '🤿';
  if (lower.includes('beach')) return '🏖️';
  if (lower.includes('hike') || lower.includes('trek')) return '🥾';
  if (lower.includes('waterfall') || lower.includes('falls')) return '💧';
  if (lower.includes('kayak') || lower.includes('paddle')) return '🛶';
  if (lower.includes('island hop')) return '⛵';
  if (lower.includes('lagoon') || lower.includes('lake')) return '🏞️';
  if (lower.includes('sunset')) return '🌅';
  if (lower.includes('sunrise')) return '☀️';
  if (lower.includes('market')) return '🛒';
  if (lower.includes('museum') || lower.includes('church') || lower.includes('heritage')) return '🏛️';
  if (lower.includes('check in') || lower.includes('check-in') || lower.includes('hotel') || lower.includes('resort')) return '🏨';
  if (lower.includes('breakfast')) return '🥞';
  if (lower.includes('lunch')) return '🍚';
  if (lower.includes('dinner')) return '🍽️';
  if (lower.includes('street food')) return '🍢';
  if (lower.includes('coffee') || lower.includes('cafe')) return '☕';
  if (lower.includes('van') || lower.includes('bus') || lower.includes('transfer')) return '🚐';
  if (lower.includes('tricycle') || lower.includes('trike')) return '🛺';
  if (lower.includes('motorcycle') || lower.includes('scooter')) return '🏍️';
  return CATEGORY_ICON_MAP[category] || '📍';
}

// Split description into title (short) + detail (full)
function splitDescription(description: string, priceMyr?: number, priceUsd?: number): { title: string; detail: string } {
  // Try splitting on first sentence
  const sentenceEnd = description.match(/^(.+?[.!])(\s|$)/);
  let title: string;
  let detail: string;

  if (sentenceEnd && sentenceEnd[1].length <= 60) {
    title = sentenceEnd[1].replace(/\.$/, '');
    detail = description;
  } else {
    // Take first 60 chars at a word boundary
    if (description.length <= 60) {
      title = description;
      detail = description;
    } else {
      const truncated = description.substring(0, 60);
      const lastSpace = truncated.lastIndexOf(' ');
      title = (lastSpace > 20 ? truncated.substring(0, lastSpace) : truncated).replace(/[.,;:!]$/, '');
      detail = description;
    }
  }

  // Append prices to detail if available
  if (priceMyr && priceUsd) {
    detail += ` (RM${priceMyr.toLocaleString()} / $${priceUsd})`;
  }

  return { title, detail };
}

// Capitalize destination slug to display name
function capitalizeDestination(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate placeholder dates starting 30 days from now
function generateDates(numDays: number): string {
  const start = new Date();
  start.setDate(start.getDate() + 30);
  const end = new Date(start);
  end.setDate(end.getDate() + numDays - 1);

  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

// Generate day-of-week abbreviations for weather
function generateWeather(numDays: number): WeatherDay[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const start = new Date();
  start.setDate(start.getDate() + 30);

  return Array.from({ length: numDays }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return {
      day: days[d.getDay()],
      icon: '☀️',
      high: 31 + Math.floor(Math.random() * 3),
      low: 24 + Math.floor(Math.random() * 2),
      rain: Math.floor(Math.random() * 20),
    };
  });
}

// Generate date label for a day
function generateDayDate(dayNumber: number): string {
  const start = new Date();
  start.setDate(start.getDate() + 30 + dayNumber - 1);
  return start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function transformItinerary(apiItinerary: ApiItinerary): TripData {
  // Build subtitle from API or generate one
  const destinations = [...new Set(apiItinerary.days.map(d => capitalizeDestination(d.destination)))];
  const subtitle = destinations.join(' → ');

  const days: TripDay[] = apiItinerary.days.map((apiDay) => ({
    day: apiDay.dayNumber,
    date: generateDayDate(apiDay.dayNumber),
    title: apiDay.title,
    location: capitalizeDestination(apiDay.destination),
    items: apiDay.items.map((item, idx): Activity => {
      const { title, detail } = splitDescription(item.description, item.priceMyr, item.priceUsd);
      return {
        id: `d${apiDay.dayNumber}-${idx + 1}`,
        time: item.time,
        icon: getIcon(item.category, item.description),
        type: mapCategory(item.category),
        title,
        detail,
        status: 'confirmed',
        ...(item.lat != null && item.lng != null ? { lat: item.lat, lng: item.lng } : {}),
      };
    }),
  }));

  const numDays = apiItinerary.days.length;

  const contacts: Contact[] = [
    { icon: '🚨', name: 'Philippine Emergency', role: 'Emergency Services', phone: '911' },
    { icon: '🏥', name: 'Philippine Red Cross', role: 'Nationwide', phone: '143' },
  ];

  const group: GroupMember[] = [
    { id: 'you', name: 'You', avatar: '🧑', role: 'host', color: '#0D7377' },
  ];

  const totalActivities = days.reduce((sum, d) => sum + d.items.length, 0);

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'enriched',
      text: `Your ${numDays}-day itinerary is ready! ${totalActivities} activities across ${destinations.length} destination${destinations.length > 1 ? 's' : ''}.`,
      time: 'Just now',
      read: false,
    },
  ];

  const changeLog: ChangeLogEntry[] = [];

  return {
    name: apiItinerary.title,
    subtitle,
    dates: generateDates(numDays),
    days,
    weather: generateWeather(numDays),
    contacts,
    group,
    notifications,
    changeLog,
  };
}
