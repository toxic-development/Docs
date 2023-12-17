let isTurboUsed = (process?.env?.npm_lifecycle_script || '').includes('--turbo')
if (isTurboUsed) return console.warn('[Turbo Pack]: loading development environment with Turbo!')

const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx'
})

module.exports = withNextra({
    cleanDistDir: true,
    swcMinify: true,
    compress: true,
    optimizeFonts: true,
    reactStrictMode: true,
    images: {
        domains: ['avatars.githubusercontent.com'],
        formats: ['image/avif', 'image/webp'],
        dangerouslyAllowSVG: true,
        unoptimized: true
    }
})
