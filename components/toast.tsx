export function ShowToast(message:string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    const toastContainer = document.getElementById('toast');

    if (!toastContainer) return;

    if (!document.querySelector('style[data-toast-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-toast-styles', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const toast = document.createElement('div');
    toast.className = `alert ${type === 'success' ? 'alert-success' : type === 'error' ? 'alert-error' : 'alert-info'} shadow-2xl w-full sm:w-96 text-base sm:text-lg font-semibold`;
    toast.innerText = message;
    
    toast.style.animation = 'slideIn 0.3s ease-out';
    
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, duration);
}