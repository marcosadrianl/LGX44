# LGX44 - Control de Pesos y Pedidos

Sistema de gestión de pedidos con autenticación por código y sincronización con Supabase.

## 🚀 Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

#### 2.1 Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Guarda las credenciales (URL y Anon Key)

#### 2.2 Configurar base de datos

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia todo el contenido del archivo `supabase-setup.sql`
3. Pégalo en el editor y ejecuta el script
4. Verifica que las tablas `sucursales` y `pedidos` se hayan creado

#### 2.3 Habilitar Realtime

1. Ve a **Database > Replication**
2. Busca la tabla `pedidos`
3. Activa **Enable Realtime**

### 3. Configurar variables de entorno

1. Copia el archivo de ejemplo:

```bash
cp .env.local.example .env.local
```

2. Edita `.env.local` y reemplaza con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

Estas credenciales las encuentras en: **Settings > API** en tu proyecto de Supabase.

### 4. Ejecutar la aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔑 Sistema de Autenticación

La aplicación usa códigos de 6 dígitos para autenticación:

| Código | Sucursal   | ID en Base de Datos |
| ------ | ---------- | ------------------- |
| 123456 | LGX-SUC-66 | lgx-suc-66          |
| 654321 | LGX-SUC-44 | lgx-suc-44          |

### Agregar nuevas sucursales

1. **En la base de datos (Supabase):**

```sql
INSERT INTO sucursales (id, name, passkey) VALUES
  ('lgx-suc-99', 'LGX-SUC-99', 999999);
```

No necesitas modificar el código. La app valida el código contra la tabla `sucursales`.

## 📦 Estructura del Proyecto

```
app/
├── context/
│   └── AuthContext.tsx        # Manejo de autenticación y sesión
├── hooks/
│   └── usePedidos.ts         # Hook para operaciones con pedidos (Supabase)
├── lib/
│   ├── LoginModal.tsx        # Modal de login
│   ├── supabaseClient.ts     # Cliente de Supabase
│   ├── definitions.ts        # Tipos TypeScript
│   └── ...                   # Otros componentes
├── models/
│   └── Pedido.Schema.ts      # Esquemas de datos
├── layout.tsx                # Layout con AuthProvider
└── page.tsx                  # Página principal
```

## 🔄 Funcionalidades

- ✅ Login con código de 6 dígitos
- ✅ Autenticación persistente (localStorage)
- ✅ Filtrado automático de pedidos por sucursal
- ✅ Sincronización en tiempo real con Supabase
- ✅ CRUD completo de pedidos
- ✅ Validación de pedidos duplicados
- ✅ Cerrar sesión

## 🛠️ Tecnologías

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estático
- **Supabase** - Backend as a Service (PostgreSQL + Realtime)
- **Tailwind CSS** - Estilos
- **React Hooks** - Gestión de estado

## 📝 Notas

- Los datos de sesión se guardan en localStorage
- Cada sucursal solo ve sus propios pedidos
- Las actualizaciones se sincronizan en tiempo real entre pestañas/dispositivos
- El código de sucursal se valida contra la tabla `sucursales` en Supabase

## 🐛 Solución de Problemas

### Error: "Falta configurar NEXT_PUBLIC_SUPABASE_URL"

- Verifica que el archivo `.env.local` exista y tenga las variables correctas
- Reinicia el servidor de desarrollo después de crear/modificar `.env.local`

### Los pedidos no se cargan

- Verifica la conexión a Supabase en la consola del navegador
- Asegúrate de que las tablas estén creadas correctamente
- Verifica las políticas de RLS en Supabase

### Realtime no funciona

- Ve a **Database > Replication** en Supabase
- Verifica que la tabla `pedidos` tenga Realtime habilitado
