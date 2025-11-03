import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, Package, Tractor, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import cropMarketImage from '@/assets/crop-market.jpg';
import inputsImage from '@/assets/inputs.jpg';
import machineryImage from '@/assets/machinery.jpg';

const Features = () => {
  const features = [
    {
      title: "Crop Market",
      description: "Buy and sell fresh crops directly from farmers. Get the best prices for quality produce with transparent pricing and direct farmer connections.",
      icon: <Store className="h-12 w-12 text-primary" />,
      image: cropMarketImage,
      link: "/crop-market",
      highlights: [
        "Direct farmer connections",
        "Transparent pricing",
        "Quality assurance",
        "Fresh produce"
      ]
    },
    {
      title: "Buy Inputs",
      description: "Access high-quality agricultural inputs including seeds, fertilizers, pesticides, and farming tools. Everything you need for successful farming.",
      icon: <Package className="h-12 w-12 text-primary" />,
      image: inputsImage,
      link: "/buy-inputs",
      highlights: [
        "Quality seeds & fertilizers",
        "Farming tools & equipment",
        "Organic pesticides",
        "Bulk purchase options"
      ]
    },
    {
      title: "Machinery Rental",
      description: "Rent modern farming equipment at affordable rates. Access tractors, harvesters, and specialized machinery without heavy investment.",
      icon: <Tractor className="h-12 w-12 text-primary" />,
      image: machineryImage,
      link: "/machinery",
      highlights: [
        "Modern equipment",
        "Affordable rental rates",
        "Flexible rental periods",
        "Maintenance included"
      ]
    },
    {
      title: "Knowledge Center",
      description: "Access expert farming knowledge, tips, and best practices. Learn from agricultural experts and stay updated with latest farming techniques.",
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      image: "",
      link: "/knowledge-center",
      highlights: [
        "Expert farming tips",
        "Multilingual content",
        "Best practices",
        "Seasonal guidance"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive agricultural solutions designed to empower farmers and 
            enhance agricultural productivity through technology and innovation.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden card-hover">
                <div className={`grid grid-cols-1 ${feature.image ? 'lg:grid-cols-2' : ''} gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                   {/* Image */}
                  {feature.image && (
                    <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center space-x-4 mb-4">
                        {feature.icon}
                        <CardTitle className="text-2xl lg:text-3xl text-foreground">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0 space-y-6">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Key Highlights:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {feature.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center text-muted-foreground">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link to={feature.link}>
                        <Button size="lg" className="btn-primary group">
                          Explore {feature.title}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 p-12 bg-primary rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join Smart Kisan Shakti today and experience the future of agriculture. 
            All features are just a click away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Login to Continue
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;