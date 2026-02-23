type ToastType = 'success' | 'error' | 'info';

export const useToast = () => {
  const push = (message: string, type: ToastType = 'info') => {
    if (import.meta.client) {
      alert(`[${type}] ${message}`);
    }
  };

  return { push };
};
