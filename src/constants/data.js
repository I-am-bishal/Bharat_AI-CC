// ============================================================
//  BharatAI — Application Data Constants
//  All static data lives here. Swap for API calls when ready.
// ============================================================

export const DESTINATIONS = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    emoji: '🏖️',
    category: 'Beaches',
    tagline: 'Sun, sand & soul',
    description:
      'Azure beaches, Portuguese heritage, vibrant beach shacks, and a nightlife that never sleeps. Goa is India\'s perennial paradise.',
    bestTime: 'Oct – Mar',
    dailyCost: '₹3,500',
    crowd: 'Moderate',
    crowdLevel: 60,
    rating: 4.8,
    reviews: 12400,
    badge: { label: '🔥 Trending', variant: 'flame' },
    gradient: 'linear-gradient(135deg, #0f4c75, #1b6ca8, #f0a500)',
    activities: ['Surfing', 'Portuguese heritage walks', 'Dudhsagar Falls', 'Spice plantation tours', 'Beach parties'],
    highlights: ['Calangute Beach', 'Old Goa churches', 'Palolem cove', 'Anjuna flea market'],
    chatPrompt: 'Plan me a Goa beach trip with hidden gems and local food spots',
  },
  {
    id: 'himachal',
    name: 'Himachal Pradesh',
    state: 'North India',
    emoji: '🏔️',
    category: 'Mountains',
    tagline: 'Heaven on Earth',
    description:
      'Snow-capped peaks, Buddhist monasteries in valleys, paragliding over Kullu, and apple orchards as far as the eye can see.',
    bestTime: 'Apr – Jun',
    dailyCost: '₹2,800',
    crowd: 'Low crowds',
    crowdLevel: 25,
    rating: 4.9,
    reviews: 8700,
    badge: { label: '❄️ Cool Now', variant: 'violet' },
    gradient: 'linear-gradient(135deg, #1a3a5c, #2d6a8a, #78b4c8)',
    activities: ['Paragliding Bir Billing', 'Rohtang Pass drive', 'Spiti Valley', 'Triund Trek', 'Skiing Solang'],
    highlights: ['Manali', 'Shimla', 'Dharamshala', 'Spiti Valley'],
    chatPrompt: 'Create a 10-day Himachal Pradesh mountain itinerary with trekking',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    state: 'Western India',
    emoji: '🏰',
    category: 'Heritage',
    tagline: 'Land of Kings',
    description:
      'Golden forts, blue-washed cities, camel safaris at sunset, royal palaces turned hotels — Rajasthan is India as cinema.',
    bestTime: 'Nov – Feb',
    dailyCost: '₹4,200',
    crowd: 'Peak season',
    crowdLevel: 80,
    rating: 4.7,
    reviews: 19200,
    badge: null,
    gradient: 'linear-gradient(135deg, #6b2d0f, #c4581a, #e8a840)',
    activities: ['Camel safari Jaisalmer', 'Amber Fort Jaipur', 'Mehrangarh Fort', 'Ranthambhore tigers', 'Pushkar fair'],
    highlights: ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer'],
    chatPrompt: 'Plan a royal Rajasthan circuit: Jaipur, Jodhpur, Udaipur, Jaisalmer',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'South India',
    emoji: '🌊',
    category: 'Backwaters',
    tagline: "God's Own Country",
    description:
      'Houseboat cruises through backwaters, Ayurvedic rejuvenation retreats, spice-scented hill stations, and pristine Malabar coast.',
    bestTime: 'Sep – Feb',
    dailyCost: '₹3,900',
    crowd: 'Peaceful',
    crowdLevel: 30,
    rating: 4.9,
    reviews: 14800,
    badge: { label: '🌿 AI Pick', variant: 'teal' },
    gradient: 'linear-gradient(135deg, #0a3d2e, #1a7a56, #4ec990)',
    activities: ['Houseboat Alleppey', 'Munnar tea estates', 'Ayurveda retreat', 'Kathakali dance', 'Periyar wildlife'],
    highlights: ['Alleppey', 'Munnar', 'Varkala', 'Wayanad'],
    chatPrompt: 'Plan a Kerala backwaters and hill station trip for 7 days',
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    state: 'North India',
    emoji: '🕉️',
    category: 'Spiritual',
    tagline: 'Devbhoomi',
    description:
      'Rishikesh yoga retreats, Char Dham pilgrimage, Haridwar Ganga Aarti at dawn, Jim Corbett tigers — the divine Himalayan heartland.',
    bestTime: 'May–Jun, Sep–Nov',
    dailyCost: '₹2,200',
    crowd: 'Varies',
    crowdLevel: 45,
    rating: 4.8,
    reviews: 10300,
    badge: null,
    gradient: 'linear-gradient(135deg, #2c1654, #5a2d82, #9b59b6)',
    activities: ['Yoga & meditation Rishikesh', 'Ganga Aarti Haridwar', 'Valley of Flowers', 'Jim Corbett safari', 'Auli skiing'],
    highlights: ['Rishikesh', 'Haridwar', 'Kedarnath', 'Valley of Flowers'],
    chatPrompt: 'Create a spiritual journey through Uttarakhand: yoga, temples, and nature',
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    state: 'West India',
    emoji: '🌆',
    category: 'Urban + Caves',
    tagline: 'City meets History',
    description:
      'Mumbai\'s electric skyline, UNESCO-listed Ajanta–Ellora caves, misty Lonavala hills, and a food culture that rivals any city on earth.',
    bestTime: 'Oct – Mar',
    dailyCost: '₹4,800',
    crowd: 'Busy',
    crowdLevel: 70,
    rating: 4.6,
    reviews: 16500,
    badge: null,
    gradient: 'linear-gradient(135deg, #1a0533, #3d1a6e, #ff6b35)',
    activities: ['Ajanta-Ellora caves', 'Mumbai street food tour', 'Lonavala trekking', 'Khandala viewpoints', 'Pune culture walk'],
    highlights: ['Mumbai', 'Aurangabad', 'Pune', 'Mahabaleshwar'],
    chatPrompt: 'Plan a Maharashtra trip covering Mumbai, Ajanta caves, and hill stations',
  },
]

export const TRAVEL_STYLES = [
  { id: 'beaches',      label: '🏖️ Beaches',     dest: 'goa' },
  { id: 'mountains',    label: '🏔️ Mountains',    dest: 'himachal' },
  { id: 'heritage',     label: '🕌 Heritage',      dest: 'rajasthan' },
  { id: 'spiritual',    label: '🕉️ Spiritual',     dest: 'uttarakhand' },
  { id: 'nature',       label: '🌿 Nature',        dest: 'kerala' },
  { id: 'luxury',       label: '💎 Luxury',        dest: 'rajasthan' },
  { id: 'backpacking',  label: '🎒 Backpacking',   dest: 'himachal' },
  { id: 'food',         label: '🍛 Food Trail',    dest: 'maharashtra' },
]

export const ITINERARIES = {
  goa: [
    { day: 1, title: 'Arrive Panaji + sunset beach',     desc: 'Check-in, Calangute Beach, seafood shack dinner' },
    { day: 2, title: 'Old Goa Heritage Tour',            desc: 'Se Cathedral, Basilica Bom Jesus, spice plantation' },
    { day: 3, title: 'Water Sports + Palolem',           desc: 'Kayaking, parasailing, south Goa bohemian vibes' },
    { day: 4, title: 'Dudhsagar Falls day trip',         desc: 'Waterfall trek, jungle trail, picnic lunch' },
    { day: 5, title: 'Anjuna market + Vagator cliff',    desc: 'Flea market, cliff sunset, bonfire night' },
  ],
  himachal: [
    { day: 1, title: 'Delhi → Shimla by train',          desc: 'Toy train journey, Mall Road, colonial charm' },
    { day: 2, title: 'Shimla → Manali via Kullu',        desc: 'River rafting Kullu, riverside camping night' },
    { day: 3, title: 'Solang Valley + snow play',        desc: 'Paragliding, skiing, snow tubing adventures' },
    { day: 4, title: 'Rohtang Pass excursion',           desc: 'Highest motorable road, panoramic Himalayan views' },
    { day: 5, title: 'Spiti Valley drive',               desc: 'Key Monastery, Pin Valley, stargazing at 4000m' },
  ],
  rajasthan: [
    { day: 1, title: 'Jaipur — Pink City',               desc: 'Amber Fort, Hawa Mahal, city palace, bazaars' },
    { day: 2, title: 'Jodhpur — Blue City',              desc: 'Mehrangarh Fort, spice market, rooftop café sunset' },
    { day: 3, title: 'Jaisalmer — Desert Gold',          desc: 'Camel safari, Sam sand dunes, folk music night' },
    { day: 4, title: 'Udaipur — Lake City',              desc: 'Lake Palace, Pichola boat ride, Bagore Ki Haveli' },
    { day: 5, title: 'Pushkar + Ajmer Sharif',           desc: 'Sacred lake, Brahma temple, Sufi shrine visit' },
  ],
  kerala: [
    { day: 1, title: 'Arrive Kochi + Fort Kochi',        desc: 'Chinese fishing nets, Jewish Synagogue, spice market' },
    { day: 2, title: 'Alleppey houseboat cruise',        desc: 'Backwater canals, village life, sunset on deck' },
    { day: 3, title: 'Munnar tea estate walk',           desc: 'Tea factory, Eravikulam NP, Mattupetty lake' },
    { day: 4, title: 'Ayurveda retreat day',             desc: 'Abhyanga massage, Panchakarma, yoga at dawn' },
    { day: 5, title: 'Varkala cliff beach + depart',     desc: 'Red laterite cliffs, sunset swim, pappad prawns' },
  ],
  uttarakhand: [
    { day: 1, title: 'Haridwar Ganga Aarti',             desc: 'Sacred dip at Har Ki Pauri, evening fire ceremony' },
    { day: 2, title: 'Rishikesh — Yoga Capital',         desc: 'Yoga class, Beatles Ashram, white-water rafting' },
    { day: 3, title: 'Kedarnath Yatra trek',             desc: 'Helicopter or 20 km trek, Shiva temple at 3500m' },
    { day: 4, title: 'Valley of Flowers trek',           desc: 'UNESCO heritage, rare alpine blooms, snow bridges' },
    { day: 5, title: 'Jim Corbett safari',               desc: 'Jeep safari, Bengal tigers, elephants, birdwatching' },
  ],
  maharashtra: [
    { day: 1, title: 'Mumbai — city orientation',        desc: 'Gateway of India, Marine Drive, Colaba Causeway' },
    { day: 2, title: 'Dharavi + street food trail',      desc: 'Vada pav, pav bhaji, Dadar market immersion' },
    { day: 3, title: 'Aurangabad → Ajanta Caves',        desc: 'UNESCO 2nd-century Buddhist murals, cave temples' },
    { day: 4, title: 'Ellora Caves excursion',           desc: 'Kailash Temple rock-cut marvel, sunset light show' },
    { day: 5, title: 'Lonavala + Khandala hills',        desc: 'Tiger\'s Leap, Bhushi Dam, chikki shopping' },
  ],
}

export const COST_MULTIPLIERS = {
  beaches:     0.90,
  mountains:   1.00,
  heritage:    1.20,
  spiritual:   0.80,
  nature:      0.95,
  luxury:      2.80,
  backpacking: 0.55,
  food:        1.10,
}

export const BADGES = [
  { id: 'explorer',    icon: '🗺️', name: 'Explorer',       desc: 'Visit 5 different states',          xpReward: 500 },
  { id: 'backpacker',  icon: '🎒', name: 'Backpacker',      desc: 'Budget trip under ₹1,500/day',      xpReward: 300 },
  { id: 'luxury',      icon: '💎', name: 'Luxury Traveler', desc: 'Stay at a heritage palace hotel',    xpReward: 600 },
  { id: 'summit',      icon: '🏔️', name: 'Summit Seeker',   desc: 'Trek above 4,000 m altitude',       xpReward: 800 },
  { id: 'foodie',      icon: '🍛', name: 'Foodie Pilgrim',  desc: 'Try cuisine from 10 states',         xpReward: 400 },
  { id: 'spiritual',   icon: '🕉️', name: 'Soul Seeker',     desc: 'Visit 3 pilgrimage sites',           xpReward: 450 },
]

export const AI_INSIGHTS = [
  {
    id: 'price',
    icon: '💰',
    title: 'Price Predictor',
    body: 'AI tracks flight and hotel prices across 200+ providers and alerts you to the ideal booking window.',
    alert: { type: 'warn', text: '⚡ Goa flights: −18 % if booked in 3 days' },
  },
  {
    id: 'crowd',
    icon: '👥',
    title: 'Crowd Density AI',
    body: 'Know exactly when destinations are packed or peaceful — powered by historical and real-time footfall data.',
    alert: { type: 'ok', text: '✅ Hampi: Very low crowds this week' },
  },
  {
    id: 'weather',
    icon: '🌦️',
    title: 'Weather Intelligence',
    body: '30-day micro-weather modelling for every Indian region — monsoon, heatwave, and snow windows, all predicted.',
    alert: { type: 'warn', text: '⚠️ Manali: Heavy snowfall expected next week' },
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Mehta',
    location: 'Mumbai',
    avatar: 'PM',
    rating: 5,
    text: 'BharatAI planned my entire Kerala trip in under 3 minutes. The AI actually understood that I wanted slow travel, not a rushed checklist. Best trip of my life.',
    trip: 'Kerala • 10 days',
    savings: 'Saved ₹8,400',
  },
  {
    id: 2,
    name: 'Rohan Sharma',
    location: 'Bengaluru',
    avatar: 'RS',
    rating: 5,
    text: 'The price predictor told me to wait 2 days before booking Rajasthan flights. Flights dropped 22%. This AI just pays for itself.',
    trip: 'Rajasthan • 8 days',
    savings: 'Saved ₹6,200',
  },
  {
    id: 3,
    name: 'Anjali Kapoor',
    location: 'Delhi',
    avatar: 'AK',
    rating: 5,
    text: 'I was sceptical about AI planning my honeymoon but Aryan (the AI) nailed every detail — sunrise kayaking, private houseboat, rooftop dinners. Perfect.',
    trip: 'Kerala + Goa • 12 days',
    savings: 'Saved ₹11,800',
  },
]

export const QUICK_QUESTIONS = [
  'Best budget trip in India under ₹15,000 for 5 days?',
  'Hidden gems in India most tourists miss?',
  'Best time to visit Kerala backwaters?',
  'Plan a Rajasthan royal heritage tour for 10 days',
]

// Aryan's AI system prompt used in every Claude API call
export const AI_SYSTEM_PROMPT = `You are Aryan, a warm, expert, and slightly opinionated AI travel companion for India. You know every corner of India deeply — hidden waterfalls, royal palaces, street-food lanes, and 5-star resorts alike. Give specific, actionable advice with genuine enthusiasm.

Guidelines:
- Keep responses to 3-6 sentences — rich but concise
- Suggest things proactively, not just answer questions
- Use relevant emojis naturally (not excessively)
- Quote prices in Indian Rupees (₹)
- Always end with ONE proactive follow-up suggestion or question
- Never fabricate specific hotel names, prices, or transport schedules as fact — frame as "typically" or "around"
- Be opinionated: "Skip the tourist traps, here's what locals actually do..."
- For itinerary requests, give a day-by-day breakdown even if brief
`
