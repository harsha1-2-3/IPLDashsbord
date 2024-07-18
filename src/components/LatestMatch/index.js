import './index.css'

const LatestMatch = props => {
  const {LMDetails} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = LMDetails

  return (
    <div className="LMCont">
      <div className="LMTopCont">
        <div className="LMTextCont">
          <p className="LMHead">{competingTeam}</p>
          <p className="LMHead">{date}</p>
          <p className="LMPara">{venue}</p>
          <p className="LMPaKing">{result}</p>
        </div>
        <img
          className="LMImg"
          alt={`latest match ${competingTeam}`}
          src={competingTeamLogo}
        />
      </div>
      <hr className="line" />
      <div className="LMBottomCont">
        <p className="FIHead">First Innings</p>
        <p className="LMPara">{firstInnings}</p>
        <p className="FIHead">Second Innings</p>
        <p className="LMPara">{secondInnings}</p>
        <p className="FIHead">Man Of The Match</p>
        <p className="LMPara">{manOfTheMatch}</p>
        <p className="FIHead">Umpires</p>
        <p className="LMPara">{umpires}</p>
      </div>
    </div>
  )
}
export default LatestMatch
