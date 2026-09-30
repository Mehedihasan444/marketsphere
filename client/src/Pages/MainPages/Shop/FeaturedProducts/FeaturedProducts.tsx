// ============================================
// FeaturedProducts.tsx - Enhanced
// ============================================

import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import { StarFilled } from "@ant-design/icons";

const FeaturedProducts = ({ products }: { products: TProduct[] }) => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-sm p-6 border border-amber-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
          <StarFilled className="text-amber-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-sm text-gray-600">Hand-picked items just for you</p>
        </div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-amber-400 to-orange-400 mb-6"></div>
      
      {products?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <StarFilled className="text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No featured products available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;