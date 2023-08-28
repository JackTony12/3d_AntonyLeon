import ModeloCard from "./components/3dpractice";
import modelos from "./modelosDatos/modelData";
import "./styles/estilos3dComponent.css";
function App() {
  return (
    
      <div className="cards-container">
        {modelos.map((modelo) => {
          return (
            <>
              <ModeloCard modelo={modelo} />
            </>
          );
        })}
      </div>
  );
}
export default App;
