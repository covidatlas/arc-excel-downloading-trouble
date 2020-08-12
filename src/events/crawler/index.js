const arc = require('@architect/functions')
const { join } = require('path')
const { gzipSync, brotliDecompressSync } = require('zlib')
const got = require('got')

/** Downloads and compresses a file from localhost to crawled.xlsx.gz. */
async function crawlLocal () {
  const type = 'xlsx'
  const url = 'http://localhost:3333/data.xlsx'
  const params = { type, url }

  const options = encodeURIComponent(JSON.stringify(params))
  const path = `http://localhost:3333/get/normal?options=${options}`
  const result = await got(path)
  const response = JSON.parse(result.body)
  response.body = brotliDecompressSync(Buffer.from(response.body, 'base64'))

  const filepath = join(__dirname, '..', '..', '..')
  const filename = 'crawled.xlsx'
  const file = join(filepath, `${filename}.gz`)
  fs.writeFileSync(file, gzipSync(response.body))
  console.log(`Wrote:`, file)
}

exports.handler = arc.events.subscribe(crawlLocal)
