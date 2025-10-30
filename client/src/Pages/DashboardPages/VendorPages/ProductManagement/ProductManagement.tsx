/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, message, Popconfirm, Pagination, Input } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
  useDeleteProductMutation,
  useGetVendorProductsQuery,
} from "../../../../Redux/Features/Product/productApi";
import ProductModal from "./ProductModal";
import { TProduct } from "../../../../Interface";
import { useState } from "react";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8
  const { data = {}, isLoading } = useGetVendorProductsQuery({
    page,
    limit,
    searchTerm,
  }); // Fetch all products
  const { data: products, meta } = data?.data || {};
  const { total } = meta || {};
  const [deleteProduct] = useDeleteProductMutation(); // Mutation for deleting products


  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // Delete product handler
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProduct(id).unwrap();
      if (response.success) {
        message.success("Product deleted successfully!");
      } else {
        message.error("Failed to delete product.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while deleting the product.");
    }
  };

  // Columns for the table
  const columns = [
    {
      title: '#',
      key: 'index',
      width: '4%',
      render: (_text: any, _record: TProduct, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images: string[]) =>
        images && images.length > 0 ? (
          <img
            src={images[0]}
            alt="Product"
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              color: "#999",
              fontSize: 12,
            }}
          >
            No Image
          </div>
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true, // Shorten long text
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`, // Format price
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"], // Assuming category has a `name` property
      key: "category",
    },{
      title: "Sold Count",
      dataIndex: "soldCount",
      key: "soldCount",
    },
    {
      title: "Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (isFeatured: boolean) => (isFeatured ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TProduct) => (
        <div className="sm:flex   items-center gap-4 ">
          <ProductModal key={`edit-${record.id}`} initialData={record} />

          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>

            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold">Manage Products</h2>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-4">
  {/* Total Count */}
  <div className="text-sm text-gray-700">
    Total products: <strong className="text-gray-900">{total || 0}</strong>
  </div>

  {/* Search Input */}
  <div className="flex-1 max-w-xs w-full sm:w-auto">
    <Input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onPressEnter={() => {
        // Optional: trigger search on Enter
      }}
      allowClear
      prefix={<SearchOutlined className="text-gray-400" />}
      className="w-full"
    />
  </div>

  {/* Add Product Button */}
  <ProductModal initialData={null} />
</div>
      <Table
        columns={columns}
        dataSource={products?.map((product: TProduct) => ({
          ...product,
          key: product.id,
        }))}
        loading={isLoading}
        bordered
        pagination={false}
      />
      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination
          current={page}
          total={total}
          pageSize={limit}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
