const decorationSets = {
    rain: [
        { left: '6%', delay: '0s', duration: '5.2s', height: '92px', opacity: 0.42 },
        { left: '14%', delay: '1.2s', duration: '6.4s', height: '120px', opacity: 0.3 },
        { left: '22%', delay: '0.5s', duration: '5.9s', height: '78px', opacity: 0.45 },
        { left: '31%', delay: '2.1s', duration: '6.8s', height: '108px', opacity: 0.28 },
        { left: '39%', delay: '1.6s', duration: '5.7s', height: '96px', opacity: 0.4 },
        { left: '47%', delay: '0.9s', duration: '6.1s', height: '84px', opacity: 0.34 },
        { left: '56%', delay: '2.6s', duration: '6.6s', height: '124px', opacity: 0.25 },
        { left: '64%', delay: '1.1s', duration: '5.4s', height: '90px', opacity: 0.4 },
        { left: '72%', delay: '0.2s', duration: '6.2s', height: '104px', opacity: 0.3 },
        { left: '80%', delay: '1.9s', duration: '5.8s', height: '80px', opacity: 0.42 },
        { left: '88%', delay: '0.7s', duration: '6.7s', height: '116px', opacity: 0.26 },
    ],
    dots: [
        { left: '8%', top: '18%', size: '8px', delay: '0s' },
        { left: '18%', top: '72%', size: '10px', delay: '0.8s' },
        { left: '26%', top: '30%', size: '6px', delay: '0.3s' },
        { left: '34%', top: '64%', size: '12px', delay: '1.1s' },
        { left: '48%', top: '22%', size: '7px', delay: '0.6s' },
        { left: '58%', top: '74%', size: '9px', delay: '1.4s' },
        { left: '70%', top: '28%', size: '6px', delay: '0.2s' },
        { left: '82%', top: '58%', size: '11px', delay: '0.9s' },
    ],
    squares: [
        { left: '10%', top: '18%', size: '14px', delay: '0s', rotate: '12deg' },
        { left: '20%', top: '68%', size: '18px', delay: '1s', rotate: '-8deg' },
        { left: '34%', top: '26%', size: '12px', delay: '0.4s', rotate: '22deg' },
        { left: '50%', top: '70%', size: '16px', delay: '1.3s', rotate: '-14deg' },
        { left: '66%', top: '20%', size: '10px', delay: '0.7s', rotate: '18deg' },
        { left: '78%', top: '62%', size: '20px', delay: '1.6s', rotate: '-20deg' },
    ],
};

export default function RetroDecorations({ variant = 'dots' }) {
    const decorations = decorationSets[variant] || decorationSets.dots;
    const wrapperClassName = 'retro-decorations absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ease-out';

    if (variant === 'rain') {
        return (
            <div className={wrapperClassName} aria-hidden="true">
                {decorations.map((drop, idx) => (
                    <span
                        key={idx}
                        className="rain-drop transition-all duration-500 ease-out group-hover:opacity-80 group-hover:translate-x-2 group-hover:scale-y-110"
                        style={{
                            left: drop.left,
                            animationDelay: drop.delay,
                            animationDuration: drop.duration,
                            height: drop.height,
                            opacity: drop.opacity,
                        }}
                    />
                ))}
            </div>
        );
    }

    if (variant === 'squares') {
        return (
            <div className={wrapperClassName} aria-hidden="true">
                {decorations.map((item, idx) => (
                    <span
                        key={idx}
                        className="retro-square transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-125 group-hover:border-emerald-300/85 group-hover:shadow-emerald-500/30"
                        style={{
                            left: item.left,
                            top: item.top,
                            width: item.size,
                            height: item.size,
                            animationDelay: item.delay,
                            '--rotate': item.rotate,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={wrapperClassName} aria-hidden="true">
            {decorations.map((item, idx) => (
                <span
                    key={idx}
                    className="retro-dot transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-150 group-hover:opacity-100 group-hover:shadow-emerald-400/40"
                    style={{
                        left: item.left,
                        top: item.top,
                        width: item.size,
                        height: item.size,
                        animationDelay: item.delay,
                    }}
                />
            ))}
        </div>
    );
}