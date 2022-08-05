import Game from './Game'

let game

const socketHandler = (socket) => {
  const onUpdate = () => {
    socket.broadcast.emit('clock', game.clock)
    socket.emit('clock', game.clock)

    if (game.clock <= 0) {
      game.clock = 0
      socket.broadcast.emit('clock', game.clock)
      socket.emit('clock', game.clock)
      game.pauseTimer()
    }

    if (game.inTimeout) {
      socket.broadcast.emit('timeoutClock', game.timeoutClock)
      socket.emit('timeoutClock', game.timeoutClock)

      if (game.timeoutClock <= 0) {
        socket.broadcast.emit('timeout', 'stop')
        socket.emit('timeout', 'stop')
        game.stopTimeoutTimer()
      }
    }
  }

  if (!game) {
    game = new Game(onUpdate)
  }

  socket.emit('game', {
    competitionName: game.competitionName,
    teams: game.teams,
    score: game.score,
    clock: game.clock,
    fouls: game.fouls,
    period: game.period,
    timeouts: game.timeouts
  })

  socket.on('competitionName', (msg) => {
    game.competitionName = msg
    socket.broadcast.emit('competitionName', game.competitionName)
    socket.emit('competitionName', game.competitionName)
  })

  socket.on('homeTeamName', (msg) => {
    game.teams[0] = msg
    socket.broadcast.emit('homeTeamName', game.teams[0])
    socket.emit('homeTeamName', game.teams[0])
  })

  socket.on('guestTeamName', (msg) => {
    game.teams[1] = msg
    socket.broadcast.emit('guestTeamName', game.teams[1])
    socket.emit('guestTeamName', game.teams[1])
  })

  socket.on('homeScore', (msg) => {
    game.score[0] = msg
    socket.broadcast.emit('homeScore', game.score[0])
    socket.emit('homeScore', game.score[0])
  })

  socket.on('guestScore', (msg) => {
    game.score[1] = msg
    socket.broadcast.emit('guestScore', game.score[1])
    socket.emit('guestScore', game.score[1])
  })

  socket.on('homeFoul', (msg) => {
    game.fouls[0] = msg
    socket.broadcast.emit('homeFoul', game.fouls[0])
    socket.emit('homeFoul', game.fouls[0])
  })

  socket.on('guestFoul', (msg) => {
    game.fouls[1] = msg
    socket.broadcast.emit('guestFoul', game.fouls[1])
    socket.emit('guestFoul', game.fouls[1])
  })

  socket.on('clock', (msg) => {
    game.clock = msg
    socket.broadcast.emit('clock', game.clock)
    socket.emit('clock', game.clock)
  })

  socket.on('period', (msg) => {
    game.period = msg
    socket.broadcast.emit('period', game.period)
    socket.emit('period', game.period)
  })

  socket.on('stopTimer', () => {
    game.stopTimer()
    socket.broadcast.emit('clock', game.clock)
    socket.emit('clock', game.clock)
  })

  socket.on('pauseTimer', () => {
    game.pauseTimer()
  })

  socket.on('startTimer', () => {
    game.startTimer()
  })

  socket.on('timeout', () => {
    if (!game.inTimeout) {
      game.pauseTimer()
      socket.broadcast.emit('timeout', 'start')
      socket.emit('timeout', 'start')
      game.startTimeoutTimer()
    } else {
      socket.broadcast.emit('timeout', 'stop')
      socket.emit('timeout', 'stop')
      game.stopTimeoutTimer()
    }
  })

  socket.on('reset', () => {
    game = new Game()
    socket.broadcast.emit('game', {
      competitionName: game.competitionName,
      teams: game.teams,
      score: game.score,
      clock: game.clock,
      fouls: game.fouls,
      period: game.period
    })
    socket.emit('game', {
      competitionName: game.competitionName,
      teams: game.teams,
      score: game.score,
      clock: game.clock,
      fouls: game.fouls,
      period: game.period
    })
  })

}

export default socketHandler
