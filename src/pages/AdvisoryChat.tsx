import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, MicOff, Send, Volume2, VolumeX, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language: string;
}

import { useTranslation } from 'react-i18next';

const AdvisoryChat = () => {
  const { i18n } = useTranslation();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI farming assistant. Ask me about cultivation, fertilizers, pests, water needs, or market prices.",
      sender: 'bot',
      timestamp: new Date(),
      language: 'en'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const { toast } = useToast();
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<any>(null);

  // Expanded responses with cultivation, fertilizers, pests, water, and market price
  const responses: any = {
    en: {
      wheat: {
        cultivation: "🌾 Wheat Cultivation:\n1. Soil: Loamy, well-drained\n2. Seeds: HI-1544, PBW-725\n3. Fertilizer: 150:75:60 NPK kg/ha\n4. Irrigation: First after 20–25 days, then every 20–25 days\n5. Harvest: 130–150 days",
        fertilizer: "Fertilizers for Wheat:\n• Basal: Urea, DAP, MOP\n• Micronutrients: Zinc Sulphate\n• Organic: FYM 10 tons/ha",
        pests: "Wheat Pests/Diseases:\n• Aphids → Imidacloprid\n• Rust → Propiconazole\n• Termites → Chlorpyriphos",
        water: "Wheat requires around 450–650 mm of water during the crop season.",
        market: "Market price of Wheat: ₹2200–2500 per quintal (varies by region)"
      },
      rice: {
        cultivation: "🌾 Rice Cultivation:\n1. Soil: Clay loam, well-drained\n2. Seeds: IR-36, Pusa Basmati\n3. Fertilizer: 120:60:40 NPK kg/ha\n4. Irrigation: Keep flooded 5–7cm\n5. Harvest: 120–140 days",
        fertilizer: "Fertilizers for Rice:\n• Basal: Urea, DAP\n• Micronutrients: Zinc, Boron\n• Organic: FYM 8–10 tons/ha",
        pests: "Rice Diseases:\n• Blast → Carbendazim\n• Brown spot → Mancozeb\n• Sheath blight → Tricyclazole",
        water: "Rice requires 1000–1500 mm of water per season.",
        market: "Market price of Rice: ₹3000–3500 per quintal (varies by variety)"
      },
      general: "Ask me about wheat, rice, tomato, maize, sugarcane, chili, soybean cultivation, fertilizers, pests, irrigation, or market price."
    },
    hi: {
      wheat: {
        cultivation: "🌾 गेहूँ की खेती:\n1. मिट्टी: दोमट, अच्छी जल निकासी\n2. बीज: HI-1544, PBW-725\n3. उर्वरक: 150:75:60 NPK किग्रा/हेक्टेयर\n4. सिंचाई: 20–25 दिन के बाद पहली बार, फिर हर 20–25 दिन\n5. कटाई: 130–150 दिन",
        fertilizer: "गेहूँ के लिए उर्वरक:\n• बेसल: यूरिया, DAP, MOP\n• सूक्ष्म पोषक: जस्ता सल्फेट\n• जैविक: FYM 10 टन/हेक्टेयर",
        pests: "गेहूँ की बीमारियाँ/कीट:\n• एफिड्स → इमिडाक्लोप्रिड\n• रस्ट → प्रोपीकोनाज़ोल\n• दीमक → क्लोरपायरिफॉस",
        water: "गेहूँ को पूरे मौसम में लगभग 450–650 मिमी पानी चाहिए।",
        market: "गेहूँ का बाजार मूल्य: ₹2200–2500 प्रति क्विंटल (क्षेत्रानुसार भिन्न)"
      },
      rice: {
        cultivation: "🌾 धान की खेती:\n1. मिट्टी: चिकनी दोमट, अच्छी जल निकासी\n2. बीज: IR-36, पुसा बासमती\n3. उर्वरक: 120:60:40 NPK किग्रा/हेक्टेयर\n4. सिंचाई: 5–7 सेमी पानी बनाए रखें\n5. कटाई: 120–140 दिन",
        fertilizer: "धान के लिए उर्वरक:\n• बेसल: यूरिया, DAP\n• सूक्ष्म पोषक: जस्ता, बोरोन\n• जैविक: FYM 8–10 टन/हेक्टेयर",
        pests: "धान की बीमारियाँ:\n• ब्लास्ट → कार्बेंडाजिम\n• ब्राउन स्पॉट → मैनकोज़ेब\n• शीथ ब्लाइट → ट्राइसाइक्लाज़ोल",
        water: "धान को पूरे मौसम में 1000–1500 मिमी पानी चाहिए।",
        market: "धान का बाजार मूल्य: ₹3000–3500 प्रति क्विंटल (किस्म पर निर्भर)"
      },
      general: "मुझसे पूछें गेहूँ, धान, टमाटर, मक्का, गन्ना, मिर्च, सोयाबीन की खेती, उर्वरक, कीट, सिंचाई, या बाजार मूल्य के बारे में।"
    },
    te: {
      wheat: {
        cultivation: "🌾 గోధుమ సాగు:\n1. మట్టి: దోమట, బాగా-drained\n2. విత్తనాలు: HI-1544, PBW-725\n3. ఎరువు: 150:75:60 NPK kg/ha\n4. నీరు: 20–25 రోజులకు ఒకసారి, తర్వాత ప్రతి 20–25 రోజులు\n5. కోత: 130–150 రోజులు",
        fertilizer: "గోధుమ కోసం ఎరువులు:\n• బేసల్: యూరియా, DAP, MOP\n• సూక్ష్మపోషకాలు: జింక్ సల్ఫేట్\n• ఆర్గానిక్: FYM 10 టన్నులు/ha",
        pests: "గోధుమ రోగాలు/పురుగులు:\n• ఆఫిడ్స్ → ఇమిడాక్లోప్రిడ్\n• రస్ట్ → ప్రొపికోనాజోల్\n• టర్మైట్ → క్లోర్పైరిఫోస్",
        water: "గోధుమకి సీజన్ లో సుమారు 450–650 mm నీరు అవసరం.",
        market: "గోధుమ మార్కెట్ ధర: ₹2200–2500 ప్రతి క్వింటల్ (ప్రాంతం ఆధారంగా)"
      },
      rice: {
        cultivation: "🌾 నెయ్యి సాగు:\n1. మట్టి: మట్టి-లోం, బాగా-drained\n2. విత్తనాలు: IR-36, పుసా బాస్మతి\n3. ఎరువు: 120:60:40 NPK kg/ha\n4. నీరు: 5–7 cm వరకూ నిలువుగా ఉంచండి\n5. కోత: 120–140 రోజులు",
        fertilizer: "నెయ్యికి ఎరువులు:\n• బేసల్: యూరియా, DAP\n• సూక్ష్మపోషకాలు: జింక్, బోరాన్\n• ఆర్గానిక్: FYM 8–10 టన్నులు/ha",
        pests: "నెయ్యి రోగాలు:\n• బ్లాస్ట్ → కార్బెండాజిమ్\n• బ్రౌన్ స్పాట్ → మాన్కోజెబ్\n• షీట్ బ్లైట్ → ట్రైసైక్లోజోల్",
        water: "నెయ్యి కి సీజన్ లో 1000–1500 mm నీరు అవసరం.",
        market: "నెయ్యి మార్కెట్ ధర: ₹3000–3500 ప్రతి క్వింటల్"
      },
      general: "నాకు అడగండి గోధుమ, నెయ్యి, టమాటో, మక్కా, చెక్కచెరకు, మిర్చి, సోయాబీన్ సాగు, ఎరువులు, రోగాలు, నీరు, లేదా మార్కెట్ ధరల గురించి."
    },
    ta: {
      wheat: {
        cultivation: "🌾 கோதுமை பயிர்ப்பு:\n1. மண்: நன்கு-drained, மண்மீது\n2. விதைகள்: HI-1544, PBW-725\n3. உரம்: 150:75:60 NPK kg/ha\n4. பாசனம்: 20–25 நாட்களுக்கு பிறகு முதன்முறை, பிறகு ஒவ்வொரு 20–25 நாட்களிலும்\n5. அறுவடை: 130–150 நாட்கள்",
        fertilizer: "கோதுமைக்கு உரங்கள்:\n• அடிப்படை: யூரியா, DAP, MOP\n• சிறிய ஊட்டச்சத்து: சிங்க் சல்பேட்\n• உயிரியல்: FYM 10 டன்/ha",
        pests: "கோதுமை நோய்கள்/பூச்சிகள்:\n• ஆபிட்ஸ் → இமிடாக்லோபிரிட்\n• ரஸ்ட் → ப்ரொபிகோனாசோல்\n• டெர்மைட் → குளோர்பைரிபாஸ்",
        water: "கோதுமைக்கு பருவத்தில் சுமார் 450–650 மிமி நீர் தேவை.",
        market: "கோதுமை சந்தை விலை: ₹2200–2500 / க்விண்டல் (பிரதேசப்படி மாறுபடும்)"
      },
      rice: {
        cultivation: "🌾 அரிசி பயிர்ப்பு:\n1. மண்: கிளே லோம், நன்கு-drained\n2. விதைகள்: IR-36, புசா பாஸ்மதி\n3. உரம்: 120:60:40 NPK kg/ha\n4. பாசனம்: 5–7 cm வெள்ளமாக வைத்திருங்கள்\n5. அறுவடை: 120–140 நாட்கள்",
        fertilizer: "அரிசிக்குரிய உரங்கள்:\n• அடிப்படை: யூரியா, DAP\n• சிறிய ஊட்டச்சத்து: சிங்க், போரான்\n• உயிரியல்: FYM 8–10 டன்/ha",
        pests: "அரிசி நோய்கள்:\n• பிளாஸ்ட் → கார்பெண்டாஸிம்\n• ப்ரவுன் ஸ்பாட் → மான்கோஜெப்\n• ஷீத் பிளைட் → டிரைசைக்கிளாஸோல்",
        water: "அரிசிக்கு பருவத்தில் 1000–1500 மிமி நீர் தேவை.",
        market: "அரிசி சந்தை விலை: ₹3000–3500 / க்விண்டல்"
      },
      general: "என்னை கேளுங்கள் கோதுமை, அரிசி, தக்காளி, மக்காச்சோளம், கரும்பு, மிளகாய், சாய்பீன் பயிர்ச்சி, உரங்கள், நோய்கள், பாசனம் அல்லது சந்தை விலை பற்றி."
    }
  };

  const exampleQuestions = [
    "How to cultivate wheat?", "Which fertilizers are best for wheat?", "What are the common wheat diseases?", "How much water does wheat need?", "What is the market price of wheat?",
    "How to cultivate rice?", "Which fertilizers are best for rice?", "What are the common rice diseases?", "How much water does rice need?", "What is the market price of rice?"
  ];

  const getFarmingResponse = (query: string, language: string) => {
    const lowerQuery = query.toLowerCase();
    const langResponses = responses[language] || responses.en;

    const crops = ['wheat', 'rice'];
    for (let crop of crops) {
      if (lowerQuery.includes(crop)) {
        if (lowerQuery.includes('cultivat')) return langResponses[crop].cultivation;
        if (lowerQuery.includes('fertilizer')) return langResponses[crop].fertilizer;
        if (lowerQuery.includes('disease') || lowerQuery.includes('pest')) return langResponses[crop].pests;
        if (lowerQuery.includes('water')) return langResponses[crop].water;
        if (lowerQuery.includes('market')) return langResponses[crop].market;
      }
    }
    return langResponses.general;
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        setInputText(event.results[0][0].transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      setRecognition(recognition);
    }
    if ('speechSynthesis' in window) setSynthesis(window.speechSynthesis);
  }, []);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'user', timestamp: new Date(), language: selectedLanguage };
    setMessages(prev => [...prev, userMessage]);
    const query = inputText;
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const botText = getFarmingResponse(query, selectedLanguage);
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: botText, sender: 'bot', timestamp: new Date(), language: selectedLanguage };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      if (isVoiceEnabled && synthesis) {
        const utter = new SpeechSynthesisUtterance(botText);
        utter.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'te' ? 'te-IN' : 'ta-IN';
        synthesis.speak(utter);
      }
    }, 1000);
  };

  const toggleVoiceRecording = () => {
    if (!recognition) return;
    if (isListening) recognition.stop(); else recognition.start();
    setIsListening(!isListening);
  };

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (lng: string) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Advisory Chat</h1>
          <p className="text-muted-foreground">Get expert farming advice in your preferred language</p>
        </motion.div>

        <Card className="h-[650px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Smart Farming Assistant
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">{lang.flag} {lang.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}>
                  {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
              <AnimatePresence>
                {messages.map(msg => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`rounded-lg p-3 max-w-[70%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Input value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Ask about crop, fertilizer, pests, water, market..." />
              <Button onClick={handleSendMessage}><Send className="h-4 w-4" /></Button>
              <Button variant="outline" onClick={toggleVoiceRecording}>
                {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Example Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map(q => (
              <Button key={q} size="sm" variant="outline" onClick={() => { setInputText(q); handleSendMessage(); }}>{q}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryChat;
