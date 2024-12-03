import { useState } from "react";
import { Question1 } from "../components/Question1";
import { Question2 } from "../components/Question2";
import { Question3 } from "../components/Question3";
import { Question4 } from "../components/Question4";
import { Question5 } from "../components/Question5";
import { useNavigate } from "react-router-dom";
import fondo from '../assets/back.png'
import line from '../assets/line.png'
import arrowLeft from '../assets/arrow-left.png'
import arrowRight from '../assets/arrow-right.png'
import PropTypes from 'prop-types';
import { UserList } from "../components/UsersList";


export const Questionnaire = ({ setRecommendations, groupname, setGroupname }) => {
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [responses, setResponses] = useState([
    {
      plataformas: [],
      generos: [],
      formato: [], // Ahora es un arreglo, ajustado al nuevo formato
      calificacion_minima: "",
      rango_anios: { desde: "", hasta: "" },
    },
  ])

  console.log('group', groupname);
  

  const [activeResponseIndex, setActiveResponseIndex] = useState(0);
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log('en continue');
    
    setActiveResponseIndex(activeResponseIndex + 1)
    setCurrentQuestion(1)
  }

  const handleNext = () => {
    console.log('next');
    
    if (currentQuestion < 5) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    console.log('back');
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
  };

  const handleResponseChange = (field, value) => {
    const updatedResponses = [...responses];
    updatedResponses[activeResponseIndex] = {
      ...updatedResponses[activeResponseIndex],
      [field]: value,
    };
    setResponses(updatedResponses);
    console.log('responses', updatedResponses);
    
  };

  const validateResponses = () => {
    const activeResponse = responses[activeResponseIndex];
    console.log('Active Response:', activeResponse);

    // Validar solo el usuario seleccionado
    if (activeResponse.plataformas.length === 0) {
      setError("Debes seleccionar al menos una plataforma");
      return false;
    }
    if (activeResponse.generos.length === 0) {
      setError('El campo "Géneros" no puede estar vacío');
      return false;
    }
    // Validar que el formato no esté vacío (es un arreglo en el nuevo formato)
    if (!Array.isArray(activeResponse.formato) || activeResponse.formato.length === 0) {
      setError('El campo "Formato" no puede estar vacío');
      return false;
    }
    if (
      !activeResponse.calificacion_minima ||
      isNaN(activeResponse.calificacion_minima) ||
      activeResponse.calificacion_minima <= 0
    ) {
      setError('La "Calificación mínima" debe ser un número mayor a 0');
      return false;
    }
    if (
      !activeResponse.rango_anios.desde ||
      !activeResponse.rango_anios.hasta ||
      activeResponse.rango_anios.desde > activeResponse.rango_anios.hasta
    ) {
      setError('El "Rango de años" es inválido');
      return false;
    }

    setError(""); 
    return true;
  };

  const handleSubmit = async () => {
    if (!validateResponses()) return;
    console.log('in submit');
    
    try {
      const response = await fetch("http://localhost:5000/recomendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_name: groupname, respuestas: responses }),
      });
      const data = await response.json();
      setRecommendations(data.recomendaciones);
      console.log('recomendation', data.recomendaciones, data);
      navigate("/recommendation");
    } catch (error) {
      console.error("Error al obtener recommendations:", error);
    }
  };

  const handleAddResponse = () => {
    setResponses([
      ...responses,
      {
        plataformas: [],
        generos: [],
        formato: [], // Inicializado como arreglo vacío
        calificacion_minima: "",
        rango_anios: { desde: "", hasta: "" },
      },
    ]);
    setActiveResponseIndex(responses.length); 
  };

  const handleSelectResponse = (index) => {
    setActiveResponseIndex(index);
    setCurrentQuestion(1) // Cambiar el usuario seleccionado
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return <Question1 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      case 2:
        return <Question2 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      case 3:
        return <Question3 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      case 4:
        return <Question4 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      case 5:
        return <Question5 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      default:
        return null;
    }
  };

  const existeOtherUser = activeResponseIndex < responses.length - 1;

  const finalUser = activeResponseIndex == responses.length - 1

  

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center text-white">
      <div className="flex fixed top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${fondo})` }}></div>
  
      <section className="flex relative items-center flex-row w-full h-[80%] px-24 justify-center">
        <UserList
          groupname={groupname}
          setGroupname={setGroupname}
          responses={responses}
          activeResponseIndex={activeResponseIndex} 
          handleSelectResponse={handleSelectResponse}
          handleAddResponse={handleAddResponse}
        />
        
        <img className="flex mx-10 h-[600px]" src={line} />

        <section className="flex w-3/4 h-full flex-col px-10">
          <div className="h-[80px] flex items-center">
            <h2 className="text-2xl font-medium">
              Tell us your <span className="text-primary-lightpink">Preferences</span>
            </h2>
          </div>

          <section className="flex mt-6 h-[20rem] mb-6">
            {renderQuestion()}
          </section>

          <section className="flex flex-row justify-center items-center space-x-40 mt-6">
          <button
              onClick={handlePrev}
              className="flex items-center text-xl px-8 py-2 border-2 border-white text-white rounded-lg hover:bg-primary-lightpink"
              disabled={currentQuestion === 1}
            >
              <img className="w-6 mr-2" src={arrowLeft} alt="" />
              Go back
            </button>
  
            <h1 className="text-2xl px-6 py-2 border-2 border-white my-6 rounded-full">
              {currentQuestion + '/5'}
            </h1>
  
            {currentQuestion === 5 && existeOtherUser ? (
              <button
                onClick={handleContinue}
                className="flex items-center text-xl px-8 py-2 border-2 border-white text-white rounded-lg hover:bg-primary-lightpink"
              >
                Next User
                <img className="w-6 ml-2" src={arrowRight} alt="" />
              </button>
            ) : currentQuestion === 5 && finalUser ? (
              <button
                onClick={handleSubmit}
                className="flex items-center text-xl px-8 py-2 border-2 border-white text-white rounded-lg hover:bg-primary-lightpink"
              >
                Get Reko
                <img className="w-6 ml-2" src={arrowRight} alt="" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center text-xl px-8 py-2 border-2 border-white text-white rounded-lg hover:bg-primary-lightpink"
                disabled={currentQuestion === 5}
              >
                Continue
                <img className="w-6 ml-2" src={arrowRight} alt="" />
              </button>
            )}
          </section>
        </section>
      </section>
    </div>
  );
  
  
};

Questionnaire.propTypes = {
  setRecommendations: PropTypes.func.isRequired,
  groupname: PropTypes.string.isRequired,
  setGroupname: PropTypes.func.isRequired
};
