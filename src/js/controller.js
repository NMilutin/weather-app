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
        const [lon,lat] = [geoData.longitude,geoData.latitude]
        const placeName = `${geoData.name}, ${geoData.country}`;
        model.placeAdd(placeName,lat,lon)
        placesView.render(model.state.places);
    } catch (err) {
       placesView.renderError(); 
    }
}
const controlPlaceDel = async function(i) {
    try {
        model.placeDel(i);
        placesView.render(model.state.places);
    } catch (err) {
        placesView.renderError('Invalid place index!')
    }
}
overviewView.addHandlerLoad(controlOverview);
overviewView.addHandlerOpenSettings(controlOpenSettings);
placesView.addHandlerPlaceAdd(controlPlaceAdd);
placesView.addHandlerPlaceDel(controlPlaceDel);