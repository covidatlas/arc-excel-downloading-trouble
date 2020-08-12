const { brotliCompressSync } = require('zlib')
const arc = require('@architect/functions')
const got = require('got')

async function getNormal (req) {
  let options = decodeURIComponent(req.queryStringParameters.options)
  options = JSON.parse(options)

  const agent = 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_2) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/80.0.3987.132 Safari/537.36'

  const response = await got(options.url, {
    headers: { 'user-agent': agent },
    retry: 0,
    throwHttpErrors: false,
    isStream: false,
    encoding: 'utf8'
  })

  let responseBody = Buffer.from(response.body)
  responseBody = brotliCompressSync(responseBody).toString('base64')
  let payload = { body: responseBody }

  return { statusCode: 200, body: JSON.stringify(payload) }
}

exports.handler = arc.http.async(getNormal)
