import React, { useState , useEffect } from "react";

const Counter = () => {

    const [count, setCount] = useState(0);

    useEffect(() =>{
        const element =document.getElementById('count-msg');

        if (element){
            element.innerText = `You clicked ${count} times`;
        }
    },[count])
    const increment = () => {
        setCount(count + 1);
    }


    return(
        <div>
            <h1>Counter</h1>
            <p id="count-msg"></p>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    )
}


export default Counter;