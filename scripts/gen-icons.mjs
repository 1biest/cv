import sharp from 'sharp';
import fs from 'node:fs';

const src = 'public/logan-biesterfeldt-headshot.png';

function circleMask(size) {
  const r = size / 2;
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`
  );
}

async function round(size) {
  return sharp(src)
    .resize(size, size)
    .composite([{ input: circleMask(size), blend: 'dest-in' }])
    .png()
    .toBuffer();
}

function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const datas = [];

  images.forEach((im, i) => {
    const o = i * 16;
    dir.writeUInt8(im.size >= 256 ? 0 : im.size, o);
    dir.writeUInt8(im.size >= 256 ? 0 : im.size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(im.buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += im.buf.length;
    datas.push(im.buf);
  });

  return Buffer.concat([header, dir, ...datas]);
}

const main = async () => {
  fs.writeFileSync('app/icon.png', await round(512));
  fs.writeFileSync('app/apple-icon.png', await round(180));

  const sizes = [16, 32, 48];
  const images = [];
  for (const size of sizes) {
    images.push({ size, buf: await round(size) });
  }
  fs.writeFileSync('app/favicon.ico', buildIco(images));
  console.log('circular icons written');
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
