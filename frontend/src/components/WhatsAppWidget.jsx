import React from 'react';
import { NGO_INFO } from '../data/ngoData';

  const whatsappUrl = NGO_INFO.whatsapp.startsWith('http')
    ? NGO_INFO.whatsapp
    : `https://wa.me/${NGO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Give%20Smile%20Foundation%2C%20I%20would%20like%20to%20know%20more%20about%20your%20NGO%20initiatives.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer border-2 border-white/30 select-none pointer-events-auto"
      title="Chat with Give Smile NGO on WhatsApp"
      aria-label="WhatsApp Support"
    >
      <div className="relative flex items-center justify-center pointer-events-none">
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.852 0-3.664-.499-5.253-1.442l-.377-.225-3.905 1.024 1.042-3.807-.247-.393c-1.036-1.648-1.583-3.551-1.583-5.503 0-5.65 4.596-10.247 10.246-10.247 2.737 0 5.309 1.066 7.243 3.001 1.935 1.936 3.001 4.508 3.001 7.245 0 5.65-4.596 10.247-10.246 10.247m0-18.796c-4.71 0-8.541 3.831-8.541 8.549 0 1.847.591 3.555 1.694 4.966l-.669 2.443 2.502-.656c1.353.945 2.97 1.492 4.673 1.492 4.71 0 8.541-3.831 8.541-8.549 0-4.718-3.831-8.549-8.541-8.549"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
      </div>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-black text-xs ml-0 group-hover:ml-2.5 text-white pointer-events-none">
        WhatsApp Support
      </span>
    </a>
  );
}
