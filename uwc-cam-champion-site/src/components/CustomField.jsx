import { useState } from "react";

const Field = ({ bg_color, type, password, placeholder }) => {
    return (
        <input
            type={password ? "password" : type}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg text-white placeholder-white/50 border border-white/20 outline-none ${bg_color}`}
        />
    );
};

export default Field;