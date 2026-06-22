const fs = require('fs');

const images = {
  'destini-xtec-125': {
    'colors': [
      'Groovy Red',
      'Gun Metal Grey',
      'Mystique Magenta'
    ],
    'variants': {
      'Groovy Red': '/bikes/Destini XTEC 125/Groovy Red.jpg',
      'Gun Metal Grey': '/bikes/Destini XTEC 125/Gun Metal Grey.jpg',
      'Mystique Magenta': '/bikes/Destini XTEC 125/Mystique Magenta.jpg'
    }
  },
  'glamour-xtec-125': {
    'colors': [
      'Black Metalic Silver',
      'Black Sports Red',
      'Candy Blazing Red',
      'Techno Blu Met Blk'
    ],
    'variants': {
      'Black Metalic Silver': '/bikes/Glamour XTEC 125/Black Metalic Silver.jpg',
      'Black Sports Red': '/bikes/Glamour XTEC 125/Black Sports Red.jpg',
      'Candy Blazing Red': '/bikes/Glamour XTEC 125/Candy Blazing Red.jpg',
      'Techno Blu Met Blk': '/bikes/Glamour XTEC 125/Techno Blu Met Blk.jpg'
    }
  },
  'hf-deluxe': {
    'colors': [
      'Bank Funk Lime Yellow',
      'Black Grey Stripe',
      'Black Nexus Blue',
      'Black Red Stripe'
    ],
    'variants': {
      'Bank Funk Lime Yellow': '/bikes/HF Deluxe/Bank Funk Lime Yellow.jpg',
      'Black Grey Stripe': '/bikes/HF Deluxe/Black Grey Stripe.jpg',
      'Black Nexus Blue': '/bikes/HF Deluxe/Black Nexus Blue.jpg',
      'Black Red Stripe': '/bikes/HF Deluxe/Black Red Stripe.jpg'
    }
  },
  'hf-deluxe-pro': {
    'colors': [
      'Bank Funk Lime Yellow',
      'Black Grey Stripe',
      'Black Nexus Blue',
      'Black Red Stripe'
    ],
    'variants': {
      'Bank Funk Lime Yellow': '/bikes/HF Deluxe/Bank Funk Lime Yellow.jpg',
      'Black Grey Stripe': '/bikes/HF Deluxe/Black Grey Stripe.jpg',
      'Black Nexus Blue': '/bikes/HF Deluxe/Black Nexus Blue.jpg',
      'Black Red Stripe': '/bikes/HF Deluxe/Black Red Stripe.jpg'
    }
  },
  'passion-pro': {
    'colors': [
      'Black Brown Stripes',
      'Black Heavy Grey',
      'Black Nexus Blue',
      'Sports Red Black'
    ],
    'variants': {
      'Black Brown Stripes': '/bikes/Passion/Black Brown Stripes.jpg',
      'Black Heavy Grey': '/bikes/Passion/Black Heavy Grey.jpg',
      'Black Nexus Blue': '/bikes/Passion/Black Nexus Blue.jpg',
      'Sports Red Black': '/bikes/Passion/Sports Red Black.jpg'
    }
  },
  'pleasure-xtec': {
    'colors': [
      'Copper Brown',
      'Matte Black',
      'Matte Vernier Grey',
      'Pearl Blue'
    ],
    'variants': {
      'Copper Brown': '/bikes/Pleasure +XTEC/Copper Brown.jpg',
      'Matte Black': '/bikes/Pleasure +XTEC/Matte Black.jpg',
      'Matte Vernier Grey': '/bikes/Pleasure +XTEC/Matte Vernier Grey.jpg',
      'Pearl Blue': '/bikes/Pleasure +XTEC/Pearl Blue.jpg'
    }
  },
  'pleasure-plus-110': {
    'colors': [
      'Copper Brown',
      'Matte Black',
      'Matte Vernier Grey',
      'Pearl Blue'
    ],
    'variants': {
      'Copper Brown': '/bikes/Pleasure +XTEC/Copper Brown.jpg',
      'Matte Black': '/bikes/Pleasure +XTEC/Matte Black.jpg',
      'Matte Vernier Grey': '/bikes/Pleasure +XTEC/Matte Vernier Grey.jpg',
      'Pearl Blue': '/bikes/Pleasure +XTEC/Pearl Blue.jpg'
    }
  },
  'splendor-plus': {
    'colors': [
      'Black Heavy Grey',
      'Black Red Purple',
      'Blue Black',
      'Force Silver',
      'Sports Red Black'
    ],
    'variants': {
      'Black Heavy Grey': '/bikes/Splendor +/Black Heavy Grey.jpg',
      'Black Red Purple': '/bikes/Splendor +/Black Red Purple.jpg',
      'Blue Black': '/bikes/Splendor +/Blue Black.jpg',
      'Force Silver': '/bikes/Splendor +/Force Silver.jpg',
      'Sports Red Black': '/bikes/Splendor +/Sports Red Black.jpg'
    }
  },
  'splendor-plus-xtec': {
    'colors': [
      'Black Sparking Blue',
      'Black Tornado Grey',
      'Red Black'
    ],
    'variants': {
      'Black Sparking Blue': '/bikes/Splendor + XTEC/Black Sparking Blue.jpg',
      'Black Tornado Grey': '/bikes/Splendor + XTEC/Black Tornado Grey.jpg',
      'Red Black': '/bikes/Splendor + XTEC/Red Black.jpg'
    }
  },
  'splendor-plus-20': {
    'colors': [
      'Black Heavy Grey',
      'Matte Grey',
      'Nobel Red'
    ],
    'variants': {
      'Black Heavy Grey': '/bikes/Splendor + XTEC 2.0/Black Heavy Grey.jpg',
      'Matte Grey': '/bikes/Splendor + XTEC 2.0/Matte Grey.jpg',
      'Nobel Red': '/bikes/Splendor + XTEC 2.0/Nobel Red.jpg'
    }
  },
  'xoom-110': {
    'colors': [
      'Black',
      'Moon Yellow',
      'Polestar Blue'
    ],
    'variants': {
      'Black': '/bikes/Xoom 110/Black.jpg',
      'Moon Yellow': '/bikes/Xoom 110/Moon Yellow.jpg',
      'Polestar Blue': '/bikes/Xoom 110/Polestar Blue.jpg'
    }
  },
  'xtreme-125': {
    'colors': [
      'Black Leaf Green',
      'Black Mattshadow Grey',
      'Black Pearl Red'
    ],
    'variants': {
      'Black Leaf Green': '/bikes/Xtreme 125R/Black Leaf Green.jpg',
      'Black Mattshadow Grey': '/bikes/Xtreme 125R/Black Mattshadow Grey.jpg',
      'Black Pearl Red': '/bikes/Xtreme 125R/Black Pearl Red.jpg'
    }
  }
};

function updateBikesTs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [slug, data] of Object.entries(images)) {
    const slugRegex = new RegExp('slug:\\s*"' + slug + '"[\\s\\S]*?features:', 'g');
    content = content.replace(slugRegex, (match) => {
      let updated = match.replace(/colors:\s*\[.*?\]/s, `colors: ${JSON.stringify(data.colors, null, 6).replace(/\n/g, '\n    ')}`);
      const variantsStr = `variants: ${JSON.stringify(data.variants, null, 8).replace(/\n/g, '\n      ')}`;
      if (updated.includes('variants:')) {
        updated = updated.replace(/variants:\s*\{.*?\}/s, variantsStr);
      } else {
        updated = updated.replace(/(main:\s*".*?",)/, `$1\n      ${variantsStr},`);
      }
      return updated;
    });
  }
  fs.writeFileSync(filePath, content);
}

function updateSeedTs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [slug, data] of Object.entries(images)) {
    // Replace colors: ["..."]
    const colorRegex = new RegExp('(slug:\\s*"' + slug + '".*?)colors:\\s*\\[.*?\\]');
    content = content.replace(colorRegex, `$1colors: ${JSON.stringify(data.colors)}`);
    
    // Replace image_variants: {...} or image_variants: null
    const variantsRegex = new RegExp('(slug:\\s*"' + slug + '".*?)image_variants:\\s*(\\{.*?\\}|null)');
    content = content.replace(variantsRegex, `$1image_variants: ${JSON.stringify(data.variants)}`);
  }
  fs.writeFileSync(filePath, content);
}

updateBikesTs('c:/Users/srira/OneDrive/Desktop/freelance/VELMURUGAN MOTORS/src/data/bikes.ts');
updateSeedTs('c:/Users/srira/OneDrive/Desktop/freelance/VELMURUGAN MOTORS/scripts/seed-supabase.ts');
console.log('Done!');
