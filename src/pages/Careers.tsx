import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, FileText, Send, Mail, ChevronRight } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Careers() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [resumeFile, setResumeFile] = React.useState<{ name: string; dataUrl: string } | null>(null);
  const [uploadError, setUploadError] = React.useState('');
  const [consentChecked, setConsentChecked] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (Max 800KB)
    if (file.size > 800 * 1024) {
      setUploadError('File size exceeds 800KB. Please upload a file smaller than 800KB.');
      return;
    }

    // Validate file extension
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(fileExtension)) {
      setUploadError('Invalid file format. Only PDF, DOC, and DOCX files are allowed.');
      return;
    }

    // Validate file MIME type to verify content type (and not just the extension)
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedMimeTypes.includes(file.type)) {
      setUploadError('Invalid file content type. Please upload a genuine PDF or Word document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Ensure the loaded base64 data URL matches standard prefix schemas for allowed files
        const isValidDataPrefix = reader.result.startsWith('data:application/pdf;base64,') ||
                                 reader.result.startsWith('data:application/msword;base64,') ||
                                 reader.result.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,');
        
        if (!isValidDataPrefix) {
          setUploadError('Corrupted file data detected. Please upload a standard document.');
          return;
        }

        setResumeFile({ name: file.name, dataUrl: reader.result });
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setUploadError('You must consent to the processing of your data under the DPDP Act 2023 to submit your application.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'submissions'), {
        ...formData,
        type: 'career',
        status: 'Pending',
        clientName: formData.name,
        details: `Position: ${formData.position}\nMessage: ${formData.message}` + (resumeFile ? `\nResume Attached: ${resumeFile.name}` : ''),
        resumeFileName: resumeFile?.name || null,
        resumeDataUrl: resumeFile?.dataUrl || null,
        serviceType: 'Job Application',
        billingAmount: 0,
        billingStatus: 'Unpaid',
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setResumeFile(null);
      setUploadError('');
      setConsentChecked(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-6 md:pt-10 pb-24 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Careers | Join Our Team at Expert Standard Solution Hyderabad</title>
        <meta name="description" content="Explore exciting job opportunities at Expert Standard Solution (ESS) in Hyderabad. Submit your resume for housekeeping, valet services, management and facility operations." />
        <meta name="keywords" content="jobs in hyderabad, facility management jobs hyderabad, cleaning jobs hyderabad, valet parking jobs, expert standard solution careers" />
        <link rel="canonical" href="https://expertstandardsolution.com/careers" />
        <meta property="og:title" content="Careers | Join Our Team at Expert Standard Solution Hyderabad" />
        <meta property="og:description" content="Build your career with Hyderabad's leading facility services agency. Competitive salary, professional training, and growth opportunities." />
        <meta property="og:url" content="https://expertstandardsolution.com/careers" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Build Your Career With Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Join Expert Standard Solution and be part of a team dedicated to excellence. 
              We are always looking for passionate, hardworking individuals to join our growing family.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Join Us?</h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 mb-8">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <p>Competitive compensation and performance bonuses</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <p>Comprehensive training programs and skill development</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <p>Clear paths for career advancement and promotion</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <p>A supportive, inclusive, and safe work environment</p>
                </li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Direct Application
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Prefer to email us directly? Send your resume and cover letter to our HR department.
                </p>
                <a href="mailto:careers@expertstandardsolutions.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  careers@expertstandardsolutions.com
                </a>
              </div>

              <div className="mt-4 p-6 bg-[#E8F5E9] dark:bg-emerald-950/20 rounded-xl border border-green-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-green-600 dark:text-emerald-400"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Recruitment Chat
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Prefer a direct chat? Tap below to connect with our HR team on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/917386843005?text=${encodeURIComponent(
                    `Hello ESS Careers! I am interested in exploring job opportunities and joining the Expert Standard Solution team.\n\n[Ref ID: ESS-CAR-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).substring(2, 6).toUpperCase()} | Source: Careers Page]`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0F7469] hover:bg-[#0a544c] text-white hover:text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border-none cursor-pointer outline-none shadow-md hover:shadow-lg no-underline"
                >
                  Apply via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submit Your Application</h2>
              
              {isSuccess ? (
                <div className="p-6 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl mb-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Application Submitted!</h3>
                  <p>Thank you for your interest. Our team will review your application and contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position of Interest *</label>
                      <select
                        id="position"
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none appearance-none"
                      >
                        <option value="" disabled>Select a position</option>
                        <option value="cctv_operator">CCTV Monitoring Operator</option>
                        <option value="access_control">Access Control Specialist</option>
                        <option value="cleaning_staff">Housekeeping / Cleaning Staff</option>
                        <option value="valet_driver">Valet Driver</option>
                        <option value="hospitality_staff">Hospitality & Concierge Staff</option>
                        <option value="supervisor">Site Supervisor</option>
                        <option value="admin">Administrative Role</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Letter / Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none resize-none"
                      placeholder="Tell us briefly why you'd be a great fit..."
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="resume" className="p-5 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group block w-full">
                      <FileText className={`w-8 h-8 ${resumeFile ? 'text-green-500' : 'text-gray-400 group-hover:text-blue-600'} mb-2 transition-colors`} />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {resumeFile ? `Selected: ${resumeFile.name}` : 'Click to upload your Resume (PDF/Word)'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">Max file size: 800KB</p>
                      <input type="file" className="hidden" id="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    </label>
                    {uploadError && <p className="text-xs text-red-500 mt-2 text-center font-medium">{uploadError}</p>}
                  </div>

                  {/* DPDP Act 2023 Compliant Consent Checkbox */}
                  <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <input
                      type="checkbox"
                      id="consentChecked"
                      name="consentChecked"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      required
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="consentChecked" className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer select-none leading-relaxed">
                      I declare that I am an Indian resident and I provide my voluntary and explicit consent to Expert Standard Solution (Data Fiduciary) to process my contact information and resume for recruitment and hiring purposes in accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and the <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline font-medium">Privacy Policy</Link>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Submit Application
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        
        </div>
      </div>
    </div>
  );
}
