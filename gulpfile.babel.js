import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import log from 'gulplog';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import useref from 'gulp-useref';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import { assign } from 'lodash';
import watchify from 'watchify';
import browserSync from 'browser-sync';

const bs = browserSync.create();

// Variables
// -----
const bundleFile = "kmeans"
const globalNamespace = "KMeans"
const dirs = {
    src: 'src/',
    temp: '.tmp/',
    dist: 'dist/'
}
const paths = {
    src: {
        styles: dirs.src + 'styles/',
        scripts: dirs.src + 'scripts/',
        images: dirs.src + 'images/',
        data: dirs.src + 'data/'
    },
    temp: {
        styles: dirs.temp + 'styles/',
        scripts: dirs.temp + 'scripts/'
    },
    dist: {
        styles: dirs.dist + 'css/',
        scripts: dirs.dist + 'js/',
        images: dirs.dist + 'images/',
        data: dirs.dist + 'data/'
    }
}

// Compile scss files, run autoprefixer and move those into temp folder
// -----
export const scss = () => gulp.src(paths.src.styles + '*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.temp.styles))
    .pipe(bs.stream());

// Run autoprefixer for css files
// -----
export const css = () => gulp.src(paths.src.styles + '**/*.css')
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest(paths.temp.styles))
    .pipe(bs.stream());

// Handle javascripts
// -----
let customOpts = {
    entries: './src/scripts/main.js',
    debug: true,
    transform: [babelify]
};
let opts = assign({}, watchify.args, customOpts);
let b = watchify(browserify(opts, {standalone: 'KMeans'})); 
export const scripts = () => {
    return b.bundle()
        // log errors if they happen
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source(bundleFile + '.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest(paths.temp.scripts));
}

// Minify image
// -----
export const images = () => gulp.src(paths.src.images + "**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));

// Copy example data to dist
// -----
export const data = () => gulp.src(paths.src.data + "**/*")
    .pipe(gulp.dest(paths.dist.data));

// Delete dist and temp folders
// -----
export const clean = () => del([dirs.temp + '**', dirs.dist + '**']);

// Serve and watch on local webserver
// -----
export const play = gulp.series(clean, gulp.parallel(scripts, scss, css), () => {
    bs.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: [dirs.temp, dirs.src]
        }
    });
    gulp.watch(paths.src.styles + "**/*.scss", scss);
    gulp.watch(paths.src.styles + "**/*.css", css);
    // gulp.watch(paths.src.scripts + "**/*.js").on('change', bs.reload;
    gulp.watch([
        dirs.src + "*.html",
        paths.src.scripts + "**/*.js",
        "src/images/**/*"
    ]).on('change', bs.reload);
    b.on('update', scripts); // on any dep update, runs the bundler
    b.on('log', log.info); // output build logs to terminal
});

// Create bundle
// -----
export const build = gulp.series(clean, gulp.parallel(scripts, scss, css, images, data), () => {
    return gulp.src(dirs.src + "*.html")
        .pipe(useref({searchPath: [dirs.temp, dirs.src]}))
        .pipe(gulpif('*.css', cleanCSS()))
        // .pipe(gulpif('*.js', uglify())) // TODO: fix GulpUglifyError
        .pipe(gulp.dest(dirs.dist))
});
