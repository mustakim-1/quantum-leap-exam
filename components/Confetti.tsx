
import React, { useEffect, useState } from 'react';

const ConfettiPiece: React.FC<{ id: number }> = ({ id }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const colors = ['#007BFF', '#FFFFFF', '#34C759', '#FFD60A'];
    setStyle({
      left: `${Math.random() * 100}vw`,
      top: `${-10 - Math.random() * 20}px`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      transform: `rotate(${Math.random() * 360}deg)`,
      animation: `fall ${4 + Math.random() * 4}s linear forwards`,
      position: 'fixed',
      width: `${8 + Math.random() * 8}px`,
      height: `${8 + Math.random() * 8}px`,
      opacity: 1,
      zIndex: 1000,
    });
  }, [id]);

  return <div style={style}></div>;
};

const Confetti: React.FC = () => {
    const [pieces, setPieces] = useState<number[]>([]);

    useEffect(() => {
        const confettiKeyframes = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.innerText = confettiKeyframes;
        document.head.appendChild(styleSheet);
        
        setPieces(Array.from({ length: 150 }, (_, i) => i));

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {pieces.map(i => <ConfettiPiece key={i} id={i} />)}
        </div>
    );
};

export default Confetti;
