import * as model from './model.js'
import overviewView from './views/overviewView.js'
import placesView from './views/placesView.js';
import settingsView from './views/settingsView.js';

const controlOverview = async function(throwErr=true) {
    try {
        await model.getForecast();
        overviewView.render(model.state.current);
    }
    catch(err) {
        if (throwErr) overviewView.renderError();
    }
}

const controlOpenSettings = function() {
    placesView.render(model.state.places);
}
const controlCloseSettings = function() {
    controlOverview(false);
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
const controlChangeActive = function(direction) {
    model.setActivePlace((model.state.places.indexOf(model.state.activePlace))+(direction==='l'?-1:direction==='r'?+1:0));
    controlOverview();
}

const renderStorageData = function() {
    model.loadStorage();
    controlOverview(false);
}

overviewView.addHandlerLoad(controlOverview);
overviewView.addHandlerOpenSettings(controlOpenSettings);
placesView.addHandlerPlaceAdd(controlPlaceAdd);
placesView.addHandlerPlaceDel(controlPlaceDel);
settingsView.addHandlerCloseSettings(controlCloseSettings);
overviewView.addHandlerChangeActive(controlChangeActive);
renderStorageData();