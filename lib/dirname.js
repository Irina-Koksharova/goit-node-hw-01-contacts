import { fileURLToPath } from 'url'
import { dirname } from 'path'

const createDirname = (importUrl) => {
  const __filename = fileURLToPath(importUrl)
  const __dirname = dirname(__filename)
  return __dirname
}

export default createDirname

