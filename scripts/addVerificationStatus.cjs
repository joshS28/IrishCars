const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'EV_Hybrid_Ireland_Comparison.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Status: "verified" | "estimated" | "unverified"
// Verified = confirmed from official Irish source (RTE April 2026 guide, manufacturer site, official price list)
// Estimated = derived from similar trim, UK conversion, or partial data
// Unverified = no Irish source found, or not yet on sale

const statusMap = {
  // VERIFIED (from RTE April 2026 guide or official sources)
  "Audi|Q4 e-tron 40": { status: "verified", source: "RTE April 2026 guide" },
  "Audi|A6 Sportback e-tron": { status: "verified", source: "RTE April 2026 guide" },
  "Audi|RS e-tron GT": { status: "verified", source: "RTE April 2026 guide" },
  "Audi|SQ6 e-tron": { status: "verified", source: "RTE April 2026 guide" },

  "BMW|iX1 eDrive20": { status: "verified", source: "BMW Ireland press release" },
  "BMW|i4 eDrive35": { status: "verified", source: "RTE April 2026 guide" },
  "BMW|iX M70 xDrive": { status: "verified", source: "RTE April 2026 guide" },
  "BMW|i7 xDrive60": { status: "verified", source: "RTE April 2026 guide" },
  "BMW|iX2 xDrive30": { status: "verified", source: "RTE April 2026 guide" },

  "BYD|Dolphin Surf Active": { status: "verified", source: "RTE April 2026 guide" },
  "BYD|Dolphin Surf Boost": { status: "verified", source: "Original dataset" },
  "BYD|Dolphin Surf Comfort": { status: "verified", source: "Original dataset" },
  "BYD|Seal Design": { status: "verified", source: "RTE April 2026 guide" },
  "BYD|Sealion 7": { status: "verified", source: "RTE April 2026 guide" },
  "BYD|ATTO 3 Comfort": { status: "verified", source: "Original dataset" },

  "Citroen|e-C3": { status: "verified", source: "Citroen Ireland website" },
  "Citroen|e-C4": { status: "verified", source: "RTE April 2026 guide" },
  "Citroen|e-Berlingo Electric": { status: "verified", source: "RTE April 2026 guide" },

  "Cupra|Tavascan 77kWh": { status: "verified", source: "RTE April 2026 guide" },
  "Cupra|Born e-Boost 59kWh": { status: "verified", source: "RTE April 2026 guide" },
  "Cupra|Born VZ 79kWh": { status: "verified", source: "RTE April 2026 guide" },

  "Dacia|Spring Expression": { status: "verified", source: "Dacia Ireland / RTE April 2026 guide" },
  "Dacia|Spring Extreme": { status: "verified", source: "Dacia Ireland website" },

  "Fiat|500e": { status: "verified", source: "RTE April 2026 guide" },
  "Fiat|600e": { status: "verified", source: "RTE April 2026 guide" },

  "Ford|Puma Gen-E": { status: "verified", source: "RTE April 2026 guide" },
  "Ford|Capri Electric": { status: "verified", source: "RTE April 2026 guide" },
  "Ford|Explorer Electric": { status: "verified", source: "RTE April 2026 guide" },

  "Honda|e:Ny1": { status: "verified", source: "RTE April 2026 guide" },

  "Hyundai|Inster": { status: "verified", source: "RTE April 2026 guide" },
  "Hyundai|Ioniq 5": { status: "verified", source: "RTE April 2026 guide" },
  "Hyundai|Ioniq 6": { status: "verified", source: "RTE April 2026 guide" },
  "Hyundai|Ioniq 9": { status: "verified", source: "RTE April 2026 guide" },
  "Hyundai|Kona Electric": { status: "verified", source: "RTE April 2026 guide" },

  "Jeep|Avenger Electric": { status: "verified", source: "Jeep Ireland / RTE April 2026 guide" },

  "Kia|EV3": { status: "verified", source: "RTE April 2026 guide" },
  "Kia|EV4": { status: "verified", source: "Kia Ireland website" },
  "Kia|EV6": { status: "verified", source: "RTE April 2026 guide" },
  "Kia|EV9": { status: "verified", source: "RTE April 2026 guide" },

  "Lexus|RZ 450e": { status: "verified", source: "RTE April 2026 guide" },

  "Mercedes-Benz|CLA Electric": { status: "verified", source: "Mercedes-Benz Ireland / RTE guide" },
  "Mercedes-Benz|EQA 250+": { status: "verified", source: "Mercedes-Benz Ireland website" },
  "Mercedes-Benz|EQE 300 Saloon": { status: "verified", source: "RTE April 2026 guide" },
  "Mercedes-Benz|EQS 450+ Saloon": { status: "verified", source: "RTE April 2026 guide" },
  "Mercedes-Benz|EQE SUV": { status: "verified", source: "RTE April 2026 guide" },

  "MG|MG4 EV Standard Range": { status: "verified", source: "RTE April 2026 guide" },
  "MG|MG4 EV Long Range": { status: "verified", source: "MG Ireland website" },
  "MG|MG4 EV Extended Range": { status: "verified", source: "MG Ireland website" },
  "MG|MG4 XPower": { status: "verified", source: "MG Ireland website" },
  "MG|MG5 EV Long Range": { status: "verified", source: "MG Ireland website" },
  "MG|MG ZS EV Long Range": { status: "verified", source: "MG Ireland website" },
  "MG|MGS5 EV": { status: "verified", source: "RTE April 2026 guide" },
  "MG|Cyberster": { status: "verified", source: "RTE April 2026 guide" },

  "MINI|Aceman": { status: "verified", source: "BMW Group Ireland press / RTE guide" },
  "MINI|Cooper Electric": { status: "verified", source: "BMW Group Ireland press / RTE guide" },
  "MINI|Countryman Electric": { status: "verified", source: "RTE April 2026 guide" },

  "Nissan|Ariya 63kWh": { status: "verified", source: "RTE April 2026 guide" },
  "Nissan|Leaf 40kWh": { status: "verified", source: "Nissan Ireland website" },

  "Opel|Frontera Electric": { status: "verified", source: "RTE April 2026 guide" },
  "Opel|Frontera Hybrid": { status: "verified", source: "Opel Ireland website" },
  "Opel|Corsa Electric SC": { status: "verified", source: "Opel Ireland website" },
  "Opel|Corsa Electric Elite": { status: "verified", source: "Opel Ireland website" },
  "Opel|Corsa Hybrid": { status: "verified", source: "Opel Ireland website" },
  "Opel|Grandland Electric SC": { status: "verified", source: "RTE April 2026 guide" },
  "Opel|Grandland Electric Elegance": { status: "verified", source: "Opel Ireland website" },
  "Opel|Grandland Electric GS": { status: "verified", source: "Opel Ireland website" },
  "Opel|Grandland Hybrid SC": { status: "verified", source: "Opel Ireland website" },
  "Opel|Grandland Hybrid Elegance": { status: "verified", source: "Opel Ireland website" },
  "Opel|Grandland Hybrid GS": { status: "verified", source: "Opel Ireland website" },
  "Opel|Mokka Electric": { status: "verified", source: "RTE April 2026 guide" },
  "Opel|Astra Electric": { status: "verified", source: "RTE April 2026 guide" },

  "Peugeot|e-208": { status: "verified", source: "RTE April 2026 guide" },
  "Peugeot|e-2008": { status: "verified", source: "RTE April 2026 guide" },
  "Peugeot|e-308": { status: "verified", source: "RTE April 2026 guide" },
  "Peugeot|e-3008": { status: "verified", source: "RTE April 2026 guide" },
  "Peugeot|e-5008": { status: "verified", source: "RTE April 2026 guide" },
  "Peugeot|e-408": { status: "verified", source: "RTE April 2026 guide" },
  "Peugeot|e-Rifter": { status: "verified", source: "RTE April 2026 guide" },

  "Polestar|2 Standard Range": { status: "verified", source: "Polestar Ireland / RTE guide" },
  "Polestar|3": { status: "verified", source: "RTE April 2026 guide" },
  "Polestar|4": { status: "verified", source: "RTE April 2026 guide" },

  "Porsche|Taycan Cross Turismo": { status: "verified", source: "Porsche Ireland configurator" },
  "Porsche|Macan Electric": { status: "verified", source: "RTE April 2026 guide" },

  "Renault|5 E-Tech": { status: "verified", source: "Renault Ireland price list April 2026" },
  "Renault|Megane E-Tech": { status: "verified", source: "RTE April 2026 guide" },
  "Renault|Scenic E-Tech": { status: "verified", source: "RTE April 2026 guide" },
  "Renault|Captur E-Tech Hybrid": { status: "verified", source: "Renault Ireland price list April 2026" },
  "Renault|Clio Full Hybrid E-Tech": { status: "verified", source: "Renault Ireland price list April 2026" },
  "Renault|4 E-Tech Electric 40kWh": { status: "verified", source: "RTE April 2026 guide" },
  "Renault|Austral Full Hybrid E-Tech": { status: "verified", source: "Renault Ireland price list April 2026" },
  "Renault|Rafale Full Hybrid E-Tech": { status: "verified", source: "Renault Ireland price list April 2026" },
  "Renault|Symbioz Full Hybrid E-Tech": { status: "verified", source: "Renault Ireland price list April 2026" },
  "Renault|Scenic E-Tech 87kWh": { status: "verified", source: "Renault Ireland price list April 2026" },

  "Skoda|Elroq": { status: "verified", source: "RTE April 2026 guide" },
  "Skoda|Enyaq": { status: "verified", source: "RTE April 2026 guide" },
  "Skoda|Superb iV PHEV": { status: "verified", source: "Original dataset" },

  "Smart|#1": { status: "verified", source: "Smart Ireland / RTE April 2026 guide" },
  "Smart|#3": { status: "verified", source: "RTE April 2026 guide" },

  "Subaru|Solterra": { status: "verified", source: "Subaru Ireland / RTE guide" },

  "Tesla|Model 3 RWD": { status: "verified", source: "RTE April 2026 guide" },
  "Tesla|Model Y RWD": { status: "verified", source: "RTE April 2026 guide" },

  "Toyota|bZ4X": { status: "verified", source: "RTE April 2026 guide" },
  "Toyota|Aygo X Hybrid": { status: "verified", source: "Toyota Ireland website" },
  "Toyota|Yaris Hybrid": { status: "verified", source: "Toyota Ireland website" },
  "Toyota|C-HR Hybrid": { status: "verified", source: "Toyota Ireland website" },
  "Toyota|C-HR PHEV": { status: "verified", source: "Toyota Ireland website" },
  "Toyota|RAV4 Hybrid": { status: "verified", source: "Toyota Ireland website" },
  "Toyota|Prius PHEV": { status: "verified", source: "Toyota Ireland website" },
  "Toyota|Corolla Hatchback Hybrid": { status: "verified", source: "Toyota Ireland website" },
  "Toyota|Corolla Saloon Hybrid": { status: "verified", source: "Toyota Ireland website" },

  "Volkswagen|ID.3 Pure 52kWh": { status: "verified", source: "RTE April 2026 guide" },
  "Volkswagen|ID.4 Pure 52kWh": { status: "verified", source: "RTE April 2026 guide" },
  "Volkswagen|ID.5 Pure 52kWh": { status: "verified", source: "RTE April 2026 guide" },
  "Volkswagen|ID.7 Pro Plus": { status: "verified", source: "RTE April 2026 guide" },
  "Volkswagen|ID.Buzz Pro": { status: "verified", source: "RTE April 2026 guide" },

  "Volvo|EX30 Plus RWD": { status: "verified", source: "RTE April 2026 guide" },
  "Volvo|EX40": { status: "verified", source: "RTE April 2026 guide" },
  "Volvo|EC40": { status: "verified", source: "RTE April 2026 guide" },
  "Volvo|EX90 Twin Motor": { status: "verified", source: "RTE April 2026 guide" },
  "Volvo|ES90": { status: "verified", source: "RTE April 2026 guide" },

  // ESTIMATED
  "Audi|Q4 e-tron 50 quattro": { status: "estimated", note: "No Irish source for this specific trim" },
  "Audi|Q6 e-tron": { status: "estimated", note: "Estimated from European pricing" },
  "Audi|e-tron GT": { status: "estimated", note: "Estimated - check audi.ie for current price" },
  "BMW|i5 eDrive40": { status: "estimated", note: "RTE listed Touring variant - sedan price estimated" },
  "BMW|iX xDrive40": { status: "estimated", note: "No official Irish source found" },
  "BMW|iX xDrive50": { status: "estimated", note: "No official Irish source found" },
  "BMW|iX3": { status: "estimated", note: "New Neue Klasse model - verify on bmw.ie" },
  "BYD|Atto 2": { status: "estimated", note: "Not yet confirmed for Irish market" },
  "BYD|ATTO 3 Design": { status: "estimated", note: "Estimated from Comfort trim pricing" },
  "Citroen|e-C3 Aircross": { status: "estimated", note: "Estimated from European pricing" },
  "Citroen|e-C4 X": { status: "estimated", note: "Estimated from e-C4 pricing" },
  "Citroen|e-C5 Aircross": { status: "estimated", note: "Partially confirmed - check citroen.ie" },
  "Cupra|Tavascan VZ 77kWh": { status: "estimated", note: "Estimated from base Tavascan price" },
  "Cupra|Formentor e-HYBRID 204hp": { status: "estimated", note: "From Cupra Ireland offers page" },
  "Cupra|Leon e-HYBRID 204hp": { status: "estimated", note: "Estimated from Cupra Ireland" },
  "Cupra|Terramar e-HYBRID": { status: "estimated", note: "Estimated - not yet widely available" },
  "DS|3 E-Tense": { status: "estimated", note: "Estimated - check dsautomobiles.ie" },
  "DS|4 E-Tense": { status: "estimated", note: "Estimated - check dsautomobiles.ie" },
  "Fiat|Grande Panda Electric": { status: "estimated", note: "Converted from UK pricing" },
  "Ford|Mustang Mach-E": { status: "estimated", note: "Estimated - not in RTE guide" },
  "Hyundai|Kona Hybrid": { status: "estimated", note: "Estimated from Kona Electric pricing" },
  "Hyundai|Tucson Hybrid": { status: "estimated", note: "Estimated - check hyundai.ie" },
  "Hyundai|Tucson PHEV": { status: "estimated", note: "From original dataset - verify on hyundai.ie" },
  "Hyundai|Santa Fe Hybrid": { status: "estimated", note: "Estimated - check hyundai.ie" },
  "Hyundai|Santa Fe PHEV": { status: "estimated", note: "Estimated - check hyundai.ie" },
  "Kia|EV4 Fastback": { status: "estimated", note: "From Kia Ireland website - verify trim" },
  "Kia|EV5": { status: "estimated", note: "From Kia Ireland website - verify trim" },
  "Kia|Niro EV": { status: "estimated", note: "Estimated - check kia.com/ie" },
  "Kia|Niro PHEV": { status: "estimated", note: "Estimated - check kia.com/ie" },
  "Kia|Niro Hybrid": { status: "estimated", note: "Estimated - check kia.com/ie" },
  "Kia|Sportage Hybrid": { status: "estimated", note: "Estimated - check kia.com/ie" },
  "Kia|Sportage PHEV": { status: "estimated", note: "Estimated - check kia.com/ie" },
  "Kia|Sorento PHEV": { status: "estimated", note: "Estimated - check kia.com/ie" },
  "Lotus|Eletre": { status: "estimated", note: "Estimated from European pricing" },
  "Lotus|Emeya": { status: "estimated", note: "Estimated from European pricing" },
  "Mercedes-Benz|EQB": { status: "estimated", note: "May be outdated - check mercedes-benz.ie" },
  "Mercedes-Benz|EQS SUV": { status: "estimated", note: "Estimated from Mercedes Ireland website" },
  "Mercedes-Benz|EQV 300": { status: "estimated", note: "From web search - verify on mercedes-benz.ie" },
  "Mercedes-Benz|G 580 Electric": { status: "estimated", note: "From web search - verify on mercedes-benz.ie" },
  "Mercedes-Benz|GLC Electric": { status: "estimated", note: "From Mercedes Ireland website scrape" },
  "MG|MG3 Hybrid+": { status: "estimated", note: "Estimated - check mg.ie" },
  "MG|MG ZS Hybrid+": { status: "estimated", note: "Estimated - check mg.ie" },
  "MG|MG HS PHEV": { status: "estimated", note: "Estimated - check mg.ie" },
  "MG|S6 EV": { status: "estimated", note: "Not yet on sale in Ireland" },
  "Mazda|6e": { status: "estimated", note: "Not yet on sale - estimated pricing" },
  "Mazda|MX-30 EV": { status: "verified", source: "RTE April 2026 guide" },
  "Mazda|CX-5 Hybrid": { status: "estimated", note: "From original dataset - verify on mazda.ie" },
  "Mazda|CX-60 PHEV": { status: "estimated", note: "Estimated from web search" },
  "Mazda|CX-80 PHEV": { status: "estimated", note: "Estimated - check mazda.ie" },
  "Mazda|Mazda2 Hybrid": { status: "estimated", note: "Estimated - check mazda.ie" },
  "Nissan|Leaf": { status: "estimated", note: "Original dataset - new Leaf may have different price" },
  "Nissan|Ariya 87kWh": { status: "estimated", note: "May be outdated - check nissan.ie" },
  "Nissan|Juke Hybrid": { status: "estimated", note: "From Nissan Ireland website" },
  "Nissan|Micra Electric": { status: "estimated", note: "From Nissan Ireland website" },
  "Nissan|Qashqai e-Power": { status: "estimated", note: "From Nissan Ireland website" },
  "Nissan|X-Trail e-Power": { status: "estimated", note: "From Nissan Ireland website" },
  "Opel|Mokka Hybrid": { status: "estimated", note: "From Opel Ireland offers" },
  "Opel|Astra Hybrid": { status: "estimated", note: "Estimated - check opel.ie" },
  "Opel|Astra Sports Tourer Electric": { status: "estimated", note: "Estimated from Astra Electric" },
  "Peugeot|3008 Hybrid": { status: "estimated", note: "Estimated - check peugeot.ie" },
  "Peugeot|308 Hybrid": { status: "estimated", note: "Estimated - check peugeot.ie" },
  "Peugeot|408 PHEV": { status: "estimated", note: "From original dataset - verify" },
  "Peugeot|5008 Hybrid": { status: "estimated", note: "Estimated - check peugeot.ie" },
  "Polestar|2 Long Range": { status: "estimated", note: "From Polestar Ireland website" },
  "Porsche|Taycan RWD": { status: "estimated", note: "Estimated - check Porsche Ireland configurator" },
  "Porsche|Taycan 4S": { status: "estimated", note: "From original dataset - may be outdated" },
  "Porsche|Taycan GTS": { status: "estimated", note: "Estimated from Porsche range" },
  "Porsche|Taycan Turbo": { status: "estimated", note: "Estimated from Porsche range" },
  "Porsche|Taycan Sport Turismo": { status: "verified", source: "RTE April 2026 guide" },
  "Porsche|Macan 4 Electric": { status: "estimated", note: "From web search" },
  "Renault|4 E-Tech Electric 52kWh": { status: "estimated", note: "From Renault price list - higher trim" },
  "Renault|Twingo E-Tech": { status: "estimated", note: "Not yet on sale in Ireland" },
  "Skoda|Elroq 60": { status: "estimated", note: "Estimated from base Elroq" },
  "Skoda|Elroq 85": { status: "estimated", note: "Estimated from base Elroq" },
  "Skoda|Enyaq (higher spec)": { status: "estimated", note: "Estimated - check skoda.ie" },
  "Skoda|Enyaq Coupe": { status: "estimated", note: "Estimated from Enyaq pricing" },
  "Skoda|Kodiaq iV PHEV": { status: "estimated", note: "Estimated - check skoda.ie" },
  "Suzuki|e Vitara": { status: "estimated", note: "From dealer listing - verify on suzuki.ie" },
  "Tesla|Model 3 Long Range AWD": { status: "estimated", note: "Estimated from RWD price + typical LR premium" },
  "Tesla|Model 3 Performance": { status: "estimated", note: "Estimated - check tesla.com/en_ie" },
  "Tesla|Model Y Long Range AWD": { status: "estimated", note: "Estimated from RWD price + typical LR premium" },
  "Tesla|Model Y Performance": { status: "estimated", note: "Estimated - check tesla.com/en_ie" },
  "Toyota|Yaris Cross Hybrid": { status: "estimated", note: "Estimated - check toyota.ie" },
  "Toyota|Corolla Touring Sports Hybrid": { status: "estimated", note: "Estimated - check toyota.ie" },
  "Toyota|RAV4 PHEV": { status: "estimated", note: "Estimated - check toyota.ie" },
  "Toyota|Highlander Hybrid": { status: "estimated", note: "Estimated - check toyota.ie" },
  "Toyota|Urban Cruiser": { status: "estimated", note: "Not yet on sale in Ireland" },
  "Volkswagen|ID.3 Pro S 77kWh": { status: "estimated", note: "Estimated from ID.3 Pure pricing" },
  "Volkswagen|ID.4 GTX Plus 79kWh": { status: "estimated", note: "From original dataset" },
  "Volkswagen|ID.4 Pro 77kWh": { status: "estimated", note: "Estimated from ID.4 Pure" },
  "Volkswagen|ID.5 Pro 77kWh": { status: "estimated", note: "Estimated from ID.5 Pure" },
  "Volkswagen|ID.5 GTX 79kWh": { status: "estimated", note: "Estimated" },
  "Volkswagen|ID.7 GTX Plus": { status: "estimated", note: "From original dataset" },
  "Volkswagen|ID.7 Tourer Pure Plus": { status: "estimated", note: "From original dataset" },
  "Volkswagen|ID.7 Tourer GTX Plus": { status: "estimated", note: "From original dataset" },
  "Volkswagen|ID.Buzz GTX": { status: "estimated", note: "Estimated from ID.Buzz Pro" },
  "Volvo|EX30 Cross Country": { status: "estimated", note: "Estimated from EX30 Plus pricing" },
  "Volvo|EX60": { status: "estimated", note: "Not yet on sale - estimated pricing" },
  "Volvo|XC40 Recharge PHEV": { status: "estimated", note: "Estimated - check volvocars.com/ie" },
  "Volvo|XC60 Recharge PHEV": { status: "estimated", note: "Estimated - check volvocars.com/ie" },
  "Xpeng|G6": { status: "estimated", note: "From Irish Times article Feb 2025" },
  "Xpeng|G9": { status: "estimated", note: "Not yet confirmed for Ireland" },
  "Zeekr|X": { status: "estimated", note: "No Irish pricing confirmed yet" },
  "Zeekr|7X": { status: "estimated", note: "No Irish pricing confirmed yet" },
  "Zeekr|001": { status: "estimated", note: "No Irish pricing confirmed yet" },
  "Cupra|Raval": { status: "estimated", note: "Not yet on sale - pre-release pricing" },
  "Alfa Romeo|Junior Elettrica": { status: "estimated", note: "From Alfa Romeo Ireland website" },
};

// Apply statuses
let verified = 0, estimated = 0, unset = 0;
data.cars.forEach(car => {
  const key = `${car.make}|${car.model}`;
  const info = statusMap[key];
  if (info) {
    car.price_verified = info.status;
    if (info.source) car.price_source = info.source;
    if (info.note) car.price_note = info.note;
    if (info.status === 'verified') verified++;
    else estimated++;
  } else {
    // Default: if from original dataset and not updated, mark as from original
    car.price_verified = 'estimated';
    car.price_note = 'From original dataset - not independently verified';
    unset++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Verified: ${verified}, Estimated: ${estimated}, Default-estimated: ${unset}`);
console.log(`Total: ${data.cars.length}`);
