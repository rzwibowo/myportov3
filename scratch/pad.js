const { Jimp } = require('jimp');

async function padImage() {
  try {
    const image = await Jimp.read('/Users/mymac/Downloads/logo.0be9526b.png');
    const maxDim = Math.max(image.bitmap.width, image.bitmap.height);
    
    // Create a new image with max dimension, transparent background
    const bg = new Jimp({ width: maxDim, height: maxDim, color: 0x00000000 });
    const x = Math.floor((maxDim - image.bitmap.width) / 2);
    const y = Math.floor((maxDim - image.bitmap.height) / 2);
    
    bg.composite(image, x, y);
    bg.resize({ w: 128, h: 128 });
    await bg.write('/Users/mymac/Projects/nuxt/wibowo-portf/public/favicon.png');
    console.log('Success');
  } catch (err) {
    console.error(err);
  }
}

padImage();
