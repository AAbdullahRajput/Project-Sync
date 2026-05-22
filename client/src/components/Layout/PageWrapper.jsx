import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

export default function PageWrapper({ children }) {
  return (
    <>
      <style>{`
        .page-layout { display: flex; min-height: 100vh; background: #0f1117; }
        .page-sidebar { display: flex; }
        .page-main { flex: 1; overflow-x: hidden; padding-bottom: 0; }
        @media (max-width: 767px) {
          .page-sidebar { display: none; }
          .page-main { padding-bottom: 70px; }
        }
      `}</style>
      <div className="page-layout">
        <div className="page-sidebar"><Sidebar /></div>
        <main className="page-main">{children}</main>
      </div>
      <BottomNav />
    </>
  )
}