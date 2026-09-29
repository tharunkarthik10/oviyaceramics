import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-24 md:pt-28 pb-16">
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

        {/* 5. Vision / Chairman Message */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-4">
            <div className="h-[500px] bg-surface-variant relative shadow-sm border border-surface-variant">
              <img src="/leadership_team_1788264503966.jpg" alt="Leadership Team" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div>
                <h4 className="font-headline-sm font-bold text-base text-on-surface">Shri Rishi Oviya</h4>
                <p className="font-body-md text-industrial-gray text-xs uppercase tracking-wider mt-1">Managing Director</p>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-base text-on-surface">Shri Ashok Oviya</h4>
                <p className="font-body-md text-industrial-gray text-xs uppercase tracking-wider mt-1">Chairman</p>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-base text-on-surface">Shri Chetan Oviya</h4>
                <p className="font-body-md text-industrial-gray text-xs uppercase tracking-wider mt-1">Vice Chairman</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 pt-8">
            <h2 className="font-headline-xl text-[40px] md:text-[48px] leading-[1.1] font-bold text-on-surface">
              The Vision Behind Oviya's Success
            </h2>
            <div className="relative pl-8 md:pl-12 border-l-4 border-primary">
              <span className="material-symbols-outlined absolute top-0 left-0 text-primary text-[40px] -ml-6 bg-white py-2" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
              <p className="font-body-md text-industrial-gray text-base leading-relaxed mb-6">
                With more than 25 years of hands-on experience across the ceramics landscape, founding Oviya Ceramics in 2011 was the realization of a clear vision: to create world-class ceramic and vitrified surfaces engineered with uncompromising precision. Over the past decade and a half, we have continuously upgraded our manufacturing infrastructure, adopting advanced machinery and sustainable production practices. Today, our products grace prestigious residences, commercial landmarks, and global markets.
              </p>
              <p className="font-body-md text-on-surface text-base leading-relaxed font-bold mb-6">
                Year after year, we raise our benchmarks. Our growth is built upon steadfast dedication, integrity, and the lasting trust of our partners and customers.
              </p>
              <p className="font-body-md text-industrial-gray text-base leading-relaxed inline-block">
                Apart from growth, the company is focusing upon delivering higher consumer delight and architectural excellence in the years to come.
              </p>
              <span className="material-symbols-outlined text-primary text-[40px] inline-block align-bottom ml-2 scale-x-[-1]" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
