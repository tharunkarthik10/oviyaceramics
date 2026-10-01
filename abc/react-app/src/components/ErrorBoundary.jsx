import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      // Clear potentially corrupted catalogue or cache entries
      const cat = localStorage.getItem('oviya_catalogues_v5');
      if (cat && (cat.length > 2000000 || cat === 'undefined')) {
        localStorage.removeItem('oviya_catalogues_v5');
      }
    } catch (e) {}
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleHardReset = () => {
    try {
      localStorage.removeItem('oviya_catalogues_v5');
      sessionStorage.clear();
    } catch (e) {}
    window.location.href = '/admin';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-900 text-white flex items-center justify-center p-4 sm:p-6 font-sans">
          <div className="max-w-lg w-full bg-stone-800 border border-stone-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Something went wrong</h2>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                An unexpected error occurred while processing your request. You can refresh or recover your workspace below.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-stone-900/90 border border-stone-700/80 rounded-xl p-3 text-left overflow-x-auto text-[11px] font-mono text-red-300 max-h-36">
                <div className="font-bold text-red-400 mb-1">{this.state.error.toString()}</div>
                {this.state.errorInfo?.componentStack && (
                  <pre className="text-stone-400 text-[10px] whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 bg-primary hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer"
              >
                Reload & Retry
              </button>
              <button
                type="button"
                onClick={this.handleHardReset}
                className="flex-1 py-3 px-4 bg-stone-700 hover:bg-stone-600 text-stone-200 font-semibold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer"
              >
                Clear Data & Reset
              </button>
            </div>

            <div className="text-[11px] text-stone-500">
              <a href="/" className="hover:text-stone-300 underline">Return to Homepage</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
