// ============================================
// AllProducts.tsx - Enhanced
// ============================================

import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import { ShopOutlined } from "@ant-design/icons";

const AllProducts = ({ products }: { products: TProduct[] }) => {
  return (
    <div className=" p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <ShopOutlined className="text-blue-500 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          <p className="text-sm text-gray-500">{products?.length || 0} items available</p>
        </div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6"></div>
      
      {products?.length === 0 ? (
        <div className="text-center py-12">
          <ShopOutlined className="text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No products found in this shop.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products?.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;