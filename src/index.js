import express from 'express'

import app from './server'

app.use(express.static(`${__dirname}/../public`))

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
