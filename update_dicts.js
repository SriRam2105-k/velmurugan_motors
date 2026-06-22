const fs = require('fs');
const en = JSON.parse(fs.readFileSync('src/dictionaries/en.json', 'utf8'));
const ta = JSON.parse(fs.readFileSync('src/dictionaries/ta.json', 'utf8'));

const enBikeModels = {
    'hf-deluxe': {
      'tagline': 'Sabse Bharosemand, Sabse Sasta',
      'features': ['Integrated Braking System', 'Tubeless Tyres', 'Long Seat', 'Side Stand Engine Cut-off']
    },
    'hf-deluxe-pro': {
      'tagline': 'More Features, Same Trust',
      'features': ['Self Start', 'Alloy Wheels', 'Integrated Braking System', 'Tubeless Tyres']
    },
    'splendor-plus': {
      'tagline': 'India\'s Most Trusted Bike',
      'features': ['i3S Technology', 'Integrated Braking System', 'USB Charging Port', 'Tubeless Tyres']
    },
    'splendor-plus-20': {
      'tagline': 'New Look, Legendary Mileage',
      'features': ['Refreshed Design', 'i3S Technology', 'USB Charging Port', 'Integrated Braking System']
    },
    'splendor-plus-xtec': {
      'tagline': 'Splendor with Smart Tech',
      'features': ['Bluetooth Connectivity', 'LED Projector Headlamp', 'i3S Technology', 'USB Charging Port']
    },
    'passion-pro': {
      'tagline': 'Stylish, Efficient, Reliable',
      'features': ['LED Projector Headlamp', 'Tubeless Tyres', 'Self Start', 'Side Stand Engine Cut-off']
    },
    'super-splendor-125': {
      'tagline': '125cc Power, Splendor Trust',
      'features': ['125cc Engine', 'i3S Technology', 'Integrated Braking System', 'Digital Console']
    },
    'glamour-xtec-125': {
      'tagline': 'Smart Style for Every Road',
      'features': ['Bluetooth Connectivity', 'LED Projector Headlamp', 'TFT Instrument Cluster', 'USB Charging Port']
    },
    'xtreme-125': {
      'tagline': 'Born to Race, Built to Thrill',
      'features': ['Sport Design', 'LED Headlamp', 'Digital Console', 'Disc Brake']
    },
    'pleasure-plus-110': {
      'tagline': 'Why Should Boys Have All the Fun?',
      'features': ['Lightweight Design', 'Under Seat Storage', 'Front Pockets', 'LED Tail Lamp']
    },
    'pleasure-xtec': {
      'tagline': 'Smart Scooter for Smart Riders',
      'features': ['Bluetooth Connectivity', 'LED Projector Headlamp', 'USB Charging Port', 'Digital Console']
    },
    'xoom-110': {
      'tagline': 'Zoom Through Every Street',
      'features': ['Modern Design', 'Under Seat Storage', 'LED Headlamp', 'Alloy Wheels']
    },
    'destini-xtec-125': {
      'tagline': '125cc Power, Every Day',
      'features': ['125cc Engine', 'Bluetooth Connectivity', 'LED Projector Headlamp', 'USB Charging Port']
    }
};

const taBikeModels = {
    'hf-deluxe': {
      'tagline': 'மிகவும் நம்பகமான, மிகவும் மலிவான',
      'features': ['ஒருங்கிணைந்த பிரேக்கிங் சிஸ்டம்', 'டியூப்லெஸ் டயர்கள்', 'நீளமான இருக்கை', 'சைடு ஸ்டாண்ட் இன்ஜின் கட்-ஆஃப்']
    },
    'hf-deluxe-pro': {
      'tagline': 'அதிக அம்சங்கள், அதே நம்பிக்கை',
      'features': ['செல்ஃப் ஸ்டார்ட்', 'அலாய் வீல்கள்', 'ஒருங்கிணைந்த பிரேக்கிங் சிஸ்டம்', 'டியூப்லெஸ் டயர்கள்']
    },
    'splendor-plus': {
      'tagline': 'இந்தியாவின் மிகவும் நம்பகமான பைக்',
      'features': ['i3S தொழில்நுட்பம்', 'ஒருங்கிணைந்த பிரேக்கிங் சிஸ்டம்', 'USB சார்ஜிங் போர்ட்', 'டியூப்லெஸ் டயர்கள்']
    },
    'splendor-plus-20': {
      'tagline': 'புதிய தோற்றம், சிறந்த மைலேஜ்',
      'features': ['புதிய வடிவமைப்பு', 'i3S தொழில்நுட்பம்', 'USB சார்ஜிங் போர்ட்', 'ஒருங்கிணைந்த பிரேக்கிங் சிஸ்டம்']
    },
    'splendor-plus-xtec': {
      'tagline': 'ஸ்மார்ட் தொழில்நுட்பத்துடன் ஸ்பிளெண்டர்',
      'features': ['ப்ளூடூத் இணைப்பு', 'LED புரொஜெக்டர் ஹெட்லேம்ப்', 'i3S தொழில்நுட்பம்', 'USB சார்ஜிங் போர்ட்']
    },
    'passion-pro': {
      'tagline': 'ஸ்டைலான, திறமையான, நம்பகமான',
      'features': ['LED புரொஜெக்டர் ஹெட்லேம்ப்', 'டியூப்லெஸ் டயர்கள்', 'செல்ஃப் ஸ்டார்ட்', 'சைடு ஸ்டாண்ட் இன்ஜின் கட்-ஆஃப்']
    },
    'super-splendor-125': {
      'tagline': '125cc பவர், ஸ்பிளெண்டர் நம்பிக்கை',
      'features': ['125cc இன்ஜின்', 'i3S தொழில்நுட்பம்', 'ஒருங்கிணைந்த பிரேக்கிங் சிஸ்டம்', 'டிஜிட்டல் கன்சோல்']
    },
    'glamour-xtec-125': {
      'tagline': 'ஒவ்வொரு சாலைக்கும் ஸ்மார்ட் ஸ்டைல்',
      'features': ['ப்ளூடூத் இணைப்பு', 'LED புரொஜெக்டர் ஹெட்லேம்ப்', 'TFT இன்ஸ்ட்ரூமென்ட் க்ளஸ்டர்', 'USB சார்ஜிங் போர்ட்']
    },
    'xtreme-125': {
      'tagline': 'பந்தயத்திற்காக பிறந்த, சிலிர்ப்பான பைக்',
      'features': ['ஸ்போர்ட் வடிவமைப்பு', 'LED ஹெட்லேம்ப்', 'டிஜிட்டல் கன்சோல்', 'டிஸ்க் பிரேக்']
    },
    'pleasure-plus-110': {
      'tagline': 'சிறுவர்கள் மட்டும் ஏன் வேடிக்கை பார்க்க வேண்டும்?',
      'features': ['குறைந்த எடை வடிவமைப்பு', 'சீட்டின் கீழ் ஸ்டோரேஜ்', 'முன் பாக்கெட்டுகள்', 'LED டெயில் லேம்ப்']
    },
    'pleasure-xtec': {
      'tagline': 'ஸ்மார்ட் ரைடர்களுக்கான ஸ்மார்ட் ஸ்கூட்டர்',
      'features': ['ப்ளூடூத் இணைப்பு', 'LED புரொஜெக்டர் ஹெட்லேம்ப்', 'USB சார்ஜிங் போர்ட்', 'டிஜிட்டல் கன்சோல்']
    },
    'xoom-110': {
      'tagline': 'ஒவ்வொரு தெருவிலும் ஜூம் செய்யுங்கள்',
      'features': ['நவீன வடிவமைப்பு', 'சீட்டின் கீழ் ஸ்டோரேஜ்', 'LED ஹெட்லேம்ப்', 'அலாய் வீல்கள்']
    },
    'destini-xtec-125': {
      'tagline': '125cc பவர், ஒவ்வொரு நாளும்',
      'features': ['125cc இன்ஜின்', 'ப்ளூடூத் இணைப்பு', 'LED புரொஜெக்டர் ஹெட்லேம்ப்', 'USB சார்ஜிங் போர்ட்']
    }
};

en.bike_models = enBikeModels;
ta.bike_models = taBikeModels;

fs.writeFileSync('src/dictionaries/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/dictionaries/ta.json', JSON.stringify(ta, null, 2));
console.log("Done");
