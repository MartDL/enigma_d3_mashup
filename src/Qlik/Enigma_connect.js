import enigma from 'enigma.js'
import schema from 'enigma.js/schemas/12.170.2.json'

let config = {
  host: 'localhost', // if local = localhost etc
  isSecure: false, // whether it's being hosted on a local port or not
  port: 4848, // if is secure will be 443, otherwise usually 4848
  prefix: '',
  appId: 'Consumer Sales.qvf' // name of the qvf file, or the appID if connecting to QS server
}

const session = enigma.create({
  schema, // schema see 'What is a schema?'
  url: `ws${config.isSecure ? 's' : ''}://${config.host}:${config.port}/${
    config.prefix ? `${config.prefix}/` : ''
  }app/engineData`
}) // calculated url based on variables provided in config

export async function openSession() {
  try {
    const qix = await session.open()
    try {
      const doc = await qix.openDoc(config.appId)
      return doc
    } catch (error) {
      console.log('Unable to open Doc: ', error)
    }
  } catch (error) {
    console.log('Unable to open Session: ', error)
  }
}

export function closeSession() {
  session.close()
}