const resultJson = (data,status,message) => {
  return {
    data:data,
    status:status,
    message:message
  }
}

module.exports = {
  resultJson:resultJson
}