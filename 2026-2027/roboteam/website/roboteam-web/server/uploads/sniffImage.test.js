import assert from 'node:assert/strict'
import test from 'node:test'
import { sniffImage } from './sniffImage.js'

const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46])
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00])
const webp = Buffer.concat([
  Buffer.from('RIFF'),
  Buffer.from([0x24, 0x00, 0x00, 0x00]),
  Buffer.from('WEBP'),
  Buffer.from('VP8 '),
])

test('a JPEG is a jpg', () => {
  assert.deepEqual(sniffImage(jpeg), { ext: 'jpg', mime: 'image/jpeg' })
})

test('a PNG is a png', () => {
  assert.deepEqual(sniffImage(png), { ext: 'png', mime: 'image/png' })
})

test('a WEBP is a webp', () => {
  assert.deepEqual(sniffImage(webp), { ext: 'webp', mime: 'image/webp' })
})

test('an SVG is refused, whatever it is named', () => {
  // SVG can carry scripts, so it is not an image we will serve.
  assert.equal(sniffImage(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg">')), null)
})

test('a text file renamed .jpg is refused', () => {
  assert.equal(sniffImage(Buffer.from('this is not an image at all')), null)
})

test('RIFF that is not WEBP is refused', () => {
  const wav = Buffer.concat([Buffer.from('RIFF'), Buffer.from([1, 2, 3, 4]), Buffer.from('WAVE')])
  assert.equal(sniffImage(wav), null)
})

test('a header too short to judge is refused, not read past', () => {
  assert.equal(sniffImage(Buffer.from([0xff])), null)
  assert.equal(sniffImage(Buffer.alloc(0)), null)
})
