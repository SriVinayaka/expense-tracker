import React, { useState, useEffect } from 'react'; // Import necessary hooks
import IDataList from '../model/IDataList'; // Import interface for data structure
import { getDataFromServer } from '../service/menu'; // Import data fetching function
import ExpenseTracker from './ExpenseTracker'; // Import ExpenseTracker component

export function ShowData()
{

  let data = [];
  let rahulspent1 = 0;
  let rameshspent1 = 0;
  let result= 0;
  //let rahulspent = 0;
  //let rameshspent = 0;

  const [items, setItems] = useState([]); // State for expense data
  const [error, setError] = useState(null); // State for errors
  const [sum, setSum] = useState(0); // State for total sum
  const [rahulspent, setRahulspent] = useState(0); // State for Rahul's spending
  const [rameshspent, setRameshspent] = useState(0); // State for Ramesh's spending
  const [showForm, setShowForm] = useState(false); // State for form visibility

  const fetchMenu = async () => {
    try {
      //const data = await getDataFromServer();
      data = await getDataFromServer();
      setItems(data);
      setSum(data.reduce((result, v) => result + v.price, 0)); // Calculate total sum
      Shares(data); // Calculate individual spending
    } catch (error) {
      setError(error);
    }
  };

  
  /*
  const Shares = (data) => {

    data.forEach((item) => { // Use forEach instead of map for side effects
      if (item.payeeName === 'Rahul') {
        //setRahulspent(prevSpent => prevSpent + item.price); // Update state with previous value
        rahulspent1 += item.price;
      } else if (item.payeeName === 'Ramesh') {
        //setRameshspent(prevSpent => prevSpent + item.price); // Update state with previous value
        rameshspent1 += item.price;
      }
    }
  
  );
    setRahulspent(rahulspent1);
    setRameshspent(rameshspent1);
  };

  */


  const Shares = (data) => {
    const rahulSpent = data.reduce((acc, item) => {
      if (item.payeeName === 'Rahul') {
        return acc + item.price;
      }
      return acc;
    }, 0);
  
    const rameshSpent = data.reduce((acc, item) => {
      if (item.payeeName === 'Ramesh') {
        return acc + item.price;
      }
      return acc;
    }, 0);
  
    setRahulspent(rahulSpent);
    setRameshspent(rameshSpent);
  };

  const success = () => {
    setShowForm(false);
  };

  const cancel = () => {
    setShowForm(false);
  };

  useEffect(() => {
    fetchMenu(); // Fetch data on component mount
  }, [showForm]); // Re-fetch data only when showForm changes (optional)

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
      {showForm && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
      </>
      {items && (
        items.map((user, idx) => (
          <div key={idx}>
            <div className="use-inline date">{user.date}</div>
            <div className="use-inline">{user.product}</div>
            <div className="use-inline price">{user.price}</div>
            <div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
          </div>
        ))
      )}
      <hr />

      <div className="use-inline">Total: </div>
      <span className="use-inline total">{sum}</span> <br />
      <div className="use-inline">Rahul paid: </div>
      <span className="use-inline total Rahul">{rahulspent}</span> <br />
      <div className="use-inline">Ramesh paid: </div>
      <span className="use-inline total Ramesh">{rameshspent}</span> <br />
      <span className="use-inline payable">{rahulspent > rameshspent ? 'Pay Rahul ' : 'Pay Ramesh'}</span>
      <span className="use-inline payable price"> {Math.abs((rahulspent - rameshspent))}</span>

      {error && (
        <>
          {error.message}
        </>
      )}
    </>
  );
};

export default ShowData;
