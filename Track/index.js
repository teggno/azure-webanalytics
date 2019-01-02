module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    if (req.body && req.body.url) {
        context.bindings.requests = [{
            PartitionKey: req.body.url,
            RowKey: context.bindingData.sys.randGuid,
            navigator: JSON.stringify(req.body.navigator)
        }];

        context.res = {
            status: 200
        };
    }
    else {
        context.res = {
            status: 400,
            body: "POST request expected with a body that is a JSON object containing an url field."
        };
    }
};