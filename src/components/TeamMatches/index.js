import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
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
    const {
      latestMatchData,
      recentMatchesData,
      bannerUrl,
      isLoading,
    } = this.state

    const wonMatches = recentMatchesData.filter(
      each => each.matchStatus === 'Won',
    )
    const loseMatches = recentMatchesData.filter(
      each => each.matchStatus === 'Lost',
    )
    const drawnMatches = recentMatchesData.filter(
      each => each.matchStatus === 'Draw',
    )

    let won = wonMatches.length
    let lost = loseMatches.length
    let drawn = drawnMatches.length

    if (latestMatchData.matchStatus === 'Won') {
      won += 1
    } else if (latestMatchData.matchStatus === 'Lost') {
      lost += 1
    } else {
      drawn += 1
    }

    const pieData = [
      {
        name: 'Won',
        count: won,
      },
      {
        name: 'Lost',
        count: lost,
      },
      {
        name: 'Draw',
        count: drawn,
      },
    ]

    console.log(won, 'Won')
    console.log(lost, 'Lost')
    console.log(drawn, 'Draw')
    console.log(pieData)

    return (
      <div className="bgTMCont">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="blue" height={50} width={50} />
          </div>
        ) : (
          <div className="bgTMCont">
            <div className="TMCard">
              <img className="banner" alt="team banner" src={bannerUrl} />
              <h1 className="TMHead">Latest Matches</h1>
              <LatestMatch
                key={latestMatchData.id}
                lMDetails={latestMatchData}
              />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart className="piee">
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={pieData}
                    startAngle={0}
                    endAngle={360}
                    innerRadius="40%"
                    outerRadius="70%"
                    dataKey="count"
                    label
                  >
                    <Cell name="Won" fill="#4CAF50" />
                    <Cell name="Lost" fill="#F44336" />
                    <Cell name="Draw" fill="#FFC107" />
                  </Pie>
                  <Legend
                    iconType="circle"
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                </PieChart>
              </ResponsiveContainer>
              <ul className="RCMatchesCont">
                {recentMatchesData.map(rCDetails => (
                  <MatchCard rCDetails={rCDetails} key={rCDetails.id} />
                ))}
              </ul>
            </div>
            <Link className="link" to="/">
              <button type="button" className="backBtn">
                Back
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
