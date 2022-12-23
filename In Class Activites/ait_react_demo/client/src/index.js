import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const MemberInput = (props) => {
  const [member, setMember] = useState('')

  const handleMemberChange = (event) => {
    event.preventDefault()
    setMember(event.target.value)
  }

  return (
    <form onSubmit={(event) => props.onNewMember(event, member)}>
      <input type="text" placeholder={props.clubId} onChange={handleMemberChange}></input>
      <button type="submit">Submit</button>
    </form>
  )
}

const Club = (props) => {

  return(
    <div onClick={props.handleClick}>
      <h1>{props.clubName}</h1>
      <h2>id: {props.clubId}</h2>
      <ul>
        {props.members.map((member) => <li key={member}>{member}</li>)}
      </ul>
      {props.selected && 
        <MemberInput clubId={props.clubId} onNewMember={props.onNewMember} />
      }
    </div>
  )
}

const App = (props) => {
  const [clubInfo, setClubInfo] = useState([])
  const [selectedClub, setSelectedClub] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/clubs')
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        setClubInfo(responseJson)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleClick = (id) => {
    return (event) => {
      setSelectedClub(id)
      console.log(`clicked ${id}`)
    }
  }

  const handleNewMember = (id) => {
    return (event, member) => {
      event.preventDefault()
      if (member === '') {
        console.log('Must submit member name')
      } else {
        fetch(`http://localhost:3001/clubs/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: member
          })
        }).then((response) => {
          return response.json()
        }).then((responseJson) => {
          if (!responseJson.success) {
            throw new Error()
          }

          // change club Info
          const clubInfoCopy = JSON.parse(JSON.stringify(clubInfo))
          const indexToReplace = clubInfoCopy.findIndex((club) => club.id === responseJson.club.id)
          clubInfoCopy[indexToReplace] = responseJson.club
          console.log(clubInfoCopy)
          setClubInfo(clubInfoCopy)
        }).catch(console.log)
      }
    }
  }

  const clubs = clubInfo.map((club) => {
    return <Club
              clubId={club.id}
              key={club.id}
              members={club.members}
              clubName={club.name}
              handleClick={handleClick(club.id)}
              selected={selectedClub === club.id}
              onNewMember={handleNewMember(club.id)}
            />
  })

  return (
    <>
      {clubs}
    </>
  )
}

root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
