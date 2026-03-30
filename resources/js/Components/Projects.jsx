import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

// ── PLATIO SCREENS ──────────────────────────────────────────────
const PlatioScreen1 = () => (
  <div style={{display:'flex',height:'100%',fontFamily:'-apple-system,BlinkMacSystemFont,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{width:'155px',background:'#fff',borderRight:'1px solid #f0f0f0',padding:'16px 12px',flexShrink:0}}>
      <div style={{fontSize:'15px',fontWeight:900,color:'#111',marginBottom:'4px'}}>Platio<span style={{color:'#f97316'}}>.</span></div>
      <div style={{fontSize:'9px',color:'#9ca3af',marginBottom:'20px'}}>Reserva, pide y saborea</div>
      {[['📊','Dashboard',true],['🪑','Mesas',false],['📋','Comandas',false],['📅','Reservas',false],['🍕','Carta digital',false],['🛵','Pedidos online',false],['📦','Stock',false],['📈','Informes',false]].map(([icon,label,active])=>(
        <div key={label} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 10px',borderRadius:'8px',marginBottom:'2px',background:active?'#fff7ed':'transparent',color:active?'#f97316':'#6b7280',fontWeight:active?600:400,fontSize:'11px'}}>
          <span style={{fontSize:'13px'}}>{icon}</span>{label}
        </div>
      ))}
    </div>
    <div style={{flex:1,padding:'18px',background:'#fafafa'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
        <div><div style={{fontSize:'17px',fontWeight:800,color:'#111'}}>Dashboard 👋</div><div style={{fontSize:'10px',color:'#9ca3af',marginTop:'2px'}}>Viernes 14 Jun • Restaurante Central</div></div>
        <div style={{background:'#f97316',color:'#fff',padding:'8px 14px',borderRadius:'9px',fontSize:'11px',fontWeight:700}}>+ Nueva comanda</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px',marginBottom:'14px'}}>
        {[['Comandas activas','12','#f97316','↑ 3 vs ayer'],['Pedidos online','8','#3b82f6','2 en camino'],['Ingresos hoy','€1.840','#111','↑ 12%'],['Reservas hoy','28','#8b5cf6','8 pendientes']].map(([l,v,c,s])=>(
          <div key={l} style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'10px',padding:'11px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{fontSize:'9px',color:'#9ca3af',marginBottom:'3px',textTransform:'uppercase',letterSpacing:'0.4px'}}>{l}</div>
            <div style={{fontSize:'19px',fontWeight:800,color:c}}>{v}</div>
            <div style={{fontSize:'9px',marginTop:'1px',color:s.includes('↑')?'#10b981':'#9ca3af'}}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
        <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'10px',padding:'12px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'9px'}}>Mesas en tiempo real</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'5px'}}>
            {[['M1','4 pax','ocu'],['M2','2 pax','ocu'],['M3','Reserva','res'],['M4','6 pax','ocu'],['M5','3 pax','ocu'],['M6','Libre','lib'],['M7','Libre','lib'],['M8','5 pax','ocu']].map(([m,p,t])=>(
              <div key={m} style={{borderRadius:'7px',padding:'7px 4px',textAlign:'center',fontSize:'10px',fontWeight:700,background:t==='ocu'?'#fff7ed':t==='res'?'#eff6ff':'#f9fafb',color:t==='ocu'?'#f97316':t==='res'?'#3b82f6':'#9ca3af',border:`1px solid ${t==='ocu'?'#fed7aa':t==='res'?'#bfdbfe':'#f0f0f0'}`}}>
                {m}<br/><span style={{fontSize:'8px',fontWeight:400}}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'10px',padding:'12px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'9px'}}>Pedidos online recientes</div>
          {[['Pedro G.','Paella x2','En cocina','#fff7ed','#f97316'],['Laura M.','Chuletón','En camino','#d1fae5','#059669'],['Anónimo','Menú x4','Nuevo','#dbeafe','#2563eb'],['Carlos R.','Bebidas','Entregado','#d1fae5','#059669']].map(([n,i,s,bg,c])=>(
            <div key={n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:'1px solid #fafafa',fontSize:'10px'}}>
              <span style={{fontWeight:700}}>{n}</span>
              <span style={{color:'#6b7280'}}>{i}</span>
              <span style={{background:bg,color:c,padding:'2px 7px',borderRadius:'999px',fontSize:'9px',fontWeight:600}}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const PlatioScreen2 = () => (
  <div style={{display:'flex',height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{width:'155px',background:'#fff',borderRight:'1px solid #f0f0f0',padding:'16px 12px',flexShrink:0}}>
      <div style={{fontSize:'15px',fontWeight:900,color:'#111',marginBottom:'4px'}}>Platio<span style={{color:'#f97316'}}>.</span></div>
      <div style={{fontSize:'9px',color:'#9ca3af',marginBottom:'20px'}}>Reserva, pide y saborea</div>
      {[['📊','Dashboard',false],['🪑','Mesas',false],['📋','Comandas',false],['📅','Reservas',true],['🍕','Carta digital',false],['🛵','Pedidos online',false],['📦','Stock',false],['📈','Informes',false]].map(([icon,label,active])=>(
        <div key={label} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 10px',borderRadius:'8px',marginBottom:'2px',background:active?'#fff7ed':'transparent',color:active?'#f97316':'#6b7280',fontWeight:active?600:400,fontSize:'11px'}}>
          <span style={{fontSize:'13px'}}>{icon}</span>{label}
        </div>
      ))}
    </div>
    <div style={{flex:1,padding:'18px',background:'#fafafa'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
        <div><div style={{fontSize:'17px',fontWeight:800,color:'#111'}}>Reservas 📅</div><div style={{fontSize:'10px',color:'#9ca3af',marginTop:'2px'}}>Viernes 14 Jun • 28 reservas</div></div>
        <div style={{background:'#f97316',color:'#fff',padding:'8px 14px',borderRadius:'9px',fontSize:'11px',fontWeight:700}}>+ Nueva reserva</div>
      </div>
      <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
        {[['19:00','García Martínez','4 pax','Mesa 3','Confirmada','#d1fae5','#059669'],['20:30','López Familia','6 pax','Mesa 8','Confirmada','#d1fae5','#059669'],['21:00','Empresa Tech','12 pax','Sala VIP','Pendiente','#fef3c7','#d97706'],['21:30','Anónimo web','2 pax','Mesa 1','Confirmada','#d1fae5','#059669'],['22:00','Rodríguez','3 pax','Mesa 5','Cancelada','#fee2e2','#dc2626']].map(([h,n,p,m,s,bg,c])=>(
          <div key={n} style={{display:'flex',alignItems:'center',gap:'12px',padding:'9px 0',borderBottom:'1px solid #f9fafb',fontSize:'11px'}}>
            <span style={{color:'#f97316',fontWeight:700,width:'42px',flexShrink:0}}>{h}</span>
            <span style={{flex:1,fontWeight:600,color:'#111'}}>{n}</span>
            <span style={{color:'#6b7280',width:'40px'}}>{p}</span>
            <span style={{color:'#9ca3af',width:'55px'}}>{m}</span>
            <span style={{background:bg,color:c,padding:'2px 8px',borderRadius:'999px',fontSize:'9px',fontWeight:600}}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const PlatioScreen3 = () => (
  <div style={{display:'flex',height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{width:'155px',background:'#fff',borderRight:'1px solid #f0f0f0',padding:'16px 12px',flexShrink:0}}>
      <div style={{fontSize:'15px',fontWeight:900,color:'#111',marginBottom:'4px'}}>Platio<span style={{color:'#f97316'}}>.</span></div>
      <div style={{fontSize:'9px',color:'#9ca3af',marginBottom:'20px'}}>Reserva, pide y saborea</div>
      {[['📊','Dashboard',false],['🪑','Mesas',false],['📋','Comandas',false],['📅','Reservas',false],['🍕','Carta digital',true],['🛵','Pedidos online',false],['📦','Stock',false],['📈','Informes',false]].map(([icon,label,active])=>(
        <div key={label} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 10px',borderRadius:'8px',marginBottom:'2px',background:active?'#fff7ed':'transparent',color:active?'#f97316':'#6b7280',fontWeight:active?600:400,fontSize:'11px'}}>
          <span style={{fontSize:'13px'}}>{icon}</span>{label}
        </div>
      ))}
    </div>
    <div style={{flex:1,padding:'18px',background:'#fafafa'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
        <div><div style={{fontSize:'17px',fontWeight:800,color:'#111'}}>Carta digital 🍕</div></div>
        <div style={{background:'#f97316',color:'#fff',padding:'8px 14px',borderRadius:'9px',fontSize:'11px',fontWeight:700}}>+ Añadir plato</div>
      </div>
      <div style={{display:'flex',gap:'6px',marginBottom:'12px'}}>
        {['Entrantes','Principales','Postres','Bebidas','Menú día'].map((c,i)=>(
          <div key={c} style={{padding:'5px 12px',borderRadius:'999px',background:i===0?'#f97316':'#fff',color:i===0?'#fff':'#6b7280',fontSize:'10px',fontWeight:i===0?700:400,border:'1px solid',borderColor:i===0?'#f97316':'#f0f0f0',cursor:'pointer'}}>{c}</div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
        {[['Croquetas caseras','Receta tradicional de la abuela','€8.50','✅ Disponible','#d1fae5','#059669'],['Jamón ibérico de bellota','Cortado al momento','€14.00','✅ Disponible','#d1fae5','#059669'],['Gazpacho andaluz','Receta de temporada','€6.00','⚠️ Stock bajo','#fef3c7','#d97706'],['Tabla mixta selección','Para compartir','€18.00','✅ Disponible','#d1fae5','#059669']].map(([n,d,p,s,bg,c])=>(
          <div key={n} style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'10px',padding:'12px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{fontWeight:700,fontSize:'12px',marginBottom:'3px',color:'#111'}}>{n}</div>
            <div style={{color:'#9ca3af',fontSize:'10px',marginBottom:'8px'}}>{d}</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{color:'#f97316',fontWeight:800,fontSize:'14px'}}>{p}</span>
              <span style={{background:bg,color:c,padding:'2px 7px',borderRadius:'999px',fontSize:'9px',fontWeight:600}}>{s}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const PlatioScreen4 = () => (
  <div style={{display:'flex',height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{width:'155px',background:'#fff',borderRight:'1px solid #f0f0f0',padding:'16px 12px',flexShrink:0}}>
      <div style={{fontSize:'15px',fontWeight:900,color:'#111',marginBottom:'4px'}}>Platio<span style={{color:'#f97316'}}>.</span></div>
      <div style={{fontSize:'9px',color:'#9ca3af',marginBottom:'20px'}}>Reserva, pide y saborea</div>
      {[['📊','Dashboard',false],['🪑','Mesas',false],['📋','Comandas',false],['📅','Reservas',false],['🍕','Carta digital',false],['🛵','Pedidos online',true],['📦','Stock',false],['📈','Informes',false]].map(([icon,label,active])=>(
        <div key={label} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 10px',borderRadius:'8px',marginBottom:'2px',background:active?'#fff7ed':'transparent',color:active?'#f97316':'#6b7280',fontWeight:active?600:400,fontSize:'11px'}}>
          <span style={{fontSize:'13px'}}>{icon}</span>{label}
        </div>
      ))}
    </div>
    <div style={{flex:1,padding:'18px',background:'#fafafa'}}>
      <div style={{fontSize:'17px',fontWeight:800,color:'#111',marginBottom:'14px'}}>Pedidos online 🛵</div>
      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
        {[['#2847','Pedro García','Paella valenciana x2 + Bebidas','€42.50','En cocina','#fff7ed','#f97316','15 min'],['#2846','Laura Martínez','Chuletón al punto + Vino','€38.00','En camino','#d1fae5','#059669','5 min'],['#2845','Carlos Ruiz','Menú del día x4','€56.00','Entregado','#f3f4f6','#6b7280','—'],['#2844','Anónimo','Tabla mixta + Postres','€29.00','Nuevo','#dbeafe','#2563eb','Ahora']].map(([id,n,items,total,s,bg,c,t])=>(
          <div key={id} style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'6px'}}>
              <div>
                <div style={{fontWeight:700,color:'#111',fontSize:'12px'}}>{n} <span style={{color:'#9ca3af',fontWeight:400,fontSize:'10px'}}>{id}</span></div>
                <div style={{color:'#6b7280',fontSize:'10px',marginTop:'2px'}}>{items}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{color:'#f97316',fontWeight:800,fontSize:'14px'}}>{total}</div>
                <div style={{color:'#9ca3af',fontSize:'9px',marginTop:'2px'}}>{t}</div>
              </div>
            </div>
            <span style={{background:bg,color:c,padding:'3px 10px',borderRadius:'999px',fontSize:'9px',fontWeight:700}}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ── TURNOCLICK SCREENS ──────────────────────────────────────────
const TurnoScreen1 = () => (
  <div style={{height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'11px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontSize:'14px',fontWeight:900,color:'#111'}}>Turno<span style={{color:'#6366f1'}}>Click</span></div>
      <div style={{display:'flex',gap:'2px'}}>
        {['Dashboard','Empleados','Turnos','Nóminas','Contratos','Vacaciones'].map((item,i)=>(
          <div key={item} style={{padding:'6px 11px',borderRadius:'7px',fontSize:'11px',color:i===0?'#6366f1':'#6b7280',background:i===0?'#eef2ff':'transparent',fontWeight:i===0?700:400}}>{item}</div>
        ))}
      </div>
      <div style={{background:'#6366f1',color:'#fff',padding:'7px 14px',borderRadius:'8px',fontSize:'11px',fontWeight:700}}>+ Nuevo empleado</div>
    </div>
    <div style={{padding:'18px',background:'#fafafa'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px',marginBottom:'14px'}}>
        {[['Empleados activos','24','#059669','#f0fdf4'],['Fichajes hoy','18','#6366f1','#eef2ff'],['Vacaciones activas','3','#d97706','#fffbeb'],['Nóminas pendientes','6','#7c3aed','#faf5ff']].map(([l,v,c,bg])=>(
          <div key={l} style={{borderRadius:'11px',padding:'13px',background:bg}}>
            <div style={{fontSize:'9px',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.4px',marginBottom:'5px',color:c,opacity:0.8}}>{l}</div>
            <div style={{fontSize:'21px',fontWeight:900,color:c}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr',gap:'10px'}}>
        <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'11px',padding:'13px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'9px',display:'flex',justifyContent:'space-between'}}>
            <span>Equipo de hoy</span><span style={{color:'#6366f1',fontSize:'10px'}}>Ver todos →</span>
          </div>
          {[['AG','#10b981','Ana García','Camarera','Mañana','#d1fae5','#059669','08:00–16:00'],['CL','#6366f1','Carlos López','Cocinero','Tarde','#dbeafe','#2563eb','12:00–20:00'],['MT','#f59e0b','María Torres','Jefa de sala','Mañana','#d1fae5','#059669','09:00–17:00'],['PR','#ec4899','Pedro Ruiz','Barman','Noche','#ede9fe','#7c3aed','16:00–00:00'],['LV','#06b6d4','Laura Vega','Cocinera','Descanso','#f3f4f6','#9ca3af','—']].map(([init,ac,name,role,turno,tbg,tc,time])=>(
            <div key={name} style={{display:'flex',alignItems:'center',gap:'8px',padding:'6px 0',borderBottom:'1px solid #f9fafb'}}>
              <div style={{width:'30px',height:'30px',borderRadius:'50%',background:ac,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:800,color:'#fff',flexShrink:0}}>{init}</div>
              <div style={{flex:1}}><div style={{fontSize:'11px',fontWeight:600,color:'#111'}}>{name}</div><div style={{fontSize:'9px',color:'#9ca3af'}}>{role}</div></div>
              <span style={{padding:'2px 8px',borderRadius:'999px',fontSize:'9px',fontWeight:700,background:tbg,color:tc}}>{turno}</span>
              <div style={{fontSize:'10px',color:'#6b7280',marginLeft:'4px'}}>{time}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'11px',padding:'13px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'9px'}}>Marcajes de hoy</div>
            {[['Ana G.','✓ 08:02','#059669'],['Carlos L.','✓ 11:58','#059669'],['María T.','✓ 09:03','#059669'],['Pedro R.','Pendiente','#9ca3af']].map(([n,h,c])=>(
              <div key={n} style={{display:'flex',justifyContent:'space-between',fontSize:'10px',padding:'4px 0',borderBottom:'1px solid #f9fafb'}}>
                <span style={{fontWeight:600}}>{n}</span><span style={{color:c}}>{h}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'11px',padding:'13px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'9px'}}>Próximas vacaciones</div>
            {[['Ana García','15–30 Jul','#d1fae5','#059669'],['Pedro Ruiz','1–15 Ago','#fef3c7','#d97706']].map(([n,f,bg,c])=>(
              <div key={n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'10px',padding:'4px 0'}}>
                <span>{n}</span><span style={{background:bg,color:c,padding:'1px 7px',borderRadius:'999px',fontSize:'9px'}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const TurnoScreen2 = () => (
  <div style={{height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'11px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontSize:'14px',fontWeight:900,color:'#111'}}>Turno<span style={{color:'#6366f1'}}>Click</span></div>
      <div style={{display:'flex',gap:'2px'}}>
        {['Dashboard','Empleados','Turnos','Nóminas','Contratos','Vacaciones'].map((item,i)=>(
          <div key={item} style={{padding:'6px 11px',borderRadius:'7px',fontSize:'11px',color:i===2?'#6366f1':'#6b7280',background:i===2?'#eef2ff':'transparent',fontWeight:i===2?700:400}}>{item}</div>
        ))}
      </div>
    </div>
    <div style={{padding:'18px',background:'#fafafa'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
        <div style={{fontSize:'17px',fontWeight:800,color:'#111'}}>Turnos — Semana 23</div>
        <div style={{background:'#6366f1',color:'#fff',padding:'7px 14px',borderRadius:'8px',fontSize:'11px',fontWeight:700}}>+ Asignar turno</div>
      </div>
      <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'11px'}}>
          <thead>
            <tr style={{color:'#9ca3af'}}>
              {['Empleado','Lunes','Martes','Miérc.','Jueves','Viernes','Sábado','Total'].map(h=>(
                <th key={h} style={{padding:'6px 8px',textAlign:'center',borderBottom:'1px solid #f0f0f0',fontWeight:600,fontSize:'10px'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[['Ana García',['M','M','T','-','M','M','-']],['Carlos L.',['-','T','T','T','T','-','-']],['María T.',['M','M','M','M','-','M','-']],['Pedro R.',['N','N','-','N','N','N','-']],['Laura V.',['T','T','-','T','-','T','T']]].map(([name,days])=>(
              <tr key={name}>
                <td style={{padding:'8px',fontWeight:600,color:'#111',borderBottom:'1px solid #f9fafb'}}>{name}</td>
                {days.map((d,i)=>(
                  <td key={i} style={{padding:'8px',textAlign:'center',borderBottom:'1px solid #f9fafb'}}>
                    {d!=='-' && <span style={{background:d==='M'?'#d1fae5':d==='T'?'#dbeafe':'#ede9fe',color:d==='M'?'#059669':d==='T'?'#2563eb':'#7c3aed',padding:'3px 8px',borderRadius:'999px',fontSize:'9px',fontWeight:700}}>{d==='M'?'Mañ':d==='T'?'Tarde':'Noche'}</span>}
                    {d==='-' && <span style={{color:'#e5e7eb'}}>—</span>}
                  </td>
                ))}
                <td style={{padding:'8px',textAlign:'center',fontWeight:700,color:'#6366f1',borderBottom:'1px solid #f9fafb'}}>{days.filter(d=>d!=='-').length*8}h</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:'flex',gap:'16px',marginTop:'10px',fontSize:'9px',color:'#9ca3af'}}>
          <span><span style={{color:'#059669',fontWeight:700}}>■</span> Mañana</span>
          <span><span style={{color:'#2563eb',fontWeight:700}}>■</span> Tarde</span>
          <span><span style={{color:'#7c3aed',fontWeight:700}}>■</span> Noche</span>
        </div>
      </div>
    </div>
  </div>
)

const TurnoScreen3 = () => (
  <div style={{height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'11px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontSize:'14px',fontWeight:900,color:'#111'}}>Turno<span style={{color:'#6366f1'}}>Click</span></div>
      <div style={{display:'flex',gap:'2px'}}>
        {['Dashboard','Empleados','Turnos','Nóminas','Contratos','Vacaciones'].map((item,i)=>(
          <div key={item} style={{padding:'6px 11px',borderRadius:'7px',fontSize:'11px',color:i===3?'#6366f1':'#6b7280',background:i===3?'#eef2ff':'transparent',fontWeight:i===3?700:400}}>{item}</div>
        ))}
      </div>
    </div>
    <div style={{padding:'18px',background:'#fafafa'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
        <div style={{fontSize:'17px',fontWeight:800,color:'#111'}}>Nóminas — Junio 2025</div>
        <div style={{background:'#6366f1',color:'#fff',padding:'7px 14px',borderRadius:'8px',fontSize:'11px',fontWeight:700}}>Generar nóminas</div>
      </div>
      <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
        {[['Ana García','Camarera','160h','€1.450','€1.160','Pagada','#d1fae5','#059669'],['Carlos López','Cocinero','168h','€1.820','€1.456','Pagada','#d1fae5','#059669'],['María Torres','Jefa de sala','152h','€2.100','€1.680','Pendiente','#fef3c7','#d97706'],['Pedro Ruiz','Barman','144h','€1.350','€1.080','Pendiente','#fef3c7','#d97706'],['Laura Vega','Cocinera','160h','€1.650','€1.320','Pagada','#d1fae5','#059669']].map(([n,r,h,b,n2,s,bg,c])=>(
          <div key={n} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 0',borderBottom:'1px solid #f9fafb',fontSize:'11px'}}>
            <div style={{flex:1}}><div style={{fontWeight:600,color:'#111'}}>{n}</div><div style={{fontSize:'9px',color:'#9ca3af'}}>{r} • {h}</div></div>
            <div style={{textAlign:'right',marginRight:'8px'}}><div style={{fontWeight:700,color:'#111'}}>{b}</div><div style={{fontSize:'9px',color:'#9ca3af'}}>Neto: {n2}</div></div>
            <span style={{background:bg,color:c,padding:'3px 10px',borderRadius:'999px',fontSize:'9px',fontWeight:700,minWidth:'65px',textAlign:'center'}}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const TurnoScreen4 = () => (
  <div style={{height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'11px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontSize:'14px',fontWeight:900,color:'#111'}}>Turno<span style={{color:'#6366f1'}}>Click</span></div>
      <div style={{display:'flex',gap:'2px'}}>
        {['Dashboard','Empleados','Turnos','Nóminas','Contratos','Vacaciones'].map((item,i)=>(
          <div key={item} style={{padding:'6px 11px',borderRadius:'7px',fontSize:'11px',color:i===5?'#6366f1':'#6b7280',background:i===5?'#eef2ff':'transparent',fontWeight:i===5?700:400}}>{item}</div>
        ))}
      </div>
    </div>
    <div style={{padding:'18px',background:'#fafafa'}}>
      <div style={{fontSize:'17px',fontWeight:800,color:'#111',marginBottom:'14px'}}>Vacaciones & Contratos</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
        <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'10px'}}>Solicitudes de vacaciones</div>
          {[['Ana García','15 Jul – 30 Jul','15 días','Aprobada','#d1fae5','#059669'],['Pedro Ruiz','1 Ago – 15 Ago','14 días','Pendiente','#fef3c7','#d97706'],['Carlos López','20 Ago – 5 Sep','16 días','En revisión','#ede9fe','#7c3aed']].map(([n,f,d,s,bg,c])=>(
            <div key={n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:'1px solid #f9fafb',fontSize:'10px'}}>
              <div><div style={{fontWeight:600,color:'#111'}}>{n}</div><div style={{color:'#9ca3af',marginTop:'1px'}}>{f} • {d}</div></div>
              <span style={{background:bg,color:c,padding:'2px 8px',borderRadius:'999px',fontSize:'9px',fontWeight:700}}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'10px'}}>Contratos activos</div>
          {[['Ana García','Indefinido','—','#d1fae5','#059669'],['Carlos López','Indefinido','—','#d1fae5','#059669'],['María Torres','Temporal','Vence 31 Dic','#fef3c7','#d97706'],['Pedro Ruiz','Temporal','Vence 30 Sep','#fee2e2','#dc2626'],['Laura Vega','Indefinido','—','#d1fae5','#059669']].map(([n,t,v,bg,c])=>(
            <div key={n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid #f9fafb',fontSize:'10px'}}>
              <span style={{fontWeight:600,color:'#111'}}>{n}</span>
              <span style={{color:'#6b7280'}}>{t}</span>
              <span style={{color:c,fontSize:'9px',background:bg,padding:'1px 6px',borderRadius:'999px'}}>{v||'Vigente'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// ── TANDEM SCREENS ──────────────────────────────────────────────
const TandemScreen1 = () => (
  <div style={{height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'10px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontSize:'15px',fontWeight:900,background:'linear-gradient(90deg,#8b5cf6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Tandem</div>
      <div style={{display:'flex',gap:'6px'}}>
        <div style={{padding:'6px 12px',borderRadius:'7px',fontSize:'10px',fontWeight:700,background:'#f3f4f6',color:'#374151'}}>Mis proyectos</div>
        <div style={{padding:'6px 12px',borderRadius:'7px',fontSize:'10px',fontWeight:700,background:'#f3f4f6',color:'#374151'}}>Presupuestos</div>
        <div style={{padding:'6px 12px',borderRadius:'7px',fontSize:'10px',fontWeight:700,background:'#8b5cf6',color:'#fff'}}>+ Nuevo proyecto</div>
      </div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 260px',height:'calc(100% - 42px)'}}>
      <div style={{padding:'16px',background:'#fafafa',overflowY:'auto'}}>
        <div style={{fontSize:'12px',fontWeight:800,color:'#111',marginBottom:'10px'}}>Proyectos activos</div>
        {[['Platio','Restaurante Central','3 de 6 — Backend Laravel','75%','340h','480h','#10b981','linear-gradient(90deg,#10b981,#06b6d4)','#d1fae5','#059669','En desarrollo',[1,1,0.5,0,0,0]],['TurnoClick','HR Solutions SL','4 de 8 — Frontend React','55%','210h','380h','#6366f1','linear-gradient(90deg,#6366f1,#8b5cf6)','#dbeafe','#2563eb','En revisión',[1,1,1,0.5,0,0,0,0]],['E-Commerce B2B','Distribuciones Pérez','1 de 8 — Planificación','10%','18h','520h','#f59e0b','#f59e0b','#fef3c7','#d97706','Presupuesto',[0.2,0,0,0,0,0,0,0]]].map(([name,client,fase,pct,inv,est,color,grad,sbg,sc,status,phases])=>(
          <div key={name} style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'11px',padding:'13px',marginBottom:'8px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
              <div><div style={{fontSize:'13px',fontWeight:800,color:'#111'}}>{name}</div><div style={{fontSize:'9px',color:'#9ca3af',marginTop:'2px'}}>Cliente: {client} • {inv} invertidas</div></div>
              <span style={{fontSize:'9px',fontWeight:700,padding:'3px 9px',borderRadius:'999px',background:sbg,color:sc}}>{status}</span>
            </div>
            <div style={{background:'#f3f4f6',borderRadius:'999px',height:'5px',marginBottom:'4px'}}>
              <div style={{background:grad,width:pct,height:'100%',borderRadius:'999px'}}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'9px',color:'#9ca3af',marginBottom:'8px'}}>
              <span>Fase {fase}</span><span style={{color:color,fontWeight:800}}>{pct}</span>
            </div>
            <div style={{display:'flex',gap:'3px',marginBottom:'8px'}}>
              {phases.map((op,i)=><div key={i} style={{flex:1,height:'3px',borderRadius:'999px',background:color,opacity:op===0?0.12:op}}/>)}
            </div>
            <div style={{display:'flex',gap:'8px'}}>
              {[['Estimadas',est],['Invertidas',inv],['Restantes',String(parseInt(est)- parseInt(inv))+'h']].map(([l,v])=>(
                <div key={l} style={{background:'#f3f4f6',borderRadius:'6px',padding:'3px 9px',fontSize:'9px',color:'#6b7280'}}>{l} <span style={{fontWeight:700,color:'#111'}}>{v}</span></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{background:'#fff',borderLeft:'1px solid #f0f0f0',padding:'14px'}}>
        <div style={{background:'#faf5ff',border:'1px solid #ede9fe',borderRadius:'10px',padding:'12px',marginBottom:'10px'}}>
          <div style={{fontSize:'11px',fontWeight:800,color:'#8b5cf6',marginBottom:'8px'}}>🤖 IA — Fases de Platio</div>
          {[['#10b981',true,'Análisis y planificación'],['#10b981',true,'Diseño UI/UX'],['#06b6d4',false,'Backend Laravel ← actual'],['#e5e7eb',false,'Frontend React'],['#e5e7eb',false,'Testing & QA'],['#e5e7eb',false,'Despliegue']].map(([c,done,label])=>(
            <div key={label} style={{display:'flex',alignItems:'center',gap:'6px',padding:'4px 0',fontSize:'10px',color:'#374151'}}>
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:c,flexShrink:0}}/>
              <span style={{color:done?'#9ca3af':'inherit',textDecoration:done?'line-through':'none',fontWeight:!done&&c!=='#e5e7eb'?700:400}}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'10px',padding:'12px'}}>
          <div style={{fontSize:'10px',fontWeight:700,color:'#111',marginBottom:'8px'}}>💬 Mensajes — Platio</div>
          {[['Cliente','10:23','¿Cuándo estará lista la fase del backend?',false],['Iñaki','10:31','Previsto para el viernes 20 🚀',true],['Cliente','10:35','Perfecto, ¿el presupuesto sigue igual?',false]].map(([who,time,msg,mine])=>(
            <div key={time} style={{marginBottom:'6px',textAlign:mine?'right':'left'}}>
              <div style={{fontSize:'8px',color:'#9ca3af',marginBottom:'2px'}}>{who} • {time}</div>
              <div style={{display:'inline-block',padding:'6px 10px',borderRadius:'10px',fontSize:'10px',maxWidth:'90%',lineHeight:1.4,background:mine?'#8b5cf6':'#f3f4f6',color:mine?'#fff':'#374151'}}>{msg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const TandemScreen2 = () => (
  <div style={{height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'10px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontSize:'15px',fontWeight:900,background:'linear-gradient(90deg,#8b5cf6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Tandem</div>
      <div style={{fontSize:'12px',fontWeight:600,color:'#6b7280'}}>Platio — Vista cliente</div>
    </div>
    <div style={{padding:'20px',background:'#fafafa',height:'calc(100% - 42px)'}}>
      <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'14px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'14px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <div><div style={{fontSize:'16px',fontWeight:800,color:'#111'}}>Platio</div><div style={{fontSize:'10px',color:'#9ca3af'}}>Inicio: 1 Mar 2025 • Entrega estimada: 30 Jul 2025</div></div>
          <div style={{background:'#d1fae5',color:'#059669',padding:'5px 14px',borderRadius:'999px',fontSize:'10px',fontWeight:700}}>En desarrollo</div>
        </div>
        <div style={{background:'#f3f4f6',borderRadius:'999px',height:'8px',marginBottom:'8px'}}>
          <div style={{background:'linear-gradient(90deg,#10b981,#06b6d4)',width:'75%',height:'100%',borderRadius:'999px'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'10px',color:'#9ca3af',marginBottom:'16px'}}>
          <span>Progreso general</span><span style={{color:'#10b981',fontWeight:800}}>75% completado</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'6px'}}>
          {[['Análisis','✅','#d1fae5','#059669'],['Diseño UI','✅','#d1fae5','#059669'],['Backend','🔄','#dbeafe','#2563eb'],['Frontend','⏳','#f3f4f6','#9ca3af'],['Testing','⏳','#f3f4f6','#9ca3af'],['Despliegue','⏳','#f3f4f6','#9ca3af']].map(([label,icon,bg,c])=>(
            <div key={label} style={{background:bg,borderRadius:'10px',padding:'10px 6px',textAlign:'center'}}>
              <div style={{fontSize:'16px',marginBottom:'4px'}}>{icon}</div>
              <div style={{fontSize:'9px',fontWeight:600,color:c}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
        <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'10px'}}>💰 Presupuesto</div>
          {[['Presupuesto total','€12.500'],['Pagado','€7.500'],['Pendiente','€5.000']].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:'11px',padding:'5px 0',borderBottom:'1px solid #f9fafb'}}>
              <span style={{color:'#6b7280'}}>{l}</span><span style={{fontWeight:700,color:'#111'}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
          <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'10px'}}>⏱️ Horas del proyecto</div>
          {[['Estimadas','480h'],['Invertidas','340h'],['Restantes','140h']].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:'11px',padding:'5px 0',borderBottom:'1px solid #f9fafb'}}>
              <span style={{color:'#6b7280'}}>{l}</span><span style={{fontWeight:700,color:'#8b5cf6'}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const TandemScreen3 = () => (
  <div style={{height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'10px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontSize:'15px',fontWeight:900,background:'linear-gradient(90deg,#8b5cf6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Tandem</div>
      <div style={{fontSize:'12px',fontWeight:600,color:'#6b7280'}}>Presupuestos</div>
    </div>
    <div style={{padding:'18px',background:'#fafafa',height:'calc(100% - 42px)'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginBottom:'14px'}}>
        {[['Total facturado','€24.500','#059669','#f0fdf4'],['Pendiente cobro','€8.200','#d97706','#fffbeb'],['Este mes','€6.800','#8b5cf6','#faf5ff']].map(([l,v,c,bg])=>(
          <div key={l} style={{background:bg,borderRadius:'11px',padding:'14px'}}>
            <div style={{fontSize:'9px',color:c,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.4px',marginBottom:'6px',opacity:0.8}}>{l}</div>
            <div style={{fontSize:'22px',fontWeight:900,color:c}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{background:'#fff',border:'1px solid #f0f0f0',borderRadius:'12px',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
        <div style={{fontSize:'11px',fontWeight:700,color:'#111',marginBottom:'10px'}}>Presupuestos recientes</div>
        {[['Platio','Restaurante Central','€12.500','Aceptado','#d1fae5','#059669'],['TurnoClick','HR Solutions SL','€8.200','Pendiente','#fef3c7','#d97706'],['E-Commerce B2B','Distribuciones Pérez','€18.000','Negociando','#ede9fe','#7c3aed'],['App Móvil','Cliente Nuevo','€9.500','Enviado','#dbeafe','#2563eb']].map(([n,c,p,s,bg,sc])=>(
          <div key={n} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 0',borderBottom:'1px solid #f9fafb',fontSize:'11px'}}>
            <div style={{flex:1}}><div style={{fontWeight:700,color:'#111'}}>{n}</div><div style={{fontSize:'9px',color:'#9ca3af',marginTop:'1px'}}>{c}</div></div>
            <span style={{fontWeight:800,color:'#8b5cf6',fontSize:'13px'}}>{p}</span>
            <span style={{background:bg,color:sc,padding:'3px 10px',borderRadius:'999px',fontSize:'9px',fontWeight:700}}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const TandemScreen4 = () => (
  <div style={{height:'100%',fontFamily:'-apple-system,system-ui,sans-serif',fontSize:'12px',background:'#fff'}}>
    <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'10px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{fontSize:'15px',fontWeight:900,background:'linear-gradient(90deg,#8b5cf6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Tandem</div>
      <div style={{fontSize:'12px',fontWeight:600,color:'#6b7280'}}>Chat — Platio</div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'220px 1fr',height:'calc(100% - 42px)'}}>
      <div style={{borderRight:'1px solid #f0f0f0',padding:'12px'}}>
        <div style={{fontSize:'10px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px'}}>Proyectos</div>
        {[['Platio','Restaurante Central','#d1fae5','#059669',true],['TurnoClick','HR Solutions SL','#dbeafe','#2563eb',false],['E-Commerce B2B','Dist. Pérez','#fef3c7','#d97706',false]].map(([n,c,bg,col,active])=>(
          <div key={n} style={{padding:'9px',borderRadius:'9px',marginBottom:'4px',background:active?'#faf5ff':'transparent',border:active?'1px solid #ede9fe':'1px solid transparent',cursor:'pointer'}}>
            <div style={{fontWeight:700,color:'#111',fontSize:'11px'}}>{n}</div>
            <div style={{fontSize:'9px',color:'#9ca3af',marginTop:'1px'}}>{c}</div>
            <span style={{background:bg,color:col,padding:'1px 6px',borderRadius:'999px',fontSize:'8px',fontWeight:600,marginTop:'4px',display:'inline-block'}}>Activo</span>
          </div>
        ))}
      </div>
      <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
        <div style={{flex:1,padding:'14px',overflowY:'auto',display:'flex',flexDirection:'column',gap:'8px'}}>
          {[['Cliente','10:23','¿Cuándo estará lista la fase del backend?',false],['Iñaki','10:31','Estamos al 75%. Previsto para el viernes 20 🚀',true],['Cliente','10:35','Perfecto, ¿el presupuesto sigue igual?',false],['Iñaki','10:36','Sí, te adjunto el presupuesto actualizado. 📎 presupuesto_v2.pdf',true],['Cliente','10:40','Perfecto, muchas gracias. ¿Podemos hacer una llamada esta semana?',false],['Iñaki','10:42','Claro, te propongo el jueves a las 10h. ¿Te va bien?',true]].map(([who,time,msg,mine])=>(
            <div key={time} style={{display:'flex',flexDirection:'column',alignItems:mine?'flex-end':'flex-start'}}>
              <div style={{fontSize:'8px',color:'#9ca3af',marginBottom:'3px'}}>{who} • {time}</div>
              <div style={{padding:'8px 12px',borderRadius:'12px',fontSize:'11px',maxWidth:'75%',lineHeight:1.5,background:mine?'#8b5cf6':'#f3f4f6',color:mine?'#fff':'#374151'}}>{msg}</div>
            </div>
          ))}
        </div>
        <div style={{padding:'12px',borderTop:'1px solid #f0f0f0',display:'flex',gap:'8px',alignItems:'center'}}>
          <div style={{flex:1,background:'#f9fafb',border:'1px solid #f0f0f0',borderRadius:'10px',padding:'8px 12px',fontSize:'11px',color:'#9ca3af'}}>Escribe un mensaje...</div>
          <div style={{background:'#8b5cf6',color:'#fff',padding:'8px 14px',borderRadius:'10px',fontSize:'11px',fontWeight:700,cursor:'pointer'}}>Enviar</div>
        </div>
      </div>
    </div>
  </div>
)

const featuredProjects = [
  {
    title: 'Platio',
    subtitle: 'Reserva, pide y saborea',
    description: 'Plataforma todo-en-uno para restaurantes: gestión de comandas, reservas, carta digital, pedidos online y control de stock. Los clientes pueden reservar mesa y hacer pedidos directamente desde la app.',
    tags: ['Laravel', 'React', 'MySQL', 'phpMyAdmin', 'React Natvie'],
    screens: [PlatioScreen1, PlatioScreen2, PlatioScreen3, PlatioScreen4],
    screenLabels: ['Dashboard', 'Reservas', 'Carta digital', 'Pedidos online'],
    gradient: 'from-orange-500 to-amber-500',
    color: '#f97316',
    github: '#',
    demo: '#',
  },
  {
    title: 'TurnoClick',
    subtitle: 'Turnos, nóminas y más',
    description: 'Sistema completo de gestión de empleados: turnos semanales, fichajes, vacaciones, nóminas y contratos en un solo lugar. Reduce la carga administrativa y mantén tu equipo organizado.',
    tags: ['Nextjs', 'React', 'MySQL', 'TypeScript'],
    screens: [TurnoScreen1, TurnoScreen2, TurnoScreen3, TurnoScreen4],
    screenLabels: ['Dashboard', 'Turnos', 'Nóminas', 'Vacaciones'],
    gradient: 'from-indigo-500 to-violet-500',
    color: '#6366f1',
    github: '#',
    demo: '#',
  },
  {
    title: 'Tandem',
    subtitle: 'Gestión de proyectos con IA',
    description: 'Plataforma donde el cliente ve en tiempo real el progreso de su software. La IA divide el proyecto en fases automáticamente, gestiona presupuestos y centraliza la comunicación programador-cliente.',
    tags: ['Laravel', 'React', 'IA', 'MySQL', 'TypeScript'],
    screens: [TandemScreen1, TandemScreen2, TandemScreen3, TandemScreen4],
    screenLabels: ['Proyectos', 'Vista cliente', 'Presupuestos', 'Chat'],
    gradient: 'from-violet-500 to-cyan-500',
    color: '#8b5cf6',
    github: '#',
    demo: '#',
  },
]

function MockupCarousel({ project }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % project.screens.length), 5000)
    return () => clearInterval(timer)
  }, [project.screens.length])

  const prev = () => setCurrent(c => (c - 1 + project.screens.length) % project.screens.length)
  const next = () => setCurrent(c => (c + 1) % project.screens.length)
  const Screen = project.screens[current]

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '560px' }}>
      <div style={{ height: '100%', position: 'relative' }}>
        <Screen />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
          <div className={`inline-block px-4 py-1 bg-gradient-to-r ${project.gradient} rounded-full text-xs font-bold mb-3`} style={{color:'#fff'}}>
            Proyecto Destacado
          </div>
          <h3 className="text-3xl font-black mb-1">{project.title}</h3>
          <p style={{color: project.color}} className="text-sm font-semibold mb-3">{project.subtitle}</p>
          <p className="text-slate-200 text-sm leading-relaxed mb-4 max-w-2xl">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">{tag}</span>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-slate-100 transition-all">
              <FaGithub size={14} /> Ver Código
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-sm hover:bg-white/30 transition-all">
              <ExternalLink className="w-4 h-4" /> Demo en Vivo
            </button>
          </div>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-4 z-20 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
        <ChevronLeft className="w-4 h-4 text-slate-800" />
      </button>
      <button onClick={next} className="absolute right-4 top-4 z-20 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
        <ChevronRight className="w-4 h-4 text-slate-800" />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {project.screenLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${i === current ? 'bg-white text-slate-900' : 'bg-white/30 text-white hover:bg-white/50'}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── MOBILE CARDS ───────────────────────────────────────────────
const mobileProjects = [
  { title: 'Platio', subtitle: 'Reserva, pide y saborea', description: 'Plataforma todo-en-uno para restaurantes: comandas, reservas, carta digital, pedidos online y control de stock.', tags: ['Laravel', 'React', 'MySQL'], color: '#f97316', gradient: 'from-orange-500 to-amber-500', icon: '🍽️' },
  { title: 'TurnoClick', subtitle: 'Turnos, nóminas y más', description: 'Sistema completo de gestión de empleados: turnos, fichajes, vacaciones, nóminas y contratos en un solo lugar.', tags: ['Laravel', 'React', 'TypeScript'], color: '#6366f1', gradient: 'from-indigo-500 to-violet-500', icon: '👥' },
  { title: 'Tandem', subtitle: 'Gestión de proyectos con IA', description: 'El cliente ve el progreso en tiempo real. La IA divide fases, gestiona presupuestos y centraliza la comunicación.', tags: ['Laravel', 'React', 'IA'], color: '#8b5cf6', gradient: 'from-violet-500 to-cyan-500', icon: '🤖' },
]

function MobileProjects({ dark }) {
  return (
    <div className="flex flex-col gap-6">
      {mobileProjects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`rounded-2xl overflow-hidden ${dark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-lg border border-slate-100'}`}
        >
          <div className={`bg-gradient-to-r ${project.gradient} p-6 flex items-center gap-4`}>
            <span className="text-4xl">{project.icon}</span>
            <div>
              <h3 className="text-xl font-black text-white">{project.title}</h3>
              <p className="text-white/80 text-sm">{project.subtitle}</p>
            </div>
          </div>
          <div className="p-5">
            <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-xs font-mono">{tag}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <button className={`flex items-center gap-2 text-sm font-semibold transition-colors ${dark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>
                <FaGithub size={14} /> Código
              </button>
              <button className="flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                <ExternalLink className="w-3 h-3" /> Demo
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Projects() {
  const { dark } = useTheme()
  const [activeProject, setActiveProject] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="proyectos" className={`py-16 md:py-24 px-4 ${dark ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-white to-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Proyectos Destacados
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-4 md:mb-6" />
          <p className={`text-base md:text-xl max-w-2xl mx-auto ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            Soluciones reales desarrolladas para resolver problemas de negocio
          </p>
        </motion.div>

        {/* Mobile version */}
        {isMobile ? (
          <MobileProjects dark={dark} />
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {featuredProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeProject === index
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                      : dark
                        ? 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                        : 'bg-white text-slate-600 border border-slate-200 shadow-sm hover:text-slate-900'
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>

            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <MockupCarousel project={featuredProjects[activeProject]} />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => {
                const PreviewScreen = project.screens[0]
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveProject(index)}
                    className={`group rounded-2xl overflow-hidden transition-all cursor-pointer ${
                      activeProject === index
                        ? 'ring-2 ring-emerald-400 shadow-lg'
                        : dark
                          ? 'bg-white/5 border border-white/10 hover:border-emerald-400/40'
                          : 'bg-white shadow-lg hover:shadow-xl border border-slate-100'
                    }`}
                  >
                    <div className="relative overflow-hidden" style={{ height: '130px', pointerEvents: 'none' }}>
                      <div style={{ transform: 'scale(0.52)', transformOrigin: 'top left', width: '192%', height: '192%' }}>
                        <PreviewScreen />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-3">
                        <p className="text-white font-black text-sm">{project.title}</p>
                        <p className="text-xs" style={{ color: project.color }}>{project.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-emerald-400/10 text-emerald-400 rounded-full text-xs font-mono">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
