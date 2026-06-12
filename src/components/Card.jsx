export default function Card({ className = '', children, title, actions = null, titleDot = null }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-hd">
          <div className="card-title">
            {titleDot && <span className={`card-title-dot ${titleDot}`} />}
            {title}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
