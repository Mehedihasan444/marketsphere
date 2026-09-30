/* eslint-disable @typescript-eslint/no-explicit-any */


import { Button, message, Tag } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  ShopOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import DynamicBreadcrumb from "../../../../Components/Shared/DynamicBreadcrumb";
import { TFollow, TShop } from "../../../../Interface";
import { useFollowMutation, useUnfollowMutation } from "../../../../Redux/Features/Follow/followApi";
import { useGetMyProfileQuery } from "../../../../Redux/Features/User/userApi";
import { useMemo } from "react";

const ShopDetails = ({ shop }: { shop: TShop }) => {
  const { data = {} } = useGetMyProfileQuery("");
  const userProfile = useMemo(() => data.data || {}, [data]);
  const [follow, { isLoading }] = useFollowMutation();
  const [unfollow, { isLoading: isUnfollowing }] = useUnfollowMutation();

  const isFollowing = shop?.followers?.some(
    (follower: TFollow) =>
      follower.customerId === userProfile?.id && follower.shopId === shop.id
  );

  const handleFollow = async () => {
    const followInfo = {
      customerId: userProfile?.id,
      shopId: shop.id,
    };

    try {
      const res = await follow(followInfo);
      if (res.data?.success) {
        message.success("Successfully followed the shop!");
      } else if (res?.error) {
        handleError(res.error);
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while following the shop.");
    }
  };

  const handleUnfollow = async () => {
    const followInfo = {
      customerId: userProfile?.id,
      shopId: shop.id,
    };

    try {
      const res = await unfollow(followInfo);
      if (res.data?.success) {
        message.success("Successfully unfollowed the shop!");
      } else if (res?.error) {
        handleError(res.error);
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while unfollowing the shop.");
    }
  };

  const handleError = (error: any) => {
    if ('data' in error) {
      const errorMessage = (error.data as { message?: string })?.message || "An error occurred.";
      message.error(errorMessage);
    } else if ('message' in error) {
      message.error(error.message || "An error occurred.");
    } else {
      message.error("An unknown error occurred.");
    }
  };

  const breadcrumbItems = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "/shops",
      title: (
        <>
          <ShopOutlined />
          <span>Shops</span>
        </>
      ),
    },
    {
      title: shop?.name,
    },
  ];

  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <div className="mb-4 bg-white rounded-lg p-4 ">
        <DynamicBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Shop Header with Banner */}
      <div className="relative shadow-sm border rounded-xl  overflow-hidden">
        {/* Banner Image with Overlay */}
        <div
          className="h-64 sm:h-72 lg:h-80 relative"
          style={{
            backgroundImage: `url(${shop.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark Overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60"></div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Tag color="green" className="text-sm px-3 py-1 rounded-full shadow-lg">
              {
                shop.isActive ? (
                  <>
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Active
                  </>
                ) : (
                  <>
                    <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                    Inactive
                  </>
                )
              }

            </Tag>
          </div>
        </div>

        {/* Shop Info Section */}
        <div className="px-6 pb-6 pt-0">
          <div className="flex flex-col lg:flex-row gap-6 -mt-16 relative z-10">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Shop Details */}
            <div className="flex-1 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                      {shop.name}
                    </h1>
                    {/* {shop?.isVerified && (
                      <Tag color="blue" className="flex items-center gap-1">
                        <StarFilled className="text-xs" />
                        Verified
                      </Tag>
                    )} */}
                  </div>

                  <p className="text-gray-400 text-base leading-relaxed my-4 max-w-3xl">
                    {shop?.description}
                  </p>

                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                      <HeartFilled className="text-red-500" />
                      <span className="font-semibold text-gray-900">
                        {shop?.followers?.length || 0}
                      </span>
                      <span className="text-gray-600">Followers</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                      <ShopOutlined className="text-blue-500" />
                      <span className="font-semibold text-gray-900">
                        {shop?.products?.length || 0}
                      </span>
                      <span className="text-gray-600">Products</span>
                    </div>

                    {/* {shop?.rating && (
                      <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                        <StarFilled className="text-yellow-500" />
                        <span className="font-semibold text-gray-900">
                          {shop.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-600">Rating</span>
                      </div>
                    )} */}
                  </div>
                </div>

                {/* Follow Button */}
                <div className="flex-shrink-0">
                  <Button
                    size="large"
                    type={isFollowing ? "default" : "primary"}
                    icon={isFollowing ? <HeartFilled /> : <HeartOutlined />}
                    loading={isLoading || isUnfollowing}
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                    className={`min-w-[140px] h-12 font-semibold ${isFollowing ? 'border-red-500 text-red-500 hover:bg-red-50' : ''
                      }`}
                  >
                    {isFollowing ? "Following" : "Follow Shop"}
                  </Button>
                </div>
              </div>

              {/* Contact Information */}
              {(
                // shop?.vendor?.address ||
               shop?.vendor.phone || shop?.vendor.email) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {/* {shop?.vendor?.address && (
                      <div className="flex items-center gap-2">
                        <EnvironmentOutlined className="text-blue-500" />
                        <span>{shop.vendor?.address}</span>
                      </div>
                    )} */}
                    {shop?.vendor.phone && (
                      <div className="flex items-center gap-2">
                        <PhoneOutlined className="text-green-500" />
                        <span>{shop.vendor.phone}</span>
                      </div>
                    )}
                    {shop?.vendor.email && (
                      <div className="flex items-center gap-2">
                        <MailOutlined className="text-purple-500" />
                        <span>{shop.vendor.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;