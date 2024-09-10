import React, { useState } from 'react';
import { Alert, Form, Button, Container } from 'react-bootstrap';

const NotasForm = () => {
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const calcularResultado = (e) => {
    e.preventDefault();
    
    // Validación de que las notas sean numéricas y estén en el rango correcto
    const n1 = parseFloat(nota1);
    const n2 = parseFloat(nota2);
    const n3 = parseFloat(nota3);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      setMensaje('Por favor, ingrese valores numéricos válidos.');
      setShowAlert(true);
      return;
    }

    if (n1 < 0 || n1 > 30 || n2 < 0 || n2 > 30 || n3 < 0 || n3 > 40) {
      setMensaje('Las notas deben estar en los rangos permitidos (Parcial 1 y 2: 0-30, Parcial 3: 0-40).');
      setShowAlert(true);
      return;
    }

    // Calcular el porcentaje total
    const total = n1 + n2 + n3;

    let resultado;
    if (total >= 90) {
      resultado = 'Sobresaliente';
    } else if (total >= 80) {
      resultado = 'Muy Bueno';
    } else if (total >= 60) {
      resultado = 'Bueno';
    } else {
      resultado = 'Reprobado';
    }

    setMensaje(`Nota final: ${total}%. Resultado: ${resultado}.`);
    setShowAlert(true);
  };

  return (
    <Container className="mt-5">
      <h2>Ingrese sus notas parciales</h2>
      {showAlert && (
        <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
          {mensaje}
        </Alert>
      )}
      <Form onSubmit={calcularResultado}>
        <Form.Group className="mb-3">
          <Form.Label>Primer Parcial (30%)</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingrese nota (0-30)" 
            value={nota1} 
            onChange={(e) => setNota1(e.target.value)} 
            min="0" 
            max="30" 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Segundo Parcial (30%)</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingrese nota (0-30)" 
            value={nota2} 
            onChange={(e) => setNota2(e.target.value)} 
            min="0" 
            max="30" 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tercer Parcial (40%)</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingrese nota (0-40)" 
            value={nota3} 
            onChange={(e) => setNota3(e.target.value)} 
            min="0" 
            max="40" 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Calcular Resultado
        </Button>
      </Form>
    </Container>
  );
};

export default NotasForm;
