export const SECTIONS = ['hero', 'about', 'experience', 'skills', 'contact'] as const

export type SectionId = typeof SECTIONS[number]

// Global state for active section id
export const useActiveSection = () => {
  return useState<SectionId>('active-section', () => 'hero')
}
