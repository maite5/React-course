import React, {useState} from 'react';
import NavigationBar from './components/NavigationBar';
import ProductSearch from './components/ProductSearch';
import ListadoProductos from './components/ListadoProductos';
import Slider from './components/Slider';
import ProductDetail from './components/ProductDetail';
import FooterPage from './FooterPage';
import ContactPage from './ContactPage'; 

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {

  const [usuario, setUsuario] = useState(null);
  const [searchPub, setSearchPub] = useState(null);

  const onLoginSuccess = (loggedUser) =>{
    setUsuario(loggedUser);
  }

  const onLogout = ()=>{

    let url = 'http://localhost:8888/auth';

    fetch(url, {
                  method: 'DELETE',
                  credentials : 'include'
               }
    ).then( response => response.json() )
     .then( data => {
                      setUsuario(null);
                    }
     )

  }

  const handleSearchPubs = (terminoBuscado)=>{
    
    if (terminoBuscado === ''){
      terminoBuscado = null;
    }

    setSearchPub(terminoBuscado);

  }

  return (

    <Router>

<div>
      <NavigationBar user={usuario}
                     handleLoginSuccess = {onLoginSuccess}
                     handleLogout = {onLogout}
      />

      <Switch>

        <Route exact path="/" 
              children={
                          <>
                            <ProductSearch onSearchPubs={handleSearchPubs}/>
                            <Slider />
                            <ListadoProductos 
                                type="productos"
                                user={usuario}
                                searchPub={searchPub} />
                          </>
                        }
        />

        <Route exact path="/productos/:id"
               children={ 
                          <>
                            <ProductSearch onSearchPubs={handleSearchPubs}/>
                            <ProductDetail /> 
                          </>
                        } 
        />

        { usuario && 
          <>
            <Route exact path="/mispublicaciones"
                  children={
                    <ListadoProductos type="mispublicaciones"
                                      user={usuario}
                                      searchPub={searchPub}/>
                  }
            />

            <Route exact path="/favoritos"
                  children={
                    <ListadoProductos type="favoritos"
                                      user={usuario}
                                      searchPub={searchPub}/>
                  }
            />
          </>
        }

        <Redirect to={ { pathname: '/'}  } />

      </Switch>
      </div>
      <ContactPage/> 
      <FooterPage/>

    </Router>

  );
  
}

export default App;
