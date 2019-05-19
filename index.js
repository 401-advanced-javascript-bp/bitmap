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
  // console.log(`This represents buffer on Bitmap.parse: ${this.buffer}`); broken
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
  // for (let) i = 0; i < keys.length; i++){
  //   let val = bmp[keys[i]];
  // }
  var bufferKeys = Object.keys(bmp.buffer);

  console.log('Exposing keys on bmp object:', keys);
  console.log('Exposing typeof for bmp file property:', (typeof bmp.file) );
  // console.log('Exposing typeof for bmp file property:', (typeof bmp[keys[0]]) );
  console.log('Exposing typeof for bmp buffer property:', (typeof bmp.buffer) );
  // console.log('Exposing typeof for bmp buffer property:', (typeof bmp[keys[1]]) );
  console.log('Exposing typeof for bmp type property:', (typeof bmp.type) );
  // console.log('Exposing typeof for bmp type property:', (typeof bmp[keys[2]]) );

  console.log('Exposing keys on bmp.buffer object:', bufferKeys);
  console.log('Exposing typeof for keys on bmp.buffer:*', (typeof bufferKeys) );
  console.log('Exposing typeof for first key on bmp.buffer:**', (typeof bmp.buffer[bufferKeys[0]]) );
  console.log('Exposing value for first bmp.buffer property:***', (bmp.buffer[bufferKeys[0]]) );

  console.log('Exposing values for all bmp.buffer properties:****', (bmp.buffer[bufferKeys]) );

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

