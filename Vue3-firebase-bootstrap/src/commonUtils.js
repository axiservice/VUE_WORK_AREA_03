function consoleDebugger(message) {
    if(process.env.VUE_APP_CONSOLE_DEBUGGER==1){
    //if(process.env.VUE_APP_CONSOLE_DEBUGGER.localeCompare("ON")==0){
        console.log(message)
    }

    //console.log("process.env.VUE_APP_CONSOLE_DEBUGGER: "+process.env.VUE_APP_CONSOLE_DEBUGGER)
}


export default consoleDebugger; 