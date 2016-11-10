var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	clean = require("gulp-clean"),
	concat = require("gulp-concat"),
	notify = require("gulp-notify"),
	cache = require("gulp-cache"),
	gulpSequence = require('gulp-sequence'),
	connect = require("gulp-connect")
;

var src = "./src/",
	srcScripts = src + "**/*.js",
	dist = "./dist/",
	distScripts = dist + "**/*.js";

gulp.task("clean", function(){
	return gulp.src([distScripts], {read: false}).pipe(clean());
});

gulp.task("scripts", function(){
	gulp.src(srcScripts)
	.pipe(jshint())
	.pipe(jshint.reporter("default"))
	.pipe(rename({suffix:".min"}))
	.pipe(gulp.dest(dist))
	.pipe(connect.reload())
	.pipe(notify({message: "Scripts complete"}));
});

gulp.task("build:scripts", function(){
	gulp.src(distScripts)
	.pipe(uglify())
	.pipe(gulp.dest(distScripts))
	.pipe(notify({message: "Build: Scripts complete"}));
});

gulp.task("clear:cache", function(done){
	return cache.clearAll(done);
});

gulp.task('connect', function() {
  connect.server({
    root: dist,
    livereload: true
  });
});

gulp.task("watch", function(){
	//Watch scripts
	gulp.watch(srcScripts, ["scripts"]);
});


gulp.task("release", function(cb){
	gulpSequence("clean", "scripts", "build:scripts")(cb);
});

//Quick Develop: connect and watch task
gulp.task("quickdev", ["connect", "watch"]);

gulp.task("default", ["clean"], function(){
	gulp.start("quickdev");
});