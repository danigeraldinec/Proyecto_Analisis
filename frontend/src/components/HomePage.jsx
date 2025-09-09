import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { MapPin, Route, Clock, DollarSign, Bus, Bookmark, History, Navigation } from 'lucide-react';
import { mockStations, generateRoute, mockSavedRoutes, transportTypes, zonesData } from '../mock';
import RouteMap from './RouteMap';
import { useToast } from '../hooks/use-toast';

const HomePage = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [currentRoute, setCurrentRoute] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState(mockSavedRoutes);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();

  const handleCalculateRoute = () => {
    if (!fromStation || !toStation) {
      toast({
        title: "Error",
        description: "Por favor selecciona las paradas de origen y destino",
        variant: "destructive"
      });
      return;
    }

    if (fromStation === toStation) {
      toast({
        title: "Error", 
        description: "Las paradas de origen y destino deben ser diferentes",
        variant: "destructive"
      });
      return;
    }

    const route = generateRoute(fromStation, toStation);
    setCurrentRoute({
      from: fromStation,
      to: toStation,
      ...route
    });

    toast({
      title: "Ruta encontrada",
      description: `Ruta de ${fromStation} a ${toStation} - ${route.line}`
    });
  };

  const handleSaveRoute = () => {
    if (!currentRoute) return;

    const existingRoute = savedRoutes.find(
      r => r.from === currentRoute.from && r.to === currentRoute.to
    );

    if (existingRoute) {
      setSavedRoutes(prev => 
        prev.map(r => 
          r.id === existingRoute.id 
            ? { ...r, frequency: r.frequency + 1, savedAt: new Date().toISOString().split('T')[0] }
            : r
        )
      );
    } else {
      const newRoute = {
        id: Date.now(),
        from: currentRoute.from,
        to: currentRoute.to,
        savedAt: new Date().toISOString().split('T')[0],
        frequency: 1,
        line: currentRoute.line
      };
      setSavedRoutes(prev => [...prev, newRoute]);
    }

    toast({
      title: "Ruta guardada",
      description: "La ruta ha sido añadida a tus favoritas"
    });
  };

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const loadSavedRoute = (route) => {
    setFromStation(route.from);
    setToStation(route.to);
    setShowHistory(false);
    
    setTimeout(() => {
      handleCalculateRoute();
    }, 100);
  };

  const getStationsByZone = (zone) => {
    return mockStations.filter(station => station.zone === zone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Bus className="text-blue-600" size={40} />
            Transporte La Paz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra las mejores rutas de transporte público en La Paz. Micros, minibuses, trufis y Pumakatari.
          </p>
        </div>

        {/* Tipos de transporte */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {transportTypes.map((type, index) => (
            <Card key={index} className="text-center p-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="text-2xl mb-2">{type.icon}</div>
              <p className="text-sm font-medium text-gray-700">{type.name}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de Control */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-blue-600" size={20} />
                  Planifica tu Viaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selector de paradas */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Desde
                    </label>
                    <Select value={fromStation} onValueChange={setFromStation}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona parada de origen" />
                      </SelectTrigger>
                      <SelectContent>
                        {zonesData.map(zone => (
                          <div key={zone.name}>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100">
                              {zone.name}
                            </div>
                            {getStationsByZone(zone.name).map(station => (
                              <SelectItem key={station.id} value={station.name}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${zone.color}`}></div>
                                  {station.name}
                                </div>
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSwapStations}
                      className="rounded-full"
                    >
                      ⇅
                    </Button>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Hacia
                    </label>
                    <Select value={toStation} onValueChange={setToStation}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona parada de destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {zonesData.map(zone => (
                          <div key={zone.name}>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100">
                              {zone.name}
                            </div>
                            {getStationsByZone(zone.name).map(station => (
                              <SelectItem key={station.id} value={station.name}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${zone.color}`}></div>
                                  {station.name}
                                </div>
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleCalculateRoute} 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="lg"
                  >
                    <Navigation className="mr-2" size={20} />
                    Buscar Ruta
                  </Button>
                  
                  {currentRoute && (
                    <Button 
                      onClick={handleSaveRoute} 
                      variant="outline"
                      className="w-full"
                    >
                      <Bookmark className="mr-2" size={16} />
                      Guardar Ruta
                    </Button>
                  )}
                </div>

                {/* Rutas guardadas */}
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full justify-start text-gray-600"
                  >
                    <History className="mr-2" size={16} />
                    Rutas Favoritas ({savedRoutes.length})
                  </Button>
                  
                  {showHistory && (
                    <div className="mt-3 space-y-2">
                      {savedRoutes.map(route => (
                        <div 
                          key={route.id}
                          className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => loadSavedRoute(route)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{route.from}</p>
                              <p className="font-medium text-sm">↓ {route.to}</p>
                              <p className="text-xs text-blue-600 mt-1">{route.line}</p>
                              <p className="text-xs text-gray-500">Usado {route.frequency} veces</p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {route.frequency}x
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Información de zonas */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Zonas de La Paz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {zonesData.map(zone => (
                    <div key={zone.name} className="flex items-center justify-between p-2 rounded">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${zone.color}`}></div>
                        <span className="text-sm font-medium">{zone.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{zone.stations} paradas</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Área principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mapa */}
            <RouteMap currentRoute={currentRoute} />

            {/* Detalles de la ruta */}
            {currentRoute && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="text-blue-600" size={20} />
                    Detalles del Viaje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Bus className="text-blue-600 mx-auto mb-2" size={24} />
                      <p className="text-sm text-gray-600">Línea</p>
                      <p className="text-lg font-bold text-blue-700">{currentRoute.line}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Clock className="text-green-600 mx-auto mb-2" size={24} />
                      <p className="text-sm text-gray-600">Tiempo</p>
                      <p className="text-lg font-bold text-green-700">{currentRoute.duration}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <DollarSign className="text-orange-600 mx-auto mb-2" size={24} />
                      <p className="text-sm text-gray-600">Pasaje</p>
                      <p className="text-lg font-bold text-orange-700">{currentRoute.fare}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Navigation className="text-purple-600 mx-auto mb-2" size={24} />
                      <p className="text-sm text-gray-600">Paradas</p>
                      <p className="text-lg font-bold text-purple-700">{currentRoute.stops}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Ruta:</p>
                      <p className="text-gray-600">{currentRoute.route}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Frecuencia:</p>
                      <p className="text-blue-600 font-medium">{currentRoute.frequency}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;