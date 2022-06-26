console.log('TimeTracker is running')
const isRunning = (query, cb) => {
  let platform = process.platform
  let cmd = ''
  switch (platform) {
    case 'win32':
      cmd = `tasklist`
      break
    case 'darwin':
      cmd = `ps -ax | grep ${query}`
      break
    case 'linux':
      cmd = `ps -A`
      break
    default:
      break
  }
  exec(cmd, (err, stdout, stderr) => {
    cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1)
  })
}
function StartTracking(application, time = 60000, callback) {
  setInterval(() => {
    isRunning(application, (status) => {
      callback(status)
    })
  }, time)
}

module.exports = { StartTracking }
