import { Configuration, OpenAIApi } from 'openai'
// const { Configuration, OpenAIApi } = require('openai')
import { writeFileSync, createReadStream } from 'fs'
// const { writeFileSync } = require('fs')
// const { fetch } = require('node-fetch')
import fetch from 'node-fetch'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

async function main() {
    const configuration = new Configuration({
        apiKey: process.env.APIKEY,
    })

    const openai = new OpenAIApi(configuration)

    const src = './bitcoin-unsplash.png'
    const mask = './mask.png'

    const result = await openai.createImageEdit()

    const url = result.data.data[0].url
    console.log(url)

    // save image URL to Disk
    const imgResult = await fetch(url)
    const blob = await imgResult.blob()
    const buffer = Buffer.from(await blob.arrayBuffer())
    writeFileSync(`./img/${Date.now()}.png`, buffer)
}

main()
