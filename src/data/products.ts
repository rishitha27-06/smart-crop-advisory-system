// Import all product images
import tomatoesImg from '@/assets/products/tomatoes.jpg';
import riceImg from '@/assets/products/rice.jpg';
import wheatImg from '@/assets/products/wheat.jpg';
import chiliImg from '@/assets/products/chili.jpg';
import onionsImg from '@/assets/products/onions.jpg';
import potatoesImg from '@/assets/products/potatoes.jpg';

import cornSeedsImg from '@/assets/products/corn-seeds.jpg';
import fertilizerImg from '@/assets/products/fertilizer.jpg';
import pesticideImg from '@/assets/products/pesticide.jpg';
import tomatoSeedsImg from '@/assets/products/tomato-seeds.jpg';
import irrigationImg from '@/assets/products/irrigation.jpg';
import toolsImg from '@/assets/products/tools.jpg';

import tractorImg from '@/assets/products/tractor.jpg';
import harvesterImg from '@/assets/products/harvester.jpg';
import seedDrillImg from '@/assets/products/seed-drill.jpg';
import pumpImg from '@/assets/products/pump.jpg';
import cultivatorImg from '@/assets/products/cultivator.jpg';
import thresherImg from '@/assets/products/thresher.jpg';

export const crops = [
  {
    id: 'crop-1',
    name: 'Organic Tomatoes',
    price: 80,
    image: tomatoesImg,
    location: 'Karnataka',
    description: 'Fresh organic tomatoes grown without pesticides, perfect for cooking and salads',
    category: 'vegetable'
  },
  {
    id: 'crop-2',
    name: 'Basmati Rice',
    price: 120,
    image: riceImg,
    location: 'Punjab',
    description: 'Premium quality basmati rice with long grains and aromatic fragrance',
    category: 'grain'
  },
  {
    id: 'crop-3',
    name: 'Fresh Wheat',
    price: 45,
    image: wheatImg,
    location: 'Uttar Pradesh',
    description: 'High quality wheat grain, perfect for making flour and bread',
    category: 'grain'
  },
  {
    id: 'crop-4',
    name: 'Green Chili',
    price: 60,
    image: chiliImg,
    location: 'Andhra Pradesh',
    description: 'Spicy green chilies perfect for Indian cooking and spice preparation',
    category: 'vegetable'
  },
  {
    id: 'crop-5',
    name: 'Red Onions',
    price: 35,
    image: onionsImg,
    location: 'Maharashtra',
    description: 'Fresh red onions, essential for Indian cooking and daily meals',
    category: 'vegetable'
  },
  {
    id: 'crop-6',
    name: 'Farm Potatoes',
    price: 25,
    image: potatoesImg,
    location: 'West Bengal',
    description: 'High quality potatoes, versatile for all types of cooking',
    category: 'vegetable'
  }
];

export const inputs = [
  {
    id: 'input-1',
    name: 'Hybrid Corn Seeds',
    price: 450,
    image: cornSeedsImg,
    description: 'High yield hybrid corn seeds for maximum crop production',
    category: 'seeds'
  },
  {
    id: 'input-2',
    name: 'NPK Fertilizer',
    price: 800,
    image: fertilizerImg,
    description: 'Complete NPK fertilizer for balanced nutrition of all crops',
    category: 'fertilizer'
  },
  {
    id: 'input-3',
    name: 'Organic Pesticide',
    price: 350,
    image: pesticideImg,
    description: 'Eco-friendly organic pesticide for safe crop protection',
    category: 'pesticide'
  },
  {
    id: 'input-4',
    name: 'Premium Tomato Seeds',
    price: 250,
    image: tomatoSeedsImg,
    description: 'High quality tomato seeds for better yield and disease resistance',
    category: 'seeds'
  },
  {
    id: 'input-5',
    name: 'Drip Irrigation Kit',
    price: 2500,
    image: irrigationImg,
    description: 'Complete drip irrigation system for water-efficient farming',
    category: 'tools'
  },
  {
    id: 'input-6',
    name: 'Garden Tools Set',
    price: 1200,
    image: toolsImg,
    description: 'Complete set of farming tools including hoe, shovel, and rake',
    category: 'tools'
  }
];

export const machinery = [
  {
    id: 'machine-1',
    name: 'Mini Tractor',
    price: 25000,
    image: tractorImg,
    description: 'Compact tractor perfect for small to medium farms, fuel efficient',
    type: 'rent',
    category: 'tractor'
  },
  {
    id: 'machine-2',
    name: 'Combine Harvester',
    price: 15000,
    image: harvesterImg,
    description: 'Efficient crop harvesting machine for wheat, rice, and other grains',
    type: 'rent',
    category: 'harvester'
  },
  {
    id: 'machine-3',
    name: 'Precision Seed Drill',
    price: 8000,
    image: seedDrillImg,
    description: 'Precision seed planting machine for optimal spacing and depth',
    type: 'rent',
    category: 'planter'
  },
  {
    id: 'machine-4',
    name: 'Water Pump',
    price: 5000,
    image: pumpImg,
    description: 'High efficiency water pump for irrigation and water management',
    type: 'rent',
    category: 'pump'
  },
  {
    id: 'machine-5',
    name: 'Field Cultivator',
    price: 6000,
    image: cultivatorImg,
    description: 'Soil cultivation equipment for land preparation and weed control',
    type: 'rent',
    category: 'cultivator'
  },
  {
    id: 'machine-6',
    name: 'Grain Thresher',
    price: 12000,
    image: thresherImg,
    description: 'Grain threshing machine for separating grain from crops',
    type: 'rent',
    category: 'thresher'
  }
];

export const articles = {
  en: [
    {
      id: 'article-1',
      title: 'Modern Farming Techniques',
      summary: 'Learn about the latest farming methods that increase yield and reduce costs...',
      fullContent: `Modern farming uses precision agriculture, AI-driven crop monitoring, 
drip irrigation, and high-yield seeds. These methods increase productivity 
and reduce costs. Farmers can also use drones for pesticide spraying 
and soil analysis to improve efficiency.`,
      category: 'techniques',
      readTime: '5 min read'
    },
    {
      id: 'article-2',
      title: 'Organic Farming Benefits',
      summary: 'Discover the advantages of organic farming for both farmers and consumers...',
      fullContent: `Organic farming avoids harmful pesticides and focuses on natural compost, 
bio-fertilizers, and eco-friendly pest control. It improves soil fertility, 
protects biodiversity, and ensures healthy food for consumers.`,
      category: 'organic',
      readTime: '7 min read'
    },
    {
      id: 'article-3',
      title: 'Crop Rotation Guide',
      summary: 'Master the art of crop rotation to maintain soil health and maximize profits...',
      fullContent: `Crop rotation helps maintain soil fertility and prevents pest buildup. 
For example, planting legumes after cereals restores nitrogen in the soil. 
This practice reduces dependency on chemical fertilizers and improves yields.`,
      category: 'planning',
      readTime: '6 min read'
    }
  ],
  hi: [
    {
      id: 'article-1',
      title: 'आधुनिक कृषि तकनीक',
      summary: 'नवीनतम कृषि पद्धतियों के बारे में जानें जो उत्पादन बढ़ाती हैं और लागत कम करती हैं...',
      fullContent: `आधुनिक कृषि तकनीकों में ड्रिप सिंचाई, सटीक खेती, 
ड्रोन से निगरानी और उच्च गुणवत्ता वाले बीजों का उपयोग शामिल है। 
ये तरीके किसानों को लागत कम करने और उत्पादन बढ़ाने में मदद करते हैं।`,
      category: 'तकनीक',
      readTime: '5 मिनट पढ़ें'
    },
    {
      id: 'article-2',
      title: 'जैविक खेती के फायदे',
      summary: 'किसानों और उपभोक्ताओं दोनों के लिए जैविक खेती के लाभों की खोज करें...',
      fullContent: `जैविक खेती में रासायनिक खाद और कीटनाशक का प्रयोग नहीं होता। 
यह मिट्टी की उर्वरता को बनाए रखती है, पर्यावरण को सुरक्षित रखती है 
और उपभोक्ताओं को स्वास्थ्यवर्धक भोजन प्रदान करती है।`,
      category: 'जैविक',
      readTime: '7 मिनट पढ़ें'
    },
    {
      id: 'article-3',
      title: 'फसल चक्र गाइड',
      summary: 'मिट्टी के स्वास्थ्य को बनाए रखने और मुनाफा बढ़ाने के लिए फसल चक्र की कला में महारत हासिल करें...',
      fullContent: `फसल चक्र में एक ही खेत में अलग-अलग फसलें समय-समय पर बोई जाती हैं। 
इससे मिट्टी में पोषक तत्व संतुलित रहते हैं और कीटों का प्रकोप कम होता है।`,
      category: 'योजना',
      readTime: '6 मिनट पढ़ें'
    }
  ],
  te: [
    {
      id: 'article-1',
      title: 'ఆధునిక వ్యవసాయ పద్ధతులు',
      summary: 'దిగుబడిని పెంచే మరియు ఖర్చులను తగ్గించే తాజా వ్యవసాయ పద్ధతుల గురించి తెలుసుకోండి...',
      fullContent: `ఆధునిక వ్యవసాయం లో డ్రిప్ ఇరిగేషన్, 
ప్రెసిషన్ ఫార్మింగ్, డ్రోన్ల ద్వారా పంటల పర్యవేక్షణ, 
మరియు అధిక దిగుబడి విత్తనాల వాడకం ఉన్నాయి. 
ఇవి రైతుల ఉత్పత్తి పెంచి ఖర్చులు తగ్గిస్తాయి.`,
      category: 'పద్ధతులు',
      readTime: '5 నిమిషాలు చదవండి'
    },
    {
      id: 'article-2',
      title: 'సేంద్రీయ వ్యవసాయ ప్రయోజనాలు',
      summary: 'రైతులు మరియు వినియోగదారులు ఇద్దరికీ సేంద్రీయ వ్యవసాయం యొక్క ప్రయోజనాలను కనుగొనండి...',
      fullContent: `సేంద్రీయ వ్యవసాయంలో రసాయన ఎరువులు మరియు పురుగుమందులు వాడరు. 
ఇది మట్టిని సారవంతం చేస్తుంది, పర్యావరణాన్ని రక్షిస్తుంది, 
మరియు ఆరోగ్యకరమైన ఆహారం అందిస్తుంది.`,
      category: 'సేంద్రీయ',
      readTime: '7 నిమిషాలు చదవండి'
    },
    {
      id: 'article-3',
      title: 'పంట మార్పిడి గైడ్',
      summary: 'మట్టి ఆరోగ్యాన్ని కాపాడుకోవడానికి మరియు లాభాలను పెంచడానికి పంట మార్పిడి కళలో నైపుణ్యం సాధించండి...',
      fullContent: `పంట మార్పిడి ద్వారా రైతులు ఒకే పొలంలో వేర్వేరు పంటలు వేయవచ్చు. 
దీనివల్ల మట్టిలో పోషకాలు పునరుద్ధరించబడతాయి మరియు కీటకాలు తగ్గుతాయి.`,
      category: 'ప్రణాళిక',
      readTime: '6 నిమిషాలు చదవండి'
    }
  ]
};
