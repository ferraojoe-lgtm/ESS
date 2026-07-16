export interface ServiceRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  details: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
  billingAmount: number;
  billingStatus: 'Unpaid' | 'Paid';
  createdAt: string;
}
