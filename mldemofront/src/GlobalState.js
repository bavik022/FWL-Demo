import * as tf from '@tensorflow/tfjs';
const defaultGlobalState = {
    preprocessing:{
        fill_col: '1',
        features: [],
        data_augmentation: '0',
        data_normalization: '0'
    },
    algorithm:'1',
    architecture:{},
    batch_size: '1',
    optimizer: 'Stochastic gradient descent',
    loss_function: 'Categorical cross-entropy',
    regularization: 'No',
    regularization_rate: '0',
    learning_rate: '1',
    shuffle: 'No',
    test_proportion: '0.4',
    arch_changed: false,
    initializer: '0',
    initializer_config: {}
};

export default defaultGlobalState;

export const feature_list = ["X_Minimum", "X_Maximum", "Y_Minimum", "Y_Maximum", "Pixels_Areas", "X_Perimeter", "Y_Perimeter", "Sum_of_Luminosity", "Minimum_of_Luminosity", "Maximum_of_Luminosity", "Length_of_Conveyer", "TypeOfSteel_A300", "TypeOfSteel_A400", "Steel_Plate_Thickness", "Edges_Index", "Empty_Index", "Square_Index", "Outside_X_Index", "Edges_X_Index", "Edges_Y_Index", "Outside_Global_Index", "LogOfAreas", "Log_X_Index", "Log_Y_Index", "Orientation_Index", "Luminosity_Index", "SigmoidOfAreas"];

export const incomplete_columns = []; //store the indices, not the column names

export const mapProps = (attr, key) => {
    switch(attr){
        case 'optimizer':
            switch(key){
                case "Stochastic gradient descent":
                    return tf.train.sgd;
                case "Adam": 
                    return tf.train.adam;
                case "Adadelta":
                    return tf.train.adadelta;
                case "RMSProp":
                    return tf.train.rmsprop;
                case "Adamax":
                    return tf.train.adamax;
            }
        case 'loss_function':
            switch(key){
                case "Categorical cross-entropy":
                    return "categoricalCrossentropy";
                case "Absolute difference":
                    return "absoluteDifference";
                case "Mean squared error":
                    return "meanSquaredError";
            }
        case 'regularization':
            switch(key){
                case 'L1':
                    return tf.regularizers.l1;
                case 'L2':
                    return tf.regularizers.l2;
                default:
                    return null;
            }
        case 'layer':
            switch(key){
                case '1':
                    return tf.layers.dense;
                case '2':
                    return tf.layers.conv1d;
            }
        case 'initializer':
            switch(key){
                case '1':
                    return tf.initializers.constant;
                case '2':
                    return tf.initializers.glorotNormal;
                case '3':
                    return tf.initializers.glorotUniform;
                case '4':
                    return tf.initializers.heNormal;
                case '5':
                    return tf.initializers.heUniform;
                case '6':
                    return tf.initializers.leCunNormal;
                case '7':
                    return tf.initializers.leCunUniform;
                case '8':
                    return tf.initializers.randomNormal;
                case '9':
                    return tf.initializers.randomUniform;
                case '10':
                    return tf.initializers.truncatedNormal;
                case '11':
                    return tf.initializers.varianceScaling;
            }
    }
}
