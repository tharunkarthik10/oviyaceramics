import React from 'react';

const Component = () => {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden antialiased">
      {/* Original body wrapper added above */}
      

{/*  Main Content  */}
<main className="flex-grow">
{/*  Hero Section  */}
<section className="py-margin-desktop px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<div className="max-w-3xl">
<h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-6">Visualizing Precision</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Explore our portfolio of industrial installations, intricate ceramic products, and our state-of-the-art manufacturing facility. A testament to engineering and material mastery.</p>
</div>
</section>
{/*  Case Study Highlight  */}
<section className="mb-margin-desktop">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant grid grid-cols-1 lg:grid-cols-2 group hover:shadow-[0px_4px_20px_rgba(0,0,0,0.05)] transition-shadow duration-300">
<div className="h-64 lg:h-auto overflow-hidden">
<img alt="Dindigul Installation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A sprawling, high-tech industrial manufacturing facility in Dindigul, featuring massive gleaming steel silos and intricate piping systems against a bright, clear blue sky. The scene is shot with high-key lighting, emphasizing the pristine, modern nature of the plant. A crisp, architectural composition highlighting industrial precision and scale in a minimal, light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4TSK161XxfELuuSmoNI3Bk6GydTSt5A4omGBV-_uFtc3MGrZVg5A2fPnUtUUwr7qmJW1AA1n3qlrnMAyvOVFd8mhE0jBHsleZ4nxg3mtU5UMPpreFNbNeQ9pzESHg_RcLjP8ZUPrw_rEvmnag4Tnu4wmR_SYh6jo0AhvNpkswzsXhlq7-3LjKSa_J45vhFIhz8EfGK0YUDfh3tU9RaAOT2I0L16v7QwJJn0R-D09nKSdlD1Qr9BKg" />
</div>
<div className="p-8 md:p-12 flex flex-col justify-center">
<span className="inline-block bg-indian-red/10 text-indian-red font-label-md text-label-md px-3 py-1 rounded-full mb-6 w-max">Featured Project</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">Dindigul Manufacturing Complex</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-8">A comprehensive installation of high-stress ceramic insulators and custom refractory linings for a major industrial plant in Dindigul. This project demonstrates our capacity for large-scale, precision-engineered solutions in demanding environments.</p>
<a className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:text-indian-red transition-colors w-max group/link" href="#">
                            View Case Study
                            <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform" style={{}}>arrow_forward</span>
</a>
</div>
</div>
</div>
</section>
{/*  Gallery Section  */}
<section className="py-20 bg-white">
<div className="max-w-[1600px] mx-auto px-4 md:px-8">
{/*  Filters  */}
<div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6 mb-12">
<button className="px-5 py-1.5 rounded text-white bg-primary font-semibold text-sm transition-colors shadow-sm">all</button>
<button className="px-3 py-1.5 rounded text-[#333333] hover:text-primary font-semibold text-sm transition-colors">Floor Tiles</button>
<button className="px-3 py-1.5 rounded text-[#333333] hover:text-primary font-semibold text-sm transition-colors">Wall Tiles</button>
<button className="px-3 py-1.5 rounded text-[#333333] hover:text-primary font-semibold text-sm transition-colors">Bathroom Tiles</button>
<button className="px-3 py-1.5 rounded text-[#333333] hover:text-primary font-semibold text-sm transition-colors">Portico Tiles</button>
<button className="px-3 py-1.5 rounded text-[#333333] hover:text-primary font-semibold text-sm transition-colors">Sanitarywares</button>
<button className="px-3 py-1.5 rounded text-[#333333] hover:text-primary font-semibold text-sm transition-colors">Warehouse</button>
<button className="px-3 py-1.5 rounded text-[#333333] hover:text-primary font-semibold text-sm transition-colors">Transport</button>
</div>
{/*  Dense Image Grid  */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
  {[
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3wr-BAtWuEBqvx6fxuYDA4iCuzq0JQYeWUeZVAW_sFqf1kHg_meCfY4x6FrWF_BnzYue9TNnuxZ3PcmXvzhCChr0F9Rq3LYNuG8sktkKcuzJZUd2Eiy1WoUDeIHxFUQ2FW8LemxHayRKbnrDwZ5qZDLht-pguoSJHfzE8ZmXedTf42NXC4kSsKSIHEfg6Ghc9fLbE2n3O67h_pdaJ5wSHHC1t7tgrNXf6qzsTCZl-UNdXbssYfDQp",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDJH8_zj7YqS09Hm97-HjffaAZSUJhK4kn5bNZa84KUhmksWEqtL1DCSC8ebB1fbXWMrXhiaNRt7JLPtmLPxO1IvR2NTfy8CmBj3xPCVIvqwFZNuLJgVtyK-M9sxAJJr9sNLmbpdSSybbOMFjEG60uss__2yllzuZSnAP--pzQ7eLHDpZEdo_zPf9O8qoeV-2wWh492S3BQAlLaHbgEpv5zJU63o330e86kVOZUmGs7JbiiW8xFV3lw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB75_f5iVFWZNbMqlEMYF1dY6Ivzvav260gqBdOW6z3GBXTuWR6OSzNavngj2Pqi1p52LqoQndHnkHGi35VpPrXstVEp7qHzt_sgyd5O_U-Btriq7-L-5WjwkRsfi5qWTdDHOf8EzNoqelmsuzcqr_wkyZNcyXJWhBSX3FAdaWNqEsMrbEfJZvVoNgL93mFmMq-UNveDc0IgMzpuHSL5bP30WuoD-Agb7DPaVH_hF3LzJHHTHgPpgX2",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_an-L0XsnoCxiVgINAirpy6844JS90yfMyXv5RM7G3TqcFdGnlK1qRtw1yklrIKk3anmF1W1fagyv4rmDs6IekLDZnZKCK7KYxUeNaz4nRMPmuhYUXDHPMbDk_haiymSEKYIib1FlTKX01qefgZmm3HQukfQlz3PQcFBbA5od-cLfcHt5N5wYXFssAkowAq-Hp8J1LzUr94Hq3sQtnerCwk-eM0DFUPtOeMMNZqY0tNYbtTMpniKe",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAacv7p8qiHVgkhba6dvhhmZfKc0wpczpYhMH7ywXc9mdTpCGSp0oS4VreBWHIn2kMRT546gDZR6Anwzk7b92aOgkCHmRByPOg2gSayolOu5FLfxPn1x8G0EzJXKpRHDNcSUCOMGHxtB-9gJd1g9Qmtrfaz5zL6tbaBpIfftkrGf6-jsddh40_oAyMrConDGi8ue8LTUC-91xOjUEt_q0osHghBPyik6SXb7lYqVlzEFxJ0H_L5CMJe",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBARtRtpzneS0dxt1oTq_v4mAGFIQWcjIr9nLVZg-oISSLF03G943VflZnjdU4dxVtnvoyJ_916vuLSOFWoSPrAnI591C6_wPLIW9PAsjRH2Mxs0CuD8gxWBrF-iOpP8pWpkvQK-ALezgwZGHZbNknvP3olU9KJErBpWVu41u_734VJez5W_11TVktj7Uo87aZjzgiZ7-T2P1-H7iT4zjlIeaPKGqKSWjwkOheJ2ntx9GJgdF-qcD6t",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC4TSK161XxfELuuSmoNI3Bk6GydTSt5A4omGBV-_uFtc3MGrZVg5A2fPnUtUUwr7qmJW1AA1n3qlrnMAyvOVFd8mhE0jBHsleZ4nxg3mtU5UMPpreFNbNeQ9pzESHg_RcLjP8ZUPrw_rEvmnag4Tnu4wmR_SYh6jo0AhvNpkswzsXhlq7-3LjKSa_J45vhFIhz8EfGK0YUDfh3tU9RaAOT2I0L16v7QwJJn0R-D09nKSdlD1Qr9BKg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3wr-BAtWuEBqvx6fxuYDA4iCuzq0JQYeWUeZVAW_sFqf1kHg_meCfY4x6FrWF_BnzYue9TNnuxZ3PcmXvzhCChr0F9Rq3LYNuG8sktkKcuzJZUd2Eiy1WoUDeIHxFUQ2FW8LemxHayRKbnrDwZ5qZDLht-pguoSJHfzE8ZmXedTf42NXC4kSsKSIHEfg6Ghc9fLbE2n3O67h_pdaJ5wSHHC1t7tgrNXf6qzsTCZl-UNdXbssYfDQp",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDJH8_zj7YqS09Hm97-HjffaAZSUJhK4kn5bNZa84KUhmksWEqtL1DCSC8ebB1fbXWMrXhiaNRt7JLPtmLPxO1IvR2NTfy8CmBj3xPCVIvqwFZNuLJgVtyK-M9sxAJJr9sNLmbpdSSybbOMFjEG60uss__2yllzuZSnAP--pzQ7eLHDpZEdo_zPf9O8qoeV-2wWh492S3BQAlLaHbgEpv5zJU63o330e86kVOZUmGs7JbiiW8xFV3lw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB75_f5iVFWZNbMqlEMYF1dY6Ivzvav260gqBdOW6z3GBXTuWR6OSzNavngj2Pqi1p52LqoQndHnkHGi35VpPrXstVEp7qHzt_sgyd5O_U-Btriq7-L-5WjwkRsfi5qWTdDHOf8EzNoqelmsuzcqr_wkyZNcyXJWhBSX3FAdaWNqEsMrbEfJZvVoNgL93mFmMq-UNveDc0IgMzpuHSL5bP30WuoD-Agb7DPaVH_hF3LzJHHTHgPpgX2",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_an-L0XsnoCxiVgINAirpy6844JS90yfMyXv5RM7G3TqcFdGnlK1qRtw1yklrIKk3anmF1W1fagyv4rmDs6IekLDZnZKCK7KYxUeNaz4nRMPmuhYUXDHPMbDk_haiymSEKYIib1FlTKX01qefgZmm3HQukfQlz3PQcFBbA5od-cLfcHt5N5wYXFssAkowAq-Hp8J1LzUr94Hq3sQtnerCwk-eM0DFUPtOeMMNZqY0tNYbtTMpniKe",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAacv7p8qiHVgkhba6dvhhmZfKc0wpczpYhMH7ywXc9mdTpCGSp0oS4VreBWHIn2kMRT546gDZR6Anwzk7b92aOgkCHmRByPOg2gSayolOu5FLfxPn1x8G0EzJXKpRHDNcSUCOMGHxtB-9gJd1g9Qmtrfaz5zL6tbaBpIfftkrGf6-jsddh40_oAyMrConDGi8ue8LTUC-91xOjUEt_q0osHghBPyik6SXb7lYqVlzEFxJ0H_L5CMJe",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBARtRtpzneS0dxt1oTq_v4mAGFIQWcjIr9nLVZg-oISSLF03G943VflZnjdU4dxVtnvoyJ_916vuLSOFWoSPrAnI591C6_wPLIW9PAsjRH2Mxs0CuD8gxWBrF-iOpP8pWpkvQK-ALezgwZGHZbNknvP3olU9KJErBpWVu41u_734VJez5W_11TVktj7Uo87aZjzgiZ7-T2P1-H7iT4zjlIeaPKGqKSWjwkOheJ2ntx9GJgdF-qcD6t",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC4TSK161XxfELuuSmoNI3Bk6GydTSt5A4omGBV-_uFtc3MGrZVg5A2fPnUtUUwr7qmJW1AA1n3qlrnMAyvOVFd8mhE0jBHsleZ4nxg3mtU5UMPpreFNbNeQ9pzESHg_RcLjP8ZUPrw_rEvmnag4Tnu4wmR_SYh6jo0AhvNpkswzsXhlq7-3LjKSa_J45vhFIhz8EfGK0YUDfh3tU9RaAOT2I0L16v7QwJJn0R-D09nKSdlD1Qr9BKg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3wr-BAtWuEBqvx6fxuYDA4iCuzq0JQYeWUeZVAW_sFqf1kHg_meCfY4x6FrWF_BnzYue9TNnuxZ3PcmXvzhCChr0F9Rq3LYNuG8sktkKcuzJZUd2Eiy1WoUDeIHxFUQ2FW8LemxHayRKbnrDwZ5qZDLht-pguoSJHfzE8ZmXedTf42NXC4kSsKSIHEfg6Ghc9fLbE2n3O67h_pdaJ5wSHHC1t7tgrNXf6qzsTCZl-UNdXbssYfDQp",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDJH8_zj7YqS09Hm97-HjffaAZSUJhK4kn5bNZa84KUhmksWEqtL1DCSC8ebB1fbXWMrXhiaNRt7JLPtmLPxO1IvR2NTfy8CmBj3xPCVIvqwFZNuLJgVtyK-M9sxAJJr9sNLmbpdSSybbOMFjEG60uss__2yllzuZSnAP--pzQ7eLHDpZEdo_zPf9O8qoeV-2wWh492S3BQAlLaHbgEpv5zJU63o330e86kVOZUmGs7JbiiW8xFV3lw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB75_f5iVFWZNbMqlEMYF1dY6Ivzvav260gqBdOW6z3GBXTuWR6OSzNavngj2Pqi1p52LqoQndHnkHGi35VpPrXstVEp7qHzt_sgyd5O_U-Btriq7-L-5WjwkRsfi5qWTdDHOf8EzNoqelmsuzcqr_wkyZNcyXJWhBSX3FAdaWNqEsMrbEfJZvVoNgL93mFmMq-UNveDc0IgMzpuHSL5bP30WuoD-Agb7DPaVH_hF3LzJHHTHgPpgX2",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_an-L0XsnoCxiVgINAirpy6844JS90yfMyXv5RM7G3TqcFdGnlK1qRtw1yklrIKk3anmF1W1fagyv4rmDs6IekLDZnZKCK7KYxUeNaz4nRMPmuhYUXDHPMbDk_haiymSEKYIib1FlTKX01qefgZmm3HQukfQlz3PQcFBbA5od-cLfcHt5N5wYXFssAkowAq-Hp8J1LzUr94Hq3sQtnerCwk-eM0DFUPtOeMMNZqY0tNYbtTMpniKe"
  ].map((src, idx) => (
    <div key={idx} className="aspect-[4/3] bg-gray-100 overflow-hidden group cursor-pointer border border-gray-200 hover:shadow-lg transition-all">
      <img src={src} alt={`Gallery Image ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
  ))}
</div>
</div>
</section>
</main>




    </div>
  );
};

export default Component;
