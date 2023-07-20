// import React, {useState, useEffect, useRef} from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer} from '@react-google-maps/api';
// import './index.css';
// const center = { lat: -1.189310,lng: 37.116370 }
// const libraries = ["places"];
// export const Map = () => {

//     const [currentLocation, setCurrentLocation] = useState(null);
//      const [directionsResponse, setDirectionsResponse] = useState(null);
//      const [duration, setDuration] = useState('');
//      const [distance, setDistance] = useState('');

//      const originRef=  useRef();

//      const destinationRef = useRef();

// const { isLoaded } = useJsApiLoader({
//   googleMapsApiKey: "AIzaSyCivwKyWPJekwIy1H7y4EHkmE3FgC005Ng",
//   libraries: libraries,
// })

//     const location = useLocation();
//     const { origin, destination } = location.state || {};
//  useEffect(() => {
//     // Get current location coordinates
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     }
//   }, []);

// useEffect(() => {
//     if (origin && destination) {
//       calculateRoute(origin, destination);
//     }
//   }, [origin, destination]);

//   const calculateRoute = async (origin, destination) => {
//     if (origin === "" || destination === "") {
//       return;
//     }

//     const directionsService = new window.google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin,
//       destination,
//       travelMode: window.google.maps.TravelMode.DRIVING
//     });

//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   };

// if(!isLoaded) {
//      return <h3>Loading...</h3>
//     }
//     console.log(isLoaded)


//   return (
    
        
//     <GoogleMap
//      zoom={14} 
//     center={currentLocation}
//       mapContainerClassName='map-container'
//        options= {{
//              zoomControl: false,
//         scrollwheel: false,
//         disableDoubleClickZoom: true,
//         streetViewControl: false,
//         mapTypeControl: false,
//         fullscreenControl: false
//         }}
//         >
       
//         {/* display markers and directions */}
//  {currentLocation && (
//         <Marker position={currentLocation} />
//       )}
//        {directionsResponse && 
//        <DirectionsRenderer directions= {directionsResponse}/>
//        }
//     </GoogleMap>
        
        
//   )
// };

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, Marker } from '@react-google-maps/api';
import './index.css';

const libraries = ["places"];

export const Map = ({ origin, destination, driverName, numberPlate, selectedSeats, PhoneNo }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');

  const originRef = useRef();
  const destinationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCivwKyWPJekwIy1H7y4EHkmE3FgC005Ng",
    libraries: libraries,
  });

  useEffect(() => {
    // Get current location coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (origin && destination) {
      calculateRoute(origin, destination);
    }
  }, [origin, destination, selectedSeats]);

  const calculateRoute = async (origin, destination) => {
    if (origin === "" || destination === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  if (!isLoaded) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      <h3>Map</h3>
      <div className="map-container">
        <GoogleMap
          zoom={14}
          center={currentLocation}
          mapContainerClassName="map-container"
          options={{
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          {/* Display current location marker */}
          {currentLocation && (
            <Marker position={currentLocation} />
          )}
          {/* Display origin and destination markers */}
          {origin && (
            <Marker position={origin} label="Origin" />
          )
          
          }
          {destination && (
            <Marker position={destination} label="Destination" />
          )}
          
          {/* Display directions */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          
           {origin && driverName && (
          <div
            
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 'calc(50% - 20px)',
              left: 'calc(50% + 20px)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '0.7rem',
              borderRadius: '5px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}
          >
            <p>Driver Name: {driverName}</p>
            <p>Number Plate: {numberPlate}</p>
            <p>phoneNo: {PhoneNo}</p>

          </div>
        )}
      <div className='map-info'>
      {/* Display distance and duration */}
      {distance && (
        <p>Distance: {distance}</p>
      )}
      {duration && (
        <p>Duration: {duration}</p>
      )}  
    </div>
        </GoogleMap>
        </div>
    </div>
  );
};












