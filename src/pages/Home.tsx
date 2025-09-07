</div>
          <p className="mt-3 text-sm text-amber-100">Sin spam. Puedes darte de baja cuando quieras.</p>
        </form>
      </Section>

      <Section id="contacto" title="Contacto">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Escríbenos</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("¡Mensaje enviado! Te responderemos pronto."); e.currentTarget.reset(); }} className="mt-4 space-y-3">
              <input className="w-full px-4 py-3 rounded-xl border bg-white/95 text-blue-900 placeholder:text-blue-600" placeholder="Nombre" required />
              <input className="w-full px-4 py-3 rounded-xl border bg-white/95 text-blue-900 placeholder:text-blue-600" type="email" placeholder="Correo" required />
              <textarea className="w-full px-4 py-3 rounded-xl border bg-white/95 text-blue-900 placeholder:text-blue-600" rows={4} placeholder="¿Cómo podemos ayudar?" />
              <button className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border ${THEME.borderAccent} text-white hover:bg-amber-500 hover:text-white transition`}>
                <Mail className="h-5 w-5" /> Enviar
              </button>
            </form>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Accesos rápidos</h3>
            <ul className="mt-3 space-y-2 text-base">
              <li><Link to="/english" className="link-underline text-white">Ver programas</Link></li>
              <li><a href="#precios" className="link-underline text-white">Precios</a></li>
              <li><a href="#opiniones" className="link-underline text-white">Opiniones</a></li>
              <li><a href="#boletin" className="link-underline text-white">Suscribirse al boletín</a></li>
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}          
