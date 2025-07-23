import { toast, ToastOptions } from 'react-hot-toast';

interface NotificationOptions extends ToastOptions {
  type?: 'success' | 'error' | 'loading' | 'info';
}

export const useNotification = () => {
  const notify = (message: string, options?: NotificationOptions) => {
    const { type = 'info', ...toastOptions } = options || {};

    switch (type) {
      case 'success':
        return toast.success(message, toastOptions);
      case 'error':
        return toast.error(message, toastOptions);
      case 'loading':
        return toast.loading(message, toastOptions);
      default:
        return toast(message, toastOptions);
    }
  };

  const notifyPromise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  };

  return {
    notify,
    notifyPromise,
    dismiss: toast.dismiss,
  };
};