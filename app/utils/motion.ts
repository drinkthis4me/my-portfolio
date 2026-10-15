export const revealTransition = {
  duration: 0.65,
  ease: 'easeOut' as const,
}

export const fastTransition = {
  duration: 0.2,
  ease: 'easeOut' as const,
}

export const inViewOptions = {
  once: true,
  amount: 0.15,
}

export const revealFromBottom = {
  initial: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}
