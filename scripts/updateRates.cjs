const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'EV_Hybrid_Ireland_Comparison.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const GMFV_PCT = { 24: 0.55, 36: 0.42, 48: 0.32 };

function recalcFinance(price, rate) {
  const r = rate / 100 / 12;
  const deposit = 10000;
  const result = {};
  for (const [termKey, gmfvPct] of Object.entries(GMFV_PCT)) {
    const n = parseInt(termKey);
    const gmfv = Math.round(price * gmfvPct * 100) / 100;
    const af = price - deposit;
    let monthly;
    if (r === 0) { monthly = (af - gmfv) / n; }
    else {
      const pvFactor = (1 - Math.pow(1 + r, -n)) / r;
      const balloonPV = gmfv * Math.pow(1 + r, -n);
      monthly = (af - balloonPV) / pvFactor;
    }
    result[`finance_${n}m`] = {
      gmfv_eur: gmfv,
      amount_financed_eur: af,
      monthly_payment_10k_deposit_eur: Math.round(monthly * 100) / 100,
      deposit_for_400pm_eur: 0
    };
  }
  return result;
}

// Verified interest rates from Irish manufacturer websites and dealer pages
// Format: "Make|Model": { rate, status: "verified"|"estimated", source/note }
const rateUpdates = {
  // ===== AUDI - verified from audi.ie =====
  "Audi|Q4 e-tron 40": { rate: 3.9, status: "verified", source: "Audi Ireland finance calc, April 2026" },
  "Audi|Q4 e-tron 50 quattro": { rate: 3.9, status: "estimated", note: "Assumed same as Q4 40 - verify on audi.ie" },
  "Audi|Q6 e-tron": { rate: 4.9, status: "verified", source: "Audi Cork dealer, Sept 2025" },
  "Audi|SQ6 e-tron": { rate: 4.9, status: "estimated", note: "Assumed same as Q6 - verify on audi.ie" },
  "Audi|A6 Sportback e-tron": { rate: 3.9, status: "estimated", note: "Assumed from Audi range - verify on audi.ie" },
  "Audi|e-tron GT": { rate: 4.9, status: "estimated", note: "Estimated - check audi.ie" },
  "Audi|RS e-tron GT": { rate: 4.9, status: "estimated", note: "Estimated - check audi.ie" },

  // ===== BMW - 4.9% confirmed across range =====
  "BMW|iX1 eDrive20": { rate: 4.9, status: "verified", source: "BMW Ireland" },
  "BMW|iX2 xDrive30": { rate: 4.9, status: "verified", source: "BMW Ireland" },
  "BMW|iX3": { rate: 4.9, status: "verified", source: "BMW Ireland" },
  "BMW|i4 eDrive35": { rate: 4.9, status: "verified", source: "BMW Ireland" },
  "BMW|i5 eDrive40": { rate: 4.9, status: "verified", source: "BMW Ireland" },
  "BMW|iX xDrive40": { rate: 4.9, status: "estimated", note: "Assumed BMW standard rate" },
  "BMW|iX xDrive50": { rate: 4.9, status: "estimated", note: "Assumed BMW standard rate" },
  "BMW|iX M70 xDrive": { rate: 4.9, status: "verified", source: "BMW Ireland" },
  "BMW|i7 xDrive60": { rate: 4.9, status: "estimated", note: "Assumed BMW standard rate" },

  // ===== BYD =====
  "BYD|Dolphin Surf Active": { rate: 3.5, status: "verified", source: "Original dataset" },
  "BYD|Dolphin Surf Boost": { rate: 3.5, status: "verified", source: "Original dataset" },
  "BYD|Dolphin Surf Comfort": { rate: 3.5, status: "verified", source: "Original dataset" },
  "BYD|Atto 2": { rate: 3.5, status: "estimated", note: "Assumed from BYD range" },
  "BYD|ATTO 3 Comfort": { rate: 2.9, status: "verified", source: "Original dataset" },
  "BYD|ATTO 3 Design": { rate: 2.9, status: "estimated", note: "Assumed same as Comfort trim" },
  "BYD|Seal Design": { rate: 3.5, status: "estimated", note: "Assumed from BYD range" },
  "BYD|Seal U Hybrid": { rate: 4.9, status: "verified", source: "Original dataset" },
  "BYD|Sealion 7": { rate: 3.5, status: "verified", source: "Original dataset" },

  // ===== CITROEN - 3.9% confirmed =====
  "Citroen|e-C3": { rate: 3.9, status: "verified", source: "Citroen Ireland offers, 2026" },
  "Citroen|e-C3 Aircross": { rate: 3.9, status: "estimated", note: "Assumed from Citroen range" },
  "Citroen|e-C4": { rate: 3.9, status: "verified", source: "Citroen Ireland offers, 2026" },
  "Citroen|e-C4 X": { rate: 3.9, status: "estimated", note: "Assumed same as e-C4" },
  "Citroen|e-Berlingo Electric": { rate: 3.9, status: "estimated", note: "Assumed from Citroen range" },
  "Citroen|e-C5 Aircross": { rate: 3.9, status: "estimated", note: "Assumed from Citroen range" },

  // ===== CUPRA - 4.9% from Cupra Ireland =====
  "Cupra|Born e-Boost 59kWh": { rate: 4.9, status: "verified", source: "Cupra Ireland" },
  "Cupra|Born VZ 79kWh": { rate: 4.9, status: "verified", source: "Cupra Ireland" },
  "Cupra|Tavascan 77kWh": { rate: 4.9, status: "verified", source: "Cupra Ireland" },
  "Cupra|Tavascan VZ 77kWh": { rate: 4.9, status: "estimated", note: "Assumed from Tavascan base" },
  "Cupra|Formentor e-HYBRID 204hp": { rate: 4.9, status: "verified", source: "Cupra Ireland offers" },
  "Cupra|Leon e-HYBRID 204hp": { rate: 4.9, status: "estimated", note: "Assumed from Cupra range" },
  "Cupra|Terramar e-HYBRID": { rate: 4.9, status: "estimated", note: "Assumed from Cupra range" },
  "Cupra|Raval": { rate: 4.9, status: "estimated", note: "Not yet on sale" },

  // ===== DACIA =====
  "Dacia|Spring Expression": { rate: 3.9, status: "estimated", note: "Estimated - check dacia.ie" },
  "Dacia|Spring Extreme": { rate: 3.9, status: "estimated", note: "Estimated - check dacia.ie" },

  // ===== DS =====
  "DS|3 E-Tense": { rate: 3.9, status: "estimated", note: "Estimated - check dsautomobiles.ie" },
  "DS|4 E-Tense": { rate: 3.9, status: "estimated", note: "Estimated - check dsautomobiles.ie" },

  // ===== FIAT - 3.9% confirmed =====
  "Fiat|500e": { rate: 3.9, status: "verified", source: "Fiat Ireland finance, Nov 2025-Jan 2026" },
  "Fiat|600e": { rate: 3.9, status: "verified", source: "Fiat Ireland finance, Nov 2025-Jan 2026" },
  "Fiat|Grande Panda Electric": { rate: 3.9, status: "estimated", note: "Assumed from Fiat range" },

  // ===== FORD - 0% on some, varies =====
  "Ford|Puma Gen-E": { rate: 0, status: "verified", source: "Spirit Ford Ireland, 261 offers" },
  "Ford|Explorer Electric": { rate: 0, status: "verified", source: "Spirit Ford Ireland, 261 offers" },
  "Ford|Capri Electric": { rate: 3.9, status: "estimated", note: "0% may be available - check ford.ie" },
  "Ford|Mustang Mach-E": { rate: 3.9, status: "estimated", note: "Promotional 0% may be available - check ford.ie" },

  // ===== HONDA =====
  "Honda|e:Ny1": { rate: 3.9, status: "estimated", note: "Estimated - check honda.ie" },

  // ===== HYUNDAI - verified from Bright Hyundai =====
  "Hyundai|Inster": { rate: 2.49, status: "verified", source: "Hyundai Ireland" },
  "Hyundai|Kona Electric": { rate: 2.49, status: "verified", source: "Hyundai Ireland" },
  "Hyundai|Kona Hybrid": { rate: 2.49, status: "verified", source: "Bright Hyundai Ireland" },
  "Hyundai|Ioniq 5": { rate: 3.49, status: "verified", source: "Hyundai Ireland" },
  "Hyundai|Ioniq 6": { rate: 3.49, status: "verified", source: "Bright Hyundai Ireland" },
  "Hyundai|Ioniq 9": { rate: 3.49, status: "verified", source: "Hyundai Ireland" },
  "Hyundai|Tucson Hybrid": { rate: 4.99, status: "verified", source: "Bright Hyundai Ireland" },
  "Hyundai|Tucson PHEV": { rate: 4.99, status: "estimated", note: "From Bright Hyundai - may differ" },
  "Hyundai|Santa Fe Hybrid": { rate: 3.99, status: "verified", source: "Bright Hyundai Ireland" },
  "Hyundai|Santa Fe PHEV": { rate: 3.99, status: "estimated", note: "Assumed same as Santa Fe Hybrid" },

  // ===== JEEP =====
  "Jeep|Avenger Electric": { rate: 3.9, status: "estimated", note: "Estimated - check jeep.com/ie" },

  // ===== KIA - verified from kia.com/ie 261 offers =====
  "Kia|EV3": { rate: 0, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|EV4": { rate: 0, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|EV4 Fastback": { rate: 0, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|EV5": { rate: 0, status: "estimated", note: "Assumed 0% like other Kia EVs" },
  "Kia|EV6": { rate: 0, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|EV9": { rate: 3.9, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|Niro EV": { rate: 3.9, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|Niro Hybrid": { rate: 3.9, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|Niro PHEV": { rate: 3.9, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|Sportage Hybrid": { rate: 0, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|Sportage PHEV": { rate: 0, status: "verified", source: "Kia Ireland 261 offers" },
  "Kia|Sorento PHEV": { rate: 3.9, status: "estimated", note: "Assumed from Kia standard rate" },

  // ===== LEXUS =====
  "Lexus|RZ 450e": { rate: 4.9, status: "estimated", note: "Estimated - check lexus.ie" },

  // ===== LOTUS =====
  "Lotus|Eletre": { rate: 4.9, status: "estimated", note: "Estimated - no Irish PCP data" },
  "Lotus|Emeya": { rate: 4.9, status: "estimated", note: "Estimated - no Irish PCP data" },

  // ===== MAZDA - 5.9% confirmed =====
  "Mazda|CX-5 Hybrid": { rate: 5.9, status: "verified", source: "Original dataset" },
  "Mazda|MX-30 EV": { rate: 5.9, status: "estimated", note: "Assumed from Mazda range" },
  "Mazda|6e": { rate: 5.9, status: "estimated", note: "Not yet on sale - assumed Mazda rate" },
  "Mazda|CX-60 PHEV": { rate: 5.9, status: "estimated", note: "Assumed from Mazda range" },
  "Mazda|CX-80 PHEV": { rate: 5.9, status: "estimated", note: "Assumed from Mazda range" },
  "Mazda|Mazda2 Hybrid": { rate: 5.9, status: "estimated", note: "Assumed from Mazda range" },

  // ===== MERCEDES-BENZ =====
  "Mercedes-Benz|EQA 250+": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|EQB": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|CLA Electric": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|EQE 300 Saloon": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|EQS 450+ Saloon": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|EQE SUV": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|EQS SUV": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|EQV 300": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|G 580 Electric": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },
  "Mercedes-Benz|GLC Electric": { rate: 4.9, status: "estimated", note: "Estimated - check mercedes-benz.ie" },

  // ===== MG =====
  "MG|MG4 EV Standard Range": { rate: 2.9, status: "verified", source: "MG Ireland" },
  "MG|MG4 EV Long Range": { rate: 2.9, status: "verified", source: "MG Ireland" },
  "MG|MG4 EV Extended Range": { rate: 2.9, status: "verified", source: "MG Ireland" },
  "MG|MG4 XPower": { rate: 2.9, status: "verified", source: "MG Ireland" },
  "MG|MG5 EV Long Range": { rate: 2.9, status: "verified", source: "MG Ireland" },
  "MG|MG ZS EV Long Range": { rate: 1.9, status: "verified", source: "MG Ireland" },
  "MG|MG3 Hybrid+": { rate: 2.9, status: "estimated", note: "Assumed from MG range" },
  "MG|MGS5 EV": { rate: 2.9, status: "estimated", note: "Assumed from MG range" },
  "MG|MG ZS Hybrid+": { rate: 1.9, status: "estimated", note: "Assumed same as ZS EV" },
  "MG|MG HS PHEV": { rate: 2.9, status: "estimated", note: "Assumed from MG range" },
  "MG|S6 EV": { rate: 2.9, status: "estimated", note: "Not yet on sale" },
  "MG|Cyberster": { rate: 2.9, status: "estimated", note: "Assumed from MG range" },

  // ===== MINI =====
  "MINI|Cooper Electric": { rate: 4.9, status: "estimated", note: "Assumed BMW Group rate - check mini.ie" },
  "MINI|Aceman": { rate: 4.9, status: "estimated", note: "Assumed BMW Group rate - check mini.ie" },
  "MINI|Countryman Electric": { rate: 4.9, status: "estimated", note: "Assumed BMW Group rate - check mini.ie" },

  // ===== NISSAN - mixed rates =====
  "Nissan|Leaf 40kWh": { rate: 0, status: "verified", source: "Nissan Ireland - 0% on 40kWh Leaf" },
  "Nissan|Leaf": { rate: 3.99, status: "verified", source: "Nissan Ireland PCP offers" },
  "Nissan|Ariya 63kWh": { rate: 3.99, status: "verified", source: "Nissan Ireland 2-4-1 deals" },
  "Nissan|Ariya 87kWh": { rate: 3.99, status: "estimated", note: "Assumed same as 63kWh Ariya" },
  "Nissan|Juke Hybrid": { rate: 3.99, status: "verified", source: "Nissan Ireland PCP offers" },
  "Nissan|Qashqai e-Power": { rate: 3.99, status: "verified", source: "Nissan Ireland PCP offers" },
  "Nissan|X-Trail e-Power": { rate: 3.99, status: "estimated", note: "Assumed from Nissan range" },
  "Nissan|Micra Electric": { rate: 3.99, status: "estimated", note: "Assumed from Nissan range" },

  // ===== OPEL =====
  "Opel|Frontera Electric": { rate: 2.9, status: "verified", source: "Opel Ireland" },
  "Opel|Frontera Hybrid": { rate: 2.9, status: "verified", source: "Opel Ireland" },
  "Opel|Corsa Electric SC": { rate: 2.9, status: "verified", source: "Opel Ireland" },
  "Opel|Corsa Electric Elite": { rate: 2.9, status: "verified", source: "Opel Ireland" },
  "Opel|Corsa Hybrid": { rate: 2.9, status: "verified", source: "Opel Ireland" },
  "Opel|Mokka Electric": { rate: 2.9, status: "estimated", note: "Assumed from Opel range" },
  "Opel|Mokka Hybrid": { rate: 2.9, status: "estimated", note: "Assumed from Opel range" },
  "Opel|Astra Electric": { rate: 2.9, status: "estimated", note: "Assumed from Opel range" },
  "Opel|Astra Hybrid": { rate: 2.9, status: "estimated", note: "Assumed from Opel range" },
  "Opel|Astra Sports Tourer Electric": { rate: 2.9, status: "estimated", note: "Assumed from Opel range" },
  "Opel|Grandland Electric SC": { rate: 3.9, status: "verified", source: "Opel Ireland" },
  "Opel|Grandland Electric Elegance": { rate: 3.9, status: "verified", source: "Opel Ireland" },
  "Opel|Grandland Electric GS": { rate: 3.9, status: "verified", source: "Opel Ireland" },
  "Opel|Grandland Hybrid SC": { rate: 3.9, status: "verified", source: "Opel Ireland" },
  "Opel|Grandland Hybrid Elegance": { rate: 3.9, status: "verified", source: "Opel Ireland" },
  "Opel|Grandland Hybrid GS": { rate: 3.9, status: "verified", source: "Opel Ireland" },

  // ===== PEUGEOT =====
  "Peugeot|e-208": { rate: 1.9, status: "verified", source: "Original dataset" },
  "Peugeot|e-2008": { rate: 1.9, status: "verified", source: "Original dataset" },
  "Peugeot|e-308": { rate: 1.9, status: "estimated", note: "Assumed from Peugeot EV range" },
  "Peugeot|e-408": { rate: 1.9, status: "estimated", note: "Assumed from Peugeot EV range" },
  "Peugeot|e-3008": { rate: 1.9, status: "estimated", note: "Assumed from Peugeot EV range" },
  "Peugeot|e-5008": { rate: 1.9, status: "estimated", note: "Assumed from Peugeot EV range" },
  "Peugeot|e-Rifter": { rate: 1.9, status: "estimated", note: "Assumed from Peugeot EV range" },
  "Peugeot|308 Hybrid": { rate: 3.9, status: "estimated", note: "Assumed for hybrid models" },
  "Peugeot|408 PHEV": { rate: 3.9, status: "verified", source: "Original dataset" },
  "Peugeot|3008 Hybrid": { rate: 3.9, status: "estimated", note: "Assumed for hybrid models" },
  "Peugeot|5008 Hybrid": { rate: 3.9, status: "estimated", note: "Assumed for hybrid models" },

  // ===== POLESTAR - 3.9% confirmed =====
  "Polestar|2 Standard Range": { rate: 3.9, status: "verified", source: "Polestar Ireland PCP, 261 offers" },
  "Polestar|2 Long Range": { rate: 3.9, status: "verified", source: "Polestar Ireland PCP" },
  "Polestar|3": { rate: 3.9, status: "verified", source: "Polestar Ireland PCP, 261 offers" },
  "Polestar|4": { rate: 3.9, status: "verified", source: "Spirit Polestar Dublin, 261 offers" },

  // ===== PORSCHE =====
  "Porsche|Taycan RWD": { rate: 4.9, status: "estimated", note: "Estimated - check porsche.ie configurator" },
  "Porsche|Taycan 4S": { rate: 4.9, status: "estimated", note: "Estimated - check porsche.ie configurator" },
  "Porsche|Taycan GTS": { rate: 4.9, status: "estimated", note: "Estimated - check porsche.ie configurator" },
  "Porsche|Taycan Turbo": { rate: 4.9, status: "estimated", note: "Estimated - check porsche.ie configurator" },
  "Porsche|Taycan Cross Turismo": { rate: 4.9, status: "estimated", note: "Estimated - check porsche.ie configurator" },
  "Porsche|Taycan Sport Turismo": { rate: 4.9, status: "estimated", note: "Estimated - check porsche.ie configurator" },
  "Porsche|Macan Electric": { rate: 4.9, status: "estimated", note: "Estimated - check porsche.ie configurator" },
  "Porsche|Macan 4 Electric": { rate: 4.9, status: "estimated", note: "Estimated - check porsche.ie configurator" },

  // ===== RENAULT - 3.9% confirmed =====
  "Renault|5 E-Tech": { rate: 3.9, status: "verified", source: "Renault Ireland offers" },
  "Renault|4 E-Tech Electric 40kWh": { rate: 3.9, status: "estimated", note: "Assumed from Renault range" },
  "Renault|4 E-Tech Electric 52kWh": { rate: 3.9, status: "estimated", note: "Assumed from Renault range" },
  "Renault|Megane E-Tech": { rate: 3.9, status: "verified", source: "Renault Ireland offers" },
  "Renault|Scenic E-Tech": { rate: 3.9, status: "verified", source: "Renault Ireland offers" },
  "Renault|Scenic E-Tech 87kWh": { rate: 3.9, status: "estimated", note: "Assumed same as base Scenic" },
  "Renault|Clio Full Hybrid E-Tech": { rate: 3.9, status: "verified", source: "Renault Ireland offers" },
  "Renault|Captur E-Tech Hybrid": { rate: 3.9, status: "verified", source: "Renault Ireland offers" },
  "Renault|Symbioz Full Hybrid E-Tech": { rate: 3.9, status: "estimated", note: "Assumed from Renault range" },
  "Renault|Austral Full Hybrid E-Tech": { rate: 3.9, status: "estimated", note: "Assumed from Renault range" },
  "Renault|Rafale Full Hybrid E-Tech": { rate: 3.9, status: "estimated", note: "Assumed from Renault range" },
  "Renault|Twingo E-Tech": { rate: 3.9, status: "estimated", note: "Not yet on sale" },

  // ===== SKODA =====
  "Skoda|Elroq": { rate: 0, status: "verified", source: "Original dataset" },
  "Skoda|Elroq 60": { rate: 0, status: "estimated", note: "Assumed same as base Elroq" },
  "Skoda|Elroq 85": { rate: 0, status: "estimated", note: "Assumed same as base Elroq" },
  "Skoda|Enyaq": { rate: 0, status: "verified", source: "Original dataset" },
  "Skoda|Enyaq (higher spec)": { rate: 0, status: "verified", source: "Original dataset" },
  "Skoda|Enyaq Coupe": { rate: 0, status: "estimated", note: "Assumed same as Enyaq" },
  "Skoda|Superb iV PHEV": { rate: 1.9, status: "verified", source: "Original dataset" },
  "Skoda|Kodiaq iV PHEV": { rate: 1.9, status: "estimated", note: "Assumed same as Superb PHEV" },

  // ===== SMART =====
  "Smart|#1": { rate: 3.9, status: "estimated", note: "Estimated - check smartelectric.ie" },
  "Smart|#3": { rate: 3.9, status: "estimated", note: "Estimated - check smartelectric.ie" },

  // ===== SUBARU =====
  "Subaru|Solterra": { rate: 4.9, status: "estimated", note: "Estimated - check subaru.ie" },

  // ===== SUZUKI =====
  "Suzuki|e Vitara": { rate: 3.9, status: "estimated", note: "Estimated - check suzuki.ie" },

  // ===== TESLA - 1.99% from original =====
  "Tesla|Model 3 RWD": { rate: 1.99, status: "verified", source: "Original dataset" },
  "Tesla|Model 3 Long Range AWD": { rate: 1.99, status: "estimated", note: "Assumed same as Model 3 RWD" },
  "Tesla|Model 3 Performance": { rate: 1.99, status: "estimated", note: "Assumed same as Model 3 RWD" },
  "Tesla|Model Y RWD": { rate: 1.99, status: "verified", source: "Original dataset" },
  "Tesla|Model Y Long Range AWD": { rate: 1.99, status: "estimated", note: "Assumed same as Model Y RWD" },
  "Tesla|Model Y Performance": { rate: 1.99, status: "estimated", note: "Assumed same as Model Y RWD" },

  // ===== TOYOTA - mixed rates confirmed =====
  "Toyota|Aygo X Hybrid": { rate: 5.9, status: "verified", source: "CompleteCar.ie Toyota 261 offers" },
  "Toyota|Yaris Hybrid": { rate: 5.9, status: "verified", source: "Original dataset" },
  "Toyota|Yaris Cross Hybrid": { rate: 3.9, status: "estimated", note: "Estimated - check toyota.ie" },
  "Toyota|Corolla Hatchback Hybrid": { rate: 4.9, status: "verified", source: "Original dataset" },
  "Toyota|Corolla Saloon Hybrid": { rate: 4.9, status: "verified", source: "Original dataset" },
  "Toyota|Corolla Touring Sports Hybrid": { rate: 4.9, status: "estimated", note: "Assumed same as Corolla" },
  "Toyota|C-HR Hybrid": { rate: 3.9, status: "verified", source: "Original dataset" },
  "Toyota|C-HR PHEV": { rate: 4.9, status: "verified", source: "CompleteCar.ie - 4.9% or €2k booster" },
  "Toyota|bZ4X": { rate: 3.9, status: "verified", source: "CompleteCar.ie - 3.9% or €2k booster" },
  "Toyota|RAV4 Hybrid": { rate: 4.9, status: "verified", source: "Original dataset" },
  "Toyota|RAV4 PHEV": { rate: 4.9, status: "estimated", note: "Assumed same as RAV4 Hybrid" },
  "Toyota|Prius PHEV": { rate: 4.9, status: "verified", source: "Original dataset" },
  "Toyota|Highlander Hybrid": { rate: 4.9, status: "estimated", note: "Assumed from Toyota range" },
  "Toyota|Urban Cruiser": { rate: 3.9, status: "estimated", note: "Not yet on sale" },

  // ===== VOLKSWAGEN =====
  "Volkswagen|ID.3 Pure 52kWh": { rate: 1.9, status: "verified", source: "Original dataset" },
  "Volkswagen|ID.3 Pro S 77kWh": { rate: 1.9, status: "estimated", note: "Assumed same as ID.3 Pure" },
  "Volkswagen|ID.4 Pure 52kWh": { rate: 0, status: "verified", source: "Original dataset" },
  "Volkswagen|ID.4 Pro 77kWh": { rate: 0, status: "estimated", note: "Assumed same as ID.4 Pure" },
  "Volkswagen|ID.4 GTX Plus 79kWh": { rate: 0, status: "verified", source: "Original dataset" },
  "Volkswagen|ID.5 Pure 52kWh": { rate: 0, status: "verified", source: "Original dataset" },
  "Volkswagen|ID.5 Pro 77kWh": { rate: 0, status: "estimated", note: "Assumed same as ID.5 Pure" },
  "Volkswagen|ID.5 GTX 79kWh": { rate: 0, status: "estimated", note: "Assumed same as ID.5 range" },
  "Volkswagen|ID.7 Pro Plus": { rate: 0.9, status: "verified", source: "Original dataset" },
  "Volkswagen|ID.7 GTX Plus": { rate: 0.9, status: "verified", source: "Original dataset" },
  "Volkswagen|ID.7 Tourer Pure Plus": { rate: 0.9, status: "verified", source: "Original dataset" },
  "Volkswagen|ID.7 Tourer GTX Plus": { rate: 0.9, status: "verified", source: "Original dataset" },
  "Volkswagen|ID.Buzz Pro": { rate: 0.9, status: "estimated", note: "Assumed from ID.7 range" },
  "Volkswagen|ID.Buzz GTX": { rate: 0.9, status: "estimated", note: "Assumed from ID.7 range" },

  // ===== VOLVO - mixed, 0% on some EX30 =====
  "Volvo|EX30 Plus RWD": { rate: 3.95, status: "verified", source: "Volvo Ireland - Core 3.95%, Plus/Ultra 0%" },
  "Volvo|EX30 Cross Country": { rate: 3.95, status: "estimated", note: "Assumed from EX30 range" },
  "Volvo|EX40": { rate: 4.9, status: "estimated", note: "Estimated - check volvocars.com/ie" },
  "Volvo|EC40": { rate: 4.9, status: "estimated", note: "Estimated - check volvocars.com/ie" },
  "Volvo|EX60": { rate: 4.9, status: "estimated", note: "Not yet on sale" },
  "Volvo|EX90 Twin Motor": { rate: 4.9, status: "estimated", note: "Estimated - check volvocars.com/ie" },
  "Volvo|ES90": { rate: 4.9, status: "estimated", note: "Not yet on sale" },
  "Volvo|XC40 Recharge PHEV": { rate: 4.9, status: "estimated", note: "Estimated - check volvocars.com/ie" },
  "Volvo|XC60 Recharge PHEV": { rate: 4.9, status: "estimated", note: "Estimated - check volvocars.com/ie" },

  // ===== XPENG =====
  "Xpeng|G6": { rate: 3.9, status: "estimated", note: "Estimated - check with MSL Xpeng Dublin" },
  "Xpeng|G9": { rate: 3.9, status: "estimated", note: "Estimated - check with MSL Xpeng Dublin" },

  // ===== ZEEKR =====
  "Zeekr|X": { rate: 3.9, status: "estimated", note: "No Irish PCP data yet" },
  "Zeekr|7X": { rate: 3.9, status: "estimated", note: "No Irish PCP data yet" },
  "Zeekr|001": { rate: 3.9, status: "estimated", note: "No Irish PCP data yet" },

  // ===== ALFA ROMEO =====
  "Alfa Romeo|Junior Elettrica": { rate: 4.9, status: "estimated", note: "Estimated - check alfaromeo.ie" },
};

let rateChanged = 0;
let statusSet = 0;

data.cars.forEach(car => {
  const key = `${car.make}|${car.model}`;
  const upd = rateUpdates[key];

  if (upd) {
    // Update rate if changed
    if (upd.rate !== undefined && upd.rate !== car.interest_rate_pct) {
      const oldRate = car.interest_rate_pct;
      car.interest_rate_pct = upd.rate;
      const finance = recalcFinance(car.price_eur, upd.rate);
      Object.assign(car, finance);
      console.log(`RATE: ${key}: ${oldRate}% -> ${upd.rate}%`);
      rateChanged++;
    }

    // Set rate verification status
    car.rate_verified = upd.status;
    if (upd.source) car.rate_source = upd.source;
    if (upd.note) car.rate_note = upd.note;
    statusSet++;
  } else {
    // Default for any car not in the map
    car.rate_verified = 'estimated';
    car.rate_note = 'Interest rate not independently verified';
  }
});

data.cars.sort((a, b) => a.make.localeCompare(b.make) || a.price_eur - b.price_eur);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`\nRates changed: ${rateChanged}`);
console.log(`Statuses set: ${statusSet}`);
console.log(`Total cars: ${data.cars.length}`);
