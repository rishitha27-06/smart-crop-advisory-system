import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { inputs } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

const BuyInputs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const { addItem, state } = useCart();
  const { toast } = useToast();

  const categories = [
    { value: "all", label: "All Inputs" },
    { value: "seeds", label: "Seeds" },
    { value: "fertilizer", label: "Fertilizers" },
    { value: "pesticide", label: "Pesticides" },
    { value: "tools", label: "Tools" },
  ];

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  const filteredInputs = inputs
    .filter((input) => {
      const matchesSearch =
        input.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        input.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || input.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // ✅ Add to Cart using the same cart context as the rest of the app
  const handleAddToCart = async (product: any) => {
    try {
      await addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: "input",
      });
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

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
            Agricultural Inputs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            High-quality agricultural inputs including seeds, fertilizers, pesticides,
            and farming tools. Everything you need for successful farming.
          </p>
        </motion.div>

        {/* Filters */}
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
                  placeholder="Search inputs..."
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

        {/* Results */}
        <motion.div className="mb-6 flex items-center justify-between">
          <span className="text-muted-foreground">
            Showing {filteredInputs.length} of {inputs.length} products
          </span>
          {selectedCategory !== "all" && (
            <Badge variant="secondary">
              {categories.find((c) => c.value === selectedCategory)?.label}
            </Badge>
          )}
        </motion.div>

        {/* Product Grid */}
        {filteredInputs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredInputs.map((input, index) => (
              <motion.div
                key={input.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard
                  id={input.id}
                  name={input.name}
                  price={input.price}
                  image={input.image}
                  description={input.description}
                  category="input"
                  onAddToCart={handleAddToCart} // ✅ direct add
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-muted-foreground py-12">
            No products found matching your criteria
          </p>
        )}
      </div>
    </div>
  );
};

export default BuyInputs;
