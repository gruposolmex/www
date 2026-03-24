/**
 * SVG wordmarks served from /public/brand (copied from www/brand-system/logo).
 */

export type SolmexLogoVariant = 'horizontal' | 'mark' | 'wordmark';

export type SolmexLogoProps = {
  /** horizontal: GRUPO + marca + SOLMEX; mark: ícono; wordmark: texto + tagline */
  variant: SolmexLogoVariant;
  className?: string;
  alt?: string;
};

const SRC: Record<SolmexLogoVariant, string> = {
  horizontal: '/brand/logo-solmex-full.svg',
  mark: '/brand/logo-solmex-square.svg',
  wordmark: '/brand/logo-solmex-text.svg',
};

/**
 * Renders the official Solmex logo for dark backgrounds.
 */
export function SolmexLogo({
  variant,
  className = '',
  alt = 'Solmex',
}: SolmexLogoProps) {
  const sizeClass =
    variant === 'horizontal'
      ? 'h-7 w-auto max-w-[min(58vw,220px)] sm:max-w-[260px] sm:h-8'
      : variant === 'mark'
        ? 'h-9 w-9 sm:h-10 sm:w-10 shrink-0'
        : 'h-9 w-auto max-w-[200px] sm:h-11 sm:max-w-[240px]';

  return (
    <img
      src={SRC[variant]}
      alt={alt}
      width={variant === 'mark' ? 40 : undefined}
      height={variant === 'mark' ? 40 : undefined}
      className={`block object-contain object-left ${sizeClass} ${className}`.trim()}
      decoding="async"
    />
  );
}
