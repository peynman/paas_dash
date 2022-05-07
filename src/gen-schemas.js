const glob = require('glob')
const path = require('path')
const fs = require('fs')

const targets = {}
const schemas = []
glob.sync('./src/components/**/*.vue').forEach(file => {
    const f = path.parse(file)
    const relativePath = f.dir.substring('./src/components/'.length)
    const folders = relativePath.split('/')
    let parent = targets
    folders.forEach(folder => {
        if (!parent[folder]) {
            parent[folder] = {}
            parent = parent[folder]
        } else {
            parent = parent[folder]
        }
    })
    console.log(f.dir.substring('./src/components/'.length) + '/' + f.name + f.ext)
    parent[f.name] = relativePath + '/' + f.name + f.ext
})

const content = `export default ${JSON.stringify(targets, null, 2)}\n`

fs.writeFile('./src/components/auto-schemas.js', content, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })

