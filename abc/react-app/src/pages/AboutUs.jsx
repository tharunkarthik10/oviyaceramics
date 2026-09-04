import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full bg-white text-on-surface font-body-md antialiased pt-24 md:pt-28 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 space-y-16 md:space-y-24">
        
        {/* 2. Hero / Scale Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 pr-0 lg:pr-8">
            <h1 className="font-headline-xl text-[40px] md:text-[56px] leading-[1.1] font-bold text-on-surface">
              Leading with Scale and Innovation Across India
            </h1>
            <p className="font-body-md text-industrial-gray text-base leading-relaxed">
              Oviya Ceramics is the largest manufacturer of ceramic and vitrified tiles in India, with an annual aggregate capacity of 87.80 million sq. meters. This capacity is spread across nine plants: <strong className="text-on-surface font-semibold">Sikandrabad</strong> (Uttar Pradesh), <strong className="text-on-surface font-semibold">Gailpur & Malootana</strong> (Rajasthan), <strong className="text-on-surface font-semibold">Srikalahasti</strong> (Andhra Pradesh), <strong className="text-on-surface font-semibold">Balanagar</strong> (Telangana), three plants in <strong className="text-on-surface font-semibold">Morbi</strong> (Gujarat), and one plant in <strong className="text-on-surface font-semibold">Nawalparasi</strong> (Nepal).
            </p>
            
            <div className="flex items-center gap-6 pt-6">
              <span className="font-headline-xl text-[96px] md:text-[120px] text-primary leading-none tracking-tighter">09</span>
              <div>
                <span className="font-headline-sm font-bold text-xl tracking-wider text-on-surface block mb-2">PLANTS</span>
                <span className="font-body-md text-industrial-gray text-sm block max-w-[200px]">Operates nine state-of-the-art manufacturing plants.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-8 gap-x-4 pt-8">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <h4 className="font-headline-sm font-bold text-[15px] uppercase tracking-wider">Sikandrabad</h4>
                  <p className="font-body-md text-industrial-gray text-[13px]">Uttar Pradesh</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <h4 className="font-headline-sm font-bold text-[15px] uppercase tracking-wider">Gailpur</h4>
                  <p className="font-body-md text-industrial-gray text-[13px]">Rajasthan</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <h4 className="font-headline-sm font-bold text-[15px] uppercase tracking-wider">Malootana</h4>
                  <p className="font-body-md text-industrial-gray text-[13px]">Rajasthan</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <h4 className="font-headline-sm font-bold text-[15px] uppercase tracking-wider">Srikalahasti</h4>
                  <p className="font-body-md text-industrial-gray text-[13px]">Andhra Pradesh</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <h4 className="font-headline-sm font-bold text-[15px] uppercase tracking-wider">Balanagar</h4>
                  <p className="font-body-md text-industrial-gray text-[13px]">Telangana</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <h4 className="font-headline-sm font-bold text-[15px] uppercase tracking-wider">Morbi (3)</h4>
                  <p className="font-body-md text-industrial-gray text-[13px]">Gujarat</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <h4 className="font-headline-sm font-bold text-[15px] uppercase tracking-wider">Nawalparasi</h4>
                  <p className="font-body-md text-industrial-gray text-[13px]">Nepal</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full min-h-[450px] lg:min-h-[520px] bg-surface-variant relative shadow-sm border border-surface-variant">
            <img src="/factory_aerial_1788260913280.jpg" alt="Oviya Ceramics Plant" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </section>

        {/* 3. Legacy Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-full min-h-[450px] lg:min-h-[520px] bg-surface-variant relative order-2 lg:order-1 shadow-sm border border-surface-variant">
            <img src="/factory_machinery_1788264490013.jpg" alt="Modern Machinery" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="space-y-8 pl-0 lg:pl-8 order-1 lg:order-2">
            <h2 className="font-headline-xl text-[40px] md:text-[48px] leading-[1.1] font-bold text-on-surface">
              Oviya's 37-Year Legacy of Innovation and Growth
            </h2>
            <p className="font-body-md text-industrial-gray text-base leading-relaxed">
              Oviya's manufacturing units are equipped with cutting-edge modern technology. Intense automation, robotic car application, and a zero-tolerance for human error are just a few reasons why Oviya is the number one brand in the industry.
            </p>
            <p className="font-body-md text-industrial-gray text-base leading-relaxed">
              <strong className="text-on-surface font-bold">Founded 37 years ago</strong>, Oviya has grown stronger through hard work, innovation, and the trust of our discerning customers. The rapidly growing appetite of Indian consumers for style and aesthetics has inspired every design at Oviya. Our ability to keep pace with customer and market demands has made Oviya synonymous with quality, service, and innovation—not only in the domestic market but internationally as well.
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
                <span className="font-body-md text-industrial-gray text-sm">Robotic car application</span>
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
                We leverage two invaluable assets—the Oviya brand and our unparalleled, multi-layer distribution network—to expand our product offerings and cater to the growing aspirations of discerning Indian customers.
              </p>
            </div>
            
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
              <div className="flex items-baseline gap-2 text-primary">
                <span className="font-headline-xl text-[100px] md:text-[140px] font-bold leading-none tracking-tighter">87.80</span>
                <span className="font-headline-sm text-2xl font-bold uppercase tracking-wider">MSM</span>
              </div>
              <h3 className="font-headline-sm font-bold text-[18px] text-on-surface uppercase tracking-widest mt-2 mb-4">PRODUCTION CAPACITY</h3>
              <p className="font-body-md text-industrial-gray text-base">Annual production capacity of 87.80 million square meters (MSM).</p>
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
                India being one of the largest domestic market and has emerged 2nd largest consumer of ceramic / vitrified tiles in the world and very well positioned to take the mantle of a Global manufacturing base. Oviya Ceramics Ltd has played its own role in achieving this goal. Since our founding in mid 1988, we have been moving forward on many fronts to capitalize on the vast growth opportunities by improving our operating efficiency and expanding our business portfolio. Today, as a result of our internal growth initiatives and several strategic and innovative initiatives, our business has grown many folds and we have emerged as the largest manufacturer of ceramic/vitrified tiles with an aggregate capacity of 87.80 million sq. mtrs.
              </p>
              <p className="font-body-md text-on-surface text-base leading-relaxed font-bold mb-6">
                Year after year, we have consistently set higher benchmarks. Our business has grown strength by strength with our hard work and persistence.
              </p>
              <p className="font-body-md text-industrial-gray text-base leading-relaxed inline-block">
                Apart from growth, the company is focusing up on larger consumer satisfaction in the years to come.
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
