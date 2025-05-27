
import Navbar from '../Components/Navbar/Navbar';
import Vision from '../Components/Vision/Vision'

function Home() {

  return (
  <div>
    <Navbar />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '2rem'}}>
      <div style={{ flex: 1, padding: '2rem'}}>
        <Vision />
      </div>
      <div style={{ flex: 1, padding: '2rem' }}>
        <h1>Hiii</h1>
      </div>
    </div>
  </div>
);
}

export default Home;
