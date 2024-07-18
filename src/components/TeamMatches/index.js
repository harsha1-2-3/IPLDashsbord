import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    latestMatchData: {},
    recentMatchesData: [],
    isLoading: true,
    bannerUrl: '',
  }

  componentDidMount = () => {
    this.getMatchedTeamData()
  }

  getMatchedTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const latestMatchDetails = data.latest_match_details

    const updatedLatestMatch = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }

    const recentMatches = data.recent_matches
    const updatedRecentMatch = recentMatches.map(eachRCMatch => ({
      umpires: eachRCMatch.umpires,
      result: eachRCMatch.result,
      manOfTheMatch: eachRCMatch.man_of_the_match,
      id: eachRCMatch.id,
      date: eachRCMatch.date,
      venue: eachRCMatch.venue,
      competingTeam: eachRCMatch.competing_team,
      competingTeamLogo: eachRCMatch.competing_team_logo,
      firstInnings: eachRCMatch.first_innings,
      secondInnings: eachRCMatch.second_innings,
      matchStatus: eachRCMatch.match_status,
    }))

    this.setState({
      bannerUrl: data.team_banner_url,
      latestMatchData: updatedLatestMatch,
      recentMatchesData: updatedRecentMatch,
      isLoading: false,
    })
  }

  render() {
    const {latestMatchData, recentMatchesData, bannerUrl, isLoading} =
      this.state

    return (
      <div className="bgTMCont">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="blue" height={50} width={50} />
          </div>
        ) : (
          <div className="bgTMCont">
            <div className="TMCard">
              <img className="banner" alt="team banner" src={bannerUrl} />
              <h1 className="TMHead">Latest Matches</h1>
              <LatestMatch
                key={latestMatchData.id}
                LMDetails={latestMatchData}
              />
              <ul className="RCMatchesCont">
                {recentMatchesData.map(RCDetails => (
                  <MatchCard RCDetails={RCDetails} key={RCDetails.id} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
