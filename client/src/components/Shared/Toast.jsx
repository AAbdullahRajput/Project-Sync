// react-hot-toast is used directly via toast() calls throughout the app.
// This file exports custom toast style options to keep them consistent.

export const toastOptions = {
  style: {
    background: '#1a1d2e',
    color: '#e2e8f0',
    border: '1px solid #2d3148',
    borderRadius: '10px',
    fontSize: '14px',
  },
  success: { iconTheme: { primary: '#22c55e', secondary: '#1a1d2e' } },
  error: { iconTheme: { primary: '#ef4444', secondary: '#1a1d2e' } },
}