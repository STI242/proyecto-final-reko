import { useState } from 'react';
import { Router } from './routers/Router';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [groupname, setGroupname] = useState('');

  return (
       <Router 
        recommendations={recommendations} 
        setRecommendations={setRecommendations}
        groupname={groupname}
        setGroupname={setGroupname}
      />
  );
}

export default App;
