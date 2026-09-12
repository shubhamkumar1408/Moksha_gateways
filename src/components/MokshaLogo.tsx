import React from 'react';

interface MokshaLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MokshaLogo: React.FC<MokshaLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  size = 'md'
}) => {
  const sizeMap = {
    sm: { img: 'h-8', textTitle: 'text-base', textSub: 'text-[9px]' },
    md: { img: 'h-11', textTitle: 'text-xl', textSub: 'text-[10px]' },
    lg: { img: 'h-14', textTitle: 'text-2xl', textSub: 'text-xs' },
    xl: { img: 'h-20', textTitle: 'text-3xl', textSub: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <img
          src="./logo.png"
          alt="Moksha Gateways Logo"
          referrerPolicy="no-referrer"
          className={`${currentSize.img} w-auto object-contain rounded-lg shadow-sm`}
          onError={(e) => {
            // Fallback to custom stylized MG monogram if image is loading
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Logo Graphic */}
      <div className="relative shrink-0 rounded-xl overflow-hidden p-0.5 bg-white/95 shadow-md shadow-black/10 border border-slate-200/50">
        <img
          src="./logo.png"
          alt="Moksha Gateways Logo"
          referrerPolicy="no-referrer"
          className={`${currentSize.img} w-auto object-contain`}
        />
      </div>

      {variant === 'compact' && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-['Cinzel'] tracking-wider font-extrabold ${currentSize.textTitle} ${theme === 'dark' ? 'text-white' : 'text-[#0B2545]'}`}>
            MOKSHA
          </span>
          <span className={`font-['Cinzel'] tracking-widest font-extrabold ${currentSize.textTitle} text-[#ff6a00]`}>
            GATEWAYS
          </span>
        </div>
      )}

      {/* Typography with exact Brand Color Grading (White/Navy MOKSHA + Orange GATEWAYS) */}
      {variant === 'full' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 leading-none">
            <span className={`font-['Cinzel'] tracking-wider font-extrabold ${currentSize.textTitle} ${theme === 'dark' ? 'text-white' : 'text-[#0B2545]'}`}>
              MOKSHA
            </span>
            <span className={`font-['Cinzel'] tracking-widest font-extrabold ${currentSize.textTitle} text-[#ff6a00]`}>
              GATEWAYS
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className={`h-[1.5px] w-4 ${theme === 'dark' ? 'bg-amber-400' : 'bg-[#0B2545]'}`} />
            <span
              className={`text-[9px] uppercase tracking-widest font-bold ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Himalayan Treks • Sacred Yatras • Holidays
            </span>
            <div className="h-[1.5px] w-4 bg-[#ff6a00]" />
          </div>
        </div>
      )}
    </div>
  );
};
