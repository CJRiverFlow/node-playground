//import dependencies
var fs  = require('fs')
var jimp = require('jimp')

var image_path = './images/108436_1_09032020_0857586850.jpg'

//encoding function
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}

//decoding and saving images
function base64_decode(file) {
    var buff = Buffer.from(file, 'base64'); 
    fs.writeFile('sample.png', buff, (err) => {
        if (err) throw err;
        console.log('Decoding done');
    });
}


//Simulating the pipeline as image is received as base64
var bitmap = base64_encode(image_path); //image base64 string

var buffer = Buffer.from(bitmap, 'base64');
var [x, y, width, height] = [140, 50, 200, 280]

jimp.read(buffer, (err, image) => {
    if (err) throw err;
    else {
      image.crop(x, y, width, height)
        .quality(100)
        .getBase64(jimp.MIME_JPEG, function (err, src) {
          console.log("Base64 string recortado: \n")
          console.log(src)
          //Guardando la imagen para revisión DEV
          base64_decode(src)
          console.log("Recortado y guardado")
          return src  
        })
    }
  })






