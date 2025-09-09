// Datos mock para transporte público de La Paz - similar a Pumakatari
export const mockStations = [
  { id: 1, name: "Plaza San Francisco", zone: "Centro", coordinates: { lat: -16.4985, lng: -68.1347 } },
  { id: 2, name: "Plaza del Estudiante", zone: "Centro", coordinates: { lat: -16.5047, lng: -68.1313 } },
  { id: 3, name: "El Alto (16 de Julio)", zone: "El Alto", coordinates: { lat: -16.5000, lng: -68.1500 } },
  { id: 4, name: "Villa Fátima", zone: "Norte", coordinates: { lat: -16.4850, lng: -68.1100 } },
  { id: 5, name: "Zona Sur (Calacoto)", zone: "Sur", coordinates: { lat: -16.5290, lng: -68.0850 } },
  { id: 6, name: "Sopocachi", zone: "Central", coordinates: { lat: -16.5070, lng: -68.1200 } },
  { id: 7, name: "Miraflores", zone: "Sur", coordinates: { lat: -16.5180, lng: -68.1050 } },
  { id: 8, name: "El Prado", zone: "Centro", coordinates: { lat: -16.5010, lng: -68.1290 } },
  { id: 9, name: "Plaza Villarroel", zone: "Centro", coordinates: { lat: -16.5020, lng: -68.1280 } },
  { id: 10, name: "Obrajes", zone: "Sur", coordinates: { lat: -16.5350, lng: -68.0900 } },
  { id: 11, name: "San Pedro", zone: "Centro", coordinates: { lat: -16.4970, lng: -68.1370 } },
  { id: 12, name: "Alto San Antonio", zone: "Laderas", coordinates: { lat: -16.4900, lng: -68.1450 } }
];

export const mockBusLines = {
  "Plaza San Francisco-El Alto (16 de Julio)": {
    line: "Línea Azul",
    duration: "35 min",
    fare: "Bs 2.00",
    frequency: "cada 5 min",
    stops: 8,
    route: "San Francisco → Cementerio → 16 de Julio"
  },
  "Plaza del Estudiante-Zona Sur (Calacoto)": {
    line: "Línea Verde", 
    duration: "28 min",
    fare: "Bs 2.00",
    frequency: "cada 7 min", 
    stops: 6,
    route: "Estudiante → Prado → Sopocachi → Calacoto"
  },
  "Villa Fátima-Miraflores": {
    line: "Línea Naranja",
    duration: "22 min",
    fare: "Bs 2.00",
    frequency: "cada 8 min",
    stops: 5,
    route: "Villa Fátima → Centro → Miraflores"
  },
  "Plaza San Francisco-Sopocachi": {
    line: "Micro 101",
    duration: "15 min", 
    fare: "Bs 1.50",
    frequency: "cada 3 min",
    stops: 4,
    route: "San Francisco → Rosario → Sopocachi"
  },
  "El Prado-Obrajes": {
    line: "Micro 231",
    duration: "32 min",
    fare: "Bs 1.50", 
    frequency: "cada 6 min",
    stops: 7,
    route: "Prado → Sopocachi → Calacoto → Obrajes"
  },
  "San Pedro-Alto San Antonio": {
    line: "Minibus 42",
    duration: "18 min",
    fare: "Bs 1.50",
    frequency: "cada 4 min", 
    stops: 3,
    route: "San Pedro → Max Paredes → Alto San Antonio"
  }
};

export const generateRoute = (from, to) => {
  const routeKey = `${from}-${to}`;
  const reverseKey = `${to}-${from}`;
  
  if (mockBusLines[routeKey]) {
    return mockBusLines[routeKey];
  } else if (mockBusLines[reverseKey]) {
    return mockBusLines[reverseKey];
  } else {
    // Generar ruta simulada
    const duration = Math.floor(Math.random() * 25 + 10);
    const stops = Math.floor(Math.random() * 6 + 3);
    const lines = ["Micro 145", "Micro 213", "Minibus 78", "Trufi 89", "Línea Amarilla"];
    const selectedLine = lines[Math.floor(Math.random() * lines.length)];
    
    return {
      line: selectedLine,
      duration: `${duration} min`,
      fare: selectedLine.includes("Línea") ? "Bs 2.00" : "Bs 1.50",
      frequency: `cada ${Math.floor(Math.random() * 6 + 3)} min`,
      stops: stops,
      route: `${from} → Centro → ${to}`
    };
  }
};

export const mockSavedRoutes = [
  {
    id: 1,
    from: "Plaza San Francisco",
    to: "Zona Sur (Calacoto)", 
    savedAt: "2024-01-15",
    frequency: 5,
    line: "Línea Verde"
  },
  {
    id: 2,
    from: "Villa Fátima",
    to: "Miraflores",
    savedAt: "2024-01-10", 
    frequency: 3,
    line: "Línea Naranja"
  },
  {
    id: 3,
    from: "Plaza San Francisco",
    to: "El Alto (16 de Julio)",
    savedAt: "2024-01-08", 
    frequency: 8,
    line: "Línea Azul"
  }
];

// Datos adicionales para el transporte paceño
export const transportTypes = [
  { name: "Pumakatari (BRT)", icon: "🚌", color: "bg-blue-500" },
  { name: "Micro", icon: "🚐", color: "bg-green-500" },
  { name: "Minibus", icon: "🚍", color: "bg-yellow-500" },
  { name: "Trufi", icon: "🚗", color: "bg-red-500" }
];

export const zonesData = [
  { name: "Centro", stations: 5, color: "bg-purple-100" },
  { name: "Zona Sur", stations: 3, color: "bg-green-100" }, 
  { name: "El Alto", stations: 1, color: "bg-blue-100" },
  { name: "Norte", stations: 1, color: "bg-yellow-100" },
  { name: "Laderas", stations: 2, color: "bg-orange-100" }
];