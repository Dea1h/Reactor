import React, { useState } from "react";
import '../css/vatBill.css';

function Vat() {
  const [vatNumber, setVatNumber] = useState<string>("");
  const [vatName, setVatName] = useState<string>("");
  const handleVatBill = () => {

  }
  return (
    <React.Fragment>
      <div className="vat-bill-container">
        <input
          placeholder="Vat Number"
          value={vatNumber}
          type="text"
          onChange={(e) => setVatNumber(e.target.value)}
        />
        <input
          placeholder="Name Of Business"
          value={vatName}
          type="text"
          onChange={(e) => setVatName(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => handleVatBill()}
          className="vat-bill-btn">
          Submit
        </button>
      </div>
    </React.Fragment>
  )
}

export default Vat;
