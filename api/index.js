const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { sequelize } = require('./models/index.js')

const server = http.createServer(app)

require('./models/Person')
require('./models/Movie')

// Verify connection to the DB and listen app
const main = async () => {
  try {
    // try the connection to sequelize 
    await sequelize.sync({force: true})
    logger.info('Connected to the DB successfully')

    // listen app at port #
    const PORT = config.PORT || 3003
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  } catch (err) {
    // log error if the connection with sequelize failed
    logger.info('Unable to connect to the database:', err)
  }
}

main()