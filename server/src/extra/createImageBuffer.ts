import sharp from 'sharp'

const path = "/home/ahmadsiddique/Projects/Development/cosmatica-project/server/src/extra/hand.jpeg";

const imageBuffer = await sharp(path)
    .resize({
        width: 768,
        withoutEnlargement: true,
    })
    .jpeg({
        quality: 75
    })
    .toBuffer()

export default imageBuffer;
