const skills = [
  { name: 'Laravel / PHP', level: 90, color: 'from-red-500 to-orange-400' },
  { name: 'React', level: 85, color: 'from-cyan-500 to-blue-400' },
  { name: 'JavaScript / TypeScript', level: 80, color: 'from-yellow-500 to-amber-400' },
  { name: 'MySQL', level: 85, color: 'from-blue-500 to-indigo-400' },
  { name: 'Git / GitHub', level: 90, color: 'from-emerald-500 to-teal-400' },
  { name: 'phpMyAdmin', level: 80, color: 'from-orange-500 to-yellow-400' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <p className="text-emerald-400 text-sm font-mono mb-4 tracking-widest uppercase">
          Tecnologías
        </p>
        <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">
          Mi <span className="text-emerald-400">stack</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map(skill => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span className="text-white font-semibold">{skill.name}</span>
                <span className="text-gray-400 text-sm">{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
