import React from 'react';

function Header(props){

    return(

        <div>
            <p>Encabezado de pagina</p>
            <p>{props.nombre} {props.apellido}</p>
        </div>

    )

}

export default Header;