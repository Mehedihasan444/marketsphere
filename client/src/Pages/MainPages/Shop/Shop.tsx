// Shop.tsx - Main Component
import { useParams } from "react-router-dom";
import AllProducts from "./AllProducts/AllProducts";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import NewArrivalProducts from "./NewArrivalProducts/NewArrivalProducts";
import TopSellingProducts from "./TopSellingProducts/TopSellingProducts";
import { useGetShopQuery } from "../../../Redux/Features/Shop/shopApi";
import { useEffect, useState } from "react";
import { TProduct } from "../../../Interface";
import ShopDetails from "./ShopDetails/ShopDetails";
import { Alert, Spin } from "antd";

const Shop = () => {
  const { id } = useParams<{ id: string }>();
  const { data: shop = {}, isLoading, error } = useGetShopQuery(id!, { skip: !id });
  const shopData = shop?.data || {};

  const [newArrival, setNewArrival] = useState<TProduct[]>([]);
  const [topSelling, setTopSelling] = useState<TProduct[]>([]);
  const [featured, setFeatured] = useState<TProduct[]>([]);

  useEffect(() => {
    if (shopData?.products) {
      // New Arrivals - Products from last 30 days
      const newArr = shopData.products.filter(
        (product: TProduct) => 
          new Date(product.createdAt).getTime() > new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ).slice(0, 10);
      setNewArrival(newArr);

      // Top Selling - Sort by sold quantity (if available) or rating
      const topSell = [...shopData.products]
        .sort((a: TProduct, b: TProduct) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 10);
      setTopSelling(topSell);

      // Featured Products
      const feat = shopData.products.filter((product: TProduct) => product.isFeatured).slice(0, 10);
      setFeatured(feat);
    }
  }, [shopData?.products]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin size="large" tip="Loading shop details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Alert
          message="Error Loading Shop"
          description="Failed to load shop details. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Shop Details Header */}
        <ShopDetails shop={shopData} />

        {/* Product Sections */}
        <div className="space-y-6">
          {newArrival.length > 0 && <NewArrivalProducts products={newArrival} />}
          {topSelling.length > 0 && <TopSellingProducts products={topSelling} />}
          {featured.length > 0 && <FeaturedProducts products={featured} />}
          <AllProducts products={shopData?.products || []} />
        </div>
      </div>
    </div>
  );
};

export default Shop;






