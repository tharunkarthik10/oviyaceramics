import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="w-full bg-surface text-stone-900 font-body-md antialiased pt-[60px] md:pt-[88px] pb-20 md:pb-28">
      {/* Header Banner */}
      <section className="bg-stone-900 text-white py-12 md:py-16 px-4 sm:px-8 md:px-16 border-b border-stone-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
            <Link to="/" className="text-stone-400 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span className="text-amber-300">Terms of Service</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-sm md:text-base text-stone-300 leading-relaxed max-w-2xl">
            Commercial terms, conditions of supply, product specifications, freight transit policies, and warranty guidelines governing all orders fulfilled by Oviya Ceramics.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-stone-400">
            <span>Effective Date: September 2026</span>
            <span>•</span>
            <span>Jurisdiction: Dindigul, Tamil Nadu</span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-10 md:py-14">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-10">

          {/* Section 1 */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Clause 01
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Acceptance of Commercial Terms
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-3">
              By accessing our website (<code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-800 text-xs font-mono">oviyaceramics.com</code>), downloading digital specification catalogues, receiving proforma quotations, or placing purchase orders with Oviya Ceramics Ltd, you agree to be bound by these Terms of Service.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              These terms apply equally to retail customers, interior design studios, authorized dealership networks, and commercial architectural contracting firms.
            </p>
          </div>

          {/* Section 2 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Clause 02
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Product Specifications & Natural Ceramic Variations
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
              Ceramic and vitrified tiles are manufactured from natural minerals subjected to high-temperature kiln firing. The following conditions apply to all products:
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1">
                  1. Shade & Batch Variations (Dye Lot)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Digital catalog images and online previews are representative. Slight shade variations may naturally occur between distinct kiln production batches. Buyers are advised to order 5% to 10% extra material from the same batch to guarantee uniformity across the entire installation area.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1">
                  2. Dimensional Tolerance
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  All vitrified slabs (600x1200mm, 800x1600mm, 1200x2400mm) and digital ceramic wall tiles conform strictly to Bureau of Indian Standards (BIS / IS 15622) standards with permissible dimensional tolerance (+/- 0.1%).
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1">
                  3. Inspection Prior to Fixing
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Please inspect and dry-lay tiles before applying cement or adhesive. <strong>No claims regarding shade variance or surface defect can be entertained once tiles have been laid or mortared.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Clause 03
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Quotations, Pricing & Payment Terms
            </h2>
            <ul className="space-y-2.5 text-stone-600 text-sm sm:text-base leading-relaxed list-disc list-inside">
              <li>All preliminary estimates generated online or via WhatsApp are non-binding until confirmed via an official Proforma Invoice.</li>
              <li>Price quotes are valid for 15 days from the date of issuance due to fluctuating raw material and fuel tariffs.</li>
              <li>Goods and Services Tax (GST) is levied at applicable statutory rates (18% for ceramic and vitrified tiles).</li>
              <li>For wholesale and outstation dispatches, 100% advance payment or approved credit terms must be cleared prior to dispatch from our Dindigul plant.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Clause 04
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Dispatch, Transport & Delivery Policies
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
              All consignments originate from our central warehouse in Dindigul:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">local_shipping</span>
                  Freight & Transit
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Transportation costs are computed based on total tonnage, crate count, and destination distance. Transport charges are payable on 'To-Pay' basis or prepaid as stated on the invoice.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">forklift</span>
                  Unloading Responsibility
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Unless agreed in writing, offloading at destination site or project facility is the sole responsibility of the buyer.
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-amber-700 shrink-0 text-base mt-0.5">report_problem</span>
              <span><strong>Transit Breakage Notice:</strong> Due to the fragile nature of ceramics, a standard transit breakage allowance of up to 2% is customary in the industry. Any transit damages exceeding this threshold must be documented with clear photographs and recorded on the driver's delivery note within 24 hours of arrival.</span>
            </div>
          </div>

          {/* Section 5 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Clause 05
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Warranty & Limitation of Liability
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-3">
              Oviya Ceramics warrants that all tiles delivered comply with manufacturing standards for structural integrity, scratch resistance, and water absorption.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Our aggregate liability for any defective tiles is limited strictly to the replacement of the affected product or issuance of a credit voucher. Under no circumstances shall Oviya Ceramics be liable for indirect, incidental, or labour costs associated with tile removal or refitting.
            </p>
          </div>

          {/* Section 6 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Clause 06
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Jurisdiction & Governing Law
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Any dispute, controversy, or claim arising from or relating to contracts, orders, or transactions with Oviya Ceramics shall be governed by the laws of India and subject exclusively to the jurisdiction of the competent courts of <strong>Dindigul, Tamil Nadu, India</strong>.
            </p>
          </div>

        </div>

        {/* Back Button / CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Home</span>
          </Link>
          <Link
            to="/privacy-policy"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <span>View Privacy Policy</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
