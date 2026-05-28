import { useState } from "react";

const Button = ({ text, icon: Icon = null, iconSize = 28 }) => {
    return (
        <div>
            <button className="group flex items-center justify-center gap-2 text-white rounded-lg border border-white/40  py-2 px-8 mt-6 hover:bg-white/20 hover:bg-white/20">
                {text}
                {Icon && <Icon size={iconSize} className="group-hover:text-black/20 transition-colors" />}
            </button>
        </div>
    );
};

export default Button;