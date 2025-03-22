import { AnimatePresence, motion } from "framer-motion";

const FloatingIcons = ({ floatingIcons }) => {
  return (
    <AnimatePresence>
             {floatingIcons.map(({ Icon, delay, color }, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: -50 }}
                 animate={{
                   opacity: [0.4, 0.8, 0.4],
                   y: [0, -30, 0],
                   x: [0, 20, 0],
                 }}
                 transition={{
                   duration: 3,
                   delay: delay,
                   repeat: Infinity,
                   repeatType: "reverse",
                 }}
                 style={{
                   position: "absolute",
                   top: `${Math.floor(Math.random() * 70 + 10)}%`,
                   left: `${Math.floor(Math.random() * 70 + 10)}%`,
                   color: color,
                   filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                 }}
               >
                 <Icon sx={{ fontSize: 50 }} />
               </motion.div>
             ))}
           </AnimatePresence>
  );
};

export default FloatingIcons;
