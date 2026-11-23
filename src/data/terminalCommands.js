const sectionCommands = {
  home: { label: 'home', section: 'home' },
  about: { label: 'about', section: 'about' },
  projects: { label: 'projects', section: 'projects' },
  skills: { label: 'skills', section: 'skills' },
  contact: { label: 'contact', section: 'contact' },
}

export function resolveTerminalCommand(value) {
  const command = value.trim().toLowerCase()

  if (!command) return { output: '' }
  if (command === 'help') {
    return {
      output: 'Commands: help, whoami, home, about, projects, skills, contact, cv, clear',
    }
  }
  if (command === 'whoami') {
    return { output: 'Sathira Sugeesvara — Computer Science & Mathematics student, Full-Stack Developer.' }
  }
  if (command === 'clear') return { clear: true }
  if (command === 'ghost') {
    return { output: 'A little magic, just for you.', action: 'ghost' }
  }
  if (command === 'cv' || command === 'resume') {
    return { output: 'Preparing the resume download...', action: 'download' }
  }

  const section = sectionCommands[command]
  if (section) {
    return { output: `Opening ${section.label}...`, action: 'navigate', section: section.section }
  }

  return { output: `Command not found: ${command}. Try "help".` }
}
