import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { crops } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CropMarket = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addItem, state } = useCart();
  const { toast } = useToast();

  const categories = [
    { value: 'all', label: 'All Crops' },
    { value: 'vegetable', label: 'Vegetables' },
    { value: 'grain', label: 'Grains' },
    { value: 'fruit', label: 'Fruits' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const filteredCrops = crops
    .filter(crop => {
      const matchesSearch =
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Crop Market
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fresh crops directly from farmers. Browse our marketplace to find 
            the best quality produce at competitive prices.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search crops or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>

                {/* Sort */}
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={sortBy === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              Showing {filteredCrops.length} of {crops.length} crops
            </span>
            {selectedCategory !== 'all' && (
              <Badge variant="secondary">
                {categories.find(c => c.value === selectedCategory)?.label}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredCrops.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredCrops.map((crop, index) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg font-bold">{crop.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{crop.description}</p>
                <p className="text-primary font-semibold">₹{crop.price}</p>
                <Button
                  className="mt-3 w-full flex items-center gap-2"
                  onClick={async () => {
                    try {
                      await addItem({
                        id: crop.id,
                        name: crop.name,
                        price: crop.price,
                        image: crop.image,
                        category: "crop",
                      });
                      toast({
                        title: "Added to Cart",
                        description: `${crop.name} has been added to your cart`,
                      });
                    } catch (error) {
                      toast({
                        title: "Error",
                        description: "Failed to add item to cart",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-center py-12"
          >
            <p className="text-xl text-muted-foreground mb-4">
              No crops found matching your criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CropMarket;
