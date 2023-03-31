import { simpleGit } from 'simple-git'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', async (file) => {
    if (file._extension === 'md') {
      const git = simpleGit()

      const log = await git.log({
        file: file._id.replaceAll(':', '/')
      })

      file.createdAt = log.all.at(-1)?.date || new Date().toISOString()
      file.updatedAt = log.latest?.date || new Date().toISOString()
    }
  })
})
