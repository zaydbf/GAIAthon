import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";


const MainDash2 = () => {
  return (
    <div className="MainDash">
      <h1>eo</h1>
      <h1>Real-Time Atmospheric Gas Readings :</h1>
      <Cards />
      <div className="mapContainer">
        <div className="tableWrapper">
          <Table />

        </div>
        <div className="mapWrapper">
          <iframe
            className="roundedMap"
            src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Falbrook%20+(Falbrook%20Art%20Center)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.mapsdirections.info/calcular-la-población-en-un-mapa"></a>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default MainDash2;
