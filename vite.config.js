import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: 'base' must match your GitHub repository name.
// If your repo is https://github.com/USERNAME/bhvt-quiz, leave as is.
// If you renamed the repo, change '/bhvt-quiz/' to '/your-repo-name/'.
export default defineConfig({
  plugins: [react()],
  base: '/bhvt-quiz/',
})
