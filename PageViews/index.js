const R = require("ramda");

module.exports = async function(context, req) {
  // query string parameters startUtc and endUtc are expected and used in the table
  // binding
  const groupByUrl = R.groupBy(h => h.url);
  context.res = {
    status: 200,
    body: R.sort(
      R.descend(i => i.pageViews),
      Object.values(
        R.map(
          g => ({ url: g[0].url, pageViews: g.length }),
          groupByUrl(context.bindings.hits)
        )
      )
    ),
    headers: {
      "Content-Type": "application/json"
    }
  };
};
