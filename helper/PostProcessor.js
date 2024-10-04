function populateBotResponse (context, responseId) {
    //hook to add custom events
    switch (responseId) {
        case "ESI_PHA_ORD_INFO_CNFN_MSG":
            return msgTemplate(context.CnfrmMsgCallServ.response.body.data);
    
        default:
            break;
    }
};

function msgTemplate (templateData) {

    const templateType = templateData[0].MEDIA_TYPE
    const tableTemplate = templateData[0].DATA ? [{
        "type": "text",
        "component": {
            "type": "template",
            "payload": {
                "template_type": "table",
                ...JSON.parse(templateData[0].DATA)
            }
        },
        "cInfo": {
            "body": "Account details"
        }
    }] : null;

    const dafaultTextTemplate = {
        "text": templateData[0].WEB_RESPONSE_MSG
    };

    switch (templateType) {
        case "TABLE":
            return tableTemplate;

        default:
            return dafaultTextTemplate;
    }
}
