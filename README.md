# Integrantes

    Jaqueline Atienza
    Lucas Cardenas

# Justificativo

    El uso de Inteligencia Artificial en este proyecto no solo agrega valor técnico al modelo, sino que se alinea con los objetivos estratégicos del marketing financiero moderno: segmentar, personalizar y optimizar. De esta forma, se logra una propuesta más eficiente y efectiva para captar clientes interesados en productos de ahorro, utilizando la tecnología como herramienta clave de decisión.

---

# Proyecto de Predicción de Préstamos Personales

Este proyecto permite predecir si un cliente aceptará un préstamo personal basado en sus datos financieros y personales. Cuenta con:

- Backend en Python con el modelo de Machine Learning.
- Frontend en React Native para ingreso de datos y visualización del resultado.

---

## Backend (Python)

### Requisitos

- Python 3.x
- pip

### Instalación

1. Crear y activar entorno virtual (opcional pero recomendado):

```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

2. Instalar dependencias:

```bash
pip install -r requirements.txt
```

### Ejecución

Ejecuta el servidor o script que expone el endpoint `/predict` (ajusta según tu proyecto):

```bash
uvicorn app:app
```

Este backend recibirá datos en formato JSON con las características y devolverá la predicción.

---

## Frontend (React Native)

### Requisitos

- Node.js y npm/yarn instalados
- Expo CLI (si usas Expo)

### Instalación

Desde la carpeta del frontend:

```bash
npm install
# o
yarn install
```

### Ejecución

Para iniciar la app en un emulador o dispositivo:

```bash
npx expo start
```

Esto levantará el Metro Bundler y podrás probar la app.

### Uso

1. Completar el formulario con los datos personales y financieros.
2. Enviar el formulario para que la app haga la consulta al backend.
3. Ver el resultado de la predicción en la pantalla de resultados.

---

## Comunicación entre Frontend y Backend

- El frontend envía al backend un JSON con la siguiente estructura:

```json
{
  "features": [Age, Experience, Income, ZIP Code, Family, CCAvg, Education, Mortgage]
}
```

- El backend responde con un JSON que contiene:

```json
{
  "prediction": 1,
  "accuracy": 0.929,
  "report": { ... }
}
```
"# tp-integrador-python" 
