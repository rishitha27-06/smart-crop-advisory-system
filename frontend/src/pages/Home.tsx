import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Leaf, Users, TrendingUp, Shield, Bot, Bug, BarChart3, MessageSquare, Sparkles, Star, Award, CheckCircle, Zap, Globe, Tractor, ShoppingCart, Wrench, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-agriculture.jpg';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: t('home.features.aiAdvisory.title'),
      description: t('home.features.aiAdvisory.description'),
      link: "/advisory-chat"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: "Crop Market",
      description: "Buy and sell fresh crops directly from farmers with real-time pricing",
      link: "/crop-market"
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: "Agricultural Inputs",
      description: "Quality seeds, fertilizers, pesticides, and farming tools at competitive prices",
      link: "/buy-inputs"
    },
    {
      icon: <Tractor className="h-8 w-8 text-primary" />,
      title: "Machinery Rental",
      description: "Rent modern farming equipment and machinery for your agricultural needs",
      link: "/machinery"
    }
  ];

  const aiFeatures = [
    {
      icon: <MessageSquare className="h-6 w-6 text-green-600" />,
      title: t('home.aiFeatures.multilingualChat.title'),
      description: t('home.aiFeatures.multilingualChat.description')
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: t('home.aiFeatures.voiceCommands.title'),
      description: t('home.aiFeatures.voiceCommands.description')
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      title: t('home.aiFeatures.smartAnalytics.title'),
      description: t('home.aiFeatures.smartAnalytics.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden agriculture-pattern min-h-screen flex items-center">
        <div className="absolute inset-0 hero-gradient opacity-95"></div>



        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-primary-foreground">
                  Trusted by 10,000+ Farmers
                </span>
              </motion.div>

              <h1 className="text-2xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-white to-primary-foreground/80 bg-clip-text text-transparent">Smart Kisan Shop</span>
                <span className="block text-white font-semibold text-xl lg:text-2xl">Your Complete Agricultural Marketplace</span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg lg:text-2xl text-primary-foreground/90 mb-6 font-light"
              >
                Empowering Farmers with Technology & Marketplace Solutions
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-base lg:text-lg text-primary-foreground/85 mb-8 max-w-2xl leading-relaxed"
              >
                Your one-stop destination for buying fresh crops, agricultural inputs, renting machinery, and getting expert farming advice through our AI-powered platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/features">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 rounded-full">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t('home.hero.exploreFeatures')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/crop-market">
                  <Button variant="agriculture" size="lg" className="px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    {t('home.hero.viewCropMarket')}
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-foreground">10K+</div>
                  <div className="text-sm text-primary-foreground/70">Happy Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-foreground">50K+</div>
                  <div className="text-sm text-primary-foreground/70">Crops Traded</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Modern Agriculture"
                  className="rounded-3xl shadow-2xl w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/30 to-transparent"></div>

                {/* Image Overlay Effects */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-primary/10 pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6"
            >
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Powerful Features</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Everything You Need for
              <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Modern Agriculture</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover our comprehensive agricultural marketplace featuring fresh crops, quality inputs, machinery rental, and AI-powered advisory services - all in one platform designed for farmers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="h-full"
              >
                <Link to={feature.link}>
                  <Card className="text-center p-8 card-hover h-full cursor-pointer group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-card via-card/80 to-card/50 backdrop-blur-sm relative overflow-hidden">
                    {/* Card Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <CardContent className="pt-6 relative z-10">
                      <motion.div
                        className="flex justify-center mb-6 group-hover:scale-110 transition-all duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                          {feature.icon}
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                        {feature.description}
                      </p>

                      {/* Enhanced Hover Arrow */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="mt-6 flex justify-center"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ArrowRight className="h-5 w-5 text-primary" />
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light rounded-full px-6 py-3 mb-6"
            >
              <Bot className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground">AI-Powered Intelligence</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              AI-Powered Agricultural Intelligence
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Experience the future of farming with our advanced AI technologies that provide personalized recommendations, multilingual support, and real-time analytics to maximize your agricultural productivity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-background via-muted/10 to-muted/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  {/* Card Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <CardContent className="pt-6 relative z-10">
                    <div className="flex items-start gap-6">
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                          {feature.icon}
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional AI Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose Our AI?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-muted-foreground">24/7 Availability</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-muted-foreground">Multi-language Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-muted-foreground">Real-time Analytics</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6"
            >
              <Star className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Customer Stories</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              What Our Farmers Say
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Join thousands of successful farmers who trust Smart Kisan Shop for their agricultural needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Wheat Farmer, Punjab",
                content: "Smart Crop Advisory System helped me increase my yield by 40% with their AI recommendations. The pest detection feature saved my entire crop last season!",
                rating: 5,
                avatar: "👨‍🌾"
              },
              {
                name: "Priya Sharma",
                role: "Organic Farmer, Maharashtra",
                content: "The multilingual support is amazing! I can ask questions in Hindi and get instant answers. The market intelligence helps me get the best prices.",
                rating: 5,
                avatar: "👩‍🌾"
              },
              {
                name: "Amit Patel",
                role: "Cotton Farmer, Gujarat",
                content: "This platform transformed my farming business. The advisory chat is like having an expert farmer available 24/7. Highly recommended!",
                rating: 5,
                avatar: "👨‍🌾"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-card via-muted/5 to-card/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  {/* Card Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <CardContent className="pt-6 relative z-10">
                    <div className="flex items-center mb-4 gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  {/* Contact Section */}
  <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6"
        >
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-primary">Get in Touch</span>
        </motion.div>

        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          Contact Us
        </h2>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Have questions about our services? Need support with your farming needs? We're here to help!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[
          {
            icon: <Phone className="h-8 w-8 text-primary" />,
            title: "Call Us",
            content: "+91 98765 43210",
            description: "Mon-Fri 9AM-6PM IST"
          },
          {
            icon: <Mail className="h-8 w-8 text-primary" />,
            title: "Email Us",
            content: "support@smartkisanshop.com",
            description: "We'll respond within 24 hours"
          },
          {
            icon: <MapPin className="h-8 w-8 text-primary" />,
            title: "Visit Us",
            content: "New Delhi, India",
            description: "Corporate Office"
          }
        ].map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <Card className="p-8 h-full bg-gradient-to-br from-card via-muted/5 to-card/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <CardContent className="pt-6 relative z-10 text-center">
                <motion.div
                  className="flex justify-center mb-6 group-hover:scale-110 transition-all duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    {contact.icon}
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {contact.title}
                </h3>
                <p className="text-lg font-semibold text-primary mb-2 group-hover:text-primary-dark transition-colors">
                  {contact.content}
                </p>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {contact.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

      {/* Quick Access Section */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-muted/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6"
            >
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Quick Access</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Quick Access to Everything
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get instant access to all our services - from monitoring your farm dashboard to browsing fresh crops, renting machinery, and getting AI-powered farming advice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BarChart3 className="h-12 w-12 text-primary" />,
                title: t('home.quickAccess.farmDashboard.title'),
                description: t('home.quickAccess.farmDashboard.description'),
                link: "/dashboard",
                gradient: "from-blue-500/10 via-blue-500/5 to-blue-600/5",
                hoverGradient: "from-blue-500/20 to-blue-600/10"
              },
              {
                icon: <Bot className="h-12 w-12 text-primary" />,
                title: t('home.quickAccess.askAIAssistant.title'),
                description: t('home.quickAccess.askAIAssistant.description'),
                link: "/advisory-chat",
                gradient: "from-green-500/10 via-green-500/5 to-green-600/5",
                hoverGradient: "from-green-500/20 to-green-600/10"
              },
              {
                icon: <ShoppingCart className="h-12 w-12 text-primary" />,
                title: "Browse Crops",
                description: "Explore fresh crops from local farmers with competitive pricing",
                link: "/crop-market",
                gradient: "from-orange-500/10 via-orange-500/5 to-orange-600/5",
                hoverGradient: "from-orange-500/20 to-orange-600/10"
              },
              {
                icon: <Tractor className="h-12 w-12 text-primary" />,
                title: "Rent Machinery",
                description: "Access modern farming equipment and machinery for rent",
                link: "/machinery",
                gradient: "from-purple-500/10 via-purple-500/5 to-purple-600/5",
                hoverGradient: "from-purple-500/20 to-purple-600/10"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <Link to={item.link}>
                  <Card className={`p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br ${item.gradient} backdrop-blur-sm group h-full relative overflow-hidden`}>
                    {/* Card Background Animation */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                    <CardContent className="pt-6 relative z-10">
                      <motion.div
                        className="flex justify-center mb-6 group-hover:scale-110 transition-all duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                          {item.icon}
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 text-foreground text-center group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-center leading-relaxed group-hover:text-foreground/80 transition-colors">
                        {item.description}
                      </p>

                      {/* Enhanced Hover Arrow */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="mt-6 flex justify-center"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ArrowRight className="h-6 w-6 text-primary" />
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground">Join Now</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-primary-foreground to-white bg-clip-text text-transparent">Agricultural Business?</span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg lg:text-xl text-primary-foreground/90 mb-10 max-w-4xl mx-auto leading-relaxed"
            >
              Join thousands of farmers who are already using Smart Kisan Shop
              to access fresh crops, quality inputs, machinery rental, and AI-powered advisory services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/login">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 py-5 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Get Started Free
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="agriculture" size="lg" className="px-10 py-5 text-xl font-bold border-2 border-primary-foreground/30 hover:border-primary-foreground/50 transition-all transform hover:scale-105 rounded-full shadow-lg hover:shadow-xl">
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 flex flex-wrap justify-center items-center gap-8 text-primary-foreground/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Free 30-Day Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Cancel Anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;