import './index.css'

const MatchCard = props => {
  const {rCDetails} = props
  const {result, competingTeamLogo, competingTeam, matchStatus} = rCDetails
  const lostOrWon = 'status'

  return (
    <li className="RCMatch">
      <img
        className="RCImg"
        alt={`competing team ${competingTeam}`}
        src={competingTeamLogo}
      />
      <p className="RCHead">{competingTeam}</p>
      <p className="RCPara">{result}</p>
      <p className={`RCResult ${lostOrWon}`}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
