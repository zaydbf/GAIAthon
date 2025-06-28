import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>IoT Data</h1>
      <h1>Real-Time Atmospheric Readings :</h1>
      <Cards />
      <div className="mapContainer">
        <div className="tableWrapper">
          <Table />
        </div>
        <div className="mapWrapper">
          <iframe
            className="roundedMap"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=V5VP+FR7,%20Cebalat,%20Tunisia+(Higher%20School%20of%20Communication%20of%20Tunis%20(SUP%E2%80%99COM))&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.mapsdirections.info/calcular-la-población-en-un-mapa"></a>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default MainDash;
