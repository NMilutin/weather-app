import * as model from './model.js';
import overviewView from './views/overviewView.js';
import dailyView from './views/dailyView.js';
import hourlyView from './views/hourlyView.js';
import aqiView from './views/aqiView.js';
import placesView from './views/placesView.js';
import settingsView from './views/settingsView.js';

const controlForecast = async function (throwErr = true) {
    try {
        await model.getForecast();
        overviewView.render(model.state.current);
        dailyView.render(model.state.daily);
        hourlyView.render(model.state.hourly);
        aqiView.render(model.state.current.aqi);
    } catch (err) {
        // if (throwErr) overviewView.renderError();
        console.log(err);
    }
};

const controlOpenSettings = function () {
    placesView.render(model.state.places);
};
const controlCloseSettings = function () {
    controlForecast(false);
};

const controlPlaceAdd = async function (place) {
    try {
        const geoData = await model.searchPlace(place);
        if (!geoData) throw new Error('Place not found, try again.');
        const [lon, lat] = [geoData.longitude, geoData.latitude];
        const placeName = `${geoData.name}, ${geoData.country}`;
        model.placeAdd(placeName, lat, lon);
        placesView.render(model.state.places);
    } catch (err) {
        placesView.renderError();
    }
};
const controlPlaceDel = async function (i) {
    try {
        model.placeDel(i);
        placesView.render(model.state.places);
    } catch (err) {
        placesView.renderError('Invalid place index!');
    }
};
const controlChangeActive = function (direction) {
    model.setActivePlace(
        model.state.places.indexOf(model.state.activePlace) +
            (direction === 'l' ? -1 : direction === 'r' ? +1 : 0)
    );
    controlForecast();
};

const renderStorageData = function () {
    model.loadStorage();
    controlForecast(false);
};

overviewView.addHandlerLoad(controlForecast);
overviewView.addHandlerOpenSettings(controlOpenSettings);
placesView.addHandlerPlaceAdd(controlPlaceAdd);
placesView.addHandlerPlaceDel(controlPlaceDel);
settingsView.addHandlerCloseSettings(controlCloseSettings);
overviewView.addHandlerChangeActive(controlChangeActive);
renderStorageData();
