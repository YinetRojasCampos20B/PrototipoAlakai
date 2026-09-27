/* ---------- estado ---------- */
const S = {
    mode: null, voiceOn: true, origin: null, destination: null,
    transport: 'bicicleta', routeView: 'map', selectedPlace: null, comingFrom: 'origin'
};

S.customOrigin = null;

const MODE_META = {
    visual: { label: 'Modo de discapacidad visual', icon: `<div class="icon-mask" style="--icon: url('./icons/visibility_off.svg')"></div>`, color: '--visual', colorD: '--visual-d' },
    auditiva: { label: 'Modo de discapacidad auditiva', icon: `<div class="icon-mask" style="--icon: url('./icons/hearing_disabled.svg')"></div>`, color: '--auditiva', colorD: '--auditiva-d' },
    fisica: { label: 'Modo de discapacidad física', icon: `<div class="icon-mask" style="--icon: url('./icons/wheelchair.svg')"></div>`, color: '--fisica', colorD: '--fisica-d' }
};
const PLACES = {
    uval: {
        name: 'Conjunto El Uval', addr: 'Kr 5 este #101-100 Sur', rating: 2.7, icon: '<img src= "./icons/apartment.svg"> </img>',
        tags: {
            visual: [['No hay guías podotáctiles', 'bad'], ['Percepción de inseguridad', 'warn']],
            auditiva: [['Falta de información en LSC', 'bad'], ['Trato hostil', 'bad']],
            fisica: [['Rampas en mal estado', 'bad'], ['Caminos discontinuos', 'warn']]
        },
        reviews: [['Terrible lugar para vivir', 'Esperaba que este conjunto tuviera buenas rampas, pero hasta eso es precario aquí.', 2.0],
        ['No visitar ni mudarse aquí', 'Hay mucha inseguridad en el lugar.', 1.0],
        ['Cajas de fósforos', 'Ambiente de comunidad, pero la administración no ayuda a quienes somos ciegos.', 3.5]],
        coords: [4.4866, -74.1036]
    },
    llano: {
        name: 'Parque Puerta al Llano', addr: 'Kr 10 este #105-990 Sur', rating: 3.5, icon: '<img src="./icons/forest.svg"></img>',
        tags: {
            visual: [['Casos de intolerancia', 'bad'], ['Información en braile', 'ok']],
            auditiva: [['Información en LSC', 'ok'], ['Percepción de inseguridad', 'warn']],
            fisica: [['Subidas fatigantes', 'bad'], ['Rebajes en aceras', 'ok']]
        },
        reviews: [['Buen espacio verde', 'Aunque tiene subidas exigentes, las aceras tienen buenos rebajes.', 3.5]],
        coords: [4.489044, -74.098970]
    },
    d1: {
        name: 'D1 Chicó Sur', addr: 'Kr 5 #84-111 Sur', rating: 4.0, icon: '<img src="./icons/store.svg"></img>',
        tags: {
            visual: [['Percepción de inseguridad', 'warn'], ['Personal amable', 'ok']],
            auditiva: [['Percepción de inseguridad', 'warn'], ['Falta de información en LSC', 'bad']],
            fisica: [['Percepción de inseguridad', 'warn'], ['Rampas en buen estado', 'ok']]
        },
        reviews: [['Buena atención', 'El personal siempre ayuda, aunque falta señalización accesible.', 4.0]],
        coords: [4.5050, -74.1044]
    },
    mery: {
        name: 'Tienda Doña Mery', addr: 'Tv 89 Sur #2-2 Este', rating: 4.8, icon: '<img src="./icons/store.svg"></img>',
        tags: {
            visual: [['Guías podotáctiles intermitentes', 'warn'], ['Personal amable', 'ok']],
            auditiva: [['Personal amable', 'ok'], ['Información en LSC', 'ok']],
            fisica: [['Rampas intermitentes', 'warn'], ['Personal amable', 'ok']]
        },
        reviews: [['Excelente trato', 'Siempre dispuestos a ayudar, un ejemplo de accesibilidad.', 4.8]],
        coords: [4.485870, -74.098090]
    },
    brisas: {
        name: 'Restaurante Brisas del Llano', addr: 'Tv 89 Sur #2-2 Este', rating: 4.4, icon: '<img src="./icons/restaurant.svg"></img>',
        tags: {
            visual: [['Guías podotáctiles intermitentes', 'warn'], ['Personal amable', 'ok']],
            auditiva: [['Información en LSC', 'ok'], ['Personal amable', 'ok']],
            fisica: [['Caminos discontinuos', 'warn'], ['Personal amable', 'ok']]
        },
        reviews: [['Muy buen servicio', 'La comida y el trato son excelentes, el acceso mejorable.', 4.4]],
        coords: [4.486303, -74.104433]
    }
};
const DESTS = {
    usme: {
        name: 'Portal de Usme', addr: 'Av Carrera 14 #64 Sur', rating: 3.9, icon: '🚌',
        tags: {
            visual: [['No hay guías podotáctiles', 'warn'], ['Percepción de inseguridad', 'warn']],
            auditiva: [['Falta de información en LSC', 'bad'], ['Percepción de inseguridad', 'warn']],
            fisica: [['Rebajes en aceras', 'ok'], ['Percepción de inseguridad', 'warn']]
        },
        reviews: [['Portal execrable', 'Los buses se demoran mucho, en especial el B72.', 2.0],
        ['Excelente servicio', 'Tuve inconvenientes para localizar el servicio 3-14 y un guía me ayudó a llegar.', 4.5]],
        coords: [4.5320, -74.1196]
    },
    unal: {
        name: 'Universidad Nacional', addr: 'Cra 45 #26-85', rating: 4.7, icon: '🎓',
        tags: {
            visual: [['Información en braile', 'ok'], ['Guías podotáctiles', 'ok']],
            auditiva: [['Información en LSC', 'ok'], ['Personal amable', 'ok']],
            fisica: [['Rampas en buen estado', 'ok'], ['Personal amable', 'ok']]
        },
        reviews: [['Campus accesible', 'Muy buena señalización e infraestructura para todo tipo de discapacidad.', 4.7]],
        coords: [4.6365, -74.0829]
    },
    tunal: {
        name: 'Hospital El Tunal', addr: 'Carrera 20 N° 47B 35 Sur', rating: 3.7, icon: '⛑',
        tags: {
            visual: [['Percepción de inseguridad', 'warn'], ['Personal amable', 'ok']],
            auditiva: [['Percepción de inseguridad', 'warn'], ['Trato hostil', 'bad']],
            fisica: [['Caminos discontinuos', 'warn'], ['Personal amable', 'ok']]
        },
        reviews: [['Atención regular', 'El personal ayuda pero la señalización accesible es escasa.', 3.7]],
        coords: [4.5714, -74.1283]
    },
    bolivar: {
        name: 'Parque Simón Bolívar', addr: 'Av Carrera 68 #63-13', rating: 4.8, icon: '<img src="./icons/forest.svg"></img>',
        tags: {
            visual: [['Guías podotáctiles', 'ok'], ['Personal amable', 'ok']],
            auditiva: [['Información en LSC', 'ok'], ['Personal amable', 'ok']],
            fisica: [['Rampas en buen estado', 'ok'], ['Caminos discontinuos', 'warn']]
        },
        reviews: [['Espacio muy incluyente', 'Amplio, accesible y con personal atento.', 4.8]],
        coords: [4.6580, -74.0934]
        
    },
    concentrix: {
        name: 'Concentrix Empresarial', addr: 'Cl 93 #11A-11', rating: 3.6, icon: '💼',
        tags: {
            visual: [['No hay información en braile', 'bad'], ['Personal amable', 'ok']],
            auditiva: [['Personal amable', 'ok'], ['Información en LSC', 'ok']],
            fisica: [['Rampas inexistentes', 'bad'], ['Caminos continuos', 'ok']]
        },
        reviews: [['Falta mejorar accesibilidad', 'El edificio necesita más ajustes razonables.', 3.6]],
        coords: [4.6748, -74.0484]
    },
    oro: {
        name: 'Museo del Oro', addr: 'Cra. 6 #15-88', rating: 4.2, icon: '🏛',
        tags: {
            visual: [['Información en braile', 'ok'], ['Personal amable', 'ok']],
            auditiva: [['Información en LSC', 'ok'], ['Percepción de inseguridad', 'warn']],
            fisica: [['Rampas en buen estado', 'ok'], ['Rebajes en aceras', 'ok']]
        },
        reviews: [['Muy recomendado', 'Un museo pensado para todo tipo de visitante.', 4.2]],
    coords: [4.6018, -74.0718]
    }
};
const ROUTE = {
    distance: '6.01 km', time: '28 min', elev: '10 mts',
    steps: [
        ['Salida: Conjunto El Uval', 'Tomar la vía Tv 7ma Este hasta la Calle 91 con Av Caracas'],
        ['Cruce Av Caracas – Calle 91 Sur', 'Continuar recto hasta Av Caracas con Calle 76 Sur'],
        ['Avanzar por Calle 76 Sur con Carrera 12', 'Seguir derecho hasta Av. Caracas con Calle 70B Sur'],
        ['Retomar Av. Caracas hasta Portal de Usme', 'Seguir adelante hasta Av Caracas con Calle 65 Sur'],
        ['Llegada: Portal de Usme', '']
    ]
};
const ALERTS_VISUAL = [['Hoy, 3:33 p.m. — a 50 mts', 'Calle 107A Sur con alta afluencia de personas.'],
['Hoy, 2:15 p.m. — a 300 mts', 'Manifestación bloqueando carril sur-norte en Tv 7 Este.']];
const ALERTS_FISICA = [['Hoy, 3:33 p.m. — a 50 mts', 'Calle 107A Sur con pendiente inclinada mayor a 20° grados.'],
['Hoy, 2:15 p.m. — a 300 mts', 'Tramo de Tv 7 Este sin acera pavimentada.']];

/* ---------- UTILIDADES ---------- */

function setMode(m) {
    S.mode = m;
    const meta = MODE_META[m];
    document.documentElement.style.setProperty('--primary', `var(${meta.color})`);
    document.documentElement.style.setProperty('--primary-d', `var(${meta.colorD})`);
}
function speak(text) {
    if (!S.voiceOn) return;
    try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'es-CO'; u.rate = 1;
        window.speechSynthesis.speak(u);
    } catch (e) { }
}

S.history = [];
let routeMapInstance = null;
let navMapInstance = null;

function go(screen, announce) {
    S.history.push(screen);
    render(screen);
    if (announce) speak(announce);
}

function goBack() {
    S.history.pop();
    const prev = S.history.pop();
    if (prev) go(prev);
}

/* ---------- RENDERIZADO DE LA BARRA SUPERIOR ---------- */
function renderTopbar() {
    const bar = document.getElementById('topbar');
    if (!S.mode) { bar.innerHTML = ''; return; }
    const meta = MODE_META[S.mode];
    bar.innerHTML = `${S.history.length > 1 ? `<button class="back" id="backBtn"><div class="icon-mask" style="--icon: url('./icons/arrow_back_ios.svg')"></div></button>` : ''}
    <button class="speaker ${S.voiceOn ? '' : 'muted'}" id="speakerBtn" title="Guía de voz">${S.voiceOn ? '<img src="./icons/volume_up.svg"></img>' : '<img src="./icons/volume_off.svg"></img>'}</button>
    <div class="mode-pill">${meta.icon} ${meta.label}</div>`;
    const backBtn = document.getElementById('backBtn');
    if (backBtn) backBtn.onclick = goBack;
    document.getElementById('speakerBtn').onclick = () => {
        S.voiceOn = !S.voiceOn;
        if (!S.voiceOn) window.speechSynthesis.cancel();
        renderTopbar();
    };
}

/* ---------- PANTALLAS ---------- */
function placeCard(id, place, forOrigin) {
    const tags = place.tags[S.mode].map(([t, c]) => `<span class="tag ${c}">${t}</span>`).join('');
    return `<div class="card" data-id="${id}">
    <div class="icon">${place.icon}</div>
    <div class="info">
        <div class="name">${place.name} <span class="rating"><div class="icon-mask" style="--icon:url('./icons/star.svg')"> </div> ${place.rating}</span></div>
        <div class="addr">${place.addr}</div>
        <div class="tags">${tags}</div>
    </div>
    <div class="more-details">＋</div>
    </div>`;
}

function screenWelcome() {
    document.getElementById('topbar').innerHTML = '';
    document.documentElement.style.setProperty('--primary', '#f5811f');
    document.documentElement.style.setProperty('--primary-d', '#c9660f');
    const el = document.getElementById('screen');
    el.innerHTML = `
    <img id="logo" src="./img/logoAlakai.png" alt="Logo de Alakai">
    <h1 class="title">¡BIENVENIDO!</h1>
    <div class="sub">Selecciona tu modo:</div>
    <button class="modebtn" id="btnDiscVisual" style="background:var(--visual)" data-mode="visual"><span class="ico"><img src="/icons/visibility_off.svg" alt="Ojo indicando discapacidad visual"></span>Discapacidad visual</button>
    <button class="modebtn" id="btnDiscAuditiva" style="background:var(--auditiva)" data-mode="auditiva"><span class="ico"><img src="/icons/hearing_disabled.svg" alt="Oreja indicando discapacidad auditiva"></span>Discapacidad auditiva</button>
    <button class="modebtn" id="btnDiscFisica"style="background:var(--fisica)" data-mode="fisica"><span class="ico"><img src="/icons/wheelchair.svg" alt="Persona en silla de ruedas discapacidad física"></span>Discapacidad física</button>
    <div class="hint">También puedes marcar en el teclado: 1 visual - 2 auditiva - 3 física</div>
<div class="keypad">
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map(n => `<button data-key="${n}">${n}</button>`).join('')}
</div>
<footer class="copy">@2026 Todos los derechos reservados</footer>`;
    el.querySelectorAll('.modebtn').forEach(b => b.onclick = () => chooseMode(b.dataset.mode));
    el.querySelectorAll('[data-key]').forEach(b => b.onclick = () => {
        const k = b.dataset.key;
        if (k == '1') chooseMode('visual');
        else if (k == '2') chooseMode('auditiva');
        else if (k == '3') chooseMode('fisica');
        else speak('Tecla no asignada a un modo.');
    });
    speak('Bienvenido a Alakai: el sistema de accesibilidad intuitivo orientado a personas con discapacidad y movilidad reducida. Selecciona tu modo: uno, discapacidad visual. dos, discapacidad auditiva. tres, discapacidad física. También puedes usar el teclado numérico.');
}

function chooseMode(m) {
    setMode(m);
    S.origin = null; S.destination = null;
    go('searchOrigin', `Modo de discapacidad ${m} activado. ¿Desde dónde vas a iniciar tu recorrido?`);
}


function placeListScreen(kind) {
    const isOrigin = kind === 'origin';
    const source = isOrigin ? PLACES : DESTS;
    renderTopbar();
    const el = document.getElementById('screen');
    el.innerHTML = `
    <h1 class="title">¿${isOrigin ? 'Desde dónde vas a iniciar' : 'Cuál será el punto de destino'} tu recorrido?</h1>
    <div class="searchbox"><div class="icon-mask" style="--icon: url('./icons/search.svg')"></div><input placeholder="Busca tu ${isOrigin ? 'inicio' : 'destino'}"></div>
    ${isOrigin ? '<div class="field" id="useMyLocation" style="cursor:pointer"><img id="myLocation" src="./icons/my_location.svg"></img> Usar mi ubicación precisa</div>' : ''}
    ${Object.entries(source).map(([id, p]) => placeCard(id, p)).join('')}
    <button class="btn" id="continueBtn">${isOrigin ? 'Seguir con el punto de destino' : 'Trazar rutas disponibles'}</button>`;
        el.querySelectorAll('.card').forEach(c => c.onclick = () => {
            S.comingFrom = kind;
            S.selectedPlace = c.dataset.id;
            go('placeDetail', `Detalles de ${source[c.dataset.id].name}`);
        });
    document.getElementById('continueBtn').onclick = () => {
        if (isOrigin) {
            if (!S.origin) S.origin = Object.keys(PLACES)[0];
            go('searchDestination', '¿Cuál será el punto de destino?');
        } else {
            if (!S.destination) S.destination = Object.keys(DESTS)[0];
            go('routeTraced', 'Esta es la ruta trazada.');
        }
    };
    const locBtn = document.getElementById('useMyLocation');
    if (locBtn) locBtn.onclick = getMyPreciseLocation;
    if (isOrigin) speak('¿Desde dónde vas a iniciar tu recorrido?'); else speak('¿Cuál será el punto de destino?');
}

function placeDetailScreen() {
    const isOrigin = S.comingFrom === 'origin';
    const source = isOrigin ? PLACES : DESTS;
    const p = source[S.selectedPlace];
    renderTopbar();
    const el = document.getElementById('screen');
    const tags = p.tags[S.mode].map(([t, c]) => `<span class="tag ${c}">${t}</span>`).join('');
    el.innerHTML = `
        <div class="field" style="justify-content:space-between">
            <span>📍 ${p.name} <span class="rating">★ ${p.rating}</span></span>
        </div>
        <div style="font-size:.75rem;color:#666;margin-left:6px">${p.addr}</div>
        <div class="tags" style="margin-left:6px">${tags}</div>
        <h3 style="margin:4px 0 -4px; color: var(--primary-d)">Detalles del lugar</h3>
        <p style="font-size:.8rem;color:#555;margin:0">Aquí va una descripción de los detalles del lugar.</p>
        <h3 style="margin:6px 0 -4px; color: var(--primary-d)">Reportes de la comunidad</h3>
        <div class="searchbox"><input placeholder="Escribe un reporte de este lugar..."> ➤</div>
        ${p.reviews.map(([t, d, r]) => `<div class="review"><b>${t} <span class="rating">★ ${r}</span></b><p>${d}</p></div>`).join('')}
        <button class="btn" id="setBtn">Establecer punto de ${isOrigin ? 'inicio' : 'destino'}</button>`;
            document.getElementById('setBtn').onclick = () => {
                if (isOrigin) { S.origin = S.selectedPlace; go('searchOrigin', `${p.name} establecido como punto de inicio.`); }
                else { S.destination = S.selectedPlace; go('searchDestination', `${p.name} establecido como destino.`); }
            };
    speak(`${p.name}, calificación ${p.rating} estrellas. ${p.addr}.`);
}

function getMyPreciseLocation() {
    speak('Buscando tu ubicación precisa.');
    if (!navigator.geolocation) {
        speak('Tu navegador no permite compartir ubicación.');
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude, accuracy } = pos.coords;
            S.customOrigin = { name: 'Mi ubicación actual', coords: [latitude, longitude] };
            S.origin = 'custom';
            const msg = accuracy <= 300
                ? `Ubicación encontrada con un margen de error de ${Math.round(accuracy)} metros.`
                : `Ubicación encontrada, pero con un margen de error de ${Math.round(accuracy)} metros, mayor al esperado.`;
            speak(msg);
            go('searchDestination', '¿Cuál será el punto de destino?');
        },
        (err) => {
            speak('No fue posible obtener tu ubicación. Revisa los permisos del navegador.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function originCoords() {
    if (S.origin === 'custom' && S.customOrigin) return S.customOrigin.coords;
    return PLACES[S.origin] ? PLACES[S.origin].coords : [4.4975, -74.1210];
}
function originName() {
    if (S.origin === 'custom' && S.customOrigin) return S.customOrigin.name;
    return PLACES[S.origin] ? PLACES[S.origin].name : 'Conjunto El Uval';
}

function routeTracedScreen() {
    renderTopbar();
    const el = document.getElementById('screen');
    const oName = originName();
    const dName = DESTS[S.destination] ? DESTS[S.destination].name : 'Portal de Usme';
    const tabs = ['bicicleta', 'tm', 'caminata'];
    const labels = { bicicleta: '🚲 Bicicleta', tm: '🚇 TM/SITP', caminata: '🚶 Caminata' };
    el.innerHTML = `
    <h1 class="title">Esta es la ruta trazada:</h1>
    <div class="field">⌖ ${oName}</div>
    <div class="field">🚩 ${dName}</div>
    <div class="tabs">${tabs.map(t => `<div class="tab ${S.transport === t ? 'active' : ''}" data-t="${t}">${labels[t]}</div>`).join('')}</div>
    <div style="display:flex;justify-content:space-between;align-items:center">
        <b>Detalles de la ruta</b>
        <div class="tabs" style="width:auto">
        <div class="tab ${S.routeView === 'map' ? 'active' : ''}" data-v="map" style="flex:none;padding:6px 10px">🗺</div>
        <div class="tab ${S.routeView === 'list' ? 'active' : ''}" data-v="list" style="flex:none;padding:6px 10px">≡</div>
        </div>
    </div>
    <div id="routeBody"></div>
    <button class="btn" id="startBtn">▶ Iniciar recorrido</button>`;
    el.querySelectorAll('[data-t]').forEach(t => t.onclick = () => { S.transport = t.dataset.t; routeTracedScreen(); });
    el.querySelectorAll('[data-v]').forEach(t => t.onclick = () => { S.routeView = t.dataset.v; routeTracedScreen(); });
    document.getElementById('startBtn').onclick = () => go('navigation', 'Iniciando recorrido. Te guiaré durante todo el trayecto.');
    const body = document.getElementById('routeBody');
    if (S.routeView === 'map') {
    body.innerHTML = `<div id="leafletMap"></div>
    <div class="stat3">
    <div class="stat"><b>${ROUTE.distance}</b><span>Distancia</span></div>
    <div class="stat"><b>${ROUTE.time}</b><span>Tiempo</span></div>
    <div class="stat"><b>${ROUTE.elev}</b><span>Elevación</span></div>
    </div>`;
    setTimeout(() => {
        const origin = originCoords();
        const dest = DESTS[S.destination] ? DESTS[S.destination].coords : [4.4770, -74.1265];
        const profileMap = { bicicleta: 'bike', tm: 'driving', caminata: 'foot' };
        if (routeMapInstance) { routeMapInstance.remove(); routeMapInstance = null; }
        routeMapInstance = L.map('leafletMap').setView(origin, 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(routeMapInstance);
        L.Routing.control({
            waypoints: [L.latLng(...origin), L.latLng(...dest)],
            lineOptions: { styles: [{ color: 'var(--primary-d)', weight: 5 }] },
            router: L.Routing.osrmv1({ profile: profileMap[S.transport] || 'foot' }),
            routeWhileDragging: false,
            addWaypoints: false,
            show: false
        }).addTo(routeMapInstance);
    }, 0);
}
    speak(`Ruta de ${oName} a ${dName}. Distancia ${ROUTE.distance}, tiempo estimado ${ROUTE.time}.`);
}

function navigationScreen() {
    renderTopbar();
    const el = document.getElementById('screen');
    const oName = originName();
    const dName = DESTS[S.destination] ? DESTS[S.destination].name : 'Portal de Usme';
    const alerts = S.mode === 'fisica' ? ALERTS_FISICA : ALERTS_VISUAL;
    el.innerHTML = `
    <div class="field">⌖ ${oName}</div>
    <div class="field">🚩 ${dName}</div>
    <div><b>Salida: ${oName}</b><p style="font-size:.78rem;color:#666;margin:2px 0">${ROUTE.steps[0][1]}</p></div>
    <div id="leafletNavMap"></div>
    <div>⏱ Est. llegada: 4:01 p.m.</div>
    <b>Alertas y reportes</b>
    ${alerts.map(([h, t]) => `<div class="alert"><b>${h}</b>${t}</div>`).join('')}`;
        speak(`Recorrido iniciado. ${alerts[0][1]}`);

    setTimeout(() => {
        const origin = originCoords();
        const dest = DESTS[S.destination] ? DESTS[S.destination].coords : [4.4770, -74.1265];
        if (navMapInstance) { navMapInstance.remove(); navMapInstance = null; }
        navMapInstance = L.map('leafletNavMap').setView(origin, 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(navMapInstance);
        L.marker(origin).addTo(navMapInstance);
        L.Routing.control({
            waypoints: [L.latLng(...origin), L.latLng(...dest)],
            lineOptions: { styles: [{ color: 'var(--primary-d)', weight: 5 }] },
            router: L.Routing.osrmv1({ profile: 'foot' }),
            routeWhileDragging: false,
            addWaypoints: false,
            show: false,
            createMarker: () => null
        }).addTo(navMapInstance);
    }, 0);
}

/* ---------- router ---------- */
function render(name) {
    const map = {
        welcome: screenWelcome,
        searchOrigin: () => placeListScreen('origin'),
        searchDestination: () => placeListScreen('destination'),
        placeDetail: placeDetailScreen,
        routeTraced: routeTracedScreen,
        navigation: navigationScreen
    };
    (map[name] || screenWelcome)();
}
go('welcome');


function initMap(originCoords, destCoords) {
    const map = L.map('map').setView(originCoords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(originCoords[0], originCoords[1]),
            L.latLng(destCoords[0], destCoords[1])
        ],
        lineOptions: {
            styles: [{ color: '#7fa83a', weight: 5 }] // usa tu --primary aquí si quieres
        },
        router: L.Routing.osrmv1({ profile: 'foot' }), // 'foot', 'bike' o 'driving'
        routeWhileDragging: false,
        addWaypoints: false,
        createMarker: () => null // oculta los marcadores default si quieres poner los tuyos
    }).addTo(map);
}