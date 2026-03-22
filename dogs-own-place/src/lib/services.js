// ── All DOP Services ─────────────────────────────────────────────
export const SERVICES = [
  {
    id: 'training',
    slug: 'dog-training',
    title: 'Dog Training',
    shortTitle: 'Training',
    emoji: '🏅',
    icon: '🐕',
    color: 'orange',
    price: 999,
    priceLabel: '₹999 / session',
    duration: '60 min',
    description:
      'Expert obedience training, behaviour correction and skill-building programmes tailored to your dog\'s breed, age and temperament.',
    highlights: ['Obedience basics', 'Behaviour correction', 'Trick training', 'Agility drills'],
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 'walking',
    slug: 'dog-walking',
    title: 'Dog Walking',
    shortTitle: 'Walking',
    emoji: '🦮',
    icon: '🐾',
    color: 'amber',
    price: 299,
    priceLabel: '₹299 / walk',
    duration: '30–60 min',
    description:
      'Safe, GPS-tracked walks by certified handlers. Morning or evening slots available. Live location updates sent to you.',
    highlights: ['GPS tracking', 'Certified handlers', 'Morning & evening slots', 'Live updates'],
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 'health-checkup',
    slug: 'health-checkup',
    title: 'Health Checkup',
    shortTitle: 'Health',
    emoji: '🩺',
    icon: '❤️',
    color: 'red',
    price: 799,
    priceLabel: '₹799 / visit',
    duration: '45 min',
    description:
      'Thorough wellness exams by licensed veterinarians. Covers weight, teeth, coat, ears, vitals and overall health assessment.',
    highlights: ['Full body exam', 'Dental check', 'Weight & vitals', 'Health certificate'],
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 'injections',
    slug: 'vaccinations',
    title: 'Vaccinations',
    shortTitle: 'Vaccines',
    emoji: '💉',
    icon: '🛡️',
    color: 'blue',
    price: 499,
    priceLabel: '₹499 / dose',
    duration: '20 min',
    description:
      'Timely core and non-core vaccinations administered by certified vets. We maintain your dog\'s complete immunisation record.',
    highlights: ['Core vaccines', 'Rabies shots', 'Booster reminders', 'Digital health card'],
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 'grooming',
    slug: 'grooming',
    title: 'Grooming & Spa',
    shortTitle: 'Grooming',
    emoji: '✂️',
    icon: '🛁',
    color: 'pink',
    price: 699,
    priceLabel: '₹699 / session',
    duration: '90 min',
    description:
      'Full spa experience — bath, blow-dry, coat trim, nail clipping, ear cleaning and deodorising. Your dog leaves glowing!',
    highlights: ['Shampoo & conditioner', 'Breed-specific trim', 'Nail clipping', 'Ear cleaning'],
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 'boarding',
    slug: 'boarding',
    title: 'Dog Boarding',
    shortTitle: 'Boarding',
    emoji: '🏠',
    icon: '🛏️',
    color: 'green',
    price: 1499,
    priceLabel: '₹1499 / night',
    duration: '24 hrs',
    description:
      'Safe, cosy overnight stays when you\'re away. Dogs enjoy play sessions, walks and personalised care in a home-like setting.',
    highlights: ['24/7 supervision', 'Play sessions', 'Separate spaces', 'Daily updates'],
    image: 'https://images.unsplash.com/photo-1601758124277-edd63b2ac2e0?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 'nutrition',
    slug: 'nutrition',
    title: 'Nutrition Counseling',
    shortTitle: 'Nutrition',
    emoji: '🥩',
    icon: '🍖',
    color: 'yellow',
    price: 599,
    priceLabel: '₹599 / consult',
    duration: '30 min',
    description:
      'Personalised diet plans crafted by certified canine nutritionists. Balance proteins, fats and carbs for your dog\'s breed and age.',
    highlights: ['Custom diet plans', 'Allergy screening', 'Supplement advice', 'Follow-up support'],
    image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 'socialisation',
    slug: 'puppy-socialisation',
    title: 'Puppy Socialisation',
    shortTitle: 'Puppy Class',
    emoji: '🐶',
    icon: '🤝',
    color: 'purple',
    price: 799,
    priceLabel: '₹799 / class',
    duration: '45 min',
    description:
      'Structured group classes for puppies 8–16 weeks old. Exposure to sights, sounds, people and other dogs in a safe environment.',
    highlights: ['Group play', 'Confidence building', 'Basic commands', 'Socialisation skills'],
    image: 'https://images.unsplash.com/photo-1534361960057-19f4e9c5d473?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
];

// ── Time slots ────────────────────────────────────────────────────
export const TIME_SLOTS = [
  '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM',
];

// ── Dog breeds ────────────────────────────────────────────────────
export const DOG_BREEDS = [
  'Labrador Retriever', 'Golden Retriever', 'German Shepherd',
  'Indian Spitz', 'Beagle', 'Pomeranian', 'Dachshund',
  'Shih Tzu', 'Pug', 'Rottweiler', 'Doberman', 'Great Dane',
  'Cocker Spaniel', 'Boxer', 'Siberian Husky', 'Border Collie',
  'French Bulldog', 'Chihuahua', 'Maltese', 'Mixed Breed', 'Other',
];

// ── Stats ─────────────────────────────────────────────────────────
export const STATS = [
  { value: '2500+', label: 'Happy Dogs Served', icon: '🐾' },
  { value: '45+',   label: 'Expert Professionals', icon: '👨‍⚕️' },
  { value: '8',     label: 'Premium Services', icon: '⭐' },
  { value: '6',     label: 'Years of Experience', icon: '🏆' },
];

// ── Testimonials ──────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    location: 'Kolkata, WB',
    dog: 'Bruno (Labrador)',
    rating: 5,
    text: 'DOP transformed Bruno completely! He used to be uncontrollable, now he follows every command. The trainers are so patient and loving. Absolutely worth every rupee!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
  },
  {
    name: 'Arjun Mehta',
    location: 'Mumbai, MH',
    dog: 'Luna (Golden Retriever)',
    rating: 5,
    text: 'The health checkup service is superb. The vet was thorough and explained everything in detail. Love the digital health card feature — so convenient for tracking!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
  },
  {
    name: 'Sunita Rao',
    location: 'Bengaluru, KA',
    dog: 'Mochi (Shih Tzu)',
    rating: 5,
    text: 'My Mochi looks like a movie star after every grooming session! The staff treats him like royalty. Booking is super easy through the app. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
  },
  {
    name: 'Rohan Das',
    location: 'Delhi, DL',
    dog: 'Rocky (German Shepherd)',
    rating: 5,
    text: 'Used the boarding service for a week during my trip. Got daily photo updates and Rocky was so happy when I picked him up. Will definitely use again!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
  },
];
