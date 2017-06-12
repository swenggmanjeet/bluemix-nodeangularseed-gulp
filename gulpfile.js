'use strict';

var gulp = require('gulp'),
    path = require('path'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    gulpSequence = require('gulp-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    gcmq = require('gulp-group-css-media-queries'),
    rename = require('gulp-rename'),
    sassLint = require('gulp-sass-lint'),
    eslint = require('gulp-eslint'),
    htmlhint = require('gulp-htmlhint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngTemplates = require('gulp-ng-templates'),
    htmlmin = require('gulp-htmlmin'),
    Server = require('karma').Server,
    protractor = require('gulp-angular-protractor'),

//Paths
    app = './app',
    app_vendor = 'node_modules',
    app_bower = './bower_components',
    app_scss = app + '/scss',
    app_js = app + '/scripts',
    app_js_vendor = app_js + '/vendors',
    app_js_site = app_js + '/site',
    app_css = app + '/css',
    app_images = app + '/images',
    app_fonts = app + '/fonts',
    app_data = app + '/data',
    app_templates = app + '/templates',
    app_templates_pages = app_templates + '/pages',
    app_templates_partials = app_templates + '/partials',
    app_components = app_js_site + '/components',
    dist = './public',
    dist_js = dist + '/js',
    dist_js_vendors = dist_js + '/vendors',
    dist_css = dist + '/css',
    dist_temp = dist + '/temp',
    dist_temp_js = dist_temp + '/js',

// Configuration
    config = {
        isProductionBuild: false,
        assetSelector: ''
    };


/**
 *  Clean
 *
 *  Remove dist directory
 */
gulp.task('clean', function () {
    'use strict';
    return del.sync(dist);
});

/**
 *  Clean temp
 *
 *  Remove dist directory
 */
gulp.task('clean:temp', function () {
    'use strict';
    return del.sync(dist_temp);
});

/**
 *  Copy Static
 *
 *  Copy static files from app to dist
 */
gulp.task('copy:static', function () {
    'use strict';
    return gulp.src([
        app_images + '/**/*',
        app_fonts + '/**/*',
        app_data + '/**/*',
        app + '/index.html',
        app + '/404.html',
        app + '/favicon.ico'
    ],
    {
        "base" : app
    })
    .pipe(plumber())
    .pipe(gulp.dest(dist));
});


/**
 *  Default
 *
 *  Todo - set default tasks
 */
gulp.task('default', function() {
  // place code for your default task here
});


/**
 *  Sass Lint
 *
 *  Inspect Sass code
 */
gulp.task('sasslint', function () {
    return gulp.src([
        '!' + app_scss + '/vendor/**',
        '!' + app_scss + '/tools/*.scss',
        '!' + app_scss + '/libraries.scss',
        app_scss + '/**/*.scss'
    ])
    .pipe(sassLint({
        options: {
            syntax: 'scss',
            formatter: 'stylish'
        },
        configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format());
});


/**
 *  ESLint
 *
 *  Inspect JS code
 */
 gulp.task('eslint', function () {
    'use strict';
    return gulp.src(
        app_js_site + '/**/*.js'
    )
    .pipe(plumber())
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});


/**
 *  HTMLHint
 *
 *  Inspect HTML code
 */  
gulp.task('htmlhint', function () {
    'use strict';
    return gulp.src([
        app_templates + '/**/*.html'
    ])
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});


/**
 *  Linters
 *
 *  Run all linters: sass-lint - eslint - htmlhint
 */  
gulp.task('lint', ['sasslint', 'eslint', 'htmlhint']);


/**
 *  Build CSS
 *
 *  Compile scss files to css 
 */  
gulp.task('build:css', function() {
    'use strict';
    return gulp.src([
        app_scss + '/style.scss',
        app_scss + '/libraries.scss'
    ])
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' })
    .on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 10 versions', 'IE 9'],
        cascade: false
    }))
    .pipe(gcmq())
    .pipe(gulpif(config.isProductionBuild, rename({suffix: '.min'})))
    .pipe(gulpif(config.isProductionBuild, sourcemaps.init()))
    .pipe(gulpif(config.isProductionBuild, cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(config.isProductionBuild, sourcemaps.write('./')))
    .pipe(gulp.dest(dist_css));
});


/**
 *  NG-Templates
 *
 *  Compile each angular html template to templatecache js
 */ 
gulp.task('ng:templates', function () {
    return gulp.src([
            app_templates + '/**/*.html', 
            app_components + '/**/*.html'
        ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(ngTemplates('appTemplates'))
        .pipe(gulp.dest(dist_js));
});


/**
 *  NG-Annotate
 *
 *  Tries to make the code safe for minification automatically
 */ 
 gulp.task('ng:annotate', function () {
    return gulp.src(app_js_site + '/**/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest(dist_temp));
});

/**
 *  JS concats
 *
 *  Concat each kind of ng modules in one file to reduce the page load
 */
 gulp.task('concat:controllers', function () {
    return gulp.src(dist_temp + '/controllers/**/*.js')
           .pipe(sourcemaps.init())
           .pipe(concat('controllers.js'))
           .pipe(sourcemaps.write())
           .pipe(gulp.dest(dist_js));
});

 gulp.task('concat:components', function () {
    return gulp.src(dist_temp + '/components/**/*.js')
           .pipe(sourcemaps.init())
           .pipe(concat('components.js'))
           .pipe(sourcemaps.write())
           .pipe(gulp.dest(dist_js));
});

gulp.task('concat:factories', function () {
    return gulp.src(dist_temp + '/factories/**/*.js')
           .pipe(sourcemaps.init())
           .pipe(concat('factories.js'))
           .pipe(sourcemaps.write())
           .pipe(gulp.dest(dist_js));
});

gulp.task('concat:app', function () {
    return gulp.src(dist_temp + '/app.js')
           .pipe(sourcemaps.init())
           .pipe(concat('app.js'))
           .pipe(sourcemaps.write())
           .pipe(gulp.dest(dist_js));
});

gulp.task('concat:all', ['concat:controllers', 'concat:components', 'concat:factories', 'concat:app']);


/**
 *  IE-shims
 *
 *  Avoid html5 issues on old IE versions
 */ 
gulp.task('js:shiv', function() {
    'use strict';
    return gulp.src([
        app_js_vendor + '/html5shiv.min.js',
        app_js_vendor + '/respond.js'
    ])
    .pipe(plumber())
    .pipe(concat('ie-shims.js'))
    .pipe(gulpif(config.isProductionBuild, rename({suffix: '.min'})))
    .pipe(gulpif(config.isProductionBuild, sourcemaps.init()))
    .pipe(gulpif(config.isProductionBuild, uglify()))
    .pipe(gulpif(config.isProductionBuild, sourcemaps.write('./')))
    .pipe(gulp.dest(dist_js_vendors));
});


// 
/**
 *  Build Vendors
 *
 *  Create js package contains all needed vendors libraries
 */ 
gulp.task('js:vendors', function() {
    'use strict';
    return gulp.src([
        app_bower + '/jquery/dist/jquery.min.js',
        app_bower + '/bootstrap/dist/js/bootstrap.min.js',
        app_bower + '/angular/angular.js',
        app_bower + '/angular-resource/angular-resource.js',
        app_bower + '/angular-route/angular-route.js',
        app_bower + '/angular-sanitize/angular-sanitize.js'
    ])
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(gulpif(config.isProductionBuild, rename({suffix: '.min'})))
    .pipe(gulpif(config.isProductionBuild, sourcemaps.init()))
    .pipe(gulpif(config.isProductionBuild, uglify()))
    .pipe(gulpif(config.isProductionBuild, sourcemaps.write('./')))
    .pipe(gulp.dest(dist_js_vendors));
});


/**
 *  Build JS
 *
 *  Build angular app 
 */  
gulp.task('build:js', gulpSequence(['ng:annotate', 'ng:templates'], ['js:shiv', 'js:vendors'], 'concat:all', 'clean:temp'));


/**
 *  Build all packages
 *
 *  Build all package 
 */
gulp.task('build:all', gulpSequence('lint', 'clean', 'build:css', 'build:js', 'copy:static'));


/**
 *  Watch
 *
 *  Watches for changes
 */
gulp.task('watch', function() {
    'use strict';
    if (!config.isProductionBuild) {

        gulp.watch(
            app_scss + '/**/*'
        , function (event) {
            reloadServer(event, ['sasslint', 'build:css']);
        });

        gulp.watch(
            app_js_site + '/**/*'
        , function (event) {
            reloadServer(event, ['eslint', 'ng:annotate']);
        });

        gulp.watch(
            app_js_vendor + '/**/*'
        , function (event) {
            reloadServer(event, ['js:vendors', 'js:shiv']);
        });

        gulp.watch(
            app_templates + '/**/*.html'
        , function (event) {
            reloadServer(event, ['htmlhint', 'ng:templates']);
        });

        gulp.watch([
            app_images + '/**/*',
            app_fonts + '/**/*',
            app_data + '/**/*'
        ], function (event) {
            reloadServer(event, ['copy:static']);
        });
    }
});


function reloadServer(event, tasks) {
    gulp.start(tasks, function() {
        console.log('--- change detected > launch tasks');
    });
}

/**
 *  Server localhost
 *
 *  Run node app.js to launch localhost
 */  
gulp.task('server', function() {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: 'app.js',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ['./public/**/*'],
        ext: 'js html css'
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    }).on('restart', () => {
    gulp.src('app.js')
      // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
      .pipe(notify('Running the start tasks and stuff'));
  });
});


/**
 *  DEV environment
 *
 *  Launch dev sequence to build package and run localhost
 */  
gulp.task('dev', gulpSequence('build:all', 'watch', 'server'));


/**
 *  Unit tests
 *
 *  Karma
 */  
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});


/**
 *  EndToEnd tests
 *
 *  Protractor
 */   
gulp.task('e2e', function (done) {
    gulp.src(['./e2e/*.js'])
        .pipe(protractor({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) { throw e });
});
