import profile from '../data/profile'
import { HiCode, HiOutlineBookOpen } from 'react-icons/hi'

export default function DeveloperStatus({ onOpenTerminal }) {
  return (
    <aside className="developer-status" aria-label="Current developer status">
      <div className="developer-status__heading">
        <span className="developer-status__live">
          <span className="developer-status__dot" />
          NOW
        </span>
        <span className="developer-status__title">Developer status</span>
      </div>

      <dl className="developer-status__details">
        <div>
          <dt><HiCode aria-hidden="true" />Building</dt>
          <dd>{profile.currentlyBuilding}</dd>
        </div>
        <div>
          <dt><HiOutlineBookOpen aria-hidden="true" />Learning</dt>
          <dd>{profile.currentlyLearning}</dd>
        </div>
      </dl>

      <button type="button" className="developer-status__terminal" onClick={onOpenTerminal}>
        <span aria-hidden="true">&gt;_</span>
        Open terminal
      </button>
    </aside>
  )
}
