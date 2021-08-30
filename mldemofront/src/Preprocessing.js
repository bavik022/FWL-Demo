import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Row,Col,Form, Badge } from "react-bootstrap";
import Slider from '@material-ui/core/Slider';
import { feature_list } from './GlobalState';

function valuetext(value){
    return `${value}`;
}

export default function Preprocessing(props){

    const handleChange = (e) => {
        console.log(e.target.value);
        const newState = {...props.state};
        newState.preprocessing[e.target.id] = e.target.value;
        props.onPreChange(newState);
        if(e.target.id === "data_normalization" && e.target.value === '1')
            document.getElementById("augment_row").removeAttribute("hidden");
        else if(e.target.id === "data_normalization" && e.target.value === '0')
            document.getElementById("augment_row").setAttribute("hidden", "true");
    }

    const handleFeatureChange = (e) => {
        const options = e.target.options;
        const newState = {...props.state};
        if(options[0].selected){
            newState.preprocessing.features = [...feature_list];
        }
        else {
            const features_selected = [];
            for (let i = 1; i<options.length; i++){
                if(options[i].selected){
                    console.log(options[i].value);
                    features_selected.push(feature_list[options[i].value-1]);
                }
            }
            newState.preprocessing.features = [...features_selected];
        }
        if(newState.preprocessing.features.length)
            document.getElementById("feature_selected_label").removeAttribute("hidden");
        else
            document.getElementById("feature_selected_label").setAttribute("hidden", "true");
        console.log(newState.preprocessing.features);
        props.onPreChange(newState);
    }

    const handleBadgeClick = (e) => {
        const id = e.target.id;
        const newState = {...props.state};
        const index = newState.preprocessing.features.indexOf(id);
        newState.preprocessing.features.splice(index, 1);
        console.log(newState.preprocessing.features);
        if(newState.preprocessing.features.length)
            document.getElementById("feature_selected_label").removeAttribute("hidden");
        else
            document.getElementById("feature_selected_label").setAttribute("hidden", "true");
        props.onPreChange(newState);
    }
    
    const handleAugChange = (e,v) => {
        console.log(v);
        const id = e.target.id;
        const newState = {...props.state};
        newState.preprocessing[id] = v;
        props.onPreChange(newState);
    }
     

    return(

        <Form style={{width:"50vw"}}>
            <Form.Group>
                <br/>
                <br/>
                <Row>
                    <Col xs={6}>
                <Form.Label style={{marginTop:"5px"}}>How do you want to fill up incomplete columns?</Form.Label>
                    </Col>
                    <Col xs={6}>
                <Form.Control as = "select" value = {props.state.preprocessing.fill_col} id = 'fill_col' onChange = {handleChange}>
                    <option disabled value = '1'>Select ...</option>
                    <option value = '2'>Mean of column values</option>
                    <option value = '3'>Median of column values</option>
                    <option value = '4'>Drop columns with null values</option>
                    <option value = '5'>Drop rows with null values</option>
                    <option value = '6'>Drop rows and columns with null values</option>
                </Form.Control>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col xs={6}>
                        <Form.Label style={{marginTop:"5px"}}>Select the features you want to use (Select All or use Ctrl + Click to select multiple):</Form.Label>
                    </Col>
                    <Col xs={6}>
                        <Form.Control as = "select" multiple onChange = {handleFeatureChange}>
                            <option value = '0' key = "All">All</option>
                            {
                                feature_list.map((value, idx) => {
                                    if(props.state.preprocessing.features.indexOf(value) !== -1)
                                        return (<option key = {value} value = {idx+1} selected = "selected">{value}</option>);
                                    else
                                        return (<option key = {value} value = {idx+1}>{value}</option>);
                                })
                            }
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col xs = {6}>
                        <Form.Label style = {{marginTop:"20px"}}  id = "feature_selected_label" hidden>Features selected (Click on a feature to remove it):</Form.Label>
                    </Col>
                    <Col xs = {6}>
                        {
                            props.state.preprocessing.features.map((value,idx) => {
                                return (<Badge pill variant = "primary" id = {value} onClick = {handleBadgeClick}>{value}</Badge>);
                            })
                        }
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col xs={6}>
                        <Form.Label style={{marginTop:"5px"}}>Do you want to use data normalization and augmentation?</Form.Label>
                    </Col>
                    <Col xs={6}>
                        <Form.Control as = "select" id = "data_normalization" value = {props.state.preprocessing.data_normalization} onChange = {handleChange}>
                            <option value = "1">Yes</option>
                            <option value = "0">No</option>
                        </Form.Control>
                    </Col>
                </Row>
            <br/>
            <br/>
            <Row id = "augment_row" hidden>
                <Col xs={6}>
                    <Form.Label style={{marginTop:"5px"}}>Select the extent of data augmentation (0x to 5x: 0 indicates no augmentation):</Form.Label>
                </Col>
                <Col xs={6}>
                <Slider
                     defaultValue = {props.state.preprocessing.data_augmentation}
                     getAriaValueText = {valuetext}
                     aria-labelledby = "discrete-slider"
                     valueLabelDisplay = "auto"
                     step = {1}
                     min = {0}
                     max = {5}
                     id = "data_augmentation"
                     onChange = {handleAugChange}
                     />
                </Col>
            </Row>               
            </Form.Group>
        </Form>
    )
}