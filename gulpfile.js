const gulp = require('gulp');
const concat = require('gulp-concat');
const argv = require('yargs').argv;
const shell = require('gulp-shell');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const ENVIRONMENTS = ['dev', 'staging', 'prod', 'eu', 'uat'];
const ENV = argv.ENV;
const NGINX_SERVER_DIR = gutil.env.DIR;

const watchFiles = () => {
	gulp.watch(['src/**/*.ts', 'src/**/*.scss', 'src/**/*.html'], () => {
  	 	runSequence('ng:build', 'rsync', (err) => {
           if (err) {
           	  console.warn('ERROR OCCURED DURING WATCH', err);
           } else {
           	  console.info('RSYNC SUCCESSFUL');
           }
  	 	})
    })
};

gulp.task('concat', (res) => {
    const argv = require('yargs').argv;
    const moduleName = argv.MODULE;
    console.log('MODULE', moduleName);
    return gulp.src(['./dist/inline*.bundle.js', './dist/polyfills*.bundle.js', './dist/styles*.bundle.js', './dist/scripts*.bundle.js', './dist/vendor*.bundle.js', './dist/main*.bundle.js'])
    .pipe(concat({ path: moduleName + '.bundle.js', stat: { mode: 0666 }}))
    .pipe(gulp.dest('./dist'));
})

gulp.task('ng:build', shell.task(`ng build --base-href /tracking/ --environment=${ENV}`))

gulp.task('stop:nginx', shell.task('sudo nginx -s stop', {errorMessage: 'NGINX_STOP_ERROR'}))

gulp.task('start:nginx', shell.task('sudo nginx'))

gulp.task('rsync', shell.task(`sudo rsync -r ./dist/ ${NGINX_SERVER_DIR}`))




gulp.task('shell', ['start:nginx'])

/**
  `Run build command with sudo permission - as rysnc and nginx commands needs super user permission`

  `Run sudo gulp build --ENV <ENVIRONMENT> --DIR $NGINX_SERVER_DIR>`

  `$NGINX_SERVER_DIR` is your ENV variable
**/
gulp.task('build', () => {
  const argv = require('yargs').argv;
  const watch = argv.WATCH;
  if (ENVIRONMENTS.includes(ENV)) {
    runSequence(
    	'ng:build',
    	'stop:nginx',
    	'rsync',
    	'start:nginx', (err) => {
          if (err) {
          	 console.warn('WARNING: WHILE PERFORMING SHELL TASKS');
          	 //IF SERVER IS ALREADY STOPPED - START NGINX SERVER AGAIN
          	 if (err && err.message === 'NGINX_STOP_ERROR') {
          	 	console.log('INITIATING NGINX SERVER AGAIN');
          	 	gulp.start('start:nginx', ['rsync']);
          	 	console.log('STARTED');
          	 }
          } else {
          	 console.log('FINISHED SUCCESSFULLY WITH NO ERRORS');
          }
          //ENABLE WATCH FOR CHANGE IN SRC FILES - RE BUILD & DO RSYNC
          if (watch === 'true') {
             console.log('I am watching the files');
             watchFiles();
          }
    	}
    )
  } else {
  	throw "INVALID ENVIRONMENT";
  }
})

gulp.task('default', ['concat'])
