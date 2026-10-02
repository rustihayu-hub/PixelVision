// Helper to draw sample test images on dynamic canvas
export function drawSampleImage(canvas, type = 'cityscape') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  ctx.clearRect(0, 0, width, height);

  if (type === 'cityscape') {
    // Night Cityscape with buildings & gradient sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#0a0a23');
    skyGrad.addColorStop(0.6, '#1a1c4b');
    skyGrad.addColorStop(1, '#3b1c52');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Moon
    ctx.fillStyle = '#fefcd7';
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.25, 24, 0, Math.PI * 2);
    ctx.fill();

    // Stars
    ctx.fillStyle = '#ffffff';
    const stars = [[30, 20], [80, 40], [150, 25], [220, 60], [310, 30], [360, 70], [120, 80]];
    stars.forEach(([x, y]) => {
      ctx.fillRect(x, y, 2, 2);
    });

    // Buildings
    const buildings = [
      { x: 10, w: 45, h: 140, color: '#111625' },
      { x: 50, w: 60, h: 180, color: '#171e31' },
      { x: 105, w: 40, h: 110, color: '#0d111c' },
      { x: 140, w: 75, h: 210, color: '#1c253c' },
      { x: 210, w: 50, h: 150, color: '#131828' },
      { x: 255, w: 65, h: 195, color: '#1a2238' },
      { x: 315, w: 70, h: 130, color: '#101524' },
    ];

    buildings.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, height - b.h, b.w, b.h);

      // Windows
      ctx.fillStyle = '#fbbf24';
      for (let wx = b.x + 6; wx < b.x + b.w - 8; wx += 10) {
        for (let wy = height - b.h + 12; wy < height - 15; wy += 15) {
          if (Math.sin(wx * wy) > -0.2) {
            ctx.fillRect(wx, wy, 5, 7);
          }
        }
      }
    });

    // Line highlight
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height - 10);
    ctx.lineTo(width, height - 10);
    ctx.stroke();
  } else if (type === 'lenna_geometric') {
    // Geometric test pattern rich in edges and smooth gradients
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#3b82f6');
    grad.addColorStop(0.5, '#ec4899');
    grad.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Shapes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.fillRect(40, 40, 70, 70);

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(width - 40, height - 40);
    ctx.lineTo(width - 110, height - 40);
    ctx.lineTo(width - 75, height - 110);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 5;
    ctx.strokeRect(30, 30, width - 60, height - 60);
  } else if (type === 'coins') {
    // High contrast coins for segmentation & edge detection
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);

    const coins = [
      { x: 80, y: 80, r: 35, val: 'Rp' },
      { x: 220, y: 90, r: 45, val: '500' },
      { x: 320, y: 180, r: 30, val: '100' },
      { x: 130, y: 210, r: 40, val: '1000' },
      { x: 250, y: 240, r: 38, val: '200' },
    ];

    coins.forEach(c => {
      const cg = ctx.createRadialGradient(c.x - 5, c.y - 5, 5, c.x, c.y, c.r);
      cg.addColorStop(0, '#fef08a');
      cg.addColorStop(0.7, '#eab308');
      cg.addColorStop(1, '#854d0e');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#713f12';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.val, c.x, c.y);
    });
  }
}
