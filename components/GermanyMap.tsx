
import React, { useEffect, useRef } from 'react';
import { RAW_GERMANY_SVG } from '../constants/rawMap';

interface GermanyMapProps {
  selectedId: string | null;
  onStateClick: (id: string) => void;
}

/**
 * Mapping der IDs aus der bereitgestellten SVG zu unseren internen Codes.
 */
const SVG_ID_TO_CODE: Record<string, string> = {
  'Baden__x26__Württemberg': 'BW',
  'Bayern': 'BY',
  'Berlin': 'BE',
  'Brandenburg': 'BB',
  'Bremen': 'HB',
  'Hamburg': 'HH',
  'Hessen': 'HE',
  'Mecklenburg-Vorpommern': 'MV',
  'Niedersachsen': 'NI',
  'Nordrhein-Westfalen': 'NW',
  'Rheinland-Pfalz': 'RP',
  'Saarland': 'SL',
  'Sachsen': 'SN',
  'Sachsen-Anhalt': 'ST',
  'Schleswig-Holstein': 'SH',
  'Thüringen': 'TH'
};

const CODE_TO_SVG_ID: Record<string, string> = Object.fromEntries(
  Object.entries(SVG_ID_TO_CODE).map(([k, v]) => [v, k])
);

export const GermanyMap: React.FC<GermanyMapProps> = ({ selectedId, onStateClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Alle Pfade zurücksetzen
    const paths = containerRef.current.querySelectorAll('path');
    paths.forEach(p => p.classList.remove('selected-state'));

    // Aktuell ausgewähltes Land hervorheben
    if (selectedId) {
      const svgId = CODE_TO_SVG_ID[selectedId];
      if (svgId) {
        // Suche per Attribut, da IDs Sonderzeichen enthalten können
        const target = containerRef.current.querySelector(`path[id="${svgId}"]`);
        if (target) {
          target.classList.add('selected-state');
        }
      }
    }
  }, [selectedId]);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Finde den geklickten Pfad
    const target = (e.target as Element).closest('path');
    
    if (target && target.id) {
      // Wenn die ID mit "path" beginnt (wie path3789), ignorieren wir den Klick (Overlay)
      if (target.id.startsWith('path')) return;

      const code = SVG_ID_TO_CODE[target.id];
      if (code) {
        onStateClick(code);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      id="raw-map-container"
      className="w-full h-full flex items-center justify-center relative select-none"
      onClick={handleContainerClick}
      dangerouslySetInnerHTML={{ __html: RAW_GERMANY_SVG }}
    />
  );
};
