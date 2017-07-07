const string2timestamp = (timestring) => {
    let str = timestring.replace(/-/g,'/')
    let date = +new Date(str)

    return date
}

module.exports ={
    string2timestamp
}
