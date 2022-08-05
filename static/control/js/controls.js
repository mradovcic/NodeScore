//Home Team

document.getElementById('homeTeamInput').addEventListener("input", () => {
  game.emit('homeTeamName', document.getElementById('homeTeamInput').value)
})

document.getElementById('homeTeamGoalsAdd').addEventListener('click', () => {
  const goals = parseInt(document.getElementById('homeScore').innerHTML) + 1;
  game.emit('homeScore', goals)
})

document.getElementById('homeTeamGoalsRemove').addEventListener('click', () => {
  const goals = parseInt(document.getElementById('homeScore').innerHTML) - 1;
  game.emit('homeScore', goals)
})

document.getElementById('homeTeamFoulsAdd').addEventListener('click', () => {
  const fouls = parseInt(document.getElementById('homeFouls').innerHTML) + 1;
  game.emit('homeFoul', fouls)
})

document.getElementById('homeTeamFoulsRemove').addEventListener('click', () => {
  const fouls = parseInt(document.getElementById('homeFouls').innerHTML) - 1;
  game.emit('homeFoul', fouls)
})

//Guest Team

document.getElementById('awayTeamInput').addEventListener("input", () => {
  game.emit('guestTeamName', document.getElementById('awayTeamInput').value)
})

document.getElementById('awayTeamGoalsAdd').addEventListener('click', () => {
  const goals = parseInt(document.getElementById('awayScore').innerHTML) + 1;
  game.emit('guestScore', goals)
})

document.getElementById('awayTeamGoalsRemove').addEventListener('click', () => {
  const goals = parseInt(document.getElementById('awayScore').innerHTML) - 1;
  game.emit('guestScore', goals)
})

document.getElementById('awayTeamFoulsAdd').addEventListener('click', () => {
  const fouls = parseInt(document.getElementById('awayFouls').innerHTML) + 1;
  game.emit('guestFoul', fouls)
})

document.getElementById('awayTeamFoulsRemove').addEventListener('click', () => {
  const fouls = parseInt(document.getElementById('awayFouls').innerHTML) - 1;
  game.emit('guestFoul', fouls)
})

// Timer

document.getElementById('periodInput').addEventListener("input", () => {
  game.emit('period', document.getElementById('periodInput').value)
})

document.getElementById('timerStart').addEventListener('click', () => {
  game.emit('startTimer')
})

document.getElementById('timerPause').addEventListener('click', () => {
  game.emit('pauseTimer')
})

document.getElementById('timerReset').addEventListener('click', () => {
  game.emit('stopTimer')
})


document.getElementById('minutesAdd').addEventListener('click', () => {
  let time = document.getElementById('time').innerHTML.split(':')
  let minutes = parseInt(time[0])
  let seconds = parseInt(time[1])

  let clock = (60 * minutes + seconds) * 1000
  clock += 60000
  game.emit('clock', clock)
})

document.getElementById('minutesRemove').addEventListener('click', () => {
  let time = document.getElementById('time').innerHTML.split(':')
  let minutes = parseInt(time[0])
  let seconds = parseInt(time[1])

  let clock = (60 * minutes + seconds) * 1000
  clock -= 60000
  game.emit('clock', clock)
})

document.getElementById('secondsAdd').addEventListener('click', () => {
  let time = document.getElementById('time').innerHTML.split(':')
  let minutes = parseInt(time[0])
  let seconds = parseInt(time[1])

  let clock = (60 * minutes + seconds) * 1000
  clock += 1000
  game.emit('clock', clock)
})

document.getElementById('secondsRemove').addEventListener('click', () => {
  let time = document.getElementById('time').innerHTML.split(':')
  let minutes = parseInt(time[0])
  let seconds = parseInt(time[1])

  let clock = (60 * minutes + seconds) * 1000
  clock -= 1000
  game.emit('clock', clock)
})

document.getElementById('timeout').addEventListener('click', () => {
  game.emit('timeout')
})