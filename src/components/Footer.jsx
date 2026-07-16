import { perfil } from '../data/perfil'

export default function Footer() {
  return (
    <footer className="border-t border-borde/50 py-8 text-center text-sm text-apagado">
      <p>
        © {new Date().getFullYear()} {perfil.nombre} · Hecho con
        <span className="mx-1 text-acento-claro">React + Vite + Tailwind</span>
      </p>
    </footer>
  )
}
