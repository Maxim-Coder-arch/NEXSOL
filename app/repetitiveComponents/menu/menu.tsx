'use client';

import "../../styles/menu/menu.scss";
import { motion } from "framer-motion";
import { data } from "@/data/menu.data";

const Menu = () => {
  return (
    <nav className="menu">
      <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="logo-block">
        <div className="logotype-company"></div>
        <span>NEXSOL</span>
      </motion.div>
      <ul>
        {
          data.map((item, index) => (
            <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: .5,
              delay: .1 * index
            }}
            key={index}>
              <a href={item.link}>{item.label}</a>
            </motion.li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Menu;