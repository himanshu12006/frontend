import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80',
      tagline: 'New Season Collection',
      title: 'Style for Every\nGeneration',
      subtitle: 'Premium linen, tailored silhouettes, and essentials for Men, Women & Kids.',
      link: '/shop?category=Women',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=1600&auto=format&fit=crop&q=80',
      tagline: 'Latest Fashion Trends',
      title: 'Effortless Summer\nSophistication',
      subtitle: 'Lightweight linen blazers, silk wrap dresses, and breathable resort wear.',
      link: '/shop?category=Women',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80',
      tagline: 'Festive Collection',
      title: 'Timeless Ethnic\nElegance',
      subtitle: 'Handwoven Chanderi sarees, Chikankari Kurtas, and embellished Lehengas.',
      link: '/shop?category=Ethnic Wear',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1600&auto=format&fit=crop&q=80',
      tagline: 'Kids Special Wear',
      title: 'Playful & Pure\nComfort',
      subtitle: 'Soft organic cotton pullovers, corduroy dungarees, and hand-smocked dresses.',
      link: '/shop?category=Kids',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-charcoal">
      {/* ── Slides ── */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background image with Ken-Burns zoom */}
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover object-center"
            style={{
              transform: index === currentSlide ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 8s ease-out',
            }}
          />

          {/* Left-side dark vignette so left-aligned text always reads */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.08) 100%)',
            }}
          />

          {/* Bottom scrim for dots / arrows */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 35%)',
            }}
          />

          {/* ── Text content – left-aligned, bottom third ── */}
          <div className="absolute inset-0 z-20 flex items-end pb-20 sm:pb-24 lg:pb-28 px-6 sm:px-12 lg:px-20">
            <div className="max-w-xl space-y-4">

              {/* Gold accent bar + tagline */}
              <div className="flex items-center gap-3">
                <span className="block w-8 h-[2px] bg-brand-gold flex-shrink-0" />
                <span
                  className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-brand-gold"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
                >
                  {slide.tagline}
                </span>
              </div>

              {/* Headline — whitespace-pre-line respects \n line-breaks */}
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white whitespace-pre-line"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p
                className="text-sm sm:text-base font-light text-white/80 max-w-md leading-relaxed"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
              >
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate(slide.link)}
                  className="bg-brand-forest hover:bg-brand-forest-light text-brand-cream text-xs font-semibold uppercase tracking-widest px-7 py-3.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => navigate('/shop')}
                  className="group flex items-center gap-2 text-white/90 hover:text-brand-gold text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                >
                  Explore Collections
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ── Arrow Navigation ── */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/30 bg-black/25 hover:bg-white hover:text-brand-charcoal text-white flex items-center justify-center transition-all duration-200 backdrop-blur-xs"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/30 bg-black/25 hover:bg-white hover:text-brand-charcoal text-white flex items-center justify-center transition-all duration-200 backdrop-blur-xs"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>


      {/* ── Dot Navigation ── */}
      <div className="absolute bottom-8 right-6 sm:right-10 z-30 flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-400 rounded-full ${
              index === currentSlide
                ? 'bg-brand-gold h-6 w-1.5'
                : 'bg-white/40 hover:bg-white/70 h-1.5 w-1.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
