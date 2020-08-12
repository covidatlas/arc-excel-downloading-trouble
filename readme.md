# Demonstrate lambda/excel issue

Minimal repo to demonstrate https://github.com/covidatlas/li/issues/564


Currently, it appears that AWS lambdas (or sdk, or ... ?) mess around
with what should be binary data.  When I download an Excel file via lambdas (using arc), and I try to parse the file, I get an error:

```
x Error: End of data reached (data length = 10043, asked index = 347979759). Corrupted zip ?
```

Others have noted the same issue.


To repro:

* Clone this repo
* `npm install` everything
* Run `node check-source.js` -- this uses the `xlsx` npm package to parse the xlsx file in `public`
* Start the sandbox with `npm run start`
* Run `./do-crawl` to run a crawler: it downloads the file from `public` using `http/get-get-normal`.
* Run `node check-crawled.js`, and you'll see the error:

```
.../crawled.xlsx.gz
wrote /path/to/crawled.xlsx
/path/to/node_modules/XLSX/jszip.js:272
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
            ^

Error: End of data reached (data length = 10043, asked index = 347979759). Corrupted zip ?
```

The associated lambdas are ... hopefully ... clear!