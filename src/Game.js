export default class Game {

  constructor(onUpdate) {
    this.competitionName = 'Kostanje Cup 2022'
    this.periodLengthMinutes = 20
    this.teams = ['Crveni kombi', 'Kostanje']
    this.score = [0, 0]
    this.clock = this.periodLengthMinutes * 60 * 1000
    this.fouls = [0, 0]
    this.period = "I"
    this.timeouts = [0, 0]

    this.inTimeout = false
    this.timeoutLength = 60 * 1000
    this.timeoutClock = this.timeoutLength
    this.timeoutInterval

    this.interval
    this.offset = 0
    this.timerRunning = false

    this.onUpdate = onUpdate
  }

  startTimer = () => {
    if (!this.timerRunning) {
      this.offset = Date.now()
      this.interval = setInterval(this.update, 1000)
      this.timerRunning = true
    }
  }

  pauseTimer = () => {
    this.timerRunning = false
    clearInterval(this.interval)
  }

  stopTimer = () => {
    this.timerRunning = false
    this.clock = this.periodLengthMinutes * 60 * 1000
    clearInterval(this.interval)
  }

  update = () => {
    this.clock -= this.delta()
    this.onUpdate()
  }

  delta = () => {
    const now = Date.now()
    const d = now - this.offset

    this.offset = now
    return d
  }

  startTimeoutTimer = () => {
    if (!this.inTimeout) {
      this.offset = Date.now()
      this.timeoutInterval = setInterval(this.timeoutUpdate, 1000)
      this.inTimeout = true
    }
  }

  timeoutUpdate = () => {
    this.timeoutClock -= this.delta()
    this.onUpdate()
  }

  stopTimeoutTimer = () => {
    this.inTimeout = false
    this.timeoutClock = this.timeoutLength
    clearInterval(this.timeoutInterval)
  }

}