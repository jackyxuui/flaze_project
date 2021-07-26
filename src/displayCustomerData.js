import './App.css';
import React, {useState} from 'react';
import { useEffect } from 'react';
import axios from "axios";

// import transaction from './transaction.json'

export default function DisplayCustomerData(){
    const [customerData, setCustomerData] = useState([]);
    // setCustomerData(transaction);
    const [btnText, setBtnText] = useState("Show Customer Transaction History");
    const [showTransactions, setShowTransactions] = useState(false);
    const [transaction, setTransaction] = useState([]);

    // async call
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get("https://jackyxuui.github.io/api/transaction.json")
            setTransaction(request.data);
            return request;
        }
        fetchData();
    },[])
    const buttonHandler = () =>{
        if(btnText === "Show Customer Transaction History"){
            setBtnText("Hide Customer Transaction History");
            setShowTransactions(true);
        }
        else{
            setBtnText("Show Customer Transaction History");
            setShowTransactions(false);
        }
    };
    // console.log(customerData);
    return(
        <div>
            <button onClick={() => {setCustomerData(transaction);buttonHandler();}}>{btnText}</button>
            {showTransactions ? <table className="transactionRecord" border="1">
                <tr>
                    <th>Name</th>
                    <th>Transaction Date</th>
                    <th>Transaction Amount</th>
                </tr>

                {customerData.map(info =>{
                    return (
                        <tr>
                            <th>{info.firstname} {info.lastname}</th>
                            <th>{info.transactionDate}</th>
                            <th>{info.transactionAmount}</th>
                        </tr>
                    )
                })}

            </table> :null}
        </div>
    )
}




