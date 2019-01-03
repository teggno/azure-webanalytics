module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const { isValid, messages } = validate(req.body);
  if (!isValid) {
    context.res = {
      status: 400,
      body: messages.join(", ")
    };
    return;
  }

  const record = Object.assign(
    {},
    {
      PartitionKey: req.body.timestampUtc,
      RowKey: context.bindingData.sys.randGuid,
      url: req.body.url,
      fingerprint: req.body.fingerprint,
      referrer: req.body.referrer
    },
    req.body.navigator
  );
  context.bindings.hits = [record];

  context.res = {
    status: 200
  };
};

function validate(potentialHit) {
  const messages = [];

  if (!potentialHit.url) messages.push("url field expected");
  if (!potentialHit.timestampUtc) messages.push("timestampUtc field expected");
  if (!potentialHit.fingerprint) messages.push("fingerprint field expected");

  return {
    isValid: messages.length === 0,
    messages: messages
  };
}
