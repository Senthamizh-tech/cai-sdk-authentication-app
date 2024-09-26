var fetch = require('node-fetch');

//Bot message post processing utility function
async function populateBotResponse(context, responseId) {
    //1.Fire a http api call to get the response text and associated rich card data from verbiage builder service exposed on middleware app
    let apiResourceName = "verbiageBuilder";
    let paramsObj = { "resourceName": apiResourceName, "responseId": responseId, "currentLang": context.currentLanguage }
    // let botMsgObj = callBotMiddlewareApp(paramsObj);
    let botMsgObj;

    //2.Handle the business logic for every unique response id
    switch (responseId) {
        case "ESI_PHA_ORD_INFO_ASK_ORD_ID":
            botMsgObj = await callBotMiddlewareApp(paramsObj);
            break;
        default:
            break;
    }

    // if (responseId === "ESI_PHA_ORD_INFO_ASK_ORD_ID") {
    //     //Get the order id from kore.ai bot context object like context.entities.orderId 
    //     //Fire a http api call to the middleware app wrapper service to call out the order management api for given order id
    //     apiResourceName = "orderStatus"
    //     paramsObj = { "resourceName": apiResourceName, "orderId": context.entities.orderId }
    //     let orderStatus = callBotMiddlewareApp(paramsObj)
    //     //Replace the placeholders of the botMsgObj with order status for dynamic data infusion
    // } else if (responseId === Another response Id) {
    //     apiResourceName = "orderUpdate"
    //     //Handle logic...
    // }else {
    //     //Fallback bot prompt, if no match is found 
    // }

    // //3.Call bot msg transformer logic according to the kore.ai supported rich card templates
    // botMsgObj = transformBotResponse(botMsgObj)
    
    // return JSON.stringify(botMsgObj)
    return botMsgObj;
}

//Http POST client utility function to call out the bot middleware app
async function callBotMiddlewareApp(paramsObj) {
    let botMiddlewareAppApiEndPointURL = "https://cai-sdk-authentication-app.onrender.com"
    
    //Set paramsObj onto the request body as JSON
    const response = await fetch(
        `${botMiddlewareAppApiEndPointURL}/api/users/sts/verbiagebuilder`,
        {
            method: 'POST',
            body: paramsObj
        }
    );

    koreDebugger.log(response);
    // const responseObj = await response.json();
    // return responseObj

    return "Guess what? It's working!!!";
}
