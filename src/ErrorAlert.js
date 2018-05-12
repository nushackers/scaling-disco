import React, { PureComponent } from 'react';

/**
 * ErrorAlert renders a dismissable error alert
 */
class ErrorAlert extends PureComponent {
  render() {
    const { error, onDismiss } = this.props;
    if (!error) return null;
    return (
      <div className="alert alert-danger alert-dismissible" role="alert">
        <b>Oops!</b>
        {error}
        <button className="close" aria-label="Close" onClick={onDismiss}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default ErrorAlert;
