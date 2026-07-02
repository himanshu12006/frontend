import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Info, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-brand-offwhite min-h-[70vh]">
      
      {/* Page Header */}
      <div className="border-b border-brand-beige pb-6">
        <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Get In Touch</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-brand-charcoal">Contact Us</h1>
        <p className="text-xs sm:text-sm font-light text-brand-charcoal-light/70 mt-1.5">
          Have queries about custom tailoring, sizing guides, or returns? We are here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info Cards (Left Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Address */}
          <div className="bg-brand-cream border border-brand-beige p-6 rounded-sm flex items-start gap-4 shadow-xs">
            <div className="p-3 bg-brand-cream-dark text-brand-gold border border-brand-gold/20 rounded-xs flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold text-brand-charcoal">Flagship Store Location</h3>
              <p className="text-xs font-light text-brand-charcoal-light/80 leading-relaxed">
                Shop No. 42-45, Main Bazar Road,<br />
                Opposite Town Hall, Near Gole Market,<br />
                New Delhi - 110001, India.
              </p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="bg-brand-cream border border-brand-beige p-6 rounded-sm flex items-start gap-4 shadow-xs">
            <div className="p-3 bg-brand-cream-dark text-brand-gold border border-brand-gold/20 rounded-xs flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold text-brand-charcoal">Call Store Assistance</h3>
              <p className="text-xs font-light text-brand-charcoal-light/80">
                Landline: <strong className="font-medium text-brand-charcoal">+91 (11) 2345-6789</strong><br />
                Mobile: <strong className="font-medium text-brand-charcoal">+91 98765 43210</strong><br />
                Toll Free: <strong className="font-medium text-brand-charcoal">1800-123-4567</strong>
              </p>
            </div>
          </div>

          {/* Emails */}
          <div className="bg-brand-cream border border-brand-beige p-6 rounded-sm flex items-start gap-4 shadow-xs">
            <div className="p-3 bg-brand-cream-dark text-brand-gold border border-brand-gold/20 rounded-xs flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold text-brand-charcoal">Electronic Support</h3>
              <p className="text-xs font-light text-brand-charcoal-light/80">
                Customer Support: <a href="mailto:support@omclothhouse.com" className="text-brand-gold hover:text-brand-charcoal font-semibold">support@omclothhouse.com</a><br />
                Bridal Consultations: <a href="mailto:custom@omclothhouse.com" className="text-brand-gold hover:text-brand-charcoal font-semibold">custom@omclothhouse.com</a>
              </p>
            </div>
          </div>

          {/* Hours of Operations */}
          <div className="bg-brand-cream border border-brand-beige p-6 rounded-sm flex items-start gap-4 shadow-xs">
            <div className="p-3 bg-brand-cream-dark text-brand-gold border border-brand-gold/20 rounded-xs flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1 w-full text-xs font-light text-brand-charcoal-light/80">
              <h3 className="font-serif text-base font-bold text-brand-charcoal mb-1">Hours of Operations</h3>
              <div className="flex justify-between border-b border-brand-beige py-1">
                <span>Tuesday - Sunday</span>
                <span className="font-medium text-brand-charcoal">10:00 AM - 8:30 PM</span>
              </div>
              <div className="flex justify-between py-1 text-red-600 font-medium">
                <span>Monday</span>
                <span>Closed (Weekly Off)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form (Right Columns) */}
        <div className="lg:col-span-7 bg-brand-cream border border-brand-beige p-8 rounded-sm shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">Send Us a Message</h2>
            <p className="text-xs text-brand-charcoal-light/65 font-light">We will reply to your registered inquiry within 24 business hours.</p>
          </div>

          {submitted && (
            <div className="bg-emerald-50 text-emerald-700 text-xs p-4 rounded-xs border border-emerald-200 flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="font-semibold text-emerald-800">Inquiry Logged Successfully</h4>
                <p className="font-light">Thank you! Your query has been received. Our team will contact you shortly.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label htmlFor="name" className="uppercase tracking-wider font-semibold text-brand-charcoal">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-brand-cream-dark border border-brand-beige text-brand-charcoal placeholder-brand-charcoal-light/35 text-xs px-4 py-3 rounded-sm outline-none focus:border-brand-gold transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="uppercase tracking-wider font-semibold text-brand-charcoal">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-brand-cream-dark border border-brand-beige text-brand-charcoal placeholder-brand-charcoal-light/35 text-xs px-4 py-3 rounded-sm outline-none focus:border-brand-gold transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label htmlFor="subject" className="uppercase tracking-wider font-semibold text-brand-charcoal">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="How can we assist you?"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-brand-cream-dark border border-brand-beige text-brand-charcoal placeholder-brand-charcoal-light/35 text-xs px-4 py-3 rounded-sm outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label htmlFor="message" className="uppercase tracking-wider font-semibold text-brand-charcoal">Your Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Type your message details here..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-brand-cream-dark border border-brand-beige text-brand-charcoal placeholder-brand-charcoal-light/35 text-xs px-4 py-3 rounded-sm outline-none focus:border-brand-gold transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-charcoal hover:bg-brand-charcoal-light text-brand-cream py-3.5 uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 rounded-sm shadow-sm"
            >
              <Send className="w-4 h-4 text-brand-gold" />
              <span>{loading ? 'Sending Inquiry...' : 'Submit Message'}</span>
            </button>
          </form>

        </div>

      </div>

      {/* Embedded Google Maps Placeholder Section */}
      <div className="space-y-4 pt-4 border-t border-brand-beige">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-brand-gold" />
          <h3 className="font-serif text-lg font-bold text-brand-charcoal">Interactive Map & Directions</h3>
        </div>

        {/* Map Mockup Component */}
        <div className="relative border border-brand-beige rounded-sm h-[350px] overflow-hidden bg-[#ECE8DE] shadow-sm flex items-center justify-center">
          
          {/* Map Grid Elements Mockup */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C5A880 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
          
          {/* Map Road Mockup Lines */}
          <div className="absolute w-[2px] h-full bg-[#DFD9CE] left-1/3 rotate-[12deg] pointer-events-none"></div>
          <div className="absolute w-[2px] h-full bg-[#DFD9CE] left-2/3 -rotate-[45deg] pointer-events-none"></div>
          <div className="absolute h-[2px] w-full bg-[#DFD9CE] top-1/2 -rotate-[5deg] pointer-events-none"></div>
          <div className="absolute h-[2px] w-full bg-[#DFD9CE] top-1/4 rotate-[15deg] pointer-events-none"></div>

          {/* Map Markers */}
          <div className="absolute left-[45%] top-[40%] flex flex-col items-center z-10 animate-bounce">
            <div className="bg-brand-charcoal text-brand-gold border border-brand-gold p-2 rounded shadow-lg text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 fill-brand-gold" />
              <span>OM CLOTH HOUSE</span>
            </div>
            <div className="w-2 h-2 bg-brand-charcoal border border-brand-gold rounded-full -mt-0.5"></div>
          </div>

          <div className="absolute left-[30%] top-[60%] flex flex-col items-center opacity-70">
            <div className="bg-[#DFD9CE] text-brand-charcoal px-2 py-1 rounded text-[8px] font-medium uppercase tracking-wider">
              Gole Market Circle
            </div>
            <div className="w-1.5 h-1.5 bg-brand-charcoal-light/50 rounded-full"></div>
          </div>

          <div className="absolute left-[65%] top-[25%] flex flex-col items-center opacity-70">
            <div className="bg-[#DFD9CE] text-brand-charcoal px-2 py-1 rounded text-[8px] font-medium uppercase tracking-wider">
              Town Hall Metro Gate 2
            </div>
            <div className="w-1.5 h-1.5 bg-brand-charcoal-light/50 rounded-full"></div>
          </div>

          {/* Map Details Overlay Card */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs border border-brand-beige p-4 rounded-sm shadow-lg max-w-xs z-10 text-[11px] text-brand-charcoal-light leading-relaxed hidden sm:block">
            <h4 className="font-serif text-sm font-bold text-brand-charcoal flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Store Parking Area</span>
            </h4>
            <p className="mt-1 font-light">Free valets and dedicated basement car parking are available at Gate No. 3 for OM customers.</p>
          </div>

          {/* Zoom Controls Simulation */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10">
            <button className="w-8 h-8 bg-brand-cream hover:bg-brand-beige border border-brand-beige rounded flex items-center justify-center font-bold text-brand-charcoal text-sm shadow cursor-pointer transition-colors">+</button>
            <button className="w-8 h-8 bg-brand-cream hover:bg-brand-beige border border-brand-beige rounded flex items-center justify-center font-bold text-brand-charcoal text-sm shadow cursor-pointer transition-colors">-</button>
          </div>

          {/* Map Static Fallback Notice for Search Spiders */}
          <div className="absolute top-4 left-4 bg-brand-charcoal/80 text-brand-cream-dark text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm">
            Satellite View Online
          </div>
        </div>
      </div>

    </div>
  );
}
