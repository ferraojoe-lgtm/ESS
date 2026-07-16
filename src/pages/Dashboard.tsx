import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Mail, Phone, Calendar, Clock, Filter, ShieldAlert, FileText, FileSpreadsheet, Download, Trash2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ServiceRequest {
  id: string;
  clientName: string;
  name?: string;
  email: string;
  phone: string;
  serviceType: string;
  service?: string;
  position?: string;
  details: string;
  message?: string;
  type?: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
  billingAmount: number;
  billingStatus: 'Unpaid' | 'Paid';
  createdAt: string;
  resumeFileName?: string;
  resumeDataUrl?: string;
}

import AdminAuth from '../components/AdminAuth';

function DashboardContent() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'quote' | 'career' | 'contact'>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 6000);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      const data = querySnapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          clientName: d.clientName || d.name || 'Anonymous User',
          email: d.email || 'N/A',
          phone: d.phone || 'N/A',
          serviceType: d.serviceType || d.service || d.position || (d.type ? d.type.toUpperCase() : 'General Inquiry'),
          details: d.details || d.message || 'No additional details provided.',
          status: d.status || 'Pending',
          type: d.type || 'contact',
          billingAmount: d.billingAmount || 0,
          billingStatus: d.billingStatus || 'Unpaid',
          createdAt: d.createdAt || new Date().toISOString(),
          resumeFileName: d.resumeFileName,
          resumeDataUrl: d.resumeDataUrl,
          ...d
        } as ServiceRequest;
      });
      data.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setRequests(data);
    } catch (err) {
      console.error(err);
      setError('Could not load service requests. Please check permissions.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'submissions', id), { status: newStatus });
      setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus as any } : r));
    } catch (err) {
      console.error(err);
      showToast('Could not update status', 'error');
    }
  };

  const deleteRequest = async (request: ServiceRequest) => {
    try {
      // 1. Delete from Firestore
      await deleteDoc(doc(db, 'submissions', request.id));

      // 2. Send report email via backend
      try {
        await fetch('/api/requests/delete-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request)
        });
      } catch (mailErr) {
        console.error('Failed to dispatch deletion email report:', mailErr);
      }

      // 3. Remove from local state
      setRequests(requests.filter(r => r.id !== request.id));
      setConfirmDeleteId(null);
      showToast('Request deleted successfully, and the report has been sent to expertstandardsolutionfoa@gmail.com.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Could not delete the request. Please check permissions.', 'error');
    }
  };

  const exportToExcel = () => {
    if (filteredRequests.length === 0) {
      showToast("No records available to generate report.", "error");
      return;
    }

    const headers = ["Submission ID", "Date", "Request Type", "User Name", "Email Details", "Phone", "Service / Position", "User Query / Details", "Current Status", "CV / Resume Attached"];
    
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      return `"${String(val).replace(/"/g, '""')}"`;
    };

    const rows = filteredRequests.map(r => [
      r.id,
      r.createdAt ? new Date(r.createdAt).toLocaleString() : 'N/A',
      r.type ? r.type.toUpperCase() : 'GENERAL',
      r.clientName || r.name || 'Anonymous',
      r.email || '',
      r.phone || '',
      r.serviceType || '',
      r.details || '',
      r.status,
      r.resumeFileName || 'No'
    ].map(escapeCsv).join(','));

    // UTF-8 BOM so Excel opens properly formatted columns
    const csvContent = "\uFEFF" + [headers.map(escapeCsv).join(','), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ESS_Website_Queries_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusColors = {
    'Pending': 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50',
    'In Progress': 'bg-sky-100 text-sky-800 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/50',
    'Completed': 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50',
    'Canceled': 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/50',
  };

  const filteredRequests = requests.filter(r => {
    if (activeTab === 'all') return true;
    if (activeTab === 'quote') return r.type === 'quote';
    if (activeTab === 'career') return r.type === 'career';
    if (activeTab === 'contact') return (!r.type || r.type === 'contact' || (r.type !== 'quote' && r.type !== 'career'));
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Dashboard | ESS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">View all user queries, CVs, quote requests, and customer details.</p>
          </div>
          <button
            onClick={exportToExcel}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 rounded-xl transition cursor-pointer shadow-md shadow-emerald-600/10 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto justify-center"
            id="export-excel-btn"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span>Export Excel Report ({filteredRequests.length})</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-2",
              activeTab === 'all' 
                ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            )}
          >
            All Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-2",
              activeTab === 'quote' 
                ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            )}
          >
            Quote Requests ({requests.filter(r => r.type === 'quote').length})
          </button>
          <button
            onClick={() => setActiveTab('career')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-2",
              activeTab === 'career' 
                ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            )}
          >
            CVs & Career Applications ({requests.filter(r => r.type === 'career').length})
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-2",
              activeTab === 'contact' 
                ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            )}
          >
            Contact Queries ({requests.filter(r => (!r.type || r.type === 'contact' || (r.type !== 'quote' && r.type !== 'career'))).length})
          </button>
        </div>

        {loading ? (
          <div className="grid gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-100/50 dark:shadow-none"
              >
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  <div className="flex-1">
                    {/* Header Badges Skeleton */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                      <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                      <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                      <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md lg:ml-auto"></div>
                    </div>

                    {/* Main Client / Request Info Skeleton */}
                    <div className="h-6 w-56 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                    <div className="h-4.5 w-72 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
                    
                    {/* Detail fields */}
                    <div className="space-y-2 mt-4">
                      <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/60 rounded"></div>
                      <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800/60 rounded"></div>
                    </div>
                  </div>

                  {/* Right side controls skeleton */}
                  <div className="flex flex-col justify-between items-stretch lg:items-end gap-4 min-w-[180px] lg:border-l lg:border-slate-100 lg:dark:border-slate-800 lg:pl-6">
                    <div className="h-10 w-full lg:w-36 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded lg:mt-auto self-start lg:self-end"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <p className="text-rose-700 dark:text-rose-400 font-medium">{error}</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Requests Found</h2>
            <p className="text-slate-500">There are currently no service requests matching this filter.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRequests.map((request, idx) => (
              <motion.div 
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md shadow-slate-100 dark:shadow-none border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  
                  {/* Left Column: Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md">
                        ID: {request.id}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 rounded-md">
                        {request.type ? request.type.toUpperCase() : 'GENERAL'}
                      </span>
                      <span className={cn("text-sm font-semibold px-3 py-1 rounded-full", statusColors[request.status])}>
                        {request.status}
                      </span>
                      <span className="text-sm text-slate-500 flex items-center gap-1.5 ml-auto">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{request.clientName}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-sky-500" />
                        <a href={`mailto:${request.email}`} className="hover:text-sky-600 dark:hover:text-sky-400 transition">{request.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-amber-500" />
                        <a href={`tel:${request.phone}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition">{request.phone}</a>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 pb-5">
                      <h3 className="font-bold text-sm uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-2">
                        {request.serviceType}
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
                        {request.details || "No additional details provided."}
                      </p>
                      {request.resumeDataUrl && request.resumeFileName && (
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <a
                            href={request.resumeDataUrl}
                            download={request.resumeFileName}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-xl transition shadow-sm border border-amber-200 dark:border-amber-800/60"
                          >
                            <FileText className="w-4 h-4" />
                            Download CV / Resume ({request.resumeFileName})
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="lg:w-72 flex flex-col gap-4">
                    <div className="flex-grow border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-center bg-slate-50/60 dark:bg-slate-800/20">
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Update Status</span>
                      <select 
                        value={request.status}
                        onChange={(e) => updateStatus(request.id, e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-amber-500 outline-none transition cursor-pointer shadow-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </div>

                    {request.status === 'Completed' && (
                      confirmDeleteId === request.id ? (
                        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 p-4 rounded-xl flex flex-col gap-3">
                          <p className="text-xs font-semibold text-rose-800 dark:text-rose-300">
                            Confirm Deletion? This will also email a detailed report to expertstandardsolutionfoa@gmail.com.
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => deleteRequest(request)}
                              className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                            >
                              Yes, Delete
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(request.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-200 dark:border-rose-800/80 font-bold text-sm shadow-sm transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" /> Delete Request
                        </button>
                      )
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Floating custom toast messages to replace browser alert blocks */}
      {toast && (
        <div className={cn(
          "fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border text-sm font-semibold max-w-sm transition-all animate-bounce",
          toast.type === 'success' 
            ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" 
            : "bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800"
        )}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
          <p className="flex-grow">{toast.message}</p>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}

export default function Dashboard() {
  return (
    <AdminAuth>
      <DashboardContent />
    </AdminAuth>
  );
}
