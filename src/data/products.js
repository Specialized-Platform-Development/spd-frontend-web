export const products = [
  {
    id: 1,
    name: "Laptop Gaming Pro",
    price: 15000000,
    image: "💻",
    description: "Laptop gaming dengan spesifikasi tinggi, processor Intel Core i7, RAM 16GB, SSD 512GB, VGA RTX 3060. Cocok untuk gaming dan pekerjaan berat.",
    category: "Elektronik"
  },
  {
    id: 2,
    name: "Smartphone Premium",
    price: 8000000,
    image: "📱",
    description: "Smartphone flagship dengan kamera 108MP, layar AMOLED 120Hz, baterai 5000mAh, dan chipset terbaru. Performa maksimal untuk segala kebutuhan.",
    category: "Elektronik"
  },
  {
    id: 3,
    name: "Headphone Wireless",
    price: 2500000,
    image: "🎧",
    description: "Headphone wireless dengan noise cancellation, audio berkualitas tinggi, baterai tahan hingga 30 jam. Nyaman digunakan seharian.",
    category: "Elektronik"
  },
  {
    id: 4,
    name: "Smartwatch Fitness",
    price: 3500000,
    image: "⌚",
    description: "Smartwatch dengan fitur tracking kesehatan lengkap, GPS, waterproof, dan baterai tahan 7 hari. Teman setia untuk hidup sehat.",
    category: "Elektronik"
  },
  {
    id: 5,
    name: "Kamera Mirrorless",
    price: 12000000,
    image: "📷",
    description: "Kamera mirrorless 24MP dengan video 4K, autofocus cepat, dan stabilisasi gambar. Sempurna untuk fotografer profesional.",
    category: "Elektronik"
  },
  {
    id: 6,
    name: "Tablet Pro",
    price: 9000000,
    image: "📲",
    description: "Tablet dengan layar 12 inch, support stylus, processor powerful untuk produktivitas dan kreativitas maksimal.",
    category: "Elektronik"
  },
  {
    id: 7,
    name: "Speaker Bluetooth",
    price: 1500000,
    image: "🔊",
    description: "Speaker portable dengan suara bass yang kuat, tahan air, dan baterai 12 jam. Perfect untuk outdoor activities.",
    category: "Elektronik"
  },
  {
    id: 8,
    name: "Gaming Console",
    price: 7000000,
    image: "🎮",
    description: "Konsol gaming generasi terbaru dengan grafis 4K, loading super cepat dengan SSD, dan library game yang luas.",
    category: "Elektronik"
  }
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
