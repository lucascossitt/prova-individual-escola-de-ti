import React from 'react';
import Cursos from './Cursos';
import Disciplinas from './Disciplinas';
import './App.css'; // Importando um arquivo CSS

function App() {
    return (
        <div className="App">
            <div className="container">
                <Cursos />
                <div className="divider"></div>
                <Disciplinas />
            </div>
        </div>
    );
}

export default App;