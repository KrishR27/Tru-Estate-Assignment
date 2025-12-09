export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '+91 $1 $2 $3');
};
