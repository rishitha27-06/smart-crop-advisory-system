import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageCircle, ThumbsUp, Send, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
    usefulness: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message || rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and provide a rating",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Thank You!",
        description: "Your feedback has been submitted successfully. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
        usefulness: ''
      });
      setRating(0);
    }, 1000);
  };

  const categories = [
    { value: 'advisory', label: 'AI Advisory Chat' },
    { value: 'pest', label: 'Pest Detection' },
    { value: 'market', label: 'Market Prices' },
    { value: 'inputs', label: 'Buy Inputs' },
    { value: 'machinery', label: 'Machinery' },
    { value: 'general', label: 'General Feedback' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Feedback & Support</h1>
          <p className="text-muted-foreground">Help us improve Smart Kisan Shakti with your valuable feedback</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Share Your Feedback
                </CardTitle>
                <CardDescription>
                  Your input helps us serve farmers better
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {/* Category and Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select feedback category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief subject of your feedback"
                    />
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <Label>Overall Rating *</Label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer transition-colors ${
                            star <= (hoveredRating || rating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-muted-foreground'
                          }`}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {rating > 0 && `(${rating}/5 stars)`}
                      </span>
                    </div>
                  </div>

                  {/* Usefulness */}
                  <div className="space-y-2">
                    <Label htmlFor="usefulness">How useful are our services?</Label>
                    <Select value={formData.usefulness} onValueChange={(value) => handleInputChange('usefulness', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select usefulness level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-useful">Very Useful</SelectItem>
                        <SelectItem value="somewhat-useful">Somewhat Useful</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="not-very-useful">Not Very Useful</SelectItem>
                        <SelectItem value="not-useful">Not Useful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please share your detailed feedback, suggestions, or issues..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Support Hotline</p>
                    <p className="text-sm text-muted-foreground">1800-XXX-XXXX (Toll Free)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@smartkisan.com</p>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Support Hours:</strong><br />
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  Community Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4.8</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2,500+</div>
                    <div className="text-sm text-muted-foreground">Happy Farmers</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>5 stars</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>4 stars</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Report a Bug
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Request Feature
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  FAQ & Help
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;