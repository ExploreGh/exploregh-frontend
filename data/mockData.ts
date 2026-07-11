// ============================================================
// ExploreGH Mock Data
// ALL placeholder data lives in this ONE file.
// When the backend is ready, screens will fetch from the API
// instead of importing from here — nothing else changes.
// Images are free Unsplash placeholders; swap the URLs anytime.
// ============================================================

export type Site = {
  id: string;
  name: string;
  region: string;
  category: string;
  latitude: number;
  longitude: number;
  image: string;
  rating: number;
  reviews: number;
  entryFee: string;
  description: string;
  bestTime: string;
  etiquette: string;
  crowdLevel: number; // 0 to 1
  crowdLabel: string;
};

export const sites: Site[] = [
  {
    id: '1',
    name: 'Cape Coast Castle',
    region: 'Central Region',
    category: 'History',
    latitude: 5.1053,
    longitude: -1.2466,
    image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=60',
    rating: 4.8,
    reviews: 1240,
    entryFee: 'GHS 40 locals · USD 15 foreigners',
    description:
      'A UNESCO World Heritage Site and one of about forty slave castles built on the Gold Coast. Tour the dungeons, learn the history of the transatlantic slave trade, and walk through the Door of No Return.',
    bestTime: 'Early morning (7–10am) or late afternoon (4–6pm). Avoid midday heat and crowds.',
    etiquette:
      'Dress respectfully. Photography is allowed in most areas but not in the dungeons. Keep voices low out of respect for the site\'s history.',
    crowdLevel: 0.55,
    crowdLabel: 'Moderate — good time to visit',
  },
  {
    id: '2',
    name: 'Kakum National Park',
    region: 'Central Region',
    category: 'Nature',
    latitude: 5.389,
    longitude: -1.3919,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=60',
    rating: 4.7,
    reviews: 986,
    entryFee: 'GHS 30 locals · USD 10 foreigners',
    description:
      'Home to the famous canopy walkway suspended 30 metres above the rainforest floor. Spot rare butterflies, birds and forest elephants across 375 square kilometres of protected forest.',
    bestTime: 'Arrive before 9am for the quietest canopy walk and best wildlife sightings.',
    etiquette: 'Stay on marked trails. No loud music. Do not feed or approach wildlife.',
    crowdLevel: 0.35,
    crowdLabel: 'Quiet — perfect time to visit',
  },
  {
    id: '3',
    name: 'Labadi Beach',
    region: 'Greater Accra',
    category: 'Beach',
    latitude: 5.5622,
    longitude: -0.1615,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=60',
    rating: 4.4,
    reviews: 2103,
    entryFee: 'GHS 20 per person',
    description:
      'Accra\'s most popular beach — live drumming, horse rides, beach football and fresh coconuts. Weekends feature reggae nights and cultural performances.',
    bestTime: 'Weekday mornings for calm; Sunday afternoons for live music and full energy.',
    etiquette: 'Bargain politely with vendors. Keep valuables secure. Tip performers if you take photos.',
    crowdLevel: 0.8,
    crowdLabel: 'Busy — lively atmosphere',
  },
  {
    id: '4',
    name: 'Kejetia Market',
    region: 'Ashanti Region',
    category: 'Culture',
    latitude: 6.7047,
    longitude: -1.6163,
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&q=60',
    rating: 4.5,
    reviews: 764,
    entryFee: 'Free entry',
    description:
      'One of the largest open-air markets in West Africa with over 10,000 stores. Kente cloth, beads, spices, crafts — if Ghana makes it, Kejetia sells it.',
    bestTime: 'Mid-morning (9–11am) after stalls open but before peak crowds.',
    etiquette: 'Bargaining is expected and friendly. Ask before photographing traders or their goods.',
    crowdLevel: 0.9,
    crowdLabel: 'Very busy — hold your bag close',
  },
  {
    id: '5',
    name: 'Mole National Park',
    region: 'Savannah Region',
    category: 'Nature',
    latitude: 9.266,
    longitude: -1.848,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=60',
    rating: 4.9,
    reviews: 654,
    entryFee: 'GHS 60 locals · USD 20 foreigners',
    description:
      'Ghana\'s largest wildlife refuge. Walking and driving safaris bring you close to elephants, antelopes, baboons and over 300 bird species.',
    bestTime: 'Dry season (November–April) when animals gather at waterholes.',
    etiquette: 'Always stay with your ranger. Neutral-coloured clothing recommended. No flash photography at close range.',
    crowdLevel: 0.25,
    crowdLabel: 'Quiet — ideal for safaris',
  },
  {
    id: '6',
    name: 'Elmina Castle',
    region: 'Central Region',
    category: 'History',
    latitude: 5.0847,
    longitude: -1.3509,
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=60',
    rating: 4.7,
    reviews: 890,
    entryFee: 'GHS 40 locals · USD 15 foreigners',
    description:
      'Built by the Portuguese in 1482, Elmina is the oldest European building in sub-Saharan Africa. Guided tours cover five centuries of Gold Coast history.',
    bestTime: 'Morning tours (8–11am) are cooler and less crowded. Pair with the nearby fishing harbour.',
    etiquette: 'Respectful silence in the dungeons. Local guides at the entrance are official — agree fees before starting.',
    crowdLevel: 0.5,
    crowdLabel: 'Moderate — steady flow of visitors',
  },
  {
    id: '7',
    name: 'Wli Waterfalls',
    region: 'Volta Region',
    category: 'Nature',
    latitude: 7.1436,
    longitude: 0.585,
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=60',
    rating: 4.8,
    reviews: 512,
    entryFee: 'GHS 25 locals · GHS 60 foreigners',
    description:
      'The highest waterfall in West Africa, tumbling 80 metres through the Agumatsa Wildlife Sanctuary. Thousands of fruit bats roost on the cliff face.',
    bestTime: 'Rainy season (June–September) for the fullest falls; the 45-minute forest hike is shaded year-round.',
    etiquette: 'Greet villagers on the trail. Swimming is allowed at the lower falls — modest swimwear appreciated.',
    crowdLevel: 0.3,
    crowdLabel: 'Quiet — peaceful hike',
  },
  {
    id: '8',
    name: 'Aburi Botanical Gardens',
    region: 'Eastern Region',
    category: 'Nature',
    latitude: 5.8486,
    longitude: -0.1731,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=60',
    rating: 4.5,
    reviews: 693,
    entryFee: 'GHS 15 locals · GHS 40 foreigners',
    description:
      'Founded in 1890 in the cool Akwapim hills, 30 minutes from Accra. Century-old palms, a famous strangler ficus, and sweeping views over the plains.',
    bestTime: 'Saturday mornings before the picnic crowds. The hill air is coolest before noon.',
    etiquette: 'Plants are protected — no picking. Picnics welcome; take your litter with you.',
    crowdLevel: 0.45,
    crowdLabel: 'Moderate — relaxed pace',
  },
  {
    id: '9',
    name: 'Kumasi Zoo',
    region: 'Ashanti Region',
    category: 'Wildlife',
    latitude: 6.7062,
    longitude: -1.6228,
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=60',
    rating: 4.2,
    reviews: 438,
    entryFee: 'GHS 15 adults · GHS 8 children',
    description:
      'Kumasi Zoological Gardens sits in the heart of the Garden City, minutes from Kejetia Market. Home to lions, monkeys, crocodiles, tortoises and a wide range of West African birds — a favourite for families and school trips.',
    bestTime: 'Weekday mornings when the animals are most active and school crowds are smaller.',
    etiquette: 'Do not feed the animals. Keep noise low near enclosures. Follow keeper instructions at all times.',
    crowdLevel: 0.5,
    crowdLabel: 'Moderate — busier on weekends',
  },
  {
    id: '10',
    name: 'KNUST Campus',
    region: 'Ashanti Region',
    category: 'Education',
    latitude: 6.6745,
    longitude: -1.5716,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=60',
    rating: 4.7,
    reviews: 521,
    entryFee: 'Free entry',
    description:
      'The Kwame Nkrumah University of Science and Technology — Ghana\'s premier science and technology university. Visit the iconic Great Hall, the botanical gardens, the lake and one of the greenest campuses in West Africa.',
    bestTime: 'Late afternoon (3–6pm) when the campus is lively but lectures are winding down.',
    etiquette: 'This is an active university — be respectful around lecture halls and libraries. Ask before photographing students.',
    crowdLevel: 0.6,
    crowdLabel: 'Lively — vibrant student life',
  },
  {
    id: '11',
    name: 'Larabanga Mosque',
    region: 'Savannah Region',
    category: 'History',
    latitude: 9.221,
    longitude: -1.858,
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=60',
    rating: 4.6,
    reviews: 287,
    entryFee: 'Donation-based (about GHS 20 suggested)',
    description:
      'The oldest mosque in Ghana and one of the oldest in West Africa, built in the distinctive Sudanese mud-and-stick style. Known as the "Mecca of West Africa", it pairs perfectly with a visit to nearby Mole National Park.',
    bestTime: 'Early morning or late afternoon for the best light on the white walls. Avoid Friday prayer times.',
    etiquette: 'Non-Muslims may not enter the mosque itself but can walk the exterior with a local guide. Dress modestly and remove hats.',
    crowdLevel: 0.2,
    crowdLabel: 'Quiet — peaceful visits',
  },
  {
    id: '12',
    name: 'Manhyia Palace Museum',
    region: 'Ashanti Region',
    category: 'Culture',
    latitude: 6.71,
    longitude: -1.6122,
    image: 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=800&q=60',
    rating: 4.8,
    reviews: 356,
    entryFee: 'GHS 25 locals · GHS 60 foreigners',
    description:
      'The seat of the Asantehene, King of the Ashanti Kingdom. The museum inside the old palace showcases royal regalia, historic photographs and the story of one of Africa\'s greatest kingdoms — including the legendary Golden Stool.',
    bestTime: 'Combine with an Akwasidae festival date (every 6 weeks) to see the palace at its most spectacular.',
    etiquette: 'Formal, respectful dress. Photography is restricted inside some exhibit rooms — always ask your guide first.',
    crowdLevel: 0.4,
    crowdLabel: 'Moderate — guided tours run all day',
  },
  {
    id: '13',
    name: 'Boti Falls',
    region: 'Eastern Region',
    category: 'Nature',
    latitude: 6.1935,
    longitude: -0.211,
    image: 'https://images.unsplash.com/photo-1467890947394-8171244e5410?w=800&q=60',
    rating: 4.6,
    reviews: 402,
    entryFee: 'GHS 20 locals · GHS 50 foreigners',
    description:
      'A stunning twin waterfall — locals call them the male and female falls — that merge during the rainy season in a spray said to form rainbows. Hike onward to the famous Umbrella Rock and the three-headed palm tree.',
    bestTime: 'June to September when both falls flow at full power. The 250-step descent is easiest in the cool morning.',
    etiquette: 'Hire a local guide at the entrance for the Umbrella Rock hike. Wear proper footwear — the steps get slippery.',
    crowdLevel: 0.35,
    crowdLabel: 'Quiet — busiest on holidays',
  },
];

export const categories = ['All', 'Nature', 'History', 'Culture', 'Beach', 'Wildlife', 'Education'];

export type Vendor = {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  price: string;
};

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Akosua Kente Weaves',
    category: 'Crafts',
    location: 'Bonwire, Ashanti',
    rating: 4.9,
    reviews: 128,
    description: 'Authentic handwoven kente cloth directly from the source. Custom orders available.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=60',
    price: 'GHS 150 — 800',
  },
  {
    id: '2',
    name: "Mama Ama's Kitchen",
    category: 'Food',
    location: 'Cape Coast',
    rating: 4.8,
    reviews: 94,
    description: 'Authentic Ghanaian cuisine — famous fufu, light soup and grilled tilapia.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=60',
    price: 'GHS 25 — 80',
  },
  {
    id: '3',
    name: 'Vume Pottery Studio',
    category: 'Crafts',
    location: 'Vume, Volta Region',
    rating: 4.7,
    reviews: 56,
    description: 'Traditional pottery demonstrations and handmade ceramic souvenirs.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=60',
    price: 'GHS 50 — 300',
  },
  {
    id: '4',
    name: "Kojo's Drumming Experience",
    category: 'Culture',
    location: 'Accra',
    rating: 5.0,
    reviews: 203,
    description: 'Learn traditional Ghanaian drumming from a master drummer. Group sessions available.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=60',
    price: 'GHS 100 per session',
  },
  {
    id: '5',
    name: 'Abena African Fashion',
    category: 'Fashion',
    location: 'Kumasi',
    rating: 4.6,
    reviews: 77,
    description: 'African print dresses, shirts and accessories. Custom tailoring available.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=60',
    price: 'GHS 120 — 500',
  },
  {
    id: '6',
    name: "Kofi's Fresh Coconuts",
    category: 'Food',
    location: 'Labadi Beach, Accra',
    rating: 4.9,
    reviews: 312,
    description: 'Fresh coconuts, tropical fruits and local snacks right on the beach.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=60',
    price: 'GHS 5 — 20',
  },
];

export const vendorCategories = ['All', 'Food', 'Crafts', 'Culture', 'Fashion'];

export type Guide = {
  id: string;
  name: string;
  specialization: string;
  regions: string;
  languages: string;
  rating: number;
  reviews: number;
  experience: string;
  price: string;
  photo: string;
  available: boolean;
};

export const guides: Guide[] = [
  {
    id: '1',
    name: 'Kwame Asante',
    specialization: 'History & Culture',
    regions: 'Central Region, Greater Accra',
    languages: 'English, Twi, French',
    rating: 4.9,
    reviews: 214,
    experience: '8 years',
    price: 'GHS 200/day',
    photo: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=60',
    available: true,
  },
  {
    id: '2',
    name: 'Abena Mensah',
    specialization: 'Nature & Wildlife',
    regions: 'Savannah Region, Brong-Ahafo',
    languages: 'English, Twi',
    rating: 4.8,
    reviews: 156,
    experience: '5 years',
    price: 'GHS 180/day',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=60',
    available: true,
  },
  {
    id: '3',
    name: 'Kofi Boateng',
    specialization: 'Food & Markets',
    regions: 'Ashanti Region, Greater Accra',
    languages: 'English, Twi, Ga',
    rating: 5.0,
    reviews: 89,
    experience: '3 years',
    price: 'GHS 150/day',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60',
    available: false,
  },
  {
    id: '4',
    name: 'Ama Owusu',
    specialization: 'Festivals & Traditions',
    regions: 'Volta Region, Oti Region',
    languages: 'English, Ewe, Twi',
    rating: 4.7,
    reviews: 103,
    experience: '6 years',
    price: 'GHS 190/day',
    photo: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&q=60',
    available: true,
  },
];

export type Festival = {
  id: string;
  name: string;
  region: string;
  tribe: string;
  image: string;
  date: string;
  duration: string;
  description: string;
  highlights: string;
  dresscode: string;
  status: 'upcoming' | 'recurring' | 'recent';
};

export const festivals: Festival[] = [
  {
    id: '1',
    name: 'Homowo Festival',
    region: 'Greater Accra',
    tribe: 'Ga People',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=60',
    date: 'August — September 2026',
    duration: '2 weeks',
    description:
      'Homowo — "hooting at hunger" — is the most important festival of the Ga people, celebrating the end of a historic famine with traditional food, drumming and family reunions.',
    highlights: 'Traditional kpokpoi meal, libation pouring, family gatherings, drumming and dancing',
    dresscode: 'Traditional Ga attire or smart casual. Avoid red and black.',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Akwasidae Festival',
    region: 'Ashanti Region',
    tribe: 'Ashanti People',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=60',
    date: 'Every 6 weeks — next: August 2026',
    duration: '1 day',
    description:
      'A sacred Ashanti festival held every 42 days at Manhyia Palace, Kumasi. The Asantehene receives homage from chiefs and the public in full royal regalia.',
    highlights: 'Royal procession, golden stool ceremony, traditional drumming, chiefs in full regalia',
    dresscode: 'Traditional kente cloth. Smart formal attire acceptable for visitors.',
    status: 'recurring',
  },
  {
    id: '3',
    name: 'Chale Wote Street Art Festival',
    region: 'Greater Accra',
    tribe: 'All of Ghana',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=60',
    date: 'August 2026',
    duration: '2 days',
    description:
      "Ghana's biggest street art and culture festival in James Town, Accra — live murals, music, fashion, skateboarding and performances from artists across Africa.",
    highlights: 'Live murals, music performances, fashion shows, food vendors, cultural exhibitions',
    dresscode: 'Creative and expressive — this is a fashion-forward event.',
    status: 'upcoming',
  },
  {
    id: '4',
    name: 'Panafest',
    region: 'Central Region',
    tribe: 'Pan-African',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=60',
    date: 'July 2026',
    duration: '1 week',
    description:
      'The Pan African Historical Theatre Festival at Cape Coast unites Africans and the diaspora to celebrate African heritage and reflect on the legacy of the slave trade.',
    highlights: 'Theatre performances, heritage tours, diaspora reunions, cultural exhibitions',
    dresscode: 'African traditional attire encouraged.',
    status: 'upcoming',
  },
];

export type SafetyAlert = {
  id: string;
  title: string;
  region: string;
  severity: 'high' | 'medium' | 'low';
  time: string;
  description: string;
};

export const safetyAlerts: SafetyAlert[] = [
  {
    id: '1',
    title: 'Pickpocket Warning',
    region: 'Accra Central',
    severity: 'high',
    time: '2 hours ago',
    description: 'Multiple tourists reported pickpockets near Makola Market. Keep your belongings secure.',
  },
  {
    id: '2',
    title: 'Road Closure',
    region: 'Cape Coast',
    severity: 'medium',
    time: '5 hours ago',
    description: 'Main road to Cape Coast Castle partially closed for construction. Use the Market Road route.',
  },
  {
    id: '3',
    title: 'Scam Alert',
    region: 'Kumasi',
    severity: 'high',
    time: '1 day ago',
    description: 'Fake tour guides reported near Kejetia Market. Verify guide credentials through ExploreGH.',
  },
  {
    id: '4',
    title: 'Beach Advisory',
    region: 'Labadi Beach',
    severity: 'low',
    time: '2 days ago',
    description: 'Strong currents reported. Swimming is not recommended until further notice.',
  },
];

export type Trip = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  stops: number;
  budget: string;
  image: string;
};

export const trips: Trip[] = [
  {
    id: '1',
    title: 'Central Region Explorer',
    startDate: 'Aug 15, 2026',
    endDate: 'Aug 18, 2026',
    stops: 4,
    budget: 'GHS 1,200',
    image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=60',
  },
  {
    id: '2',
    title: 'Accra City Tour',
    startDate: 'Sep 1, 2026',
    endDate: 'Sep 2, 2026',
    stops: 3,
    budget: 'GHS 450',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=60',
  },
  {
    id: '3',
    title: 'Northern Ghana Safari',
    startDate: 'Oct 10, 2026',
    endDate: 'Oct 15, 2026',
    stops: 6,
    budget: 'GHS 3,500',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=60',
  },
];

export const regions = [
  { id: '1', name: 'Greater Accra', sitesCount: 34, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=60' },
  { id: '2', name: 'Ashanti Region', sitesCount: 28, image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&q=60' },
  { id: '3', name: 'Central Region', sitesCount: 19, image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=60' },
  { id: '4', name: 'Volta Region', sitesCount: 22, image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=60' },
  { id: '5', name: 'Savannah Region', sitesCount: 11, image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=60' },
  { id: '6', name: 'Eastern Region', sitesCount: 16, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=60' },
];

export type CulturalRegion = {
  id: string;
  region: string;
  image: string;
  greeting: string;
  customs: string;
  dresscode: string;
  taboos: string;
  bestFor: string;
};

export const culturalRegions: CulturalRegion[] = [
  {
    id: '1',
    region: 'Ashanti Region',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=60',
    greeting: 'Maakye (Good Morning) · Maaha (Good Afternoon)',
    customs:
      'Always greet elders first. Remove shoes before entering a home. Use your right hand for giving and receiving items.',
    dresscode:
      'Dress modestly. Kente cloth is worn for special occasions. Avoid wearing funeral colours (red and black) casually.',
    taboos: 'Do not point with your left hand. Avoid eating while walking in public. Do not whistle at night.',
    bestFor: 'Festivals, chieftaincy ceremonies, kente weaving visits',
  },
  {
    id: '2',
    region: 'Greater Accra',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=60',
    greeting: 'Ete sen? (How are you? — Twi) · Miile (Hello — Ga)',
    customs:
      'Handshakes are common greetings. It is polite to ask about family. Bargaining is expected in markets.',
    dresscode:
      'Smart casual is fine in the city. Beach areas are relaxed. Avoid revealing clothing in traditional communities.',
    taboos: 'Avoid discussing politics with strangers. Do not photograph people without permission.',
    bestFor: 'City tours, beaches, nightlife, shopping',
  },
  {
    id: '3',
    region: 'Central Region',
    image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=60',
    greeting: 'Akwaaba (Welcome) · Ete sen? (How are you?)',
    customs:
      'At the slave castles, maintain respectful silence, especially in the dungeons. Photography rules are strictly enforced.',
    dresscode: 'Dress respectfully at historical sites. Avoid flashy clothing at memorial sites.',
    taboos: 'Never joke about slave trade history at the castles. Do not enter sacred areas without permission.',
    bestFor: 'Historical tours, cultural learning, beach visits',
  },
  {
    id: '4',
    region: 'Volta Region',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=60',
    greeting: 'Woezor (Welcome — Ewe) · Ŋdi (Good morning — Ewe)',
    customs:
      'Greet the chief or community leader first when visiting a village. Always accept offered food or drink — refusing is considered rude.',
    dresscode: 'Modest clothing in villages. Cover shoulders and knees when visiting shrines.',
    taboos: 'Do not climb sacred mountains without a guide. Avoid loud behaviour near shrines.',
    bestFor: 'Nature hikes, waterfalls, traditional village experiences',
  },
  {
    id: '5',
    region: 'Savannah Region',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=60',
    greeting: 'Despa (Good morning — Dagbani) · Antire (Welcome)',
    customs:
      'Remove shoes when entering mosques. Dress conservatively in Muslim communities. Friday is a holy day.',
    dresscode: 'Cover hair when entering mosques (women). Everyone should cover arms and legs.',
    taboos: 'No mosque photography without permission. Avoid eating in public during Ramadan.',
    bestFor: 'Wildlife safaris, cultural diversity, mosque visits',
  },
];

export type Language = {
  id: string;
  language: string;
  region: string;
  phrases: { english: string; translation: string; phonetic: string }[];
};

export const languages: Language[] = [
  {
    id: '1',
    language: 'Twi',
    region: 'Ashanti & most of Ghana',
    phrases: [
      { english: 'Welcome', translation: 'Akwaaba', phonetic: 'Ah-kwah-bah' },
      { english: 'Good morning', translation: 'Maakye', phonetic: 'Mah-chee' },
      { english: 'Good afternoon', translation: 'Maaha', phonetic: 'Mah-hah' },
      { english: 'How are you?', translation: 'Ete sen?', phonetic: 'Eh-teh-sen' },
      { english: 'I am fine', translation: 'Eye', phonetic: 'Eh-yeh' },
      { english: 'Thank you', translation: 'Medaase', phonetic: 'Meh-dah-seh' },
      { english: 'Please', translation: 'Mepa wo kyew', phonetic: 'Meh-pah-woh-chew' },
      { english: 'How much?', translation: 'Sika sen?', phonetic: 'See-kah-sen' },
      { english: 'Help me', translation: 'Boa me', phonetic: 'Boh-ah-meh' },
    ],
  },
  {
    id: '2',
    language: 'Ga',
    region: 'Greater Accra',
    phrases: [
      { english: 'Welcome', translation: 'Ojekoo', phonetic: 'Oh-jeh-koo' },
      { english: 'Good morning', translation: 'Miile', phonetic: 'Mee-leh' },
      { english: 'How are you?', translation: 'Afi o?', phonetic: 'Ah-fee-oh' },
      { english: 'I am fine', translation: 'Miihii', phonetic: 'Mee-hee' },
      { english: 'Thank you', translation: 'Oyiwaladon', phonetic: 'Oh-yee-wah-lah-don' },
      { english: 'Please', translation: 'Ekwa', phonetic: 'Eh-kwah' },
      { english: 'How much?', translation: 'Gbee?', phonetic: 'Gbeh' },
    ],
  },
  {
    id: '3',
    language: 'Ewe',
    region: 'Volta Region',
    phrases: [
      { english: 'Welcome', translation: 'Woezor', phonetic: 'Woh-zor' },
      { english: 'Good morning', translation: 'Ŋdi', phonetic: 'Ndee' },
      { english: 'How are you?', translation: 'Efoa?', phonetic: 'Eh-foh-ah' },
      { english: 'I am fine', translation: 'Hõ em', phonetic: 'Hoh-em' },
      { english: 'Thank you', translation: 'Akpe', phonetic: 'Ah-kpeh' },
      { english: 'Please', translation: 'Meɖekuku', phonetic: 'Meh-deh-koo-koo' },
      { english: 'How much?', translation: 'Esia?', phonetic: 'Eh-see-ah' },
    ],
  },
  {
    id: '4',
    language: 'Hausa',
    region: 'Northern Ghana',
    phrases: [
      { english: 'Welcome', translation: 'Barka da zuwa', phonetic: 'Bar-kah-dah-zoo-wah' },
      { english: 'Good morning', translation: 'Ina kwana', phonetic: 'Ee-nah-kwah-nah' },
      { english: 'How are you?', translation: 'Yaya dai?', phonetic: 'Yah-yah-die' },
      { english: 'I am fine', translation: 'Lafiya lau', phonetic: 'Lah-fee-yah-lau' },
      { english: 'Thank you', translation: 'Na gode', phonetic: 'Nah-goh-deh' },
      { english: 'Please', translation: 'Don Allah', phonetic: 'Don-ah-lah' },
      { english: 'How much?', translation: 'Nawa ne?', phonetic: 'Nah-wah-neh' },
    ],
  },
];

export type EmergencyService = {
  id: string;
  category: string;
  icon: string; // Ionicons name
  color: string;
  contacts: { name: string; number: string }[];
};

export const emergencyServices: EmergencyService[] = [
  {
    id: '1',
    category: 'Police',
    icon: 'shield',
    color: '#003580',
    contacts: [
      { name: 'Ghana Police Service', number: '191' },
      { name: 'Police Emergency', number: '18555' },
      { name: 'Motor Traffic & Transport', number: '054 191 0001' },
    ],
  },
  {
    id: '2',
    category: 'Medical',
    icon: 'medkit',
    color: '#CE1126',
    contacts: [
      { name: 'Ambulance Service', number: '193' },
      { name: 'Korle Bu Teaching Hospital', number: '030 250 1300' },
      { name: 'Komfo Anokye Teaching Hospital', number: '032 202 2301' },
      { name: 'Ridge Hospital Accra', number: '030 266 1947' },
    ],
  },
  {
    id: '3',
    category: 'Fire Service',
    icon: 'flame',
    color: '#D2571E',
    contacts: [
      { name: 'Ghana National Fire Service', number: '192' },
      { name: 'Fire Emergency', number: '030 222 5678' },
    ],
  },
  {
    id: '4',
    category: 'Tourist Support',
    icon: 'earth',
    color: '#006B3F',
    contacts: [
      { name: 'Ghana Tourism Authority', number: '030 223 3200' },
      { name: 'Tourist Police Unit', number: '030 277 3906' },
      { name: 'GIPC Tourist Helpline', number: '0800 900 900' },
    ],
  },
  {
    id: '5',
    category: 'Embassies in Ghana',
    icon: 'business',
    color: '#4A4E54',
    contacts: [
      { name: 'US Embassy Accra', number: '030 274 1000' },
      { name: 'UK High Commission', number: '030 221 3250' },
      { name: 'Nigerian High Commission', number: '030 277 4521' },
      { name: 'French Embassy', number: '030 221 3094' },
      { name: 'Chinese Embassy', number: '030 277 3388' },
    ],
  },
];