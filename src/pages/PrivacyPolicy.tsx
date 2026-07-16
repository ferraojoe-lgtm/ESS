import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-6 md:pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy | Expert Standard Solution</title>
        <meta name="description" content="Learn about how Expert Standard Solution (ESS) protects your personal, corporate, and facility data. Our comprehensive privacy guidelines." />
        <link rel="canonical" href="https://expertstandardsolution.com/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-2xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: June 2026</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              At Expert Standard Solution (ESS), safeguarding your privacy and ensuring the security of your personal information is our highest priority. In alignment with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India, this policy explains how we, as a <strong>Data Fiduciary</strong>, process the personal data of our users, clients, and applicants, who are recognized as <strong>Data Principals</strong>.
            </p>

            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 rounded-2xl">
              <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> DPDP Act Notice Availability
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Pursuant to Section 5 of the DPDP Act, this notice is available in English and scheduled Indian languages. If you require this notice in <strong>Telugu (తెలుగు)</strong>, <strong>Hindi (हिन्दी)</strong>, or any other scheduled Indian language, please contact our Grievance Officer.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <Eye className="w-5 h-5 text-blue-500" /> 1. Personal Data We Process
              </h2>
              <p>We process only the specific, necessary personal data for which you have provided clear, affirmative consent:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Identifiers:</strong> Name, business email, telephone/mobile number, and site address provided when requesting a service quote or consultation.</li>
                <li><strong>Employment & Career Data:</strong> Name, resume, employment history, qualifications, and messages uploaded through our Careers portal for recruitment and hiring.</li>
                <li><strong>Operations & Security Data:</strong> Vehicle license plates, visitor timestamps, and parking logs collected solely during our VIP valet and facility security operations.</li>
                <li><strong>Technical Telemetry:</strong> Basic anonymized network data, IP address hashes, and device telemetry to ensure website security and functionality.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <FileText className="w-5 h-5 text-blue-500" /> 2. Specified Purposes of Processing
              </h2>
              <p>Under Section 6 of the DPDP Act, personal data will only be processed for specific, lawful purposes. We utilize your data for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing customized commercial service quotations, facility assessments, and communicating service schedules.</li>
                <li>Reviewing job applications, checking qualifications, and conducting standard screening for careers.</li>
                <li>Fulfilling contracted services including corporate housekeeping, deep cleaning, and security valet desk operations.</li>
                <li>Ensuring the physical safety of your premises and vehicles, and complying with statutory audit and regulatory requirements.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <Shield className="w-5 h-5 text-blue-500" /> 3. Your Rights as a Data Principal
              </h2>
              <p>Under Chapter III of the DPDP Act, 2023, you enjoy comprehensive, legally binding rights over your personal data:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-950 dark:text-white text-sm mb-1">Right to Access & Information</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Request a summary of your personal data being processed, processing activities, and identities of third parties with whom data is shared.</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-950 dark:text-white text-sm mb-1">Right to Correction & Erasure</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Request the correction of inaccurate details, completion of incomplete data, or erasure of data once the processing purpose is fulfilled.</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-950 dark:text-white text-sm mb-1">Right to Withdraw Consent</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">You may withdraw your consent for any further processing at any time. We will immediately cease processing upon receiving your request.</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-950 dark:text-white text-sm mb-1">Right to Nominate</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Nominate an individual to exercise your rights as a Data Principal in the event of death or physical/mental incapacity.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <Lock className="w-5 h-5 text-blue-500" /> 4. Data Retention & Erasure
              </h2>
              <p>
                We do not retain personal data longer than necessary to fulfill the specified purpose for which it was collected, or as mandated under statutory business records compliance laws. If a contract is terminated, or if you request erasure, your personal data is safely and securely purged or anonymized from our local systems and firestore cloud databases within 30 business days.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> 5. Data Security & Breaches
              </h2>
              <p>
                We employ robust physical and electronic security protocols to safeguard data. In compliance with the DPDP Act 2023, ESS maintains an active Incident Response Framework. In the highly unlikely event of a personal data breach, we are committed to notifying the <strong>Data Protection Board of India (DPBI)</strong> and the affected Data Principals in the prescribed manner and timeline.
              </p>
            </section>

            <section className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Grievance Redressal Officer
              </h3>
              <p className="text-sm">
                Under Section 10 of the DPDP Act, 2023, you have the right to seek redressal of any grievances. For requests regarding access, correction, erasure, or consent withdrawal, please write to our designated <strong>Grievance Officer</strong>:
              </p>
              <div className="mt-4 text-sm space-y-2">
                <p><strong>Designation:</strong> Data Protection & Grievance Redressal Officer</p>
                <p><strong>Email:</strong> <a href="mailto:grievance@expertstandardsolution.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-blue-600 dark:text-blue-400">grievance@expertstandardsolution.com</a> / <a href="mailto:info@expertstandardsolution.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@expertstandardsolution.com</a></p>
                <p><strong>Contact Desk:</strong> <a href="tel:+917386843005" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+91 73868 43005</a></p>
                <p><strong>Postal Address:</strong> Expert Standard Solution Office, Hyderabad, Telangana, India</p>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                If your grievance is not resolved by our Grievance Officer within the prescribed statutory timelines, you may escalate your complaint to the <strong>Data Protection Board of India (DPBI)</strong>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
