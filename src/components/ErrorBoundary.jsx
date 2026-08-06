import { Component } from 'react';

/**
 * Global Error Boundary — catches unhandled React rendering errors and
 * displays a user-friendly fallback instead of a blank white screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050d1a',
            color: '#f5f0e8',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#c9a96e' }}>
            Something went wrong
          </h1>
          <p style={{ maxWidth: '480px', lineHeight: '1.6', opacity: 0.7 }}>
            We encountered an unexpected error. Please refresh the page or contact us
            if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              background: '#c9a96e',
              color: '#050d1a',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.08em',
            }}
          >
            REFRESH PAGE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
