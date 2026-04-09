// Script to add missing cars to the database
// Run with: node scripts/addMissingCars.js

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'EV_Hybrid_Ireland_Comparison.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const GMFV_PCT = { 24: 0.55, 36: 0.42, 48: 0.32 };

function makeFinance(price, rate) {
  const r = rate / 100 / 12;
  const deposit = 10000;
  const targetMonthly = 400;
  const result = {};

  for (const [termKey, gmfvPct] of Object.entries(GMFV_PCT)) {
    const n = parseInt(termKey);
    const gmfv = Math.round(price * gmfvPct * 100) / 100;
    const af = price - deposit;

    let monthly, depositFor400;
    if (r === 0) {
      monthly = (af - gmfv) / n;
      depositFor400 = price - (targetMonthly * n + gmfv);
    } else {
      const pvFactor = (1 - Math.pow(1 + r, -n)) / r;
      const balloonPV = gmfv * Math.pow(1 + r, -n);
      monthly = (af - balloonPV) / pvFactor;
      depositFor400 = price - (targetMonthly * pvFactor + balloonPV);
    }

    result[`finance_${n}m`] = {
      gmfv_eur: gmfv,
      amount_financed_eur: af,
      monthly_payment_10k_deposit_eur: Math.round(monthly * 100) / 100,
      deposit_for_400pm_eur: Math.round(depositFor400 * 100) / 100
    };
  }
  return result;
}

function makeCar({ make, model, year = "2025", type, price, rate, grantEligible = null, url }) {
  // Auto-determine grant eligibility
  if (grantEligible === null) {
    grantEligible = type === 'BEV' && price >= 14000 && price <= 60000;
  }
  const grant = grantEligible ? 3500 : 0;
  // Note: price already includes grant for display purposes
  // We use price directly for financing (no double deduction)
  const netPrice = price; // grant already factored into price

  return {
    make,
    model,
    year,
    type,
    price_eur: price,
    interest_rate_pct: rate,
    typical_pcp_term_months: 37,
    grant_eligible: grantEligible ? "Yes" : "No",
    seai_grant_eur: grant,
    net_price_after_grant_eur: netPrice,
    url,
    ...makeFinance(price, rate)
  };
}

const newCars = [
  // ===== BMW =====
  makeCar({ make: "BMW", model: "iX2 xDrive30", type: "BEV", price: 59275, rate: 4.9, grantEligible: false, url: "https://www.bmw.ie/en/all-models/bmw-i/ix2/bmw-ix2.html" }),
  makeCar({ make: "BMW", model: "i5 eDrive40", type: "BEV", price: 74095, rate: 4.9, grantEligible: false, url: "https://www.bmw.ie/en/all-models/bmw-i/i5/bmw-i5-sedan.html" }),
  makeCar({ make: "BMW", model: "iX xDrive40", type: "BEV", price: 87895, rate: 4.9, grantEligible: false, url: "https://www.bmw.ie/en/all-models/bmw-i/ix/bmw-ix.html" }),
  makeCar({ make: "BMW", model: "iX xDrive50", type: "BEV", price: 103895, rate: 4.9, grantEligible: false, url: "https://www.bmw.ie/en/all-models/bmw-i/ix/bmw-ix.html" }),

  // ===== MERCEDES-BENZ =====
  makeCar({ make: "Mercedes-Benz", model: "EQE 300 Saloon", type: "BEV", price: 73690, rate: 4.9, grantEligible: false, url: "https://www.mercedes-benz.ie/passengercars/models/saloon/eqe/overview.html" }),
  makeCar({ make: "Mercedes-Benz", model: "EQS 450+ Saloon", type: "BEV", price: 99660, rate: 4.9, grantEligible: false, url: "https://www.mercedes-benz.ie/passengercars/models/saloon/eqs/overview.html" }),
  makeCar({ make: "Mercedes-Benz", model: "EQE SUV", type: "BEV", price: 95220, rate: 4.9, grantEligible: false, url: "https://www.mercedes-benz.ie/passengercars/models/suv/eqe-suv/overview.html" }),
  makeCar({ make: "Mercedes-Benz", model: "EQS SUV", type: "BEV", price: 123825, rate: 4.9, grantEligible: false, url: "https://www.mercedes-benz.ie/passengercars/models/suv/eqs-suv/overview.html" }),
  makeCar({ make: "Mercedes-Benz", model: "CLA Electric", type: "BEV", price: 53425, rate: 4.9, url: "https://www.mercedes-benz.ie/passengercars/models/saloon/cla/overview.html" }),

  // ===== PORSCHE =====
  makeCar({ make: "Porsche", model: "Taycan GTS", type: "BEV", price: 157000, rate: 4.9, grantEligible: false, url: "https://www.porsche.com/uk/_ireland_/models/taycan/" }),
  makeCar({ make: "Porsche", model: "Taycan Turbo", type: "BEV", price: 185000, rate: 4.9, grantEligible: false, url: "https://www.porsche.com/uk/_ireland_/models/taycan/" }),
  makeCar({ make: "Porsche", model: "Macan Electric", type: "BEV", price: 88746, rate: 4.9, grantEligible: false, url: "https://www.porsche.com/uk/_ireland_/models/macan/" }),
  makeCar({ make: "Porsche", model: "Macan 4 Electric", type: "BEV", price: 92609, rate: 4.9, grantEligible: false, url: "https://www.porsche.com/uk/_ireland_/models/macan/" }),

  // ===== VOLVO =====
  makeCar({ make: "Volvo", model: "EX30 Cross Country", type: "BEV", price: 49655, rate: 4.9, url: "https://www.volvocars.com/ie/cars/ex30/" }),
  makeCar({ make: "Volvo", model: "EX90 Twin Motor", type: "BEV", price: 82595, rate: 4.9, grantEligible: false, url: "https://www.volvocars.com/ie/cars/ex90/" }),
  makeCar({ make: "Volvo", model: "XC40 Recharge PHEV", type: "PHEV", price: 54995, rate: 4.9, grantEligible: false, url: "https://www.volvocars.com/ie/cars/" }),
  makeCar({ make: "Volvo", model: "XC60 Recharge PHEV", type: "PHEV", price: 66995, rate: 4.9, grantEligible: false, url: "https://www.volvocars.com/ie/cars/" }),

  // ===== KIA =====
  makeCar({ make: "Kia", model: "EV4 Fastback", type: "BEV", price: 46175, rate: 0, url: "https://www.kia.com/ie/models/ev4.html" }),
  makeCar({ make: "Kia", model: "EV5", type: "BEV", price: 47625, rate: 0, url: "https://www.kia.com/ie/models/ev5.html" }),
  makeCar({ make: "Kia", model: "Niro EV", type: "BEV", price: 42790, rate: 3.9, url: "https://www.kia.com/ie/models/niro-ev.html" }),
  makeCar({ make: "Kia", model: "Niro PHEV", type: "PHEV", price: 39990, rate: 3.9, grantEligible: false, url: "https://www.kia.com/ie/models/niro-phev.html" }),
  makeCar({ make: "Kia", model: "Niro Hybrid", type: "HEV", price: 33490, rate: 3.9, grantEligible: false, url: "https://www.kia.com/ie/models/niro-hybrid.html" }),
  makeCar({ make: "Kia", model: "Sportage Hybrid", type: "HEV", price: 48000, rate: 3.9, grantEligible: false, url: "https://www.kia.com/ie/models/sportage.html" }),
  makeCar({ make: "Kia", model: "Sportage PHEV", type: "PHEV", price: 49495, rate: 3.9, grantEligible: false, url: "https://www.kia.com/ie/models/sportage-phev.html" }),
  makeCar({ make: "Kia", model: "Sorento PHEV", type: "PHEV", price: 64300, rate: 3.9, grantEligible: false, url: "https://www.kia.com/ie/models/sorento-phev.html" }),

  // ===== HYUNDAI =====
  makeCar({ make: "Hyundai", model: "Kona Hybrid", type: "HEV", price: 29495, rate: 2.49, grantEligible: false, url: "https://www.hyundai.ie/kona/" }),
  makeCar({ make: "Hyundai", model: "Tucson Hybrid", type: "HEV", price: 42995, rate: 3.49, grantEligible: false, url: "https://www.hyundai.ie/tucson/" }),
  makeCar({ make: "Hyundai", model: "Santa Fe Hybrid", type: "HEV", price: 55995, rate: 4.9, grantEligible: false, url: "https://www.hyundai.ie/santa-fe/" }),
  makeCar({ make: "Hyundai", model: "Santa Fe PHEV", type: "PHEV", price: 61995, rate: 4.9, grantEligible: false, url: "https://www.hyundai.ie/santa-fe/" }),

  // ===== TOYOTA =====
  makeCar({ make: "Toyota", model: "Yaris Cross Hybrid", type: "HEV", price: 30500, rate: 3.9, grantEligible: false, url: "https://www.toyota.ie/new-cars/yaris-cross" }),
  makeCar({ make: "Toyota", model: "Corolla Touring Sports Hybrid", type: "HEV", price: 35500, rate: 4.9, grantEligible: false, url: "https://www.toyota.ie/new-cars/corolla-touring-sports" }),
  makeCar({ make: "Toyota", model: "bZ4X", type: "BEV", price: 44995, rate: 3.9, url: "https://www.toyota.ie/new-cars/bz4x" }),
  makeCar({ make: "Toyota", model: "RAV4 PHEV", type: "PHEV", price: 52795, rate: 4.9, grantEligible: false, url: "https://www.toyota.ie/new-cars/rav4-plug-in" }),
  makeCar({ make: "Toyota", model: "Highlander Hybrid", type: "HEV", price: 61995, rate: 4.9, grantEligible: false, url: "https://www.toyota.ie/new-cars/highlander" }),

  // ===== RENAULT (from official price list April 2026) =====
  makeCar({ make: "Renault", model: "Clio Full Hybrid E-Tech", type: "HEV", price: 29495, rate: 3.9, grantEligible: false, url: "https://www.renault.ie/vehicles/clio.html" }),
  makeCar({ make: "Renault", model: "4 E-Tech Electric 40kWh", type: "BEV", price: 26995, rate: 3.9, url: "https://www.renault.ie/vehicles/renault-4.html" }),
  makeCar({ make: "Renault", model: "4 E-Tech Electric 52kWh", type: "BEV", price: 31995, rate: 3.9, url: "https://www.renault.ie/vehicles/renault-4.html" }),
  makeCar({ make: "Renault", model: "Symbioz Full Hybrid E-Tech", type: "HEV", price: 31995, rate: 3.9, grantEligible: false, url: "https://www.renault.ie/vehicles/symbioz.html" }),
  makeCar({ make: "Renault", model: "Austral Full Hybrid E-Tech", type: "HEV", price: 41995, rate: 3.9, grantEligible: false, url: "https://www.renault.ie/vehicles/austral.html" }),
  makeCar({ make: "Renault", model: "Rafale Full Hybrid E-Tech", type: "HEV", price: 47495, rate: 3.9, grantEligible: false, url: "https://www.renault.ie/vehicles/rafale.html" }),
  makeCar({ make: "Renault", model: "Scenic E-Tech 87kWh", type: "BEV", price: 45495, rate: 3.9, url: "https://www.renault.ie/vehicles/scenic-e-tech.html" }),

  // ===== PEUGEOT =====
  makeCar({ make: "Peugeot", model: "308 Hybrid", type: "HEV", price: 37995, rate: 3.9, grantEligible: false, url: "https://www.peugeot.ie/our-models/peugeot-308.html" }),
  makeCar({ make: "Peugeot", model: "e-308", type: "BEV", price: 42995, rate: 1.9, url: "https://www.peugeot.ie/our-models/peugeot-308.html" }),
  makeCar({ make: "Peugeot", model: "e-3008", type: "BEV", price: 45495, rate: 1.9, url: "https://www.peugeot.ie/our-models/new-peugeot-3008.html" }),
  makeCar({ make: "Peugeot", model: "5008 Hybrid", type: "HEV", price: 52495, rate: 3.9, grantEligible: false, url: "https://www.peugeot.ie/our-models/new-peugeot-5008.html" }),
  makeCar({ make: "Peugeot", model: "e-5008", type: "BEV", price: 55495, rate: 1.9, grantEligible: false, url: "https://www.peugeot.ie/our-models/new-peugeot-5008.html" }),

  // ===== VOLKSWAGEN =====
  makeCar({ make: "Volkswagen", model: "ID.3 Pro S 77kWh", type: "BEV", price: 39905, rate: 1.9, url: "https://www.volkswagen.ie/en/models/id3.html" }),
  makeCar({ make: "Volkswagen", model: "ID.4 Pro 77kWh", type: "BEV", price: 44630, rate: 0, url: "https://www.volkswagen.ie/en/models/id4.html" }),
  makeCar({ make: "Volkswagen", model: "ID.5 Pro 77kWh", type: "BEV", price: 47030, rate: 0, url: "https://www.volkswagen.ie/en/models/id5.html" }),
  makeCar({ make: "Volkswagen", model: "ID.5 GTX 79kWh", type: "BEV", price: 58315, rate: 0, grantEligible: false, url: "https://www.volkswagen.ie/en/models/id5.html" }),
  makeCar({ make: "Volkswagen", model: "ID.Buzz Pro", type: "BEV", price: 64415, rate: 0.9, grantEligible: false, url: "https://www.volkswagen.ie/en/models/id-buzz.html" }),
  makeCar({ make: "Volkswagen", model: "ID.Buzz GTX", type: "BEV", price: 74415, rate: 0.9, grantEligible: false, url: "https://www.volkswagen.ie/en/models/id-buzz.html" }),

  // ===== SKODA =====
  makeCar({ make: "Skoda", model: "Enyaq Coupe", type: "BEV", price: 47950, rate: 0, url: "https://www.skoda.ie/models/enyaq-coupe" }),
  makeCar({ make: "Skoda", model: "Elroq 60", type: "BEV", price: 39545, rate: 0, url: "https://www.skoda.ie/models/elroq" }),
  makeCar({ make: "Skoda", model: "Elroq 85", type: "BEV", price: 45545, rate: 0, url: "https://www.skoda.ie/models/elroq" }),
  makeCar({ make: "Skoda", model: "Kodiaq iV PHEV", type: "PHEV", price: 57995, rate: 1.9, grantEligible: false, url: "https://www.skoda.ie/models/kodiaq" }),

  // ===== CUPRA =====
  makeCar({ make: "Cupra", model: "Formentor e-HYBRID 204hp", type: "PHEV", price: 46735, rate: 4.9, grantEligible: false, url: "https://www.cupraofficial.ie/cars/formentor" }),
  makeCar({ make: "Cupra", model: "Leon e-HYBRID 204hp", type: "PHEV", price: 39815, rate: 4.9, grantEligible: false, url: "https://www.cupraofficial.ie/cars/leon" }),
  makeCar({ make: "Cupra", model: "Terramar e-HYBRID", type: "PHEV", price: 48500, rate: 4.9, grantEligible: false, url: "https://www.cupraofficial.ie/cars/terramar" }),
  makeCar({ make: "Cupra", model: "Tavascan VZ 77kWh", type: "BEV", price: 53080, rate: 4.9, url: "https://www.cupraofficial.ie/cars/tavascan" }),

  // ===== BYD =====
  makeCar({ make: "BYD", model: "Seal Design", type: "BEV", price: 47435, rate: 3.5, url: "https://www.bydauto.ie/en/seal" }),
  makeCar({ make: "BYD", model: "ATTO 3 Design", type: "BEV", price: 37110, rate: 2.9, url: "https://www.bydauto.ie/en/atto3" }),

  // ===== MG =====
  makeCar({ make: "MG", model: "MG3 Hybrid+", type: "HEV", price: 22495, rate: 2.9, grantEligible: false, url: "https://www.mg.ie/mg3-hybrid/" }),
  makeCar({ make: "MG", model: "MGS5 EV", type: "BEV", price: 29995, rate: 2.9, url: "https://www.mg.ie/mgs5-ev/" }),
  makeCar({ make: "MG", model: "MG ZS Hybrid+", type: "HEV", price: 28995, rate: 1.9, grantEligible: false, url: "https://www.mg.ie/mg-zs/" }),
  makeCar({ make: "MG", model: "MG HS PHEV", type: "PHEV", price: 38995, rate: 2.9, grantEligible: false, url: "https://www.mg.ie/mg-hs/" }),

  // ===== NISSAN =====
  makeCar({ make: "Nissan", model: "Leaf 40kWh", type: "BEV", price: 23495, rate: 5.9, url: "https://www.nissan.ie/vehicles/new-vehicles/leaf.html" }),
  makeCar({ make: "Nissan", model: "Juke Hybrid", type: "HEV", price: 30900, rate: 5.9, grantEligible: false, url: "https://www.nissan.ie/vehicles/new-vehicles/juke.html" }),
  makeCar({ make: "Nissan", model: "Qashqai e-Power", type: "HEV", price: 39900, rate: 5.9, grantEligible: false, url: "https://www.nissan.ie/vehicles/new-vehicles/qashqai.html" }),
  makeCar({ make: "Nissan", model: "X-Trail e-Power", type: "HEV", price: 49495, rate: 5.9, grantEligible: false, url: "https://www.nissan.ie/vehicles/new-vehicles/x-trail.html" }),

  // ===== MAZDA =====
  makeCar({ make: "Mazda", model: "CX-60 PHEV", type: "PHEV", price: 49000, rate: 5.9, grantEligible: false, url: "https://www.mazda.ie/cars/mazda-cx-60/" }),
  makeCar({ make: "Mazda", model: "CX-80 PHEV", type: "PHEV", price: 58995, rate: 5.9, grantEligible: false, url: "https://www.mazda.ie/cars/mazda-cx-80/" }),
  makeCar({ make: "Mazda", model: "Mazda2 Hybrid", type: "HEV", price: 24995, rate: 5.9, grantEligible: false, url: "https://www.mazda.ie/cars/mazda-mazda2-hybrid/" }),

  // ===== OPEL =====
  makeCar({ make: "Opel", model: "Mokka Electric", type: "BEV", price: 30978, rate: 2.9, url: "https://www.opel.ie/models/mokka-electric.html" }),
  makeCar({ make: "Opel", model: "Mokka Hybrid", type: "HEV", price: 34995, rate: 2.9, grantEligible: false, url: "https://www.opel.ie/models/mokka-hybrid.html" }),
  makeCar({ make: "Opel", model: "Astra Electric", type: "BEV", price: 38995, rate: 2.9, url: "https://www.opel.ie/models/astra-electric.html" }),
  makeCar({ make: "Opel", model: "Astra Hybrid", type: "HEV", price: 35995, rate: 2.9, grantEligible: false, url: "https://www.opel.ie/models/astra-hybrid.html" }),
  makeCar({ make: "Opel", model: "Astra Sports Tourer Electric", type: "BEV", price: 40995, rate: 2.9, url: "https://www.opel.ie/models/astra-sports-tourer-electric.html" }),

  // ===== TESLA =====
  makeCar({ make: "Tesla", model: "Model 3 Long Range AWD", type: "BEV", price: 45484, rate: 1.99, url: "https://www.tesla.com/en_ie/model3" }),
  makeCar({ make: "Tesla", model: "Model 3 Performance", type: "BEV", price: 52984, rate: 1.99, url: "https://www.tesla.com/en_ie/model3" }),
  makeCar({ make: "Tesla", model: "Model Y Long Range AWD", type: "BEV", price: 50832, rate: 1.99, url: "https://www.tesla.com/en_ie/modely" }),
  makeCar({ make: "Tesla", model: "Model Y Performance", type: "BEV", price: 57832, rate: 1.99, grantEligible: false, url: "https://www.tesla.com/en_ie/modely" }),
];

// Add new cars
data.cars.push(...newCars);

// Update metadata
const brands = [...new Set(data.cars.map(c => c.make))].sort();
data.metadata.total_models = data.cars.length;
data.metadata.total_brands = brands.length;
data.metadata.brands = brands;

// Sort cars by make then price
data.cars.sort((a, b) => a.make.localeCompare(b.make) || a.price_eur - b.price_eur);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Database updated: ${data.cars.length} cars across ${brands.length} brands`);
console.log('Brands:', brands.join(', '));

// Summary by brand
const byBrand = {};
data.cars.forEach(c => { byBrand[c.make] = (byBrand[c.make] || 0) + 1; });
Object.entries(byBrand).sort().forEach(([brand, count]) => console.log(`  ${brand}: ${count}`));
