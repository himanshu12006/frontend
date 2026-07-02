import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Eye, Sparkles, Truck, Users, MessageSquare } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Award,
      title: 'Quality Products',
      desc: 'We inspect every weave. Our cottons, linens, and silks are sourced directly from verified heritage mills to ensure they meet our strict quality checklist.',
    },
    {
      icon: ShieldCheck,
      title: 'Affordable Pricing',
      desc: 'By eliminating middle-agents and trading directly with artisans, we provide premium global luxury fashion at friendly, honest price points.',
    },
    {
      icon: Sparkles,
      title: 'Latest Fashion Trends',
      desc: 'Our design curators constantly monitor global aesthetics to bring you modern outfits that blend seamlessly with traditional ethnic motifs.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer Satisfaction',
      desc: 'Our relationship does not end at checkout. We provide responsive customer service, tailored styling, and a flexible exchange policy.',
    },
  ];

  const features = [
    { icon: Award, title: 'Premium Quality', desc: 'Sourced from the finest silk, cotton, and linen mills.' },
    { icon: Sparkles, title: 'Latest Designs', desc: 'Curated modern fashion aligned with ongoing global trends.' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Prompt domestic and international express shipping.' },
    { icon: Users, title: 'Trusted by Customers', desc: 'Over 50,000+ satisfied families since 1996.' },
    { icon: ShieldCheck, title: 'Affordable Prices', desc: 'Fair, transparent value pricing direct from creators.' },
    { icon: MessageSquare, title: 'Excellent Customer Support', desc: 'Dedicated client assistance and customized styling advice.' },
  ];

  return (
    <div className="space-y-16 pb-16 bg-brand-offwhite">
      {/* Top Banner Image with Overlay */}
      <div className="relative h-[40vh] bg-brand-charcoal-light overflow-hidden">
        <div className="absolute inset-0 bg-brand-charcoal/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="OM CLOTH HOUSE Heritage"
          className="w-full h-full object-cover object-center scale-100"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-brand-cream z-20 px-4 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-2">Our Story</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">About OM CLOTH HOUSE</h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mt-4"></div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Woven in Tradition</span>
              <h2 className="font-serif text-3xl font-bold text-brand-charcoal mt-1">Our Heritage & Journey</h2>
            </div>
            
            <div className="text-sm font-light text-brand-charcoal-light/95 leading-relaxed space-y-4">
              <p>
                Founded in 1996, **OM CLOTH HOUSE** started as a small local boutique with a singular objective: to provide families with high-quality fabric that commands elegance, longevity, and pride. Over the last three decades, that small boutique has expanded, welcoming three generations of loyal clients.
              </p>
              <p>
                We believe that clothing is an extension of one’s identity and cultural heritage. Whether you are dressing for a corporate retreat in our premium linens, styling your kids in cozy cottons, or celebrating traditions in our Chanderi sarees, OM CLOTH HOUSE ensures every garment feels like a second skin.
              </p>
              <p>
                Today, as we move our storefront online, we maintain the same core beliefs that built our physical store: absolute quality, fair value, and an unwavering commitment to client trust and satisfaction.
              </p>
            </div>
          </div>

          {/* Side Image */}
          <div className="lg:col-span-5 border border-brand-beige p-2 bg-white rounded-sm shadow-md">
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80"
              alt="Tailoring details"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Owner Biography Section */}
      <div className="bg-brand-cream border-y border-brand-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Owner Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative border border-brand-beige p-2 bg-white rounded-sm shadow-md max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80"
                  alt="Founder of OM CLOTH HOUSE"
                  className="w-full h-auto object-cover rounded-xs"
                />
                <div className="text-center py-3 bg-brand-charcoal text-brand-cream mt-2 rounded-xs">
                  <h4 className="font-serif text-sm font-semibold tracking-wider text-brand-gold">Om Prakash</h4>
                  <p className="text-[10px] font-light text-brand-cream-dark/60">Founder & Managing Director</p>
                </div>
              </div>
            </div>

            {/* Owner Message */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">A Message from the Founder</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal mt-1">"We Sew Trust, Not Just Garments"</h2>
              </div>
              <blockquote className="font-serif text-base italic text-brand-charcoal-light leading-relaxed border-l-2 border-brand-gold pl-4">
                "When I opened the doors of OM CLOTH HOUSE in 1996, the fashion landscape was different, but the core human desire remained the same: people wanted to look good, feel confident, and get value for their hard-earned money. My family and I have run this establishment with a clear promise—never compromise on the thread. We welcome you to our digital house and hope you feel the heritage in every touch."
              </blockquote>
              <p className="text-xs text-brand-charcoal-light/65 font-light leading-relaxed">
                Under Om Prakash’s direct guidance, the shop has maintained local artisan networks, supporting rural weavers and block printers across the region, while incorporating modern logistics to serve global orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Business Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">Our Values</span>
          <h2 className="font-serif text-3xl font-bold mt-1 text-brand-charcoal">What Defines Us</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="bg-brand-cream border border-brand-beige p-6 rounded-sm space-y-3 flex flex-col h-full shadow-xs">
                <div className="w-10 h-10 rounded-full bg-brand-cream-dark flex items-center justify-center text-brand-gold border border-brand-gold/25">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-brand-charcoal">{v.title}</h3>
                <p className="text-xs text-brand-charcoal-light/75 font-light leading-relaxed flex-grow">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us Detailed Section */}
      <div className="bg-brand-cream border-t border-brand-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">Excellence Guaranteed</span>
            <h2 className="font-serif text-3xl font-bold mt-1 text-brand-charcoal">Why Choose Us?</h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-brand-offwhite border border-brand-beige p-6 rounded-sm flex items-start gap-4 hover:shadow-xs transition-shadow">
                  <div className="p-3 bg-brand-cream border border-brand-gold/30 rounded text-brand-gold flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-brand-charcoal">{feat.title}</h4>
                    <p className="text-xs text-brand-charcoal-light/75 font-light leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
