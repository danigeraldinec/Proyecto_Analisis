import React from 'react';
import { Card, CardContent } from './ui/card';
import { MapPin, Navigation, Bus } from 'lucide-react';

const RouteMap = ({ currentRoute }) => {
  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative h-96 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-lg overflow-hidden">
          {/* Mapa de La Paz */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!currentRoute ? (
              <div className="text-center">
                <Navigation className="text-gray-400 mx-auto mb-4" size={48} />
                <p className="text-gray-500 text-lg">Selecciona origen y destino para ver la ruta</p>
                <p className="text-gray-400 text-sm mt-2">Transporte público de La Paz</p>
              </div>
            ) : (
              <div className="w-full h-full relative">
                {/* Líneas de la ciudad simuladas */}
                <div className="absolute inset-0">
                  {/* Calles principales */}
                  <div className="absolute w-full h-1 bg-gray-300/60" style={{ top: '30%' }} />
                  <div className="absolute w-full h-1 bg-gray-300/60" style={{ top: '50%' }} />
                  <div className="absolute w-full h-1 bg-gray-300/60" style={{ top: '70%' }} />
                  <div className="absolute h-full w-1 bg-gray-300/60" style={{ left: '25%' }} />
                  <div className="absolute h-full w-1 bg-gray-300/60" style={{ left: '50%' }} />
                  <div className="absolute h-full w-1 bg-gray-300/60" style={{ left: '75%' }} />
                </div>

                {/* Parada de origen */}
                <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-5 h-5 bg-green-600 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border text-xs font-medium">
                        <MapPin className="inline w-3 h-3 mr-1 text-green-600" />
                        {currentRoute.from}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parada de destino */}
                <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
                  <div className="relative">
                    <div className="w-5 h-5 bg-red-600 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border text-xs font-medium">
                        <MapPin className="inline w-3 h-3 mr-1 text-red-600" />
                        {currentRoute.to}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Línea de transporte */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 33% 33% L 45% 45% L 55% 55% L 67% 67%"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8,4"
                    className="animate-pulse"
                  />
                </svg>

                {/* Paradas intermedias */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border border-white shadow"></div>
                </div>
                <div className="absolute top-2/5 left-2/5 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border border-white shadow"></div>
                </div>

                {/* Bus en movimiento */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-bounce">
                    <Bus className="text-blue-600" size={20} />
                  </div>
                </div>

                {/* Información de la línea en el mapa */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Bus className="text-blue-600" size={16} />
                    <p className="text-sm font-semibold text-gray-800">{currentRoute.line}</p>
                  </div>
                  <p className="text-xs text-gray-600">{currentRoute.from} → {currentRoute.to}</p>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-green-600 font-medium">{currentRoute.duration}</span>
                    <span className="text-blue-600 font-medium">{currentRoute.fare}</span>
                  </div>
                </div>

                {/* Indicadores de zonas */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-xs font-medium text-gray-700 mb-2">Zonas:</p>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Centro</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Sur</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Norte</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteMap;