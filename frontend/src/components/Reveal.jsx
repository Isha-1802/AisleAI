import { motion } from 'framer-motion';

/**
 * Scroll-reveal wrapper. Fades + rises its children into view once.
 * Usage: <Reveal><h2>Title</h2></Reveal>  or  <Reveal delay={0.1} as="section">…</Reveal>
 */
function Reveal({ children, delay = 0, y = 28, className = '', once = true, ...rest }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

export default Reveal;
