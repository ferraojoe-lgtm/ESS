import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, MapPin, Search, Calendar, ChevronDown, CheckCircle2, Clock, XCircle, Settings, Mail, Phone, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import type { ServiceRequest } from '../types';
import { Helmet } from 'react-helmet-async';

export default function Admin() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      setRequests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // Setting up simple polling for real-time vibe
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (id: string, updates: Partial<ServiceRequest>) => {
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setRequests(prev => prev.map(r => r.id === id ? updated : r));
        if (selectedReq?.id === id) setSelectedReq(updated);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to update request');
    }
  };

  const statusColors = {
    'Pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    'Completed': 'bg-green-50 text-green-700 border-green-200',
    'Canceled': 'bg-red-50 text-red-700 border-red-200',
  };

  const statusIcons = {
    'Pending': Clock,
    'In Progress': RefreshCw,
    'Completed': CheckCircle2,
    'Canceled': XCircle,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Admin Dashboard | Expert Standard Solution</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage service quotes and requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchRequests} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition shadow-sm"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border md:rounded-b-2xl border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
            <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
              <div className="font-semibold text-gray-900">Recent Service Requests</div>
              <div className="text-sm text-gray-500">{requests.length} total</div>
            </div>
            
            <div className="overflow-y-auto flex-1 p-0">
              {loading && requests.length === 0 ? (
                <div className="divide-y divide-gray-100 animate-pulse bg-white dark:bg-gray-900">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 border-l-4 border-transparent flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-5 w-14 bg-gray-200 dark:bg-gray-800 rounded"></div>
                          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
                        </div>
                        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
                        <div className="flex items-center gap-4">
                          <div className="h-3.5 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                          <div className="h-3.5 w-36 bg-gray-200 dark:bg-gray-800 rounded"></div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : requests.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
                  <div className="p-3 bg-gray-50 rounded-full"><Search className="w-6 h-6 text-gray-400" /></div>
                  <p>No requests found.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {requests.map(req => {
                    const StatusIcon = statusIcons[req.status];
                    return (
                      <li 
                        key={req.id}
                        onClick={() => setSelectedReq(req)}
                        className={cn(
                          "p-4 cursor-pointer hover:bg-blue-50/50 transition-colors border-l-4",
                          selectedReq?.id === req.id ? "bg-blue-50 border-blue-600" : "border-transparent bg-white"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{req.id}</span>
                              <h3 className="text-sm font-semibold text-gray-900 truncate">{req.clientName}</h3>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{req.serviceType}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {format(new Date(req.createdAt), "MMM d, h:mm a")}</span>
                              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {req.email}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                             <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border", statusColors[req.status])}>
                                <StatusIcon className="w-3.5 h-3.5" />
                                {req.status}
                             </span>
                             {/* Billing info removed */}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
           {selectedReq ? (
             <div className="bg-white border rounded-2xl border-gray-200 shadow-sm sticky top-24 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Request Details</h3>
                  <span className="text-xs font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded">{selectedReq.id}</span>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Client Information</div>
                      <div className="text-sm text-gray-900 font-medium">{selectedReq.clientName}</div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600"><Mail className="w-4 h-4 text-gray-400" /> <a href={`mailto:${selectedReq.email}`} className="text-blue-600 hover:underline">{selectedReq.email}</a></div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600"><Phone className="w-4 h-4 text-gray-400" /> <a href={`tel:${selectedReq.phone}`} className="text-blue-600 hover:underline">{selectedReq.phone}</a></div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Service Details</div>
                      <div className="text-sm font-medium text-gray-900 mb-2">{selectedReq.serviceType}</div>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 whitespace-pre-wrap">{selectedReq.details}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Management Action</div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Status (Updates email client)</label>
                          <select 
                            value={selectedReq.status}
                            onChange={(e) => handleUpdate(selectedReq.id, { status: e.target.value as ServiceRequest['status'] })}
                            className="w-full text-sm block px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </div>
                        
                         {/* Billing controls removed */}
                      </div>
                    </div>
                  </div>
                </div>
             </div>
           ) : (
             <div className="bg-gray-50 border border-gray-200 border-dashed rounded-2xl h-[400px] flex flex-col justify-center items-center text-gray-500 p-6 text-center">
               <Settings className="w-10 h-10 mb-3 text-gray-400" />
               <h3 className="font-medium text-gray-900 mb-1">No Request Selected</h3>
               <p className="text-sm">Select a service request from the list to view details and update status.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
