import CustomerReview from "../CustomerReview/CustomerReview.tsx";
import Updates from "../Updates/Updates.tsx";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <Updates />
      </div>
      <div>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;
