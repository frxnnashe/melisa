export const responsiveImagePath = (src, width) =>
  `/responsive${src.slice(0, src.lastIndexOf('.'))}-${width}.webp`

export const responsiveImageSrcSet = (src, originalWidth) => {
  const candidates = [
    `${responsiveImagePath(src, 480)} 480w`,
    `${responsiveImagePath(src, 960)} 960w`,
  ]
  if (originalWidth) candidates.push(`${src} ${originalWidth}w`)
  return candidates.join(', ')
}
