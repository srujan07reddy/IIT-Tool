import * as React from 'react';

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}

export function Dialog({ open, title, description, children, onClose, footer }: DialogProps) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={panelStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h3 style={{ margin: 0, color: '#f8fafc' }}>{title}</h3>
            {description ? <p style={{ color: '#cbd5e1' }}>{description}</p> : null}
          </div>
          <button onClick={onClose} style={closeButtonStyle}>
            Close
          </button>
        </div>
        <div>{children}</div>
        {footer ? <div style={{ marginTop: 20 }}>{footer}</div> : null}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(2, 6, 23, 0.72)',
  display: 'grid',
  placeItems: 'center',
  padding: 24,
  zIndex: 1000,
};

const panelStyle: React.CSSProperties = {
  width: 'min(560px, 100%)',
  borderRadius: 24,
  background: '#0f172a',
  border: '1px solid rgba(148, 163, 184, 0.22)',
  padding: 24,
};

const closeButtonStyle: React.CSSProperties = {
  borderRadius: 10,
  border: '1px solid rgba(148, 163, 184, 0.24)',
  background: 'transparent',
  color: '#e2e8f0',
  padding: '0.55rem 0.75rem',
  cursor: 'pointer',
};
