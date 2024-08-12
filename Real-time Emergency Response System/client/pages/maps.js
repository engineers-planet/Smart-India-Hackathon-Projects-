import { Wrapper, Status } from '@googlemaps/react-wrapper';
import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { getDistance, isPointWithinRadius } from 'geolib';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
// import geolib from 'geolib';
import * as geolib from 'geolib';

function Map() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [distance, setDistance] = useState();
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    getCurrentLocation();
  }, []);

  function voice(e) {
    if (e.keyCode == 45) {
      console.log('listening started');
      listen();
    } else if (e.keyCode == 27) {
      console.log('listening stopped');
      stop();
    } else if (e.keyCode === 46) {
      setDistance(0);
    }
  }

  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setDistance(result);
    },
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBLYAWKNXFfi-sbuvNhldYMNP6-_ql-xOo',
  });
  let center = { lat: 0, lng: 0 };

  if (!isLoaded) {
    return <div>couldn't load google maps :(</div>;
  }
  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }
  center = { lat: latitude, lng: longitude };

  let arr = [
    {
      lat: parseFloat(10.996885945028543),
      lng: parseFloat(76.84890747788064),
    },
    {
      lat: parseFloat(11.156203184010092),
      lng: parseFloat(76.94183707237244),
    },
    {
      lat: parseFloat(10.982281096523172),
      lng: parseFloat(76.96912770761209),
    },
    {
      lat: parseFloat(11.03464880196182),
      lng: parseFloat(76.92851722240448),
    },
    {
      lat: parseFloat(11.000891420109369),
      lng: parseFloat(77.26263999938965),
    },
    {
      lat: parseFloat(11.104983952002042),
      lng: parseFloat(77.17503905296326),
    },
    {
      lat: parseFloat(10.865970848144526),
      lng: parseFloat(76.94056034088135),
    },
    {
      lat: parseFloat(11.057862321256001),
      lng: parseFloat(76.96551561355591),
    },
    {
      lat: parseFloat(11.00849519876812),
      lng: parseFloat(76.9562029838562),
    },
    {
      lat: parseFloat(11.021198415195455),
      lng: parseFloat(76.9642415111026),
    },
    {
      lat: parseFloat(11.012581358848452),
      lng: parseFloat(76.95064544677734),
    },
    {
      lat: parseFloat(12.968956724393923),
      lng: parseFloat(77.5019621542984),
    },
    {
      lat: parseFloat(11.666357855938887),
      lng: parseFloat(78.15791123331715),
    },
    {
      lat: parseFloat(11.411707717671627),
      lng: parseFloat(76.70386855203184),
    },
    {
      lat: parseFloat(11.341583379711278),
      lng: parseFloat(77.72509862710028),
    },
  ]; //get points of location of companies in this array
  let nearbyUsers = [];
  // nearbyUsers = Object.values(arr.map(item => getDistance(center, item)).filter(distance => distance < 5000))
  for (let i = 0; i < arr.length; i++) {
    if (
      geolib.isPointWithinRadius(
        { latitude: arr[i].lat, longitude: arr[i].lng },
        { latitude: center.lat, longitude: center.lng },
        distance * 1000, //plots pts within 5kms of our centre's location
      )
    ) {
      nearbyUsers = [...nearbyUsers, arr[i]];
    }
  }

  const homemarker = {
    url: 'homemarker.png',
    size: new google.maps.Size(33, 45),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32),
  };
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly',
  };

  return (
    <div>
      <form>
        <div>
          <div className="md:grid md:grid-cols-4 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="m-3 text-3xl font-medium leading-6 text-gray-900 dark:text-white">
                  Search Jobs
                </h3>
                <label
                  for="visitors"
                  class="m-3 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Distance from your location (in Km's) :
                </label>
                <input
                  type="number"
                  id="visitors"
                  class="m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={distance}
                  min="0"
                  onChange={(e) => {
                    setDistance(e.target.value);
                  }}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onKeyDown={(e) => {
                    voice(e);
                  }}
                  required
                />
              </div>
              <div class="slidecontainer">
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={distance}
                  onChange={(e) => {
                    setDistance(e.target.value);
                  }}
                  class="slider"
                  style={{ margin: '10px', width: '200px' }}
                  id="myRange"
                />
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-3 ">
              <div
                style={{
                  padding: '10px',
                  width: '100%',
                  height: '700px',
                }}
              >
                <GoogleMap
                  center={center}
                  zoom={15}
                  mapContainerStyle={{
                    width: '100%',
                    borderRadius: '10px',
                    height: '100%',
                  }}
                  onClick={(ev) => {
                    console.log('latitide = ', ev.latLng.lat());
                    console.log('longitude = ', ev.latLng.lng());
                  }}
                  options={{
                    streetViewControl: false,
                  }}
                >
                  {nearbyUsers.map((item) => {
                    return <Marker position={item}></Marker>;
                  })}
                  <Marker position={center} icon={homemarker}></Marker>
                </GoogleMap>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Map;
