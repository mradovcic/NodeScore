const game = io.connect(document.location.host)
let playingSound = false

game.on('connect', () => {
})

game.on('game', (msg) => {
  console.log(msg)
  document.getElementById('homeTeam').innerHTML = msg.teams[0]
  document.getElementById('awayTeam').innerHTML = msg.teams[1]
  document.getElementById('homeScore').innerHTML = msg.score[0]
  document.getElementById('awayScore').innerHTML = msg.score[1]
  document.getElementById('homeFouls').innerHTML = msg.fouls[0]
  document.getElementById('awayFouls').innerHTML = msg.fouls[1]
  document.getElementById('periodNumber').innerHTML = msg.period
  const clock = msg.clock

  const minutes = Math.floor(clock / 1000 / 60)
  const seconds = Math.floor(clock / 1000 % 60)

  let time = ''
  minutes < 10 ? time += '0' + minutes.toString() : time += minutes.toString()
  time += ':'
  seconds < 10 ? time += '0' + seconds.toString() : time += seconds.toString()
  document.getElementById('time').innerHTML = time
})

game.on('competitionName', (msg) => {
  document.getElementById('tourName').innerHTML = msg
})

game.on('homeTeamName', (msg) => {
  document.getElementById('homeTeam').innerHTML = msg
})

game.on('guestTeamName', (msg) => {
  document.getElementById('awayTeam').innerHTML = msg
})

game.on('homeScore', (msg) => {
  if (msg > parseInt(document.getElementById('homeScore').innerHTML)) {
    showGoalModal(document.getElementById('homeTeam').innerHTML)
    //const goalAudio = new Audio('../assets/crowd.wav')
    //goalAudio.play()
  }
  document.getElementById('homeScore').innerHTML = msg

})

game.on('guestScore', (msg) => {
  if (msg > parseInt(document.getElementById('awayScore').innerHTML)) {
    showGoalModal(document.getElementById('awayTeam').innerHTML)
    //const goalAudio = new Audio('../assets/crowd.wav')
    //goalAudio.play()
  }
  document.getElementById('awayScore').innerHTML = msg
})

game.on('homeFoul', (msg) => {
  document.getElementById('homeFouls').innerHTML = msg
})

game.on('guestFoul', (msg) => {
  document.getElementById('awayFouls').innerHTML = msg
})

game.on('period', (msg) => {
  document.getElementById('periodNumber').innerHTML = msg
})


game.on('clock', (msg) => {
  const clock = msg

  const minutes = Math.floor(clock / 1000 / 60)
  const seconds = Math.floor(clock / 1000 % 60)

  if (minutes == 0 && seconds == 0 && !playingSound) {
    playingSound = true
    const horn = new Audio('../assets/buzz.wav')
    horn.play()
    setTimeout(() => playingSound = false, 2000)
  }

  let time = ''
  minutes < 10 ? time += '0' + minutes.toString() : time += minutes.toString()
  time += ':'
  seconds < 10 ? time += '0' + seconds.toString() : time += seconds.toString()
  document.getElementById('time').innerHTML = time

})

game.on('timeout', (msg) => {
  if (msg === 'start') {
    showTimeoutModal()
  } else {
    hideTimeoutModal()
  }
})

game.on('timeoutClock', (msg) => {
  const time = Math.floor(msg / 1000)
  document.getElementById('timeoutTimeModalText').innerHTML = time
})

const interval = setInterval(() => {
  if (document.getElementById('goalModalText').style.color === 'green') {
    document.getElementById('goalModalText').style.color = 'black'
  } else {
    document.getElementById('goalModalText').style.color = 'green'
  }
}, 1000)

const showGoalModal = (team) => {
  document.getElementById('goalModal').style.display = 'block'
  document.getElementById('teamGoalModalText').innerHTML = team
  document.getElementById('goalModalText').style.display === 'block'
  setTimeout(() => {
    document.getElementById('goalModal').style.display = 'none'
  }, 5000)
}

const showTimeoutModal = (team) => {
  document.getElementById('timeoutModal').style.display = 'block'
}

const hideTimeoutModal = (team) => {
  document.getElementById('timeoutModal').style.display = 'none'
  console.log('hideTimeoutModal')
  const horn = new Audio('../assets/buzz.wav')
  horn.play()
}