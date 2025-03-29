
import { type MotionProps, type Variant } from "framer-motion";

// Fade animation variants
export const fadeAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Slide up animation variants
export const slideUpAnimation = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Scale animation variants
export const scaleAnimation = {
  hidden: { 
    scale: 0.95, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  },
  exit: { 
    scale: 0.95, 
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Staggered children animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.2
    }
  }
};

// Card animation for items in a list
export const cardAnimation = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  },
  hover: { 
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: 0.1,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Button animation
export const buttonAnimation = {
  rest: { 
    scale: 1 
  },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  },
  tap: { 
    scale: 0.95,
    transition: { 
      duration: 0.1,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Page transition animation
export const pageTransition: MotionProps = {
  initial: "hidden",
  animate: "visible",
  exit: "exit",
  variants: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  }
};

// Loading animation variants
export const loadingVariants: Record<string, Variant> = {
  initial: { 
    opacity: 0, 
    scale: 0.9 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: { 
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};
