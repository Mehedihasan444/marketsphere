
import { Spin, Empty, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useGetFeaturedProductsQuery } from "../../../../Redux/Features/Product/productApi";
import { TProduct } from "../../../../Interface";
import ProductCard from "../../../../Components/Shared/ProductCard";
import { Link } from "react-router-dom";


// const { Title, Paragraph } = Typography;

const FeaturedProducts = () => {
    // Fetch featured products (highest rated)
    const { data = {}, isLoading } = useGetFeaturedProductsQuery("");
    const { data: products = [] } = data?.data || [];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex justify-between items-end py-4 mb-4">
                    <div className="flex items-center gap-2 ">
                        <h2 className="text-3xl font-bold text-gray-800">  Featured Products</h2>
                    </div>
                    <Link to="/featured" className="text-sm text-gray-500 hover:text-blue-700 flex items-center gap-1">
                        view all →
                    </Link>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Spin size="large" tip="Loading featured products..." />
                    </div>
                ) : products?.length === 0 ? (
                    <div className="py-20">
                        <Empty
                            description="No featured products available"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                            {products?.slice(0, 8)?.map((product: TProduct, index: number) => (

                                <ProductCard key={index} product={product} />

                            ))}
                        </div>

                        {/* Mobile View All Button */}
                        <div className="text-center mt-10 md:hidden">
                            <Button
                                type="primary"
                                size="large"
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                                onClick={() => {
                                    window.location.href = "/products";
                                }}
                            >
                                View All Products
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default FeaturedProducts;