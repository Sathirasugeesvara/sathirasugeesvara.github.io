import { useState } from 'react'

export default function ImageLoader({
  src,
  alt,
  className,
  containerClassName = '',
  loading = 'lazy',
  fetchPriority,
  sources = [],
}) {
  const [status, setStatus] = useState('loading')

  return (
    <div className={`relative isolate overflow-hidden ${containerClassName}`}>
      <picture className="absolute inset-0">
        {sources.map((source) => (
          <source key={source.media} srcSet={source.srcSet} media={source.media} />
        ))}
        <img
          src={src}
          alt={alt}
          className={className}
          loading={loading}
          decoding="async"
          fetchpriority={fetchPriority}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      </picture>
      {status !== 'loaded' && (
        <div
          className="absolute inset-0 z-10 grid place-items-center bg-base-raised/90"
          role="status"
          aria-label={status === 'error' ? 'Image could not be loaded' : 'Loading image'}
        >
          {status === 'error' ? (
            <span className="px-3 text-center text-xs text-ink-muted">
              Image unavailable
            </span>
          ) : (
            <span className="image-loader" aria-hidden="true" />
          )}
        </div>
      )}
    </div>
  )
}
