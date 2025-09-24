import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  location?: string;
  category: "crop" | "input" | "machinery";
  type?: string;
  onAddToCart?: (product: any) => void; // ✅ optional external handler
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  description,
  location,
  category,
  type,
  onAddToCart
}) => {
  const { addItem, state } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (onAddToCart) {
      // ✅ Use external handler (for BuyInputs, no login required)
      onAddToCart({ id, name, price, image, category });
      return;
    }

    // ✅ fallback: require login for crops/machinery
    if (!state.isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    try {
      await addItem({ id, name, price, image, category });
      toast({
        title: "Added to Cart",
        description: `${name} has been added to your cart`,
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
    <Card className="flex flex-col h-full">
      <CardHeader>
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg" />
        <CardTitle className="mt-2">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-lg font-bold mt-2">₹{price}</p>
        {location && <p className="text-sm text-gray-500">📍 {location}</p>}
        {type && <p className="text-sm text-gray-500">Type: {type}</p>}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          {category === "machinery" ? "Rent Now" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
