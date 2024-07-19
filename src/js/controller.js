import * as model from './model.js'
import overviewView from './views/overviewView.js'
import placesView from './views/placesView.js';
const controlOverview = async function() {
    try {
        await model.getForecast();
        overviewView.render(model.state.current);
    }
    catch(err) {
        overviewView.renderError();
    }
}

const controlOpenSettings = function() {
    placesView.render(model.state.places);
}

const controlPlaceAdd = async function(place) {
    try {
        const geoData = await model.searchPlace(place);     
        if (!geoData) throw new Error('Place not found, try again.')
        const [lon,lat] = geoData.geometry.coordinates;
        const placeName = `${geoData.properties.name}, ${geoData.properties.country}`;
        model.placeAdd(placeName,lat,lon)
        placesView.render(model.state.places);
    } catch (err) {
        
    }
}

overviewView.addHandlerLoad(controlOverview);
overviewView.addHandlerOpenSettings(controlOpenSettings);
placesView.addHandlerPlaceAdd(controlPlaceAdd)