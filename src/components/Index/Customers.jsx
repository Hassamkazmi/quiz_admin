import React, { Fragment } from 'react'
import {Card} from "react-bootstrap";
import Noti from "../../assets/img/more.png"
import Noti1 from "../../assets/img/more1.png"
import { Nav, Dropdown } from "react-bootstrap";
import { customers } from '../../Data/Data'
import { Link } from 'react-router-dom';

export default function Customers({data}) {
  return (
    <Fragment>
      <Card className="workorder customer">
        <Card.Header>
          <Card.Title as="h4">Customers</Card.Title>
          <Link to="/customer" className="yellow">
            View all
          </Link>
        </Card.Header>

        <div className="workorderheight">
          {data?.map((item, i) => {
            return (
              <Card.Body key={i}>
                <div className="row workdetail" key={item.key}>
                 
                  <div className="col-sm-12">
                    <h3>{item.first_name + " " + item.last_name}</h3>
                    <p>{item.address}</p>
                  </div>
                </div>
              </Card.Body>
            );
          })}
        </div>
      </Card>
    </Fragment>
  );
}
