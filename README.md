# azure-webanalytics
Serverless and **cookieless** web analytics running on azure functions. It's
intended for tracking of any kind of **low traffic** web page.

## Features
* Provides an HTTP api endpoint for POST'ing individual (page) hits. Hits are
  stored in azure table storage.
* Provides an HTTP api endpoint for GET'ing the number of page views between to timestamps
  per page URL.

## Architecture
azure-webanalytics runs on Azure functions. The functions are implemented in
JavaScript.

## User interface
A user interface to view the tracking data lives in the separate
[azure-webanalytics-client](https://github.com/teggno/azure-webanalytics-client)
repository.

## Roadmap
- New HTTP GET endpoint to return daily/hourly total page views.
- Email notification when traffic is increasing siginificantly. 
- Daily email notification with some stats. (Goal is to not to have to go and
  check proactively.)