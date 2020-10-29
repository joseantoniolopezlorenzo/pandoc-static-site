var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var htmlmin = require("gulp-html-minifier");
var gulpexec = require("gulp-exec");
var path = require("path");
var browserSync = require("browser-sync").create();

const reload = browserSync.reload;
const github = process.argv[4];

gulp.task("compile-md", function() {
  var options = {
    continueOnError: false,
    pipeStdout: true,
  };

  var reportOptions = {
    err: true,
    stderr: true,
    stdout: false,
  };

  if(github === undefined) {github = false}
  function html(file) {
    var parsePath = path.parse(file);
    const distPath = parsePath.dir.replace('src', 'dist');
    return path.join(distPath, parsePath.name) + ".html";
  }

  return gulp
    .src("./src/**/*.md")
    .pipe(
      gulpexec(
        (file) => `pandoc -d html -M github=${github} -s ${file.path} -o ${html(file.path)}`,
        options
      )
    )
    .pipe(gulpexec.reporter(reportOptions));
});

gulp.task("minify-css", function() {
  return gulp
    .src(["./src/assets/*.css"])
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/assets"));
});

gulp.task("cp-images", function() {
  return gulp
    .src(["./src/assets/images/*.*"])
    .pipe(gulp.dest("./dist/assets/images"));
});

gulp.task("minify-html", function() {
  return gulp
    .src("./dist/**/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      })
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task(
  "server",
  gulp.series("compile-md", "minify-html", "minify-css", "cp-images", function() {
    browserSync.init({
      server: "./dist",
    });
    gulp.watch("./src/**/*.md", gulp.series("compile-md", "minify-html"));
    gulp.watch("./src/assets/*.css", gulp.series("minify-css"));
    gulp.watch("./src/assets/images/*.*", gulp.series("cp-images"));
    // gulp.watch("./dist/**/*.html").on("change", reload);
    gulp.watch("./dist/assets/*.css").on("change", reload);
  })
);

gulp.task("default", gulp.series("server"));
gulp.task("build", gulp.series("compile-md","minify-html"));
