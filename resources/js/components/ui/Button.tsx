import React, { forwardRef, type ReactNode } from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {
  type?: 'button' | 'submit' | 'reset'; disabled?: boolean;
  href?: string; target?: string; rel?: string;
  variant?: 'flat' | 'outline' | 'text' | 'link';
  color?: 'primary' | 'neutral'; size?: 'sm' | 'md' | 'lg';
  startIcon?: ReactNode; endIcon?: ReactNode; pending?: boolean;
};

// Local adapter for BeatPass Button roles; native anchors retain browser navigation.
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function Button({
  href, target, rel, variant = 'text', color = 'neutral', size = 'md', startIcon, endIcon,
  pending = false, disabled = false, className = '', children, onClick, type = 'button', ...props
}, ref) {
  const classes = `bp-button bp-button--${variant} bp-button--${color} bp-button--${size} ${className}`;
  const content = <>{startIcon && <span className="bp-button-icon">{startIcon}</span>}<span>{children}</span>{endIcon && <span className="bp-button-icon">{endIcon}</span>}</>;
  if (href) return <a {...props} href={href} target={target} rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
    ref={ref as React.Ref<HTMLAnchorElement>} className={classes} aria-disabled={disabled || pending || undefined}
    aria-busy={pending || undefined} tabIndex={disabled || pending ? -1 : props.tabIndex}
    aria-label={props['aria-label']} aria-describedby={props['aria-describedby']} onClick={event => {
      if (disabled || pending) { event.preventDefault(); return; }
      onClick?.(event);
    }}>{content}</a>;
  return <button {...props} type={type} ref={ref as React.Ref<HTMLButtonElement>} className={classes}
    disabled={disabled || pending} aria-busy={pending || undefined} onClick={onClick}>{content}</button>;
});

export const IconButton = forwardRef<HTMLButtonElement, Omit<Props, 'href'>>(function IconButton({ className = '', ...props }, ref) {
  return <Button {...props} ref={ref} className={`bp-icon-button ${className}`} />;
});
