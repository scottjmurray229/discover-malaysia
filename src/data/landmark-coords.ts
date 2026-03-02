// Popular Philippine POI coordinates for itinerary geocoding.
// Keyed by lowercase normalized name. Covers top attractions at all 43 destinations.
// Used by generate-itinerary.ts to resolve activity coordinates without Geocoding API calls.

export const LANDMARK_COORDS: Record<string, { lat: number; lng: number }> = {
  // ── El Nido ──
  'nacpan beach': { lat: 11.2483, lng: 119.3867 },
  'el nido lio airport': { lat: 11.2024, lng: 119.4162 },
  'lio airport': { lat: 11.2024, lng: 119.4162 },
  'big lagoon': { lat: 11.1863, lng: 119.3241 },
  'small lagoon': { lat: 11.1875, lng: 119.3273 },
  'secret lagoon': { lat: 11.1608, lng: 119.3433 },
  'secret beach': { lat: 11.1267, lng: 119.3200 },
  'hidden beach': { lat: 11.1283, lng: 119.3317 },
  'shimizu island': { lat: 11.1700, lng: 119.3567 },
  'seven commandos beach': { lat: 11.1950, lng: 119.3833 },
  'helicopter island': { lat: 11.1317, lng: 119.3417 },
  'matinloc shrine': { lat: 11.1033, lng: 119.3217 },
  'las cabanas beach': { lat: 11.1700, lng: 119.3933 },
  'corong-corong beach': { lat: 11.1617, lng: 119.3917 },
  'el nido town': { lat: 11.1784, lng: 119.3930 },
  'hama street': { lat: 11.1785, lng: 119.3935 },
  'bacuit bay': { lat: 11.1700, lng: 119.3500 },

  // ── Coron ──
  'kayangan lake': { lat: 11.9942, lng: 120.2389 },
  'twin lagoon': { lat: 12.0105, lng: 120.1908 },
  'barracuda lake': { lat: 11.9967, lng: 120.2283 },
  'maquinit hot springs': { lat: 11.9814, lng: 120.2622 },
  'coron town': { lat: 12.0054, lng: 120.2027 },
  'cyc beach': { lat: 11.9617, lng: 120.2033 },
  'malcapuya island': { lat: 11.8583, lng: 120.0900 },
  'banana island': { lat: 11.8783, lng: 120.0617 },
  'bulog dos island': { lat: 11.9283, lng: 120.0500 },
  'coral garden coron': { lat: 11.9833, lng: 120.2100 },
  'mt tapyas': { lat: 12.0133, lng: 120.2100 },
  'busuanga airport': { lat: 12.1615, lng: 120.1000 },
  'francisco b reyes airport': { lat: 12.1615, lng: 120.1000 },

  // ── Cebu ──
  'kawasan falls': { lat: 9.8085, lng: 123.4256 },
  'oslob whale sharks': { lat: 9.4612, lng: 123.3815 },
  'tops lookout': { lat: 10.3436, lng: 123.8897 },
  'temple of leah': { lat: 10.3350, lng: 123.8783 },
  'mactan cebu international airport': { lat: 10.3075, lng: 123.9790 },
  'cebu airport': { lat: 10.3075, lng: 123.9790 },
  'magellan\'s cross': { lat: 10.2935, lng: 123.9020 },
  'basilica del santo nino': { lat: 10.2933, lng: 123.9017 },
  'carbon market': { lat: 10.2918, lng: 123.8990 },
  'cebu it park': { lat: 10.3300, lng: 123.9050 },
  'moalboal': { lat: 9.9500, lng: 123.3983 },
  'sardine run moalboal': { lat: 9.9450, lng: 123.3917 },
  'tumalog falls': { lat: 9.4508, lng: 123.3708 },
  'sumilon island': { lat: 9.4283, lng: 123.3867 },
  'sirao flower garden': { lat: 10.3633, lng: 123.8633 },
  'bantayan island': { lat: 11.1683, lng: 123.7267 },
  'camp sawi': { lat: 9.9483, lng: 123.3950 },

  // ── Bohol ──
  'chocolate hills': { lat: 9.7995, lng: 124.0108 },
  'tarsier sanctuary bohol': { lat: 9.7183, lng: 123.9583 },
  'loboc river': { lat: 9.6400, lng: 124.0283 },
  'alona beach': { lat: 9.5550, lng: 123.7833 },
  'balicasag island': { lat: 9.5167, lng: 123.6833 },
  'panglao island': { lat: 9.5667, lng: 123.7717 },
  'tagbilaran airport': { lat: 9.6643, lng: 123.8535 },
  'baclayon church': { lat: 9.6217, lng: 123.8917 },
  'hinagdanan cave': { lat: 9.5867, lng: 123.7917 },
  'man-made forest bohol': { lat: 9.7267, lng: 123.9617 },
  'can-umantad falls': { lat: 9.8117, lng: 124.1400 },

  // ── Boracay ──
  'white beach boracay': { lat: 11.9617, lng: 121.9183 },
  'station 1 boracay': { lat: 11.9750, lng: 121.9167 },
  'station 2 boracay': { lat: 11.9633, lng: 121.9183 },
  'station 3 boracay': { lat: 11.9517, lng: 121.9217 },
  'puka shell beach': { lat: 11.9917, lng: 121.9233 },
  'diniwid beach': { lat: 11.9817, lng: 121.9133 },
  'bulabog beach': { lat: 11.9633, lng: 121.9283 },
  'ariel\'s point': { lat: 11.8817, lng: 121.9067 },
  'crystal cove island': { lat: 11.9267, lng: 121.9133 },
  'caticlan jetty port': { lat: 11.9367, lng: 121.9550 },
  'caticlan airport': { lat: 11.9244, lng: 121.9541 },
  'd\'mall boracay': { lat: 11.9633, lng: 121.9200 },

  // ── Siargao ──
  'cloud 9': { lat: 9.8167, lng: 126.1317 },
  'cloud nine': { lat: 9.8167, lng: 126.1317 },
  'sugba lagoon': { lat: 9.9550, lng: 126.0217 },
  'magpupungko rock pools': { lat: 9.9267, lng: 126.1267 },
  'naked island siargao': { lat: 9.8617, lng: 126.1100 },
  'daku island': { lat: 9.8550, lng: 126.0933 },
  'guyam island': { lat: 9.8483, lng: 126.1133 },
  'sohoton cove': { lat: 9.9283, lng: 126.0517 },
  'tayangban cave pool': { lat: 9.9117, lng: 126.0683 },
  'general luna siargao': { lat: 9.8167, lng: 126.1183 },
  'sayak airport': { lat: 9.8586, lng: 126.0138 },

  // ── Siquijor ──
  'cambugahay falls': { lat: 9.1750, lng: 123.5283 },
  'salagdoong beach': { lat: 9.2100, lng: 123.5883 },
  'san juan siquijor': { lat: 9.1717, lng: 123.5050 },
  'paliton beach': { lat: 9.1950, lng: 123.4817 },
  'siquijor port': { lat: 9.2133, lng: 123.5117 },
  'old enchanted balete tree': { lat: 9.2067, lng: 123.5767 },
  'st francis of assisi church siquijor': { lat: 9.2133, lng: 123.5083 },

  // ── Dumaguete ──
  'dumaguete airport': { lat: 9.3337, lng: 123.3018 },
  'rizal boulevard dumaguete': { lat: 9.3050, lng: 123.3017 },
  'apo island': { lat: 9.0700, lng: 123.2717 },
  'siliman university': { lat: 9.3100, lng: 123.3083 },
  'dumaguete public market': { lat: 9.3067, lng: 123.3033 },

  // ── Palawan (Puerto Princesa) ──
  'puerto princesa underground river': { lat: 10.1683, lng: 118.9183 },
  'subterranean river': { lat: 10.1683, lng: 118.9183 },
  'honda bay': { lat: 9.8583, lng: 118.7517 },
  'baker\'s hill': { lat: 9.7533, lng: 118.7517 },
  'puerto princesa airport': { lat: 9.7422, lng: 118.7590 },

  // ── Manila ──
  'intramuros': { lat: 14.5890, lng: 120.9747 },
  'fort santiago': { lat: 14.5953, lng: 120.9717 },
  'rizal park': { lat: 14.5831, lng: 120.9794 },
  'manila ocean park': { lat: 14.5793, lng: 120.9896 },
  'binondo chinatown': { lat: 14.6000, lng: 120.9750 },
  'san agustin church': { lat: 14.5883, lng: 120.9750 },
  'national museum of fine arts': { lat: 14.5850, lng: 120.9783 },
  'ninoy aquino international airport': { lat: 14.5086, lng: 121.0197 },
  'naia': { lat: 14.5086, lng: 121.0197 },
  'manila airport': { lat: 14.5086, lng: 121.0197 },
  'bgc': { lat: 14.5508, lng: 121.0500 },
  'bonifacio global city': { lat: 14.5508, lng: 121.0500 },
  'makati': { lat: 14.5547, lng: 121.0244 },
  'mall of asia': { lat: 14.5350, lng: 120.9838 },

  // ── Clark / Pampanga ──
  'clark international airport': { lat: 15.1860, lng: 120.5600 },
  'clark airport': { lat: 15.1860, lng: 120.5600 },
  'angeles city': { lat: 15.1450, lng: 120.5887 },
  'nayong pilipino clark': { lat: 15.1917, lng: 120.5483 },
  'mt pinatubo': { lat: 15.1429, lng: 120.3496 },
  'mt pinatubo crater lake': { lat: 15.1429, lng: 120.3496 },

  // ── Sagada ──
  'sumaguing cave': { lat: 17.0833, lng: 120.9033 },
  'hanging coffins sagada': { lat: 17.0850, lng: 120.9100 },
  'kiltepan viewpoint': { lat: 17.0950, lng: 120.8950 },
  'bomod-ok falls': { lat: 17.1050, lng: 120.8817 },

  // ── Banaue ──
  'banaue rice terraces': { lat: 16.9140, lng: 121.0570 },
  'batad rice terraces': { lat: 16.9317, lng: 121.0850 },
  'tappiya falls': { lat: 16.9333, lng: 121.0883 },

  // ── Vigan ──
  'calle crisologo': { lat: 17.5747, lng: 120.3869 },
  'vigan heritage village': { lat: 17.5747, lng: 120.3869 },
  'bantay bell tower': { lat: 17.5883, lng: 120.3917 },

  // ── Batanes ──
  'batan island': { lat: 20.4500, lng: 121.9700 },
  'sabtang island': { lat: 20.3383, lng: 121.8783 },
  'marlboro country batanes': { lat: 20.4333, lng: 121.9900 },
  'valugan boulder beach': { lat: 20.4667, lng: 121.9900 },
  'basco lighthouse': { lat: 20.4517, lng: 121.9683 },

  // ── Legazpi ──
  'mayon volcano': { lat: 13.2570, lng: 123.6852 },
  'cagsawa ruins': { lat: 13.2117, lng: 123.7283 },
  'legazpi airport': { lat: 13.1577, lng: 123.7351 },

  // ── Donsol ──
  'donsol whale shark interaction center': { lat: 12.9083, lng: 123.5958 },

  // ── Davao ──
  'philippine eagle center': { lat: 7.2350, lng: 125.5617 },
  'samal island': { lat: 7.0833, lng: 125.7167 },
  'eden nature park': { lat: 7.1217, lng: 125.5467 },
  'davao airport': { lat: 7.1254, lng: 125.6456 },
  'francisco bangoy international airport': { lat: 7.1254, lng: 125.6456 },
  'mt apo': { lat: 7.0000, lng: 125.2708 },

  // ── Camiguin ──
  'white island camiguin': { lat: 9.2233, lng: 124.7033 },
  'sunken cemetery': { lat: 9.1800, lng: 124.7267 },
  'katibawasan falls': { lat: 9.1617, lng: 124.7400 },
  'ardent hot springs': { lat: 9.1700, lng: 124.7417 },
  'mantigue island': { lat: 9.1383, lng: 124.7917 },
  'camiguin airport': { lat: 9.1720, lng: 124.7070 },

  // ── Tagaytay ──
  'taal volcano': { lat: 14.0113, lng: 120.9978 },
  'people\'s park in the sky': { lat: 14.1100, lng: 120.9567 },
  'sky ranch tagaytay': { lat: 14.1167, lng: 120.9550 },
  'picnic grove tagaytay': { lat: 14.1083, lng: 120.9500 },

  // ── La Union ──
  'san juan surf beach': { lat: 16.6667, lng: 120.3450 },
  'elyu beach': { lat: 16.6667, lng: 120.3450 },
  'san fernando la union': { lat: 16.6159, lng: 120.3209 },
  'tangadan falls': { lat: 16.5350, lng: 120.3933 },

  // ── Baler ──
  'sabang beach baler': { lat: 15.7617, lng: 121.5633 },
  'dicasalarin cove': { lat: 15.7200, lng: 121.5800 },
  'ditumabo mother falls': { lat: 15.7633, lng: 121.4567 },

  // ── Iloilo / Guimaras ──
  'miag-ao church': { lat: 10.6417, lng: 122.2267 },
  'iloilo city': { lat: 10.6920, lng: 122.5706 },
  'guimaras mango farm': { lat: 10.5928, lng: 122.6325 },

  // ── Bacolod ──
  'the ruins bacolod': { lat: 10.6683, lng: 122.9317 },
  'bacolod city plaza': { lat: 10.6833, lng: 122.9583 },

  // ── Subic ──
  'subic bay': { lat: 14.7943, lng: 120.2622 },
  'ocean adventure subic': { lat: 14.8017, lng: 120.2550 },

  // ── Linapacan ──
  'linapacan island': { lat: 11.5000, lng: 119.8500 },
  'ditaytayan sandbar': { lat: 11.6500, lng: 120.0167 },

  // ── Puerto Galera ──
  'white beach puerto galera': { lat: 13.5117, lng: 120.9317 },
  'tamaraw falls': { lat: 13.4917, lng: 120.9100 },
  'sabang beach puerto galera': { lat: 13.5217, lng: 120.9667 },

  // ── Caramoan ──
  'caramoan islands': { lat: 13.7681, lng: 123.8611 },
  'matukad island': { lat: 13.7583, lng: 123.9583 },

  // ── Batangas ──
  'anilao': { lat: 13.7633, lng: 120.9283 },
  'laiya beach': { lat: 13.6667, lng: 121.4000 },

  // ── Malapascua ──
  'bounty beach malapascua': { lat: 11.3233, lng: 124.1114 },
  'malapascua island': { lat: 11.3233, lng: 124.1114 },

  // ── Zambales ──
  'crystal beach zambales': { lat: 15.3867, lng: 119.9550 },
  'anawangin cove': { lat: 14.8550, lng: 120.1250 },
  'nagsasa cove': { lat: 14.8617, lng: 120.1067 },

  // ── Baguio ──
  'burnham park': { lat: 16.4117, lng: 120.5967 },
  'mines view park': { lat: 16.4083, lng: 120.6200 },
  'session road baguio': { lat: 16.4100, lng: 120.5950 },
  'camp john hay': { lat: 16.3917, lng: 120.6033 },
};
