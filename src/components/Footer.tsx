import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8" />
              <span className="font-bold text-xl">Smart Kisan Shakti</span>
            </div>
            <p className="text-primary-foreground/80">
              Everything for Farmers in One Place. Empowering agriculture through technology and innovation.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              <Youtube className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/crop-market" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Crop Market
                </Link>
              </li>
              <li>
                <Link to="/buy-inputs" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Buy Inputs
                </Link>
              </li>
              <li>
                <Link to="/machinery" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Machinery
                </Link>
              </li>
              <li>
                <Link to="/knowledge-center" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Knowledge Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Crop Trading</li>
              <li>Agricultural Inputs</li>
              <li>Machinery Rental</li>
              <li>Farming Consultation</li>
              <li>Knowledge Sharing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>support@smartkisanshakti.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
          <p>&copy; 2024 Smart Kisan Shakti. All rights reserved. Made with ❤️ for farmers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;