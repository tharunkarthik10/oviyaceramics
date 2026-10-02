import React from 'react';
import SEO from '../components/SEO';

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Oviya Ceramics",
  "url": "https://oviyaceramics.in/about-us",
  "description": "Established in 2011 with 25+ years of industry expertise, Oviya Ceramics produces premium architectural ceramic and vitrified tiles in Dindigul, Tamil Nadu.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Oviya Ceramics",
    "url": "https://oviyaceramics.in",
    "logo": "https://oviyaceramics.in/oviya_logo.png",
    "foundingDate": "2011",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bathalagundu Road, near saravana Mill, opp. Dindigul, Pillayarnattam",
      "addressLocality": "Dindigul",
      "addressRegion": "Tamil Nadu",
      "postalCode": "624002",
      "addressCountry": "IN"
    }
  }
};

const AboutUs = () => {
  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-24 md:pt-28 pb-16">
      <SEO 
        title="About Us | 25+ Years Ceramic Craftsmanship & Innovation"
        description="Discover Oviya Ceramics' heritage since 2011, backed by 25+ years of ceramic engineering expertise. Learn about our advanced plant, machinery, and quality benchmarks in Dindigul."
        keywords="about Oviya Ceramics, tile manufacturer Dindigul, ceramic engineering Tamil Nadu, vitrified tile plant, architectural ceramics India"
        canonical="https://oviyaceramics.in/about-us"
        image="/factory_warehouse.jpg"
        schema={aboutSchema}
      />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 space-y-16 md:space-y-24">
        
        {/* 2. Hero / Scale Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 pr-0 lg:pr-8">
            <h1 className="font-headline-xl text-[40px] md:text-[56px] leading-[1.1] font-bold text-on-surface">
              Crafting Excellence with Scale and Innovation
            </h1>
            <p className="font-body-md text-industrial-gray text-base leading-relaxed">
              Established in <strong className="text-on-surface font-semibold">2011</strong>, <strong className="text-on-surface font-semibold">Oviya Ceramics</strong> is a premier manufacturer of high-performance ceramic and vitrified tiles. Guided by over <strong className="text-on-surface font-semibold">25 years of industry leadership</strong> and ceramic engineering expertise, we combine time-tested craftsmanship with modern European technology to deliver exceptional architectural surfaces across residential, commercial, and export markets.
            </p>
            
            <div className="flex items-center gap-6 pt-6">
              <span className="font-headline-xl text-[96px] md:text-[120px] text-primary leading-none tracking-tighter">25+</span>
              <div>
                <span className="font-headline-sm font-bold text-xl tracking-wider text-on-surface block mb-2">YEARS OF EXPERTISE</span>
                <span className="font-body-md text-industrial-gray text-sm block max-w-[200px]">Pioneering leadership & ceramic engineering since 2011.</span>
              </div>
            </div>

            <div className="pt-8">
              <div className="flex items-start gap-4 p-5 rounded-lg bg-surface border border-surface-variant/80 max-w-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">location_on</span>
                </div>
                <div>
                  <h4 className="font-headline-sm font-bold text-lg text-on-surface uppercase tracking-wider">Dindigul</h4>
                  <p className="font-body-md text-primary font-medium text-sm">Tamil Nadu, India</p>
                  <p className="font-body-md text-industrial-gray text-xs mt-1">
                    Primary Manufacturing Complex, Flagship Experience Center & Central Warehouse
                  </p>
                  <p className="font-body-md text-industrial-gray/80 text-xs mt-0.5">
                    Bathalagundu Road, Opp. Dindigul, Pillayarnattam, Tamil Nadu 624002
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full min-h-[450px] lg:min-h-[520px] bg-surface-variant relative shadow-sm border border-surface-variant overflow-hidden">
            <img src="/factory_warehouse.jpg" alt="Oviya Ceramics Plant & Warehouse" className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
        </section>

        {/* 3. Legacy Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-full min-h-[450px] lg:min-h-[520px] bg-surface-variant relative order-2 lg:order-1 shadow-sm border border-surface-variant overflow-hidden">
            <img src="/factory_workshop_sme.jpg" alt="Ceramic Workshop & Quality Control" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="space-y-8 pl-0 lg:pl-8 order-1 lg:order-2">
            <h2 className="font-headline-xl text-[40px] md:text-[48px] leading-[1.1] font-bold text-on-surface">
              25 Years of Industry Wisdom. Innovation Since 2011.
            </h2>
            <p className="font-body-md text-industrial-gray text-base leading-relaxed">
              Oviya's manufacturing units are equipped with cutting-edge modern technology. Smart automation, robotic handling, and stringent zero-defect quality controls ensure every surface meets international benchmarks.
            </p>
            <p className="font-body-md text-industrial-gray text-base leading-relaxed">
              <strong className="text-on-surface font-bold">Founded in 2011</strong>, Oviya was established on the foundation of over 25 years of industry leadership. By pairing quarter-a-century of technical mastery with modern automation, we design surfaces that cater to the evolving tastes of discerning architects and homeowners—delivering synonymous quality, style, and reliability across domestic and export markets.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-surface-variant">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
                </div>
                <span className="font-body-md text-industrial-gray text-sm">Cutting edge modern technology</span>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">memory</span>
                </div>
                <span className="font-body-md text-industrial-gray text-sm">Intense automation</span>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">smart_toy</span>
                </div>
                <span className="font-body-md text-industrial-gray text-sm">Robotic handling & cars</span>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">precision_manufacturing</span>
                </div>
                <span className="font-body-md text-industrial-gray text-sm">Zero chance for human error</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Innovation and Quality Section */}
        <section className="py-16 border-y border-surface-variant/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-headline-xl text-[40px] md:text-[48px] leading-[1.1] font-bold text-on-surface">
                Innovation and Quality at the Heart of Oviya
              </h2>
              <p className="font-body-md text-industrial-gray text-base leading-relaxed">
                Whether it's technology, research, design, or quality, Oviya focuses on all these factors, adopting new production techniques to enhance the quality of its products. Thanks to the creativity and design expertise of our team, our designs combine both innovation and exclusivity.
              </p>
              <p className="font-body-md text-industrial-gray text-base leading-relaxed">
                We leverage two invaluable assets—the Oviya brand and our dedicated, multi-layer distribution network—to expand our product offerings and cater to the growing aspirations of discerning Indian and global customers.
              </p>
            </div>
            
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
              <div className="flex items-baseline gap-2 text-primary">
                <span className="font-headline-xl text-[100px] md:text-[140px] font-bold leading-none tracking-tighter">6.50+</span>
                <span className="font-headline-sm text-2xl font-bold uppercase tracking-wider">MSM</span>
              </div>
              <h3 className="font-headline-sm font-bold text-[18px] text-on-surface uppercase tracking-widest mt-2 mb-4">PRODUCTION CAPACITY</h3>
              <p className="font-body-md text-industrial-gray text-base">Annual production capacity exceeding 6.50+ million square meters (MSM).</p>
            </div>
          </div>
        </section>

        {/* 5. Corporate Philosophy: Vision, Mission & Core Pillars (No Images) */}
        <section className="py-8 md:py-12 border-t border-surface-variant/80">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-3">
              Corporate Philosophy
            </span>
            <h2 className="font-headline-xl text-[36px] md:text-[46px] leading-[1.15] font-bold text-on-surface">
              The Principles That Guide Every Surface We Create
            </h2>
            <p className="font-body-md text-industrial-gray text-base leading-relaxed mt-4">
              Our journey from 2011 has been driven by deep ceramic engineering expertise and an unwavering dedication to craftsmanship. We believe architectural excellence is built on clear vision, disciplined execution, and lasting relationships.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Vision Card */}
            <div className="p-8 md:p-10 bg-surface-container/60 border border-surface-variant rounded-xs relative group hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[30px]">visibility</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Our Vision</span>
              <h3 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                Setting the Benchmark in Architectural Surfaces
              </h3>
              <p className="font-body-md text-industrial-gray text-base leading-relaxed">
                To be South India's most trusted manufacturer of premium ceramic and vitrified surfaces, recognized for pioneering design, sustainable engineering, and delivering lasting elegance to homes and commercial landmarks alike.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 md:p-10 bg-surface-container/60 border border-surface-variant rounded-xs relative group hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[30px]">rocket_launch</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Our Mission</span>
              <h3 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                Empowering Spaces with Uncompromising Precision
              </h3>
              <p className="font-body-md text-industrial-gray text-base leading-relaxed">
                To continuously advance our manufacturing technology, produce zero-defect vitrified tiles, and provide our dealers, architects, and customers with exceptional quality, dependable logistics, and personalized service.
              </p>
            </div>
          </div>

          {/* Core Values: 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white border border-surface-variant rounded-xs hover:border-primary/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">verified</span>
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">Pillar 01</span>
              <h4 className="font-headline-sm font-bold text-lg text-on-surface mb-2">Precision Engineering</h4>
              <p className="font-body-md text-industrial-gray text-sm leading-relaxed">
                Computer-controlled kiln firing and high-density pressing guarantee dimensional flatness, zero warpage, and high breaking strength.
              </p>
            </div>

            <div className="p-6 bg-white border border-surface-variant rounded-xs hover:border-primary/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">eco</span>
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">Pillar 02</span>
              <h4 className="font-headline-sm font-bold text-lg text-on-surface mb-2">Sustainable Kiln Tech</h4>
              <p className="font-body-md text-industrial-gray text-sm leading-relaxed">
                Closed-loop industrial water treatment, thermal energy recirculation, and eco-friendly manufacturing at our Dindigul complex.
              </p>
            </div>

            <div className="p-6 bg-white border border-surface-variant rounded-xs hover:border-primary/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">palette</span>
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">Pillar 03</span>
              <h4 className="font-headline-sm font-bold text-lg text-on-surface mb-2">Design Mastery</h4>
              <p className="font-body-md text-industrial-gray text-sm leading-relaxed">
                Ultra-high-definition digital glaze printing reproducing natural Italian marble veins, tactile granites, and modern architectural finishes.
              </p>
            </div>

            <div className="p-6 bg-white border border-surface-variant rounded-xs hover:border-primary/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">handshake</span>
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">Pillar 04</span>
              <h4 className="font-headline-sm font-bold text-lg text-on-surface mb-2">Enduring Partnerships</h4>
              <p className="font-body-md text-industrial-gray text-sm leading-relaxed">
                Transparent dealer relationships, dedicated architectural support, and steadfast reliability rooted in 25+ years of industry trust.
              </p>
            </div>
          </div>

          {/* Quality Benchmark Strip */}
          <div className="p-6 md:p-8 bg-surface-container rounded-xs border border-surface-variant flex flex-wrap items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">check_circle</span>
              <div>
                <h5 className="font-headline-sm font-bold text-sm text-on-surface uppercase tracking-wider">Zero Defect Standard</h5>
                <p className="font-body-md text-industrial-gray text-xs">100% laser-inspected for planar flatness</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">water_drop</span>
              <div>
                <h5 className="font-headline-sm font-bold text-sm text-on-surface uppercase tracking-wider">&lt;0.05% Water Absorption</h5>
                <p className="font-body-md text-industrial-gray text-xs">Vitrified dense-body moisture barrier</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">shield</span>
              <div>
                <h5 className="font-headline-sm font-bold text-sm text-on-surface uppercase tracking-wider">BIS & ISO Standards</h5>
                <p className="font-body-md text-industrial-gray text-xs">Engineered to rigorous benchmarks</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">local_shipping</span>
              <div>
                <h5 className="font-headline-sm font-bold text-sm text-on-surface uppercase tracking-wider">Dindigul Central Hub</h5>
                <p className="font-body-md text-industrial-gray text-xs">Prompt dispatch across South India</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
