import React, {Component} from 'react';
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from  'reactstrap';

import ImageCarousel from '../carousel';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInputPrice: false,
      modal: false,
      email: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.togglePriceInput = this.togglePriceInput.bind(this);
    this.onPriceInputChange = this.onPriceInputChange.bind(this);
  }

  formatMoney(n, c, d, t){
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "," : d,
    t = t == undefined ? "." : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };

  toggle() {
    this.setState({
      modal: !this.state.modal,
      emailError: ""
    });
  }

  togglePriceInput() {
    this.setState({
      showInputPrice: !this.state.showInputPrice
    })
  }

  onEmailInputChange (e) {
    e.preventDefault();
    this.setState({
      email: e.currentTarget.value
    })
  }

  onPriceInputChange(e) {
    const value = e.currentTarget.value;
    this.props.changePrice(value);
  }

  onSubmitEmail(e) {
    e.preventDefault();
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = this.state.email;
    if (!email || !email.match(pattern)) {
      this.setState({
        emailError: "error"
      });
      return;
    }

    this.toggle();
    this.props.saveEmail(email);
  }

  render() {

    const {demo} = this.props;

    let amenities = "";
    demo.amenities.forEach((e) => {
      amenities += ` ${e.name} ${e.quantity}`
    });

    const pricePerMeter = demo.price / demo.superficie;

    return (
      <React.Fragment>
        <Container className="demo-container">
          <Row>
            <Col xs="12" lg="5" className="image-carousel-container">
              {demo.favorite ? (
                <button className="favorite" onClick={this.props.saveFavorite}><i className={`fas fa-heart`} /></button>
              ) : (
                <button className="favorite" onClick={this.props.saveFavorite}><i className={`far fa-heart`} /></button>
              )}
              <ImageCarousel items={demo.images}/>
              <div className="amenitiesPrice visible-xs">
                <div>
                  {this.state.showInputPrice ? (
                    <React.Fragment>
                      <strong className="price">U$S</strong>
                      <input type="number" value={demo.price} onBlur={this.togglePriceInput} onChange={this.onPriceInputChange}/>
                    </React.Fragment>
                  ) : (
                    <strong className="price" onClick={this.togglePriceInput}>U$S {this.formatMoney(demo.price)}</strong>
                  )}
                  <span className="valuePerMeter">$/m {this.formatMoney(pricePerMeter, 2, ',', '.')}</span>
                </div>
                <div>
                  {demo.superficie} m2
                  {demo.amenities.map(a => (
                    <span key={a.name} className="amenitie">{`${a.quantity} ${a.name}`}</span>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs="12" lg="7" className="details-container">
              <div className="information">
                <h1 className="title"> {demo.title} </h1>
                <span className="location">  <i className="fas fa-map-marker-alt" /> {demo.location} </span>
                <p className="description">{demo.description}</p>
                <span className="hidden-xs">
                  {this.state.showInputPrice ? (
                    <React.Fragment>
                      <strong className="price">U$S</strong>
                      <input type="number" value={demo.price} onBlur={this.togglePriceInput} onChange={this.onPriceInputChange}/>
                    </React.Fragment>
                  ) : (
                    <strong className="price" onClick={this.togglePriceInput}>U$S {this.formatMoney(demo.price)}</strong>
                  )}
                  <span className="valuePerMeter">$/m {this.formatMoney(pricePerMeter, 2, ',', '.')}</span>
                </span>
              </div>
              <div className="amenities hidden-xs">
                <span>
                  {demo.superficie} m2
                  {demo.amenities.map(a => (
                    <span key={a.name} className="amenitie">{`${a.quantity} ${a.name}`}</span>
                  ))}
                </span>
                <a href="#" onClick={this.toggle}>CONTACTAR</a>
              </div>
              <div className="contactar visible-xs">
                <a href="#" onClick={this.toggle}>CONTACTAR</a>
              </div>
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="email-modal" size="800">
          <ModalHeader toggle={this.toggle}>
            Para ser contactado por favor ingrese su direccion de correo electronico.
          </ModalHeader>
          <ModalBody>
            <label>Email</label>
            <input type="email" className={`email ${this.state.emailError}`} name="email" placeholder="dominio@example.com" onChange={this.onEmailInputChange}/>
            {this.state.emailError ? (
              <span className="error">Por favor ingrese un email valido.</span>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <a className="enviar-form" href="#" onClick={this.onSubmitEmail}>Enviar</a>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Main;