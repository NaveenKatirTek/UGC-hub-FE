import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PaymentMethods = ({ paymentMethods, onAddPayment, onRemovePayment, onSetDefault }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    type: 'card',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    upiId: '',
    bankAccount: '',
    ifsc: ''
  });

  const paymentTypeOptions = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'netbanking', label: 'Net Banking' }
  ];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date()?.getFullYear() + i;
    return { value: String(year), label: String(year) };
  });

  const handleInputChange = (field, value) => {
    setNewPayment(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPayment = () => {
    if (onAddPayment) {
      onAddPayment(newPayment);
      setNewPayment({
        type: 'card',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        holderName: '',
        upiId: '',
        bankAccount: '',
        ifsc: ''
      });
      setShowAddForm(false);
    }
  };

  const getPaymentIcon = (type) => {
    switch (type) {
      case 'card': return 'CreditCard';
      case 'upi': return 'Smartphone';
      case 'netbanking': return 'Building2';
      default: return 'Wallet';
    }
  };

  const maskCardNumber = (number) => {
    return `**** **** **** ${number?.slice(-4)}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Payment Methods</h2>
        <Button
          variant="outline"
          onClick={() => setShowAddForm(!showAddForm)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Payment Method
        </Button>
      </div>
      {showAddForm && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Add New Payment Method</h3>
          
          <div className="space-y-4">
            <Select
              label="Payment Type"
              options={paymentTypeOptions}
              value={newPayment?.type}
              onChange={(value) => handleInputChange('type', value)}
            />

            {newPayment?.type === 'card' && (
              <>
                <Input
                  label="Card Holder Name"
                  type="text"
                  placeholder="Enter full name as on card"
                  value={newPayment?.holderName}
                  onChange={(e) => handleInputChange('holderName', e?.target?.value)}
                />
                <Input
                  label="Card Number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={newPayment?.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
                  maxLength={19}
                />
                <div className="grid grid-cols-3 gap-4">
                  <Select
                    label="Expiry Month"
                    options={monthOptions}
                    value={newPayment?.expiryMonth}
                    onChange={(value) => handleInputChange('expiryMonth', value)}
                    placeholder="MM"
                  />
                  <Select
                    label="Expiry Year"
                    options={yearOptions}
                    value={newPayment?.expiryYear}
                    onChange={(value) => handleInputChange('expiryYear', value)}
                    placeholder="YYYY"
                  />
                  <Input
                    label="CVV"
                    type="password"
                    placeholder="123"
                    value={newPayment?.cvv}
                    onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                    maxLength={4}
                  />
                </div>
              </>
            )}

            {newPayment?.type === 'upi' && (
              <Input
                label="UPI ID"
                type="text"
                placeholder="yourname@paytm"
                value={newPayment?.upiId}
                onChange={(e) => handleInputChange('upiId', e?.target?.value)}
              />
            )}

            {newPayment?.type === 'netbanking' && (
              <>
                <Input
                  label="Account Number"
                  type="text"
                  placeholder="Enter account number"
                  value={newPayment?.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e?.target?.value)}
                />
                <Input
                  label="IFSC Code"
                  type="text"
                  placeholder="SBIN0001234"
                  value={newPayment?.ifsc}
                  onChange={(e) => handleInputChange('ifsc', e?.target?.value)}
                />
              </>
            )}

            <div className="flex gap-3 pt-2">
              <Button variant="default" onClick={handleAddPayment}>
                Add Payment Method
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {paymentMethods?.map((method) => (
          <div key={method?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Icon name={getPaymentIcon(method?.type)} size={20} className="text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-foreground">
                    {method?.type === 'card' && maskCardNumber(method?.cardNumber)}
                    {method?.type === 'upi' && method?.upiId}
                    {method?.type === 'netbanking' && `****${method?.bankAccount?.slice(-4)}`}
                  </p>
                  {method?.isDefault && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {method?.type === 'card' && `${method?.brand} • Expires ${method?.expiryMonth}/${method?.expiryYear}`}
                  {method?.type === 'upi' && 'UPI Payment'}
                  {method?.type === 'netbanking' && `${method?.bankName} • Net Banking`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!method?.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetDefault(method?.id)}
                >
                  Set Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemovePayment(method?.id)}
                className="text-error hover:text-error"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        ))}

        {paymentMethods?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No payment methods added yet</p>
            <p className="text-sm text-muted-foreground">Add a payment method to manage your subscriptions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;