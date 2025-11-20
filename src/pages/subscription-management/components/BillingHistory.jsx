import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BillingHistory = ({ billingHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'last90', label: 'Last 3 Months' },
    { value: 'last365', label: 'Last Year' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      case 'refunded': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      case 'refunded': return 'RotateCcw';
      default: return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return `₹${amount?.toLocaleString('en-IN')}`;
  };

  const filteredHistory = billingHistory?.filter(item => {
    const matchesSearch = item?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.invoiceNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item?.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const itemDate = new Date(item.date);
      const now = new Date();
      const daysAgo = {
        last30: 30,
        last90: 90,
        last365: 365
      }?.[dateFilter];
      
      if (daysAgo) {
        const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
        matchesDate = itemDate >= cutoffDate;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleDownloadInvoice = (invoiceId) => {
    // Mock download functionality
    console.log(`Downloading invoice: ${invoiceId}`);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Billing History</h2>
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
        >
          Export All
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Filter by status"
        />
        <Select
          options={dateOptions}
          value={dateFilter}
          onChange={setDateFilter}
          placeholder="Filter by date"
        />
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoice</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory?.map((item) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-mono text-sm text-foreground">{item?.invoiceNumber}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-foreground">{formatDate(item?.date)}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-foreground">{item?.description}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-foreground">{formatAmount(item?.amount)}</span>
                </td>
                <td className="py-4 px-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                    <Icon name={getStatusIcon(item?.status)} size={12} className="mr-1" />
                    <span className="capitalize">{item?.status}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadInvoice(item?.id)}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredHistory?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-mono text-sm text-foreground mb-1">{item?.invoiceNumber}</p>
                <p className="text-sm text-muted-foreground">{formatDate(item?.date)}</p>
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                <Icon name={getStatusIcon(item?.status)} size={12} className="mr-1" />
                <span className="capitalize">{item?.status}</span>
              </div>
            </div>
            
            <p className="text-foreground mb-2">{item?.description}</p>
            <p className="font-medium text-foreground mb-3">{formatAmount(item?.amount)}</p>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadInvoice(item?.id)}
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Download Invoice
            </Button>
          </div>
        ))}
      </div>
      {filteredHistory?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No billing history found</p>
          <p className="text-sm text-muted-foreground">Your transaction history will appear here</p>
        </div>
      )}
    </div>
  );
};

export default BillingHistory;