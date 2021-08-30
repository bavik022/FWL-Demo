import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Row,Col,Form,Button,ButtonGroup } from "react-bootstrap";

function Hyper_NN(props) {

    const blankLayer = {type: '0', units: 1, filter_size: 0, activation: ''};
    const [layers, setLayer] = useState([...props.state.architecture.layers]);

    const save = () => {
        const newState = {...props.state};
        newState.architecture.layers = [...layers];
        newState.arch_changed = true;
        props.onHyperChange(newState);
        document.getElementById("saveButton").textContent = "Saved!";
        document.getElementById("saveButton").setAttribute("disabled", "true");
    }


    const addLayer = (e) => {
        document.getElementById("saveButton").removeAttribute("disabled");
        document.getElementById("saveButton").innerHTML = "Save the architecture";
        let updatedLayers = [...layers];
        console.log(e.target.id);
        let newLayer = {...blankLayer};
        updatedLayers.splice(e.target.id + 1, 0, newLayer);
        console.log(updatedLayers);
        setLayer(updatedLayers);
    };  
    
    const removeLayer = (e) => {
        document.getElementById("saveButton").removeAttribute("disabled");
        document.getElementById("saveButton").innerHTML = "Save the architecture";
        let index = e.target.id;
        console.log(e.target.id);
        layers.splice(index,1);
        let changedLayers = [...layers];
        setLayer(changedLayers);
    }
    
    const handleLayerChange = (e) => {
        document.getElementById("saveButton").removeAttribute("disabled");
        document.getElementById("saveButton").innerHTML = "Save the architecture";
        const updatedLayers = [...layers];
        console.log(e.target.id);
        updatedLayers[e.target.id][e.target.className.split(" ")[0]] = e.target.value;
        setLayer(updatedLayers);
    }

    return (
        <Form style={{width: "80vw"}}>
            <Form.Group>
                <br/>
                <br/>
                <Row>
                    <Col xs={2}>
                        <Form.Label style={{marginTop: "5px"}}>Layer 0</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Label>Input</Form.Label>
                    </Col>
                    <Col xs = {2}></Col><Col xs = {2}></Col><Col xs = {2}></Col>
                    <Col xs = {2}>
                        <Button variant = "outline-dark" id = "0" onClick = {addLayer}>Add</Button>
                    </Col>
                    </Row>
                        {layers.map((val,idx) =>{
                            console.log(layers[idx]);
                            const layerId = `layer-${idx}`;
                            return(
                                <Row style = {{marginTop: "10px"}} key = {layerId}>
                                    <hr/>
                                    <Col xs = {2}>
                                        <Form.Label htmlFor = {layerId} style = {{marginTop:"5px"}}>{` Dense Layer ${idx + 1}`}</Form.Label>
                                    </Col>
                                    {/*<Col xs = {2}>
                                        <Form.Label style = {{marginTop:"5px"}}>Type:</Form.Label>
                                        <Form.Label style = {{marginTop:"5px"}}>Dense</Form.Label>
                                        {<Form.Control as = "select" id = {`${idx}`} className = "type" value = {layers[idx].type} onChange = {handleLayerChange}>
                                            <option value = '0' disabled>Select ...</option>
                                            <option value = '1'>Dense</option>
                                            <option value = '2'>1D Convolutional</option>
                                        </Form.Control>}
                                    </Col>*/}
                                    <Col xs = {2}>
                                        <Form.Label style = {{marginTop:"5px"}}>Number of neurons:</Form.Label>
                                    </Col>
                                    <Col xs = {2}>
                                        <Form.Control type = "number" id = {`${idx}`} className = "units" value = {layers[idx].units} onChange = {handleLayerChange}/>
                                    </Col>
                                    <Col xs = {2}>
                                        <Form.Label style = {{marginTop:"5px"}}>Activation function:</Form.Label>
                                    </Col>
                                    <Col xs = {2}>
                                        <Form.Control as = "select" id = {`${idx}`} className = "activation" value = {layers[idx].activation} onChange = {handleLayerChange}>
                                            <option>None</option>
                                            <option>tanh</option>
                                            <option>relu</option>
                                            <option>sigmoid</option>
                                            <option>softmax</option>
                                        </Form.Control>
                                    </Col>
                                    {/*<Col xs = {2}>
                                    {(() => {
                                            if(layers[idx].type === '2')
                                                return (<><Form.Label style = {{marginTop:"5px"}}>Filter size</Form.Label>
                                                <Form.Control type = "text" id = {`${idx}`} className = "filter_size" value = {layers[idx].filter_size} onChange = {handleLayerChange}/></>);
                                        })()}
                                    </Col>*/}
                                    <Col xs = {2}>
                                        <ButtonGroup>
                                        <Button variant = "outline-dark" id = {`${idx}`} className = "deleteButton" onClick = {removeLayer}>Remove</Button>
                                        <Button variant = "outline-dark" id = {`${idx}`} className = "addButton" onClick = {addLayer}>Add</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            )
                        })}
                    <Row style = {{marginTop: "10px"}}>
                        <Col xs={2}>
                            <Form.Label style={{marginTop: "5px"}}>Dense Output Layer</Form.Label>
                        </Col>
                        <Col xs = {2} style={{marginTop: "5px"}}>
                            <Form.Label>Number of neurons:</Form.Label>
                        </Col>
                        <Col xs = {2} style={{marginTop: "5px"}}>
                            <Form.Label>7</Form.Label>
                        </Col>
                        <Col xs = {2} style={{marginTop: "5px"}}>
                            <Form.Label>Activation function:</Form.Label>
                        </Col>
                        <Col xs = {2} style={{marginTop: "5px"}}>
                            <Form.Label>Softmax</Form.Label>
                        </Col>
                        <Col xs = {2}></Col>
                    </Row>
                    <Row style = {{marginTop: "50px"}}>
                        <Col xs = {12}>
                        <Button variant = "primary" align = "center" onClick = {save} id = 'saveButton'>Save the architecture</Button>
                        </Col>
                    </Row>
            </Form.Group>
        </Form>
    );
}

export default Hyper_NN;