import { motion } from 'motion/react';
import { FileText, Scale, CheckCircle2, AlertTriangle, Briefcase } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-6 md:pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms & Conditions | Expert Standard Solution</title>
        <meta name="description" content="Read the terms and conditions of service for Expert Standard Solution (ESS). Guidelines for our facility management, housekeeping, and valet operations." />
        <link rel="canonical" href="https://expertstandardsolution.com/terms" />
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
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Terms & Conditions</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Effective Date: June 2026</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Welcome to Expert Standard Solution (ESS). These Terms & Conditions govern the provision of all commercial services, including Valet Parking Management, Corporate Housekeeping, and Deep Cleaning. By engaging our services or utilizing our web platform, you agree to abide by these terms.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <Briefcase className="w-5 h-5 text-blue-500" /> 1. Service Scope & SLAs
              </h2>
              <p>
                All services are executed in strict accordance with the specific Service Level Agreements (SLAs) mutually agreed upon and documented in individual client service proposals. ESS reserves the right to deploy trained, verified supervisory and operational staff to fulfill contractual obligations. Standard operational shifts and turnaround times will follow agreed commercial guidelines.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> 2. Client Responsibilities
              </h2>
              <p>To ensure seamless delivery of facility management services, clients agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide safe, unrestricted access to required areas of the facility during contracted operational hours.</li>
                <li>Designate authorized points of contact for daily operational coordination and SLA approvals.</li>
                <li>Ensure timely settlement of monthly invoices within the stipulated credit window (typically 15 to 30 days from invoice generation).</li>
                <li>Report any service discrepancies or grievances through official escalation channels within 24 hours of occurrence.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <FileText className="w-5 h-5 text-blue-500" /> 3. Statutory Compliance & Labor Laws
              </h2>
              <p>
                Expert Standard Solution operates with 100% statutory compliance under applicable Indian state and central labor laws. All deployed personnel are directly managed by ESS, complete with Provident Fund (PF), Employee State Insurance (ESI), and minimum wage compliance. Clients are indemnified against any direct statutory labor liabilities pertaining to ESS personnel.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> 4. Liability & Insurance
              </h2>
              <p>
                While ESS maintains comprehensive commercial general liability and fidelity insurance for its operations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>For <strong>Valet Parking</strong>: ESS conducts prior vehicle condition assessments. Claims for pre-existing mechanical failure, unverified scratches, or valuables left unattended inside vehicles will not be entertained.</li>
                <li>For <strong>Housekeeping</strong>: Any claim of property damage or loss must be substantiated by official incident reports and verification conducted jointly within 24 hours.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <Scale className="w-5 h-5 text-blue-500" /> 5. Termination & Dispute Resolution
              </h2>
              <p>
                Either party may terminate a commercial agreement by providing standard written notice (typically 30 days) as outlined in the service agreement. In the event of any commercial dispute, both parties agree to attempt amicable resolution prior to seeking legal remedies under the jurisdiction of courts in Hyderabad, Telangana.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <FileText className="w-5 h-5 text-blue-500" /> 6. Privacy & Personal Data (DPDP Act, 2023)
              </h2>
              <p>
                In compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India, ESS is committed to secure, lawful processing of your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By submitting inquiries, forms, or job applications, you (as the <strong>Data Principal</strong>) grant ESS (as the <strong>Data Fiduciary</strong>) explicit consent to process your specified personal data for the purposes defined in our Privacy Policy.</li>
                <li>Data Principals are responsible for providing complete, accurate, and updated personal data when engaging with ESS.</li>
                <li>You may withdraw consent or request erasure of your data at any time by raising a formal request with our designated Data Protection & Grievance Officer.</li>
              </ul>
            </section>

            <section className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Questions Regarding Terms</h3>
              <p className="text-sm">
                For contract clarifications, formal SLAs, or partnership inquiries, please contact our administrative office:
              </p>
              <div className="mt-2 text-sm">
                <p><strong>Email:</strong> <a href="mailto:info@expertstandardsolution.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@expertstandardsolution.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+917386843005" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+91 73868 43005</a></p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
