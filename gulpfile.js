const { src, dest, watch, parallel, series } = require('gulp');

// Dependencias de CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');


//Dependencias de Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css(done) {
    //compilar sass
    // 1 identificar archivo, -- 2 compilaral --3 Guardar el .css
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));
    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 })) //minificar imagenes
        .pipe(dest('build/img'));
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}



exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series(imagenes, versionWebp, css, dev); // se inicia una tarea y hasta que finaliza inicia la otra
// exports.default = parallel(css, dev);     Todas inician al mismo tiempo