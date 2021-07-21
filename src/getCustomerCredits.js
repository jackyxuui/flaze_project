import './App.css';
import React, {useState} from 'react';
import transaction from './transaction.json';


export default function GetCustomerCredits() {
    const [btnText, setBtnText] = useState("Show Customer Credits Report");
    const [showCreditReport, setShowCreditReport] = useState(false);
    const customersArr = [];
    const checkDateInRange = (start,end,dateToCheck)=>{
        const startDate = new Date(start);
        const endDate = new Date(end);
        const checkDate = new Date(dateToCheck);
        if(checkDate>= startDate && checkDate <= endDate){
            return true;
        }
        else{
            return false;
        }
    };
    const getCreditFromMoney = (moneySpend)=>{
        if(moneySpend < 0){
            return null;
        }
        if(moneySpend <= 50){
            return 0;
        }
        else if(moneySpend>50 && moneySpend <=100){
            return moneySpend-50;
        }
        else{
            return 2*(moneySpend-100) + 50;
        }
    }

    const getAprilCredit = (firstname)=>{
        let transactionAmountSum = 0;
        for(let item of transaction){
            if(checkDateInRange("2021-04-01","2021-04-30", item.transactionDate)
            && firstname === item.firstname){
                transactionAmountSum += Math.round(item.transactionAmount);
            }
        }
        return getCreditFromMoney(transactionAmountSum);
    };
    const getMayCredit = (firstname)=>{
        let transactionAmountSum = 0;
        for(let item of transaction){
            if(checkDateInRange("2021-05-01","2021-05-31", item.transactionDate)&&
             firstname === item.firstname){
                transactionAmountSum += Math.round(item.transactionAmount);
            }
        }
        return getCreditFromMoney(transactionAmountSum);
    };
    const getJuneCredit = (firstname)=>{
        let transactionAmountSum = 0;
        for(let item of transaction){
            if(checkDateInRange("2021-06-01","2021-06-30", item.transactionDate)&&
            firstname === item.firstname){
                transactionAmountSum += Math.round(item.transactionAmount);
            }
        }
        return getCreditFromMoney(transactionAmountSum);
    };
    const getTotalCredit = (firstname)=>{
        let transactionAmountSum = 0;
        for(let item of transaction){
            if(firstname === item.firstname){
                transactionAmountSum += Math.round(item.transactionAmount);
            }
        }
        return getCreditFromMoney(transactionAmountSum);
    }

    for (let item of transaction) {
        const customer = {};
        customer.firstname = item.firstname;
        customer.lastname = item.lastname;
        customer.aprilCredit = getAprilCredit(item.firstname);
        customer.mayCredit = getMayCredit(item.firstname);
        customer.juneCredit = getJuneCredit(item.firstname);
        customer.totalCredit = getTotalCredit(item.firstname);
        // console.log(customer);
        customersArr.push(customer);
    }
    const buttonHandler = ()=>{
        if(btnText === "Show Customer Credits Report"){
            setBtnText("Hide Customer Credits Report");
            setShowCreditReport(true);
        }
        else{
            setBtnText("Show Customer Credits Report");
            setShowCreditReport(false);
        }
    };

    return(
        <div>
            <button onClick={() => buttonHandler()}>{btnText}</button>
            {showCreditReport ? <table border="1">
                <tr>
                    <th>Name</th>
                    <th>April Credits</th>
                    <th>May Credits</th>
                    <th>June Credits</th>
                    <th>Total Credits</th>
                </tr>
                {customersArr.map(info =>{
                    return (
                        <tr>
                            <th>{info.firstname} {info.lastname}</th>
                            <th>{info.aprilCredit}</th>
                            <th>{info.mayCredit}</th>
                            <th>{info.juneCredit}</th>
                            <th>{info.totalCredit}</th>
                        </tr>
                    )
                })}
            </table>: null}
        </div>
    )
}
