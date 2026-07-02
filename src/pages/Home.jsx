import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Shield, Award, Sparkles, UserCheck, Zap, HelpCircle } from 'lucide-react';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { products } from '../data/products';
import API from '../api/axiosInstance';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsList, setProductsList] = useState(products); // Fallback to mock products
  const navigate = useNavigate();

  // Load real products from database
  useEffect(() => {
    const fetchRealProducts = async () => {
      try {
        const { data } = await API.get('/products');
        if (data && data.success && data.data && data.data.length > 0) {
          // If we have database products, prioritize them!
          setProductsList(data.data);
        }
      } catch (err) {
        console.error("Failed to load products from database, using mock fallback", err);
      }
    };
    fetchRealProducts();
  }, []);

  // Filter products for homepage sections (limit to 4 each)
  const menProducts = productsList.filter((p) => p.category === 'Men').slice(0, 4);
  const womenProducts = productsList.filter((p) => p.category === 'Women').slice(0, 4);
  const kidsProducts = productsList.filter((p) => p.category === 'Kids').slice(0, 4);
  const ethnicProducts = productsList.filter((p) => p.category === 'Ethnic Wear' || p.category === 'Saree' || p.category === 'Kurta').slice(0, 4);

  const newArrivals = productsList.filter((p) => p.isNew || p.createdAt).slice(0, 4);
  const bestSellers = productsList.filter((p) => p.isBestSeller).slice(0, 4);
  const trending = productsList.filter((p) => p.isTrending).slice(0, 4);


  // Why Choose Us cards
  const whyChooseUsData = [
    { icon: Award, title: 'Premium Quality', desc: 'Sourced from the finest silk, cotton, and linen mills.' },
    { icon: Sparkles, title: 'Latest Designs', desc: 'Curated modern fashion aligned with ongoing global trends.' },
    { icon: Zap, title: 'Fast Delivery', desc: 'Prompt domestic and international express shipping.' },
    { icon: UserCheck, title: 'Trusted by Customers', desc: 'Over 50,000+ satisfied families since 1996.' },
    { icon: Shield, title: 'Affordable Prices', desc: 'Fair, transparent value pricing direct from creators.' },
    { icon: HelpCircle, title: 'Excellent Support', desc: 'Dedicated client assistance and customized styling advice.' },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Ananya Sharma',
      role: 'Fashion Consultant',
      review: 'OM CLOTH HOUSE represents the pinnacle of ethnic and casual fashion. The handwoven Chanderi saree I purchased is incredibly soft and the weave is immaculate. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Vikram Malhotra',
      role: 'Corporate Executive',
      review: 'Their linen shirts and tailored blazers are perfect for summer. Fits beautifully and has a very classy, premium look. Excellent customer support too.',
      rating: 5,
    },
    {
      name: 'Riddhi Patel',
      role: 'Loving Mother',
      review: 'I bought dungarees and soft pullovers for my children. The organic cotton is completely hypoallergenic and has survived multiple washes without losing softness. Simply wonderful!',
      rating: 4.8,
    },
  ];

  return (
    <div className="space-y-16 pb-16 bg-brand-offwhite">
      {/* Hero Carousel */}
      <Carousel />

      {/* Promotional Banners Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Promo 1 */}
          <div className="group relative overflow-hidden h-72 border border-brand-beige rounded-sm bg-brand-cream-dark">
            <img 
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80" 
              alt="New Season" 
              className="w-full h-full object-cover scale-hover transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-brand-charcoal/30 flex flex-col justify-end p-6 z-10">
              <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">Limited Drop</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">New Season Collection</h3>
              <Link to="/shop?filter=new" className="text-white hover:text-brand-gold transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-2">
                Shop Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Promo 2 */}
          <div className="group relative overflow-hidden h-72 border border-brand-beige rounded-sm bg-brand-cream-dark">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80" 
              alt="Latest Trends" 
              className="w-full h-full object-cover scale-hover transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-brand-charcoal/30 flex flex-col justify-end p-6 z-10">
              <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">Style Guide</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">Latest Fashion Trends</h3>
              <Link to="/shop?filter=trending" className="text-white hover:text-brand-gold transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-2">
                Discover <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Promo 3 */}
          <div className="group relative overflow-hidden h-72 border border-brand-beige rounded-sm bg-brand-cream-dark">
            <img 
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=80" 
              alt="Festive Wear" 
              className="w-full h-full object-cover scale-hover transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-brand-charcoal/30 flex flex-col justify-end p-6 z-10">
              <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">Heritage Style</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">Festive Collection</h3>
              <Link to="/shop?category=Ethnic Wear" className="text-white hover:text-brand-gold transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-2">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Promo 4 */}
          <div className="group relative overflow-hidden h-72 border border-brand-beige rounded-sm bg-brand-cream-dark">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80" 
              alt="Discounts Available" 
              className="w-full h-full object-cover scale-hover transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-brand-charcoal/30 flex flex-col justify-end p-6 z-10">
              <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">Promo Offers</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">Flat Discounts Available</h3>
              <Link to="/shop" className="text-white hover:text-brand-gold transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-2">
                Grab Offers <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Featured Collection Tabs Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">Our Top Picks</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-brand-charcoal">Trending & Best Sellers</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4"></div>
        </div>

        {/* Dynamic section selectors - Simple visual layouts for New, Best Seller and Trending */}
        <div className="space-y-12">
          {/* New Arrivals */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-brand-beige pb-3">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">New Arrivals</h3>
              <Link to="/shop?filter=new" className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors font-semibold flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={(p) => setSelectedProduct(p)} 
                />
              ))}
            </div>
          </div>

          {/* Best Sellers */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-brand-beige pb-3">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">Best Sellers</h3>
              <Link to="/shop?filter=bestseller" className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors font-semibold flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={(p) => setSelectedProduct(p)} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Collections Sections */}
      <div className="bg-brand-cream border-y border-brand-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Men's section */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-brand-beige pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Refined Wardrobe</span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Men's Collection</h3>
              </div>
              <Link to="/shop?category=Men" className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors font-semibold flex items-center gap-1">
                Shop Men <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={(p) => setSelectedProduct(p)} 
                />
              ))}
            </div>
          </div>

          {/* Women's section */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-brand-beige pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Classic Silhouettes</span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Women's Collection</h3>
              </div>
              <Link to="/shop?category=Women" className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors font-semibold flex items-center gap-1">
                Shop Women <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {womenProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={(p) => setSelectedProduct(p)} 
                />
              ))}
            </div>
          </div>

          {/* Ethnic Wear section */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-brand-beige pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Heritage Craftsmanship</span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Ethnic Wear Collection</h3>
              </div>
              <Link to="/shop?category=Ethnic Wear" className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors font-semibold flex items-center gap-1">
                Shop Ethnic <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ethnicProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={(p) => setSelectedProduct(p)} 
                />
              ))}
            </div>
          </div>

          {/* Kids Wear section */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-brand-beige pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Soft & Playful</span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Kids Collection</h3>
              </div>
              <Link to="/shop?category=Kids" className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors font-semibold flex items-center gap-1">
                Shop Kids <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {kidsProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={(p) => setSelectedProduct(p)} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">Tailored Offerings</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-brand-charcoal">Our Specialized Services</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Fashion for Men', desc: 'From bespoke custom sherwanis and formal suits to linen resort wear.', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
            { title: 'Fashion for Women', desc: 'Silk dresses, luxury knit cardigans, pleated skirts, and casual wear.', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
            { title: 'Kids Wear', desc: 'Cable-knit cardigans, durable denim overalls, and organic floral dresses.', img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80' },
            { title: 'Ethnic Collection', desc: 'Chanderi sarees, Lehengas, and designer Chikankari kurta sets.', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
            { title: 'Festive Collection', desc: 'Exclusive heritage wear specially crafted for Diwali, Eid, weddings, and rituals.', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
            { title: 'Custom Assistance', desc: 'Direct design customization and bridal styling consultancy from store stylists.', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80' },
          ].map((srv, idx) => (
            <div key={idx} className="group bg-brand-cream border border-brand-beige overflow-hidden rounded-sm hover:shadow-md transition-all duration-300">
              <div className="h-48 overflow-hidden bg-brand-cream-dark">
                <img src={srv.img} alt={srv.title} className="w-full h-full object-cover scale-hover transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg font-bold text-brand-charcoal group-hover:text-brand-gold transition-colors">{srv.title}</h3>
                <p className="text-xs text-brand-charcoal-light/70 font-light leading-relaxed">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Summary & Why Choose Us Section */}
      <div className="bg-brand-cream border-y border-brand-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Store Image */}
            <div className="relative border border-brand-beige p-2 bg-white rounded-sm shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80" 
                alt="OM CLOTH HOUSE Storefront" 
                className="w-full h-auto object-cover rounded-xs" 
              />
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-brand-charcoal text-brand-cream p-6 rounded-sm max-w-xs shadow-xl border border-brand-gold">
                <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-brand-gold">Heritage of Trust</h4>
                <p className="text-[11px] font-light text-brand-cream-dark/80 mt-1">Providing exquisite, handpicked quality apparel since 1996 under family values.</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">About OM CLOTH HOUSE</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-brand-charcoal">Style for Every Generation</h2>
                <div className="w-12 h-[1px] bg-brand-gold mt-4"></div>
              </div>
              
              <div className="space-y-4 text-sm font-light text-brand-charcoal-light/95 leading-relaxed">
                <p>
                  Established in 1996, **OM CLOTH HOUSE** has stood as a beacon of elegance, fashion, and trust. Our physical store has welcomed generations of shoppers looking for premium fabrics, pristine cuts, and gorgeous traditional textures.
                </p>
                <p>
                  Led by our passionate founder and family, our mission is to offer premium-grade cottons, rich linens, delicate silks, and intricate ethnic attire at value-driven pricing. Whether it is an everyday knit sweater, an elegant summer blazer, or a wedding sherwani, we verify every thread for absolute customer satisfaction.
                </p>
              </div>

              {/* Value list badges */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {['Premium Quality Fabrics', 'Fair Value Pricing', 'Latest Fashion Curations', 'Highly Rated Support'].map((val, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-forest rounded-full flex-shrink-0"></span>
                    <span className="text-xs font-semibold text-brand-charcoal tracking-wide uppercase">{val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link to="/about" className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal font-semibold border-b border-brand-gold pb-1 transition-colors">
                  Read Our Full Story <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Why Choose Us Sub-grid */}
          <div className="space-y-10 pt-10 border-t border-brand-beige">
            <h3 className="font-serif text-2xl font-bold text-center text-brand-charcoal">Why Choose Us?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUsData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="bg-brand-cream border border-brand-sage/35 p-6 rounded-sm flex items-start gap-4 hover:border-brand-sage transition-all duration-300">
                    <div className="p-3 bg-brand-sage/40 border border-brand-forest/15 rounded-sm text-brand-forest flex-shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-base font-bold text-brand-charcoal">{item.title}</h4>
                      <p className="text-xs text-brand-charcoal-light/75 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Customer Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">Client Love</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-brand-charcoal">Trusted by Our Customers</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-brand-cream border border-brand-beige p-8 rounded-sm flex flex-col justify-between h-full shadow-xs">
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4.5 h-4.5 ${
                        i < Math.floor(test.rating) ? 'fill-current' : 'text-brand-beige'
                      }`}
                    />
                  ))}
                </div>
                {/* Review */}
                <p className="text-sm font-light text-brand-charcoal-light/90 italic leading-relaxed">
                  "{test.review}"
                </p>
              </div>

              {/* User Bio */}
              <div className="mt-6 border-t border-brand-beige pt-4">
                <h4 className="text-sm font-semibold text-brand-charcoal">{test.name}</h4>
                <p className="text-xs text-brand-gold tracking-wider uppercase font-medium mt-0.5">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Dialog Overlay */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
