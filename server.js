const browserSync = require('browser-sync');
const historyFallback = require('connect-history-api-fallback');

browserSync({
    files: './public/*',
    watch: true,
    server: {
        baseDir: './public',
        middleware: [historyFallback()] // Important! Allows react router to work properly.
    }
});
