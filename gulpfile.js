var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var htmlmin = require("gulp-html-minifier");
var gulpexec = require("gulp-exec");
var path = require("path");
var browserSync = require("browser-sync").create();

const reload = browserSync.reload;

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

  function html(file) {
    var parsePath = path.parse(file);
    const distPath = parsePath.dir.replace('src', 'dist');
    return path.join(distPath, parsePath.name) + ".html";
  }

  return gulp
    .src("./src/**/*.md")
    .pipe(
      gulpexec(
        (file) => `pandoc -d html -s ${file.path} -o ${html(file.path)}`,
        options
      )
    )
    .pipe(gulpexec.reporter(reportOptions));
});

gulp.task("minify-css", function() {
  return gulp
    .src(["./src/static/*.css"])
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/static"));
});

gulp.task("cp-images", function() {
  return gulp
    .src(["./src/images/*.*"])
    .pipe(gulp.dest("./dist/images"));
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
    gulp.watch("./src/static/*.css", gulp.series("minify-css"));
    gulp.watch("./src/images/*.*", gulp.series("cp-images"));
    // gulp.watch("./dist/**/*.html").on("change", reload);
    gulp.watch("./dist/static/*.css").on("change", reload);
  })
);

gulp.task("default", gulp.series("server"));
