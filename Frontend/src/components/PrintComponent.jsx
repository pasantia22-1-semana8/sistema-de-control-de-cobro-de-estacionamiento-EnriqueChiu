import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className='container home__info'>
      <div className='row'>
        <div className='col-8'>
          <h1 className='home-info--title'>No. Ticker {props.values.ticker}</h1>
        </div>
        <div className='col-4'>
          <h1 className='home-info--title'>Monto {props.values.monto}</h1>
        </div>
      </div>
      <h2 className='ms-5 mt-5'>Hora de entrada: {props.values.input}</h2>
      <h2 className='ms-5 mt-5'>Hora de salida: {props.values.output}</h2>
      <h2 className='ms-5 mt-5'>Tiempo de estacionamineto {props.values.min} min.</h2>
      <h2 className='ms-5 mt-5 text-danger'>Monto Pagado</h2>
    </div>
  );
});

export default function PrintComponent(props) {
  let componentRef = useRef();

  return (
    <>
      <div>
        <ReactToPrint
          trigger={() => <button className="btn btn-success btn-lg">Descargar Comprobante!</button>}
          content={() => componentRef}
        />
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={(el) => (componentRef = el)} values={props}/>
        </div>
      </div>
    </>
  );
}