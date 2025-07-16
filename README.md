# CV Optimizer

Aplicación para optimizar currículums, compuesta por un frontend en Next.js y un backend Express con integración de servicios cloud y procesamiento de documentos.

---

## 🚀 **Características**
- [ ] Optimización y análisis de currículums en distintos formatos.
- [ ] Carga y procesamiento de archivos PDF.
- [ ] Integración con AWS S3 para almacenamiento y visualización de documentos.
- [ ] Integración con Google GenAI.
- [ ] Interfaz moderna desarrollada en React y Tailwind.
- [ ] Dockerización completa del backend y frontend.
- [ ] Soporte para despliegue local con Docker Compose.
- [ ] Publicación automática de imágenes Docker en Docker Hub desde GitHub Actions.

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
 
- **DevOps / Infraestructura**:
  - Docker
  - Docker Compose
  - Docker Hub (registro de imágenes)
  - GitHub Actions (CI/CD para test y construcción de imágenes)

---

## 📦 **Instalación**

### 1. Clona el repositorio:
```bash
git clone https://github.com/sebastianmr18/cv-optimizer.git
```

### 2. Instalación tradicional (sin Docker)

#### Frontend
```bash
cd cv-optimizer/frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

### 3. Variables de entorno

Agrega tus variables en `/frontend/.env` y `/backend/.env`.  
Ejemplo (`backend/.env`):

```env
AWS_ACCESS_KEY_ID=_________________
AWS_SECRET_ACCESS_KEY=_________________
GOOGLE_API_KEY=_________________
```

También puedes usar los archivos `env.example` como referencia.

---
## 🛠 **Uso**

### 🔹 Opción 1: Sin Docker

#### Frontend
```bash
cd frontend
npm run dev
```

#### Backend
```bash
cd backend
npm run dev
```

### 🔹 Opción 2: Con Docker

Asegúrate de tener Docker y Docker Compose instalados. Luego, ejecuta:

```bash
docker compose up --build
```

Esto levantará tanto el frontend (puerto `3000`) como el backend (puerto `4000`), utilizando las que estén publicadas en Docker Hub.

> **Nota:** Los cambios en el código requerirán reconstruir las imágenes para reflejar los cambios:
```bash
docker compose build
docker compose up
```

---

## 📦 **Publicación de Imágenes Docker (CI/CD)**

El proyecto incluye workflows de GitHub Actions que automatizan la construcción y publicación de imágenes Docker para backend y frontend:

- Al hacer `push` o `pull request` a:
  - `main`: se publica con el tag `latest`
  - `develop`: se publica con el tag `dev`
  - `feat/**`: se publica con el nombre de la rama como tag (`feat-algo` → `featalgo`)

Estas imágenes se suben automáticamente a Docker Hub y se pueden usar para despliegues consistentes en producción o staging.

---

## 📄 **Licencia**
MIT
