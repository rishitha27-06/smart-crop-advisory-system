import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, AlertTriangle, CheckCircle, Bug, Leaf, Info, Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface DetectionResult {
  pest: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  treatment: string;
  prevention: string;
}

const PestDetection = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<any>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceQuery(transcript);
        setIsListening(false);
        // Process voice command for pest detection
        handleVoiceCommand(transcript);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      setRecognition(recognition);
    }
    
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }
  }, []);

  // Enhanced pest detection results with comprehensive data
  const mockResults: DetectionResult[] = [
    {
      pest: 'Aphids (Green Peach Aphid)',
      confidence: 92,
      severity: 'Medium',
      treatment: 'Immediate Action: Apply 2ml/liter neem oil spray or insecticidal soap solution. Spray during early morning or late evening. Repeat every 7 days for 3 weeks. For severe infestation, use Imidacloprid 17.8% SL @ 0.3ml/liter.',
      prevention: 'Prevention: Encourage beneficial insects like ladybugs and lacewings. Maintain proper plant spacing for air circulation. Avoid over-fertilizing with nitrogen. Use reflective mulch. Install yellow sticky traps around plants.'
    },
    {
      pest: 'Late Blight (Phytophthora infestans)',
      confidence: 88,
      severity: 'High',
      treatment: 'URGENT: Remove all affected leaves and destroy them. Apply copper-based fungicide (Copper oxychloride 50% WP @ 3g/liter) immediately. Spray Metalaxyl + Mancozeb @ 2.5g/liter every 10 days. Ensure good drainage.',
      prevention: 'Prevention: Ensure proper air circulation between plants. Avoid overhead watering - use drip irrigation. Practice crop rotation. Remove plant debris. Apply preventive fungicide sprays before monsoon.'
    },
    {
      pest: 'Thrips (Western Flower Thrips)',
      confidence: 85,
      severity: 'High',
      treatment: 'Treatment: Install blue sticky traps immediately. Spray Spinosad 45% SC @ 0.3ml/liter or Fipronil 5% SC @ 2ml/liter. Remove damaged leaves. Apply systemic insecticide Thiamethoxam @ 0.2g/liter.',
      prevention: 'Prevention: Use fine mesh nets (40-50 mesh) on crop borders. Maintain field hygiene. Remove weeds regularly. Apply neem cake to soil @ 250kg/hectare. Use pheromone traps for monitoring.'
    },
    {
      pest: 'Healthy Plant',
      confidence: 95,
      severity: 'Low',
      treatment: 'Excellent! Your plant shows no signs of pest or disease. Continue your current care routine. Apply balanced fertilizer (19:19:19 NPK) @ 2g/liter every 15 days during growing season.',
      prevention: 'Maintenance: Continue regular monitoring for early pest detection. Maintain proper watering schedule. Apply organic mulch. Prune dead/damaged parts. Apply neem oil spray once monthly as preventive measure.'
    },
    {
      pest: 'Powdery Mildew',
      confidence: 90,
      severity: 'Medium',
      treatment: 'Treatment: Spray sulfur-based fungicide or baking soda solution (5g/liter water). Apply Triadimefon 25% WP @ 1g/liter. Improve air circulation. Remove severely affected leaves and dispose properly.',
      prevention: 'Prevention: Avoid overhead irrigation. Ensure proper plant spacing. Apply preventive sulfur dust. Maintain field sanitation. Use resistant varieties when available.'
    }
  ];

  // Validate if uploaded image is farming/crop related
  const validateFarmingImage = async (imageData: string): Promise<boolean> => {
    // Simple validation based on file analysis
    // In real implementation, this would use AI/ML model
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation - randomly accept 85% of images as valid farming images
        const isValid = Math.random() > 0.15;
        resolve(isValid);
      }, 1000);
    });
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes('upload') || lowerCommand.includes('analyze') || lowerCommand.includes('detect')) {
      if (uploadedImage) {
        analyzeImage();
      } else {
        speakText("Please upload an image first, then I can analyze it for pests and diseases.");
      }
    } else if (lowerCommand.includes('help') || lowerCommand.includes('guide')) {
      speakText("I can help you detect pests and diseases in your crops. Upload a clear photo of the affected plant area, and I'll analyze it for you.");
    }
  };

  const speakText = (text: string) => {
    if (synthesis) {
      synthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      synthesis.speak(utterance);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    
    // First validate if image is farming-related
    const isValidFarmingImage = await validateFarmingImage(uploadedImage);
    
    if (!isValidFarmingImage) {
      setIsAnalyzing(false);
      toast({
        title: "Invalid Image",
        description: "Please upload a clear image of crop leaves or plants for pest detection.",
        variant: "destructive",
      });
      speakText("This image doesn't appear to be related to farming. Please upload a clear photo of crop leaves or plants.");
      return;
    }
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${randomResult.pest} (${randomResult.confidence}% confidence)`,
      });
      
      // Speak the result
      const summary = `Analysis complete. Detected ${randomResult.pest} with ${randomResult.confidence}% confidence. ${randomResult.severity} severity level. ${randomResult.treatment}`;
      speakText(summary);
    }, 3000);
  };

  const toggleVoiceRecording = () => {
    if (!recognition) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast({
        title: "Voice Recognition Active",
        description: "Say 'analyze' to detect pests or 'help' for guidance.",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'High': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Pest & Disease Detection</h1>
          <p className="text-muted-foreground">Upload a photo of your crop to identify pests and diseases</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Upload Image
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the affected plant area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!uploadedImage ? (
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={uploadedImage}
                          alt="Uploaded crop"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setUploadedImage(null);
                            setResult(null);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                      <Button
                        onClick={analyzeImage}
                        className="w-full"
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Bug className="h-4 w-4 mr-2" />
                            Analyze Image
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            {/* Voice Control */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Mic className="h-4 w-4" />
                  Voice Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    onClick={toggleVoiceRecording}
                    className="w-full"
                  >
                    {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {isListening ? 'Stop Listening' : 'Voice Command'}
                  </Button>
                  {voiceQuery && (
                    <p className="text-sm text-muted-foreground">Last command: "{voiceQuery}"</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Info className="h-4 w-4" />
                  Photography Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Take photos in good natural light</li>
                  <li>• Focus on the affected area clearly</li>
                  <li>• Include surrounding healthy tissue</li>
                  <li>• Avoid blurry or dark images</li>
                  <li>• Ensure image shows crop/plant parts only</li>
                  <li>• Multiple angles help accuracy</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {result.pest === 'Healthy Plant' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        )}
                        Detection Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Detection Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{result.pest}</h3>
                          <Badge variant="outline">
                            {result.confidence}% confident
                          </Badge>
                        </div>
                        <Badge className={getSeverityColor(result.severity)}>
                          {result.severity} Severity
                        </Badge>
                      </div>

                      {/* Treatment */}
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-500" />
                          Treatment
                        </h4>
                         <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg whitespace-pre-line">
                           {result.treatment}
                         </p>
                      </div>

                      {/* Prevention */}
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                          Prevention
                        </h4>
                         <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg whitespace-pre-line">
                           {result.prevention}
                         </p>
                      </div>

                       {/* Actions */}
                       <div className="flex gap-2">
                         <Button 
                           variant="outline" 
                           className="flex-1"
                           onClick={() => speakText(`Treatment details: ${result.treatment}`)}
                         >
                           <Volume2 className="h-4 w-4 mr-2" />
                           Hear Treatment
                         </Button>
                         <Button variant="outline" className="flex-1">
                           Save Report
                         </Button>
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Bug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Upload an image to start pest detection
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PestDetection;