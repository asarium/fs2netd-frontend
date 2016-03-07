"use strict";

var gulp = require('gulp');
var ts = require('gulp-typescript');
var gulpTypings = require("gulp-typings");
var mainBowerFiles = require('main-bower-files');

gulp.task("default", ["tsc", "copy"]);

gulp.task('typings', function () {
    return gulp.src("./typings.json").pipe(gulpTypings());
});

var tsProject = ts.createProject('./src/tsconfig.json');
gulp.task('tsc', ['typings'], function () {
    var tsResult = gulp.src("src/scripts/**/*.{ts,tsx}", {
        base: "./src"
    }).pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task("copy", ["copy:html", "copy:bower"]);

gulp.task("copy:html", function() {
    return gulp.src("./src/**/*.html", {
        base: "./src"
    }).pipe(gulp.dest("build"));
});

gulp.task("copy:bower", function() {
    return gulp.src(mainBowerFiles({
        paths: "./src"
    }), {
        base: "./src"
    }).pipe(gulp.dest("build"));
});
