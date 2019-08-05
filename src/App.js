import React, {useRef} from 'react';
import Form from './components/Form';
import Canvas from './components/Canvas';

function App() {

  const columnRef = useRef(null);

  return (
    <div className="container-fluid h-100 d-flex align-items-center justify-content-center w-100">
        <div className="row d-flex justify-content-center w-100">
          <div className="col-md-6 d-flex align-items-center justify-content-center" ref = {columnRef}><Canvas column = {columnRef}/></div>
          <div className="col-md-6 d-flex justify-content-center align-items-center"><Form/></div>
        </div>
      </div>
  );
}

export default App;
