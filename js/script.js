
  function navigate(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('[data-page="' + pageId + '"]').forEach(a => a.classList.add('active'));
    document.getElementById('navLinks').classList.remove('open');
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', e => {
    const link = e.target.closest('[data-page]');
    if (link) { e.preventDefault(); navigate(link.dataset.page); }
  });

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });


  document.addEventListener('click', e => {
    if (!e.target.classList.contains('tab-btn')) return;
    const btn = e.target;
    const scope = btn.closest('.card, .container');
    if (!scope) return;
    scope.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    scope.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });


  let lbImages = [];
  let lbCurrent = 0;

  function openLightbox(img, title, desc, groupImgs, index) {
    lbImages = groupImgs;
    lbCurrent = index;
    document.getElementById('lightbox-img').src = img;
    document.getElementById('lightbox-img').alt = title;
    setLightboxCaption(title, desc);
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function setLightboxCaption(title, desc) {
    const cap = document.getElementById('lightbox-caption');
    cap.innerHTML = (title ? '<span class="lb-title">' + title + '</span>' : '') + (desc || '');
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }

  function lbNav(dir) {
    lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
    const item = lbImages[lbCurrent];
    document.getElementById('lightbox-img').src = item.src;
    document.getElementById('lightbox-img').alt = item.title;
    setLightboxCaption(item.title, item.desc);
  }

  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });


  document.querySelectorAll('.img-grid').forEach(grid => {
    grid.addEventListener('click', e => {
      const slot = e.target.closest('.img-slot');
      if (!slot) return;
      const img = slot.querySelector('img');
      if (!img) return; 


      const allSlots = Array.from(grid.querySelectorAll('.img-slot'));
      const groupImgs = allSlots
        .map(s => {
          const i = s.querySelector('img');
          return i ? { src: i.src, title: i.alt || '', desc: s.dataset.desc || '' } : null;
        })
        .filter(Boolean);
      const idx = allSlots.filter(s => s.querySelector('img')).indexOf(slot);

      openLightbox(img.src, img.alt || '', slot.dataset.desc || '', groupImgs, Math.max(0, idx));
    });
  });


  window.addEventListener('scroll', () => {
    document.getElementById('btn-top').style.display = window.scrollY > 300 ? 'block' : 'none';
  });


  const terms = [
    { en: "Artificial Intelligence", es: "Inteligencia Artificial", def: "Simulacion de procesos de inteligencia humana por sistemas informaticos." },
    { en: "Machine Learning",        es: "Aprendizaje Automatico",  def: "Rama de la IA que permite a las maquinas aprender de datos sin ser programadas explicitamente." },
    { en: "Deep Learning",           es: "Aprendizaje Profundo",    def: "Subcampo del ML que usa redes neuronales artificiales de multiples capas." },
    { en: "Cloud Computing",         es: "Computacion en la Nube",  def: "Servicios informaticos ofrecidos a traves de internet bajo demanda." },
    { en: "Big Data",                es: "Grandes Datos",           def: "Conjuntos de datos masivos que requieren herramientas especiales para su procesamiento." },
    { en: "API",                     es: "Interfaz de Programacion", def: "Conjunto de reglas que permite que diferentes aplicaciones se comuniquen entre si." },
    { en: "DevOps",                  es: "Desarrollo y Operaciones", def: "Practica que combina desarrollo de software con operaciones de TI para ciclos mas rapidos." },
    { en: "Blockchain",              es: "Cadena de Bloques",       def: "Tecnologia de registro distribuido que almacena datos de forma segura e inmutable." },
    { en: "Cybersecurity",           es: "Ciberseguridad",          def: "Proteccion de sistemas, redes y programas de ataques digitales maliciosos." },
    { en: "Agile",                   es: "Metodologia Agil",        def: "Metodologia de desarrollo basada en iteraciones cortas y colaboracion continua." },
    { en: "Microservices",           es: "Microservicios",          def: "Arquitectura que divide aplicaciones en servicios pequenos e independientes." },
    { en: "Container",               es: "Contenedor",              def: "Unidad estandar de software que empaqueta codigo y todas sus dependencias." },
    { en: "Kubernetes",              es: "Kubernetes",              def: "Sistema de orquestacion de contenedores de codigo abierto desarrollado por Google." },
    { en: "Data Science",            es: "Ciencia de Datos",        def: "Campo interdisciplinar que usa metodos cientificos para extraer conocimiento de datos." },
    { en: "UX Design",               es: "Diseno de Experiencia",   def: "Proceso de diseno enfocado en la experiencia total del usuario con un producto." },
    { en: "UI Design",               es: "Diseno de Interfaz",      def: "Diseno visual de los elementos interactivos de una aplicacion o sitio web." },
    { en: "Design System",           es: "Sistema de Diseno",       def: "Conjunto de componentes reutilizables, guias y estandares que unifican el diseno." },
    { en: "HUD",                     es: "Visualizacion en Pantalla", def: "Heads-Up Display: elementos de interfaz superpuestos en pantalla de videojuego." },
    { en: "Game UI",                 es: "Interfaz de Juego",       def: "Elementos visuales e interactivos que permiten al jugador interactuar con el videojuego." },
    { en: "Prompt Engineering",      es: "Ingenieria de Prompts",   def: "Arte de redactar instrucciones efectivas para obtener mejores resultados de sistemas de IA." },
    { en: "Automation",              es: "Automatizacion",          def: "Uso de tecnologia para ejecutar tareas con minima intervencion humana." },
    { en: "Digital Transformation",  es: "Transformacion Digital",  def: "Integracion de tecnologia digital en todas las areas de una empresa." },
    { en: "IoT",                     es: "Internet de las Cosas",   def: "Red de objetos fisicos con sensores y software conectados a internet." },
    { en: "Scalability",             es: "Escalabilidad",           def: "Capacidad de un sistema para manejar mayor carga sin perder rendimiento." },
    { en: "Open Source",             es: "Codigo Abierto",          def: "Software cuyo codigo fuente es accesible y modificable por cualquier persona." },
    { en: "Sustainable Fashion",     es: "Moda Sostenible",         def: "Produccion de ropa con menor impacto ambiental y condiciones laborales justas." },
    { en: "Circular Fashion",        es: "Moda Circular",           def: "Sistema donde las prendas se reutilizan, reparan y reciclan continuamente." },
    { en: "Wearable Tech",           es: "Tecnologia Ponible",      def: "Dispositivos tecnologicos integrados en prendas o accesorios de vestir." },
    { en: "Brand Identity",          es: "Identidad de Marca",      def: "Conjunto de elementos visuales y valores que representan y distinguen a una marca." },
    { en: "Upcycling",               es: "Supraciclaje",            def: "Reutilizacion creativa de materiales desechados para crear productos de mayor valor." },
    { en: "Pantone",                 es: "Pantone",                 def: "Sistema estandarizado de identificacion y reproduccion precisa del color." },
    { en: "Responsive Design",       es: "Diseno Responsivo",       def: "Tecnica de diseno web que adapta la interfaz a diferentes tamaños de pantalla." },
  ];

  function renderTable(q = '') {
    const filtered = terms.filter(t =>
      t.en.toLowerCase().includes(q.toLowerCase()) ||
      t.es.toLowerCase().includes(q.toLowerCase()) ||
      t.def.toLowerCase().includes(q.toLowerCase())
    );
    document.getElementById('glossBody').innerHTML = filtered.map(t =>
      '<tr><td class="en">' + t.en + '</td><td class="es">' + t.es + '</td><td class="def">' + t.def + '</td></tr>'
    ).join('');
    document.getElementById('glossCount').textContent =
      'Mostrando ' + filtered.length + ' de ' + terms.length + ' terminos';
  }

  renderTable();
  document.getElementById('glossSearch').addEventListener('input', e => renderTable(e.target.value));
