import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Row,Col,Form } from "react-bootstrap";

function Algorithm(props){

    const handleChange = (e) => {
        console.log(e.target.value);
        props.onAlgoChange(e.target.value);
    }
    return(

        <Form style={{width:"40vw"}}>
            <Form.Group>
                <br/>
                <br/>
                <Row>
                    <Col xs={6}>
                        <Form.Label style={{marginTop:"5px"}}>Select the algorithm you want to use</Form.Label>
                    </Col>
                    <Col xs={6}>
                        <Form.Control as = "select" value = {props.state.algorithm} onChange = {handleChange}>
                            <option value = '1' disabled>Select ...</option>
                            <option value = '2'>Neural network</option>
                            <option value = '3'>K nearest neighbours</option>
                            <option value = '4'>Random forest</option>
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default Algorithm;