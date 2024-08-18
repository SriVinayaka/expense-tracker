import React, { useState } from 'react';
import { ChangeEvent, Component, FormEvent} from "react"
import { pushDataFromUser } from "../service/menu"

export function ExpenseTracker(props) {


  const setDefaultDate = () => {
    const today = new Date();
    return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  };

  const [payeeName, setPayeeName] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");

  const handlePayeeChange = (event) => {
    setPayeeName(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(parseInt(event.target.value));
  };

  const handleDateChange = (event) => {
    setDate(new Date(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const finalData = { ...{ payeeName, product, price, date } }; // Spread syntax to create new object
    //const data = await props.pushDataFromUser(finalData);
    const data = await pushDataFromUser(finalData);
    console.log(data);
    props.onTrue();
  };

  const renderForm = () => (
    <section>
      <header>
        <h1>Add New Item</h1>
        <p>Read the below instructions before proceeding:<br /> Make sure you fill all the fields where * is provided</p>
      </header>
      <form onSubmit={handleSubmit}>
        <article>
          <p>Name</p>
          <select name="Name" id="district" required value={payeeName} onChange={handlePayeeChange}>
            <option value="" defaultChecked>Choose</option>
            <option value="Rahul">Rahul</option>
            <option value="Ramesh">Ramesh</option>
          </select>
        </article>

        <article>
          <p>Product purchased</p>
          <input type="text" required value={product} onChange={handleProductChange} />
        </article>

        <article>
          <p>Price</p>
          <input type="number" required value={price} onChange={handlePriceChange} />
        </article>

        <article>
          <p>Date</p>
          <input type="date" required value={date} onChange={handleDateChange} />
        </article>

        <button type="button" className="form-button" onClick={props.onClose}>Close</button>
        {/* <button>Reset</button> */}
        <button className="form-button">Submit</button>
      </form>
    </section>
  );

  return renderForm();
};

export default ExpenseTracker;
