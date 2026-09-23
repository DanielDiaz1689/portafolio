import { useEffect, useState, useRef } from 'react'
import { supabase, RETO_ID } from '../lib/supabase'

const STORAGE_KEY = 'reto200_cop_v1'
const TOTAL = 200
const META_COP = 20_100_000

function cop(n) {
  return '$' + (n * 1000).toLocaleString('es-CO')
}

function loadLocal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? new Set(JSON.parse(saved)) : new Set()
  } catch { return new Set() }
}

function saveLocal(done) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...done])) } catch {}
}

export default function Reto200() {
  const [done, setDone] = useState(loadLocal)
  const [synced, setSynced] = useState(false) // true cuando cargó de Supabase
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  // ── Cargar desde Supabase al montar ──────────────────────────────────────
  useEffect(() => {
    async function cargar() {
      if (!supabase) { setSynced(true); return }
      try {
        const { data, error } = await supabase
          .from('reto200_progress')
          .select('done_numbers')
          .eq('id', RETO_ID)
          .single()

        if (!error && data?.done_numbers) {
          const remoto = new Set(data.done_numbers)
          setDone(remoto)
          saveLocal(remoto)
        }
      } catch {}
      setSynced(true)
    }
    cargar()
  }, [])

  // ── Guardar en Supabase + localStorage cuando cambia done ─────────────────
  const firstRender = useRef(true)
  useEffect(() => {
    if (!synced) return
    if (firstRender.current) { firstRender.current = false; return }
    saveLocal(done)
    if (supabase) {
      supabase.from('reto200_progress').upsert({
        id: RETO_ID,
        done_numbers: [...done],
        updated_at: new Date().toISOString(),
      }).then(() => {})
    }
  }, [done, synced])

  function toggle(n) {
    setDone(prev => {
      const next = new Set(prev)
      if (next.has(n)) {
        next.delete(n)
      } else {
        next.add(n)
        showToast(`+${cop(n)} ahorrado ✓`)
      }
      return next
    })
  }

  function showToast(msg) {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  function resetAll() {
    if (!confirm('¿Reiniciar todo el reto? Se borrarán todos los avances.')) return
    setDone(new Set())
  }

  // ── Exportar a archivo .txt ───────────────────────────────────────────────
  function exportar() {
    const marcados = [...done].sort((a, b) => a - b)
    const sumN = marcados.reduce((a, b) => a + b, 0)
    const total = sumN * 1000
    const falta = META_COP - total

    const lineas = [
      '====================================',
      '   RETO 200 — RESPALDO DE PROGRESO',
      '====================================',
      `Fecha: ${new Date().toLocaleString('es-CO')}`,
      '',
      `Números completados: ${marcados.length} de 200`,
      `Total ahorrado:      $${total.toLocaleString('es-CO')} COP`,
      `Falta:               $${Math.max(0, falta).toLocaleString('es-CO')} COP`,
      '',
      '--- Números marcados ---',
      ...marcados.map(n => `  ${String(n).padStart(3)}  →  ${cop(n)}`),
      '',
      '--- Números pendientes ---',
      ...Array.from({ length: TOTAL }, (_, i) => i + 1)
        .filter(n => !done.has(n))
        .map(n => `  ${String(n).padStart(3)}  →  ${cop(n)}`),
    ]

    const blob = new Blob([lineas.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reto200_respaldo_${new Date().toISOString().slice(0,10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const count = done.size
  const sumN = [...done].reduce((a, b) => a + b, 0)
  const saved = sumN * 1000
  const remaining = Math.max(0, META_COP - saved)
  const pct = saved / META_COP

  function motto() {
    if (count >= 200) return '¡🏆 RETO COMPLETADO! ¡Ahorraste $20.100.000! 🎉'
    if (count >= 180) return '¡Zona élite! Pocos para llegar a los $20 millones ⚡'
    if (count >= 150) return '¡150 completados! Solo 50 para terminar el reto 🎯'
    if (count >= 100) return '¡100 días! Mitad del camino — ¡imparable! 💎'
    if (count >= 50)  return '¡50 completados! Ya llevas el 25% del reto 🔥'
    if (count >= 25)  return '¡25 días! El hábito está tomando forma 🌱'
    if (count >= 10)  return `¡Ya arrancaste! Llevas ${count} días 🚀`
    return '¡Empieza hoy, un día a la vez! 💪'
  }

  return (
    <div className="reto-wrap">
      {/* ── Header ── */}
      <header className="reto-header">
        <div className="reto-header-top">
          <div>
            <div className="reto-title">🎯 Reto 200</div>
            <div className="reto-subtitle">Meta: $20.100.000 COP</div>
          </div>

          <div className="reto-money">
            <div className="reto-saved">${saved.toLocaleString('es-CO')}</div>
            <div className="reto-money-label">ahorrado</div>
            <div className="reto-remaining">
              Faltan <strong>${remaining.toLocaleString('es-CO')}</strong>
            </div>
          </div>

          <div className="reto-days">
            <div className="reto-days-num">{count}</div>
            <div className="reto-days-label">de 200</div>
            <div className="reto-btns">
              <button className="reto-btn-export" onClick={exportar} title="Descargar respaldo">
                ⬇ Exportar
              </button>
              <button className="reto-btn-reset" onClick={resetAll}>↺ Reiniciar</button>
            </div>
          </div>
        </div>

        <div className="reto-progress-section">
          <div className="reto-progress-labels">
            <span className="reto-pct">{(pct * 100).toFixed(1)}%</span>
            <span>$20.100.000 COP</span>
          </div>
          <div className="reto-track">
            <div className="reto-fill" style={{ width: `${Math.min(pct * 100, 100)}%` }} />
          </div>
        </div>
      </header>

      {/* ── Grilla ── */}
      <div className="reto-grid-wrap">
        <div className="reto-grid">
          {Array.from({ length: TOTAL }, (_, i) => i + 1).map(n => {
            const isDone = done.has(n)
            return (
              <button
                key={n}
                className={`reto-cell${isDone ? ' done' : ''}`}
                onClick={() => toggle(n)}
                title={`${n} → ${cop(n)}`}
              >
                <span className="reto-cell-num">{n}</span>
                <span className="reto-cell-cop">{n}k</span>
                {isDone && <span className="reto-check">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="reto-footer">
        <div className="reto-motto">{motto()}</div>
        <div className="reto-footer-sub">
          Cada número = $1.000 COP · Haz clic para marcar ·{' '}
          <span style={{ color: 'var(--r-accent)' }}>
            {synced ? '☁ Sincronizado' : '⏳ Cargando...'}
          </span>
        </div>
      </footer>

      {/* ── Toast ── */}
      {toast && <div className="reto-toast">{toast}</div>}

      <style>{`
        :root {
          --r-bg:        #0b1120;
          --r-surface:   #131f35;
          --r-cell:      #1a2a42;
          --r-border:    #263652;
          --r-done-bg:   #064e35;
          --r-done-b:    #10b981;
          --r-done-t:    #6ee7b7;
          --r-text:      #e2e8f0;
          --r-muted:     #64748b;
          --r-accent:    #10b981;
          --r-gold:      #f59e0b;
        }
        @media (prefers-color-scheme: light) {
          :root {
            --r-bg:      #f0f4f8;
            --r-surface: #ffffff;
            --r-cell:    #e8eef6;
            --r-border:  #c8d5e8;
            --r-done-bg: #d1fae5;
            --r-done-b:  #10b981;
            --r-done-t:  #065f46;
            --r-text:    #0f172a;
            --r-muted:   #64748b;
          }
        }

        .reto-wrap { min-height: 100vh; background: var(--r-bg); color: var(--r-text);
                     font-family: 'Inter', system-ui, sans-serif; }

        .reto-header { position: sticky; top: 0; z-index: 50; background: var(--r-surface);
                       border-bottom: 1px solid var(--r-border); padding: 14px 20px 10px;
                       box-shadow: 0 4px 24px rgba(0,0,0,.3); }
        .reto-header-top { display: flex; align-items: center; justify-content: space-between;
                           margin-bottom: 12px; gap: 12px; }
        .reto-title    { font-size: 20px; font-weight: 800; letter-spacing: -.5px; }
        .reto-subtitle { font-size: 11px; color: var(--r-muted); font-weight: 500;
                         text-transform: uppercase; letter-spacing: .05em; }

        .reto-money { text-align: center; flex: 1; }
        .reto-saved { font-size: clamp(20px,4vw,30px); font-weight: 800; color: var(--r-gold);
                      font-variant-numeric: tabular-nums; letter-spacing: -1px; line-height: 1; }
        .reto-money-label { font-size: 11px; color: var(--r-muted); text-transform: uppercase;
                            letter-spacing: .06em; margin-top: 2px; }
        .reto-remaining   { font-size: 12px; color: var(--r-muted); margin-top: 4px; }
        .reto-remaining strong { color: var(--r-accent); font-weight: 700; }

        .reto-days { text-align: right; min-width: 90px; }
        .reto-days-num   { font-size: 30px; font-weight: 800; color: var(--r-accent);
                           font-variant-numeric: tabular-nums; line-height: 1; }
        .reto-days-label { font-size: 11px; color: var(--r-muted); text-transform: uppercase; }
        .reto-btns { display: flex; flex-direction: column; gap: 4px; margin-top: 6px; }

        .reto-btn-export, .reto-btn-reset {
          background: transparent; border-radius: 6px; padding: 4px 10px;
          font-size: 11px; font-weight: 600; cursor: pointer; transition: all .15s;
          letter-spacing: .03em; white-space: nowrap;
        }
        .reto-btn-export { border: 1px solid var(--r-accent); color: var(--r-accent); }
        .reto-btn-export:hover { background: var(--r-accent); color: #fff; }
        .reto-btn-reset  { border: 1px solid var(--r-border); color: var(--r-muted); }
        .reto-btn-reset:hover { border-color: #ef4444; color: #ef4444; }

        .reto-progress-section { margin-top: 8px; }
        .reto-progress-labels  { display: flex; justify-content: space-between;
                                  font-size: 11px; color: var(--r-muted); font-weight: 600;
                                  margin-bottom: 4px; font-variant-numeric: tabular-nums; }
        .reto-pct { color: var(--r-accent); }
        .reto-track { height: 8px; background: var(--r-cell); border-radius: 99px; overflow: hidden; }
        .reto-fill  { height: 100%; background: linear-gradient(90deg,#059669,#10b981,#34d399);
                      border-radius: 99px; transition: width .4s cubic-bezier(.4,0,.2,1); }

        .reto-grid-wrap { padding: 14px 14px 40px; }
        .reto-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px; }

        @media (max-width: 600px) {
          .reto-grid { grid-template-columns: repeat(5,1fr); gap: 5px; }
          .reto-header-top { flex-wrap: wrap; }
          .reto-money { order: 3; flex: 0 0 100%; text-align: left; }
          .reto-saved { font-size: 20px; }
          .reto-btns { flex-direction: row; }
        }
        @media (max-width: 380px) { .reto-grid { grid-template-columns: repeat(4,1fr); } }

        .reto-cell {
          aspect-ratio: 1; background: var(--r-cell); border: 1.5px solid var(--r-border);
          border-radius: 8px; display: flex; flex-direction: column; align-items: center;
          justify-content: center; cursor: pointer;
          transition: transform .12s, background .2s, border-color .2s;
          position: relative; padding: 0; gap: 2px;
        }
        .reto-cell:hover  { transform: scale(1.07); border-color: var(--r-accent); }
        .reto-cell:active { transform: scale(.94); }
        .reto-cell.done   { background: var(--r-done-bg); border-color: var(--r-done-b);
                            box-shadow: 0 0 10px rgba(16,185,129,.25); }

        .reto-cell-num { font-size: clamp(9px,1.8vw,13px); font-weight: 700; color: var(--r-muted);
                         line-height: 1; transition: color .2s; font-variant-numeric: tabular-nums; }
        .reto-cell-cop { font-size: clamp(7px,1vw,10px); font-weight: 500;
                         color: var(--r-muted); opacity: .6; line-height: 1; }
        .reto-cell.done .reto-cell-num { color: var(--r-done-t); font-weight: 800; }
        .reto-cell.done .reto-cell-cop { color: var(--r-done-t); opacity: .7; }
        .reto-check { position: absolute; top: 2px; right: 4px;
                      font-size: clamp(7px,1vw,10px); color: var(--r-accent);
                      font-weight: 700; line-height: 1; }

        .reto-footer     { text-align: center; padding: 10px 16px 36px; }
        .reto-motto      { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
        .reto-footer-sub { font-size: 12px; color: var(--r-muted); }

        .reto-toast {
          position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
          background: #064e35; border: 1px solid var(--r-accent); color: #6ee7b7;
          padding: 10px 22px; border-radius: 99px; font-size: 14px; font-weight: 700;
          pointer-events: none; z-index: 200; white-space: nowrap;
          animation: slideup .3s ease; font-variant-numeric: tabular-nums;
        }
        @keyframes slideup {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}
