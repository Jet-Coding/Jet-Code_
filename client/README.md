-- Seed baseline technologies
INSERT INTO `stacks` (`name`) VALUES 
('React'), ('TypeScript'), ('Rust'), ('WebAssembly'), ('Node.js'), ('MySQL');

-- Seed a sample project matching projects.html
INSERT INTO `projects` (`title`, `category`, `year`, `description`, `image_url`, `image_alt`) VALUES 
(
  'HyperScale Engine', 
  'SYSTEM_ARCH', 
  2024, 
  'A high-performance system architecture model built for heavy background worker processes.',
  '../assets/images/hyperscale.png',
  'Cinematic photograph of a sleek server room bathed in electric blue neon light.'
),
(
  'Neon IDE', 
  'WEB_INTERFACE', 
  2024, 
  'A browser-based code editor with native performance, featuring a custom syntax highlighting engine.',
  '../assets/images/neon-ide.png',
  'Minimalist 3D rendering of a stylized glowing network of nodes.'
);

-- Map stacks to projects
-- HyperScale Engine uses TypeScript and Rust (assuming project ID 1)
INSERT INTO `project_stacks` (`project_id`, `stack_id`) VALUES 
(1, 2), (1, 3);

-- Neon IDE uses TypeScript, Rust, and WebAssembly (assuming project ID 2)
INSERT INTO `project_stacks` (`project_id`, `stack_id`) VALUES 
(2, 2), (2, 3), (2, 4);