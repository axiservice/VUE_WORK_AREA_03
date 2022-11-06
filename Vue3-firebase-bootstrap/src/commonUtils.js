function consoleDebugger(message) {
    if(process.env.VUE_APP_CONSOLE_DEBUGGER.localeCompare("ON")==0){
        console.log(message)
    }
}

export default consoleDebugger; 