// Pure JavaScript Image Processing Algorithms (Canvas API)

// 1. Calculate Histogram Data
export function calculateHistogram(ctx, width, height, bins = 256) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const histogram = new Array(bins).fill(0);
  const binRatio = 256 / bins;

  for (let i = 0; i < data.length; i += 4) {
    // Grayscale luminance conversion (NTSC formula)
    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    const binIndex = Math.min(bins - 1, Math.floor(gray / binRatio));
    histogram[binIndex]++;
  }
  return histogram;
}

// 2. Histogram Equalization
export function applyHistogramEqualization(sourceCtx, targetCtx, width, height, bins = 256) {
  const imgData = sourceCtx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const totalPixels = width * height;

  // Compute histogram
  const hist = new Array(256).fill(0);
  const grays = new Uint8Array(totalPixels);

  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const g = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    grays[j] = g;
    hist[g]++;
  }

  // Compute Cumulative Distribution Function (CDF)
  const cdf = new Array(256).fill(0);
  let cumulative = 0;
  let minCdf = 0;

  for (let i = 0; i < 256; i++) {
    cumulative += hist[i];
    cdf[i] = cumulative;
    if (minCdf === 0 && cumulative > 0) {
      minCdf = cumulative;
    }
  }

  // Quantization level mapping based on bins slider
  const binRatio = 256 / bins;
  const outputData = targetCtx.createImageData(width, height);
  const out = outputData.data;

  for (let i = 0, j = 0; i < out.length; i += 4, j++) {
    const g = grays[j];
    // Standard Histogram Equalization formula
    let eqVal = Math.round(((cdf[g] - minCdf) / (totalPixels - minCdf)) * 255);
    eqVal = Math.max(0, Math.min(255, eqVal));

    // Quantize according to bin count
    const quantized = Math.floor(eqVal / binRatio) * binRatio + binRatio / 2;
    const finalVal = Math.min(255, Math.max(0, Math.round(quantized)));

    out[i] = finalVal;     // R
    out[i + 1] = finalVal; // G
    out[i + 2] = finalVal; // B
    out[i + 3] = 255;      // A
  }

  targetCtx.putImageData(outputData, 0, 0);
  return calculateHistogram(targetCtx, width, height, bins);
}

// 3. Enhancement & Filtering (Gaussian, Median, Average, Sobel)
export function applyFilter(sourceCtx, targetCtx, width, height, filterType, kernelSize = 3) {
  const imgData = sourceCtx.getImageData(0, 0, width, height);
  const src = imgData.data;
  const outputData = targetCtx.createImageData(width, height);
  const dst = outputData.data;
  const half = Math.floor(kernelSize / 2);

  // Convert to grayscale matrix for simplified processing
  const grayMat = new Uint8Array(width * height);
  for (let i = 0, j = 0; i < src.length; i += 4, j++) {
    grayMat[j] = Math.round(0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2]);
  }

  if (filterType === 'average') {
    const kArea = kernelSize * kernelSize;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sum = 0;
        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const px = Math.min(width - 1, Math.max(0, x + kx));
            const py = Math.min(height - 1, Math.max(0, y + ky));
            sum += grayMat[py * width + px];
          }
        }
        const idx = (y * width + x) * 4;
        const avg = Math.round(sum / kArea);
        dst[idx] = dst[idx + 1] = dst[idx + 2] = avg;
        dst[idx + 3] = 255;
      }
    }
  } else if (filterType === 'gaussian') {
    // Generate 2D Gaussian Kernel
    const sigma = Math.max(0.8, kernelSize / 3);
    const kernel = [];
    let kSum = 0;
    for (let y = -half; y <= half; y++) {
      const row = [];
      for (let x = -half; x <= half; x++) {
        const val = Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
        row.push(val);
        kSum += val;
      }
      kernel.push(row);
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sum = 0;
        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const px = Math.min(width - 1, Math.max(0, x + kx));
            const py = Math.min(height - 1, Math.max(0, y + ky));
            sum += grayMat[py * width + px] * kernel[ky + half][kx + half];
          }
        }
        const idx = (y * width + x) * 4;
        const val = Math.round(sum / kSum);
        dst[idx] = dst[idx + 1] = dst[idx + 2] = val;
        dst[idx + 3] = 255;
      }
    }
  } else if (filterType === 'median') {
    const windowVals = new Uint8Array(kernelSize * kernelSize);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let count = 0;
        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const px = Math.min(width - 1, Math.max(0, x + kx));
            const py = Math.min(height - 1, Math.max(0, y + ky));
            windowVals[count++] = grayMat[py * width + px];
          }
        }
        // Insertion sort for performance
        for (let i = 1; i < count; i++) {
          const key = windowVals[i];
          let j = i - 1;
          while (j >= 0 && windowVals[j] > key) {
            windowVals[j + 1] = windowVals[j];
            j--;
          }
          windowVals[j + 1] = key;
        }
        const median = windowVals[Math.floor(count / 2)];
        const idx = (y * width + x) * 4;
        dst[idx] = dst[idx + 1] = dst[idx + 2] = median;
        dst[idx + 3] = 255;
      }
    }
  } else if (filterType === 'sobel') {
    applyEdgeDetection(sourceCtx, targetCtx, width, height, 'sobel', { lowThreshold: 30 });
    return;
  }

  targetCtx.putImageData(outputData, 0, 0);
}

// 4. Segmentation & Edge Detection (Sobel, Canny, Prewitt, Laplacian)
export function applyEdgeDetection(sourceCtx, targetCtx, width, height, algorithm, params = {}) {
  const { lowThreshold = 30, highThreshold = 100 } = params;
  const imgData = sourceCtx.getImageData(0, 0, width, height);
  const src = imgData.data;
  const outputData = targetCtx.createImageData(width, height);
  const dst = outputData.data;

  // Convert to Grayscale
  const gray = new Uint8Array(width * height);
  for (let i = 0, j = 0; i < src.length; i += 4, j++) {
    gray[j] = Math.round(0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2]);
  }

  if (algorithm === 'sobel') {
    const Gx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    const Gy = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const val = gray[(y + ky) * width + (x + kx)];
            gx += val * Gx[ky + 1][kx + 1];
            gy += val * Gy[ky + 1][kx + 1];
          }
        }
        const mag = Math.sqrt(gx * gx + gy * gy);
        const edgeVal = mag >= lowThreshold ? Math.min(255, Math.round(mag)) : 0;
        const idx = (y * width + x) * 4;
        dst[idx] = dst[idx + 1] = dst[idx + 2] = edgeVal;
        dst[idx + 3] = 255;
      }
    }
  } else if (algorithm === 'prewitt') {
    const Gx = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]];
    const Gy = [[-1, -1, -1], [0, 0, 0], [1, 1, 1]];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const val = gray[(y + ky) * width + (x + kx)];
            gx += val * Gx[ky + 1][kx + 1];
            gy += val * Gy[ky + 1][kx + 1];
          }
        }
        const mag = Math.sqrt(gx * gx + gy * gy);
        const edgeVal = mag >= lowThreshold ? Math.min(255, Math.round(mag)) : 0;
        const idx = (y * width + x) * 4;
        dst[idx] = dst[idx + 1] = dst[idx + 2] = edgeVal;
        dst[idx + 3] = 255;
      }
    }
  } else if (algorithm === 'laplacian') {
    const kernel = [[0, 1, 0], [1, -4, 1], [0, 1, 0]];
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            sum += gray[(y + ky) * width + (x + kx)] * kernel[ky + 1][kx + 1];
          }
        }
        const val = Math.min(255, Math.max(0, Math.abs(sum)));
        const edgeVal = val >= lowThreshold ? val : 0;
        const idx = (y * width + x) * 4;
        dst[idx] = dst[idx + 1] = dst[idx + 2] = edgeVal;
        dst[idx + 3] = 255;
      }
    }
  } else if (algorithm === 'canny') {
    // Multi-stage Canny Edge Detection
    // 1. Gaussian Blur (3x3)
    const blurred = new Float32Array(width * height);
    const gKernel = [[1/16, 2/16, 1/16], [2/16, 4/16, 2/16], [1/16, 2/16, 1/16]];
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let bVal = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            bVal += gray[(y + ky) * width + (x + kx)] * gKernel[ky + 1][kx + 1];
          }
        }
        blurred[y * width + x] = bVal;
      }
    }

    // 2. Gradients & Angles
    const magMat = new Float32Array(width * height);
    const dirMat = new Float32Array(width * height);
    const Gx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    const Gy = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const val = blurred[(y + ky) * width + (x + kx)];
            gx += val * Gx[ky + 1][kx + 1];
            gy += val * Gy[ky + 1][kx + 1];
          }
        }
        magMat[y * width + x] = Math.sqrt(gx * gx + gy * gy);
        let angle = (Math.atan2(gy, gx) * 180) / Math.PI;
        if (angle < 0) angle += 180;
        dirMat[y * width + x] = angle;
      }
    }

    // 3. Non-Maximum Suppression
    const nms = new Float32Array(width * height);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const m = magMat[y * width + x];
        const angle = dirMat[y * width + x];
        let q = 255, r = 255;

        // Angle sectoring
        if ((angle >= 0 && angle < 22.5) || (angle >= 157.5 && angle <= 180)) {
          q = magMat[y * width + (x + 1)];
          r = magMat[y * width + (x - 1)];
        } else if (angle >= 22.5 && angle < 67.5) {
          q = magMat[(y - 1) * width + (x + 1)];
          r = magMat[(y + 1) * width + (x - 1)];
        } else if (angle >= 67.5 && angle < 112.5) {
          q = magMat[(y - 1) * width + x];
          r = magMat[(y + 1) * width + x];
        } else if (angle >= 112.5 && angle < 157.5) {
          q = magMat[(y - 1) * width + (x - 1)];
          r = magMat[(y + 1) * width + (x + 1)];
        }

        if (m >= q && m >= r) {
          nms[y * width + x] = m;
        } else {
          nms[y * width + x] = 0;
        }
      }
    }

    // 4. Double Thresholding & Hysteresis
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const val = nms[y * width + x];
        let finalEdge = 0;
        if (val >= highThreshold) {
          finalEdge = 255;
        } else if (val >= lowThreshold) {
          // Check 8-connected neighbors for strong edges
          let isConnected = false;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              if (nms[(y + ky) * width + (x + kx)] >= highThreshold) {
                isConnected = true;
                break;
              }
            }
          }
          finalEdge = isConnected ? 255 : 0;
        }

        const idx = (y * width + x) * 4;
        dst[idx] = dst[idx + 1] = dst[idx + 2] = finalEdge;
        dst[idx + 3] = 255;
      }
    }
  }

  targetCtx.putImageData(outputData, 0, 0);
}
