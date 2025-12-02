import React, { useEffect, useRef, useState } from 'react';

// import '../css/globals.css';

function ImageCropper({ imageFile, onCrop, onCancel, aspectRatio = 2 / 3 }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [zoom, setZoom] = useState(100);
  const [minZoom, setMinZoom] = useState(50);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const CROP_WIDTH = 300;
  const CROP_HEIGHT = 450;

  useEffect(() => {
    if (imageRef.current && canvasRef.current && imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageRef.current.src = e.target.result;
        imageRef.current.onload = () => {
          // Calcular zoom mínimo para que a imagem caiba no preview
          const imgWidth = imageRef.current.width;
          const imgHeight = imageRef.current.height;
          
          // Calcular quanto fazer zoom out para a imagem caber
          const zoomToFitWidth = (CROP_WIDTH / imgWidth) * 100;
          const zoomToFitHeight = (CROP_HEIGHT / imgHeight) * 100;
          const calculatedMinZoom = Math.max(zoomToFitWidth, zoomToFitHeight);
          
          setMinZoom(Math.min(calculatedMinZoom, 100)); // Não deixar maior que 100%
          setZoom(Math.min(calculatedMinZoom, 100)); // Iniciar com zoom mínimo
          setOffsetX(0);
          setOffsetY(0);
          drawCanvas();
        };
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  useEffect(() => {
    drawCanvas();
  }, [zoom, offsetX, offsetY]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    canvas.width = CROP_WIDTH;
    canvas.height = CROP_HEIGHT;

    // Calcular scale com zoom
    const scale = zoom / 100;
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    // Calcular posição com offset e centralização inicial
    const initialX = (CROP_WIDTH - scaledWidth) / 2;
    const initialY = (CROP_HEIGHT - scaledHeight) / 2;
    const x = initialX + offsetX;
    const y = initialY + offsetY;

    // Desenhar
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CROP_WIDTH, CROP_HEIGHT);
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !imageRef.current) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    const scale = zoom / 100;
    const scaledWidth = imageRef.current.width * scale;
    const scaledHeight = imageRef.current.height * scale;

    // Calcular limites máximos de movimento
    // A imagem não pode ir além dos limites do frame
    const maxOffsetX = (scaledWidth - CROP_WIDTH) / 2;
    const maxOffsetY = (scaledHeight - CROP_HEIGHT) / 2;
    const minOffsetX = -maxOffsetX;
    const minOffsetY = -maxOffsetY;

    // Calcular novo offset com limites aplicados
    const newOffsetX = Math.max(minOffsetX, Math.min(maxOffsetX, offsetX + deltaX));
    const newOffsetY = Math.max(minOffsetY, Math.min(maxOffsetY, offsetY + deltaY));

    setOffsetX(newOffsetX);
    setOffsetY(newOffsetY);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleConfirm = () => {
    console.log('🖼️ ImageCropper handleConfirm clicked');
    const canvas = canvasRef.current;
    if (canvas) {
      console.log('  ├─ Canvas size:', canvas.width, 'x', canvas.height);
      console.log('  └─ Calling canvas.toBlob...');
      canvas.toBlob((blob) => {
        console.log('✅ Canvas.toBlob callback triggered');
        console.log('  ├─ Blob size:', blob?.size, 'bytes');
        console.log('  ├─ Blob type:', blob?.type);
        console.log('  └─ Calling onCrop callback...');
        onCrop(blob);
      }, 'image/jpeg', 0.95);
    }
  };

  return (
    <div className="modal active" style={{ display: 'flex' }}>
      <div className="modal-overlay" onClick={onCancel}></div>
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2>Adjust Cover Image</h2>
          <p>Crop your image to 300x450</p>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Preview */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                width: '300px',
                height: '450px',
                border: '3px solid #fada5e',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#000',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          </div>

          {/* Zoom control */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <span style={{ minWidth: '60px', fontSize: '1.1rem' }}>Zoom:</span>
            <input
              type="range"
              min={minZoom}
              max="70"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="zoomSlider"
            />
          </div>

          {/* Hidden image */}
          <img
            ref={imageRef}
            style={{ display: 'none' }}
            alt="crop-source"
          />

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onCancel}
              className="cancelButton"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="createButton"
            >
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;