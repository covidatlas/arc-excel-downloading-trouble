const XLSX = require('XLSX')
const fs = require('fs')
const { join } = require('path')
const { gunzipSync } = require('zlib')

const crawledFilename = 'crawled.xlsx.gz'
const crawledFile = join(__dirname, crawledFilename)
console.log(crawledFile)
const file = fs.readFileSync(crawledFile)
const content = gunzipSync(file)

const unzipped = join(__dirname, crawledFilename.replace('.gz', ''))
fs.writeFileSync(unzipped, content)
console.log(`wrote ${unzipped}`)

const crawledWkb = XLSX.readFile(unzipped)
console.log(`Got source sheets = ${srcWkb.SheetNames.join()}`)
