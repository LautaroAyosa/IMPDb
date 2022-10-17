const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { sequelize } = require('./models/index.js')

const server = http.createServer(app)

// Verify connection to the DB and listen app
const main = async () => {

  try {
    await sequelize.authenticate()
    logger.info('Connected to the DB successfully')

    const PORT = config.PORT || 3003
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  } catch (err) {
    logger.info('Unable to connect to the database:', err)
  }
}

main()