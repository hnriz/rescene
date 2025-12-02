import React, { useEffect, useRef, useState } from 'react';

// import '../css/globals.css';

function CortadorImagem({ arquivo, aoCortar, aoCancel, proporçãoAspecto = 2 / 3 }) {
  const canvasRef = useRef(null);
  const imagemRef = useRef(null);
  const [zoom, setZoom] = useState(100);
  const [zoomMínimo, setZoomMínimo] = useState(50);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [estáArrastando, setEstáArrastando] = useState(false);
  const [inicioDrag, setInicioDrag] = useState({ x: 0, y: 0 });

  const LARGURA_CROP = 300;
  const ALTURA_CROP = 450;

  useEffect(() => {
    if (imagemRef.current && canvasRef.current && arquivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagemRef.current.src = e.target.result;
        imagemRef.current.onload = () => {
          // Calcular zoom mínimo para que a imagem caiba no preview
          const larguraImg = imagemRef.current.width;
          const alturaImg = imagemRef.current.height;
          
          // Calcular quanto fazer zoom out para a imagem caber
          const zoomParaCaberLargura = (LARGURA_CROP / larguraImg) * 100;
          const zoomParaCaberAltura = (ALTURA_CROP / alturaImg) * 100;
          const zoomCalculado = Math.max(zoomParaCaberLargura, zoomParaCaberAltura);
          
          setZoomMínimo(Math.min(zoomCalculado, 100));
          setZoom(Math.min(zoomCalculado, 100));
          setOffsetX(0);
          setOffsetY(0);
          desenharCanvas();
        };
      };
      reader.readAsDataURL(arquivo);
    }
  }, [arquivo]);

  useEffect(() => {
    desenharCanvas();
  }, [zoom, offsetX, offsetY]);

  const desenharCanvas = () => {
    const canvas = canvasRef.current;
    const img = imagemRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    canvas.width = LARGURA_CROP;
    canvas.height = ALTURA_CROP;

    // Calcular escala com zoom
    const escala = zoom / 100;
    const larguraEscalada = img.width * escala;
    const alturaEscalada = img.height * escala;

    // Calcular posição com offset e centralização inicial
    const xInicial = (LARGURA_CROP - larguraEscalada) / 2;
    const yInicial = (ALTURA_CROP - alturaEscalada) / 2;
    const x = xInicial + offsetX;
    const y = yInicial + offsetY;

    // Desenhar
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, LARGURA_CROP, ALTURA_CROP);
    ctx.drawImage(img, x, y, larguraEscalada, alturaEscalada);
  };

  const handleMouseDown = (e) => {
    setEstáArrastando(true);
    setInicioDrag({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!estáArrastando || !imagemRef.current) return;

    const deltaX = e.clientX - inicioDrag.x;
    const deltaY = e.clientY - inicioDrag.y;

    const escala = zoom / 100;
    const larguraEscalada = imagemRef.current.width * escala;
    const alturaEscalada = imagemRef.current.height * escala;

    // Calcular limites máximos de movimento
    // A imagem não pode ir além dos limites do frame
    const maxOffsetX = (larguraEscalada - LARGURA_CROP) / 2;
    const maxOffsetY = (alturaEscalada - ALTURA_CROP) / 2;
    const minOffsetX = -maxOffsetX;
    const minOffsetY = -maxOffsetY;

    // Calcular novo offset com limites aplicados
    const novoOffsetX = Math.max(minOffsetX, Math.min(maxOffsetX, offsetX + deltaX));
    const novoOffsetY = Math.max(minOffsetY, Math.min(maxOffsetY, offsetY + deltaY));

    setOffsetX(novoOffsetX);
    setOffsetY(novoOffsetY);
    setInicioDrag({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setEstáArrastando(false);
  };

  const handleConfirm = () => {
    console.log('🖼️ CortadorImagem handleConfirm clicado');
    const canvas = canvasRef.current;
    if (canvas) {
      console.log('  ├─ Tamanho do Canvas:', canvas.width, 'x', canvas.height);
      console.log('  └─ Chamando canvas.toBlob...');
      canvas.toBlob((blob) => {
        console.log('✅ Callback canvas.toBlob disparado');
        console.log('  ├─ Tamanho do Blob:', blob?.size, 'bytes');
        console.log('  ├─ Tipo do Blob:', blob?.type);
        console.log('  └─ Chamando callback aoCortar...');
        aoCortar(blob);
      }, 'image/jpeg', 0.95);
    }
  };

  return (
    <div className="modal active" style={{ display: 'flex' }}>
      <div className="modal-overlay" onClick={aoCancel}></div>
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2>Ajustar Imagem de Capa</h2>
          <p>Corte sua imagem para 300x450</p>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Prévia */}
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
                cursor: estáArrastando ? 'grabbing' : 'grab'
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

          {/* Controle de zoom */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <span style={{ minWidth: '60px', fontSize: '1.1rem' }}>Zoom:</span>
            <input
              type="range"
              min={zoomMínimo}
              max="70"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="zoomSlider"
            />
            <span style={{ minWidth: '40px', fontSize: '0.9rem' }}>{Math.round(zoom)}%</span>
          </div>

          {/* Imagem oculta */}
          <img
            ref={imagemRef}
            style={{ display: 'none' }}
            alt="fonte-corte"
          />

          {/* Botões */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={aoCancel}
              className="cancelButton"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="createButton"
            >
              Aplicar Corte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CortadorImagem;