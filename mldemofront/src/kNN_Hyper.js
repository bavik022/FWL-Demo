import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Row,Col,Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root:{
        width: 300,
    },
});

function valuetext(value){
    return `${value}`;
}

export default function KNN_Hyper(props){

    const classes = useStyles;

    const handleChange = (e,value) => {
        const newState = {...props.state};
        console.log(value);
        console.log(e.id);
        newState.architecture.knum = value;
        props.onHyperChange(newState);
    }

    return(

        <Form style={{width:"40vw"}}>
            <Form.Group>
                <br/>
                <br/>
                <Row>
                    <Col xs={6}>
                <Form.Label style={{marginTop:"5px"}}>Select the number of neighbours (k): </Form.Label>
                    </Col>
                    <Col xs={6}>
                    <Slider
                     id = 'knum'
                     defaultValue = {(props.state.architecture.knum)?props.state.architecture.knum:1}
                     getAriaValueText = {valuetext}
                     aria-labelledby = "discrete-slider"
                     valueLabelDisplay = "auto"
                     step = {1}
                     min = {1}
                     max = {100}
                     onChange = {handleChange}
                     />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label style={{marginTop:"100px"}}>Since the data are continuous in nature, Euclidean distance will be used as the similarity metric.</Form.Label>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}