import React from "react";
import { Row, Col } from "antd";
import { formatTime, formatDate } from "./utils";

import "./Reservation.css";

const Reservation = ({ reservation }) => (
  <Row className="reservation-container">
    <Col xxl={5} xl={5} lg={7} md={24} sm={24} xs={24}>
      <img src={reservation?.room?.imageUrl} width="200" height="200" />
    </Col>
    <Col xxl={5} xl={5} lg={5} md={24} sm={24} xs={24}>
      <div>
        <strong>
          {formatTime(reservation?.start)} - {formatTime(reservation?.end)}
        </strong>
      </div>
      <div>{formatDate(reservation?.start)}</div>
    </Col>
    <Col
      xxl={14}
      xl={14}
      lg={12}
      md={24}
      sm={24}
      xs={24}
      style={{ textAlign: "right" }}
    >
      {reservation?.room?.name}
    </Col>
  </Row>
);

export default Reservation;
