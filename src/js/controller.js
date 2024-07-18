import * as model from './model.js'
import overviewView from './views/overviewView.js'
const controlOverview = async function() {
    try {
        await model.getForecast();
        overviewView.render(model.state.current);
    }
    catch(err) {
        console.error(err);
    }
}

overviewView.addHandlerLoad(controlOverview);