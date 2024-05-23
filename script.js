// storing html inputs 
const numberInput = document.getElementById('number-input')
const convertBtn = document.getElementById('convert-btn')
const result = document.getElementById('result')

const animationContainer = document.getElementById('animation-container')

// ARRAY FOR ANIMATION TESTINGS
const animationData = [
    {
        inputVal: 5,
        marginTop: 300,
        addElDelay: 1000,
        msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
        showMsgDelay: 15000,
        removeElDelay: 20000,
    },
    {
        inputVal: 2,
        marginTop: -200,
        addElDelay: 1500,
        msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
        showMsgDelay: 10000,
        removeElDelay: 15000,
    },
    {
        inputVal: 1,
        marginTop: -200,
        addElDelay: 2000,
        msg:'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
        showMsgDelay: 5000,
        removeElDelay: 10000
    }
]


// IMPROVED decimalBinary() function
const decimalToBinary=(input)=>{

    if(input === 0 || input == 1){
        return String(input);
    }else{
        return decimalToBinary(Math.floor(input / 2))+(input%2);
    }

    
}

// TESTING
const showAnimation =()=>{

    result.innerText = "Call Stack Animation";
    animationData.forEach((obj)=>{

        setTimeout(()=>{
            // currVal is the inputVal property of the current object
            animationContainer.innerHTML += `
                <p 
                id="${obj.inputVal}" 
                style="margin-top:${obj.marginTop}px"
                class="animation-frame"
                >
                decimalToBinary(${obj.inputVal})
                </p>
            `
        }, obj.addElDelay);

        setTimeout(()=>{
            document.getElementById(obj.inputVal).textContent = obj.msg;
        },obj.showMsgDelay);

        setTimeout(()=>{
            document.getElementById(obj.inputVal).remove()
        }, obj.removeElDelay);

    });

    setTimeout(()=>{
        result.textContent = decimalToBinary(5)
    },20000)
}

// setup to check value in number input when user clicks Convert btn
const checkUserInput = () => {

    const inputInt = parseInt(numberInput.value)

    // 1st condition checks if falsy
    // common falsy values are null, undefined, 0 and empty string
    // parseInt checks and normalizes numbers
    // parseInt() converts string to interger or whole number
    // parseInt() takes a argument, string. That is to be converted & returns interger or NaN
    // isNaN() checks if value returned is a number or not
    // isNaN() returns 'true' if it evaluates to NaN
    if(!numberInput.value || isNaN(inputInt) ){
        // NOTE: alert() is a method on the window object in browser
        alert('Please provide a decimal number.')

        // using 'return' to break out of function, preventing future code in this function from running
        return 
    }

    // demonstrating how recusuve works using animation
    if(inputInt === 5){
        showAnimation()
        return 
    }


    result.textContent = decimalToBinary(inputInt)

    // wont have to delete previous numbers before entering next number
    numberInput.value = ''

}

convertBtn.addEventListener('click', checkUserInput)

numberInput.addEventListener('keydown', (e)=>{
    

    // checks if the Enter btn was pressed
    if(e.key==='Enter'){
        checkUserInput()
    }
})

