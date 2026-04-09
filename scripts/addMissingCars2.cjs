const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'EV_Hybrid_Ireland_Comparison.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const GMFV_PCT = { 24: 0.55, 36: 0.42, 48: 0.32 };

function makeFinance(price, rate) {
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

function mc({ make, model, year = "2025", type, price, rate, grant = null, url }) {
  if (grant === null) grant = type === 'BEV' && price >= 14000 && price <= 60000;
  return {
    make, model, year, type,
    price_eur: price,
    interest_rate_pct: rate,
    typical_pcp_term_months: 37,
    grant_eligible: grant ? "Yes" : "No",
    seai_grant_eur: grant ? 3500 : 0,
    net_price_after_grant_eur: price,
    url,
    ...makeFinance(price, rate)
  };
}

const newCars = [
  // ===== AUDI (new brand) =====
  mc({ make: "Audi", model: "Q4 e-tron 40", type: "BEV", price: 48390, rate: 3.9, url: "https://www.audi.ie/en/models/q4-e-tron/" }),
  mc({ make: "Audi", model: "Q4 e-tron 50 quattro", type: "BEV", price: 56390, rate: 3.9, url: "https://www.audi.ie/en/models/q4-e-tron/" }),
  mc({ make: "Audi", model: "Q6 e-tron", type: "BEV", price: 68500, rate: 3.9, grant: false, url: "https://www.audi.ie/en/models/q6-e-tron/" }),
  mc({ make: "Audi", model: "SQ6 e-tron", type: "BEV", price: 94500, rate: 3.9, grant: false, url: "https://www.audi.ie/en/models/q6-e-tron/" }),
  mc({ make: "Audi", model: "A6 Sportback e-tron", type: "BEV", price: 74500, rate: 3.9, grant: false, url: "https://www.audi.ie/en/models/a6-e-tron/" }),
  mc({ make: "Audi", model: "e-tron GT", type: "BEV", price: 120000, rate: 3.9, grant: false, url: "https://www.audi.ie/en/models/e-tron-gt/" }),
  mc({ make: "Audi", model: "RS e-tron GT", type: "BEV", price: 177650, rate: 3.9, grant: false, url: "https://www.audi.ie/en/models/e-tron-gt/" }),

  // ===== FORD (new brand) =====
  mc({ make: "Ford", model: "Puma Gen-E", type: "BEV", price: 32916, rate: 3.9, url: "https://www.ford.ie/electric/puma-gen-e" }),
  mc({ make: "Ford", model: "Explorer Electric", type: "BEV", price: 43555, rate: 3.9, url: "https://www.ford.ie/electric/explorer" }),
  mc({ make: "Ford", model: "Capri Electric", type: "BEV", price: 47232, rate: 3.9, url: "https://www.ford.ie/electric/capri" }),
  mc({ make: "Ford", model: "Mustang Mach-E", type: "BEV", price: 52995, rate: 3.9, url: "https://www.ford.ie/electric/mustang-mach-e" }),

  // ===== CITROEN (new brand) =====
  mc({ make: "Citroen", model: "e-C3", type: "BEV", price: 23400, rate: 3.9, url: "https://www.citroen.ie/models/new-e-c3.html" }),
  mc({ make: "Citroen", model: "e-C3 Aircross", type: "BEV", price: 27900, rate: 3.9, url: "https://www.citroen.ie/models/e-c3-aircross.html" }),
  mc({ make: "Citroen", model: "e-C4", type: "BEV", price: 35495, rate: 3.9, url: "https://www.citroen.ie/models/e-c4.html" }),
  mc({ make: "Citroen", model: "e-C4 X", type: "BEV", price: 36495, rate: 3.9, url: "https://www.citroen.ie/models/e-c4-x.html" }),
  mc({ make: "Citroen", model: "e-C5 Aircross", type: "BEV", price: 39939, rate: 3.9, url: "https://www.citroen.ie/models/e-c5-aircross.html" }),
  mc({ make: "Citroen", model: "e-Berlingo Electric", type: "BEV", price: 34995, rate: 3.9, url: "https://www.citroen.ie/models/e-berlingo.html" }),

  // ===== FIAT (new brand) =====
  mc({ make: "Fiat", model: "500e", type: "BEV", price: 25495, rate: 3.9, url: "https://www.fiat.ie/models/500-electric" }),
  mc({ make: "Fiat", model: "600e", type: "BEV", price: 32495, rate: 3.9, url: "https://www.fiat.ie/models/600-electric" }),
  mc({ make: "Fiat", model: "Grande Panda Electric", type: "BEV", price: 25495, rate: 3.9, url: "https://www.fiat.ie/models/grande-panda-electric" }),

  // ===== MINI (new brand) =====
  mc({ make: "MINI", model: "Cooper Electric", type: "BEV", price: 28471, rate: 4.9, url: "https://www.mini.ie/en_IE/home/range/mini-cooper-electric.html" }),
  mc({ make: "MINI", model: "Aceman", type: "BEV", price: 34567, rate: 4.9, url: "https://www.mini.ie/en_IE/home/range/mini-aceman.html" }),
  mc({ make: "MINI", model: "Countryman Electric", type: "BEV", price: 44995, rate: 4.9, url: "https://www.mini.ie/en_IE/home/range/all-electric-mini-countryman.html" }),

  // ===== POLESTAR (new brand) =====
  mc({ make: "Polestar", model: "2 Standard Range", type: "BEV", price: 39897, rate: 3.9, url: "https://www.polestar.com/ie/polestar-2/" }),
  mc({ make: "Polestar", model: "2 Long Range", type: "BEV", price: 55195, rate: 3.9, url: "https://www.polestar.com/ie/polestar-2/" }),
  mc({ make: "Polestar", model: "3", type: "BEV", price: 82995, rate: 3.9, grant: false, url: "https://www.polestar.com/ie/polestar-3/" }),
  mc({ make: "Polestar", model: "4", type: "BEV", price: 61190, rate: 3.9, grant: false, url: "https://www.polestar.com/ie/polestar-4/" }),

  // ===== ALFA ROMEO (new brand) =====
  mc({ make: "Alfa Romeo", model: "Junior Elettrica", type: "BEV", price: 34995, rate: 4.9, url: "https://www.alfaromeo.ie/models/alfa-romeo-junior-elettrica" }),

  // ===== DACIA (new brand) =====
  mc({ make: "Dacia", model: "Spring Expression", type: "BEV", price: 15990, rate: 3.9, url: "https://www.dacia.ie/range/spring.html" }),
  mc({ make: "Dacia", model: "Spring Extreme", type: "BEV", price: 17990, rate: 3.9, url: "https://www.dacia.ie/range/spring.html" }),

  // ===== DS (new brand) =====
  mc({ make: "DS", model: "3 E-Tense", type: "BEV", price: 38995, rate: 3.9, url: "https://www.dsautomobiles.ie/models/ds3-e-tense.html" }),
  mc({ make: "DS", model: "4 E-Tense", type: "BEV", price: 45995, rate: 3.9, url: "https://www.dsautomobiles.ie/models/ds4.html" }),

  // ===== JEEP (new brand) =====
  mc({ make: "Jeep", model: "Avenger Electric", type: "BEV", price: 29995, rate: 3.9, url: "https://www.jeep.com/ie/jeep-avenger/" }),

  // ===== HONDA (new brand) =====
  mc({ make: "Honda", model: "e:Ny1", type: "BEV", price: 44995, rate: 3.9, url: "https://www.honda.ie/product/247/honda-e-ny1" }),

  // ===== LEXUS (new brand) =====
  mc({ make: "Lexus", model: "RZ 450e", type: "BEV", price: 66280, rate: 4.9, grant: false, url: "https://www.lexus.ie/new-cars/rz" }),

  // ===== SMART (new brand) =====
  mc({ make: "Smart", model: "#1", type: "BEV", price: 28816, rate: 3.9, url: "https://smartelectric.ie/new-cars/smart-1/" }),
  mc({ make: "Smart", model: "#3", type: "BEV", price: 35950, rate: 3.9, url: "https://smartelectric.ie/new-cars/smart-3/" }),

  // ===== SUBARU (new brand) =====
  mc({ make: "Subaru", model: "Solterra", type: "BEV", price: 44995, rate: 4.9, url: "https://www.subaru.ie/models/all-new-subaru-solterra" }),

  // ===== SUZUKI (new brand) =====
  mc({ make: "Suzuki", model: "e Vitara", type: "BEV", price: 30595, rate: 3.9, url: "https://cars.suzuki.ie/new-cars/e-vitara/" }),

  // ===== XPENG (new brand) =====
  mc({ make: "Xpeng", model: "G6", type: "BEV", price: 42000, rate: 3.9, url: "https://www.msl.ie/en/xpeng/g6" }),
  mc({ make: "Xpeng", model: "G9", type: "BEV", price: 52000, rate: 3.9, url: "https://www.msl.ie/en/xpeng" }),

  // ===== ZEEKR (new brand) =====
  mc({ make: "Zeekr", model: "X", type: "BEV", price: 42995, rate: 3.9, url: "https://www.zeekr.com" }),
  mc({ make: "Zeekr", model: "7X", type: "BEV", price: 49995, rate: 3.9, url: "https://www.zeekr.com" }),
  mc({ make: "Zeekr", model: "001", type: "BEV", price: 59995, rate: 3.9, url: "https://www.zeekr.com" }),

  // ===== LOTUS (new brand) =====
  mc({ make: "Lotus", model: "Eletre", type: "BEV", price: 105995, rate: 4.9, grant: false, url: "https://www.lotuscars.com/en-IE/eletre/" }),
  mc({ make: "Lotus", model: "Emeya", type: "BEV", price: 112995, rate: 4.9, grant: false, url: "https://www.lotuscars.com/en-IE/emeya/" }),

  // ===== MISSING FROM EXISTING BRANDS =====

  // BMW i7
  mc({ make: "BMW", model: "i7 xDrive60", type: "BEV", price: 138995, rate: 4.9, grant: false, url: "https://www.bmw.ie/en/all-models/bmw-i/i7/2022/bmw-i7-saloon-highlights.html" }),

  // BYD Atto 2
  mc({ make: "BYD", model: "Atto 2", type: "BEV", price: 24990, rate: 3.5, url: "https://www.bydauto.ie/en/atto2" }),

  // Mercedes EQV, G-Class Electric, GLC Electric
  mc({ make: "Mercedes-Benz", model: "EQV 300", type: "BEV", price: 125830, rate: 4.9, grant: false, url: "https://www.mercedes-benz.ie/models/eqv-fl/" }),
  mc({ make: "Mercedes-Benz", model: "G 580 Electric", type: "BEV", price: 166280, rate: 4.9, grant: false, url: "https://www.mercedes-benz.ie/models/g-class-n465-805/" }),
  mc({ make: "Mercedes-Benz", model: "GLC Electric", type: "BEV", price: 75935, rate: 4.9, grant: false, url: "https://www.mercedes-benz.ie/" }),

  // MG Cyberster, S6 EV
  mc({ make: "MG", model: "Cyberster", type: "BEV", price: 55995, rate: 2.9, grant: false, url: "https://www.mg.ie/cyberster/" }),
  mc({ make: "MG", model: "S6 EV", type: "BEV", price: 39995, rate: 2.9, url: "https://www.mg.ie/" }),

  // Nissan Micra Electric
  mc({ make: "Nissan", model: "Micra Electric", type: "BEV", price: 25995, rate: 5.9, url: "https://www.nissan.ie/" }),

  // Mazda 6e, MX-30
  mc({ make: "Mazda", model: "6e", type: "BEV", price: 42995, rate: 5.9, url: "https://www.mazda.ie/" }),
  mc({ make: "Mazda", model: "MX-30 EV", type: "BEV", price: 34995, rate: 5.9, url: "https://www.mazda.ie/cars/mazda-mx-30/" }),

  // Peugeot E-408, E-Rifter
  mc({ make: "Peugeot", model: "e-408", type: "BEV", price: 38995, rate: 1.9, url: "https://www.peugeot.ie/our-models/peugeot-408.html" }),
  mc({ make: "Peugeot", model: "e-Rifter", type: "BEV", price: 38995, rate: 1.9, url: "https://www.peugeot.ie/our-models/peugeot-rifter.html" }),

  // Porsche Taycan Cross Turismo, Sport Turismo, Cayenne Electric
  mc({ make: "Porsche", model: "Taycan Cross Turismo", type: "BEV", price: 107551, rate: 4.9, grant: false, url: "https://www.porsche.com/uk/_ireland_/models/taycan/" }),
  mc({ make: "Porsche", model: "Taycan Sport Turismo", type: "BEV", price: 103704, rate: 4.9, grant: false, url: "https://www.porsche.com/uk/_ireland_/models/taycan/" }),

  // Renault Twingo
  mc({ make: "Renault", model: "Twingo E-Tech", type: "BEV", price: 19995, rate: 3.9, url: "https://www.renault.ie/" }),

  // Toyota Urban Cruiser
  mc({ make: "Toyota", model: "Urban Cruiser", type: "BEV", price: 35995, rate: 3.9, url: "https://www.toyota.ie/new-cars/urban-cruiser" }),

  // Volvo EC40, ES90, EX60
  mc({ make: "Volvo", model: "EC40", type: "BEV", price: 52995, rate: 4.9, url: "https://www.volvocars.com/ie/cars/" }),
  mc({ make: "Volvo", model: "ES90", type: "BEV", price: 79995, rate: 4.9, grant: false, url: "https://www.volvocars.com/ie/cars/" }),
  mc({ make: "Volvo", model: "EX60", type: "BEV", price: 59995, rate: 4.9, url: "https://www.volvocars.com/ie/cars/" }),

  // Cupra Raval
  mc({ make: "Cupra", model: "Raval", type: "BEV", price: 28500, rate: 4.9, url: "https://www.cupraofficial.ie/cars/raval" }),
];

// Check for duplicates before adding
const existingKeys = new Set(data.cars.map(c => `${c.make}|${c.model}`));
let added = 0;
let skipped = 0;
newCars.forEach(car => {
  const key = `${car.make}|${car.model}`;
  if (existingKeys.has(key)) {
    console.log(`  SKIP (duplicate): ${key}`);
    skipped++;
  } else {
    data.cars.push(car);
    existingKeys.add(key);
    added++;
  }
});

// Update metadata
const brands = [...new Set(data.cars.map(c => c.make))].sort();
data.metadata.total_models = data.cars.length;
data.metadata.total_brands = brands.length;
data.metadata.brands = brands;
data.cars.sort((a, b) => a.make.localeCompare(b.make) || a.price_eur - b.price_eur);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`\nAdded: ${added}, Skipped: ${skipped}`);
console.log(`Database now: ${data.cars.length} cars across ${brands.length} brands`);

const byBrand = {};
data.cars.forEach(c => { byBrand[c.make] = (byBrand[c.make] || 0) + 1; });
Object.entries(byBrand).sort().forEach(([b, c]) => console.log(`  ${b}: ${c}`));
