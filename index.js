'use strict';

const fs = require('fs');

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */

function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  //... and so on
  // console.log(`This represents buffer on Bitmap.parse: ${this.buffer}`); //come back

};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
//operation === 'invert' || 'greyscale';
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
//transforms['invert']
//resolves to doTheInversion(this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`); //finds the text 'bmp' and replaces it with the second parameter. This is not a string AND the . is not included, so I assume this is meant to point to the bmp variable. I may be wrong.
};

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);
  //currently bmp is an object with file, buffer, and type properties

  //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it. //How?
  var keys = Object.keys(bmp);
 
  var bmpBuffer = bmp.buffer;
  var bufferKeys = Object.keys(bmp.buffer);
  var bufferVals = Object.values(bmp.buffer);
  console.log('Exposing keys on bmp object:', keys);
  console.log('Exposing typeof for bmp file property:', (typeof bmp.file) );
 
  console.log('Exposing typeof for bmp buffer property:', (typeof bmp.buffer) );
 
  console.log('Exposing typeof for bmp type property:', (typeof bmp.type) );

  console.log('Exposing keys on bmp.buffer OBJECT:', bufferKeys);
  console.log('Exposing typeof for keys on bmp.buffer:*', (typeof bufferKeys) );

  // This breaks, which leads me to believe that it is an ArrayBuffer: console.log((bmp.buffer[bufferKeys.length] );
  console.log('Exposing ***values on bmp.buffer ***OBJECT. I think these are CharCodes:', bufferVals);
  // console.log('Exposing character codes for first six bytes of ArrayBuffer:', String.fromCharCode(bufferVals[0,6]));

  let json = JSON.stringify(bmpBuffer);
  console.log('Exposing JSON.stringify of bmpBuffer$$$:', json);
  
  // for (let i = 0; i <= bmpBuffer.length; i++){
  //   while (i == 255){
  //     let i = i + 100;
  //   }
  // }
  // let buf = bmpBuffer.data.allocUnsafe(10);
  // console.log('This is the allocUnsafe method', buf);
  // console.log('What is this?', bmp.buffer);

  // console.log('Exposing ArrayBuffer:', Buffer.from(bmp.buffer[1[15145]]));

  // console.log('Exposing ArrayBuffer:', Buffer.from(bmpBuffer);

  console.log('Exposing bmp.buffer; should look like an ArrayBuffer object:', (bmpBuffer) );
  // let workingbuffer = new ArrayBuffer(8);
  // console.log('workingbuffer byte length:', workingbuffer.byteLength);

  ArrayBuffer.transfer(bmp.buffer [8]);
  
  // console.log('Exposing length of ArrayBuffer object:', (bmp.buffer.length) );

  //TODO: alter bmp to make the image greyscale ...

};

const doTheInversion = (bmp) => {
  bmp = {};
}

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
  invert: doTheInversion
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and the new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2); //If file is defined here, it will be used for the bitmap instance below. For example: If we run: node index.js ./assets/baldy.bmp invert , then file will be assigned: ./assets/baldy.bmp 
//The same is true that operation will be assigned here. This will work in production, but in order to avoid in deployment, we should define our own constants
//can a const be an array?

let bitmap = new Bitmap(file); //file is ./assets/baldy.bmp

transformWithCallbacks();

