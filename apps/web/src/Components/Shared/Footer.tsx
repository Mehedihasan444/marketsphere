
import { Input, Button } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: 'About Us', href: '/about' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'Careers', href: '#' },
    { title: 'Press', href: '#' },
  ];

  const customerService = [
    { title: 'Help Center', href: '#' },
    { title: 'Track Order', href: '#' },
    { title: 'Returns & Refunds', href: '#' },
    { title: 'Shipping Info', href: '#' },
  ];

  const sellerInfo = [
    { title: 'Become a Seller', href: '#' },
    { title: 'Seller Dashboard', href: '#' },
    { title: 'Seller Guidelines', href: '#' },
    { title: 'Seller Support', href: '#' },
  ];

  const policies = [
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
    { title: 'Cookie Policy', href: '#' },
    { title: 'Legal Notice', href: '#' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'PayPal', icon: '💰' },
    { name: 'Stripe', icon: '💵' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                size="large"
                placeholder="Enter your email address"
                prefix={<MailOutlined className="text-gray-400" />}
                className="flex-1"
              />
              <Button 
                type="primary" 
                size="large"
                icon={<ArrowRightOutlined />}
                className="bg-blue-600 hover:bg-blue-700 border-none"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">TechPark</h2>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Your trusted multi-vendor marketplace connecting buyers with quality sellers worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <EnvironmentOutlined className="text-blue-500 mt-1" />
                <span>123 Market Street, NY 10001</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PhoneOutlined className="text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MailOutlined className="text-blue-500" />
                <span>support@techpark.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Seller Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">For Sellers</h3>
            <ul className="space-y-2">
              {sellerInfo.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              {policies.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Payment */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: <FacebookOutlined />, color: 'hover:bg-blue-600' },
                  { icon: <TwitterOutlined />, color: 'hover:bg-sky-500' },
                  { icon: <InstagramOutlined />, color: 'hover:bg-pink-600' },
                  { icon: <LinkedinOutlined />, color: 'hover:bg-blue-700' },
                  { icon: <YoutubeOutlined />, color: 'hover:bg-red-600' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-white font-semibold mb-3">We Accept</h4>
              <div className="flex gap-3 flex-wrap">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gray-800 rounded border border-gray-700 text-sm flex items-center gap-2"
                  >
                    <span>{method.icon}</span>
                    <span>{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} TechPark. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;