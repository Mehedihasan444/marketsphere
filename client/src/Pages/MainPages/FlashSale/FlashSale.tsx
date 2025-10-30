import { useState } from "react";
import ProductCard from "../../../Components/Shared/ProductCard";
import { Alert, Breadcrumb, Button, Checkbox, Empty, Pagination, Select, Slider, Spin } from "antd";
import { TProduct } from "../../../Interface";
import { Link } from "react-router-dom";
import { HomeOutlined, AppstoreOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons';
import { useGetFlashSaleProductsQuery } from "../../../Redux/Features/FlashSale/flashSaleApi";

const { Option } = Select;

const FlashSale = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [minRating, setMinRating] = useState<number | undefined>(undefined);

  const { data = {}, isLoading, error, isFetching } = useGetFlashSaleProductsQuery({
    page: currentPage,
    limit: 12,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    brand: selectedBrands.length > 0 ? selectedBrands : undefined,
    rating: minRating,
    sortBy: sortBy,
  });

  const responseData = data?.data || {};
  const products = responseData?.data || [];
  const meta = responseData?.meta || {};
  const filters = responseData?.filters || {};
  const brands = filters?.brands || [];
  const priceRangeFromAPI = filters?.priceRange || { min: 0, max: 10000 };


  const handleClearFilters = () => {
    setPriceRange([priceRangeFromAPI.min, priceRangeFromAPI.max]);
    setSelectedBrands([]);
    setMinRating(undefined);
    setCurrentPage(1);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePriceChange = (value: number | number[]) => {
    setPriceRange(value as [number, number]);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating === minRating ? undefined : rating);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin size="large" tip="Loading flash sale products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Alert
          message="Error"
          description="Failed to load flash sale products. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              {
                href: '/',
                title: (
                  <>
                    <HomeOutlined />
                    <span>Home</span>
                  </>
                ),
              },
              {
                title: 'Flash Sale',
              }
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-red-500">⚡</span>
                Flash Sale
              </h1>
              <p className="text-gray-600 mt-1">
                {meta?.total || 0} products found
              </p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid'
                    ? 'bg-white text-[#1890ff] shadow-sm'
                    : 'text-gray-600 hover:text-[#1890ff]'
                    }`}
                >
                  <AppstoreOutlined className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list'
                    ? 'bg-white text-[#1890ff] shadow-sm'
                    : 'text-gray-600 hover:text-[#1890ff]'
                    }`}
                >
                  <BarsOutlined className="text-lg" />
                </button>
              </div>
              <Select
                value={sortBy}
                onChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
                style={{ width: 200 }}
                className="rounded-lg"
              >
                <Option value="discount">Highest Discount</Option>
                <Option value="price-low">Price: Low to High</Option>
                <Option value="price-high">Price: High to Low</Option>
                <Option value="rating">Highest Rated</Option>
                <Option value="newest">Newest First</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
              {/* Filter Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FilterOutlined />
                  Filters
                </h3>
                {(selectedBrands.length > 0 || minRating || 
                  priceRange[0] !== priceRangeFromAPI.min || 
                  priceRange[1] !== priceRangeFromAPI.max) && (
                  <Button 
                    type="link" 
                    size="small" 
                    onClick={handleClearFilters}
                    className="text-red-500 hover:text-red-600"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Price Range</h4>
                <Slider
                  range
                  min={priceRangeFromAPI.min}
                  max={priceRangeFromAPI.max}
                  value={priceRange}
                  onChange={handlePriceChange}
                  tooltip={{ formatter: (value) => `$${value}` }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Brand Filter */}
              {brands.length > 0 && (
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Brand</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand: string) => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => handleBrandChange(brand, e.target.checked)}
                        >
                          <span className="text-sm text-gray-700">{brand}</span>
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating Filter */}
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-4">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        minRating === rating
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleRatingChange(rating)}
                    >
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">& Up</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1 relative">
            {/* Loading Overlay for Refetching */}
            {isFetching && !isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center rounded-lg">
                <Spin size="large" />
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : products.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                      : 'space-y-4'
                  }
                >
                  {products.map((product: TProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {meta && meta.total > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      current={currentPage}
                      total={meta.total}
                      pageSize={12}
                      onChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
                      showSizeChanger={false}
                      className="text-center"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        No flash sale products found
                      </p>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your filters or check back later for new deals
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button onClick={handleClearFilters}>
                          Clear Filters
                        </Button>
                        <Link to="/products">
                          <Button type="primary">Browse All Products</Button>
                        </Link>
                      </div>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;