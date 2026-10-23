import { useEffect, useState } from 'react'

const MINIMUM_LOADING_TIME = 450
const EXIT_ANIMATION_TIME = 250

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const startedAt = Date.now()
    const previousOverflow = document.documentElement.style.overflow
    let finishTimer
    let removeTimer
    let isScrollLocked = true

    document.documentElement.style.overflow = 'hidden'

    const restoreScroll = () => {
      if (!isScrollLocked) return

      document.documentElement.style.overflow = previousOverflow
      isScrollLocked = false
    }

    const finishLoading = () => {
      const remainingTime = Math.max(
        0,
        MINIMUM_LOADING_TIME - (Date.now() - startedAt),
      )

      finishTimer = window.setTimeout(() => {
        setIsExiting(true)
        removeTimer = window.setTimeout(
          () => {
            restoreScroll()
            setIsVisible(false)
          },
          EXIT_ANIMATION_TIME,
        )
      }, remainingTime)
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading, { once: true })
    }

    return () => {
      window.removeEventListener('load', finishLoading)
      window.clearTimeout(finishTimer)
      window.clearTimeout(removeTimer)
      restoreScroll()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`page-loader${isExiting ? ' page-loader--exiting' : ''}`}
      role="status"
      aria-label="Loading Sathira portfolio"
    >
      <div className="page-loader__rings" aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none">
          <circle
            className="page-loader__ring page-loader__ring--outer"
            cx="60"
            cy="60"
            r="46"
          />
          <circle
            className="page-loader__ring page-loader__ring--middle"
            cx="60"
            cy="60"
            r="34"
          />
          <circle
            className="page-loader__ring page-loader__ring--inner"
            cx="60"
            cy="60"
            r="22"
          />
        </svg>
      </div>

      <p className="page-loader__label" aria-hidden="true">
        Sathira
      </p>
    </div>
  )
}
