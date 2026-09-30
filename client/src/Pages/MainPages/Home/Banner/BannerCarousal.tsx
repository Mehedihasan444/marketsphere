import React from "react";
import { Carousel } from "antd";

const BannerCarousal: React.FC = () => (
  <Carousel autoplay arrows infinite={true} className="lg:h-[362px] lg:rounded-md ">

    <div className="lg:h-[362px] lg:rounded-md">
      <img
        src="https://i.ibb.co.com/37x09cT/macbookprom3.jpg"
        alt=""
        className="object-cover h-full w-full lg:rounded-md"
      />
    </div>
    {/* <div className="lg:h-[362px] lg:rounded-md">
      <img
        src="https://img.freepik.com/free-psd/black-friday-sale-social-media-cover-design-template_47987-25244.jpg?semt=ais_hybrid&w=740&q=80"
        alt=""
        className="object-cover h-full w-full lg:rounded-md"
      />
    </div> */}
    <div className="lg:h-[362px] lg:rounded-md">
      <img
        src="https://i.ibb.co.com/dW4Y3HJ/Iphone-16-searise-1.jpg"
        alt=""
        className="object-cover h-full w-full lg:rounded-md"
      />
    </div>    
    {/* <div className="lg:h-[362px] lg:rounded-md">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/011/871/820/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
        alt=""
        className="object-cover  h-full w-full lg:rounded-md"
      />
    </div> */}
    {/* <div className="lg:h-[362px] lg:rounded-md">
      <img
        src="https://img.freepik.com/premium-psd/smartphone-sale-banner-template_185005-374.jpg?semt=ais_hybrid"
        alt=""
        className="object-cover h-full w-full lg:rounded-md"
      />
    </div> */}

    {/* <div className="lg:h-[362px] lg:rounded-md">
      <img
        src="https://img.freepik.com/free-vector/flat-shopping-center-twitter-header_23-2149320429.jpg?semt=ais_hybrid&w=740&q=80"
        alt=""
        className="object-cover h-full w-full lg:rounded-md"
      />
    </div> */}  {/* <div className="h-[362px] lg:rounded-md">
      <img
        src="https://i.ibb.co.com/vxd9HQh/1212-e1733902486349.jpg"
        alt=""
        className="object-cover h-full w-full rounded-md "
      />
    </div> */}
  </Carousel>
);

export default BannerCarousal;


