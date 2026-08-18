import React from "react";

const Field = ({ bg_color = "bg-white/10", type = "text", password, placeholder, value, onChange }) => {
  return (
    <input
      type={password ? "password" : type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 rounded-lg text-white placeholder-white/50 border border-white/20 outline-none transition-all focus:border-white/50 ${bg_color}`}
    />
  );
};

export default Field;