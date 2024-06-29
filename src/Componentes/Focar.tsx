import React, { forwardRef } from 'react';

interface FocarProps {
  id: string;
}

const Focar = forwardRef<HTMLDivElement, FocarProps>(({ id }, ref) => (
  <div id={id} ref={ref} className="focar">
    {/* Conteúdo do componente Focar */}
  </div>
));

export default Focar;