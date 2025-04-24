import React from 'react'
import { motion } from "framer-motion";

export const NameText = ({classNameContainer,classNameSayhai, className }: {classNameContainer?: string,classNameSayhai?: string, className?: string}) => {
  return (
    <div className={`${classNameContainer}`}>
      <h1 className={`${classNameSayhai} text-2xl font-bold text-primary flex items-center justify-center md:justify-start`} >
            <motion.span
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="inline-block"
            >
              👋
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              Hello, I'm
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-pulse"></span>
            </motion.span>
          </h1>
       
          <h1 className={`${className} text-4xl font-bold text-primary`}>Glen Rio Aristo</h1>
    </div>
  )
}
