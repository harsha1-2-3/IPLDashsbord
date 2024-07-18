import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails

  return (
    <Link className="link" to={`/team-matches/${id}`}>
      <li className="teamCard">
        <img className="teamImg" alt={name} src={teamImageUrl} />
        <p className="teamHead">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
