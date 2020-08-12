@app
li

@aws
profile covidatlas
region us-west-1

@cdn
@http
get /get/normal

@events
crawler     # Crawls our sources


# get/get/normal - returns the file
# crawler - gets the file, and that's it