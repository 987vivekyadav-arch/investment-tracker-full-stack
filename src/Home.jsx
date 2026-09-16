import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
ResponsiveContainer
} from "recharts";

import "./Home.css";


function Home(){

 function Delete(id){
fetch("https://investment-tracker-full-stack.onrender.com/home/"+id,{
     method:"DELETE",
     headers:{
        Authorization:"Bearer " + localStorage.getItem("token")
     }
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){

        const newInvestment=investment.filter(function(currentItem){

            if(id!==currentItem._id){
                return true
            }

            {
                return false
            }

        })

        setInvestment(newInvestment)

    })
 }


function Edit(editId){

fetch("https://investment-tracker-full-stack.onrender.com/home/"+editId,{
     method:"PUT",
     headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer " + localStorage.getItem("token")
     },
     body:JSON.stringify({
        user:user,
        investedAmount:investedAmount,
        currentValue:currentValue,
        profit:profit,
        month:month,
        year:year
     })
    })

    .then(function(response){
        return response.json()
    })

    .then(function(data){

        const newSave=investment.map(function(currentItem){

            if(editId===currentItem._id){
                return data
            }

            {
                return currentItem
            }

        })

        setInvestment(newSave)

    })

}



function FilteredData(){

    const result=investment.filter(function(item){

        if(category===item.month && categoryYear===item.year){
            return true
        }

        {
            return false
        }

    })

    return result
}



useEffect(function(){

  fetch("https://investment-tracker-full-stack.onrender.com/home",{
      headers:{
          Authorization:"Bearer " + localStorage.getItem("token")
      }
  })

    .then(function(response){
        return response.json()
    })

    .then(function(data){
        setInvestment(data)
    })

},[])



const[investment,setInvestment]=React.useState([])

const[user,setUser]=React.useState("")
const[investedAmount,setInvestedAmount]=React.useState("")
const[currentValue,setCurrentValue]=React.useState("")
const[profit,setProfit]=React.useState("")
const[month,setMonth]=React.useState("")
const[year,setYear]=React.useState("")

const[category,setCategory]=React.useState("jan")
const[categoryYear,setCategoryYear]=React.useState(2026)

const[editId,setEditId]=React.useState(null)



/* ALL MONTH CALCULATIONS */

const Investment=investment.reduce(function(acc,item){

    return acc+Number(item.investedAmount)

},0)


const Current=investment.reduce(function(acc,item){

    return acc+Number(item.currentValue)

},0)


const Profit=investment.reduce(function(acc,item){

    if(item.profit>0){
        return acc+Number(item.profit)
    }

    {
        return acc
    }

},0)


const Loss=investment.reduce(function(acc,item){

    if(item.profit<0){
        return acc-Number(item.profit)
    }

    {
        return acc
    }

},0)


const ProfitLoss=Profit-Loss



/* SELECTED MONTH CALCULATIONS */

const filterInvestment=FilteredData().reduce(function(acc,item){

    return acc+Number(item.investedAmount)

},0)


const filterCurrent=FilteredData().reduce(function(acc,item){

    return acc+Number(item.currentValue)

},0)


const filterProfit=FilteredData().reduce(function(acc,item){

    if(item.profit>0){
        return acc+Number(item.profit)
    }

    {
        return acc
    }

},0)


const filterLoss=FilteredData().reduce(function(acc,item){

    if(item.profit<0){
        return acc-Number(item.profit)
    }

    {
        return acc
    }

},0)


const filterProfitLoss=filterProfit-filterLoss



const totalMonths=investment.reduce(function(acc,item){

    if(acc.includes(item.month)){
        return acc
    }

    acc.push(item.month)

    return acc

},[]).length



const chart=investment.map(function(item){

    return{
        month:item.month,
        profit:item.profit
    }

})



return(

<div className="home-page">


{/* SIDEBAR */}

<div className="dashboard-sidebar">

    <div className="dashboard-logo">
        <span>▮</span> InvestMate
    </div>

    <div className="dashboard-subtitle">
        Invest Together. Grow Smarter.
    </div>


    <Link
        className="sidebar-item sidebar-active"
        to="/home"
    >
        <span>⌂</span>
        Dashboard
    </Link>


    <Link
        className="sidebar-item"
        to="/home"
    >
        <span>⊕</span>
        Add Monthly Data
    </Link>


    <Link
        className="sidebar-item"
        to="/home"
    >
        <span>◷</span>
        View History
    </Link>


    <Link
        className="sidebar-item"
        to="/home"
    >
        <span>▥</span>
        Analytics
    </Link>


    <Link
        className="sidebar-item"
        to="/home"
    >
        <span>⚙</span>
        Settings
    </Link>


    <div className="sidebar-bottom">

        <div className="sidebar-quote">
            "Investing together builds more than wealth."
        </div>


        <Link
            className="logout-button"
            to="/login"
        >
            ⇥ &nbsp; Logout
        </Link>

    </div>

</div>



{/* MAIN */}

<div className="dashboard-main">


{/* TOP NAV */}

<div className="dashboard-top">

    <div className="top-links">

        <Link
            className="top-link top-link-active"
            to="/home"
        >
            Dashboard
        </Link>


        <Link
            className="top-link"
            to="/home"
        >
            History
        </Link>


        <Link
            className="top-link"
            to="/home"
        >
            Analytics
        </Link>

    </div>


    <div className="top-right">

        <span className="sun">
            ☼
        </span>


        <span className="user-circle">

            {user
            ? user.charAt(0).toUpperCase()
            : "U"}

        </span>


        <span className="top-user">

            {user || "User"}

        </span>

    </div>

</div>



{/* WELCOME */}

<div className="welcome-box">

    <div>

        <h1>
            Welcome Back!
        </h1>

        <p>
            Track investments for you and your partners.
        </p>

    </div>


    <div className="welcome-actions">

        <div className="selected-month">

            {category} {categoryYear}

        </div>


        <button className="header-add">

            + &nbsp; Add / Update Data

        </button>

    </div>

</div>



{/* SELECTED MONTH CARDS */}

<div className="cards-grid">


    <div className="dashboard-card">

        <div className="card-icon green-icon">
            ▤
        </div>


        <div>

            <div className="card-title">
                Total Investment
            </div>


            <div className="card-number">
                ₹{filterInvestment}
            </div>


            <div className="card-change green-text">

                {category} {categoryYear}

            </div>

        </div>

    </div>



    <div className="dashboard-card">

        <div className="card-icon blue-icon">
            ▥
        </div>


        <div>

            <div className="card-title">
                Current Value
            </div>


            <div className="card-number">
                ₹{filterCurrent}
            </div>


            <div className="card-change blue-text">

                {category} {categoryYear}

            </div>

        </div>

    </div>



    <div className="dashboard-card">

        <div className="card-icon red-icon">
            ↗
        </div>


        <div>

            <div className="card-title">
                Total Profit / Loss
            </div>


            <div className={
                filterProfitLoss>=0
                ? "card-number green-text"
                : "card-number red-text"
            }>

                ₹{filterProfitLoss}

            </div>


            <div className={
                filterProfitLoss>=0
                ? "card-change green-text"
                : "card-change red-text"
            }>

                {category} {categoryYear}

            </div>

        </div>

    </div>



    <div className="dashboard-card">

        <div className="card-icon gray-icon">
            ▣
        </div>


        <div>

            <div className="card-title">
                Selected Month
            </div>


            <div className="card-number">
                {category}
            </div>


            <div className="card-change gray-text">
                {categoryYear}
            </div>

        </div>

    </div>


</div>



{/* INVESTMENT INPUT */}

<div className="data-section">

    <div className="section-title">
        <span>▥</span>
        Investment Data
    </div>


    <div className="input-grid">


        <input
            className="dashboard-input"
            placeholder="users name..."
            value={user}
            onChange={function(event){
                setUser(event.target.value)
            }}
        />


        <input
            className="dashboard-input"
            placeholder="invested amount..."
            value={investedAmount}
            onChange={function(event){
                setInvestedAmount(event.target.value)
            }}
        />


        <input
            className="dashboard-input"
            placeholder="current value...."
            value={currentValue}
            onChange={function(event){
                setCurrentValue(event.target.value)
            }}
        />


        <input
            className="dashboard-input"
            placeholder="profit/loss"
            value={profit}
            onChange={function(event){
                setProfit(event.target.value)
            }}
        />


        <input
            className="dashboard-input"
            placeholder="month"
            value={month}
            onChange={function(event){
                setMonth(event.target.value)
            }}
        />


        <input
            className="dashboard-input"
            placeholder="year"
            value={year}
            onChange={function(event){
                setYear(event.target.value)
            }}
        />

    </div>



    <button
        className="add-investment"
        onClick={function(){

            if(editId!==null){
                return Edit(editId)
            }

            {

                fetch("https://investment-tracker-full-stack.onrender.com/home",{

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json",
                        Authorization:"Bearer " +
                        localStorage.getItem("token")
                    },

                    body:JSON.stringify({
                        user:user,
                        investedAmount:investedAmount,
                        currentValue:currentValue,
                        profit:profit,
                        month:month,
                        year:year
                    })

                })

                .then(function(response){
                    return response.json()
                })

                .then(function(data){

                    setInvestment([...investment,data])

                    setUser("")
                    setInvestedAmount("")
                    setCurrentValue("")
                    setProfit("")
                    setMonth("")
                    setYear("")

                })

            }

        }}
    >

        ADD

    </button>

</div>



{/* MONTH SELECTOR */}

<div className="month-section">

    <div className="section-title">
        <span>▣</span>
        Select Month
    </div>


    <div className="month-list">

        {investment.map(function(item,index){

            return(

                <button
                    className={
                        category===item.month &&
                        categoryYear===item.year
                        ? "month-button month-selected"
                        : "month-button"
                    }

                    onClick={function(){

                        setCategory(item.month)

                        setCategoryYear(item.year)

                    }}

                    key={index}
                >

                    {item.month} {item.year}

                </button>

            )

        })}

    </div>

</div>



{/* SELECTED MONTH TABLE */}

<div className="investment-section">

    <div className="section-title">

        <span>▥</span>

        {category} {categoryYear} - Investment Details

    </div>



    <div className="investment-header">

        <div>PERSON</div>

        <div>INVESTED AMOUNT (₹)</div>

        <div>CURRENT VALUE (₹)</div>

        <div>PROFIT / LOSS (₹)</div>

        <div>ACTIONS</div>

    </div>



    {FilteredData().map(function(item,index){

        return(

            <div
                className="investment-row"
                key={index}
            >


                <div className="person">

                    {item.user}

                </div>


                <div className="amount">

                    ₹{item.investedAmount}

                </div>


                <div className="amount">

                    ₹{item.currentValue}

                </div>


                <div className={
                    item.profit>0
                    ? "profit-value"
                    : "loss-value"
                }>

                    ₹{item.profit}

                </div>


                <div className="actions">


                    <button
                        className="edit-button"
                        onClick={function(){

                            setUser(item.user)

                            setInvestedAmount(
                                item.investedAmount
                            )

                            setCurrentValue(
                                item.currentValue
                            )

                            setProfit(
                                item.profit
                            )

                            setMonth(
                                item.month
                            )

                            setYear(
                                item.year
                            )

                            setEditId(
                                item._id
                            )

                        }}
                    >

                        EDIT

                    </button>


                    <button
                        className="delete-button"
                        onClick={function(){

                            Delete(item._id)

                        }}
                    >

                        DELETE

                    </button>


                </div>

            </div>

        )

    })}



    {/* SELECTED MONTH TOTAL */}

    <div className="investment-total">

        <div>
            Total ({category} {categoryYear})
        </div>


        <div>
            ₹{filterInvestment}
        </div>


        <div>
            ₹{filterCurrent}
        </div>


        <div className={
            filterProfitLoss>=0
            ? "profit-value"
            : "loss-value"
        }>

            ₹{filterProfitLoss}

        </div>


        <div></div>

    </div>

</div>



{/* MONTHLY SUMMARY + CHART */}

<div className="lower-area">


    <div className="monthly-section">

        <div className="section-title">

            <span>▥</span>
            Monthly Summary

        </div>


        <div className="monthly-header">

            <div>Month</div>

            <div>Invested (₹)</div>

            <div>Current (₹)</div>

            <div>Profit / Loss (₹)</div>

        </div>



        {investment.map(function(item,index){

            return(

                <div
                    className="monthly-row"
                    key={index}
                >

                    <div>
                        {item.month} {item.year}
                    </div>

                    <div>
                        ₹{item.investedAmount}
                    </div>

                    <div>
                        ₹{item.currentValue}
                    </div>

                    <div className={
                        item.profit>0
                        ? "profit-value"
                        : "loss-value"
                    }>
                        ₹{item.profit}
                    </div>

                </div>

            )

        })}

    </div>



    <div className="chart-section">

        <div className="section-title">

            <span>⌁</span>
            Profit / Loss Trend

        </div>


        <div className="chart-box">
<ResponsiveContainer    width="100%"
                height={300}   >
            <BarChart
                data={chart}
               
            >

                <XAxis dataKey="month"/>

                <YAxis/>

                <CartesianGrid/>

                <Tooltip/>

                <Legend/>

                <Bar
                    dataKey="profit"
                    fill="#35c997"
                />

            </BarChart>
</ResponsiveContainer>
        </div>


    </div>


</div>



{/* ALL MONTH TOTALS */}

<div className="overall-section">

    <div className="overall-title">

        ● &nbsp; Overall Totals (All Months)

    </div>


    <div className="overall-grid">


        <div className="overall-card">

            <div className="overall-icon green-icon">
                ▤
            </div>


            <div>

                <div className="overall-label">
                    Total Investment
                </div>

                <div className="overall-number">
                    ₹{Investment}
                </div>

            </div>

        </div>



        <div className="overall-card">

            <div className="overall-icon blue-icon">
                ▥
            </div>


            <div>

                <div className="overall-label">
                    Total Current Value
                </div>

                <div className="overall-number">
                    ₹{Current}
                </div>

            </div>

        </div>



        <div className="overall-card">

            <div className="overall-icon green-icon">
                ↗
            </div>


            <div>

                <div className="overall-label">
                    Total Profit / Loss
                </div>

                <div className={
                    ProfitLoss>=0
                    ? "overall-number profit-value"
                    : "overall-number loss-value"
                }>

                    ₹{ProfitLoss}

                </div>

            </div>

        </div>



        <div className="overall-card">

            <div className="overall-icon gray-icon">
                ▣
            </div>


            <div>

                <div className="overall-label">
                    Months Tracked
                </div>

                <div className="overall-number">
                    {totalMonths}
                </div>

            </div>

        </div>


    </div>

</div>



{/* FOOTER */}

<div className="dashboard-footer">

    <span>
        "Investing together builds more than wealth."
    </span>

    <span>
        ▥
    </span>

</div>


</div>

</div>

)

}

export default Home;