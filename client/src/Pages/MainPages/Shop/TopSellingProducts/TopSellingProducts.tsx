

// ============================================
// TopSellingProducts.tsx - Enhanced
// ============================================

import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import { FireFilled } from "@ant-design/icons";

const TopSellingProducts = ({ products }: { products: TProduct[] }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <FireFilled className="text-red-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Top Selling</h2>
          <p className="text-sm text-gray-600">Most popular products in demand</p>
        </div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-red-400 to-pink-400 mb-6"></div>
      
      {products?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <FireFilled className="text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No top selling products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product: TProduct, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopSellingProducts;