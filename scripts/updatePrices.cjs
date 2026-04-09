// Update prices from RTE April 2026 guide and other verified sources
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

// Price updates from RTE April 2026 guide + verified sources
// Format: "Make|Model": { price, rate (if changed) }
const updates = {
  // AUDI - RTE verified
  "Audi|Q4 e-tron 40": { price: 51980 },
  "Audi|SQ6 e-tron": { price: 107235 },
  "Audi|A6 Sportback e-tron": { price: 74500 }, // confirmed
  "Audi|RS e-tron GT": { price: 177650 }, // confirmed

  // BMW - RTE verified
  "BMW|iX1 eDrive20": { price: 52475 }, // confirmed
  "BMW|i4 eDrive35": { price: 74895 }, // confirmed
  "BMW|iX M70 xDrive": { price: 140665 }, // confirmed
  "BMW|i7 xDrive60": { price: 142555 },
  "BMW|iX2 xDrive30": { price: 70695 },
  "BMW|i5 eDrive40": { price: 74095 }, // keep - RTE listed Touring at €94k, our sedan is correct

  // BYD - RTE verified (prices appear to be pre-grant for some)
  "BYD|Dolphin Surf Active": { price: 17985 }, // confirmed (RTE: 17965 close enough)
  "BYD|Seal Design": { price: 45435 },
  "BYD|Sealion 7": { price: 49125 },
  "BYD|ATTO 3 Comfort": { price: 33110 }, // keep - RTE listed higher trim

  // CITROEN - RTE verified
  "Citroen|e-C3": { price: 23400 }, // confirmed
  "Citroen|e-C4": { price: 31328 },
  "Citroen|e-Berlingo Electric": { price: 36782 },

  // CUPRA - RTE verified
  "Cupra|Born e-Boost 59kWh": { price: 37330 },
  "Cupra|Born VZ 79kWh": { price: 39635 },
  "Cupra|Tavascan 77kWh": { price: 46080 }, // confirmed

  // DACIA - RTE confirmed
  "Dacia|Spring Expression": { price: 15990 }, // confirmed

  // FIAT - RTE verified
  "Fiat|500e": { price: 24995 },
  "Fiat|600e": { price: 32995 },

  // FORD - RTE confirmed
  "Ford|Puma Gen-E": { price: 32916 }, // confirmed
  "Ford|Capri Electric": { price: 47232 }, // confirmed
  "Ford|Explorer Electric": { price: 43555 }, // confirmed

  // HONDA - RTE verified (significantly different)
  "Honda|e:Ny1": { price: 54995 },

  // HYUNDAI - RTE verified
  "Hyundai|Inster": { price: 19595 },
  "Hyundai|Ioniq 5": { price: 41995 }, // confirmed
  "Hyundai|Ioniq 6": { price: 41435 }, // confirmed
  "Hyundai|Ioniq 9": { price: 78495 }, // confirmed
  "Hyundai|Kona Electric": { price: 36995 },

  // JEEP - RTE confirmed
  "Jeep|Avenger Electric": { price: 29995 }, // confirmed

  // KIA - RTE verified
  "Kia|EV3": { price: 40350 },
  "Kia|EV4": { price: 43275 }, // confirmed
  "Kia|EV6": { price: 50525 }, // confirmed
  "Kia|EV9": { price: 77500 }, // confirmed

  // LEXUS - RTE confirmed
  "Lexus|RZ 450e": { price: 66280 }, // confirmed

  // MAZDA - RTE verified
  "Mazda|MX-30 EV": { price: 42932 },

  // MERCEDES - RTE verified
  "Mercedes-Benz|CLA Electric": { price: 53425 }, // confirmed
  "Mercedes-Benz|EQE 300 Saloon": { price: 74070 },
  "Mercedes-Benz|EQS 450+ Saloon": { price: 100485 },
  "Mercedes-Benz|EQE SUV": { price: 95450 },

  // MG - RTE verified
  "MG|MG4 EV Standard Range": { price: 30995 }, // confirmed
  "MG|MGS5 EV": { price: 33495 },
  "MG|Cyberster": { price: 69900 },

  // MINI - RTE verified
  "MINI|Aceman": { price: 34567 }, // confirmed
  "MINI|Cooper Electric": { price: 28471 }, // confirmed
  "MINI|Countryman Electric": { price: 39250 },

  // NISSAN - RTE verified
  "Nissan|Ariya 63kWh": { price: 39995 },

  // OPEL - RTE verified
  "Opel|Frontera Electric": { price: 24606 }, // confirmed
  "Opel|Grandland Electric SC": { price: 39065 }, // confirmed
  "Opel|Mokka Electric": { price: 30227 },
  "Opel|Astra Electric": { price: 35849 },

  // PEUGEOT - RTE verified
  "Peugeot|e-208": { price: 31995 },
  "Peugeot|e-2008": { price: 33865 },
  "Peugeot|e-308": { price: 36390 },
  "Peugeot|e-3008": { price: 44995 },
  "Peugeot|e-5008": { price: 52495 },
  "Peugeot|e-408": { price: 38995 }, // confirmed
  "Peugeot|e-Rifter": { price: 39130 },

  // POLESTAR - RTE verified
  "Polestar|2 Standard Range": { price: 39897 }, // confirmed
  "Polestar|3": { price: 101890 },
  "Polestar|4": { price: 58690 },

  // PORSCHE - RTE verified
  "Porsche|Macan Electric": { price: 96623 },
  "Porsche|Taycan Sport Turismo": { price: 122254 },

  // RENAULT - RTE verified
  "Renault|5 E-Tech": { price: 25995 }, // confirmed
  "Renault|4 E-Tech Electric 40kWh": { price: 27995 },
  "Renault|Megane E-Tech": { price: 36570 },
  "Renault|Scenic E-Tech": { price: 39995 }, // confirmed

  // SKODA - RTE verified
  "Skoda|Elroq": { price: 43468 },
  "Skoda|Enyaq": { price: 45980 },

  // SMART - RTE verified
  "Smart|#1": { price: 25316 },
  "Smart|#3": { price: 38714 },

  // SUBARU - RTE confirmed
  "Subaru|Solterra": { price: 44995 }, // confirmed

  // TESLA - RTE verified
  "Tesla|Model 3 RWD": { price: 39990 },
  "Tesla|Model Y RWD": { price: 42990 },

  // TOYOTA - RTE verified
  "Toyota|bZ4X": { price: 42160 },

  // VOLKSWAGEN - RTE verified
  "Volkswagen|ID.3 Pure 52kWh": { price: 31780 },
  "Volkswagen|ID.4 Pure 52kWh": { price: 39530 },
  "Volkswagen|ID.5 Pure 52kWh": { price: 42395 },
  "Volkswagen|ID.7 Pro Plus": { price: 59990 },
  "Volkswagen|ID.Buzz Pro": { price: 67785 },

  // VOLVO - RTE verified
  "Volvo|EX30 Plus RWD": { price: 41555 },
  "Volvo|EX40": { price: 51025 },
  "Volvo|EC40": { price: 55995 },
  "Volvo|EX90 Twin Motor": { price: 104890 },
  "Volvo|ES90": { price: 79995 }, // confirmed
};

let updated = 0;
let notFound = 0;

for (const [key, upd] of Object.entries(updates)) {
  const [make, model] = key.split('|');
  const car = data.cars.find(c => c.make === make && c.model === model);
  if (!car) {
    console.log(`NOT FOUND: ${key}`);
    notFound++;
    continue;
  }

  const oldPrice = car.price_eur;
  if (upd.price && upd.price !== oldPrice) {
    car.price_eur = upd.price;
    car.net_price_after_grant_eur = upd.price;
    // Recalculate finance
    const finance = recalcFinance(upd.price, upd.rate || car.interest_rate_pct);
    Object.assign(car, finance);
    console.log(`UPDATED: ${key}: €${oldPrice} -> €${upd.price}`);
    updated++;
  } else {
    // confirmed, no change needed
  }

  if (upd.rate && upd.rate !== car.interest_rate_pct) {
    car.interest_rate_pct = upd.rate;
    const finance = recalcFinance(car.price_eur, upd.rate);
    Object.assign(car, finance);
    console.log(`RATE UPDATED: ${key}: ${car.interest_rate_pct}% -> ${upd.rate}%`);
  }
}

data.cars.sort((a, b) => a.make.localeCompare(b.make) || a.price_eur - b.price_eur);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`\nUpdated ${updated} prices, ${notFound} not found`);
console.log(`Database: ${data.cars.length} cars`);
