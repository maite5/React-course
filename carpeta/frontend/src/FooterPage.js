import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="purple-gradient" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Artenini</h5>
            <p>
              Artenini Somos la red de Arte que està màs cerca de vos, tambièn  a travès de nuestras redes sociales.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Redes Sociales</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Facebook</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Instagram</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Twitter</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Snapchat</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Artenini.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;