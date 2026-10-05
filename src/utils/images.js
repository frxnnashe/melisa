export const responsiveImagePath = (src, width) =>
  `/responsive${src.slice(0, src.lastIndexOf('.'))}-${width}.webp`

export const responsiveImageSrcSet = (src) =>
  `${responsiveImagePath(src, 480)} 480w, ${responsiveImagePath(src, 960)} 960w`
