# CV Optimizer

Aplicación para optimizar currículums, compuesta por un frontend en Next.js y un backend Express con integración de servicios cloud y procesamiento de documentos.

---

## 🚀 **Características**
- [ ] Optimización y análisis de currículums en distintos formatos.
- [ ] Carga y procesamiento de archivos PDF.
- [ ] Integración con AWS S3 para almacenamiento y visualización de documentos.
- [ ] Integración con Google GenAI.
- [ ] Interfaz moderna desarrollada en React y Tailwind.

## 🔧 **Tecnologías**

- **Frontend**:
  - Next.js (`"next": "15.3.3"`)
  - React (`"react": "19.0.0"`)
  - TailwindCSS (`"tailwindcss": "^4"`)
  - TypeScript
  - Otras: axios, lucide-react, react-markdown, remark-gfm, Radix UI

- **Backend**:
  - Node.js + Express (`"express": "^5.1.0"`)
  - TypeScript
  - dotenv
  - multer (uploads)
  - pdf-parse, mammoth (procesamiento de archivos)
  - AWS SDK S3, Google GenAI

---

## 📦 **Instalación**

### 1. Clona el repositorio:
```bash
git clone https://github.com/sebastianmr18/cv-optimizer.git
```

### 2. Instalación Frontend

```bash
cd cv-optimizer/frontend
npm install
```

### 3. Instalación Backend

```bash
cd ../backend
npm install
```

### Variables de entorno

Agrega tus variables en `/frontend/env.example` y `/backend/env.example`.  
Ejemplo (`backend/env.example`):

```env
AWS_ACCESS_KEY_ID=_________________
AWS_SECRET_ACCESS_KEY=_________________
GOOGLE_API_KEY=_________________
```

---

## 🛠 **Uso**

### Frontend

```bash
npm run dev
```
(Desde `cv-optimizer/frontend`)

### Backend

```bash
npm run dev
```
(Desde `cv-optimizer/backend`)

---

## 📄 **Licencia**
MIT
