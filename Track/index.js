module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  if (req.body && req.body.url && req.body.fingerprint) {
    context.bindings.requests = [
      {
        PartitionKey: escapeUrl(req.body.url),
        RowKey: context.bindingData.sys.randGuid,
        fingerprint: req.body.fingerprint,
        navigator: JSON.stringify(req.body.navigator)
      }
    ];

    context.res = {
      status: 200
    };
  } else {
    context.res = {
      status: 400,
      body:
        "POST request expected with a body that is a JSON object containing an url and a fingerprint field."
    };
  }
};

function escapeUrl(url) {
  return url
    .replace(/\@/g, "@@")
    .replace(/\//g, "@s")
    .replace(/\#/g, "@h")
    .replace(/\\/g, "@b")
    .replace(/\?/g, "@q");
}
