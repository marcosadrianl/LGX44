-- Script SQL para configurar las tablas en Supabase

-- 1. Crear tabla de sucursales
CREATE TABLE IF NOT EXISTS sucursales (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  passkey INTEGER NOT NULL UNIQUE
);

-- 2. Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id TEXT PRIMARY KEY,
  fecha DATE NOT NULL,
  numero TEXT NOT NULL,
  peso NUMERIC NOT NULL,
  autorizado BOOLEAN DEFAULT FALSE,
  notes TEXT,
  "sucursalId" TEXT NOT NULL REFERENCES sucursales(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_pedidos_sucursalId ON pedidos("sucursalId");
CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(fecha);
CREATE INDEX IF NOT EXISTS idx_pedidos_numero ON pedidos(numero);

-- 4. Crear restricción única para número de pedido por sucursal
ALTER TABLE pedidos ADD CONSTRAINT unique_numero_per_sucursal 
  UNIQUE (numero, "sucursalId");

-- 5. Insertar datos de sucursales
INSERT INTO sucursales (id, name, passkey) VALUES
  ('lgx-suc-66', 'LGX-SUC-66', 123456),
  ('lgx-suc-44', 'LGX-SUC-44', 654321)
ON CONFLICT (id) DO NOTHING;

-- 6. Habilitar Row Level Security (RLS) - Opcional pero recomendado
ALTER TABLE sucursales ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- 7. Crear políticas de seguridad (permitir lectura/escritura a todos por ahora)
-- NOTA: En producción, deberías configurar políticas más restrictivas
CREATE POLICY "Permitir lectura de sucursales" ON sucursales
  FOR SELECT USING (true);

CREATE POLICY "Permitir todo en pedidos" ON pedidos
  FOR ALL USING (true);

-- 8. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Crear trigger para actualizar updated_at
CREATE TRIGGER update_pedidos_updated_at
  BEFORE UPDATE ON pedidos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 10. Habilitar Realtime para la tabla pedidos (para actualizaciones en tiempo real)
-- Esto se hace desde la interfaz de Supabase:
-- Database > Replication > pedidos > Enable Realtime
