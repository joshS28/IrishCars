// Body style and range data for each car model
// Key format: "Make|Model"
const extras = {
  // Hyundai
  "Hyundai|Inster": { bodyStyle: "Hatchback", rangeKm: 327 },
  "Hyundai|Kona Electric": { bodyStyle: "SUV", rangeKm: 514 },
  "Hyundai|Ioniq 5": { bodyStyle: "SUV", rangeKm: 507 },
  "Hyundai|Ioniq 6": { bodyStyle: "Saloon", rangeKm: 614 },
  "Hyundai|Ioniq 9": { bodyStyle: "SUV", rangeKm: 620 },
  "Hyundai|Tucson PHEV": { bodyStyle: "SUV", rangeKm: 62 },
  "Hyundai|Kona Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Hyundai|Tucson Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Hyundai|Santa Fe Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Hyundai|Santa Fe PHEV": { bodyStyle: "SUV", rangeKm: 58 },

  // Opel
  "Opel|Frontera Electric": { bodyStyle: "SUV", rangeKm: 310 },
  "Opel|Frontera Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Opel|Corsa Electric SC": { bodyStyle: "Hatchback", rangeKm: 402 },
  "Opel|Corsa Electric Elite": { bodyStyle: "Hatchback", rangeKm: 402 },
  "Opel|Corsa Hybrid": { bodyStyle: "Hatchback", rangeKm: null },
  "Opel|Grandland Electric SC": { bodyStyle: "SUV", rangeKm: 523 },
  "Opel|Grandland Electric Elegance": { bodyStyle: "SUV", rangeKm: 523 },
  "Opel|Grandland Electric GS": { bodyStyle: "SUV", rangeKm: 523 },
  "Opel|Grandland Hybrid SC": { bodyStyle: "SUV", rangeKm: null },
  "Opel|Grandland Hybrid Elegance": { bodyStyle: "SUV", rangeKm: null },
  "Opel|Grandland Hybrid GS": { bodyStyle: "SUV", rangeKm: null },
  "Opel|Mokka Electric": { bodyStyle: "SUV", rangeKm: 402 },
  "Opel|Mokka Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Opel|Astra Electric": { bodyStyle: "Hatchback", rangeKm: 418 },
  "Opel|Astra Hybrid": { bodyStyle: "Hatchback", rangeKm: null },
  "Opel|Astra Sports Tourer Electric": { bodyStyle: "Estate", rangeKm: 413 },

  // Toyota
  "Toyota|Aygo X Hybrid": { bodyStyle: "Hatchback", rangeKm: null },
  "Toyota|Yaris Hybrid": { bodyStyle: "Hatchback", rangeKm: null },
  "Toyota|Corolla Hatchback Hybrid": { bodyStyle: "Hatchback", rangeKm: null },
  "Toyota|Corolla Saloon Hybrid": { bodyStyle: "Saloon", rangeKm: null },
  "Toyota|C-HR Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Toyota|C-HR PHEV": { bodyStyle: "SUV", rangeKm: 66 },
  "Toyota|RAV4 Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Toyota|Prius PHEV": { bodyStyle: "Saloon", rangeKm: 69 },
  "Toyota|Yaris Cross Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Toyota|Corolla Touring Sports Hybrid": { bodyStyle: "Estate", rangeKm: null },
  "Toyota|bZ4X": { bodyStyle: "SUV", rangeKm: 516 },
  "Toyota|RAV4 PHEV": { bodyStyle: "SUV", rangeKm: 75 },
  "Toyota|Highlander Hybrid": { bodyStyle: "SUV", rangeKm: null },

  // Kia
  "Kia|EV3": { bodyStyle: "SUV", rangeKm: 436 },
  "Kia|EV4": { bodyStyle: "Saloon", rangeKm: 490 },
  "Kia|EV6": { bodyStyle: "SUV", rangeKm: 528 },
  "Kia|EV9": { bodyStyle: "SUV", rangeKm: 541 },
  "Kia|EV4 Fastback": { bodyStyle: "Saloon", rangeKm: 490 },
  "Kia|EV5": { bodyStyle: "SUV", rangeKm: 480 },
  "Kia|Niro EV": { bodyStyle: "SUV", rangeKm: 463 },
  "Kia|Niro PHEV": { bodyStyle: "SUV", rangeKm: 65 },
  "Kia|Niro Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Kia|Sportage Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Kia|Sportage PHEV": { bodyStyle: "SUV", rangeKm: 70 },
  "Kia|Sorento PHEV": { bodyStyle: "SUV", rangeKm: 57 },

  // Cupra
  "Cupra|Born e-Boost 59kWh": { bodyStyle: "Hatchback", rangeKm: 424 },
  "Cupra|Born VZ 79kWh": { bodyStyle: "Hatchback", rangeKm: 540 },
  "Cupra|Tavascan 77kWh": { bodyStyle: "SUV", rangeKm: 522 },
  "Cupra|Tavascan VZ 77kWh": { bodyStyle: "SUV", rangeKm: 502 },
  "Cupra|Formentor e-HYBRID 204hp": { bodyStyle: "SUV", rangeKm: 62 },
  "Cupra|Leon e-HYBRID 204hp": { bodyStyle: "Hatchback", rangeKm: 62 },
  "Cupra|Terramar e-HYBRID": { bodyStyle: "SUV", rangeKm: 100 },

  // BYD
  "BYD|Dolphin Surf Active": { bodyStyle: "Hatchback", rangeKm: 312 },
  "BYD|Dolphin Surf Boost": { bodyStyle: "Hatchback", rangeKm: 427 },
  "BYD|Dolphin Surf Comfort": { bodyStyle: "Hatchback", rangeKm: 427 },
  "BYD|ATTO 3 Comfort": { bodyStyle: "SUV", rangeKm: 420 },
  "BYD|Seal U Hybrid": { bodyStyle: "SUV", rangeKm: 80 },
  "BYD|Sealion 7": { bodyStyle: "SUV", rangeKm: 502 },
  "BYD|Seal Design": { bodyStyle: "Saloon", rangeKm: 570 },
  "BYD|ATTO 3 Design": { bodyStyle: "SUV", rangeKm: 420 },

  // Tesla
  "Tesla|Model 3 RWD": { bodyStyle: "Saloon", rangeKm: 554 },
  "Tesla|Model Y RWD": { bodyStyle: "SUV", rangeKm: 455 },
  "Tesla|Model 3 Long Range AWD": { bodyStyle: "Saloon", rangeKm: 702 },
  "Tesla|Model 3 Performance": { bodyStyle: "Saloon", rangeKm: 528 },
  "Tesla|Model Y Long Range AWD": { bodyStyle: "SUV", rangeKm: 533 },
  "Tesla|Model Y Performance": { bodyStyle: "SUV", rangeKm: 514 },

  // Mazda
  "Mazda|CX-5 Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Mazda|CX-60 PHEV": { bodyStyle: "SUV", rangeKm: 63 },
  "Mazda|CX-80 PHEV": { bodyStyle: "SUV", rangeKm: 60 },
  "Mazda|Mazda2 Hybrid": { bodyStyle: "Hatchback", rangeKm: null },

  // Mercedes-Benz
  "Mercedes-Benz|EQA 250+": { bodyStyle: "SUV", rangeKm: 560 },
  "Mercedes-Benz|EQB": { bodyStyle: "SUV", rangeKm: 423 },
  "Mercedes-Benz|EQE 300 Saloon": { bodyStyle: "Saloon", rangeKm: 647 },
  "Mercedes-Benz|EQS 450+ Saloon": { bodyStyle: "Saloon", rangeKm: 770 },
  "Mercedes-Benz|EQE SUV": { bodyStyle: "SUV", rangeKm: 558 },
  "Mercedes-Benz|EQS SUV": { bodyStyle: "SUV", rangeKm: 660 },
  "Mercedes-Benz|CLA Electric": { bodyStyle: "Saloon", rangeKm: 750 },

  // BMW
  "BMW|iX1 eDrive20": { bodyStyle: "SUV", rangeKm: 475 },
  "BMW|i4 eDrive35": { bodyStyle: "Saloon", rangeKm: 483 },
  "BMW|iX3": { bodyStyle: "SUV", rangeKm: 461 },
  "BMW|iX M70 xDrive": { bodyStyle: "SUV", rangeKm: 600 },
  "BMW|iX2 xDrive30": { bodyStyle: "SUV", rangeKm: 449 },
  "BMW|i5 eDrive40": { bodyStyle: "Saloon", rangeKm: 582 },
  "BMW|iX xDrive40": { bodyStyle: "SUV", rangeKm: 425 },
  "BMW|iX xDrive50": { bodyStyle: "SUV", rangeKm: 630 },

  // MG
  "MG|MG4 EV Standard Range": { bodyStyle: "Hatchback", rangeKm: 350 },
  "MG|MG4 EV Long Range": { bodyStyle: "Hatchback", rangeKm: 450 },
  "MG|MG4 EV Extended Range": { bodyStyle: "Hatchback", rangeKm: 520 },
  "MG|MG4 XPower": { bodyStyle: "Hatchback", rangeKm: 385 },
  "MG|MG5 EV Long Range": { bodyStyle: "Estate", rangeKm: 400 },
  "MG|MG ZS EV Long Range": { bodyStyle: "SUV", rangeKm: 440 },
  "MG|MG3 Hybrid+": { bodyStyle: "Hatchback", rangeKm: null },
  "MG|MGS5 EV": { bodyStyle: "SUV", rangeKm: 400 },
  "MG|MG ZS Hybrid+": { bodyStyle: "SUV", rangeKm: null },
  "MG|MG HS PHEV": { bodyStyle: "SUV", rangeKm: 52 },
  "MG|Cyberster": { bodyStyle: "Saloon", rangeKm: 507 },
  "MG|S6 EV": { bodyStyle: "SUV", rangeKm: 530 },

  // Audi
  "Audi|Q4 e-tron 40": { bodyStyle: "SUV", rangeKm: 529 },
  "Audi|Q4 e-tron 50 quattro": { bodyStyle: "SUV", rangeKm: 488 },
  "Audi|Q6 e-tron": { bodyStyle: "SUV", rangeKm: 625 },
  "Audi|SQ6 e-tron": { bodyStyle: "SUV", rangeKm: 545 },
  "Audi|A6 Sportback e-tron": { bodyStyle: "Saloon", rangeKm: 750 },
  "Audi|e-tron GT": { bodyStyle: "Saloon", rangeKm: 609 },
  "Audi|RS e-tron GT": { bodyStyle: "Saloon", rangeKm: 592 },

  // Ford
  "Ford|Puma Gen-E": { bodyStyle: "SUV", rangeKm: 376 },
  "Ford|Explorer Electric": { bodyStyle: "SUV", rangeKm: 602 },
  "Ford|Capri Electric": { bodyStyle: "SUV", rangeKm: 627 },
  "Ford|Mustang Mach-E": { bodyStyle: "SUV", rangeKm: 600 },

  // Citroen
  "Citroen|e-C3": { bodyStyle: "Hatchback", rangeKm: 320 },
  "Citroen|e-C3 Aircross": { bodyStyle: "SUV", rangeKm: 384 },
  "Citroen|e-C4": { bodyStyle: "Hatchback", rangeKm: 420 },
  "Citroen|e-C4 X": { bodyStyle: "Saloon", rangeKm: 421 },
  "Citroen|e-C5 Aircross": { bodyStyle: "SUV", rangeKm: 680 },
  "Citroen|e-Berlingo Electric": { bodyStyle: "Estate", rangeKm: 284 },

  // Fiat
  "Fiat|500e": { bodyStyle: "Hatchback", rangeKm: 320 },
  "Fiat|600e": { bodyStyle: "SUV", rangeKm: 406 },
  "Fiat|Grande Panda Electric": { bodyStyle: "SUV", rangeKm: 320 },

  // MINI
  "MINI|Cooper Electric": { bodyStyle: "Hatchback", rangeKm: 402 },
  "MINI|Aceman": { bodyStyle: "SUV", rangeKm: 405 },
  "MINI|Countryman Electric": { bodyStyle: "SUV", rangeKm: 462 },

  // Polestar
  "Polestar|2 Standard Range": { bodyStyle: "Saloon", rangeKm: 455 },
  "Polestar|2 Long Range": { bodyStyle: "Saloon", rangeKm: 551 },
  "Polestar|3": { bodyStyle: "SUV", rangeKm: 610 },
  "Polestar|4": { bodyStyle: "SUV", rangeKm: 600 },

  // Alfa Romeo
  "Alfa Romeo|Junior Elettrica": { bodyStyle: "Hatchback", rangeKm: 410 },

  // Dacia
  "Dacia|Spring Expression": { bodyStyle: "Hatchback", rangeKm: 225 },
  "Dacia|Spring Extreme": { bodyStyle: "Hatchback", rangeKm: 225 },

  // DS
  "DS|3 E-Tense": { bodyStyle: "SUV", rangeKm: 404 },
  "DS|4 E-Tense": { bodyStyle: "Hatchback", rangeKm: 420 },

  // Jeep
  "Jeep|Avenger Electric": { bodyStyle: "SUV", rangeKm: 400 },

  // Honda
  "Honda|e:Ny1": { bodyStyle: "SUV", rangeKm: 412 },

  // Lexus
  "Lexus|RZ 450e": { bodyStyle: "SUV", rangeKm: 568 },

  // Smart
  "Smart|#1": { bodyStyle: "SUV", rangeKm: 440 },
  "Smart|#3": { bodyStyle: "SUV", rangeKm: 455 },

  // Subaru
  "Subaru|Solterra": { bodyStyle: "SUV", rangeKm: 566 },

  // Suzuki
  "Suzuki|e Vitara": { bodyStyle: "SUV", rangeKm: 426 },

  // Xpeng
  "Xpeng|G6": { bodyStyle: "SUV", rangeKm: 525 },
  "Xpeng|G9": { bodyStyle: "SUV", rangeKm: 585 },

  // Zeekr
  "Zeekr|X": { bodyStyle: "SUV", rangeKm: 445 },
  "Zeekr|7X": { bodyStyle: "SUV", rangeKm: 615 },
  "Zeekr|001": { bodyStyle: "Saloon", rangeKm: 620 },

  // Lotus
  "Lotus|Eletre": { bodyStyle: "SUV", rangeKm: 600 },
  "Lotus|Emeya": { bodyStyle: "Saloon", rangeKm: 650 },

  // Missing from existing brands
  "BMW|i7 xDrive60": { bodyStyle: "Saloon", rangeKm: 623 },
  "BYD|Atto 2": { bodyStyle: "SUV", rangeKm: 312 },
  "Mercedes-Benz|EQV 300": { bodyStyle: "Estate", rangeKm: 364 },
  "Mercedes-Benz|G 580 Electric": { bodyStyle: "SUV", rangeKm: 473 },
  "Mercedes-Benz|GLC Electric": { bodyStyle: "SUV", rangeKm: 701 },
  "Nissan|Micra Electric": { bodyStyle: "Hatchback", rangeKm: 416 },
  "Mazda|6e": { bodyStyle: "Saloon", rangeKm: 552 },
  "Mazda|MX-30 EV": { bodyStyle: "SUV", rangeKm: 200 },
  "Peugeot|e-408": { bodyStyle: "Saloon", rangeKm: 453 },
  "Peugeot|e-Rifter": { bodyStyle: "Estate", rangeKm: 343 },
  "Porsche|Taycan Cross Turismo": { bodyStyle: "Estate", rangeKm: 650 },
  "Porsche|Taycan Sport Turismo": { bodyStyle: "Estate", rangeKm: 650 },
  "Renault|Twingo E-Tech": { bodyStyle: "Hatchback", rangeKm: 262 },
  "Toyota|Urban Cruiser": { bodyStyle: "SUV", rangeKm: 400 },
  "Volvo|EC40": { bodyStyle: "SUV", rangeKm: 582 },
  "Volvo|ES90": { bodyStyle: "Saloon", rangeKm: 700 },
  "Volvo|EX60": { bodyStyle: "SUV", rangeKm: 810 },
  "Cupra|Raval": { bodyStyle: "Hatchback", rangeKm: 440 },

  // Nissan
  "Nissan|Leaf": { bodyStyle: "Hatchback", rangeKm: 385 },
  "Nissan|Ariya 63kWh": { bodyStyle: "SUV", rangeKm: 403 },
  "Nissan|Ariya 87kWh": { bodyStyle: "SUV", rangeKm: 533 },
  "Nissan|Leaf 40kWh": { bodyStyle: "Hatchback", rangeKm: 270 },
  "Nissan|Juke Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Nissan|Qashqai e-Power": { bodyStyle: "SUV", rangeKm: null },
  "Nissan|X-Trail e-Power": { bodyStyle: "SUV", rangeKm: null },

  // Peugeot
  "Peugeot|e-208": { bodyStyle: "Hatchback", rangeKm: 400 },
  "Peugeot|e-2008": { bodyStyle: "SUV", rangeKm: 406 },
  "Peugeot|3008 Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Peugeot|408 PHEV": { bodyStyle: "Saloon", rangeKm: 64 },
  "Peugeot|308 Hybrid": { bodyStyle: "Hatchback", rangeKm: null },
  "Peugeot|e-308": { bodyStyle: "Hatchback", rangeKm: 416 },
  "Peugeot|e-3008": { bodyStyle: "SUV", rangeKm: 527 },
  "Peugeot|5008 Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Peugeot|e-5008": { bodyStyle: "SUV", rangeKm: 502 },

  // Porsche
  "Porsche|Taycan RWD": { bodyStyle: "Saloon", rangeKm: 678 },
  "Porsche|Taycan 4S": { bodyStyle: "Saloon", rangeKm: 640 },
  "Porsche|Taycan GTS": { bodyStyle: "Saloon", rangeKm: 590 },
  "Porsche|Taycan Turbo": { bodyStyle: "Saloon", rangeKm: 570 },
  "Porsche|Macan Electric": { bodyStyle: "SUV", rangeKm: 513 },
  "Porsche|Macan 4 Electric": { bodyStyle: "SUV", rangeKm: 591 },

  // Renault
  "Renault|5 E-Tech": { bodyStyle: "Hatchback", rangeKm: 400 },
  "Renault|Megane E-Tech": { bodyStyle: "Hatchback", rangeKm: 450 },
  "Renault|Scenic E-Tech": { bodyStyle: "SUV", rangeKm: 625 },
  "Renault|Captur E-Tech Hybrid": { bodyStyle: "SUV", rangeKm: null },
  "Renault|Clio Full Hybrid E-Tech": { bodyStyle: "Hatchback", rangeKm: null },
  "Renault|4 E-Tech Electric 40kWh": { bodyStyle: "Hatchback", rangeKm: 300 },
  "Renault|4 E-Tech Electric 52kWh": { bodyStyle: "Hatchback", rangeKm: 400 },
  "Renault|Symbioz Full Hybrid E-Tech": { bodyStyle: "SUV", rangeKm: null },
  "Renault|Austral Full Hybrid E-Tech": { bodyStyle: "SUV", rangeKm: null },
  "Renault|Rafale Full Hybrid E-Tech": { bodyStyle: "SUV", rangeKm: null },
  "Renault|Scenic E-Tech 87kWh": { bodyStyle: "SUV", rangeKm: 625 },

  // Skoda
  "Skoda|Elroq": { bodyStyle: "SUV", rangeKm: 370 },
  "Skoda|Enyaq": { bodyStyle: "SUV", rangeKm: 545 },
  "Skoda|Enyaq (higher spec)": { bodyStyle: "SUV", rangeKm: 545 },
  "Skoda|Superb iV PHEV": { bodyStyle: "Estate", rangeKm: 62 },
  "Skoda|Enyaq Coupe": { bodyStyle: "SUV", rangeKm: 545 },
  "Skoda|Elroq 60": { bodyStyle: "SUV", rangeKm: 400 },
  "Skoda|Elroq 85": { bodyStyle: "SUV", rangeKm: 560 },
  "Skoda|Kodiaq iV PHEV": { bodyStyle: "SUV", rangeKm: 60 },

  // Volkswagen
  "Volkswagen|ID.3 Pure 52kWh": { bodyStyle: "Hatchback", rangeKm: 386 },
  "Volkswagen|ID.4 Pure 52kWh": { bodyStyle: "SUV", rangeKm: 361 },
  "Volkswagen|ID.4 GTX Plus 79kWh": { bodyStyle: "SUV", rangeKm: 539 },
  "Volkswagen|ID.5 Pure 52kWh": { bodyStyle: "SUV", rangeKm: 370 },
  "Volkswagen|ID.7 Pro Plus": { bodyStyle: "Saloon", rangeKm: 621 },
  "Volkswagen|ID.7 GTX Plus": { bodyStyle: "Saloon", rangeKm: 595 },
  "Volkswagen|ID.7 Tourer Pure Plus": { bodyStyle: "Estate", rangeKm: 584 },
  "Volkswagen|ID.7 Tourer GTX Plus": { bodyStyle: "Estate", rangeKm: 560 },
  "Volkswagen|ID.3 Pro S 77kWh": { bodyStyle: "Hatchback", rangeKm: 551 },
  "Volkswagen|ID.4 Pro 77kWh": { bodyStyle: "SUV", rangeKm: 529 },
  "Volkswagen|ID.5 Pro 77kWh": { bodyStyle: "SUV", rangeKm: 540 },
  "Volkswagen|ID.5 GTX 79kWh": { bodyStyle: "SUV", rangeKm: 520 },
  "Volkswagen|ID.Buzz Pro": { bodyStyle: "Estate", rangeKm: 461 },
  "Volkswagen|ID.Buzz GTX": { bodyStyle: "Estate", rangeKm: 425 },

  // Volvo
  "Volvo|EX30 Plus RWD": { bodyStyle: "SUV", rangeKm: 476 },
  "Volvo|EX40": { bodyStyle: "SUV", rangeKm: 468 },
  "Volvo|EX30 Cross Country": { bodyStyle: "SUV", rangeKm: 446 },
  "Volvo|EX90 Twin Motor": { bodyStyle: "SUV", rangeKm: 580 },
  "Volvo|XC40 Recharge PHEV": { bodyStyle: "SUV", rangeKm: 48 },
  "Volvo|XC60 Recharge PHEV": { bodyStyle: "SUV", rangeKm: 55 },
}

export function getCarExtras(car) {
  const key = `${car.make}|${car.model}`
  return extras[key] || { bodyStyle: 'Unknown', rangeKm: null }
}

export const BODY_STYLES = ['Hatchback', 'SUV', 'Saloon', 'Estate']
