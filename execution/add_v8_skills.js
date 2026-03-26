const fs = require('fs');
const path = require('path');

const skills = [
  { name: 'design-spells', desc: 'Hover states com física, scroll reveals cubic-bezier' },
  { name: 'magic-animator', desc: 'Animações com easing cubic-bezier(0.16,1,0.3,1), delays escalonados' },
  { name: 'frontend-design', desc: 'Identidade visual única por produto, anti-template' },
  { name: 'antigravity-design-expert', desc: 'Background glows, profundidade Z, glassmorphism' },
  { name: 'radix-ui-design-system', desc: 'CSS variables, focus states, contraste 4.5:1' },
  { name: 'web-accessibility', desc: 'ARIA, prefers-reduced-motion, foco visível' },
  { name: 'ui-ux-pro-max', desc: 'Validação de paleta, tipografia e spacing' },
  { name: 'web-design-guidelines', desc: 'Audit final de conformidade' },
  { name: 'animejs-animation', desc: 'Timeline de entrada, SVG morphing, spring physics' },
  { name: 'claude-d3js-skill', desc: 'SVGs com dados reais animados' },
  { name: 'data-storytelling', desc: 'Narrativa integrada em cada diagrama' },
  { name: 'canvas-design', desc: 'Particles ambiente únicos por produto' },
  { name: 'fixing-motion-performance', desc: 'will-change: transform, zero layout thrashing' }
];

const basePath = 'c:/Users/reinaldo/Downloads/OFERTA REMODELADA/skills_organized/design-v8';

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

skills.forEach(skill => {
  const skillDir = path.join(basePath, skill.name);
  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir);
  }
  
  const skillMd = `---
name: ${skill.name}
description: ${skill.desc}
category: Design V8 Elevation
risk: safe
source: user-defined
date_added: "${new Date().toISOString().split('T')[0]}"
---

# ${skill.name} (V8 Elevation)

## Overview
${skill.desc}

## V8 Implementation Guidelines
- Prioritize high-performance animations (60fps+).
- Use specific easing functions: \`cubic-bezier(0.16, 1, 0.3, 1)\` for premium feel.
- Ensure visual excellence: background glows, glassmorphism, depth.
- Zero layout thrashing: utilize \`will-change\`.
- Accessibility first: ARIA and focus states.

## Execution
Apply this skill to any new frontend project or landing page optimization to achieve "wow" factor.
`;

  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillMd);
  console.log(`Created skill: ${skill.name}`);
});
