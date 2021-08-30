import React, { useState } from 'react';
import { Form, Row, Col, Card, Button, Collapse } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import Train_NN  from './Training_NN';  
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core';

function valuetext(value){
    return `${value}`;
}

const CustToolTip = withStyles((theme) => ({
    tooltip:{
        //backgroundColor: theme.palette.common.black,
        fontSize: 14,
    },
}))(Tooltip);

export default function Training(props){
    
    const learning_rate_tooltip = "A small value, often between 0 and 1, that determines the amount by which the weights are updated in response to the gradient of the loss function.";
    const regularization_tooltip = "Adds a penalty to the weights. Reduces overfitting by penalizing the flexibility of the model and keeping the weight values low. \n L1: Penalty using L1 norm of the weights, \n L2: Penalty using L2 norm of the weights.";
    const regularization_parameter_tooltip = "Determines the extent to which the regularization term affects weight update.";
    const batch_size_tooltip = "Determines the number of training samples encountered before the weights are updated. Batch size of 1 indicates a weight update after each sample. For higher batch sizes the loss is averaged over the batch.";
    const loss_function_tooltip = "The function used to calculate the disparity between the predicted output and the expected output. The gradient of the loss function is used to update the weights and arrive at a minimum.";
    const optimizer_tooltip = "The function used to adapt the weights to the changes in the loss function gradient.";
    const shuffle_tooltip = "If turned on, batches will consist of data points selected at random.";
    const initializer_tooltip = "The initialization scheme for weights and biases.";


    const [open_param, setOpenParam] = useState(true);
    const [open_train, setOpenTrain] = useState(false);
    const [initialize_constant, setInitializeConstant] = useState((props.state.initializer === '1') ? true : false);
    const [glorot_normal, setGlorotNormal] = useState((props.state.initializer === '2') ? true : false);
    const [glorot_uniform, setGlorotUniform] = useState((props.state.initializer === '3') ? true : false);
    const [he_normal, setHeNormal] = useState((props.state.initializer === '4') ? true : false);
    const [he_uniform, setHeUniform] = useState((props.state.initializer === '5') ? true : false);
    const [lecun_normal, setLeCunNormal] = useState((props.state.initializer === '6') ? true : false);
    const [lecun_uniform, setLeCunUniform] = useState((props.state.initializer === '7') ? true : false);
    const [random_normal, setRandomNormal] = useState((props.state.initializer === '8') ? true : false);
    const [random_uniform, setRandomUniform] = useState((props.state.initializer === '9') ? true : false);
    const [truncated_normal, setTruncatedNormal] = useState((props.state.initializer === '10') ? true : false);
    const [variance_scaling, setVarianceScaling] = useState((props.state.initializer === '11') ? true : false);

    const handleInitializerChange = (e) => {
        const newState = {...props.state};
        newState[e.target.id] = e.target.value;
        newState.arch_changed = true;
        switch(e.target.value){
            case '1':
                setInitializeConstant(true);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    value: 0
                };
                break;
            case '2':
                setInitializeConstant(false);
                setGlorotNormal(true);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    seed: 0
                };
                break;
            case '3':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(true);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    seed: 0
                };
                break;
            case '4':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(true);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    seed: 0
                };
                break;
            case '5':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(true);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    seed: 0
                };
                break;
            case '6':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(true);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    seed: 0
                };
                break;
            case '7':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(true);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    seed: 0
                };
                break;
            case '8':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(true);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    mean: 0,
                    stddev: 1,
                    seed: 0
                }
                break;
            case '9':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(true);
                setTruncatedNormal(false);
                setVarianceScaling(false);
                newState.initializer_config = {
                    minval: 0,
                    maxval: 1,
                    seed: 0
                }
                break;
            case '10':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(true);
                setVarianceScaling(false);
                newState.initializer_config = {
                    mean: 0,
                    stddev: 1,
                    seed: 0
                }
                break;
            case '11':
                setInitializeConstant(false);
                setGlorotNormal(false);
                setGlorotUniform(false);
                setHeNormal(false);
                setHeUniform(false);
                setLeCunNormal(false);
                setLeCunUniform(false);
                setRandomNormal(false);
                setRandomUniform(false);
                setTruncatedNormal(false);
                setVarianceScaling(true);
                newState.initializer_config = {
                    scale: 1,
                    mode: 'fanIn',
                    distribution: 'normal',
                    seed: 0
                }
                break;
        }
        props.onTrainChange(newState);
    }
    
    const handleInitializerPropsChange = (e) => {
        const newState = {...props.state};
        if(e.target.id !== 'mode' && e.target.id !== 'distribution')
            newState.initializer_config[e.target.id] = parseFloat(e.target.value);
        else
            newState.initializer_config[e.target.id] = e.target.value;
        newState.arch_changed = true;
        console.log(e.target.value);
        props.onTrainChange(newState);
    }


    const handleChange = (e) => {
        const newState = {...props.state};
        newState[e.target.id] = e.target.value;
        newState.arch_changed = true;
        props.onTrainChange(newState);
    }

    const handleTestPropChange = name => (e, val) => {
        const newState = {...props.state};
        newState[name] = val;
        newState.arch_changed = true;
        console.log(val);
        console.log(name);
        props.onTrainChange(newState);
    }

    const train = () => {
        setOpenParam(false);
        setOpenTrain(!open_train);
        document.getElementById('train_start_btn').setAttribute('hidden', 'true');
    }

    return(
        <>
        <Button onClick = {() => {setOpenParam(!open_param); document.getElementById('train_start_btn').removeAttribute('hidden'); setOpenTrain(false);}} aria-controls = "train_parameters" aria-expanded = {open_param}>Edit training parameters</Button>
        <Collapse in = {open_param}>
        <div id = 'train_parameters' style = {{width: "80vw"}}>
            <Card><Card.Body style = {{background: "fff"}}>
                        <Form>
                            <Form.Group>
                                <Row style = {{marginTop: "20px"}}>
                                    <Col xs = {3}>
                                        <Form.Label style = {{marginTop: "5px"}}>Enter the learning rate:</Form.Label>
                                        <CustToolTip title = {learning_rate_tooltip} arrow placement = "right">
                                            <Form.Control type = "number" id = "learning_rate" value = {props.state.learning_rate} onChange = {handleChange}/>
                                        </CustToolTip>
                                    </Col>               
                                    <Col xs = {3}>
                                        <Form.Label style = {{marginTop: "5px"}}>Do you want to use regularization?</Form.Label>
                                        <CustToolTip title = {regularization_tooltip} arrow placement = "right">
                                        <Form.Control as = 'select' id = 'regularization' value = {props.state.regularization} onChange = {handleChange}>
                                            <option>No</option>
                                            <CustToolTip title = "First order regularization" arrow><option>L1</option></CustToolTip>
                                            <CustToolTip title = "Second order regularization" arrow><option>L2</option></CustToolTip>
                                        </Form.Control>
                                        </CustToolTip>
                                    </Col>
                                    <Col xs = {3}>
                                        <Form.Label style = {{marginTop: "5px"}}>Enter the regularization rate:</Form.Label>
                                        <CustToolTip title = {regularization_parameter_tooltip} arrow placement = "right">
                                            <Form.Control type = "number" id = 'regularization_rate' value = {props.state.regularization_rate} onChange = {handleChange}/>
                                        </CustToolTip>
                                    </Col>
                                    <Col xs = {3}>
                                        <Form.Label style = {{marginTop: "5px"}}>Choose the batch size:</Form.Label>
                                        <CustToolTip title = {batch_size_tooltip} arrow placement = "right">
                                        <Slider
                                            id = 'batch_size'
                                            defaultValue = {props.state.batch_size}
                                            getAriaValueText = {valuetext}
                                            aria-labelledby = "discrete-slider"
                                            valueLabelDisplay = "auto"
                                            step = {1}
                                            min = {1}
                                            max = {1942}
                                            onChange = {handleTestPropChange("batch_size")}
                                        />
                                        </CustToolTip>
                                    </Col>
                                </Row>
                                <Row style = {{marginTop: "20px"}}>
                                    <Col xs = {3}>
                                        <Form.Label style = {{marginTop: "5px"}}>Choose the loss function:</Form.Label>
                                        <CustToolTip title = {loss_function_tooltip} arrow placement = "right">
                                        <Form.Control as = "select" value = {props.state.loss_function} id = 'loss_function' onChange = {handleChange}>
                                            <option>Categorical cross-entropy</option>
                                            <option>Absolute difference</option>
                                            <option>Mean squared error</option>
                                        </Form.Control>
                                        </CustToolTip>
                                    </Col>
                                    <Col xs = {3}>
                                        <Form.Label style = {{marginTop: "5px"}}>Choose the optimizer:</Form.Label>
                                        <CustToolTip title = {optimizer_tooltip} arrow placement = "right">
                                        <Form.Control as  = "select" value = {props.state.optimizer} id = 'optimizer' onChange = {handleChange}>
                                            <option>Stochastic gradient descent</option>
                                            <option>Adam</option>
                                            <option>Adadelta</option>
                                            <option>RMSProp</option>
                                            <option>Adamax</option>
                                        </Form.Control>
                                        </CustToolTip>
                                    </Col>
                                    <Col xs = {3}>
                                        <Form.Label style = {{marginTop:"5px"}}>Shuffle the data between batches?</Form.Label>
                                        <CustToolTip title = {shuffle_tooltip} arrow placement = "right">
                                        <Form.Control as = "select" value = {props.state.shuffle} id = 'shuffle' onChange = {handleChange}>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </Form.Control>
                                        </CustToolTip>
                                    </Col>
                                    <Col xs = {3}>
                                        <Form.Label style = {{marginTop:"5px"}}>Choose the initializer:</Form.Label>
                                        <CustToolTip title = {initializer_tooltip} arrow placement = "right">
                                        <Form.Control as  = "select" value = {props.state.initializer} id = 'initializer' onChange = {handleInitializerChange}>
                                            <option value = '0' disabled>Select ...</option>
                                            <option value = '1'>Initialize with a constant</option>
                                            <option value = '2'>Glorot normal</option>
                                            <option value = '3'>Glorot uniform</option>
                                            <option value = '4'>He normal</option>
                                            <option value = '5'>He uniform</option>
                                            <option value = '6'>LeCun normal</option>
                                            <option value = '7'>LeCun uniform</option>
                                            <option value = '8'>Random normal</option>
                                            <option value = '9'>Random uniform</option>
                                            <option value = '10'>Truncated normal</option>
                                            <option value = '11'>Variance scaling</option>
                                        </Form.Control>
                                        </CustToolTip>
                                    </Col>
                                </Row>
                                
                            </Form.Group>
                            </Form>
                            <Collapse in = {initialize_constant}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body style = {{background: "fff"}}>
                                        <Form>
                                            <Row>
                                                <Col xs = {6}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Constant value:</Form.Label>
                                                </Col>
                                                <Col xs = {6}>
                                                    <Form.Control type = "number" id = "value" value = {props.state.initializer_config.value} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {glorot_normal}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body style = {{background: "fff"}}>
                                        <Form>
                                            <Row>
                                                <Col xs = {6}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                </Col>
                                                <Col xs = {6}> 
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {glorot_uniform}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body style = {{background: "fff"}}>
                                        <Form>
                                            <Row>
                                                <Col xs = {6}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                </Col>
                                                <Col xs = {6}>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {he_normal}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body style = {{background: "fff"}}>
                                        <Form>
                                            <Row>
                                                <Col xs = {6}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                </Col>
                                                <Col xs = {6}>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {he_uniform}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body style = {{background: "fff"}}>
                                        <Form>
                                            <Row>
                                                <Col xs = {6}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                </Col>
                                                <Col xs = {6}>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {lecun_normal}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body style = {{background: "fff"}}>
                                        <Form>
                                            <Row>
                                                <Col xs = {6}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                </Col>
                                                <Col xs = {6}>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {lecun_uniform}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body style = {{background: "fff"}}>
                                        <Form>
                                            <Row>
                                                <Col xs = {6}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                </Col>
                                                <Col xs = {6}>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {random_normal}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body style = {{background: "fff"}}>
                                        <Form>
                                            <Row>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Mean:</Form.Label>
                                                    <Form.Control type = "number" id = "mean" value = {props.state.initializer_config.mean} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Standard deviation:</Form.Label>
                                                    <Form.Control type = "number" id = "stddev" value = {props.state.initializer_config.stddev} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {random_uniform}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Lower bound:</Form.Label>
                                                    <Form.Control type = "number" id = "minval" value = {props.state.initializer_config.minval} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Upper bound:</Form.Label>
                                                    <Form.Control type = "number" id = "maxval" value = {props.state.initializer_config.maxval} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {truncated_normal}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Mean:</Form.Label>
                                                    <Form.Control type = "number" id = "mean" value = {props.state.initializer_config.mean} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Standard deviation:</Form.Label>
                                                    <Form.Control type = "number" id = "stddev" value = {props.state.initializer_config.stddev} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                                <Col xs = {4}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            <Collapse in = {variance_scaling}>
                                <Card style = {{width: "40vw"}}>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col xs = {3}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Scaling factor:</Form.Label>
                                                    <Form.Control type = "number" id = "scale" value = {props.state.initializer_config.scale} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                                <Col xs = {3}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Mode:</Form.Label>
                                                    <Form.Control as = "select" id = "mode" value = {props.state.initializer_config.mode} onChange = {handleInitializerPropsChange}>
                                                        <option>fanIn</option>
                                                        <option>fanOut</option>
                                                        <option>fanAvg</option>
                                                    </Form.Control>
                                                </Col>
                                                <Col xs = {3}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Distribution:</Form.Label>
                                                    <Form.Control as = "select" id = "distribution" value = {props.state.initializer_config.distribution} onChange = {handleInitializerPropsChange}>
                                                        <option>normal</option>
                                                        <option>uniform</option>
                                                        <option>truncatedNormal</option>
                                                    </Form.Control>
                                                </Col>
                                                <Col xs = {3}>
                                                    <Form.Label style = {{marginTop: "5px"}}>Seed value:</Form.Label>
                                                    <Form.Control type = "number" id = "seed" value = {props.state.initializer_config.seed} onChange = {handleInitializerPropsChange}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                            </Card.Body>
                            </Card>
                    </div>
                </Collapse>
                <Row style = {{marginTop: "50px"}}>
                                    <Col xs = {12}>
                                        <Button variant = "primary" align = "center" id = "train_start_btn" onClick = {train} aria-control = "content_train" aria_expanded = {open_train}>Train the model</Button>
                                    </Col>
                                </Row>
                <Collapse in = {open_train}>
                    <div id = "content_train" style = {{width: "50vw"}}>
                        <Card>
                            <Card.Body>
                                <Train_NN state = {props.state} />
                            </Card.Body>
                        </Card>
                    </div>
                </Collapse>
                </>
        
    )
}