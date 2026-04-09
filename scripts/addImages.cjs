const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'EV_Hybrid_Ireland_Comparison.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Image URLs from manufacturer press sites and reliable sources
// Using transparent/clean product shots where possible
const imageMap = {
  // Tesla - official press images
  "Tesla|Model 3 RWD": "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD-Animation.jpg",
  "Tesla|Model 3 Long Range AWD": "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD-Animation.jpg",
  "Tesla|Model 3 Performance": "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD-Animation.jpg",
  "Tesla|Model Y RWD": "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD-Animation.jpg",
  "Tesla|Model Y Long Range AWD": "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD-Animation.jpg",
  "Tesla|Model Y Performance": "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD-Animation.jpg",
};

// Apply images
let added = 0;
data.cars.forEach(car => {
  const key = `${car.make}|${car.model}`;
  if (imageMap[key]) {
    car.imageUrl = imageMap[key];
    added++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Added ${added} images out of ${data.cars.length} cars`);
console.log(`Cars without images: ${data.cars.length - added}`);
