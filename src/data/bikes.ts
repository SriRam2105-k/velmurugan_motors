// data/bikes.ts

export type Bike = {
  id: number
  slug: string
  name: string
  category: "commuter" | "premium" | "sport" | "scooter"
  tagline: string
  inStock: boolean
  isBestSeller: boolean
  isNew: boolean
  specs: {
    mileage: string
    engine: string
    power: string
  }
  colors: string[]
  price: {
    exShowroom: number
    onRoad: number
    emiStarting: number
  }
  images: {
    main: string
    variants?: Record<string, string>
  }
  features: string[]
}

export const bikes: Bike[] = [

  // ─── MOTORCYCLES ───────────────────────────────────────

  {
    id: 1,
    slug: "hf-deluxe",
    name: "HF Deluxe",
    category: "commuter",
    tagline: "Sabse Bharosemand, Sabse Sasta",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "60 kmpl",
      engine: "97.2cc",
      power: "8.02 bhp",
    },
    colors: [
          "Bank Funk Lime Yellow",
          "Black Grey Stripe",
          "Black Nexus Blue",
          "Black Red Stripe"
    ],
    price: {
      exShowroom: 64218,
      onRoad: 76406,
      emiStarting: 2197,
    },
    images: {
      main: "/bikes/hf-deluxe/main.png",
      variants: {
              "Bank Funk Lime Yellow": "/bikes/HF Deluxe/Bank Funk Lime Yellow.jpg",
              "Black Grey Stripe": "/bikes/HF Deluxe/Black Grey Stripe.jpg",
              "Black Nexus Blue": "/bikes/HF Deluxe/Black Nexus Blue.jpg",
              "Black Red Stripe": "/bikes/HF Deluxe/Black Red Stripe.jpg"
      },
    },
    features: [
      "Integrated Braking System",
      "Tubeless Tyres",
      "Long Seat",
      "Side Stand Engine Cut-off",
    ],
  },

  {
    id: 2,
    slug: "hf-deluxe-pro",
    name: "HF Deluxe Pro",
    category: "commuter",
    tagline: "More Features, Same Trust",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "60 kmpl",
      engine: "97.2cc",
      power: "8.02 bhp",
    },
    colors: [
          "Bank Funk Lime Yellow",
          "Black Grey Stripe",
          "Black Nexus Blue",
          "Black Red Stripe"
    ],
    price: {
      exShowroom: 68000,
      onRoad: 80500,
      emiStarting: 2300,
    },
    images: {
      main: "/bikes/hf-deluxe-pro/main.png",
      variants: {
              "Bank Funk Lime Yellow": "/bikes/HF Deluxe/Bank Funk Lime Yellow.jpg",
              "Black Grey Stripe": "/bikes/HF Deluxe/Black Grey Stripe.jpg",
              "Black Nexus Blue": "/bikes/HF Deluxe/Black Nexus Blue.jpg",
              "Black Red Stripe": "/bikes/HF Deluxe/Black Red Stripe.jpg"
      }
    },
    features: [
      "Self Start",
      "Alloy Wheels",
      "Integrated Braking System",
      "Tubeless Tyres",
    ],
  },

  {
    id: 3,
    slug: "splendor-plus",
    name: "Splendor Plus",
    category: "commuter",
    tagline: "India's Most Trusted Bike",
    inStock: true,
    isBestSeller: true,
    isNew: false,
    specs: {
      mileage: "70 kmpl",
      engine: "97.2cc",
      power: "7.91 bhp",
    },
    colors: [
          "Black Heavy Grey",
          "Black Red Purple",
          "Blue Black",
          "Force Silver",
          "Sports Red Black"
    ],
    price: {
      exShowroom: 75039,
      onRoad: 89943,
      emiStarting: 2600,
    },
    images: {
      main: "/bikes/splendor-plus/main.png",
      variants: {
              "Black Heavy Grey": "/bikes/Splendor +/Black Heavy Grey.jpg",
              "Black Red Purple": "/bikes/Splendor +/Black Red Purple.jpg",
              "Blue Black": "/bikes/Splendor +/Blue Black.jpg",
              "Force Silver": "/bikes/Splendor +/Force Silver.jpg",
              "Sports Red Black": "/bikes/Splendor +/Sports Red Black.jpg"
      }
    },
    features: [
      "i3S Technology",
      "Integrated Braking System",
      "USB Charging Port",
      "Tubeless Tyres",
    ],
  },

  {
    id: 4,
    slug: "splendor-plus-20",
    name: "Splendor Plus 2.0",
    category: "commuter",
    tagline: "New Look, Legendary Mileage",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "70 kmpl",
      engine: "97.2cc",
      power: "7.91 bhp",
    },
    colors: [
          "Black Heavy Grey",
          "Matte Grey",
          "Nobel Red"
    ],
    price: {
      exShowroom: 78000,
      onRoad: 92000,
      emiStarting: 2700,
    },
    images: {
      main: "/bikes/splendor-plus-2o/main.png",
      variants: {
              "Black Heavy Grey": "/bikes/Splendor + XTEC 2.0/Black Heavy Grey.jpg",
              "Matte Grey": "/bikes/Splendor + XTEC 2.0/Matte Grey.jpg",
              "Nobel Red": "/bikes/Splendor + XTEC 2.0/Nobel Red.jpg"
      }
    },
    features: [
      "Refreshed Design",
      "i3S Technology",
      "USB Charging Port",
      "Integrated Braking System",
    ],
  },

  {
    id: 5,
    slug: "splendor-plus-xtec",
    name: "Splendor Plus Xtec",
    category: "commuter",
    tagline: "Splendor with Smart Tech",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "68 kmpl",
      engine: "97.2cc",
      power: "7.91 bhp",
    },
    colors: [
          "Black Sparking Blue",
          "Black Tornado Grey",
          "Red Black"
    ],
    price: {
      exShowroom: 79703,
      onRoad: 94000,
      emiStarting: 2750,
    },
    images: {
      main: "/bikes/splendor-plus-xtec/main.png",
      variants: {
              "Black Sparking Blue": "/bikes/Splendor + XTEC/Black Sparking Blue.jpg",
              "Black Tornado Grey": "/bikes/Splendor + XTEC/Black Tornado Grey.jpg",
              "Red Black": "/bikes/Splendor + XTEC/Red Black.jpg"
      }
    },
    features: [
      "Bluetooth Connectivity",
      "LED Projector Headlamp",
      "i3S Technology",
      "USB Charging Port",
    ],
  },

  {
    id: 6,
    slug: "passion-pro",
    name: "Passion Pro",
    category: "commuter",
    tagline: "Stylish, Efficient, Reliable",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "56 kmpl",
      engine: "113.2cc",
      power: "9.15 bhp",
    },
    colors: [
          "Black Brown Stripes",
          "Black Heavy Grey",
          "Black Nexus Blue",
          "Sports Red Black"
    ],
    price: {
      exShowroom: 74000,
      onRoad: 88000,
      emiStarting: 2550,
    },
    images: {
      main: "/bikes/passion-plus/main.png",
      variants: {
              "Black Brown Stripes": "/bikes/Passion/Black Brown Stripes.jpg",
              "Black Heavy Grey": "/bikes/Passion/Black Heavy Grey.jpg",
              "Black Nexus Blue": "/bikes/Passion/Black Nexus Blue.jpg",
              "Sports Red Black": "/bikes/Passion/Sports Red Black.jpg"
      },
    },
    features: [
      "LED Projector Headlamp",
      "Tubeless Tyres",
      "Self Start",
      "Side Stand Engine Cut-off",
    ],
  },

  {
    id: 7,
    slug: "super-splendor-125",
    name: "Super Splendor 125",
    category: "premium",
    tagline: "125cc Power, Splendor Trust",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "68 kmpl",
      engine: "124.7cc",
      power: "10.72 bhp",
    },
    colors: [
      "Glossy Black",
      "Candy Blazing Red",
      "Matt Axis Grey",
      "Matt Nexus Blue",
      "Matt Chestnut Brown",
    ],
    price: {
      exShowroom: 83448,
      onRoad: 98000,
      emiStarting: 2850,
    },
    images: {
      main: "/bikes/super-splendor-125/main.png",
    },
    features: [
      "125cc Engine",
      "i3S Technology",
      "Integrated Braking System",
      "Digital Console",
    ],
  },

  {
    id: 8,
    slug: "glamour-xtec-125",
    name: "Glamour Xtec 125",
    category: "premium",
    tagline: "Smart Style for Every Road",
    inStock: true,
    isBestSeller: true,
    isNew: false,
    specs: {
      mileage: "65 kmpl",
      engine: "124.7cc",
      power: "11.4 bhp",
    },
    colors: [
          "Black Metalic Silver",
          "Black Sports Red",
          "Candy Blazing Red",
          "Techno Blu Met Blk"
    ],
    price: {
      exShowroom: 88137,
      onRoad: 103000,
      emiStarting: 3000,
    },
    images: {
      main: "/bikes/glamour-xtec-125/main.png",
      variants: {
              "Black Metalic Silver": "/bikes/Glamour XTEC 125/Black Metalic Silver.jpg",
              "Black Sports Red": "/bikes/Glamour XTEC 125/Black Sports Red.jpg",
              "Candy Blazing Red": "/bikes/Glamour XTEC 125/Candy Blazing Red.jpg",
              "Techno Blu Met Blk": "/bikes/Glamour XTEC 125/Techno Blu Met Blk.jpg"
      },
    },
    features: [
      "Bluetooth Connectivity",
      "LED Projector Headlamp",
      "TFT Instrument Cluster",
      "USB Charging Port",
    ],
  },

  {
    id: 9,
    slug: "xtreme-125",
    name: "Xtreme 125R",
    category: "sport",
    tagline: "Born to Race, Built to Thrill",
    inStock: true,
    isBestSeller: true,
    isNew: false,
    specs: {
      mileage: "60 kmpl",
      engine: "124.7cc",
      power: "11.4 bhp",
    },
    colors: [
          "Black Leaf Green",
          "Black Mattshadow Grey",
          "Black Pearl Red"
    ],
    price: {
      exShowroom: 90800,
      onRoad: 107000,
      emiStarting: 3100,
    },
    images: {
      main: "/bikes/xtreme-125/main.png",
      variants: {
              "Black Leaf Green": "/bikes/Xtreme 125R/Black Leaf Green.jpg",
              "Black Mattshadow Grey": "/bikes/Xtreme 125R/Black Mattshadow Grey.jpg",
              "Black Pearl Red": "/bikes/Xtreme 125R/Black Pearl Red.jpg"
      },
    },
    features: [
      "Sport Design",
      "LED Headlamp",
      "Digital Console",
      "Disc Brake",
    ],
  },

  // ─── SCOOTERS ──────────────────────────────────────────

  {
    id: 10,
    slug: "pleasure-plus-110",
    name: "Pleasure+ 110",
    category: "scooter",
    tagline: "Why Should Boys Have All the Fun?",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "50 kmpl",
      engine: "110.9cc",
      power: "8 bhp",
    },
    colors: [
          "Copper Brown",
          "Matte Black",
          "Matte Vernier Grey",
          "Pearl Blue"
    ],
    price: {
      exShowroom: 69766,
      onRoad: 84000,
      emiStarting: 2400,
    },
    images: {
      main: "/bikes/pleasure-plus-110/main.png",
      variants: {
              "Copper Brown": "/bikes/Pleasure +XTEC/Copper Brown.jpg",
              "Matte Black": "/bikes/Pleasure +XTEC/Matte Black.jpg",
              "Matte Vernier Grey": "/bikes/Pleasure +XTEC/Matte Vernier Grey.jpg",
              "Pearl Blue": "/bikes/Pleasure +XTEC/Pearl Blue.jpg"
      },
    },
    features: [
      "Lightweight Design",
      "Under Seat Storage",
      "Front Pockets",
      "LED Tail Lamp",
    ],
  },

  {
    id: 11,
    slug: "pleasure-xtec",
    name: "Pleasure+ Xtec",
    category: "scooter",
    tagline: "Smart Scooter for Smart Riders",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "50 kmpl",
      engine: "110.9cc",
      power: "8 bhp",
    },
    colors: [
          "Copper Brown",
          "Matte Black",
          "Matte Vernier Grey",
          "Pearl Blue"
    ],
    price: {
      exShowroom: 75712,
      onRoad: 90000,
      emiStarting: 2600,
    },
    images: {
      main: "/bikes/pleasure-xtec/main.png",
      variants: {
              "Copper Brown": "/bikes/Pleasure +XTEC/Copper Brown.jpg",
              "Matte Black": "/bikes/Pleasure +XTEC/Matte Black.jpg",
              "Matte Vernier Grey": "/bikes/Pleasure +XTEC/Matte Vernier Grey.jpg",
              "Pearl Blue": "/bikes/Pleasure +XTEC/Pearl Blue.jpg"
      },
    },
    features: [
      "Bluetooth Connectivity",
      "LED Projector Headlamp",
      "USB Charging Port",
      "Digital Console",
    ],
  },

  {
    id: 12,
    slug: "xoom-110",
    name: "Xoom 110",
    category: "scooter",
    tagline: "Zoom Through Every Street",
    inStock: true,
    isBestSeller: false,
    isNew: false,
    specs: {
      mileage: "45 kmpl",
      engine: "110.9cc",
      power: "8.05 bhp",
    },
    colors: [
          "Black",
          "Moon Yellow",
          "Polestar Blue"
    ],
    price: {
      exShowroom: 72701,
      onRoad: 87000,
      emiStarting: 2500,
    },
    images: {
      main: "/bikes/xoom-110/main.png",
      variants: {
              "Black": "/bikes/Xoom 110/Black.jpg",
              "Moon Yellow": "/bikes/Xoom 110/Moon Yellow.jpg",
              "Polestar Blue": "/bikes/Xoom 110/Polestar Blue.jpg"
      },
    },
    features: [
      "Modern Design",
      "Under Seat Storage",
      "LED Headlamp",
      "Alloy Wheels",
    ],
  },

  {
    id: 13,
    slug: "destini-xtec-125",
    name: "Destini 125 Xtec",
    category: "scooter",
    tagline: "125cc Power, Every Day",
    inStock: true,
    isBestSeller: true,
    isNew: false,
    specs: {
      mileage: "56 kmpl",
      engine: "124.7cc",
      power: "9.8 bhp",
    },
    colors: [
          "Groovy Red",
          "Gun Metal Grey",
          "Mystique Magenta"
    ],
    price: {
      exShowroom: 75838,
      onRoad: 91000,
      emiStarting: 2650,
    },
    images: {
      main: "/bikes/destini-xtec-125/main.png",
      variants: {
              "Groovy Red": "/bikes/Destini XTEC 125/Groovy Red.jpg",
              "Gun Metal Grey": "/bikes/Destini XTEC 125/Gun Metal Grey.jpg",
              "Mystique Magenta": "/bikes/Destini XTEC 125/Mystique Magenta.jpg"
      },
    },
    features: [
      "125cc Engine",
      "Bluetooth Connectivity",
      "LED Projector Headlamp",
      "USB Charging Port",
    ],
  },
]

// Helper filters
export const motorcycles = bikes.filter(
  (b) => b.category !== "scooter"
)
export const scooters = bikes.filter(
  (b) => b.category === "scooter"
)
export const bestSellers = bikes.filter((b) => b.isBestSeller)

export default bikes;
