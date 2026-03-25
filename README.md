# jorgeaveraf.github.io

CV profesional de **Jorge Vera** – Data Engineer · Workflow Automation Specialist · AI Systems Architect.

Sitio estático publicado con **GitHub Pages**: [jorgeaveraf.github.io](https://jorgeaveraf.github.io)

---

## Descripción del proyecto

Este repositorio contiene el código fuente de mi CV en línea.  
La página principal (`index.html`) carga dinámicamente cada sección del CV desde partiales HTML independientes usando la `Fetch API`. Esto mantiene cada sección desacoplada y facilita el mantenimiento o actualización del contenido sin tocar el layout principal.

No se usan frameworks ni dependencias externas; solo HTML, CSS y JavaScript vanilla.

---

## Estructura del proyecto

```
jorgeaveraf.github.io/
├── index.html              # Punto de entrada principal (estructura de la página)
├── main.js                 # Carga los partiales HTML y maneja la interactividad
├── styles.css              # Estilos globales (tema oscuro minimalista)
│
├── header.html             # Sección: perfil, nombre y contacto
├── experiencia.html        # Sección: experiencia laboral
├── educacion.html          # Sección: formación académica
├── skills.html             # Sección: habilidades técnicas
├── certificaciones.html    # Sección: certificaciones obtenidas
├── intereses.html          # Sección: intereses profesionales
├── lenguajes.html          # Sección: idiomas
│
├── profile_picture.jpg     # Foto de perfil
└── README.md               # Este archivo
```

---

## Convención de carpetas y archivos

| Patrón | Descripción |
|---|---|
| `index.html` | Único punto de entrada. No contiene contenido editorial, solo la estructura base y los contenedores `#slot-*`. |
| `<sección>.html` | Partial HTML de cada sección del CV. Nombrado en **español** y en minúsculas para reflejar el dominio del contenido. Solo contiene el bloque `<section>` correspondiente. |
| `main.js` | Script único que orquesta la carga de partiales y toda la lógica de UI (navegación lateral, scroll-to-top, animaciones). |
| `styles.css` | Hoja de estilos global. Las clases CSS siguen la convención **kebab-case** (`cv-section`, `job-entry`, `lang-bar`, etc.). |
| `profile_picture.jpg` | Activos de imagen en la raíz. Si el número de imágenes crece, se recomienda moverlos a una carpeta `assets/`. |

---

## Cómo visualizar localmente

Por razones de seguridad del navegador, la `Fetch API` no puede cargar archivos locales directamente desde `file://`.  
Para ver el sitio en local, sirve el directorio con cualquier servidor HTTP simple:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Luego abre `http://localhost:8080` en el navegador.

---

## Despliegue

El sitio se despliega automáticamente en **GitHub Pages** al hacer push a la rama principal.  
No requiere proceso de build ni dependencias de Node.

---

## Calidad de código

El repositorio incluye herramientas de linting para mantener la calidad del código:

| Herramienta | Alcance | Configuración |
|---|---|---|
| [ESLint](https://eslint.org) | `main.js` | `eslint.config.js` |
| [HTMLHint](https://htmlhint.com) | todos los `.html` | `.htmlhintrc` |
| [Stylelint](https://stylelint.io) | `styles.css` | `.stylelintrc.json` |

### Ejecutar los linters localmente

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Ejecutar todos los linters a la vez
npm run lint

# O por separado
npm run lint:js
npm run lint:html
npm run lint:css
```

Los linters también se ejecutan automáticamente en **GitHub Actions** (`quality.yml`) en cada push y pull request hacia `main`.

