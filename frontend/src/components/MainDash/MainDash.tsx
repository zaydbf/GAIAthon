import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <Cards />
      <div className="mapContainer">
        <div className="tableWrapper">
          <Table />
        </div>
        <div className="mapWrapper">
          <iframe
            className="roundedMap"
            width="1200"
            height="600"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Falbrook%20+(Falbrook%20Art%20Center)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.mapsdirections.info/calcular-la-población-en-un-mapa"></a>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default MainDash;
