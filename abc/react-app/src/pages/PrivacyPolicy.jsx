import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
            <span className="text-amber-300">Privacy Policy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-stone-300 leading-relaxed max-w-2xl">
            Learn how Oviya Ceramics collects, utilizes, and protects your personal and commercial data when you explore our tile collections, request quotations, or visit our Dindigul headquarters.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-stone-400">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Applies to: oviyaceramics.com</span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-10 md:py-14">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-10">

          {/* Section 1 */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Section 01
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Introduction & Scope
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-3">
              Oviya Ceramics ("we", "our", or "us"), operating our primary manufacturing showroom and stockyard at Bathalagundu Road, Pillayarnattam, Dindigul, Tamil Nadu 624002, is committed to safeguarding your privacy.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              This Privacy Policy explains the nature of personal and commercial information collected when you access our digital portal (<code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-800 text-xs font-mono">oviyaceramics.com</code>), request architectural price estimates, communicate with our sales desk, or place wholesale tile orders.
            </p>
          </div>

          {/* Section 2 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Section 02
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Information We Collect
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
              We only collect data strictly necessary to provide quotation accuracy, product samples, logistics coordination, and architectural customer support:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">badge</span>
                  Contact Information
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Your full name, phone number, WhatsApp contact, email address, and billing/shipping address provided during inquiries.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">construction</span>
                  Project Requirements
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Square footage needs, tile dimensions (e.g. 600x1200mm), box quantities, finish preferences (matt, high-gloss, carving), and project type (Residential, Commercial, Builder).
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">chat</span>
                  Direct Inquiries
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Communications via our quotation modal, WhatsApp sales line (<code className="text-primary font-semibold">+91 90808 97776</code>), and official email (<code className="text-primary font-semibold">sindiajoseph1986@gmail.com</code>).
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">devices</span>
                  Technical Metrics
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Anonymous device type, browser specifications, and visualizer interactions stored locally to optimize 3D tile rendering speed.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Section 03
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              How Your Information Is Used
            </h2>
            <ul className="space-y-2.5 text-stone-600 text-sm sm:text-base leading-relaxed list-disc list-inside">
              <li>Generating accurate factory-direct quotations with weight and transportation freight calculations.</li>
              <li>Arranging showroom visits and tile sample dispatches to architectural and design firms.</li>
              <li>Sending order status notifications, dispatch challans, and delivery tracking information.</li>
              <li>Maintaining customer warranty records and verification for high-stress commercial installations.</li>
            </ul>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-amber-700 shrink-0 text-base mt-0.5">verified_user</span>
              <span><strong>Strict No-Spam Guarantee:</strong> We never sell, lease, or distribute your contact details to third-party telemarketers or external ad networks.</span>
            </div>
          </div>

          {/* Section 4 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Section 04
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Data Security & Storage
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-3">
              All quotation submissions and inquiry requests transmitted via our website utilize 256-bit SSL encryption. Data received by our operational center is held within secure databases accessible exclusively to authorized sales and dispatch personnel.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We comply with the provisions of the Information Technology Act (2000) of India and applicable electronic data protection standards.
            </p>
          </div>

          {/* Section 5 */}
          <div className="pt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
              Section 05
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2 mb-3">
              Contact Privacy Officer
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
              If you have any questions about your data, wish to update your project details, or request deletion of your record, reach out to our administration desk:
            </p>
            <div className="p-4 sm:p-5 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm space-y-1.5 text-stone-700">
              <p><strong>Entity:</strong> Oviya Ceramics Headquarters</p>
              <p><strong>Address:</strong> Bathalagundu Road, near saravana Mill, opp. Dindigul, Pillayarnattam, Tamil Nadu 624002</p>
              <p><strong>Direct Helpline:</strong> <a href="tel:+919080897776" className="text-primary font-semibold hover:underline">+91 90808 97776</a></p>
              <p><strong>Email:</strong> <a href="mailto:sindiajoseph1986@gmail.com" className="text-primary font-semibold hover:underline">sindiajoseph1986@gmail.com</a></p>
            </div>
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
            to="/terms-of-service"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <span>View Terms of Service</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
