# Auditoría del repositorio `acrossmediachile`

**Fecha:** 2 de octubre de 2026 · **Commit auditado:** `e450cdc` · **Alcance:** todo el repositorio (código, configuración, dependencias, assets, contenido)

## 0. Resumen ejecutivo

Sitio web corporativo estático (SPA) de Across Media Chile, generado con **Lovable** (los 20 commits son de `gpt-engineer-app[bot]`). Stack: Vite 5 + React 18 + TypeScript + Tailwind + shadcn/ui + React Router 6. No hay backend, base de datos ni variables de entorno.

El proyecto **compila sin errores** (`vite build` OK, `tsc` OK), pero en su estado actual es un **prototipo visual, no un sitio listo para producción**:

| # | Hallazgo principal | Severidad |
|---|---|---|
| 1 | **Ningún formulario envía datos.** Contacto, agenda, newsletter: los leads se pierden (solo `console.log` o un toast falso de "Mensaje enviado"). | 🔴 Crítica |
| 2 | **Contenido ficticio presentado como real**: testimonios, casos de éxito, cifras, equipo, dirección y teléfonos de relleno, contradictorios entre páginas. | 🔴 Crítica (legal/reputacional) |
| 3 | **Sin política de privacidad / términos** (enlaces dan 404) mientras se recolectan datos personales. | 🔴 Alta (legal) |
| 4 | ~20 botones CTA sin acción (WhatsApp, "Llamar ahora", "Consulta Gratuita", "Leer artículo", descargas). | 🟠 Alta |
| 5 | 20 vulnerabilidades en dependencias (15 altas), incluyendo `react-router-dom` y `vite` (directas). | 🟠 Alta |
| 6 | Bugs de UX: menú desplegable se cierra al mover el mouse, navbar transparente se superpone al contenido, cubo 3D desincronizado y con texto espejado. | 🟠 Media |
| 7 | SEO débil: `lang="en"`, mismo `<title>` en todas las rutas, sin sitemap, sin datos estructurados, SPA sin prerender. | 🟠 Media |
| 8 | Accesibilidad: modales caseros sin foco/teclado/ARIA, botones sin nombre accesible, no respeta `prefers-reduced-motion`. | 🟠 Media |
| 9 | Rendimiento: ~3,5 MB de imágenes sin optimizar; re-render 20 veces/segundo en el cubo. | 🟡 Media |
| 10 | Deuda técnica: TS no estricto, 3 errores de lint, 0 tests, sin CI, código muerto, README genérico. | 🟡 Baja-Media |

---

## 1. Inventario del proyecto

```
src/
  App.tsx, main.tsx, index.css, App.css (sin uso)
  components/        10 componentes propios (Navbar, Hero, ServicesCube, ProcessSteps,
                     Testimonials, CTASection, Footer, ContactModal, BookingModal, PopupModal)
  components/ui/     49 componentes shadcn (34 sin uso)
  hooks/             use-toast, use-mobile, usePopupTriggers (sin uso)
  pages/             Index, CasosExito, Contacto, Recursos, SobreNosotros, NotFound,
                     servicios/{Digitalizacion, Contenido, Marketing}
  assets/            hero-background.png (1,1 MB), hero-image.jpg (sin uso)
public/              favicon.ico (genérico), robots.txt, placeholder.svg,
                     lovable-uploads/ (logo 238 KB, imagen genérica 1,9 MB)
```

- ~2.950 líneas de código propio (sin contar `ui/`).
- Rutas: `/`, `/servicios/digitalizacion`, `/servicios/contenido`, `/servicios/marketing`, `/casos-exito`, `/recursos`, `/sobre-nosotros`, `/contacto`, `*` (404).

### Resultados de herramientas

| Comprobación | Resultado |
|---|---|
| `npm ci` | OK |
| `tsc -p tsconfig.app.json` | OK (pero con `strict: false`) |
| `npm run lint` | **3 errores, 7 warnings** (`ui/command.tsx:24`, `ui/textarea.tsx:5`, `tailwind.config.ts:124`) |
| `npm run build` | OK — JS 438 KB (129 KB gzip) en un solo chunk, CSS 78 KB |
| `npm audit` | **20 vulnerabilidades** (1 baja, 4 moderadas, 15 altas) |
| Tests | No existen |
| Prueba en navegador (Playwright) | 5 enlaces a 404, dropdown se cierra, overflow horizontal en móvil (394 px en viewport de 390 px) |

---

## 2. Funcionalidad y lógica de negocio

### 2.1 🔴 Formularios que no hacen nada
| Ubicación | Comportamiento actual |
|---|---|
| `src/pages/Contacto.tsx:17-31` | Muestra toast **"Mensaje enviado"** y limpia el formulario. **No se envía nada.** El usuario cree que fue contactado. |
| `src/components/ContactModal.tsx:22-27` | `console.log(formData)` y cierra. Usado en 6 páginas. |
| `src/components/BookingModal.tsx:23-28` | `console.log(formData)` y cierra. Sin confirmación. |
| `src/components/Footer.tsx:114-121` | Input + botón "Suscribir" sin `<form>` ni handler. |
| `src/pages/Recursos.tsx:208-216` | Newsletter sin handler. |

Además se imprimen datos personales (email, teléfono) en la consola del navegador.

**Recomendación:** conectar a un servicio real (Formspree, Resend + función serverless, HubSpot, Supabase, Google Sheets vía Apps Script, etc.), validar con `zod` + `react-hook-form` (ya instalados y sin uso), mostrar estados de carga/éxito/error reales y agregar protección anti-spam (honeypot / Turnstile / reCAPTCHA).

### 2.2 🟠 Botones y enlaces sin acción
- `Navbar.tsx:88,149` — "Consulta Gratuita" (el CTA principal del header) no hace nada.
- `Hero.tsx:81` — "Ver casos de éxito" sin `onClick`/enlace.
- `CTASection.tsx:38-73` — "Agenda tu consulta", "Hablar por WhatsApp", "Descargar diagnóstico": ninguno funciona.
- `Contacto.tsx:239-244` — "Llamar Ahora" y "WhatsApp" sin `tel:` ni `https://wa.me/...`.
- `Recursos.tsx:181` — "Leer Artículo" en los 6 posts: no existen artículos.
- `CasosExito.tsx:161` — "Ver Más Casos" sin acción.
- `Contenido.tsx:54-60` — "Ver Nuestro Portafolio" abre el modal de "Digitaliza tu Empresa" (texto incoherente).
- `Footer.tsx:45-56` — redes sociales con `href="#"`.
- Footer → **404**: `/consultoria`, `/carreras`, `/terminos`, `/privacidad`, `/cookies` (verificado en navegador).
- Datos de contacto como texto plano: deberían ser `<a href="tel:...">` / `<a href="mailto:...">`.

### 2.3 🟠 BookingModal (agenda)
- Pide **"Día"** (lunes-viernes) **y** **"Fecha"** por separado → pueden contradecirse (p. ej. "Lunes" + un sábado).
- El campo fecha acepta fechas pasadas y fines de semana (falta `min`).
- Los `Select` de Radix no tienen `required`/`name` → se puede enviar sin día ni hora.
- No pide nombre de la persona.
- Recomendación: reemplazar por Calendly / Cal.com / Google Calendar Appointment Schedule embebido.

### 2.4 Código muerto
- `PopupModal.tsx` y `usePopupTriggers.ts` no se usan en ninguna parte. Si se activan, ojo: contienen patrones engañosos ("Quedan solo 3 cupos esta semana", "Consulta valorada en $50.000") y el popup de salida de intención es intrusivo.
- `src/App.css` (plantilla de Vite), `src/assets/hero-image.jpg`, `public/placeholder.svg`.
- 34 de 49 componentes `ui/` sin uso; dependencias sin uso: `@hookform/resolvers`, `zod`, `date-fns` (y `@tanstack/react-query`: se monta el provider pero no hay queries).
- Se montan **dos** sistemas de toasts (`Toaster` + `Sonner`), solo se usa uno.

---

## 3. Contenido, consistencia y aspectos legales

### 3.1 🔴 Contenido ficticio / de relleno
Todo el contenido parece generado por IA y no verificado. Ejemplos:

| Dato | Dónde | Problema |
|---|---|---|
| Teléfono `+56 9 1234 5678` | Footer, CTASection, PopupModal, placeholders | Número de relleno |
| Teléfono `+56 2 2345 6789` | Contacto | Distinto al anterior |
| Email `contacto@acrossmedia.cl` vs `hola@acrossmedia.cl` | Footer/CTA vs Contacto | Inconsistente |
| "Av. Providencia 1234, Piso 8" | Contacto | Dirección genérica; mapa es un placeholder ("Mapa Interactivo") |
| Horario "Sáb 9:00-14:00" vs "Lun-Vie 9:00-18:00" | Contacto vs PopupModal | Inconsistente |
| Equipo (María González, Carlos Mendoza, Ana Rojas, Diego Silva) | SobreNosotros | Todos con la **misma foto genérica** |
| "Carlos Mendoza, CEO de TechSolutions SpA" | Testimonials | **Mismo nombre** que el Director de Estrategia del equipo → resta credibilidad |
| Autores del blog = miembros del equipo | Recursos | Artículos inexistentes, fechados en 2023-2024 ("Tendencias 2024") |
| Casos "TechnoSolutions", "Fashion Forward", "RestaurantGroup" | CasosExito | Ficticios, misma imagen, cifras no verificables |

### 3.2 Cifras contradictorias entre páginas
| Métrica | Valores encontrados |
|---|---|
| Clientes / proyectos | "+500 empresas" (CTA, Testimonials, CasosExito, SobreNosotros) vs **"150+ Proyectos"** (ServicesCube) |
| Satisfacción / éxito | 98% (Hero, CasosExito) vs **95% "Éxito"** (ServicesCube) |
| ROI promedio | **150%** (Testimonials) vs **+300%** (CasosExito) |
| Años de experiencia | "5+" (Hero) vs fundada en 2019 (= 7 años en 2026) |
| Soporte | "24/7" (ServicesCube) vs horario de oficina |
| Respuesta | "garantizada en menos de 2 horas hábiles" (CTASection) — compromiso imposible si los formularios no envían nada |

### 3.3 🔴 Riesgo legal (Chile)
- **Publicidad engañosa** (Ley 19.496 del Consumidor, arts. 28 y ss.): testimonios, casos y cifras ficticias presentadas como reales.
- **"Garantía de satisfacción del 100% o devolvemos tu inversión"** (`ProcessSteps.tsx:102`): es una promesa comercial exigible. Solo mantenerla si existe una política real y escrita.
- **Protección de datos** (Ley 19.628 y la nueva **Ley 21.719**, que entra en vigencia en diciembre de 2026): se recolectan nombre, email, teléfono y empresa sin política de privacidad, sin informar finalidad ni base de licitud, sin checkbox de consentimiento para la newsletter. Los enlaces a "Política de Privacidad" y "Cookies" dan 404.
- Recomendación: revisión por un abogado; publicar Términos, Privacidad y (si se agrega analítica) aviso de cookies.

### 3.4 Texto
- `Hero.tsx:63`: "100% — Nuestro compromiso es al 100%" (redundante).
- `NotFound.tsx`: en **inglés** ("Oops! Page not found", "Return to Home") y con colores claros (`bg-gray-100`) que rompen el tema oscuro.
- Fechas del blog con `toLocaleDateString('es-ES')` → mejor `es-CL`; además `new Date("2024-01-15")` se interpreta en UTC y en Chile puede mostrarse el día anterior.

---

## 4. Seguridad

No hay backend, secretos ni `.env` en el repo (✅). La superficie de ataque es baja, pero:

### 4.1 🟠 Dependencias vulnerables (`npm audit`)
| Paquete | Sev. | Directa | Nota |
|---|---|---|---|
| `react-router-dom` / `react-router` / `@remix-run/router` | Alta | Sí | Open redirect / XSS. Explotabilidad baja aquí (rutas estáticas), pero es código que llega al navegador. |
| `vite` 5.4.19 | Alta | Sí | Bypass de `server.fs` en el servidor de desarrollo. **Agravado** porque `vite.config.ts` usa `host: "::"` (expone el dev server en todas las interfaces de red). |
| `postcss` | Alta | Sí | Build-time. |
| `rollup`, `esbuild`, `glob`, `minimatch`, `picomatch`, `brace-expansion`, `lodash`, `js-yaml`, `flatted`, `nanoid`, `browserslist`, `yaml`, `ajv`… | Alta/Mod. | No | Mayormente herramientas de build/lint. |

**Acción:** `npm audit fix` resuelve todas sin cambios mayores; luego verificar `npm run build`. Considerar `host: "localhost"` en desarrollo.

### 4.2 Otros
- No hay cabeceras de seguridad (CSP, `X-Frame-Options`, `Referrer-Policy`, HSTS): se configuran en el hosting (Lovable/Netlify/Vercel/Cloudflare).
- `console.log` de datos personales en producción (§2.1).
- Formularios sin anti-spam (relevante cuando se conecten a un backend).
- `dangerouslySetInnerHTML` solo en `ui/chart.tsx` (shadcn, sin uso) — sin riesgo actual.
- Dos lockfiles (`package-lock.json` y `bun.lockb`) → builds no reproducibles según la herramienta usada. Elegir uno.

---

## 5. Bugs de interfaz y UX (verificados)

| # | Archivo | Problema |
|---|---|---|
| 1 | `Navbar.tsx:48-71` | El dropdown "Servicios" se abre con `onMouseEnter` y tiene `mt-2` de separación: al bajar el mouse hacia las opciones se dispara `onMouseLeave` y **se cierra**. Verificado en navegador. Tampoco es accesible por teclado. |
| 2 | `Navbar.tsx:27` | Navbar `fixed` con `bg-transparent`: al hacer scroll el texto del menú queda **encima del contenido** y se vuelve ilegible (verificado en captura). Agregar fondo/blur al hacer scroll. |
| 3 | `Navbar.tsx` | Usa `<a href>` en lugar de `<Link>` de React Router → **recarga completa** en cada navegación (pierde la ventaja de la SPA, más lento). Igual en Footer y NotFound. |
| 4 | `Navbar.tsx:7` | El mismo estado `servicesOpen` se comparte entre menú desktop y móvil. |
| 5 | `ServicesCube.tsx:46-52` | Los puntos de control giran `+index*120°`, pero la cara `i` está en `rotateY(i*120°)`; para mostrarla habría que girar `-i*120°`. **Al pulsar el 2.º punto se ve "Marketing" mientras la tarjeta lateral describe "Contenido".** |
| 6 | `ServicesCube.tsx:86-96` | La auto-rotación nunca se detiene salvo con hover: al pulsar un punto la figura sigue girando; `currentFace` nunca se sincroniza con la cara visible. |
| 7 | `ServicesCube.tsx:127` | Faltan `backface-visibility: hidden` → se ven las caras **con el texto espejado** a través de las otras (verificado en captura). Además con 3 caras es un prisma triangular, no un cubo. |
| 8 | `ServicesCube.tsx:79-83` | `e.preventDefault()` en `onWheel` de React no funciona (React registra `wheel` como pasivo): el zoom y el scroll de la página ocurren a la vez. |
| 9 | `ServicesCube.tsx` | En móvil/táctil no hay hover ni mousemove: "Mueve el mouse para rotar" no aplica. |
| 10 | `Index.tsx:9` + `Hero.tsx:9` | Doble `pt-16` (padding de navbar aplicado dos veces) compensado con `-top-16` en el fondo; frágil. |
| 11 | Hero / móvil | Overflow horizontal de ~4 px en 390 px de ancho (elementos flotantes absolutos). |
| 12 | Varios | Clase `btn-primary` usada en `BookingModal.tsx:177` y `ContactModal.tsx:140` **no existe** en el CSS. |
| 13 | `CasosExito.tsx:96` | `lg:grid-flow-col-dense` + `col-start` para alternar columnas; funciona, pero el orden del DOM no coincide con el visual. |
| 14 | `Recursos.tsx` | El filtro por categoría y la búsqueda no se reflejan en la URL (no se pueden compartir ni sobreviven a recargar). |
| 15 | Global | El menú móvil no se cierra tras navegar (hoy lo "resuelve" la recarga completa del punto 3; al usar `<Link>` habrá que cerrarlo explícitamente). |

---

## 6. Accesibilidad (WCAG 2.1)

- **Modales caseros** (`ContactModal`, `BookingModal`, `PopupModal`): sin `role="dialog"`, `aria-modal`, `aria-labelledby`, sin trampa de foco, no se cierran con `Escape`, no devuelven el foco, no bloquean el scroll del fondo. Ya existe `ui/dialog.tsx` (Radix) que resuelve todo esto.
- Botones solo con ícono sin nombre accesible: cerrar modal (X), menú hamburguesa, flechas y puntos del carrusel de testimonios, puntos del cubo, redes sociales del footer → agregar `aria-label`.
- Menú hamburguesa sin `aria-expanded` / `aria-controls`.
- Inputs de newsletter sin `<label>`.
- `lang="en"` en `index.html` con contenido en español → los lectores de pantalla pronuncian mal todo el sitio.
- Animaciones infinitas (cubo, `animate-bounce`, `animate-pulse`, `float`) sin respetar `prefers-reduced-motion`.
- Imágenes con `opacity-60` y `alt` engañosos (p. ej. `alt="María González"` en una imagen genérica).
- Logo + texto "Across Media" no enlazan al inicio.
- No hay "saltar al contenido".

---

## 7. SEO

- `index.html`: `lang="en"`; mismo `<title>`/`description` en **todas** las rutas (no hay `react-helmet-async` ni similar).
- `og:image` / `twitter:image` con ruta relativa → deben ser URLs absolutas (`https://...`); además apuntan al logo cuadrado en lugar de una imagen 1200×630. Falta `og:url`, `og:locale` (`es_CL`), `og:site_name`.
- `twitter:site="@acrossmedia_cl"`: verificar que la cuenta exista.
- Sin `<link rel="canonical">`, sin `sitemap.xml` (y `robots.txt` no lo referencia).
- Sin datos estructurados (`Organization` / `LocalBusiness` / `ProfessionalService` JSON-LD), muy útiles para búsquedas locales en Santiago.
- SPA renderizada solo en cliente: Google la indexa, pero otras plataformas (LinkedIn, WhatsApp, Facebook) solo ven el `index.html` genérico. Considerar prerender (p. ej. `vite-plugin-prerender`, `vite-react-ssg`) o migrar a Astro/Next.
- El 404 es "soft 404" (responde 200) — normal en SPA, mitigable con prerender.
- Favicon: el `favicon.ico` genérico de la plantilla; no hay `apple-touch-icon` ni `manifest`.
- Blog sin artículos reales ni URLs individuales → cero valor SEO actual.

---

## 8. Rendimiento

| Recurso | Tamaño | Uso | Recomendación |
|---|---|---|---|
| `lovable-uploads/9af34994….png` | **1,9 MB** | Imagen genérica repetida en casos, equipo, blog y "Sobre nosotros" (~14 veces) | Es un **JPEG con extensión `.png`**. Convertir a WebP/AVIF (~100-150 KB), `loading="lazy"`, `width`/`height`. |
| `src/assets/hero-background.png` | **1,1 MB** | Fondo del Hero (con `opacity-30`) | WebP ~80-150 KB; es el elemento LCP. |
| `lovable-uploads/cdeeb541….png` (logo) | 238 KB, 1563×1563 px | Mostrado a 20-48 px | Exportar SVG o PNG/WebP de 96-128 px (<10 KB). |
| `src/assets/hero-image.jpg` | 140 KB | Sin uso | Eliminar. |

- `ServicesCube`: `setInterval` cada 50 ms con `setState` → **20 re-renders/segundo permanentes**, incluso fuera de pantalla o en pestaña oculta. Usar animación CSS o `requestAnimationFrame` + `IntersectionObserver`.
- Bundle JS único de 438 KB: aplicar `React.lazy` por ruta.
- Las imágenes de `public/` no pasan por el pipeline de Vite (sin hash ni optimización).
- `browserslist`/`caniuse-lite` con 16 meses de antigüedad.

---

## 9. Calidad de código y mantenibilidad

- **TypeScript no estricto**: `strict: false`, `strictNullChecks: false`, `noImplicitAny: false`. Riesgo de errores en runtime no detectados.
- **ESLint**: 3 errores (deben corregirse antes de agregar CI) y `no-unused-vars` desactivado — hay muchos imports sin uso (`CheckCircle`, `Users`, `Target`, `BarChart` en ServicesCube, `User` en ContactModal, etc.).
- **Sin tests** (ni unitarios ni e2e) y **sin CI** (no hay `.github/workflows`).
- **Contenido hardcodeado** dentro de los componentes (servicios, testimonios, posts, equipo, teléfonos repetidos en 4 archivos). Centralizar en `src/content/*.ts` o un CMS (Sanity, Contentful, Decap, Notion) para que el equipo de marketing pueda editar sin tocar código.
- **Duplicación**: el bloque "Hero de página" se repite casi idéntico en 6 páginas; `ContactModal`/`BookingModal` reimplementan lo que da `ui/dialog`; los datos de servicios están duplicados en Navbar, Footer, ServicesCube y páginas.
- **Formato inconsistente**: algunos archivos reformateados por el editor visual de Lovable (JSX comprimido en una línea en `Hero.tsx`, `ServicesCube.tsx`). Agregar Prettier.
- Uso de `key={index}` en todas las listas (aceptable para listas estáticas).
- `package.json`: nombre `vite_react_shadcn_ts`, versión `0.0.0`; falta campo `engines`.
- `README.md` es la plantilla genérica de Lovable: no documenta el proyecto, despliegue, ni dónde editar contenido.
- Tema: `:root` define un tema oscuro y `.dark` otro distinto que nunca se usa; variables `--sidebar-*` claras sin uso; `next-themes` instalado sin uso.
- Historial git: 20 commits automáticos con mensajes como "Visual edit in Lovable"; sin ramas ni PRs → dificulta revisión.

---

## 10. Plan de acción priorizado

### Fase 1 — Antes de publicar / urgente (1-3 días)
1. Conectar **todos** los formularios a un servicio real con validación y estados de error; quitar `console.log`.
2. Reemplazar teléfonos, email, dirección y horarios por los reales y unificarlos en un solo archivo de configuración.
3. Eliminar o reemplazar por contenido **verificable**: testimonios, casos, cifras, equipo, blog. Quitar la "garantía 100%" si no existe la política.
4. Publicar **Política de Privacidad** y **Términos**; agregar consentimiento en newsletter. Arreglar o quitar los 5 enlaces a 404.
5. Dar acción a los CTAs: `wa.me`, `tel:`, `mailto:`, Calendly/Cal.com para agendar.
6. `npm audit fix` y verificar build.

### Fase 2 — Calidad y UX (1 semana)
7. Navbar: fondo al hacer scroll, dropdown con `ui/navigation-menu` o `ui/dropdown-menu`, `<Link>` en lugar de `<a>`, logo enlazado al inicio.
8. Corregir el cubo (signo de rotación, `backface-visibility`, pausa fuera de pantalla, soporte táctil, `prefers-reduced-motion`) o reemplazarlo por tabs/carrusel.
9. Migrar los modales a `ui/dialog`; agregar `aria-label` a botones de ícono.
10. Optimizar imágenes (WebP, tamaños correctos, lazy loading).
11. `lang="es-CL"`, títulos y meta por ruta, `og:image` absoluta 1200×630, `sitemap.xml`, JSON-LD `LocalBusiness`, favicon propio.
12. Página 404 en español con el tema del sitio.

### Fase 3 — Mantenibilidad (continuo)
13. Activar `strict` en TypeScript gradualmente; corregir lint y reactivar `no-unused-vars`.
14. Eliminar código y dependencias sin uso; dejar un solo lockfile.
15. Agregar CI (GitHub Actions: lint + typecheck + build) y algunos tests e2e (Playwright) de navegación y formularios.
16. Centralizar contenido (o CMS), reescribir README, agregar Prettier.
17. Code-splitting por ruta y prerender para SEO/redes sociales.
18. Configurar cabeceras de seguridad en el hosting y analítica (GA4/Plausible) con aviso de cookies.

---

## Anexo — Hallazgos por archivo

| Archivo | Hallazgos |
|---|---|
| `index.html` | `lang="en"`; og/twitter image relativa; sin canonical, sin favicon propio. |
| `vite.config.ts` | `host: "::"` expone dev server a la red (y falla en entornos sin IPv6). |
| `tailwind.config.ts` | `require()` → error de lint; keyframe `rotate-cube` sin uso. |
| `tsconfig*.json` | Modo no estricto. |
| `src/App.tsx` | Providers sin uso (React Query, doble Toaster); sin lazy loading; sin scroll-to-top al cambiar de ruta. |
| `src/App.css` | Plantilla de Vite sin uso. |
| `src/index.css` | `.dark` sin uso; variables sidebar sin uso; falta `.btn-primary`. |
| `components/Navbar.tsx` | Dropdown se cierra; fondo transparente; `<a>` en vez de `<Link>`; CTA sin acción; sin ARIA. |
| `components/Hero.tsx` | Doble padding; CTA secundario sin acción; imagen 1,1 MB; copy redundante. |
| `components/ServicesCube.tsx` | Rotación invertida en controles; caras espejadas; 20 renders/s; `preventDefault` inefectivo; imports sin uso. |
| `components/ProcessSteps.tsx` | "Garantía 100%" riesgosa. |
| `components/Testimonials.tsx` | Testimonios ficticios; nombre repetido con el equipo; botones sin `aria-label`. |
| `components/CTASection.tsx` | 3 botones sin acción; datos de contacto de relleno; "respuesta < 2 h". |
| `components/Footer.tsx` | 5 enlaces 404; redes `href="#"`; newsletter sin handler. |
| `components/ContactModal.tsx` | No envía; modal no accesible; título fijo "Digitaliza tu Empresa" en todos los contextos. |
| `components/BookingModal.tsx` | No envía; Día y Fecha redundantes; selects no requeridos; fechas pasadas permitidas. |
| `components/PopupModal.tsx`, `hooks/usePopupTriggers.ts` | Código muerto con patrones de urgencia falsa. |
| `pages/Contacto.tsx` | Toast de éxito falso; contacto inconsistente; mapa placeholder; botones sin acción. |
| `pages/CasosExito.tsx` | Casos ficticios con la misma imagen; "Ver Más Casos" sin acción. |
| `pages/Recursos.tsx` | Artículos inexistentes; newsletter sin handler; locale `es-ES`. |
| `pages/SobreNosotros.tsx` | Equipo con foto genérica; "500+" inconsistente con otras cifras. |
| `pages/servicios/*.tsx` | Cifras de resultados no verificables; "Ver Nuestro Portafolio" abre modal incorrecto. |
| `pages/NotFound.tsx` | En inglés y fuera del tema visual. |
| `public/lovable-uploads/9af…png` | JPEG con extensión `.png`, 1,9 MB. |
| `bun.lockb` + `package-lock.json` | Dos lockfiles. |
| `README.md` | Plantilla genérica de Lovable. |
