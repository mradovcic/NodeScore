const game = io.connect(document.location.host)

game.on('connect', () => {
})

game.on('game', (msg) => {
  document.getElementById('homeTeam').innerHTML = msg.teams[0]
  document.getElementById('homeTeamInput').value = msg.teams[0]

  document.getElementById('awayTeam').innerHTML = msg.teams[1]
  document.getElementById('awayTeamInput').value = msg.teams[1]

  document.getElementById('homeScore').innerHTML = msg.score[0]
  document.getElementById('awayScore').innerHTML = msg.score[1]
  document.getElementById('homeFouls').innerHTML = msg.fouls[0]
  document.getElementById('awayFouls').innerHTML = msg.fouls[1]
  document.getElementById('periodInput').innerHTML = msg.period

  const clock = msg.clock

  let minutes =Math.floor(clock / 1000 / 60)
  let seconds = Math.floor(clock / 1000 % 60)

  let time = ""
  minutes < 10? time += "0" + minutes.toString() : time += minutes.toString()
  time += ":" 
  seconds < 10? time += "0" + seconds.toString() : time += seconds.toString()
  document.getElementById("time").innerHTML = time
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
  document.getElementById('homeScore').innerHTML = msg
})

game.on('guestScore', (msg) => {
  document.getElementById('awayScore').innerHTML = msg
})

game.on('homeFoul', (msg) => {
  document.getElementById('homeFouls').innerHTML = msg
})

game.on('guestFoul', (msg) => {
  document.getElementById('awayFouls').innerHTML = msg
})

game.on('period', (msg) => {
  document.getElementById('periodInput').innerHTML = msg
})

game.on('clock', (msg) => {
  const clock = msg

  let minutes =Math.floor(clock / 1000 / 60)
  let seconds = Math.floor(clock / 1000 % 60)

  let time = ""
  minutes < 10? time += "0" + minutes.toString() : time += minutes.toString()
  time += ":" 
  seconds < 10? time += "0" + seconds.toString() : time += seconds.toString()
  document.getElementById("time").innerHTML = time
})

game.on('timeout', (msg) => {
  if(msg === "start"){
    console.log(document.getElementById('timeout').children)
    document.getElementById('timeout').children[0].innerHTML = "End Timeout"
  }
  else{
    document.getElementById('timeout').children[0].innerHTML = "Start Timeout"
  }
})