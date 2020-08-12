const XLSX = require('XLSX')
const { join } = require('path')

// Initial file.
const srcFile = join('public', 'data.xlsx')
const srcWkb = XLSX.readFile(srcFile)
console.log(`Got source sheets = ${srcWkb.SheetNames.join()}`)

// Using the crawler, get the file and put it in another location.
