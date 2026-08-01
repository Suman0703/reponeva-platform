import { Component } from "react";
import ErrorFallback from "./ErrorFallback";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In a real production setup this is where you'd send the error to a
    // logging service (Sentry, etc.) — logged locally for now.
    console.error("Caught by ErrorBoundary:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          message="This page ran into a problem."
          onRetry={this.handleRetry}
        />
      );
    }
    return this.props.children;
  }
}