import React from 'react';

interface IconProps {
  className?: string;
}

// Google Voice: Transparent - needs padding to not touch edges
export const GoogleVoiceIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://img.icons8.com/color/512/google-voice.png" 
    className={`${className} object-contain p-1.5`}
    alt="Google Voice"
  />
);

// TextNow: Transparent/Favicon - needs padding
export const TextNowIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://www.textnow.com/favicon.ico" 
    className={`${className} object-contain p-2`}
    alt="TextNow"
  />
);

// Gmail: Transparent - needs padding
export const GmailIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/100px-Gmail_icon_%282020%29.svg.png" 
    className={`${className} object-contain p-1.5`}
    alt="Gmail"
  />
);

// Talkatone: Full Tile - covers corners
export const TalkatoneIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://i.postimg.cc/VLJZhqv3/images-(4).jpg" 
    className={`${className} object-cover`}
    alt="Talkatone"
  />
);

// TextFree: Full Tile - covers corners
export const TextFreeIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://i.postimg.cc/VkRYL1sd/Textfree_App_Logomark.png" 
    className={`${className} object-cover`}
    alt="TextFree"
  />
);

// TextPlus: Full Tile - covers corners
export const TextPlusIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://i.postimg.cc/MK0wdxQL/images.jpg" 
    className={`${className} object-cover`}
    alt="TextPlus"
  />
);

// TextMe: Full Tile - covers corners
export const TextMeIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://i.postimg.cc/9F254Snq/unnamed.png" 
    className={`${className} object-cover`}
    alt="TextMe"
  />
);

// Dingtone: Full Tile - covers corners
export const DingtoneIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://i.postimg.cc/HszKrL5g/images_(2).jpg" 
    className={`${className} object-cover`}
    alt="Dingtone"
  />
);

// Ring4: Full Tile - covers corners
export const Ring4Icon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://i.postimg.cc/d0pgJSCk/images_(1).jpg" 
    className={`${className} object-cover`}
    alt="Ring4"
  />
);

// Sideline: Full Tile - covers corners
export const SidelineIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://i.postimg.cc/280czKR5/images_(3).jpg" 
    className={`${className} object-cover`}
    alt="Sideline"
  />
);

// GV Setup: Grey Gear Icon
export const GVSetupIcon: React.FC<IconProps> = ({ className }) => (
    <div className={`${className} flex items-center justify-center bg-slate-500/10`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gear_grad" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#94A3B8"/>
                    <stop offset="100%" stopColor="#475569"/>
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="22" fill="url(#gear_grad)"/>
            <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="6" strokeDasharray="8 8" strokeLinecap="round" />
            <circle cx="50" cy="50" r="10" fill="white"/>
            <path d="M50 20 V 28 M50 72 V 80 M80 50 H 72 M28 50 H 20" stroke="white" strokeWidth="6" strokeLinecap="round"/>
        </svg>
    </div>
);