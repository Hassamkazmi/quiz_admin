import React, { useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt  } from "react-icons/fa";
import { renderToString } from 'react-dom/server';

function GoogleMap(props) {



  const { data: activeServicedashboard } = useSelector(
    (state) => state.activeServicedashboard
  );

  const { data: WorkOrderRouteApi } = useSelector(
    (state) => state.WorkOrderRouteApi
  );

  console.log(activeServicedashboard)
  console.log(WorkOrderRouteApi)

  const MapData = WorkOrderRouteApi?.data && WorkOrderRouteApi?.data[0]

  console.log(MapData)


  const { data: ZoomToMap } = useSelector(
    (state) => state.ZoomToMap
  );


  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setzoom] = useState(10);
  const [originalCoordinates, setOriginalCoordinates] = useState({ lat: "38.922579", lng: "-77.042388" });
  const [selectedPlace, setSelectedPlace] = useState(null);

const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.map;
    }
  }, []);



  useEffect(() => {
    if(ZoomToMap.length !== 0){
      setOriginalCoordinates({ lat: ZoomToMap?.RouteAssignmentWaterBody?.servicelat, lng:  ZoomToMap?.RouteAssignmentWaterBody?.servicelong }) 
      setzoom(15)
    }
  },[ZoomToMap,activeServicedashboard])


  useEffect(() => {
    const coordinatesData = MapData?.Data?.length != 0 ? MapData?.Data?.flatMap((item) =>
    item?.RouteAssignmentTechnician?.map((service) => ({
      lat: parseFloat(service.RouteAssignmentWaterBody?.servicelat),
      lng: parseFloat(service.RouteAssignmentWaterBody?.servicelong),
      name:service.RouteAssignmentWaterBody?.customer_name,
      tech_color_code: item?.color_code,

    }))
  ) : [
    {
        "lat": "38.922579",
        "lng": "-77.042388",
        "name": "name",
        "tech_color_code": "#4287f5"
    }
]

  setOriginalCoordinates({ lat: coordinatesData && coordinatesData[0]?.lat, lng: coordinatesData && coordinatesData[0]?.lng }) 
},[activeServicedashboard])




 
  const coordinatesData = MapData?.Data?.flatMap((item) =>
  item.RouteAssignmentTechnician.map((service) => ({
    lat: parseFloat(service.RouteAssignmentWaterBody?.servicelat),
    lng: parseFloat(service.RouteAssignmentWaterBody?.servicelong),
    name:service.RouteAssignmentWaterBody?.customer_name,
    tech_color_code: item?.color_code,
  }))
);



  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };

  const onClose = () => {
    if (activeMarker) {
      setActiveMarker(null);
      setSelectedPlace(null);
    }
  };

  



  return (
    <div className="workOrderMap">
      <div className="googlemap_frame">
      <Map
        google={props.google}
        center={originalCoordinates}
        initialCenter={originalCoordinates}
        zoom={zoom}
        ref={mapRef}
        className='mapRadius'
  >
        {coordinatesData?.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(renderToString(<FaMapMarkerAlt  color={marker.tech_color_code} size={30} />))}`,
              scaledSize: new google.maps.Size(30, 30),
            }}
            onClick={onMarkerClick}
            name={marker.name}
          />
        ))}

        <InfoWindow
          marker={activeMarker}
          visible={activeMarker !== null}
          onClose={onClose}
        >
          <div>
            <h5>{selectedPlace && selectedPlace.name}</h5>
          </div>
        </InfoWindow>
      </Map>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(GoogleMap);