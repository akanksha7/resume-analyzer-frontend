declare namespace JSX {
  interface IntrinsicElements {
    'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'buy-button-id': string;
      'publishable-key': string;
      'success-url': string;
      'cancel-url': string;
    };
  }
} 