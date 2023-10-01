import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    // browser: {
    //   enabled: true,
    //   headless: true,
    //   provider: 'playwright',
    //   name: 'chromium', // browser name is required
    // },
    environmentOptions: {
      happyDOM: {
        settings: {
          disableJavaScriptFileLoading: true,
          disableJavaScriptEvaluation: true,
          disableCSSFileLoading: true,
          disableIframePageLoading: true,
          enableFileSystemHttpRequests: false
        }
      }
    }
  },
})
